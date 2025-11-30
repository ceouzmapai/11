export interface Question {
  id: string
  question: string
  options: string[]
  correctAnswer: number
}

export interface Test {
  id: string
  title: string
  description: string
  category: string
  questionCount: number
  duration: number // in minutes
  difficulty: "easy" | "medium" | "hard"
  questions: Question[]
}

export interface TestResult {
  id: string
  testId: string
  testTitle: string
  score: number
  totalQuestions: number
  correctAnswers: number
  timeTaken: number // in seconds
  completedAt: string
  answers: { questionId: string; selectedAnswer: number; isCorrect: boolean }[]
}

export const testCategories = [
  { id: "math", name: "Matematika", icon: "📐", color: "bg-blue-500" },
  { id: "physics", name: "Fizika", icon: "⚛️", color: "bg-purple-500" },
  { id: "chemistry", name: "Kimyo", icon: "🧪", color: "bg-green-500" },
  { id: "biology", name: "Biologiya", icon: "🧬", color: "bg-emerald-500" },
  { id: "history", name: "Tarix", icon: "📜", color: "bg-amber-500" },
  { id: "english", name: "Ingliz tili", icon: "🇬🇧", color: "bg-red-500" },
]

export const sampleTests: Test[] = [
  {
    id: "math-1",
    title: "Algebra asoslari",
    description: "Algebraik ifodalar va tenglamalar",
    category: "math",
    questionCount: 10,
    duration: 15,
    difficulty: "easy",
    questions: [
      {
        id: "q1",
        question: "2x + 5 = 15 tenglamaning yechimi nima?",
        options: ["x = 5", "x = 10", "x = 7", "x = 3"],
        correctAnswer: 0,
      },
      {
        id: "q2",
        question: "(a + b)² formulasi qanday?",
        options: ["a² + b²", "a² + 2ab + b²", "a² - 2ab + b²", "2a + 2b"],
        correctAnswer: 1,
      },
      {
        id: "q3",
        question: "3² + 4² = ?",
        options: ["7", "12", "25", "49"],
        correctAnswer: 2,
      },
      {
        id: "q4",
        question: "Agar x = 3 bo'lsa, 2x² + 3x - 1 = ?",
        options: ["26", "20", "18", "24"],
        correctAnswer: 0,
      },
      {
        id: "q5",
        question: "√144 = ?",
        options: ["14", "12", "11", "13"],
        correctAnswer: 1,
      },
      {
        id: "q6",
        question: "5! (5 faktorial) = ?",
        options: ["25", "120", "60", "100"],
        correctAnswer: 1,
      },
      {
        id: "q7",
        question: "Qaysi son tub son emas?",
        options: ["17", "23", "21", "29"],
        correctAnswer: 2,
      },
      {
        id: "q8",
        question: "15 va 20 ning EKUBi necha?",
        options: ["5", "10", "15", "60"],
        correctAnswer: 0,
      },
      {
        id: "q9",
        question: "0.25 ni kasr ko'rinishida yozing",
        options: ["1/2", "1/4", "1/5", "1/8"],
        correctAnswer: 1,
      },
      {
        id: "q10",
        question: "(-3) × (-4) = ?",
        options: ["-12", "12", "-7", "7"],
        correctAnswer: 1,
      },
    ],
  },
  {
    id: "physics-1",
    title: "Mexanika asoslari",
    description: "Harakat va kuch haqida",
    category: "physics",
    questionCount: 10,
    duration: 20,
    difficulty: "medium",
    questions: [
      {
        id: "p1",
        question: "Nyutonning birinchi qonuni nimani ifodalaydi?",
        options: ["Inersiya", "Tortishish", "Elastiklik", "Ishqalanish"],
        correctAnswer: 0,
      },
      {
        id: "p2",
        question: "F = ma formulasida m nimani bildiradi?",
        options: ["Tezlik", "Massa", "Masofa", "Vaqt"],
        correctAnswer: 1,
      },
      {
        id: "p3",
        question: "Erkin tushish tezlanishi taxminan qancha?",
        options: ["5 m/s²", "10 m/s²", "15 m/s²", "20 m/s²"],
        correctAnswer: 1,
      },
      {
        id: "p4",
        question: "Kinetik energiya formulasi qanday?",
        options: ["E = mgh", "E = mv²/2", "E = mc²", "E = Fs"],
        correctAnswer: 1,
      },
      {
        id: "p5",
        question: "Quvvat birligi nima?",
        options: ["Joul", "Nyuton", "Vatt", "Paskal"],
        correctAnswer: 2,
      },
      {
        id: "p6",
        question: "Impuls formulasi qanday?",
        options: ["p = mv", "p = ma", "p = Ft", "p = mgh"],
        correctAnswer: 0,
      },
      {
        id: "p7",
        question: "1 km/soat necha m/s ga teng?",
        options: ["0.28 m/s", "1 m/s", "3.6 m/s", "10 m/s"],
        correctAnswer: 0,
      },
      {
        id: "p8",
        question: "Bosim birligi qaysi?",
        options: ["Nyuton", "Joul", "Paskal", "Vatt"],
        correctAnswer: 2,
      },
      {
        id: "p9",
        question: "Ishqalanish kuchi qaysi yo'nalishda ta'sir qiladi?",
        options: ["Harakat yo'nalishida", "Harakatga qarama-qarshi", "Vertikal", "Istalgan"],
        correctAnswer: 1,
      },
      {
        id: "p10",
        question: "Potensial energiya qachon maksimal bo'ladi?",
        options: ["Yerda", "Eng baland nuqtada", "Harakatda", "Tushayotganda"],
        correctAnswer: 1,
      },
    ],
  },
  {
    id: "english-1",
    title: "Grammar Basics",
    description: "English grammar fundamentals",
    category: "english",
    questionCount: 10,
    duration: 15,
    difficulty: "easy",
    questions: [
      {
        id: "e1",
        question: "Choose the correct form: She ___ to school every day.",
        options: ["go", "goes", "going", "gone"],
        correctAnswer: 1,
      },
      {
        id: "e2",
        question: 'Which is the past tense of "eat"?',
        options: ["eated", "ate", "eaten", "eating"],
        correctAnswer: 1,
      },
      {
        id: "e3",
        question: "Choose the correct article: ___ apple a day keeps the doctor away.",
        options: ["A", "An", "The", "No article"],
        correctAnswer: 1,
      },
      {
        id: "e4",
        question: "Which sentence is correct?",
        options: ["He don't like coffee", "He doesn't likes coffee", "He doesn't like coffee", "He not like coffee"],
        correctAnswer: 2,
      },
      {
        id: "e5",
        question: 'What is the plural of "child"?',
        options: ["childs", "childes", "children", "childrens"],
        correctAnswer: 2,
      },
      {
        id: "e6",
        question: "Choose the correct preposition: I arrived ___ the airport.",
        options: ["in", "at", "on", "to"],
        correctAnswer: 1,
      },
      {
        id: "e7",
        question: "Which is a comparative adjective?",
        options: ["good", "better", "best", "well"],
        correctAnswer: 1,
      },
      {
        id: "e8",
        question: "Choose the correct form: They ___ playing football now.",
        options: ["is", "are", "am", "be"],
        correctAnswer: 1,
      },
      {
        id: "e9",
        question: 'What type of word is "quickly"?',
        options: ["Noun", "Verb", "Adjective", "Adverb"],
        correctAnswer: 3,
      },
      {
        id: "e10",
        question: "Choose the correct possessive: This is ___ book.",
        options: ["me", "my", "mine", "I"],
        correctAnswer: 1,
      },
    ],
  },
  {
    id: "history-1",
    title: "O'zbekiston tarixi",
    description: "O'zbekiston tarixi asoslari",
    category: "history",
    questionCount: 10,
    duration: 20,
    difficulty: "medium",
    questions: [
      {
        id: "h1",
        question: "Amir Temur qachon tug'ilgan?",
        options: ["1336-yil", "1370-yil", "1405-yil", "1300-yil"],
        correctAnswer: 0,
      },
      {
        id: "h2",
        question: "O'zbekiston qachon mustaqillikka erishdi?",
        options: ["1990-yil", "1991-yil", "1992-yil", "1989-yil"],
        correctAnswer: 1,
      },
      {
        id: "h3",
        question: "Mirzo Ulug'bek kim bo'lgan?",
        options: ["Shoir", "Astronom", "Sarkarda", "Savdogar"],
        correctAnswer: 1,
      },
      {
        id: "h4",
        question: "Ipak yo'li qaysi shaharlar orqali o'tgan?",
        options: ["Faqat Samarqand", "Faqat Buxoro", "Samarqand va Buxoro", "Toshkent"],
        correctAnswer: 2,
      },
      {
        id: "h5",
        question: "Alisher Navoiy qaysi asrda yashagan?",
        options: ["XIII asr", "XIV asr", "XV asr", "XVI asr"],
        correctAnswer: 2,
      },
      {
        id: "h6",
        question: "Samarqand necha yillik tarixga ega?",
        options: ["1500 yil", "2000 yil", "2500 yil", "3000 yil"],
        correctAnswer: 2,
      },
      {
        id: "h7",
        question: "Registon maydonida nechta madrasa bor?",
        options: ["2 ta", "3 ta", "4 ta", "5 ta"],
        correctAnswer: 1,
      },
      {
        id: "h8",
        question: "Buxoro qaysi davlatning poytaxti bo'lgan?",
        options: ["Xorazm", "Buxoro amirligi", "Qo'qon xonligi", "Samarqand"],
        correctAnswer: 1,
      },
      {
        id: "h9",
        question: "Jaloliddin Manguberdi kim bilan jang qilgan?",
        options: ["Arablar", "Mo'g'ullar", "Forslar", "Turklar"],
        correctAnswer: 1,
      },
      {
        id: "h10",
        question: "O'zbekiston Konstitutsiyasi qachon qabul qilingan?",
        options: ["1991-yil", "1992-yil", "1993-yil", "1994-yil"],
        correctAnswer: 1,
      },
    ],
  },
  {
    id: "chemistry-1",
    title: "Kimyo asoslari",
    description: "Elementlar va birikmalar",
    category: "chemistry",
    questionCount: 10,
    duration: 18,
    difficulty: "medium",
    questions: [
      {
        id: "c1",
        question: "Suvning kimyoviy formulasi qanday?",
        options: ["H2O", "CO2", "NaCl", "O2"],
        correctAnswer: 0,
      },
      {
        id: "c2",
        question: "Davriy jadvalda nechta element bor (taxminan)?",
        options: ["100", "118", "92", "150"],
        correctAnswer: 1,
      },
      {
        id: "c3",
        question: "Kislorodning atom raqami necha?",
        options: ["6", "7", "8", "9"],
        correctAnswer: 2,
      },
      {
        id: "c4",
        question: "Qaysi element eng yengil?",
        options: ["Geliy", "Vodorod", "Litiy", "Uglerod"],
        correctAnswer: 1,
      },
      {
        id: "c5",
        question: "NaCl qanday modda?",
        options: ["Kislota", "Ishqor", "Tuz", "Oksid"],
        correctAnswer: 2,
      },
      {
        id: "c6",
        question: "pH 7 qanday muhitni bildiradi?",
        options: ["Kislotali", "Ishqoriy", "Neytral", "Kuchli kislotali"],
        correctAnswer: 2,
      },
      {
        id: "c7",
        question: "Temir elementining belgisi qanday?",
        options: ["Te", "Fe", "Ti", "Ir"],
        correctAnswer: 1,
      },
      {
        id: "c8",
        question: "Qaysi gaz atmosferada eng ko'p?",
        options: ["Kislorod", "Azot", "Karbonat angidrid", "Argon"],
        correctAnswer: 1,
      },
      {
        id: "c9",
        question: "Organik kimyo nimani o'rganadi?",
        options: ["Metallar", "Uglerod birikmalari", "Gazlar", "Suvlar"],
        correctAnswer: 1,
      },
      {
        id: "c10",
        question: "Atom yadrosi nimadan tashkil topgan?",
        options: ["Elektronlar", "Proton va neytronlar", "Faqat protonlar", "Faqat neytronlar"],
        correctAnswer: 1,
      },
    ],
  },
  {
    id: "biology-1",
    title: "Biologiya asoslari",
    description: "Tirik organizmlar haqida",
    category: "biology",
    questionCount: 10,
    duration: 18,
    difficulty: "easy",
    questions: [
      {
        id: "b1",
        question: "Hujayra nimaning asosiy birligi?",
        options: ["Atom", "Tirik organizmlar", "Molekula", "Mineral"],
        correctAnswer: 1,
      },
      {
        id: "b2",
        question: "DNK nimaning qisqartmasi?",
        options: ["Dezoksiribonuklein kislota", "Dinamik kislota", "Dioksid kislota", "Dextrin kislota"],
        correctAnswer: 0,
      },
      {
        id: "b3",
        question: "Fotosintez qayerda sodir bo'ladi?",
        options: ["Ildizda", "Bargda", "Novdada", "Gulda"],
        correctAnswer: 1,
      },
      {
        id: "b4",
        question: "Odam tanasida nechta suyak bor?",
        options: ["186", "206", "226", "256"],
        correctAnswer: 1,
      },
      {
        id: "b5",
        question: "Qon qaysi to'qimaga kiradi?",
        options: ["Epiteliy", "Biriktiruvchi", "Mushak", "Nerv"],
        correctAnswer: 1,
      },
      {
        id: "b6",
        question: "Mitoxondriya vazifasi nima?",
        options: ["Oqsil sintezi", "Energiya ishlab chiqarish", "Hujayraning himoyasi", "Genetik ma'lumot saqlash"],
        correctAnswer: 1,
      },
      {
        id: "b7",
        question: "Qaysi vitamin teri orqali hosil bo'ladi?",
        options: ["A vitamini", "B vitamini", "C vitamini", "D vitamini"],
        correctAnswer: 3,
      },
      {
        id: "b8",
        question: "Yurak necha kamerali?",
        options: ["2", "3", "4", "5"],
        correctAnswer: 2,
      },
      {
        id: "b9",
        question: "Ekosistemada o'simliklar qanday rol o'ynaydi?",
        options: ["Iste'molchi", "Ishlab chiqaruvchi", "Parchalovchi", "Yirtqich"],
        correctAnswer: 1,
      },
      {
        id: "b10",
        question: "Bakteriyalar qaysi olamga kiradi?",
        options: ["Hayvonlar", "O'simliklar", "Zamburug'lar", "Prokariotlar"],
        correctAnswer: 3,
      },
    ],
  },
]

// Helper functions for localStorage
export function getTestResults(): TestResult[] {
  if (typeof window === "undefined") return []
  const results = localStorage.getItem("testResults")
  return results ? JSON.parse(results) : []
}

export function saveTestResult(result: TestResult): void {
  const results = getTestResults()
  results.unshift(result)
  localStorage.setItem("testResults", JSON.stringify(results))
}

export function clearTestResults(): void {
  if (typeof window === "undefined") return
  localStorage.removeItem("testResults")
}

export function getTestById(id: string): Test | undefined {
  return sampleTests.find((test) => test.id === id)
}

export function getTestsByCategory(category: string): Test[] {
  return sampleTests.filter((test) => test.category === category)
}
