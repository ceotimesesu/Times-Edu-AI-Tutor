import { Course } from '../types';

/**
 * Curriculum content for the Times Edu IGCSE & IB Math learning hub.
 *
 * Lessons are written as markdown and support inline ($...$) and display
 * ($$...$$) LaTeX, which is rendered with KaTeX via the shared Markdown
 * component. Content is grounded in the published Cambridge IGCSE (0580)
 * and IB Diploma Mathematics subject guides.
 */

const IGCSE_MATH: Course = {
  id: 'igcse-math',
  board: 'IGCSE',
  title: 'IGCSE Mathematics',
  level: 'Core & Extended (0580)',
  tagline: 'Build rock-solid foundations for Years 10–11.',
  description:
    'The complete Cambridge IGCSE Mathematics syllabus, broken into clear lessons with worked examples and exam-style practice. Perfect for students aiming for grades 7–9 (A*–A).',
  accent: 'from-blue-500 to-indigo-600',
  topics: [
    {
      id: 'number',
      title: 'Number',
      summary: 'Integers, fractions, percentages, standard form, ratio and surds.',
      content: `
## Why this matters
Number is the language every other topic is written in. Marks here are the easiest to win and the easiest to lose to careless slips.

### Place value & standard form
Very large or very small numbers are written as $a \\times 10^{n}$ where $1 \\le a < 10$ and $n$ is an integer.

- $48\\,000 = 4.8 \\times 10^{4}$
- $0.0007 = 7 \\times 10^{-4}$

### Fractions, decimals & percentages
These are three ways of writing the same thing. To find a percentage *of* an amount, multiply by the decimal:
$$ 23\\% \\text{ of } 80 = 0.23 \\times 80 = 18.4 $$

A **percentage change** is
$$ \\text{change} = \\frac{\\text{new} - \\text{old}}{\\text{old}} \\times 100\\%. $$

### Ratio & proportion
A ratio $a:b$ shares a quantity into $a+b$ equal parts. To divide \\$240 in the ratio $3:5$, there are $8$ parts, so one part is $\\$30$, giving $\\$90$ and $\\$150$.

### Surds
A surd is an irrational root left in exact form. The key rules are
$$ \\sqrt{ab} = \\sqrt{a}\\,\\sqrt{b}, \\qquad \\frac{1}{\\sqrt{a}} = \\frac{\\sqrt{a}}{a}. $$
Always **rationalise the denominator** in a final answer.

### Exam tips
- Keep exact values ($\\pi$, surds) until the very last step.
- Read whether a question wants an answer to 3 significant figures or 2 decimal places.
`,
      formulas: [
        { name: 'Standard form', expr: 'a \\times 10^{n}, \\quad 1 \\le a < 10' },
        { name: 'Percentage change', expr: '\\dfrac{\\text{new}-\\text{old}}{\\text{old}} \\times 100\\%' },
        { name: 'Compound interest', expr: 'A = P\\left(1+\\dfrac{r}{100}\\right)^{n}' },
        { name: 'Rationalising', expr: '\\dfrac{1}{\\sqrt{a}} = \\dfrac{\\sqrt{a}}{a}' },
      ],
      examples: [
        {
          problem: 'A jacket costs \\$120. In a sale the price is reduced by 15%. Find the sale price.',
          solution:
            'A 15% reduction leaves $100\\% - 15\\% = 85\\%$ of the price.\n\n$$0.85 \\times 120 = \\$102.$$',
        },
        {
          problem: 'Simplify $\\dfrac{6}{\\sqrt{3}}$, giving an exact answer.',
          solution:
            'Multiply top and bottom by $\\sqrt{3}$:\n\n$$\\frac{6}{\\sqrt{3}} \\times \\frac{\\sqrt{3}}{\\sqrt{3}} = \\frac{6\\sqrt{3}}{3} = 2\\sqrt{3}.$$',
        },
      ],
      practice: [
        {
          id: 'num-1',
          difficulty: 'Easy',
          question: 'Write $0.00056$ in standard form.',
          answer: '$5.6 \\times 10^{-4}$',
        },
        {
          id: 'num-2',
          difficulty: 'Medium',
          question: 'Divide \\$360 in the ratio $4:5$.',
          answer: '\\$160 and \\$200',
          solution: 'There are $4+5=9$ parts, so one part $=\\$40$. Hence $4\\times40=\\$160$ and $5\\times40=\\$200$.',
        },
        {
          id: 'num-3',
          difficulty: 'Medium',
          question: '\\$2000 is invested at 4% per year compound interest. Find the value after 3 years.',
          answer: '\\$2249.73',
          solution: '$A = 2000(1.04)^3 = 2000 \\times 1.124864 = \\$2249.73$ (2 d.p.).',
        },
        {
          id: 'num-4',
          difficulty: 'Hard',
          question: 'Rationalise and simplify $\\dfrac{5}{\\sqrt{5}-1}$.',
          answer: '$\\dfrac{5(\\sqrt5+1)}{4}$',
          solution:
            'Multiply by the conjugate $\\sqrt5+1$:\n$$\\frac{5}{\\sqrt5-1}\\cdot\\frac{\\sqrt5+1}{\\sqrt5+1}=\\frac{5(\\sqrt5+1)}{5-1}=\\frac{5(\\sqrt5+1)}{4}.$$',
        },
      ],
    },
    {
      id: 'algebra',
      title: 'Algebra & Equations',
      summary: 'Expanding, factorising, rearranging, simultaneous and quadratic equations.',
      content: `
## Manipulating expressions
**Expanding brackets** uses the distributive law; **factorising** reverses it.
$$ (x+3)(x-2) = x^2 + x - 6. $$

### Factorising quadratics
To factorise $x^2 + bx + c$, find two numbers that **multiply to $c$ and add to $b$**.
For $x^2 + x - 6$: the numbers $+3$ and $-2$ work, giving $(x+3)(x-2)$.

### Solving quadratics
Three tools, in order of preference:
1. **Factorising** — fastest when it works.
2. **Completing the square** — gives the turning point too.
3. **The quadratic formula** — always works:
$$ x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}. $$

The **discriminant** $\\Delta = b^2 - 4ac$ tells you the number of real roots:
- $\\Delta > 0$: two roots, $\\Delta = 0$: one repeated root, $\\Delta < 0$: no real roots.

### Simultaneous equations
For one linear and one quadratic, **substitute** the linear equation into the quadratic. For two linear equations, **eliminate** a variable.

### Rearranging formulae
Treat the subject like solving an equation — do the same operation to both sides until the required letter is alone.
`,
      formulas: [
        { name: 'Quadratic formula', expr: 'x = \\dfrac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}' },
        { name: 'Discriminant', expr: '\\Delta = b^2 - 4ac' },
        { name: 'Difference of two squares', expr: 'a^2 - b^2 = (a-b)(a+b)' },
        { name: 'Completed square', expr: 'x^2 + bx + c = \\left(x+\\tfrac{b}{2}\\right)^2 + c - \\tfrac{b^2}{4}' },
      ],
      examples: [
        {
          problem: 'Solve $x^2 - 5x + 6 = 0$.',
          solution:
            'We need two numbers that multiply to $6$ and add to $-5$: these are $-2$ and $-3$.\n$$ (x-2)(x-3)=0 \\implies x=2 \\text{ or } x=3. $$',
        },
        {
          problem: 'Solve $2x^2 + 3x - 4 = 0$, giving answers to 2 d.p.',
          solution:
            'Here $a=2,\\,b=3,\\,c=-4$.\n$$ x = \\frac{-3 \\pm \\sqrt{9 + 32}}{4} = \\frac{-3 \\pm \\sqrt{41}}{4}. $$\nSo $x = 0.85$ or $x = -2.35$ (2 d.p.).',
        },
      ],
      practice: [
        {
          id: 'alg-1',
          difficulty: 'Easy',
          question: 'Expand and simplify $(x+5)(x-3)$.',
          answer: '$x^2 + 2x - 15$',
        },
        {
          id: 'alg-2',
          difficulty: 'Medium',
          question: 'Factorise fully $3x^2 - 12$.',
          answer: '$3(x-2)(x+2)$',
          solution: 'Take out $3$: $3(x^2-4)$, then difference of two squares: $3(x-2)(x+2)$.',
        },
        {
          id: 'alg-3',
          difficulty: 'Medium',
          question: 'Solve the simultaneous equations $y = 2x + 1$ and $x + y = 7$.',
          answer: '$x = 2,\\ y = 5$',
          solution: 'Substitute: $x + (2x+1) = 7 \\Rightarrow 3x = 6 \\Rightarrow x = 2$, so $y = 5$.',
        },
        {
          id: 'alg-4',
          difficulty: 'Hard',
          question: 'Make $r$ the subject of $V = \\tfrac{4}{3}\\pi r^3$.',
          answer: '$r = \\sqrt[3]{\\dfrac{3V}{4\\pi}}$',
          solution: 'Multiply by $\\tfrac{3}{4\\pi}$: $r^3 = \\dfrac{3V}{4\\pi}$, then cube-root both sides.',
        },
      ],
    },
    {
      id: 'functions-graphs',
      title: 'Functions & Graphs',
      summary: 'Linear, quadratic, cubic, reciprocal and exponential graphs; function notation.',
      content: `
## Function notation
$f(x)$ means "the rule $f$ applied to $x$". To **evaluate** $f(3)$, substitute $x=3$. The **inverse** $f^{-1}(x)$ reverses the rule — swap $x$ and $y$ and rearrange. A **composite** $fg(x)$ means "do $g$ first, then $f$".

### Straight lines
$$ y = mx + c $$
where $m$ is the gradient and $c$ the $y$-intercept. The gradient between two points is
$$ m = \\frac{y_2 - y_1}{x_2 - x_1}. $$
Parallel lines share a gradient; perpendicular gradients multiply to $-1$.

### Recognising shapes
| Equation | Shape |
|---|---|
| $y = mx+c$ | straight line |
| $y = ax^2+bx+c$ | parabola |
| $y = ax^3+\\dots$ | cubic |
| $y = \\dfrac{k}{x}$ | hyperbola (reciprocal) |
| $y = a^{x}$ | exponential growth/decay |

### Turning points
A quadratic in completed-square form $y = (x-h)^2 + k$ has its vertex at $(h, k)$. This is the minimum (if it opens up) or maximum (if it opens down).

### Solving graphically
The solutions of $f(x) = g(x)$ are the $x$-coordinates where the two graphs intersect.
`,
      formulas: [
        { name: 'Straight line', expr: 'y = mx + c' },
        { name: 'Gradient', expr: 'm = \\dfrac{y_2 - y_1}{x_2 - x_1}' },
        { name: 'Perpendicular gradients', expr: 'm_1 \\times m_2 = -1' },
        { name: 'Vertex form', expr: 'y = (x-h)^2 + k \\ \\Rightarrow\\ \\text{vertex } (h,k)' },
      ],
      examples: [
        {
          problem: 'Find the equation of the line through $(1, 2)$ and $(3, 8)$.',
          solution:
            'Gradient $m = \\dfrac{8-2}{3-1} = 3$. Using $y - 2 = 3(x-1)$ gives $y = 3x - 1$.',
        },
        {
          problem: 'If $f(x) = 2x - 1$, find $f^{-1}(x)$.',
          solution:
            'Let $y = 2x-1$, swap: $x = 2y-1$, rearrange: $y = \\dfrac{x+1}{2}$. So $f^{-1}(x) = \\dfrac{x+1}{2}$.',
        },
      ],
      practice: [
        {
          id: 'fn-1',
          difficulty: 'Easy',
          question: 'If $f(x) = x^2 - 4$, find $f(-3)$.',
          answer: '$5$',
        },
        {
          id: 'fn-2',
          difficulty: 'Medium',
          question: 'Find the gradient of a line perpendicular to $y = \\tfrac{1}{2}x + 4$.',
          answer: '$-2$',
          solution: 'The given gradient is $\\tfrac12$; perpendicular gradient $= -1 \\div \\tfrac12 = -2$.',
        },
        {
          id: 'fn-3',
          difficulty: 'Medium',
          question: 'Write $y = x^2 + 6x + 5$ in vertex form and state the turning point.',
          answer: '$y = (x+3)^2 - 4$, vertex $(-3,-4)$',
          solution: 'Complete the square: $(x+3)^2 - 9 + 5 = (x+3)^2 - 4$.',
        },
        {
          id: 'fn-4',
          difficulty: 'Hard',
          question: 'Given $f(x)=2x+1$ and $g(x)=x^2$, find $fg(x)$ and $gf(x)$.',
          answer: '$fg(x) = 2x^2 + 1$, $gf(x) = (2x+1)^2$',
          solution: '$fg(x)=f(x^2)=2x^2+1$. $gf(x)=g(2x+1)=(2x+1)^2$.',
        },
      ],
    },
    {
      id: 'trigonometry',
      title: 'Trigonometry',
      summary: 'Right-angled trig, sine & cosine rules, area of a triangle, bearings.',
      content: `
## Right-angled triangles (SOH–CAH–TOA)
For an angle $\\theta$ in a right-angled triangle:
$$ \\sin\\theta = \\frac{\\text{opp}}{\\text{hyp}}, \\quad \\cos\\theta = \\frac{\\text{adj}}{\\text{hyp}}, \\quad \\tan\\theta = \\frac{\\text{opp}}{\\text{adj}}. $$
Use **Pythagoras** $a^2 + b^2 = c^2$ to find a missing side when no angle is involved.

## Non-right-angled triangles
**Sine rule** (use when you have a side–angle pair):
$$ \\frac{a}{\\sin A} = \\frac{b}{\\sin B} = \\frac{c}{\\sin C}. $$
**Cosine rule** (use for SAS or three sides):
$$ a^2 = b^2 + c^2 - 2bc\\cos A. $$
**Area** of any triangle:
$$ \\text{Area} = \\tfrac{1}{2}ab\\sin C. $$

## Bearings
Bearings are measured **clockwise from North** and always written with three figures, e.g. $075^\\circ$ or $240^\\circ$.

### Choosing the right tool
- Right angle present → SOH-CAH-TOA / Pythagoras.
- Two angles & a side, or two sides & a non-included angle → sine rule.
- Two sides & the included angle, or all three sides → cosine rule.
`,
      formulas: [
        { name: 'Pythagoras', expr: 'a^2 + b^2 = c^2' },
        { name: 'Sine rule', expr: '\\dfrac{a}{\\sin A} = \\dfrac{b}{\\sin B} = \\dfrac{c}{\\sin C}' },
        { name: 'Cosine rule', expr: 'a^2 = b^2 + c^2 - 2bc\\cos A' },
        { name: 'Area of a triangle', expr: '\\tfrac{1}{2}ab\\sin C' },
      ],
      examples: [
        {
          problem: 'A ladder reaches 4 m up a wall at an angle of $65^\\circ$ to the ground. How long is the ladder?',
          solution:
            'The 4 m is opposite the $65^\\circ$ angle and we want the hypotenuse: $\\sin 65^\\circ = \\dfrac{4}{L}$, so $L = \\dfrac{4}{\\sin 65^\\circ} = 4.41$ m (3 s.f.).',
        },
        {
          problem: 'In triangle $ABC$, $b = 7$, $c = 5$, $A = 60^\\circ$. Find $a$.',
          solution:
            'Cosine rule: $a^2 = 7^2 + 5^2 - 2(7)(5)\\cos 60^\\circ = 49 + 25 - 35 = 39$, so $a = \\sqrt{39} = 6.24$ (3 s.f.).',
        },
      ],
      practice: [
        {
          id: 'trig-1',
          difficulty: 'Easy',
          question: 'Find $x$ if $\\tan 30^\\circ = \\dfrac{x}{10}$.',
          answer: '$x = 5.77$ (3 s.f.)',
          solution: '$x = 10\\tan 30^\\circ = 5.77$.',
        },
        {
          id: 'trig-2',
          difficulty: 'Medium',
          question: 'Find the area of a triangle with sides $8$ and $11$ enclosing an angle of $40^\\circ$.',
          answer: '$28.3\\ \\text{units}^2$',
          solution: 'Area $= \\tfrac12(8)(11)\\sin 40^\\circ = 44\\sin 40^\\circ = 28.3$.',
        },
        {
          id: 'trig-3',
          difficulty: 'Medium',
          question: 'In triangle $PQR$, $p = 9$, $\\angle P = 50^\\circ$, $\\angle Q = 60^\\circ$. Find $q$.',
          answer: '$q = 10.2$ (3 s.f.)',
          solution: '$\\dfrac{q}{\\sin 60^\\circ} = \\dfrac{9}{\\sin 50^\\circ} \\Rightarrow q = \\dfrac{9\\sin 60^\\circ}{\\sin 50^\\circ} = 10.2$.',
        },
        {
          id: 'trig-4',
          difficulty: 'Hard',
          question: 'A ship sails 12 km on a bearing of $060^\\circ$, then 8 km on a bearing of $150^\\circ$. How far is it from the start?',
          answer: '$14.4$ km',
          solution: 'The two legs are perpendicular ($150^\\circ-60^\\circ=90^\\circ$), so distance $= \\sqrt{12^2+8^2} = \\sqrt{208} = 14.4$ km.',
        },
      ],
    },
    {
      id: 'mensuration',
      title: 'Mensuration',
      summary: 'Perimeter, area, surface area and volume of 2D and 3D shapes.',
      content: `
## Areas you must know
$$ \\text{rectangle } = bh, \\quad \\text{triangle } = \\tfrac12 bh, \\quad \\text{circle } = \\pi r^2. $$
A **trapezium** has area $\\tfrac12(a+b)h$ where $a,b$ are the parallel sides.

## Circles
$$ \\text{circumference} = 2\\pi r = \\pi d, \\qquad \\text{area} = \\pi r^2. $$
An **arc** of angle $\\theta$ is the fraction $\\dfrac{\\theta}{360}$ of the circumference; a **sector** is the same fraction of the area.

## Volumes & surface areas
$$ \\text{prism} = (\\text{cross-section area}) \\times \\text{length}. $$
$$ \\text{cylinder} = \\pi r^2 h, \\qquad \\text{sphere} = \\tfrac{4}{3}\\pi r^3, \\qquad \\text{cone} = \\tfrac{1}{3}\\pi r^2 h. $$

## Units
Be careful: **area** units scale by the square of a length ratio and **volume** by the cube. If lengths are in the ratio $1:k$, areas are $1:k^2$ and volumes $1:k^3$.
`,
      formulas: [
        { name: 'Circle area / circumference', expr: 'A = \\pi r^2,\\quad C = 2\\pi r' },
        { name: 'Cylinder volume', expr: 'V = \\pi r^2 h' },
        { name: 'Sphere volume', expr: 'V = \\tfrac{4}{3}\\pi r^3' },
        { name: 'Cone volume', expr: 'V = \\tfrac{1}{3}\\pi r^2 h' },
        { name: 'Sector area', expr: '\\dfrac{\\theta}{360}\\,\\pi r^2' },
      ],
      examples: [
        {
          problem: 'Find the volume of a cylinder with radius 3 cm and height 10 cm. Leave your answer in terms of $\\pi$.',
          solution: '$V = \\pi r^2 h = \\pi (3)^2 (10) = 90\\pi \\ \\text{cm}^3.$',
        },
        {
          problem: 'A sector has radius 6 cm and angle $120^\\circ$. Find its area to 3 s.f.',
          solution: 'Area $= \\dfrac{120}{360}\\pi(6)^2 = \\dfrac{1}{3}\\times 36\\pi = 12\\pi = 37.7\\ \\text{cm}^2.$',
        },
      ],
      practice: [
        {
          id: 'men-1',
          difficulty: 'Easy',
          question: 'Find the area of a circle of radius 7 cm (3 s.f.).',
          answer: '$153.9\\ \\text{cm}^2$',
          solution: '$A = \\pi(7)^2 = 49\\pi = 153.9\\ \\text{cm}^2$.',
        },
        {
          id: 'men-2',
          difficulty: 'Medium',
          question: 'A trapezium has parallel sides 5 cm and 9 cm and height 4 cm. Find its area.',
          answer: '$28\\ \\text{cm}^2$',
          solution: 'Area $= \\tfrac12(5+9)(4) = \\tfrac12 \\times 14 \\times 4 = 28$.',
        },
        {
          id: 'men-3',
          difficulty: 'Medium',
          question: 'Find the volume of a sphere of radius 5 cm to 3 s.f.',
          answer: '$524\\ \\text{cm}^3$',
          solution: '$V = \\tfrac43\\pi(5)^3 = \\tfrac{500}{3}\\pi = 523.6 \\approx 524$.',
        },
        {
          id: 'men-4',
          difficulty: 'Hard',
          question: 'Two similar cones have heights in the ratio $2:3$. The smaller has volume $16\\ \\text{cm}^3$. Find the larger volume.',
          answer: '$54\\ \\text{cm}^3$',
          solution: 'Volume ratio $= 2^3 : 3^3 = 8:27$. So $V = 16 \\times \\tfrac{27}{8} = 54\\ \\text{cm}^3$.',
        },
      ],
    },
    {
      id: 'statistics-probability',
      title: 'Statistics & Probability',
      summary: 'Averages, charts, cumulative frequency and probability rules.',
      content: `
## Summarising data
- **Mean** $= \\dfrac{\\sum x}{n}$ (or $\\dfrac{\\sum fx}{\\sum f}$ for frequency data).
- **Median** = middle value when ordered.
- **Mode** = most common value.
- **Range** = largest $-$ smallest.

For grouped data, use the **midpoint** of each class as $x$ to estimate the mean.

## Cumulative frequency
Plotting the running total against the **upper class boundary** gives an S-shaped curve. From it you can read the **median** (50%), **lower quartile** (25%), **upper quartile** (75%) and the **interquartile range** $\\text{IQR} = Q_3 - Q_1$.

## Probability
$$ P(\\text{event}) = \\frac{\\text{number of favourable outcomes}}{\\text{total number of outcomes}}. $$
- Mutually exclusive (OR): $P(A \\text{ or } B) = P(A) + P(B)$.
- Independent (AND): $P(A \\text{ and } B) = P(A)\\times P(B)$.
- Complement: $P(\\text{not } A) = 1 - P(A)$.

**Tree diagrams** multiply along branches and add between branches.
`,
      formulas: [
        { name: 'Mean (frequency)', expr: '\\bar{x} = \\dfrac{\\sum fx}{\\sum f}' },
        { name: 'Probability', expr: 'P(A) = \\dfrac{n(\\text{favourable})}{n(\\text{total})}' },
        { name: 'Independent events', expr: 'P(A \\cap B) = P(A)\\,P(B)' },
        { name: 'Interquartile range', expr: '\\text{IQR} = Q_3 - Q_1' },
      ],
      examples: [
        {
          problem: 'Find the mean of $4, 7, 7, 10, 12$.',
          solution: '$\\bar{x} = \\dfrac{4+7+7+10+12}{5} = \\dfrac{40}{5} = 8.$',
        },
        {
          problem: 'A bag has 5 red and 3 blue counters. Two are drawn without replacement. Find $P(\\text{both red})$.',
          solution:
            'First red: $\\tfrac58$. Second red: $\\tfrac47$. Multiply along the branch:\n$$P = \\frac58 \\times \\frac47 = \\frac{20}{56} = \\frac{5}{14}.$$',
        },
      ],
      practice: [
        {
          id: 'stat-1',
          difficulty: 'Easy',
          question: 'Find the median of $3, 8, 1, 9, 5$.',
          answer: '$5$',
          solution: 'Ordered: $1,3,5,8,9$. Middle value is $5$.',
        },
        {
          id: 'stat-2',
          difficulty: 'Medium',
          question: 'A fair die is rolled. Find $P(\\text{even or } 5)$.',
          answer: '$\\tfrac{2}{3}$',
          solution: 'Even $= \\{2,4,6\\}$ plus $\\{5\\}$ gives 4 outcomes: $\\tfrac46 = \\tfrac23$.',
        },
        {
          id: 'stat-3',
          difficulty: 'Medium',
          question: 'The probability it rains is $0.3$. Find the probability it does not rain on two independent days.',
          answer: '$0.49$',
          solution: '$P(\\text{no rain}) = 0.7$, so $0.7 \\times 0.7 = 0.49$.',
        },
        {
          id: 'stat-4',
          difficulty: 'Hard',
          question: '5 numbers have a mean of 12. A sixth number is added and the mean becomes 13. Find the sixth number.',
          answer: '$18$',
          solution: 'Original total $= 60$. New total $= 6 \\times 13 = 78$. Sixth number $= 78 - 60 = 18$.',
        },
      ],
    },
  ],
};

const IB_AA: Course = {
  id: 'ib-aa',
  board: 'IB',
  title: 'IB Math: Analysis & Approaches',
  level: 'SL & HL',
  tagline: 'For students who love algebra, proof and calculus.',
  description:
    'The Analysis & Approaches course emphasises algebraic manipulation, mathematical reasoning and a strong calculus toolkit. Topics marked (HL) go beyond the Standard Level core.',
  accent: 'from-emerald-500 to-teal-600',
  topics: [
    {
      id: 'number-algebra',
      title: 'Number & Algebra',
      summary: 'Sequences, series, logarithms, the binomial theorem and (HL) proof.',
      content: `
## Sequences & series
**Arithmetic** sequences add a common difference $d$:
$$ u_n = u_1 + (n-1)d, \\qquad S_n = \\frac{n}{2}\\big(2u_1 + (n-1)d\\big). $$
**Geometric** sequences multiply by a common ratio $r$:
$$ u_n = u_1 r^{\\,n-1}, \\qquad S_n = \\frac{u_1(r^n - 1)}{r - 1}. $$
A geometric series **converges** when $|r| < 1$ to the sum to infinity
$$ S_\\infty = \\frac{u_1}{1 - r}. $$

## Logarithms
$\\log_a b = c \\iff a^c = b$. The laws:
$$ \\log(xy) = \\log x + \\log y, \\quad \\log\\frac{x}{y} = \\log x - \\log y, \\quad \\log x^n = n\\log x. $$
Change of base: $\\log_a x = \\dfrac{\\log_b x}{\\log_b a}$.

## Binomial theorem
$$ (a+b)^n = \\sum_{r=0}^{n} \\binom{n}{r} a^{n-r} b^{r}, \\qquad \\binom{n}{r} = \\frac{n!}{r!\\,(n-r)!}. $$

## (HL) Proof
You should be able to prove results by **deduction**, by **contradiction**, and using **mathematical induction** — prove the base case, assume true for $n=k$, then show it holds for $n=k+1$.
`,
      formulas: [
        { name: 'Arithmetic sum', expr: 'S_n = \\tfrac{n}{2}\\big(2u_1+(n-1)d\\big)' },
        { name: 'Geometric sum', expr: 'S_n = \\dfrac{u_1(r^n-1)}{r-1}' },
        { name: 'Sum to infinity', expr: 'S_\\infty = \\dfrac{u_1}{1-r},\\ |r|<1' },
        { name: 'Binomial coefficient', expr: '\\binom{n}{r} = \\dfrac{n!}{r!(n-r)!}' },
        { name: 'Change of base', expr: '\\log_a x = \\dfrac{\\log_b x}{\\log_b a}' },
      ],
      examples: [
        {
          problem: 'A geometric series has first term 8 and ratio $\\tfrac12$. Find its sum to infinity.',
          solution: 'Since $|r| = \\tfrac12 < 1$, $S_\\infty = \\dfrac{8}{1 - \\tfrac12} = 16.$',
        },
        {
          problem: 'Find the term independent of $x$ in $\\left(2x + \\dfrac{1}{x}\\right)^6$.',
          solution:
            'General term: $\\binom{6}{r}(2x)^{6-r}\\left(\\tfrac1x\\right)^r = \\binom{6}{r}2^{6-r}x^{6-2r}$. Independent of $x$ when $6-2r=0$, i.e. $r=3$: $\\binom{6}{3}2^{3} = 20 \\times 8 = 160.$',
        },
      ],
      practice: [
        {
          id: 'aa-na-1',
          difficulty: 'Easy',
          question: 'Find the 10th term of the arithmetic sequence $3, 7, 11, \\dots$',
          answer: '$39$',
          solution: '$u_{10} = 3 + 9(4) = 39$.',
        },
        {
          id: 'aa-na-2',
          difficulty: 'Medium',
          question: 'Solve $2^{x} = 20$, giving $x$ to 3 s.f.',
          answer: '$x = 4.32$',
          solution: '$x = \\log_2 20 = \\dfrac{\\ln 20}{\\ln 2} = 4.32$.',
        },
        {
          id: 'aa-na-3',
          difficulty: 'Medium',
          question: 'Find $\\sum_{n=1}^{8} (3n - 1)$.',
          answer: '$100$',
          solution: 'Arithmetic with $u_1 = 2$, $d = 3$: $S_8 = \\tfrac82(2\\cdot2 + 7\\cdot3) = 4(25) = 100$.',
        },
        {
          id: 'aa-na-4',
          difficulty: 'Hard',
          question: '(HL) Prove that $\\sum_{r=1}^{n} r = \\tfrac{n(n+1)}{2}$ for the base case $n=1$ and the inductive step setup.',
          answer: 'Base: LHS $=1=\\tfrac{1\\cdot2}{2}=$ RHS. Assume true for $n=k$, then add $(k+1)$ to both sides.',
          solution:
            'Base case $n=1$: LHS $= 1$, RHS $= \\tfrac{1(2)}{2} = 1$. ✓\nAssume $\\sum_{r=1}^{k} r = \\tfrac{k(k+1)}{2}$. Then $\\sum_{r=1}^{k+1} r = \\tfrac{k(k+1)}{2} + (k+1) = (k+1)\\tfrac{k+2}{2} = \\tfrac{(k+1)(k+2)}{2}$, which is the formula with $n=k+1$. ∎',
        },
      ],
    },
    {
      id: 'functions',
      title: 'Functions',
      summary: 'Domain/range, transformations, quadratics, exponentials and logs.',
      content: `
## Key vocabulary
- **Domain**: allowed inputs $x$. **Range**: resulting outputs $y$.
- A function is **one-to-one** if it passes the horizontal line test; only then does an inverse $f^{-1}$ exist.
- $f^{-1}$ reflects $f$ in the line $y = x$.

## Transformations of $y = f(x)$
| Transformation | Effect |
|---|---|
| $f(x) + k$ | up $k$ |
| $f(x + k)$ | left $k$ |
| $a\\,f(x)$ | vertical stretch, factor $a$ |
| $f(ax)$ | horizontal stretch, factor $\\tfrac1a$ |
| $-f(x)$ | reflect in $x$-axis |
| $f(-x)$ | reflect in $y$-axis |

## Quadratics
Forms each reveal something:
- $y = a(x-h)^2 + k$ → vertex $(h,k)$.
- $y = a(x-p)(x-q)$ → roots $p, q$.
The discriminant $\\Delta = b^2 - 4ac$ gives the number of real roots.

## Exponentials & logs
$y = a^x$ and $y = \\log_a x$ are inverses. The natural pair is $e^x$ and $\\ln x$, used everywhere in calculus. Exponential models: $A = A_0 e^{kt}$.
`,
      formulas: [
        { name: 'Vertex form', expr: 'y = a(x-h)^2 + k' },
        { name: 'Inverse reflection', expr: 'y = f^{-1}(x)\\ \\text{reflects } f \\text{ in } y=x' },
        { name: 'Exponential model', expr: 'A = A_0 e^{kt}' },
        { name: 'Log–exp inverse', expr: 'y = a^x \\iff x = \\log_a y' },
      ],
      examples: [
        {
          problem: 'Find the inverse of $f(x) = 3x - 2$ and state its domain.',
          solution:
            'Let $y = 3x - 2$, swap and solve: $x = 3y - 2 \\Rightarrow y = \\dfrac{x+2}{3}$. So $f^{-1}(x) = \\dfrac{x+2}{3}$, domain $x \\in \\mathbb{R}$.',
        },
        {
          problem: 'Describe the transformation taking $y = x^2$ to $y = (x-3)^2 + 1$.',
          solution: 'Translation 3 units right and 1 unit up; vertex moves from $(0,0)$ to $(3,1)$.',
        },
      ],
      practice: [
        {
          id: 'aa-fn-1',
          difficulty: 'Easy',
          question: 'State the range of $f(x) = x^2 + 2$ for $x \\in \\mathbb{R}$.',
          answer: '$y \\ge 2$',
        },
        {
          id: 'aa-fn-2',
          difficulty: 'Medium',
          question: 'The graph of $y = f(x)$ is translated so that $y = f(x-2) + 3$. Describe the translation.',
          answer: '2 right, 3 up',
        },
        {
          id: 'aa-fn-3',
          difficulty: 'Medium',
          question: 'Solve $\\ln(2x - 1) = 3$ to 3 s.f.',
          answer: '$x = 10.5$',
          solution: '$2x - 1 = e^3 = 20.09$, so $x = \\dfrac{21.09}{2} = 10.5$.',
        },
        {
          id: 'aa-fn-4',
          difficulty: 'Hard',
          question: 'Find the values of $k$ for which $x^2 + kx + 9 = 0$ has equal roots.',
          answer: '$k = \\pm 6$',
          solution: 'Equal roots ⇒ $\\Delta = 0$: $k^2 - 36 = 0 \\Rightarrow k = \\pm 6$.',
        },
      ],
    },
    {
      id: 'calculus',
      title: 'Calculus',
      summary: 'Differentiation, integration, kinematics and (HL) further techniques.',
      content: `
## Differentiation
The derivative $\\dfrac{dy}{dx}$ measures the gradient. The **power rule**:
$$ \\frac{d}{dx}(x^n) = n x^{n-1}. $$
Standard derivatives: $\\dfrac{d}{dx}(\\sin x) = \\cos x$, $\\dfrac{d}{dx}(e^x) = e^x$, $\\dfrac{d}{dx}(\\ln x) = \\dfrac1x$.

**Rules:**
- Chain rule: $\\dfrac{dy}{dx} = \\dfrac{dy}{du}\\dfrac{du}{dx}$.
- Product rule: $(uv)' = u'v + uv'$.
- Quotient rule: $\\left(\\dfrac{u}{v}\\right)' = \\dfrac{u'v - uv'}{v^2}$.

## Stationary points
Solve $f'(x) = 0$. Classify with $f''(x)$: positive → minimum, negative → maximum.

## Integration
Integration reverses differentiation:
$$ \\int x^n \\, dx = \\frac{x^{n+1}}{n+1} + c \\quad (n \\ne -1). $$
The **definite integral** gives area under a curve:
$$ \\int_a^b f(x)\\,dx = F(b) - F(a). $$

## Kinematics
Displacement $s$, velocity $v = \\dfrac{ds}{dt}$, acceleration $a = \\dfrac{dv}{dt}$. Going back, $s = \\int v\\,dt$.

## (HL) Further tools
Integration by substitution and by parts $\\int u\\,dv = uv - \\int v\\,du$; differentiating implicitly; related rates.
`,
      formulas: [
        { name: 'Power rule (deriv.)', expr: '\\dfrac{d}{dx}x^n = n x^{n-1}' },
        { name: 'Power rule (integral)', expr: '\\int x^n\\,dx = \\dfrac{x^{n+1}}{n+1}+c' },
        { name: 'Chain rule', expr: '\\dfrac{dy}{dx} = \\dfrac{dy}{du}\\dfrac{du}{dx}' },
        { name: 'Product rule', expr: '(uv)\\,\' = u\\,\'v + uv\\,\'' },
        { name: 'Definite integral', expr: '\\int_a^b f(x)\\,dx = F(b)-F(a)' },
      ],
      examples: [
        {
          problem: 'Differentiate $y = 3x^4 - 5x^2 + 7$.',
          solution: '$\\dfrac{dy}{dx} = 12x^3 - 10x.$',
        },
        {
          problem: 'Find the stationary point of $y = x^2 - 6x + 5$ and classify it.',
          solution:
            '$\\dfrac{dy}{dx} = 2x - 6 = 0 \\Rightarrow x = 3$, giving $y = -4$. Since $\\dfrac{d^2y}{dx^2} = 2 > 0$, $(3,-4)$ is a minimum.',
        },
        {
          problem: 'Evaluate $\\int_0^2 (3x^2)\\,dx$.',
          solution: '$\\big[x^3\\big]_0^2 = 8 - 0 = 8.$',
        },
      ],
      practice: [
        {
          id: 'aa-cal-1',
          difficulty: 'Easy',
          question: 'Differentiate $y = x^3 - 4x$.',
          answer: '$\\dfrac{dy}{dx} = 3x^2 - 4$',
        },
        {
          id: 'aa-cal-2',
          difficulty: 'Medium',
          question: 'Find $\\int (4x^3 - 2x)\\,dx$.',
          answer: '$x^4 - x^2 + c$',
        },
        {
          id: 'aa-cal-3',
          difficulty: 'Medium',
          question: 'Differentiate $y = \\sin(3x)$ using the chain rule.',
          answer: '$3\\cos(3x)$',
          solution: 'Let $u = 3x$: $\\dfrac{dy}{dx} = \\cos u \\cdot 3 = 3\\cos(3x)$.',
        },
        {
          id: 'aa-cal-4',
          difficulty: 'Hard',
          question: 'A particle has velocity $v = 3t^2 - 12t + 9$. Find the times when it is at rest.',
          answer: '$t = 1$ and $t = 3$',
          solution: 'At rest when $v=0$: $3(t^2-4t+3)=3(t-1)(t-3)=0$, so $t=1,3$.',
        },
      ],
    },
    {
      id: 'trig-geometry',
      title: 'Geometry & Trigonometry',
      summary: 'Radians, the unit circle, identities and solving trig equations.',
      content: `
## Radians
$$ \\pi \\text{ rad} = 180^\\circ, \\qquad \\theta_{\\text{rad}} = \\theta_{\\deg}\\times\\frac{\\pi}{180}. $$
Arc length $s = r\\theta$ and sector area $A = \\tfrac12 r^2\\theta$ (with $\\theta$ in radians).

## The unit circle & exact values
On the unit circle, $\\cos\\theta$ is the $x$-coordinate and $\\sin\\theta$ the $y$-coordinate. Learn the exact values at $0, \\tfrac\\pi6, \\tfrac\\pi4, \\tfrac\\pi3, \\tfrac\\pi2$.

## Identities
$$ \\sin^2\\theta + \\cos^2\\theta = 1, \\qquad \\tan\\theta = \\frac{\\sin\\theta}{\\cos\\theta}. $$
**Double angle:**
$$ \\sin 2\\theta = 2\\sin\\theta\\cos\\theta, \\qquad \\cos 2\\theta = \\cos^2\\theta - \\sin^2\\theta = 1 - 2\\sin^2\\theta. $$

## Solving trig equations
Find all solutions in the given interval using the symmetry of the graphs — remember each value of $\\sin$ or $\\cos$ generally gives **two** solutions per $2\\pi$.
`,
      formulas: [
        { name: 'Degrees ↔ radians', expr: '\\pi\\ \\text{rad} = 180^\\circ' },
        { name: 'Arc & sector', expr: 's = r\\theta,\\quad A = \\tfrac12 r^2\\theta' },
        { name: 'Pythagorean identity', expr: '\\sin^2\\theta + \\cos^2\\theta = 1' },
        { name: 'Double angle', expr: '\\sin 2\\theta = 2\\sin\\theta\\cos\\theta' },
      ],
      examples: [
        {
          problem: 'Convert $120^\\circ$ to radians.',
          solution: '$120 \\times \\dfrac{\\pi}{180} = \\dfrac{2\\pi}{3}.$',
        },
        {
          problem: 'Solve $\\sin\\theta = \\tfrac12$ for $0 \\le \\theta < 2\\pi$.',
          solution: 'The base angle is $\\tfrac\\pi6$. Sine is positive in quadrants 1 and 2: $\\theta = \\dfrac{\\pi}{6}$ or $\\dfrac{5\\pi}{6}$.',
        },
      ],
      practice: [
        {
          id: 'aa-tg-1',
          difficulty: 'Easy',
          question: 'Find the arc length of a sector with $r = 4$ and $\\theta = \\tfrac{\\pi}{3}$.',
          answer: '$\\dfrac{4\\pi}{3}$',
          solution: '$s = r\\theta = 4 \\times \\tfrac{\\pi}{3} = \\tfrac{4\\pi}{3}$.',
        },
        {
          id: 'aa-tg-2',
          difficulty: 'Medium',
          question: 'Given $\\cos\\theta = \\tfrac35$ and $\\theta$ acute, find $\\sin\\theta$.',
          answer: '$\\tfrac45$',
          solution: '$\\sin^2\\theta = 1 - \\tfrac{9}{25} = \\tfrac{16}{25}$, so $\\sin\\theta = \\tfrac45$ (positive, acute).',
        },
        {
          id: 'aa-tg-3',
          difficulty: 'Medium',
          question: 'Solve $\\cos\\theta = 0$ for $0 \\le \\theta < 2\\pi$.',
          answer: '$\\theta = \\tfrac{\\pi}{2}, \\tfrac{3\\pi}{2}$',
        },
        {
          id: 'aa-tg-4',
          difficulty: 'Hard',
          question: 'Use a double-angle identity to write $\\cos 2\\theta$ in terms of $\\sin\\theta$ and solve $\\cos 2\\theta = \\sin\\theta$ on $[0, 2\\pi)$ — give the equation to solve.',
          answer: '$1 - 2\\sin^2\\theta = \\sin\\theta \\Rightarrow 2\\sin^2\\theta + \\sin\\theta - 1 = 0$',
          solution: 'Factor: $(2\\sin\\theta - 1)(\\sin\\theta + 1) = 0$, so $\\sin\\theta = \\tfrac12$ or $-1$, giving $\\theta = \\tfrac\\pi6, \\tfrac{5\\pi}6, \\tfrac{3\\pi}2$.',
        },
      ],
    },
    {
      id: 'statistics-probability',
      title: 'Statistics & Probability',
      summary: 'Data analysis, probability, and the normal & binomial distributions.',
      content: `
## Descriptive statistics
Mean, median, mode, range, quartiles and standard deviation summarise data. Use your GDC to find the mean $\\bar{x}$ and standard deviation $\\sigma$ quickly.

## Probability
$$ P(A \\cup B) = P(A) + P(B) - P(A \\cap B). $$
**Conditional probability:**
$$ P(A \\mid B) = \\frac{P(A \\cap B)}{P(B)}. $$
Events are **independent** iff $P(A \\cap B) = P(A)P(B)$.

## Discrete random variables
The **expected value** is
$$ E(X) = \\sum x\\, P(X = x). $$

## The binomial distribution
$X \\sim B(n, p)$ models $n$ independent trials with success probability $p$:
$$ P(X = r) = \\binom{n}{r} p^r (1-p)^{n-r}, \\quad E(X) = np. $$

## The normal distribution
$X \\sim N(\\mu, \\sigma^2)$ is the classic bell curve, symmetric about $\\mu$. Use your GDC for probabilities and inverse-normal values.
`,
      formulas: [
        { name: 'Addition rule', expr: 'P(A\\cup B)=P(A)+P(B)-P(A\\cap B)' },
        { name: 'Conditional', expr: 'P(A\\mid B)=\\dfrac{P(A\\cap B)}{P(B)}' },
        { name: 'Expected value', expr: 'E(X)=\\sum x\\,P(X=x)' },
        { name: 'Binomial', expr: 'P(X=r)=\\binom{n}{r}p^r(1-p)^{n-r}' },
      ],
      examples: [
        {
          problem: 'A fair coin is tossed 5 times. Find $P(\\text{exactly 3 heads})$.',
          solution:
            '$X \\sim B(5, 0.5)$. $P(X=3) = \\binom{5}{3}(0.5)^3(0.5)^2 = 10 \\times 0.03125 = 0.3125.$',
        },
        {
          problem: 'For the distribution $P(X=1)=0.5, P(X=2)=0.3, P(X=3)=0.2$, find $E(X)$.',
          solution: '$E(X) = 1(0.5) + 2(0.3) + 3(0.2) = 0.5 + 0.6 + 0.6 = 1.7.$',
        },
      ],
      practice: [
        {
          id: 'aa-sp-1',
          difficulty: 'Easy',
          question: 'If $P(A) = 0.4$, $P(B) = 0.5$ and $A, B$ are independent, find $P(A \\cap B)$.',
          answer: '$0.2$',
        },
        {
          id: 'aa-sp-2',
          difficulty: 'Medium',
          question: '$X \\sim B(10, 0.3)$. Find $E(X)$.',
          answer: '$3$',
          solution: '$E(X) = np = 10 \\times 0.3 = 3$.',
        },
        {
          id: 'aa-sp-3',
          difficulty: 'Medium',
          question: '$P(A)=0.6$, $P(B)=0.5$, $P(A\\cap B)=0.3$. Find $P(A\\cup B)$.',
          answer: '$0.8$',
          solution: '$0.6 + 0.5 - 0.3 = 0.8$.',
        },
        {
          id: 'aa-sp-4',
          difficulty: 'Hard',
          question: '$X \\sim B(6, 0.4)$. Find $P(X \\ge 1)$ to 3 s.f.',
          answer: '$0.953$',
          solution: '$P(X\\ge1) = 1 - P(X=0) = 1 - (0.6)^6 = 1 - 0.0467 = 0.953$.',
        },
      ],
    },
  ],
};

const IB_AI: Course = {
  id: 'ib-ai',
  board: 'IB',
  title: 'IB Math: Applications & Interpretation',
  level: 'SL & HL',
  tagline: 'Maths in the real world — modelling, stats and technology.',
  description:
    'Applications & Interpretation focuses on modelling real situations, statistics and the effective use of technology (your GDC). Ideal for students heading into social sciences, design, business and natural sciences.',
  accent: 'from-amber-500 to-orange-600',
  topics: [
    {
      id: 'number-algebra',
      title: 'Number & Algebra',
      summary: 'Standard form, sequences, financial maths and approximation.',
      content: `
## Approximation & error
Real-world data is never exact. The **percentage error** of an approximation is
$$ \\varepsilon = \\left| \\frac{v_A - v_E}{v_E} \\right| \\times 100\\%, $$
where $v_A$ is the approximate and $v_E$ the exact value.

## Sequences & series
The same arithmetic and geometric tools appear, often in financial contexts:
$$ u_n = u_1 + (n-1)d, \\qquad u_n = u_1 r^{\\,n-1}. $$

## Financial mathematics
**Compound interest** with $k$ compounding periods per year:
$$ FV = PV\\left(1 + \\frac{r}{100k}\\right)^{kn}. $$
You will also use your GDC's **finance solver** for loans, annuities and amortisation, and understand inflation and depreciation as exponential change.
`,
      formulas: [
        { name: 'Percentage error', expr: '\\varepsilon = \\left|\\dfrac{v_A - v_E}{v_E}\\right|\\times100\\%' },
        { name: 'Compound interest', expr: 'FV = PV\\left(1+\\dfrac{r}{100k}\\right)^{kn}' },
        { name: 'Arithmetic term', expr: 'u_n = u_1 + (n-1)d' },
        { name: 'Geometric term', expr: 'u_n = u_1 r^{\\,n-1}' },
      ],
      examples: [
        {
          problem: 'The exact value is 50 but a model predicts 47. Find the percentage error.',
          solution: '$\\varepsilon = \\left|\\dfrac{47 - 50}{50}\\right| \\times 100\\% = 6\\%.$',
        },
        {
          problem: '\\$5000 is invested at 3% per year, compounded monthly. Find the value after 4 years.',
          solution:
            '$FV = 5000\\left(1 + \\dfrac{3}{1200}\\right)^{48} = 5000(1.0025)^{48} = \\$5636.64$ (2 d.p.).',
        },
      ],
      practice: [
        {
          id: 'ai-na-1',
          difficulty: 'Easy',
          question: 'Round $3.14159$ to 3 significant figures.',
          answer: '$3.14$',
        },
        {
          id: 'ai-na-2',
          difficulty: 'Medium',
          question: 'A length is measured as 24 cm but is actually 25 cm. Find the percentage error.',
          answer: '$4\\%$',
          solution: '$\\left|\\dfrac{24-25}{25}\\right|\\times100 = 4\\%$.',
        },
        {
          id: 'ai-na-3',
          difficulty: 'Medium',
          question: '\\$2000 grows at 5% per year compound interest. Find the value after 6 years (2 d.p.).',
          answer: '\\$2680.19',
          solution: '$2000(1.05)^6 = 2000 \\times 1.340096 = \\$2680.19$.',
        },
        {
          id: 'ai-na-4',
          difficulty: 'Hard',
          question: 'A car worth \\$30000 depreciates 12% per year. After how many whole years is it worth under \\$15000?',
          answer: '6 years',
          solution: 'Solve $30000(0.88)^n < 15000 \\Rightarrow (0.88)^n < 0.5 \\Rightarrow n > \\dfrac{\\ln 0.5}{\\ln 0.88} = 5.42$, so $n = 6$.',
        },
      ],
    },
    {
      id: 'functions',
      title: 'Functions & Modelling',
      summary: 'Linear, quadratic, exponential and other models of real data.',
      content: `
## Modelling philosophy
In AI, functions are **models** of real situations. You choose a model, fit it (often with technology), and **interpret** its parameters and predictions in context.

## Common models
| Model | Form | Typical use |
|---|---|---|
| Linear | $y = mx + c$ | constant rate of change |
| Quadratic | $y = ax^2+bx+c$ | projectile, optimisation |
| Exponential | $y = k a^x + c$ | growth, decay, cooling |
| Power | $y = a x^b$ | scaling laws |
| Sinusoidal | $y = a\\sin(b(x-c)) + d$ | tides, seasons |

## Interpreting parameters
For $y = a\\sin(b(x-c)) + d$: $a$ is the **amplitude**, the period is $\\dfrac{2\\pi}{b}$ (or $\\dfrac{360^\\circ}{b}$), $c$ is the horizontal shift and $d$ the **midline** (vertical shift).

## Using your GDC
Enter data, choose a regression type, and read off the model and the correlation coefficient $r$. Always sanity-check predictions and beware **extrapolation** far outside the data.
`,
      formulas: [
        { name: 'Exponential model', expr: 'y = k\\,a^{x} + c' },
        { name: 'Sinusoidal model', expr: 'y = a\\sin\\!\\big(b(x-c)\\big) + d' },
        { name: 'Period', expr: '\\text{period} = \\dfrac{2\\pi}{b}' },
        { name: 'Power model', expr: 'y = a x^{b}' },
      ],
      examples: [
        {
          problem: 'A sinusoidal model $y = 3\\sin(2x) + 5$ describes a tide. State the amplitude, period and midline.',
          solution: 'Amplitude $= 3$, period $= \\dfrac{2\\pi}{2} = \\pi$, midline $y = 5$.',
        },
        {
          problem: 'A population model is $P = 200(1.05)^t$. Interpret the numbers 200 and 1.05.',
          solution: '$200$ is the initial population; $1.05$ means it grows by 5% each time period $t$.',
        },
      ],
      practice: [
        {
          id: 'ai-fn-1',
          difficulty: 'Easy',
          question: 'For $y = 4\\sin(3x) + 2$, state the amplitude.',
          answer: '$4$',
        },
        {
          id: 'ai-fn-2',
          difficulty: 'Medium',
          question: 'Find the period of $y = \\sin(4x)$ (in radians).',
          answer: '$\\dfrac{\\pi}{2}$',
          solution: 'Period $= \\dfrac{2\\pi}{4} = \\dfrac{\\pi}{2}$.',
        },
        {
          id: 'ai-fn-3',
          difficulty: 'Medium',
          question: 'A model is $T = 80(0.9)^t + 20$ for cooling coffee. Find the temperature as $t \\to \\infty$.',
          answer: '$20$',
          solution: 'As $t\\to\\infty$, $(0.9)^t \\to 0$, so $T \\to 20$ (room temperature).',
        },
        {
          id: 'ai-fn-4',
          difficulty: 'Hard',
          question: 'A quadratic model for height is $h = -5t^2 + 20t$. Find the maximum height.',
          answer: '$20$ m at $t=2$',
          solution: 'Vertex at $t = -\\dfrac{20}{2(-5)} = 2$, giving $h = -5(4)+40 = 20$ m.',
        },
      ],
    },
    {
      id: 'geometry-trig',
      title: 'Geometry & Trigonometry',
      summary: '3D shapes, the sine & cosine rules, and Voronoi diagrams.',
      content: `
## 3D geometry
Find lengths and angles in three dimensions by spotting **right-angled triangles** inside solids, then applying Pythagoras and SOH-CAH-TOA. The angle between a line and a plane, or two planes, often reduces to a 2D triangle.

## Triangle tools
**Sine rule, cosine rule and area** all carry over:
$$ \\frac{a}{\\sin A} = \\frac{b}{\\sin B} = \\frac{c}{\\sin C}, \\quad a^2 = b^2 + c^2 - 2bc\\cos A, \\quad \\text{Area} = \\tfrac12 ab\\sin C. $$

## Surface area & volume
Be ready to combine standard solids — e.g. a cylinder topped with a hemisphere. Volume of a sphere $\\tfrac43\\pi r^3$, cone $\\tfrac13\\pi r^2 h$, and the surface areas on the formula booklet.

## Voronoi diagrams (AI special)
A Voronoi diagram partitions a plane into regions closest to each "site". The boundary between two sites is the **perpendicular bisector** of the segment joining them. Used for the **toxic-waste / nearest-facility** problem: the best site is often a vertex of the diagram, equidistant from three sites.
`,
      formulas: [
        { name: 'Cosine rule', expr: 'a^2 = b^2 + c^2 - 2bc\\cos A' },
        { name: 'Sine rule', expr: '\\dfrac{a}{\\sin A} = \\dfrac{b}{\\sin B} = \\dfrac{c}{\\sin C}' },
        { name: 'Triangle area', expr: '\\tfrac12 ab\\sin C' },
        { name: 'Distance (2 points)', expr: '\\sqrt{(x_2-x_1)^2 + (y_2-y_1)^2}' },
      ],
      examples: [
        {
          problem: 'A cone has base radius 3 cm and slant height 5 cm. Find its vertical height.',
          solution: 'Right triangle: $h = \\sqrt{5^2 - 3^2} = \\sqrt{16} = 4$ cm.',
        },
        {
          problem: 'Find the perpendicular bisector of the points $A(0,0)$ and $B(4,2)$.',
          solution:
            'Midpoint $(2,1)$; gradient of $AB$ is $\\tfrac12$, so bisector gradient $= -2$: $y - 1 = -2(x-2)$, i.e. $y = -2x + 5$.',
        },
      ],
      practice: [
        {
          id: 'ai-gt-1',
          difficulty: 'Easy',
          question: 'Find the distance between $(1,2)$ and $(4,6)$.',
          answer: '$5$',
          solution: '$\\sqrt{3^2 + 4^2} = \\sqrt{25} = 5$.',
        },
        {
          id: 'ai-gt-2',
          difficulty: 'Medium',
          question: 'In triangle $ABC$, $a = 6$, $b = 8$, $C = 55^\\circ$. Find the area (3 s.f.).',
          answer: '$19.7\\ \\text{units}^2$',
          solution: 'Area $= \\tfrac12(6)(8)\\sin 55^\\circ = 24\\sin 55^\\circ = 19.7$.',
        },
        {
          id: 'ai-gt-3',
          difficulty: 'Medium',
          question: 'A cuboid is $3\\times4\\times12$. Find the length of its space diagonal.',
          answer: '$13$',
          solution: '$\\sqrt{3^2 + 4^2 + 12^2} = \\sqrt{169} = 13$.',
        },
        {
          id: 'ai-gt-4',
          difficulty: 'Hard',
          question: 'Find the cosine-rule angle $A$ in a triangle with $a=7$, $b=5$, $c=6$ (3 s.f.).',
          answer: '$A = 78.5^\\circ$',
          solution: '$\\cos A = \\dfrac{5^2+6^2-7^2}{2(5)(6)} = \\dfrac{12}{60} = 0.2$, so $A = 78.5^\\circ$.',
        },
      ],
    },
    {
      id: 'statistics-probability',
      title: 'Statistics & Probability',
      summary: 'Sampling, regression, correlation, distributions and chi-squared.',
      content: `
## Data collection
Understand **sampling** methods (simple random, systematic, stratified, quota, convenience) and their bias. Distinguish discrete vs continuous, and reliability vs validity.

## Bivariate data
The **Pearson correlation coefficient** $r$ (between $-1$ and $1$) measures linear association. The **least-squares regression line** $y = ax + b$ lets you predict — best used **within** the data range. Interpret the gradient and intercept in context.

## Distributions
- **Binomial** $X \\sim B(n,p)$ with $E(X) = np$.
- **Normal** $X \\sim N(\\mu, \\sigma^2)$ — use the GDC for probabilities and inverse-normal cut-offs.

## The $\\chi^2$ test (AI signature)
The chi-squared test of **independence** compares observed and expected frequencies:
$$ \\chi^2_{\\text{calc}} = \\sum \\frac{(f_o - f_e)^2}{f_e}. $$
If $\\chi^2_{\\text{calc}}$ exceeds the critical value (or $p < $ significance level), reject the null hypothesis of independence. Degrees of freedom $= (\\text{rows}-1)(\\text{cols}-1)$.
`,
      formulas: [
        { name: 'Expected frequency', expr: 'f_e = \\dfrac{(\\text{row total})(\\text{col total})}{\\text{grand total}}' },
        { name: 'Chi-squared statistic', expr: '\\chi^2 = \\sum \\dfrac{(f_o - f_e)^2}{f_e}' },
        { name: 'Degrees of freedom', expr: '(r-1)(c-1)' },
        { name: 'Binomial mean', expr: 'E(X) = np' },
      ],
      examples: [
        {
          problem: 'A $2\\times3$ contingency table is tested for independence. State the degrees of freedom.',
          solution: '$(r-1)(c-1) = (2-1)(3-1) = 2.$',
        },
        {
          problem: 'A regression line is $y = 2.5x + 3$. Interpret the gradient if $x$ is hours studied and $y$ is test score.',
          solution: 'Each extra hour of study is associated with an increase of about 2.5 marks in the predicted score.',
        },
      ],
      practice: [
        {
          id: 'ai-sp-1',
          difficulty: 'Easy',
          question: 'A correlation coefficient is $r = -0.92$. Describe the correlation.',
          answer: 'Strong negative (linear) correlation',
        },
        {
          id: 'ai-sp-2',
          difficulty: 'Medium',
          question: 'For a $3\\times4$ chi-squared test, state the degrees of freedom.',
          answer: '$6$',
          solution: '$(3-1)(4-1) = 2 \\times 3 = 6$.',
        },
        {
          id: 'ai-sp-3',
          difficulty: 'Medium',
          question: 'In a chi-squared test, $\\chi^2_{\\text{calc}} = 7.2$ and the critical value is $5.99$. State the conclusion at the 5% level.',
          answer: 'Reject $H_0$: the variables are not independent.',
          solution: 'Since $7.2 > 5.99$, there is sufficient evidence at the 5% level to reject independence.',
        },
        {
          id: 'ai-sp-4',
          difficulty: 'Hard',
          question: 'A cell has row total 40, column total 30, grand total 120. Find the expected frequency.',
          answer: '$10$',
          solution: '$f_e = \\dfrac{40 \\times 30}{120} = 10$.',
        },
      ],
    },
    {
      id: 'calculus',
      title: 'Calculus',
      summary: 'Rates of change, optimisation, area under a curve and the trapezoidal rule.',
      content: `
## Differentiation
$$ \\frac{d}{dx}(x^n) = n x^{n-1}. $$
The derivative is the **instantaneous rate of change** — for example marginal cost, or velocity from displacement.

## Optimisation
To maximise or minimise a quantity:
1. Write it as a function of one variable.
2. Differentiate and solve $f'(x) = 0$.
3. Check it is a max/min and interpret in context.

## Integration & area
$$ \\int x^n\\,dx = \\frac{x^{n+1}}{n+1} + c, \\qquad \\text{Area} = \\int_a^b f(x)\\,dx. $$

## The trapezoidal rule (AI signature)
When a function is awkward to integrate, estimate the area numerically:
$$ \\int_a^b y\\,dx \\approx \\frac{h}{2}\\Big( y_0 + y_n + 2(y_1 + y_2 + \\dots + y_{n-1}) \\Big), $$
where $h = \\dfrac{b-a}{n}$ is the strip width. More strips → better estimate.
`,
      formulas: [
        { name: 'Power rule', expr: '\\dfrac{d}{dx}x^n = n x^{n-1}' },
        { name: 'Integral (area)', expr: '\\text{Area} = \\int_a^b f(x)\\,dx' },
        { name: 'Trapezoidal rule', expr: '\\tfrac{h}{2}\\big(y_0 + y_n + 2\\textstyle\\sum y_i\\big)' },
        { name: 'Strip width', expr: 'h = \\dfrac{b-a}{n}' },
      ],
      examples: [
        {
          problem: 'A box has square base $x$ and height $h$ with fixed volume $32 = x^2 h$. Find the $x$ that minimises surface area $S = x^2 + 4xh$.',
          solution:
            'Substitute $h = \\dfrac{32}{x^2}$: $S = x^2 + \\dfrac{128}{x}$. Then $S\' = 2x - \\dfrac{128}{x^2} = 0 \\Rightarrow x^3 = 64 \\Rightarrow x = 4.$',
        },
        {
          problem: 'Estimate $\\int_0^2 x^2\\,dx$ using the trapezoidal rule with 2 strips.',
          solution:
            '$h = 1$; $y$-values at $x = 0,1,2$ are $0,1,4$. Estimate $= \\dfrac12(0 + 4 + 2(1)) = 3$. (Exact value is $\\tfrac83 \\approx 2.67$.)',
        },
      ],
      practice: [
        {
          id: 'ai-cal-1',
          difficulty: 'Easy',
          question: 'Differentiate $y = 5x^2 - 3x$.',
          answer: '$10x - 3$',
        },
        {
          id: 'ai-cal-2',
          difficulty: 'Medium',
          question: 'Find the value of $x$ giving a stationary point of $y = x^2 - 8x + 1$.',
          answer: '$x = 4$',
          solution: '$\\dfrac{dy}{dx} = 2x - 8 = 0 \\Rightarrow x = 4$.',
        },
        {
          id: 'ai-cal-3',
          difficulty: 'Medium',
          question: 'Estimate $\\int_0^4 y\\,dx$ by the trapezoidal rule given $y$-values $2, 5, 6, 5, 2$ at equal spacing $h=1$.',
          answer: '$18$',
          solution: 'Using $\\tfrac{h}{2}\\big(y_0+y_n+2(y_1+y_2+y_3)\\big) = \\tfrac12\\big(2 + 2 + 2(5+6+5)\\big) = \\tfrac12(4 + 32) = 18$.',
        },
        {
          id: 'ai-cal-4',
          difficulty: 'Hard',
          question: 'A profit function is $P = -2x^2 + 40x - 50$. Find the number of units $x$ that maximises profit and the maximum profit.',
          answer: '$x = 10$, max profit $150$',
          solution: '$P\' = -4x + 40 = 0 \\Rightarrow x = 10$; $P(10) = -200 + 400 - 50 = 150$.',
        },
      ],
    },
  ],
};

export const COURSES: Course[] = [IGCSE_MATH, IB_AA, IB_AI];

export function findCourse(courseId: string): Course | undefined {
  return COURSES.find((c) => c.id === courseId);
}

export function findTopic(courseId: string, topicId: string) {
  const course = findCourse(courseId);
  return course?.topics.find((t) => t.id === topicId);
}
