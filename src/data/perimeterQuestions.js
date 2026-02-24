/** පරිමිතිය — ප්‍රශ්න 30 (random 6 පෙන්වයි) */

function shuffleAndTake(arr, n) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a.slice(0, n)
}

export const PERIMETER_QUESTIONS = [
  // Short answer - rectangle (8)
  { type: 'shortAnswer', shape: 'rectangle', lengthVal: 10, widthVal: 5, prompt: 'පරිමිතිය සොයන්න', answer: '30', unit: 'cm' },
  { type: 'shortAnswer', shape: 'rectangle', lengthVal: 12, widthVal: 8, prompt: 'පරිමිතිය සොයන්න', answer: '40', unit: 'cm' },
  { type: 'shortAnswer', shape: 'rectangle', lengthVal: 15, widthVal: 6, prompt: 'පරිමිතිය සොයන්න', answer: '42', unit: 'cm' },
  { type: 'shortAnswer', shape: 'rectangle', lengthVal: 20, widthVal: 10, prompt: 'පරිමිතිය සොයන්න', answer: '60', unit: 'cm' },
  { type: 'shortAnswer', shape: 'rectangle', lengthVal: 8, widthVal: 4, prompt: 'පරිමිතිය සොයන්න', answer: '24', unit: 'cm' },
  { type: 'shortAnswer', shape: 'rectangle', lengthVal: 14, widthVal: 7, prompt: 'පරිමිතිය සොයන්න', answer: '42', unit: 'cm' },
  { type: 'shortAnswer', shape: 'rectangle', lengthVal: 18, widthVal: 9, prompt: 'පරිමිතිය සොයන්න', answer: '54', unit: 'cm' },
  { type: 'shortAnswer', shape: 'rectangle', lengthVal: 9, widthVal: 6, prompt: 'පරිමිතිය සොයන්න', answer: '30', unit: 'cm' },
  // Short answer - square (5)
  { type: 'shortAnswer', shape: 'square', sideVal: 7, prompt: 'පරිමිතිය සොයන්න', answer: '28', unit: 'cm' },
  { type: 'shortAnswer', shape: 'square', sideVal: 5, prompt: 'පරිමිතිය සොයන්න', answer: '20', unit: 'cm' },
  { type: 'shortAnswer', shape: 'square', sideVal: 9, prompt: 'පරිමිතිය සොයන්න', answer: '36', unit: 'cm' },
  { type: 'shortAnswer', shape: 'square', sideVal: 12, prompt: 'පරිමිතිය සොයන්න', answer: '48', unit: 'cm' },
  { type: 'shortAnswer', shape: 'square', sideVal: 8, prompt: 'පරිමිතිය සොයන්න', answer: '32', unit: 'cm' },
  // Short answer - triangle (5)
  { type: 'shortAnswer', shape: 'triangle', a: 5, b: 12, c: 13, prompt: 'පරිමිතිය සොයන්න', answer: '30', unit: 'cm' },
  { type: 'shortAnswer', shape: 'triangle', a: 3, b: 4, c: 5, prompt: 'පරිමිතිය සොයන්න', answer: '12', unit: 'cm' },
  { type: 'shortAnswer', shape: 'triangle', a: 6, b: 8, c: 10, prompt: 'පරිමිතිය සොයන්න', answer: '24', unit: 'cm' },
  { type: 'shortAnswer', shape: 'triangle', a: 7, b: 24, c: 25, prompt: 'පරිමිතිය සොයන්න', answer: '56', unit: 'cm' },
  { type: 'shortAnswer', shape: 'triangle', a: 4, b: 5, c: 6, prompt: 'පරිමිතිය සොයන්න', answer: '15', unit: 'cm' },
  // Short answer - circle (5)
  { type: 'shortAnswer', shape: 'circle', radiusVal: 7, prompt: 'පරිධිය සොයන්න (π = 22/7)', answer: '44', unit: 'cm' },
  { type: 'shortAnswer', shape: 'circle', radiusVal: 14, prompt: 'පරිධිය සොයන්න (π = 22/7)', answer: '88', unit: 'cm' },
  { type: 'shortAnswer', shape: 'circle', radiusVal: 3.5, prompt: 'පරිධිය සොයන්න (π = 22/7)', answer: '22', unit: 'cm' },
  { type: 'shortAnswer', shape: 'circle', radiusVal: 10.5, prompt: 'පරිධිය සොයන්න (π = 22/7)', answer: '66', unit: 'cm' },
  { type: 'shortAnswer', shape: 'circle', radiusVal: 21, prompt: 'පරිධිය සොයන්න (π = 22/7)', answer: '132', unit: 'cm' },
  // MCQ (5)
  {
    type: 'mcq',
    prompt: 'සෘජුකෝණාස්‍රයක පරිමිතිය සොයන සූත්‍රය කුමක්ද?',
    options: [
      { value: '2a+2b', label: '2(a + b)' },
      { value: '4a', label: '4a' },
      { value: 'a+b+c', label: 'a + b + c' },
      { value: '2pir', label: '2πr' },
    ],
    answer: '2a+2b',
  },
  {
    type: 'mcq',
    prompt: 'සමචතුරස්‍රයක පරිමිතිය සොයන සූත්‍රය කුමක්ද?',
    options: [
      { value: '2a+2b', label: '2(a + b)' },
      { value: '4a', label: '4a' },
      { value: 'a+b+c', label: 'a + b + c' },
      { value: '2pir', label: '2πr' },
    ],
    answer: '4a',
  },
  {
    type: 'mcq',
    prompt: 'ත්‍රිකෝණයක පරිමිතිය සොයන සූත්‍රය කුමක්ද?',
    options: [
      { value: '2a+2b', label: '2(a + b)' },
      { value: '4a', label: '4a' },
      { value: 'a+b+c', label: 'a + b + c' },
      { value: '2pir', label: '2πr' },
    ],
    answer: 'a+b+c',
  },
  {
    type: 'mcq',
    prompt: 'වෘත්තයක පරිධිය (පරිමිතිය) සොයන සූත්‍රය කුමක්ද?',
    options: [
      { value: '2a+2b', label: '2(a + b)' },
      { value: '4a', label: '4a' },
      { value: 'a+b+c', label: 'a + b + c' },
      { value: '2pir', label: '2πr' },
    ],
    answer: '2pir',
  },
  {
    type: 'mcq',
    prompt: 'දිග 10cm, පළල 5cm ඇති සෘජුකෝණාස්‍රයක පරිමිතිය කීයද?',
    options: [
      { value: '15', label: '15 cm' },
      { value: '30', label: '30 cm' },
      { value: '50', label: '50 cm' },
      { value: '20', label: '20 cm' },
    ],
    answer: '30',
  },
  {
    type: 'mcq',
    prompt: 'පරිමිතිය = 2 × (දිග + පළල) යන සූත්‍රය භාවිතා වන්නේ කුමන රූපයටද?',
    options: [
      { value: 'square', label: 'සමචතුරස්‍රය' },
      { value: 'rectangle', label: 'සෘජුකෝණාස්‍රය' },
      { value: 'triangle', label: 'ත්‍රිකෝණය' },
      { value: 'circle', label: 'වෘත්තය' },
    ],
    answer: 'rectangle',
  },
  {
    type: 'mcq',
    prompt: 'පරිමිතිය = 4a යන සූත්‍රය භාවිතා වන්නේ කුමන රූපයටද?',
    options: [
      { value: 'square', label: 'සමචතුරස්‍රය' },
      { value: 'rectangle', label: 'සෘජුකෝණාස්‍රය' },
      { value: 'triangle', label: 'ත්‍රිකෝණය' },
      { value: 'circle', label: 'වෘත්තය' },
    ],
    answer: 'square',
  },
  // Matching (2)
  {
    type: 'matching',
    prompt: 'රූපයට සූත්‍රය ගලපන්න',
    pairs: [
      { left: 'සෘජුකෝණාස්‍රය', right: '2(a + b)' },
      { left: 'සමචතුරස්‍රය', right: '4a' },
      { left: 'ත්‍රිකෝණය', right: 'a + b + c' },
      { left: 'වෘත්තය', right: '2πr' },
    ],
  },
]

/** සංයුත්ත රූප — T, පියගැට හැඩ (පාදවල දිග එකතු කර පරිමිතිය) — ප්‍රශ්න 30 (random 6) */
export const COMPOSITE_PERIMETER_QUESTIONS = [
  // T shape: topW, stemW, sideH → P = 2*topW + 4*sideH
  { type: 'shortAnswer', shape: 't-shape', dims: { topW: 12, stemW: 6, sideH: 4 }, prompt: 'පරිමිතිය සොයන්න', answer: '40', unit: 'cm' },
  { type: 'shortAnswer', shape: 't-shape', dims: { topW: 10, stemW: 4, sideH: 3 }, prompt: 'පරිමිතිය සොයන්න', answer: '32', unit: 'cm' },
  { type: 'shortAnswer', shape: 't-shape', dims: { topW: 8, stemW: 4, sideH: 5 }, prompt: 'පරිමිතිය සොයන්න', answer: '36', unit: 'cm' },
  { type: 'shortAnswer', shape: 't-shape', dims: { topW: 14, stemW: 6, sideH: 5 }, prompt: 'පරිමිතිය සොයන්න', answer: '48', unit: 'cm' },
  { type: 'shortAnswer', shape: 't-shape', dims: { topW: 6, stemW: 2, sideH: 2 }, prompt: 'පරිමිතිය සොයන්න', answer: '20', unit: 'cm' },
  { type: 'shortAnswer', shape: 't-shape', dims: { topW: 16, stemW: 8, sideH: 3 }, prompt: 'පරිමිතිය සොයන්න', answer: '44', unit: 'cm' },
  { type: 'shortAnswer', shape: 't-shape', dims: { topW: 9, stemW: 3, sideH: 4 }, prompt: 'පරිමිතිය සොයන්න', answer: '30', unit: 'cm' },
  { type: 'shortAnswer', shape: 't-shape', dims: { topW: 11, stemW: 5, sideH: 6 }, prompt: 'පරිමිතිය සොයන්න', answer: '46', unit: 'cm' },
  { type: 'shortAnswer', shape: 't-shape', dims: { topW: 7, stemW: 3, sideH: 2 }, prompt: 'පරිමිතිය සොයන්න', answer: '22', unit: 'cm' },
  { type: 'shortAnswer', shape: 't-shape', dims: { topW: 13, stemW: 7, sideH: 4 }, prompt: 'පරිමිතිය සොයන්න', answer: '42', unit: 'cm' },
  // Stair shape: stepW, stepH, lastStepH, numSteps → P = 3*stepW + 2*stepH + lastStepH + bottomW + leftH
  { type: 'shortAnswer', shape: 'stair-shape', dims: { stepW: 6, stepH: 4, lastStepH: 5, numSteps: 3 }, prompt: 'පරිමිතිය සොයන්න', answer: '62', unit: 'cm' },
  { type: 'shortAnswer', shape: 'stair-shape', dims: { stepW: 4, stepH: 3, lastStepH: 4, numSteps: 3 }, prompt: 'පරිමිතිය සොයන්න', answer: '44', unit: 'cm' },
  { type: 'shortAnswer', shape: 'stair-shape', dims: { stepW: 5, stepH: 3, lastStepH: 4, numSteps: 3 }, prompt: 'පරිමිතිය සොයන්න', answer: '50', unit: 'cm' },
  { type: 'shortAnswer', shape: 'stair-shape', dims: { stepW: 4, stepH: 2, lastStepH: 3, numSteps: 3 }, prompt: 'පරිමිතිය සොයන්න', answer: '38', unit: 'cm' },
  { type: 'shortAnswer', shape: 'stair-shape', dims: { stepW: 6, stepH: 5, lastStepH: 6, numSteps: 3 }, prompt: 'පරිමිතිය සොයන්න', answer: '68', unit: 'cm' },
  { type: 'shortAnswer', shape: 'stair-shape', dims: { stepW: 3, stepH: 2, lastStepH: 3, numSteps: 3 }, prompt: 'පරිමිතිය සොයන්න', answer: '32', unit: 'cm' },
  { type: 'shortAnswer', shape: 'stair-shape', dims: { stepW: 7, stepH: 4, lastStepH: 5, numSteps: 3 }, prompt: 'පරිමිතිය සොයන්න', answer: '68', unit: 'cm' },
  { type: 'shortAnswer', shape: 'stair-shape', dims: { stepW: 5, stepH: 4, lastStepH: 5, numSteps: 3 }, prompt: 'පරිමිතිය සොයන්න', answer: '56', unit: 'cm' },
  { type: 'shortAnswer', shape: 'stair-shape', dims: { stepW: 4, stepH: 5, lastStepH: 6, numSteps: 3 }, prompt: 'පරිමිතිය සොයන්න', answer: '56', unit: 'cm' },
  { type: 'shortAnswer', shape: 'stair-shape', dims: { stepW: 8, stepH: 3, lastStepH: 4, numSteps: 3 }, prompt: 'පරිමිතිය සොයන්න', answer: '68', unit: 'cm' },
  { type: 'shortAnswer', shape: 't-shape', dims: { topW: 15, stemW: 5, sideH: 5 }, prompt: 'පරිමිතිය සොයන්න', answer: '50', unit: 'cm' },
  { type: 'shortAnswer', shape: 't-shape', dims: { topW: 4, stemW: 2, sideH: 3 }, prompt: 'පරිමිතිය සොයන්න', answer: '20', unit: 'cm' },
  { type: 'shortAnswer', shape: 'stair-shape', dims: { stepW: 6, stepH: 3, lastStepH: 4, numSteps: 3 }, prompt: 'පරිමිතිය සොයන්න', answer: '56', unit: 'cm' },
  { type: 'shortAnswer', shape: 'stair-shape', dims: { stepW: 5, stepH: 2, lastStepH: 3, numSteps: 3 }, prompt: 'පරිමිතිය සොයන්න', answer: '38', unit: 'cm' },
  { type: 'shortAnswer', shape: 't-shape', dims: { topW: 18, stemW: 6, sideH: 6 }, prompt: 'පරිමිතිය සොයන්න', answer: '60', unit: 'cm' },
  { type: 'shortAnswer', shape: 't-shape', dims: { topW: 5, stemW: 3, sideH: 4 }, prompt: 'පරිමිතිය සොයන්න', answer: '26', unit: 'cm' },
  { type: 'shortAnswer', shape: 'stair-shape', dims: { stepW: 7, stepH: 5, lastStepH: 6, numSteps: 3 }, prompt: 'පරිමිතිය සොයන්න', answer: '74', unit: 'cm' },
  { type: 'shortAnswer', shape: 'stair-shape', dims: { stepW: 4, stepH: 4, lastStepH: 5, numSteps: 3 }, prompt: 'පරිමිතිය සොයන්න', answer: '49', unit: 'cm' },
  { type: 'shortAnswer', shape: 't-shape', dims: { topW: 20, stemW: 8, sideH: 4 }, prompt: 'පරිමිතිය සොයන්න', answer: '56', unit: 'cm' },
  { type: 'shortAnswer', shape: 'stair-shape', dims: { stepW: 6, stepH: 6, lastStepH: 7, numSteps: 3 }, prompt: 'පරිමිතිය සොයන්න', answer: '79', unit: 'cm' },
]

/** 30 න් random 6 තෝරා ගන්න */
export function getRandomPerimeterQuestions(count = 6) {
  return shuffleAndTake(PERIMETER_QUESTIONS, count)
}

/** සංයුත්ත ප්‍රශ්න 30 න් random 6 තෝරා ගන්න */
export function getRandomCompositePerimeterQuestions(count = 6) {
  return shuffleAndTake(COMPOSITE_PERIMETER_QUESTIONS, count)
}
