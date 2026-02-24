/** පෙළපොතේ පරිච්ඡේද - O/L ගණිත පෙළපොත */
export const textbookChapters = [
  {
    term: 1,
    label: '1 වාරය',
    lessons: [
      {
        num: 1,
        id: 'perimeter',
        title: 'පරිමිතිය',
        slideMode: true,
        subtopics: [
          {
            title: 'තලරූපවල පරිමිතිය',
            content: [
              { type: 'slideShapes', shapes: ['square', 'rectangle', 'triangle', 'circle'] },
              {
                type: 'exercise',
                exerciseId: 'perimeter-shapes',
                title: 'තලරූපවල පරිමිතිය',
                questions: [
                  {
                    type: 'shortAnswer',
                    shape: 'rectangle',
                    lengthVal: 12,
                    widthVal: 8,
                    prompt: 'පරිමිතිය සොයන්න',
                    answer: '40',
                    unit: 'cm',
                  },
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
                    type: 'shortAnswer',
                    shape: 'square',
                    sideVal: 7,
                    prompt: 'පරිමිතිය සොයන්න',
                    answer: '28',
                    unit: 'cm',
                  },
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
                  {
                    type: 'shortAnswer',
                    shape: 'triangle',
                    a: 5,
                    b: 12,
                    c: 13,
                    prompt: 'පරිමිතිය සොයන්න',
                    answer: '30',
                    unit: 'cm',
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
                    type: 'shortAnswer',
                    shape: 'circle',
                    radiusVal: 7,
                    prompt: 'පරිධිය සොයන්න (π = 22/7)',
                    answer: '44',
                    unit: 'cm',
                  },
                ],
              },
            ],
          },
          {
            title: 'සංයුත්ත තලරූපවල පරිමිතිය',
            content: [],
          },
          {
            title: 'කේන්ද්‍රික ඛණ්ඩවල චාප දිග',
            content: [],
          },
          {
            title: 'කේන්ද්‍රික ඛණ්ඩවල පරිමිතිය',
            content: [],
          },
        ],
      },
      { num: 2, title: 'වර්ගමූලය' },
      { num: 3, title: 'භාග' },
      { num: 4, title: 'ද්විපද ප්‍රකාශන' },
      { num: 5, title: 'අංග සාම්‍යය' },
      { num: 6, title: 'වර්ගඵලය' },
      { num: 7, title: 'වර්ගජ ප්‍රකාශනවල සාධක' },
      { num: 8, title: 'ත්‍රිකෝණ I' },
      { num: 9, title: 'ත්‍රිකෝණ II' },
      { num: 10, title: 'ප්‍රතිලෝම සමානුපාත' },
      { num: 11, title: 'දත්ත නිරූපණය' },
      { num: 12, title: 'වීජීය ප්‍රකාශනවල කුඩා පොදු ගුණාකාරය' },
    ],
  },
  {
    term: 2,
    label: '2 වාරය',
    lessons: [
      { num: 13, title: 'වීජීය භාග' },
      { num: 14, title: 'ප්‍රතිශත' },
      { num: 15, title: 'සමීකරණ' },
      { num: 16, title: 'සමාන්තරාස්‍ර I' },
      { num: 17, title: 'සමාන්තරාස්‍ර II' },
      { num: 18, title: 'කුලක' },
      { num: 19, title: 'ලඝු ගණක I' },
      { num: 20, title: 'ලඝු ගණක II' },
      { num: 21, title: 'ප්‍රස්තාර' },
      { num: 22, title: 'ශීඝ්‍රතාව' },
      { num: 23, title: 'සූත්‍ර' },
    ],
  },
  {
    term: 3,
    label: '3 වාරය',
    lessons: [
      { num: 24, title: 'සමාන්තර ශ්‍රේඪි' },
      { num: 25, title: 'වීජීය අසමානතා' },
      { num: 26, title: 'සංඛ්‍යාත ව්‍යාප්ති' },
      { num: 27, title: 'වෘත්තයක ජ්‍යා' },
      { num: 28, title: 'නිර්මාණ' },
      { num: 29, title: 'පෘෂ්ඨ වර්ගඵලය හා පරිමාව' },
      { num: 30, title: 'සම්භාවිතාව' },
      { num: 31, title: 'වෘත්තයක කෝණ' },
      { num: 32, title: 'පරිමාණ රූප' },
    ],
  },
]

export const mathTopics = [
  {
    id: 'arithmetic',
    title: 'අංක ගණිතය',
    description: 'සංඛ්‍යා, එකතු කිරීම, අඩු කිරීම, ගුණ කිරීම සහ බෙදීම',
    icon: '🔢',
    color: 'sipyaya',
    lessons: [
      {
        id: 'addition',
        title: 'එකතු කිරීම',
        content: [
          { type: 'text', value: 'එකතු කිරීම යනු සංඛ්‍යා දෙකක් හෝ වැඩියක් එකට එකතු කිරීමයි.' },
          { type: 'text', value: 'උදාහරණයක් ලෙස, 3 + 5 = 8' },
          { type: 'math', value: '3 + 5 = 8' },
          { type: 'text', value: 'මෙහි 3 සහ 5 එකතු කළ විට පිළිතුර 8 වේ.' },
          { type: 'text', value: 'තවත් උදාහරණ:' },
          { type: 'math', value: '7 + 2 = 9' },
          { type: 'math', value: '12 + 15 = 27' },
          { type: 'math', value: '100 + 50 = 150' },
        ],
      },
      {
        id: 'subtraction',
        title: 'අඩු කිරීම',
        content: [
          { type: 'text', value: 'අඩු කිරීම යනු එක් සංඛ්‍යාවකින් තවත් සංඛ්‍යාවක් අඩු කිරීමයි.' },
          { type: 'text', value: 'උදාහරණ: 10 - 4 = 6' },
          { type: 'math', value: '10 - 4 = 6' },
          { type: 'text', value: '10 න් 4 අඩු කළ විට 6 ඉතිරි වේ.' },
          { type: 'math', value: '15 - 7 = 8' },
          { type: 'math', value: '20 - 12 = 8' },
        ],
      },
      {
        id: 'multiplication',
        title: 'ගුණ කිරීම',
        content: [
          { type: 'text', value: 'ගුණ කිරීම යනු එකම සංඛ්‍යාව කිහිප වතාවක් එකතු කිරීමයි.' },
          { type: 'text', value: 'උදාහරණ: 4 × 3 යනු 4 තුන් වතාවක් එකතු කිරීමයි.' },
          { type: 'math', value: '4 \\times 3 = 4 + 4 + 4 = 12' },
          { type: 'text', value: 'ගුණ කිරීමේ වගුව:' },
          { type: 'math', value: '2 \\times 5 = 10' },
          { type: 'math', value: '6 \\times 7 = 42' },
          { type: 'math', value: '9 \\times 9 = 81' },
        ],
      },
      {
        id: 'division',
        title: 'බෙදීම',
        content: [
          { type: 'text', value: 'බෙදීම යනු සංඛ්‍යාවක් සමාන කොටස් කිහිපයකට බෙදීමයි.' },
          { type: 'text', value: 'උදාහරණ: 12 ÷ 3 = 4' },
          { type: 'math', value: '12 \\div 3 = 4' },
          { type: 'text', value: '12 න් 3 කොටස් 4 ක් ලැබේ.' },
          { type: 'math', value: '20 \\div 4 = 5' },
          { type: 'math', value: '36 \\div 6 = 6' },
        ],
      },
    ],
  },
  {
    id: 'algebra',
    title: 'වීජ ගණිතය',
    description: 'විචල්‍ය, සමීකරණ සහ සූත්‍ර',
    icon: '📊',
    color: 'blue',
    lessons: [
      {
        id: 'variables',
        title: 'විචල්‍ය හැඳින්වීම',
        content: [
          { type: 'text', value: 'විචල්‍ය (variable) යනු අප නොදන්නා සංඛ්‍යාවක් නිරූපණය කිරීමට භාවිතා කරන අක්ෂරයකි. සාමාන්‍යයෙන් x, y, z භාවිතා කරයි.' },
          { type: 'math', value: 'x + 5 = 10' },
          { type: 'text', value: 'මෙහි x යනු නොදන්නා සංඛ්‍යාවයි. x + 5 = 10 නම්, x = 5 වේ.' },
          { type: 'math', value: '2y = 8 \\Rightarrow y = 4' },
        ],
      },
      {
        id: 'linear-equations',
        title: 'රේඛීය සමීකරණ',
        content: [
          { type: 'text', value: 'රේඛීය සමීකරණයක් යනු ax + b = c ආකාරයේ සමීකරණයකි.' },
          { type: 'math', value: '2x + 3 = 11' },
          { type: 'text', value: 'x සොයා ගැනීම:' },
          { type: 'math', value: '2x = 11 - 3 = 8' },
          { type: 'math', value: 'x = \\frac{8}{2} = 4' },
          { type: 'text', value: 'පිළිතුර: x = 4' },
        ],
      },
    ],
  },
  {
    id: 'geometry',
    title: 'ජ්‍යාමිතිය',
    description: 'හැඩ, කෝණ, ප්‍රදේශ සහ පරිමිති',
    icon: '📐',
    color: 'amber',
    lessons: [
      {
        id: 'shapes',
        title: 'මූලික හැඩ',
        content: [
          { type: 'text', value: 'ත්‍රිකෝණය - පැති 3 ක්' },
          { type: 'math', value: '\\text{ත්‍රිකෝණ ප්‍රදේශය} = \\frac{1}{2} \\times \\text{පාදය} \\times \\text{උස}' },
          { type: 'text', value: 'ත්‍රිකෝණ වර්ග පැති අනුව:' },
          { type: 'text', value: 'සමපාද ත්‍රිකෝණය — පැති තුනම සමාන (a = b = c)' },
          { type: 'animation', id: 'triangle-type-equilateral' },
          { type: 'text', value: 'සමද්විපාද ත්‍රිකෝණය — පැති දෙකක් සමාන (a = b ≠ c)' },
          { type: 'animation', id: 'triangle-type-isosceles' },
          { type: 'text', value: 'විෂම පාද ත්‍රිකෝණය — පැති තුනම වෙනස් (a ≠ b ≠ c)' },
          { type: 'animation', id: 'triangle-type-scalene' },
          { type: 'text', value: 'සෘජුකෝණාස්‍රය - පැති 4 ක්, ප්‍රතිවිරුද්ධ පැති සමාන' },
          { type: 'math', value: '\\text{ප්‍රදේශය} = \\text{දිග} \\times \\text{පළල}' },
          { type: 'text', value: 'වෘත්තය' },
          { type: 'math', value: '\\text{පරිධිය} = 2\\pi r \\quad \\text{සහ} \\quad \\text{ප්‍රදේශය} = \\pi r^2' },
        ],
      },
      {
        id: 'pythagoras',
        title: 'පයිතගරස් ප්‍රමේයය',
        content: [
          { type: 'text', value: 'සෘජුකෝණ ත්‍රිකෝණයක පැති සඳහා:' },
          { type: 'math', value: 'a^2 + b^2 = c^2' },
          { type: 'text', value: 'c යනු කර්ණය (විශාලතම පැත්ත), a සහ b යනු අනෙක් පැති.' },
          { type: 'text', value: 'උදාහරණ: පැති 3 සහ 4 නම්,' },
          { type: 'math', value: 'c^2 = 3^2 + 4^2 = 9 + 16 = 25' },
          { type: 'math', value: 'c = \\sqrt{25} = 5' },
        ],
      },
    ],
  },
  {
    id: 'fractions',
    title: 'භාග',
    description: 'භාග, දශම සහ ප්‍රතිශත',
    icon: '🔷',
    color: 'violet',
    lessons: [
      {
        id: 'intro-fractions',
        title: 'භාග හැඳින්වීම',
        content: [
          { type: 'text', value: 'භාගයක් යනු සමස්තයක කොටසක් නිරූපණය කරයි.' },
          { type: 'math', value: '\\frac{1}{2} \\text{ (අර්ධය)}, \\quad \\frac{1}{4} \\text{ (කාර්තුව)}, \\quad \\frac{3}{4} \\text{ (කාර්තු තුන)}' },
          { type: 'text', value: 'භාග එකතු කිරීම - හර සමාන විට:' },
          { type: 'math', value: '\\frac{1}{4} + \\frac{2}{4} = \\frac{3}{4}' },
          { type: 'text', value: 'හර වෙනස් විට හර සමාන කර ගන්න:' },
          { type: 'math', value: '\\frac{1}{2} + \\frac{1}{3} = \\frac{3}{6} + \\frac{2}{6} = \\frac{5}{6}' },
        ],
      },
    ],
  },
]

export function getTopic(topicId) {
  return mathTopics.find((t) => t.id === topicId)
}

export function getLesson(topicId, lessonId) {
  const topic = getTopic(topicId)
  return topic?.lessons.find((l) => l.id === lessonId)
}

/** පෙළපොතේ පරිච්ඡේදයක් අංකයෙන් ලබා ගන්න */
export function getChapterByNum(chapterNum) {
  const num = parseInt(chapterNum, 10)
  for (const section of textbookChapters) {
    const lesson = section.lessons.find((l) => l.num === num)
    if (lesson) return { lesson, section }
  }
  return null
}

/** පාඩමක පළමු අභ්‍යාසය ලබා ගන්න (slide mode inline ප්‍රශ්න සඳහා) */
export function getLessonFirstExercise(chapterNum) {
  const result = getChapterByNum(chapterNum)
  if (!result) return null
  const { lesson, section } = result
  for (const subtopic of lesson.subtopics || []) {
    for (const block of subtopic.content || []) {
      if (block.type === 'exercise' && block.exerciseId && block.questions?.length) {
        return { exercise: block, lesson, section }
      }
    }
  }
  return null
}

/** අභ්‍යාසයක් chapter සහ exerciseId අනුව ලබා ගන්න */
export function getExercise(chapterNum, exerciseId) {
  const result = getChapterByNum(chapterNum)
  if (!result) return null
  const { lesson, section } = result
  for (const subtopic of lesson.subtopics || []) {
    for (const block of subtopic.content || []) {
      if (block.type === 'exercise' && block.exerciseId === exerciseId) {
        return { exercise: block, lesson, section }
      }
    }
  }
  return null
}
