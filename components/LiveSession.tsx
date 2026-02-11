import React, { useEffect, useRef, useState, useCallback } from 'react';
import { GoogleGenAI, LiveServerMessage, Modality } from '@google/genai';
import { Mic, MicOff, PhoneOff, AlertCircle, RefreshCw, Volume2, Wifi, WifiOff } from 'lucide-react';
import { SYSTEM_INSTRUCTION } from '../constants';
import { createPcmBlob, decodeAudioData, base64ToUint8Array } from '../services/audioUtils';
import { TutorMode } from '../types';

interface LiveSessionProps {
  apiKey: string;
  mode: TutorMode;
  onClose: () => void;
}

const LiveSession: React.FC<LiveSessionProps> = ({ apiKey, mode, onClose }) => {
  const [isConnected, setIsConnected] = useState(false);
  const [isMicOn, setIsMicOn] = useState(true);
  const [status, setStatus] = useState<'initial' | 'connecting' | 'connected' | 'error' | 'disconnected'>('initial');
  const [volumeLevel, setVolumeLevel] = useState(0);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const audioContextRef = useRef<AudioContext | null>(null);
  const inputContextRef = useRef<AudioContext | null>(null);
  const nextStartTimeRef = useRef<number>(0);
  const sourcesRef = useRef<Set<AudioBufferSourceNode>>(new Set());
  const sessionRef = useRef<Promise<any> | null>(null); 
  const scriptProcessorRef = useRef<ScriptProcessorNode | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  
  // Use a ref for isMicOn to access it inside the closure without re-running effects
  const isMicOnRef = useRef(isMicOn);
  useEffect(() => {
    isMicOnRef.current = isMicOn;
  }, [isMicOn]);

  const cleanupSession = useCallback(() => {
      if (sessionRef.current) {
          sessionRef.current.then((s: any) => {
              try { s.close(); } catch(e) { console.error("Error closing session", e); }
          });
          sessionRef.current = null;
      }
      if (streamRef.current) {
          streamRef.current.getTracks().forEach(t => t.stop());
          streamRef.current = null;
      }
      if (inputContextRef.current) {
          inputContextRef.current.close();
          inputContextRef.current = null;
      }
      if (audioContextRef.current) {
          audioContextRef.current.close();
          audioContextRef.current = null;
      }
      if (scriptProcessorRef.current) {
          scriptProcessorRef.current.disconnect();
          scriptProcessorRef.current = null;
      }
      setIsConnected(false);
      setVolumeLevel(0);
  }, []);

  const startSession = useCallback(async () => {
    cleanupSession();
    setStatus('connecting');
    setErrorMessage(null);

    try {
      const ai = new GoogleGenAI({ apiKey });

      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContextClass) {
          throw new Error("AudioContext is not supported in this browser.");
      }

      inputContextRef.current = new AudioContextClass({ sampleRate: 16000 });
      audioContextRef.current = new AudioContextClass({ sampleRate: 24000 });
      
      const outputNode = audioContextRef.current.createGain();
      outputNode.connect(audioContextRef.current.destination);

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;

      const sessionPromise = ai.live.connect({
        model: 'gemini-2.5-flash-native-audio-preview-12-2025',
        callbacks: {
          onopen: () => {
            console.log("Live session opened");
            setIsConnected(true);
            setStatus('connected');

            if (!inputContextRef.current) return;
            const source = inputContextRef.current.createMediaStreamSource(stream);
            // 4096 buffer size offers a balance between latency and performance
            const processor = inputContextRef.current.createScriptProcessor(4096, 1, 1);
            scriptProcessorRef.current = processor;

            processor.onaudioprocess = (e) => {
              if (!isMicOnRef.current) {
                  setVolumeLevel(0);
                  return; 
              }
              
              const inputData = e.inputBuffer.getChannelData(0);
              
              let sum = 0;
              for(let i=0; i<inputData.length; i++) sum += inputData[i] * inputData[i];
              const rms = Math.sqrt(sum / inputData.length);
              // Normalize volume more sensitively for visualization
              setVolumeLevel(Math.min(rms * 8, 1)); 

              const pcmBlob = createPcmBlob(inputData);
              sessionPromise.then(session => {
                 session.sendRealtimeInput({ media: pcmBlob });
              });
            };

            source.connect(processor);
            processor.connect(inputContextRef.current.destination);
          },
          onmessage: async (msg: LiveServerMessage) => {
             const base64Audio = msg.serverContent?.modelTurn?.parts?.[0]?.inlineData?.data;
             if (base64Audio && audioContextRef.current) {
               const ctx = audioContextRef.current;
               nextStartTimeRef.current = Math.max(nextStartTimeRef.current, ctx.currentTime);
               
               const audioBuffer = await decodeAudioData(
                 base64ToUint8Array(base64Audio),
                 ctx
               );
               
               const source = ctx.createBufferSource();
               source.buffer = audioBuffer;
               source.connect(outputNode);
               
               source.addEventListener('ended', () => {
                 sourcesRef.current.delete(source);
               });
               
               source.start(nextStartTimeRef.current);
               nextStartTimeRef.current += audioBuffer.duration;
               sourcesRef.current.add(source);
             }

             if (msg.serverContent?.interrupted) {
               sourcesRef.current.forEach(s => s.stop());
               sourcesRef.current.clear();
               nextStartTimeRef.current = 0;
             }
          },
          onclose: () => {
            console.log("Live session closed");
            setStatus('disconnected');
            setIsConnected(false);
          },
          onerror: (err) => {
            console.error("Live session error", err);
            setStatus('error');
            setErrorMessage("Connection interrupted.");
            setIsConnected(false);
          }
        },
        config: {
           responseModalities: [Modality.AUDIO],
           speechConfig: {
               voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Zephyr' } }
           },
           systemInstruction: SYSTEM_INSTRUCTION + `\n\nCURRENT MODE: ${mode}. Speak naturally and concisely, as if we are on a voice call.`,
        }
      });

      sessionRef.current = sessionPromise;

    } catch (err: any) {
      console.error("Failed to start live session", err);
      setStatus('error');
      setIsConnected(false);
      
      if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
          setErrorMessage("Microphone access denied. Please allow microphone access in your browser settings to continue.");
      } else if (err.name === 'NotFoundError' || err.name === 'DevicesNotFoundError') {
          setErrorMessage("No microphone found. Please check your audio devices.");
      } else {
          setErrorMessage(`Failed to connect: ${err.message || 'Unknown error'}`);
      }
    }
  }, [apiKey, mode, cleanupSession]);

  // Initial connection
  useEffect(() => {
    startSession();
    return () => {
      cleanupSession();
    };
  }, [startSession, cleanupSession]);

  // Visualization configuration
  const BAR_COUNT = 15;
  // A symmetric pattern for the bars to create a wave-like look
  const BAR_SCALE_FACTORS = [0.2, 0.3, 0.5, 0.8, 1.0, 0.9, 0.7, 1.0, 0.8, 0.6, 0.4, 0.2, 0.2, 0.1, 0.1];

  return (
    <div className="flex flex-col items-center justify-between h-full bg-brand-navy text-white rounded-xl shadow-2xl p-8 relative overflow-hidden">
        {/* Ambient Background Effects */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
            <div className={`absolute w-[40rem] h-[40rem] rounded-full bg-brand-gold/10 blur-3xl transition-all duration-1000 ${status === 'connected' ? 'scale-100 opacity-100' : 'scale-50 opacity-0'}`}></div>
            {/* Pulse effect */}
            {status === 'connected' && (
                <div className="absolute w-96 h-96 rounded-full border border-brand-gold/5 opacity-50 animate-[ping_3s_linear_infinite]"></div>
            )}
        </div>

        {/* Top Status Bar */}
        <div className="z-10 w-full flex justify-center">
            <div className={`inline-flex items-center gap-3 px-5 py-2.5 rounded-full text-sm font-medium backdrop-blur-md transition-colors duration-300 ${
                status === 'connected' ? 'bg-green-500/10 text-green-200 border border-green-500/20' :
                status === 'error' ? 'bg-red-500/10 text-red-200 border border-red-500/20' :
                'bg-brand-gold/10 text-brand-gold border border-brand-gold/20'
            }`}>
                {status === 'connected' ? (
                    <Wifi size={16} className="text-green-400" />
                ) : status === 'error' ? (
                    <AlertCircle size={16} className="text-red-400" />
                ) : (
                    <RefreshCw size={16} className={`text-brand-gold ${status === 'connecting' ? 'animate-spin' : ''}`} />
                )}
                
                <span>
                    {status === 'connected' ? 'Live Session Active' :
                     status === 'connecting' ? 'Establishing Connection...' :
                     status === 'error' ? 'Connection Failed' : 
                     status === 'disconnected' ? 'Session Ended' : 'Initializing'}
                </span>
            </div>
        </div>

        {/* Main Visualizer Area */}
        <div className="flex-1 flex flex-col items-center justify-center z-10 w-full max-w-lg">
            {status === 'error' ? (
                <div className="bg-red-950/50 border border-red-500/30 rounded-2xl p-6 text-center backdrop-blur-sm max-w-sm mx-auto">
                    <p className="text-red-200 mb-4">{errorMessage || 'An error occurred while connecting.'}</p>
                    <button 
                        onClick={() => startSession()}
                        className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold transition-colors flex items-center gap-2 mx-auto"
                    >
                        <RefreshCw size={18} />
                        Retry
                    </button>
                </div>
            ) : (
                <div className="relative h-64 w-full flex items-center justify-center gap-2">
                    {/* Active Bars */}
                    {BAR_SCALE_FACTORS.map((scale, i) => {
                        // Dynamic height calculation
                        const minHeight = 8; // px
                        const variableHeight = 150; // px
                        
                        // If connected, animate based on volume. If connecting, gentle pulse.
                        let height;
                        if (status === 'connected') {
                             height = minHeight + (volumeLevel * variableHeight * scale);
                             // Add a tiny random flutter for realism
                             height += Math.random() * 10 * volumeLevel; 
                        } else if (status === 'connecting') {
                            // Gentle sine wave animation when loading
                            height = 20 + Math.sin(Date.now() / 200 + i) * 10;
                        } else {
                            height = minHeight;
                        }

                        return (
                            <div 
                                key={i} 
                                className={`w-3 sm:w-4 rounded-full transition-all duration-75 ease-out shadow-[0_0_10px_rgba(179,139,77,0.2)] ${
                                    status === 'connected' ? 'bg-brand-gold opacity-90' : 'bg-slate-600 opacity-30'
                                }`}
                                style={{ 
                                    height: `${height}px`,
                                }}
                            />
                        );
                    })}
                </div>
            )}
            
            <p className="mt-8 text-brand-beige/60 text-sm tracking-wide font-light">
                {status === 'connected' ? (isMicOn ? 'Listening...' : 'Microphone Muted') : ''}
            </p>
        </div>

        {/* Controls */}
        <div className="z-10 flex items-center justify-center gap-8 mb-8">
            <button 
                onClick={() => setIsMicOn(!isMicOn)}
                disabled={status !== 'connected'}
                className={`p-6 rounded-full transition-all duration-300 border-2 ${
                    !isMicOn 
                        ? 'bg-transparent border-red-400 text-red-400 hover:bg-red-400/10' 
                        : 'bg-white text-brand-navy border-transparent hover:scale-105 shadow-[0_0_20px_rgba(255,255,255,0.3)]'
                } ${status !== 'connected' ? 'opacity-50 cursor-not-allowed' : ''}`}
                title={isMicOn ? "Mute Microphone" : "Unmute Microphone"}
            >
                {isMicOn ? <Mic size={32} /> : <MicOff size={32} />}
            </button>
            
            <button 
                onClick={onClose}
                className="p-6 rounded-full bg-red-600 hover:bg-red-700 text-white transition-all duration-300 shadow-lg hover:shadow-red-900/50 hover:scale-105 border-2 border-transparent"
                title="End Session"
            >
                <PhoneOff size={32} />
            </button>
        </div>
        
        <div className="absolute bottom-4 right-6 text-xs text-brand-beige/30 font-mono">
            MODE: {mode.toUpperCase()}
        </div>
    </div>
  );
};

export default LiveSession;