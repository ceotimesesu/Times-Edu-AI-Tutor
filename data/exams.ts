/**
 * Mock exam papers with mark schemes for each course. Questions are written in
 * markdown + LaTeX and rendered with the shared Markdown component.
 */

export interface ExamQuestion {
  id: string;
  marks: number;
  question: string;
  markscheme: string;
}

export interface ExamPaper {
  id: string;
  courseId: string;
  title: string;
  durationMin: number;
  calculator: 'allowed' | 'not allowed';
  questions: ExamQuestion[];
}

export const EXAMS: ExamPaper[] = [
  {
    id: 'igcse-mock-1',
    courseId: 'igcse-math',
    title: 'IGCSE Mathematics — Mock Paper 1',
    durationMin: 60,
    calculator: 'allowed',
    questions: [
      {
        id: 'ig-q1',
        marks: 2,
        question: 'Write $0.00408$ in standard form.',
        markscheme: '$4.08 \\times 10^{-3}$. **(M1)** for $4.08$, **(A1)** for the power $-3$.',
      },
      {
        id: 'ig-q2',
        marks: 3,
        question: 'A coat costs \\$85. The price is increased by 12%. Work out the new price.',
        markscheme:
          '$85 \\times 1.12$ **(M1)** $= \\$95.20$ **(A1 A1)** for value and 2 d.p.',
      },
      {
        id: 'ig-q3',
        marks: 3,
        question: 'Solve $x^2 - 7x + 12 = 0$.',
        markscheme:
          'Factorise $(x-3)(x-4)=0$ **(M1)** ⟹ $x = 3$ **(A1)** or $x = 4$ **(A1)**.',
      },
      {
        id: 'ig-q4',
        marks: 4,
        question:
          'A cylinder has radius 4 cm and height 9 cm. Find (a) its volume and (b) its curved surface area, each to 3 s.f.',
        markscheme:
          '(a) $V = \\pi(4)^2(9) = 144\\pi = 452\\ \\text{cm}^3$ **(M1 A1)**.\n(b) $CSA = 2\\pi r h = 2\\pi(4)(9) = 72\\pi = 226\\ \\text{cm}^2$ **(M1 A1)**.',
      },
      {
        id: 'ig-q5',
        marks: 3,
        question:
          'In triangle $ABC$, $AB = 8$ cm, $AC = 6$ cm and angle $A = 50^\\circ$. Find the area of the triangle to 3 s.f.',
        markscheme:
          'Area $= \\tfrac12(8)(6)\\sin 50^\\circ$ **(M1)** $= 24\\sin 50^\\circ$ **(M1)** $= 18.4\\ \\text{cm}^2$ **(A1)**.',
      },
      {
        id: 'ig-q6',
        marks: 4,
        question:
          'A bag has 4 red and 6 blue beads. Two beads are taken at random without replacement. Find the probability that both are the same colour.',
        markscheme:
          '$P(RR) = \\tfrac{4}{10}\\times\\tfrac{3}{9} = \\tfrac{12}{90}$ **(M1)**; $P(BB) = \\tfrac{6}{10}\\times\\tfrac{5}{9} = \\tfrac{30}{90}$ **(M1)**. Sum $= \\tfrac{42}{90} = \\tfrac{7}{15}$ **(M1 A1)**.',
      },
    ],
  },
  {
    id: 'aa-mock-1',
    courseId: 'ib-aa',
    title: 'IB Math AA — Mock Paper (SL)',
    durationMin: 90,
    calculator: 'allowed',
    questions: [
      {
        id: 'aa-q1',
        marks: 4,
        question:
          'An arithmetic sequence has first term $5$ and common difference $3$. Find (a) the 20th term and (b) the sum of the first 20 terms.',
        markscheme:
          '(a) $u_{20} = 5 + 19(3) = 62$ **(M1 A1)**.\n(b) $S_{20} = \\tfrac{20}{2}(2\\cdot5 + 19\\cdot3) = 10(67) = 670$ **(M1 A1)**.',
      },
      {
        id: 'aa-q2',
        marks: 5,
        question: 'Find the stationary point of $f(x) = x^3 - 3x^2 + 4$ and determine its nature.',
        markscheme:
          '$f\'(x) = 3x^2 - 6x = 3x(x-2)$ **(M1)**, $= 0$ at $x = 0, 2$ **(A1)**. $f\'\'(x) = 6x - 6$ **(M1)**; $f\'\'(0) = -6 < 0$ ⟹ max $(0,4)$, $f\'\'(2) = 6 > 0$ ⟹ min $(2,0)$ **(A1 A1)**.',
      },
      {
        id: 'aa-q3',
        marks: 4,
        question: 'Solve $\\ln(x) + \\ln(x - 3) = \\ln 10$.',
        markscheme:
          '$\\ln(x(x-3)) = \\ln 10$ **(M1)** ⟹ $x^2 - 3x - 10 = 0$ **(M1)** ⟹ $(x-5)(x+2)=0$ **(A1)**. Reject $x = -2$; $x = 5$ **(A1)**.',
      },
      {
        id: 'aa-q4',
        marks: 4,
        question: 'Evaluate $\\displaystyle\\int_1^3 (2x + 1)\\,dx$.',
        markscheme:
          '$\\big[x^2 + x\\big]_1^3$ **(M1 A1)** $= (9+3) - (1+1)$ **(M1)** $= 10$ **(A1)**.',
      },
      {
        id: 'aa-q5',
        marks: 5,
        question:
          'The random variable $X \\sim B(8, 0.25)$. Find (a) $E(X)$ and (b) $P(X = 2)$ to 3 s.f.',
        markscheme:
          '(a) $E(X) = np = 8(0.25) = 2$ **(A1)**.\n(b) $P(X=2) = \\binom{8}{2}(0.25)^2(0.75)^6$ **(M1 M1)** $= 28 \\times 0.0625 \\times 0.1780 = 0.311$ **(A1 A1)**.',
      },
    ],
  },
  {
    id: 'ai-mock-1',
    courseId: 'ib-ai',
    title: 'IB Math AI — Mock Paper (SL)',
    durationMin: 90,
    calculator: 'allowed',
    questions: [
      {
        id: 'ai-q1',
        marks: 4,
        question:
          '\\$3000 is invested at a nominal annual rate of 4%, compounded quarterly. Find the value after 5 years to 2 d.p.',
        markscheme:
          '$FV = 3000\\left(1 + \\tfrac{4}{400}\\right)^{20}$ **(M1 M1)** $= 3000(1.01)^{20} = \\$3660.57$ **(A1 A1)**.',
      },
      {
        id: 'ai-q2',
        marks: 3,
        question:
          'A measurement is recorded as 9.6 kg but the true value is 10 kg. Find the percentage error.',
        markscheme:
          '$\\left|\\dfrac{9.6 - 10}{10}\\right| \\times 100$ **(M1 M1)** $= 4\\%$ **(A1)**.',
      },
      {
        id: 'ai-q3',
        marks: 4,
        question:
          'A triangular field has sides $a = 40$ m, $b = 55$ m with included angle $C = 70^\\circ$. Find its area to 3 s.f.',
        markscheme:
          'Area $= \\tfrac12 ab\\sin C = \\tfrac12(40)(55)\\sin 70^\\circ$ **(M1 M1)** $= 1100\\sin 70^\\circ = 1030\\ \\text{m}^2$ **(A1 A1)**.',
      },
      {
        id: 'ai-q4',
        marks: 5,
        question:
          'A $\\chi^2$ test of independence on a $2 \\times 3$ table gives $\\chi^2_{\\text{calc}} = 8.10$. The critical value at the 5% level is $5.99$. (a) State the degrees of freedom. (b) State and justify the conclusion.',
        markscheme:
          '(a) $df = (2-1)(3-1) = 2$ **(A1)**.\n(b) Since $8.10 > 5.99$ **(M1)**, reject $H_0$ **(A1)**: there is significant evidence at the 5% level that the variables are **not independent** (associated) **(A1 A1)**.',
      },
      {
        id: 'ai-q5',
        marks: 4,
        question:
          'Estimate $\\displaystyle\\int_0^6 y\\,dx$ using the trapezoidal rule with the values $y = 1, 4, 5, 4$ at $x = 0, 2, 4, 6$.',
        markscheme:
          '$h = 2$ **(A1)**. $\\tfrac{2}{2}\\big(1 + 4 + 2(4 + 5)\\big)$ **(M1 M1)** $= 1(5 + 18) = 23$ **(A1)**.',
      },
    ],
  },
];

export function examsForCourse(courseId: string): ExamPaper[] {
  return EXAMS.filter((e) => e.courseId === courseId);
}

export function findExam(examId: string): ExamPaper | undefined {
  return EXAMS.find((e) => e.id === examId);
}

export const examTotalMarks = (paper: ExamPaper): number =>
  paper.questions.reduce((n, q) => n + q.marks, 0);
