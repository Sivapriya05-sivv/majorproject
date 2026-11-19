// LESSONS DATA FOR ADHD LEARNING WORLD
// Structured strictly according to the 4 Critical Phases:
// Phase 1: Visual Learning (Ollie intro, pictures, real-life demo, Veo 3 video, Malayalam audio)
// Phase 2: Common Classroom Activity (Shared participation, turn-taking, Classroom TV display)
// Phase 3: Individual Understanding Check (Individual assessment with picture selection)
// Phase 4: Lesson-Specific Game (Playable interactive game)

export const LESSONS_DATABASE = {
  // =========================================================================
  // CARE GROUP - MODULE 1: എനിക്കും എന്റെ പേര് അറിയാം (I Also Know My Name)
  // =========================================================================
  'care-m01': [
    {
      id: 'care-m01-l01',
      moduleId: 'care-m01',
      lessonNumber: 1,
      title_ml: 'എന്റെ പേര് ഇതാണ്!',
      title_en: 'This Is My Name!',
      narration_ml: 'ഹലോ കൂട്ടുകാരെ! ഞാൻ ഒല്ലി. ഇന്ന് നമ്മൾ നമ്മുടെ പേര് വിളിക്കുമ്പോൾ കൈ ഉയർത്താനും സന്തോഷത്തോടെ ചിരിക്കാനും പഠിക്കുന്നു.',
      narration_en: "Hello friends! I am Ollie. Today we learn to raise our hand and smile when our name is called.",
      visualLearning: {
        intro_ml: 'ഓരോ കൂട്ടുകാരനും ഒരു മനോഹരമായ പേരുണ്ട്. നമ്മെ ആരെങ്കിലും സ്നേഹത്തോടെ പേര് വിളിക്കുമ്പോൾ നാം അവരെ നോക്കണം.',
        intro_en: 'Everyone has a beautiful name. When someone calls our name with love, we look at them and smile.',
        illustrations: [
          {
            id: 'v1',
            title_ml: 'പേര് വിളിക്കുമ്പോൾ നോക്കാം',
            title_en: 'Look When Called',
            emoji: '👀',
            bg: 'bg-purple-100',
            desc_ml: 'ആരെങ്കിലും പേര് വിളിച്ചാൽ മുഖത്ത് നോക്കി പുഞ്ചിരിക്കുക'
          },
          {
            id: 'v2',
            title_ml: 'കൈ ഉയർത്തി കാണിക്കാം',
            title_en: 'Raise Your Hand',
            emoji: '🙋‍♂️',
            bg: 'bg-yellow-100',
            desc_ml: 'ഞാൻ ഇവിടെയുണ്ട് എന്ന് പറയാൻ കൈ ഉയർത്താം'
          },
          {
            id: 'v3',
            title_ml: 'സ്വന്തം ഫോട്ടോ കണ്ടെത്താം',
            title_en: 'Find Your Photo',
            emoji: '🖼️',
            bg: 'bg-sky-100',
            desc_ml: 'ക്ലാസ്സിലെ ചുവരിൽ നമ്മുടെ സ്വന്തം ഫോട്ടോ കാണാം'
          }
        ],
        videoPath: '/media/care-group/module-01/lesson-01/main-concept.mp4',
        videoTitle: 'Learning My Name with Ollie',
        durationText: '3 mins'
      },
      classroomActivity: {
        type: 'turn_taking',
        title_ml: 'പേര് വിളിക്കൽ കളി (റോൾ കോൾ ഫൺ)',
        title_en: 'The Name Roll Call Game',
        teacherGuide_ml: 'ക്ലാസ്സ് റൂം ടിവിയിൽ ഓരോ കുട്ടിയുടെയും ചിത്രം അല്ലെങ്കിൽ പേര് വലിയ അക്ഷരത്തിൽ കാണിക്കുക. കുട്ടി കൈ ഉയർത്തുമ്പോൾ എല്ലാവരും കൈയടിച്ച് പ്രോത്സാഹിപ്പിക്കുക.',
        teacherGuide_en: 'Display each student name/photo on Classroom TV. When their name pops up, child raises their hand and the whole class claps.',
        prompt_ml: 'ടിവിയിൽ നിങ്ങളുടെ പേര് വരുമ്പോൾ വേഗം കൈ വീശൂ!',
        prompt_en: 'Wave your hand high when your name appears on TV!',
        rounds: [
          { name: 'അനു (Anu)', emoji: '👧' },
          { name: 'രാഹുൽ (Rahul)', emoji: '👦' },
          { name: 'മിയ (Miya)', emoji: '👧' },
          { name: 'ഫർഹാൻ (Farhan)', emoji: '👦' }
        ]
      },
      understandingCheck: {
        title_ml: 'വ്യക്തിഗത പരിശോധന – നിന്റെ പേര് തിരിച്ചറിയൂ',
        title_en: 'Individual Check – Identify Your Name & Reaction',
        questions: [
          {
            id: 'q1',
            question_ml: 'ടീച്ചർ നിങ്ങളുടെ പേര് വിളിക്കുമ്പോൾ നിങ്ങൾ എന്തു ചെയ്യണം?',
            question_en: 'What should you do when teacher calls your name?',
            options: [
              { id: 'opt1', text_ml: 'കൈ ഉയർത്തുക, നോക്കുക', text_en: 'Raise hand and look', emoji: '🙋‍♀️', isCorrect: true },
              { id: 'opt2', text_ml: 'ഓടി ഒളിക്കുക', text_en: 'Run away and hide', emoji: '🙈', isCorrect: false }
            ]
          },
          {
            id: 'q2',
            question_ml: 'ഇതിൽ നിങ്ങളുടെ ബാഡ്ജ് ഏതാണ്?',
            question_en: 'Which one is a student ID badge?',
            options: [
              { id: 'opt1', text_ml: 'ഫോട്ടോയുള്ള ഐഡി കാർഡ്', text_en: 'ID Card with Photo', emoji: '🪪', isCorrect: true },
              { id: 'opt2', text_ml: 'മരത്തിന്റെ ഇല', text_en: 'Tree Leaf', emoji: '🍃', isCorrect: false }
            ]
          }
        ]
      },
      gameCode: 'picture_match',
      gameTitle_ml: 'ചിത്രവും പേരും പൊരുത്തപ്പെടുത്തൽ',
      gameTitle_en: 'Name & Picture Match'
    }
  ],

  // =========================================================================
  // CARE GROUP - MODULE 2: കിണ്ണം നിറയെ (A Full Bowl)
  // =========================================================================
  'care-m02': [
    {
      id: 'care-m02-l01',
      moduleId: 'care-m02',
      lessonNumber: 1,
      title_ml: 'രുചിയുള്ള പഴങ്ങളും പാത്രങ്ങളും',
      title_en: 'Tasty Fruits & My Plate',
      narration_ml: 'നല്ല ഭക്ഷണവും പഴങ്ങളും കഴിച്ചാൽ നമുക്ക് വലിയ ശക്തി കിട്ടും. പഴങ്ങൾ തിരിച്ചറിയാനും കൈ കഴുകി കഴിക്കാനും പഠിക്കാം.',
      narration_en: 'Eating fresh fruits and good food makes us strong and happy. Let us recognize fruits and healthy eating habits.',
      visualLearning: {
        intro_ml: 'നമ്മുടെ പ്ലേറ്റിൽ നല്ല പഴങ്ങളും പച്ചക്കറികളും ഉണ്ടെങ്കിൽ ആരോഗ്യം ഉണ്ടാകും.',
        intro_en: 'Fresh colorful fruits in our bowl give us energy to play and learn.',
        illustrations: [
          { id: 'f1', title_ml: 'ചുവന്ന ആപ്പിൾ', title_en: 'Red Apple', emoji: '🍎', bg: 'bg-rose-100', desc_ml: 'മധുരമുള്ള ആപ്പിൾ' },
          { id: 'f2', title_ml: 'മഞ്ഞ ഏത്തപ്പഴം', title_en: 'Yellow Banana', emoji: '🍌', bg: 'bg-yellow-100', desc_ml: 'ഊർജ്ജം തരുന്ന പഴം' },
          { id: 'f3', title_ml: 'വൃത്തിയുള്ള പ്ലേറ്റ്', title_en: 'Clean Bowl', emoji: '🥣', bg: 'bg-sky-100', desc_ml: 'ഭക്ഷണം കഴിക്കുന്ന പാത്രം' }
        ],
        videoPath: '/media/care-group/module-02/lesson-01/main-concept.mp4',
        videoTitle: 'Healthy Food Bowl with Ollie',
        durationText: '3 mins'
      },
      classroomActivity: {
        type: 'picture_naming',
        title_ml: 'പഴക്കൂട കണ്ടെത്തൽ കളി',
        title_en: 'Fruit Basket Discovery',
        teacherGuide_ml: 'ടിവിയിൽ ഓരോ പഴവും വരുമ്പോൾ കുട്ടികൾ പഴത്തിന്റെ പേര് മലയാളത്തിൽ ഒന്നിച്ച് പറയുക.',
        teacherGuide_en: 'When each fruit appears on Classroom TV, prompt students to shout the fruit name in unison.',
        prompt_ml: 'ഈ പഴത്തിന്റെ പേര് എന്താണ്?',
        prompt_en: 'What is the name of this fruit?',
        rounds: [
          { name: 'ആപ്പിൾ (Apple)', emoji: '🍎' },
          { name: 'മാമ്പഴം (Mango)', emoji: '🥭' },
          { name: 'പപ്പായ (Papaya)', emoji: '🍈' },
          { name: 'ഓറഞ്ച് (Orange)', emoji: '🍊' }
        ]
      },
      understandingCheck: {
        title_ml: 'വ്യക്തിഗത പരിശോധന – നല്ല ഭക്ഷണം ഏത്?',
        title_en: 'Individual Check – Identify Healthy Fruit',
        questions: [
          {
            id: 'q1',
            question_ml: 'ഇതിൽ മധുരമുള്ള ആപ്പിൾ ഏതാണ്?',
            question_en: 'Which one is the red apple?',
            options: [
              { id: 'opt1', text_ml: 'ആപ്പിൾ', text_en: 'Apple', emoji: '🍎', isCorrect: true },
              { id: 'opt2', text_ml: 'കല്ല്', text_en: 'Stone', emoji: '🪨', isCorrect: false }
            ]
          },
          {
            id: 'q2',
            question_ml: 'ഭക്ഷണം കഴിക്കുന്നതിനു മുൻപ് നാം എന്ത് ചെയ്യണം?',
            question_en: 'What should we do before eating?',
            options: [
              { id: 'opt1', text_ml: 'കൈ സോപ്പിട്ട് കഴുകുക', text_en: 'Wash hands with soap', emoji: '🧼', isCorrect: true },
              { id: 'opt2', text_ml: 'മണ്ണിൽ കളിക്കുക', text_en: 'Play in mud', emoji: '🐾', isCorrect: false }
            ]
          }
        ]
      },
      gameCode: 'fruit_basket',
      gameTitle_ml: 'പഴക്കൂട കളി (ഫ്രൂട്ട് ബാസ്കറ്റ്)',
      gameTitle_en: 'Catch the Fruits Basket'
    }
  ],

  // =========================================================================
  // PRIMARY GROUP - MODULE 1: അക്ഷരലോകം (World of Letters)
  // =========================================================================
  'primary-m01': [
    {
      id: 'primary-m01-l01',
      moduleId: 'primary-m01',
      lessonNumber: 1,
      title_ml: 'ആദ്യ സ്വരങ്ങൾ – അ, ആ, ഇ, ഈ',
      title_en: 'First Vowels – A, Aa, I, Ee',
      narration_ml: 'മലയാളത്തിലെ ആദ്യത്തെ അക്ഷരമായ "അ" അമ്മയുടെ "അ" ആണ്. നമുക്ക് അക്ഷരങ്ങളുടെ ശബ്ദവും രൂപവും പഠിക്കാം!',
      narration_en: 'The first Malayalam vowel "അ" is for "Amma" (Mother). Let us learn the sound and shape of letters!',
      visualLearning: {
        intro_ml: 'അക്ഷരങ്ങൾ ചിത്രങ്ങളെ പോലെ മനോഹരമാണ്. അവ കേൾക്കുമ്പോഴും വായിക്കുമ്പോഴും രസമുള്ള കഥകൾ വിരിയുന്നു.',
        intro_en: 'Letters are as beautiful as pictures. When we hear their sounds, wonderful stories come to life.',
        illustrations: [
          { id: 'l1', title_ml: 'അ – അമ്മ', title_en: 'A – Amma (Mother)', emoji: '🤱', bg: 'bg-purple-100', desc_ml: '"അ" എന്ന അക്ഷരം അമ്മയെ ഓർമ്മിപ്പിക്കുന്നു' },
          { id: 'l2', title_ml: 'ആ – ആന', title_en: 'Aa – Aana (Elephant)', emoji: '🐘', bg: 'bg-sky-100', desc_ml: '"ആ" എന്ന അക്ഷരം വലിയ കൊമ്പനാനയെ ഓർമ്മിപ്പിക്കുന്നു' },
          { id: 'l3', title_ml: 'ഇ – ഇല', title_en: 'I – Ila (Leaf)', emoji: '🍃', bg: 'bg-mint-100', desc_ml: '"ഇ" എന്ന അക്ഷരം പച്ച ഇലയെ ഓർമ്മിപ്പിക്കുന്നു' },
          { id: 'l4', title_ml: 'ഈ – ഈച്ച', title_en: 'Ee – Eecha (Fly)', emoji: '🪰', bg: 'bg-yellow-100', desc_ml: '"ഈ" എന്ന അക്ഷരം പറക്കുന്ന ഈച്ച' }
        ],
        videoPath: '/media/primary/module-01/lesson-01/main-concept.mp4',
        videoTitle: 'Malayalam Vowels Animation with Ollie',
        durationText: '4 mins'
      },
      classroomActivity: {
        type: 'picture_matching',
        title_ml: 'അക്ഷരവും ചിത്രവും പൊരുത്തപ്പെടുത്തൽ',
        title_en: 'Letter to Picture Match Relay',
        teacherGuide_ml: 'ക്ലാസ്സ് റൂം ടിവിയിൽ ഓരോ അക്ഷരവും കാണിക്കുക. കുട്ടികൾ ബോർഡിൽ കാണുന്ന ചിത്രങ്ങളിൽ നിന്നും ശരിയായ ചിത്രം തൊട്ടു കാണിക്കുക.',
        teacherGuide_en: 'Show letters one by one on the screen. Let students take turns tapping the matching real object.',
        prompt_ml: '"ആ" എന്ന അക്ഷരത്തിന് യോജിച്ച ചിത്രം കണ്ടെത്തൂ!',
        prompt_en: 'Find the picture that matches letter "ആ" (Elephant)!',
        rounds: [
          { letter: 'അ', word: 'അമ്മ', emoji: '🤱' },
          { letter: 'ആ', word: 'ആന', emoji: '🐘' },
          { letter: 'ഇ', word: 'ഇല', emoji: '🍃' }
        ]
      },
      understandingCheck: {
        title_ml: 'വ്യക്തിഗത വിലയിരുത്തൽ – അക്ഷരങ്ങൾ',
        title_en: 'Individual Check – Letter Phonics',
        questions: [
          {
            id: 'q1',
            question_ml: '"ആന" തുടങ്ങുന്ന അക്ഷരം ഏതാണ്?',
            question_en: 'Which letter does "Aana" (Elephant) start with?',
            options: [
              { id: 'opt1', text_ml: 'ആ (ആന)', text_en: 'Aa (Elephant)', emoji: '🐘', isCorrect: true },
              { id: 'opt2', text_ml: 'ഉ (ഉരൽ)', text_en: 'U (Mortar)', emoji: '🥣', isCorrect: false }
            ]
          },
          {
            id: 'q2',
            question_ml: 'പച്ച "ഇല" ഏത് അക്ഷരത്തിലാണ് തുടങ്ങുന്നത്?',
            question_en: 'Which letter does green leaf "Ila" begin with?',
            options: [
              { id: 'opt1', text_ml: 'ഇ (ഇല)', text_en: 'I (Leaf)', emoji: '🍃', isCorrect: true },
              { id: 'opt2', text_ml: 'ക (കപ്പൽ)', text_en: 'Ka (Ship)', emoji: '🚢', isCorrect: false }
            ]
          }
        ]
      },
      gameCode: 'balloon_pop',
      gameTitle_ml: 'അക്ഷര ബലൂൺ പൊട്ടിക്കൽ',
      gameTitle_en: 'Letter Balloon Pop'
    }
  ],

  // =========================================================================
  // PRIMARY GROUP - MODULE 2: സംഖ്യകളും എണ്ണലും (Numbers & Counting)
  // =========================================================================
  'primary-m02': [
    {
      id: 'primary-m02-l01',
      moduleId: 'primary-m02',
      lessonNumber: 1,
      title_ml: '1 മുതൽ 5 വരെ എണ്ണാം',
      title_en: 'Counting 1 to 5 with Fun Objects',
      narration_ml: 'ഒരു ആകാശം, രണ്ട് കണ്ണുകൾ, മൂന്ന് ചക്രമുള്ള ഓട്ടോറിക്ഷ, നാല് കാലുള്ള മേശ, അഞ്ച് വിരലുകൾ!',
      narration_en: 'One sky, two eyes, three auto wheels, four table legs, and five fingers on our hand!',
      visualLearning: {
        intro_ml: 'നമ്മുടെ ചുറ്റുമുള്ളതെല്ലാം നമുക്ക് എണ്ണി നോക്കാം. ഒന്ന്, രണ്ട്, മൂന്ന്, നാല്, അഞ്ച്!',
        intro_en: 'Look at your hand! You have 5 smiling fingers. Let us count them together.',
        illustrations: [
          { id: 'n1', title_ml: '1 - ഒരു സൂര്യൻ', title_en: '1 - One Sun', emoji: '☀️', bg: 'bg-yellow-100', desc_ml: 'ആകാശത്ത് ഒറ്റ സൂര്യൻ' },
          { id: 'n2', title_ml: '2 - രണ്ട് കണ്ണുകൾ', title_en: '2 - Two Eyes', emoji: '👀', bg: 'bg-purple-100', desc_ml: 'കാണാൻ രണ്ട് കണ്ണുകൾ' },
          { id: 'n3', title_ml: '3 - മൂന്ന് നക്ഷത്രങ്ങൾ', title_en: '3 - Three Stars', emoji: '⭐', bg: 'bg-sky-100', desc_ml: 'മിന്നിത്തിളങ്ങുന്ന 3 നക്ഷത്രങ്ങൾ' },
          { id: 'n4', title_ml: '4 - നാല് പൂക്കൾ', title_en: '4 - Four Flowers', emoji: '🌸', bg: 'bg-pink-100', desc_ml: 'മനോഹരമായ 4 പൂക്കൾ' },
          { id: 'n5', title_ml: '5 - അഞ്ച് വിരലുകൾ', title_en: '5 - Five Fingers', emoji: '🖐️', bg: 'bg-mint-100', desc_ml: 'നമ്മുടെ കൈയിലെ 5 വിരലുകൾ' }
        ],
        videoPath: '/media/primary/module-02/lesson-01/main-concept.mp4',
        videoTitle: 'Number Train Counting 1 to 5',
        durationText: '4 mins'
      },
      classroomActivity: {
        type: 'counting_objects',
        title_ml: 'ക്ലാസ്സ് റൂം കൗണ്ടിങ് ചലഞ്ച്',
        title_en: 'Classroom Counting Challenge',
        teacherGuide_ml: 'ടിവിയിൽ കിലുങ്ങുന്ന നക്ഷത്രങ്ങൾ വരുന്നു. കുട്ടികൾ ഉറക്കെ എണ്ണി അവസാന സംഖ്യ കൈകൊട്ടി പറയുക.',
        teacherGuide_en: 'Visual stars appear on Classroom TV. Students count aloud together and clap for the total count.',
        prompt_ml: 'സ്ക്രീനിൽ എത്ര നക്ഷത്രങ്ങളുണ്ട്? എണ്ണി നോക്കൂ!',
        prompt_en: 'How many stars are on the screen? Count them!',
        rounds: [
          { count: 3, item: 'നക്ഷത്രങ്ങൾ', emoji: '⭐⭐⭐' },
          { count: 5, item: 'പൂമ്പാറ്റകൾ', emoji: '🦋🦋🦋🦋🦋' },
          { count: 2, item: 'പന്തുകൾ', emoji: '⚽⚽' }
        ]
      },
      understandingCheck: {
        title_ml: 'വ്യക്തിഗത പരിശോധന – എണ്ണൽ',
        title_en: 'Individual Check – Counting',
        questions: [
          {
            id: 'q1',
            question_ml: 'ഇവിടെ എത്ര ആപ്പിളുകൾ ഉണ്ട്? 🍎 🍎 🍎',
            question_en: 'How many apples are here? 🍎 🍎 🍎',
            options: [
              { id: 'opt1', text_ml: '3 (മൂന്ന്)', text_en: '3 (Three)', emoji: '3️⃣', isCorrect: true },
              { id: 'opt2', text_ml: '1 (ഒന്ന്)', text_en: '1 (One)', emoji: '1️⃣', isCorrect: false }
            ]
          },
          {
            id: 'q2',
            question_ml: 'ഒരു കൈയിൽ എത്ര വിരലുകൾ ഉണ്ട്?',
            question_en: 'How many fingers on one hand?',
            options: [
              { id: 'opt1', text_ml: '5 (അഞ്ച്)', text_en: '5 (Five)', emoji: '🖐️', isCorrect: true },
              { id: 'opt2', text_ml: '2 (രണ്ട്)', text_en: '2 (Two)', emoji: '✌️', isCorrect: false }
            ]
          }
        ]
      },
      gameCode: 'number_train',
      gameTitle_ml: 'നമ്പർ ട്രെയിൻ കളി',
      gameTitle_en: 'Number Train Adventure'
    }
  ],

  // =========================================================================
  // SECONDARY GROUP - MODULE 1: അടിസ്ഥാന ഗണിതം – ഭിന്നസംഖ്യകൾ (Fractions)
  // =========================================================================
  'secondary-m01': [
    {
      id: 'secondary-m01-l01',
      moduleId: 'secondary-m01',
      lessonNumber: 1,
      title_ml: 'തുല്യമായി പങ്കിടാം – പകുതിയും (1/2) കാലും (1/4)',
      title_en: 'Equal Sharing – Halves (1/2) & Quarters (1/4)',
      narration_ml: 'ഒരു മുഴുവൻ പിസ്സ രണ്ടുപേർക്ക് തുല്യമായി നൽകിയാൽ ഓരോരുത്തർക്കും കിട്ടുന്നത് പകുതി അഥവാ 1/2 ആണ്. നാലുപേർക്ക് നൽകിയാൽ 1/4.',
      narration_en: 'When a full pizza is shared equally between 2 friends, each gets half (1/2). When shared among 4 friends, each gets a quarter (1/4).',
      visualLearning: {
        intro_ml: 'ഭിന്നസംഖ്യകൾ എന്നാൽ ഒരു വസ്തുവിനെ തുല്യ ഭാഗങ്ങളായി പങ്കിടുന്ന രസകരമായ കണക്കാണ്.',
        intro_en: 'Fractions are about fair and equal sharing in everyday life with food and shapes.',
        illustrations: [
          { id: 'fr1', title_ml: 'മുഴുവൻ പിസ്സ (1)', title_en: 'Whole Pizza (1)', emoji: '🍕', bg: 'bg-yellow-100', desc_ml: 'മുറിക്കാത്ത ഒരു മുഴുവൻ പിസ്സ' },
          { id: 'fr2', title_ml: 'പകുതി (1/2)', title_en: 'One Half (1/2)', emoji: '🌓', bg: 'bg-purple-100', desc_ml: 'രണ്ട് തുല്യ കഷണങ്ങളിൽ ഒന്ന്' },
          { id: 'fr3', title_ml: 'കാൽ ഭാഗം (1/4)', title_en: 'One Quarter (1/4)', emoji: '🍕', bg: 'bg-sky-100', desc_ml: 'നാല് തുല്യ കഷണങ്ങളിൽ ഒന്ന്' }
        ],
        videoPath: '/media/secondary/module-01/lesson-01/main-concept.mp4',
        videoTitle: 'Fraction Pizza Kitchen with Ollie',
        durationText: '5 mins'
      },
      classroomActivity: {
        type: 'equal_sharing',
        title_ml: 'പിസ്സ പങ്കുവെക്കൽ ക്ലാസ്സ്റൂം ചലഞ്ച്',
        title_en: 'Pizza Sharing Classroom Challenge',
        teacherGuide_ml: 'ക്ലാസ്സ് റൂം ടിവിയിൽ വലിയ പിസ്സ സ്ലൈസ് കാണിക്കുക. കുട്ടികൾ ഓരോരുത്തരായി വന്ന് 2 തുല്യ കഷണങ്ങളാക്കാൻ ടാപ്പ് ചെയ്യുക.',
        teacherGuide_en: 'Interactive pizza on Classroom TV. Students tap slices to distribute half and quarter portions fairly.',
        prompt_ml: 'ഈ പിസ്സയെ രണ്ട് കൂട്ടുകാർക്കായി പകുതിയായി (1/2) മുറിക്കൂ!',
        prompt_en: 'Divide this pizza into two equal halves (1/2)!',
        rounds: [
          { item: 'പിസ്സ 1/2 പകുതി', emoji: '🍕🍕' },
          { item: 'ആപ്പിൾ 1/4 കാൽ ഭാഗം', emoji: '🍎' }
        ]
      },
      understandingCheck: {
        title_ml: 'വ്യക്തിഗത പരിശോധന – ഭിന്നസംഖ്യകൾ',
        title_en: 'Individual Check – Fractions',
        questions: [
          {
            id: 'q1',
            question_ml: 'ഒരു ആപ്പിൾ തുല്യമായി രണ്ട് കഷണമാക്കിയാൽ ഒരു കഷണത്തെ എന്തു വിളിക്കും?',
            question_en: 'If an apple is cut into 2 equal parts, what is one part called?',
            options: [
              { id: 'opt1', text_ml: 'പകുതി (1/2)', text_en: 'Half (1/2)', emoji: '🌓', isCorrect: true },
              { id: 'opt2', text_ml: 'മുഴുവൻ (1)', text_en: 'Whole (1)', emoji: '🌕', isCorrect: false }
            ]
          },
          {
            id: 'q2',
            question_ml: 'നാല് തുല്യ കഷണങ്ങളിൽ ഒന്ന് ഏതാണ്?',
            question_en: 'Which fraction represents one out of four equal slices?',
            options: [
              { id: 'opt1', text_ml: 'കാൽ ഭാഗം (1/4)', text_en: 'Quarter (1/4)', emoji: '🍕', isCorrect: true },
              { id: 'opt2', text_ml: 'പകുതി (1/2)', text_en: 'Half (1/2)', emoji: '🌓', isCorrect: false }
            ]
          }
        ]
      },
      gameCode: 'fraction_pizza',
      gameTitle_ml: 'ഫ്രാക്ഷൻ പിസ്സ മേക്കർ',
      gameTitle_en: 'Fraction Pizza Chef'
    }
  ],

  // =========================================================================
  // VOCATIONAL GROUP - MODULE 6: തൊഴിൽ ചെയ്യാം (Work and Vocations)
  // =========================================================================
  'vocational-m06': [
    {
      id: 'vocational-m06-l01',
      moduleId: 'vocational-m06',
      lessonNumber: 1,
      title_ml: 'പേപ്പർ ബാഗ് നിർമ്മാണവും വർക്ക്‌സ്‌പെയ്‌സും',
      title_en: 'Paper Bag Crafting & Workplace Neatness',
      narration_ml: 'നമ്മുടെ കൈകൾ കൊണ്ട് പരിസ്ഥിതി സൗഹൃദ പേപ്പർ ബാഗുകൾ നിർമ്മിക്കാം. മേശ വൃത്തിയായി സൂക്ഷിക്കാനും കൃത്യസമയത്ത് ജോലി പൂർത്തിയാക്കാനും പഠിക്കാം.',
      narration_en: 'Let us make eco-friendly paper bags with our own hands. Learn to organize the workstation and complete work on time.',
      visualLearning: {
        intro_ml: 'തൊഴിൽ എന്നാൽ സ്വന്തം അധ്വാനം കൊണ്ട് സന്തോഷവും വരുമാനവും അഭിമാനവും നേടുന്ന ഒന്നാണ്.',
        intro_en: 'A vocation brings pride, independence, and the joy of creating something useful for society.',
        illustrations: [
          { id: 'w1', title_ml: '1. പേപ്പർ മടക്കൽ', title_en: '1. Paper Folding', emoji: '📄', bg: 'bg-yellow-100', desc_ml: 'കൃത്യമായ അളവിൽ മടക്കുക' },
          { id: 'w2', title_ml: '2. പശ തേക്കൽ', title_en: '2. Applying Glue', emoji: '🧴', bg: 'bg-sky-100', desc_ml: 'അരികുകളിൽ വൃത്തിയായി പശ തേക്കുക' },
          { id: 'w3', title_ml: '3. പിടി പിടിപ്പിക്കൽ', title_en: '3. Attaching Handles', emoji: '🛍️', bg: 'bg-mint-100', desc_ml: 'ചരട് ഉറപ്പിച്ച് മനോഹരമായ ബാഗ്' },
          { id: 'w4', title_ml: '4. മേശ വൃത്തിയാക്കൽ', title_en: '4. Clean Workstation', emoji: '🧹', bg: 'bg-purple-100', desc_ml: 'പണി കഴിഞ്ഞാൽ മേശ തുടച്ചു വൃത്തിയാക്കുക' }
        ],
        videoPath: '/media/vocational/module-06/lesson-01/main-concept.mp4',
        videoTitle: 'Eco Paper Bag Workshop Demo',
        durationText: '5 mins'
      },
      classroomActivity: {
        type: 'step_sequencing',
        title_ml: 'തൊഴിൽ ഘട്ടങ്ങൾ ക്രമീകരിക്കൽ',
        title_en: 'Work Order Sequencing Relay',
        teacherGuide_ml: 'ക്ലാസ്സ് റൂം ടിവിയിൽ പേപ്പർ ബാഗ് നിർമ്മാണത്തിന്റെ ഘട്ടങ്ങൾ ചിതറി കിടക്കും. കുട്ടികൾ വന്ന് 1, 2, 3 ക്രമത്തിൽ അടുക്കണം.',
        teacherGuide_en: 'Work steps are scrambled on the big screen. Students arrange them in the proper procedural order.',
        prompt_ml: 'പേപ്പർ ബാഗ് ഉണ്ടാക്കാൻ ആദ്യം എന്തു ചെയ്യണം?',
        prompt_en: 'What is step 1 in making an eco paper bag?',
        rounds: [
          { step: 1, text: 'പേപ്പർ അളന്നു മടക്കുക', emoji: '📄' },
          { step: 2, text: 'പശ തേക്കുക', emoji: '🧴' },
          { step: 3, text: 'കൈപ്പിടി ഉറപ്പിക്കുക', emoji: '🛍️' }
        ]
      },
      understandingCheck: {
        title_ml: 'വ്യക്തിഗത പരിശോധന – തൊഴിൽ ചിട്ടകൾ',
        title_en: 'Individual Check – Work Habits',
        questions: [
          {
            id: 'q1',
            question_ml: 'ജോലി കഴിഞ്ഞാൽ വർക്ക്‌സ്‌പെയ്‌സ് എന്തു ചെയ്യണം?',
            question_en: 'What should you do with your workstation after finishing work?',
            options: [
              { id: 'opt1', text_ml: 'സാധനങ്ങൾ അടുക്കി വൃത്തിയാക്കുക', text_en: 'Clean and organize table', emoji: '✨', isCorrect: true },
              { id: 'opt2', text_ml: 'എല്ലാം അലങ്കോലമായി ഇടുക', text_en: 'Leave it messy', emoji: '🗑️', isCorrect: false }
            ]
          },
          {
            id: 'q2',
            question_ml: 'ഒരു കസ്റ്റമർ വരുമ്പോൾ എന്തു പറയണം?',
            question_en: 'What should you say when a customer arrives?',
            options: [
              { id: 'opt1', text_ml: 'നമസ്കാരം, എന്തു വേണം?', text_en: 'Namaskaram, how can I help?', emoji: '🙏', isCorrect: true },
              { id: 'opt2', text_ml: 'ദേഷ്യപ്പെടുക', text_en: 'Get angry', emoji: '😠', isCorrect: false }
            ]
          }
        ]
      },
      gameCode: 'smart_workshop',
      gameTitle_ml: 'സ്മാർട്ട് വർക്ക്‌ഷോപ്പ് കളി',
      gameTitle_en: 'Smart Workshop Manager'
    }
  ]
};

// Generates a comprehensive default lesson template for any module not explicitly customized
export const getLessonsForModule = (moduleId, moduleInfo) => {
  if (LESSONS_DATABASE[moduleId]) {
    return LESSONS_DATABASE[moduleId];
  }

  const title_ml = moduleInfo ? moduleInfo.title_ml : 'പാഠം 1';
  const title_en = moduleInfo ? moduleInfo.title_en : 'Lesson 1';
  const groupCode = moduleInfo ? moduleInfo.groupCode : 'care';

  // Return a rich, functional 4-phase lesson structure tailored to the module!
  return [
    {
      id: `${moduleId}-l01`,
      moduleId: moduleId,
      lessonNumber: 1,
      title_ml: `${title_ml} – ആദ്യ പാഠം`,
      title_en: `${title_en} – Core Concept`,
      narration_ml: `ഹലോ! ${title_ml} എന്ന പാഠത്തിലേക്ക് സ്വാഗതം. ഒല്ലിയോടൊപ്പം നമുക്ക് രസകരമായി പഠിക്കാം.`,
      narration_en: `Welcome to ${title_en}! Let us discover and learn exciting concepts together with Ollie.`,
      visualLearning: {
        intro_ml: `${title_ml} കുട്ടികളിൽ പുതിയ അറിവും ആത്മവിശ്വാസവും വളർത്തുന്നു.`,
        intro_en: `${title_en} helps children develop new skills, confidence and practical understanding.`,
        illustrations: [
          { id: 'i1', title_ml: 'ആശയ പഠനം', title_en: 'Key Concept', emoji: '💡', bg: 'bg-purple-100', desc_ml: 'പ്രധാന ആശയം മനസ്സിലാക്കാം' },
          { id: 'i2', title_ml: 'ജീവിതാനുഭവം', title_en: 'Real Life Example', emoji: '🌟', bg: 'bg-sky-100', desc_ml: 'നിത്യജീവിതവുമായി ബന്ധിപ്പിക്കാം' },
          { id: 'i3', title_ml: 'പ്രാക്ടീസ്', title_en: 'Hands-on Practice', emoji: '🎨', bg: 'bg-mint-100', desc_ml: 'ചെയ്തു പഠിക്കാം' }
        ],
        videoPath: `/media/${groupCode === 'care' ? 'care-group' : groupCode}/module-01/lesson-01/main-concept.mp4`,
        videoTitle: `${title_en} - Veo 3 Visual Lesson`,
        durationText: '3-5 mins'
      },
      classroomActivity: {
        type: 'turn_taking',
        title_ml: `${title_ml} – ക്ലാസ്സ് റൂം പങ്കാളിത്തം`,
        title_en: `${title_en} – Classroom Turn-Taking`,
        teacherGuide_ml: 'ക്ലാസ്സ് റൂം ടിവി സ്ക്രീൻ ഉപയോഗിച്ച് എല്ലാ കുട്ടികളെയും ഒന്നിച്ച് പ്രവർത്തനത്തിൽ പങ്കെടുപ്പിക്കുക.',
        teacherGuide_en: 'Engage all students on Classroom TV with turn-taking and positive cheering.',
        prompt_ml: 'സ്ക്രീനിൽ വരുന്ന ശരിയായ ചിത്രം കണ്ടുപിടിക്കൂ!',
        prompt_en: 'Find the matching item on screen!',
        rounds: [
          { name: 'റൗണ്ട് 1', emoji: '🎯' },
          { name: 'റൗണ്ട് 2', emoji: '⭐' }
        ]
      },
      understandingCheck: {
        title_ml: `വ്യക്തിഗത പരിശോധന – ${title_ml}`,
        title_en: `Individual Check – ${title_en}`,
        questions: [
          {
            id: 'cq1',
            question_ml: 'ഈ പാഠത്തിൽ നാം പഠിച്ച ശരിയായ ശീലം ഏതാണ്?',
            question_en: 'Which is the positive habit we learned in this lesson?',
            options: [
              { id: 'copt1', text_ml: 'ശ്രദ്ധയോടെ സന്തോഷത്തോടെ ചെയ്യുക', text_en: 'Do with care and joy', emoji: '🌟', isCorrect: true },
              { id: 'copt2', text_ml: 'ദേഷ്യപ്പെടുക', text_en: 'Get upset', emoji: '❌', isCorrect: false }
            ]
          },
          {
            id: 'cq2',
            question_ml: 'ഇതിൽ ഒല്ലി കൂട്ടുകാരന് ഇഷ്ടപ്പെട്ട നക്ഷത്രം ഏതാണ്?',
            question_en: 'Which gold star does Ollie award for good effort?',
            options: [
              { id: 'copt1', text_ml: 'തിളങ്ങുന്ന സ്വർണ്ണ നക്ഷത്രം', text_en: 'Golden Star', emoji: '⭐', isCorrect: true },
              { id: 'copt2', text_ml: 'ഇരുണ്ട കല്ല്', text_en: 'Dark Pebble', emoji: '🪨', isCorrect: false }
            ]
          }
        ]
      },
      gameCode: groupCode === 'care' ? 'picture_match' : groupCode === 'primary' ? 'memory_cards' : groupCode === 'secondary' ? 'safe_unsafe' : 'smart_workshop',
      gameTitle_ml: `${title_ml} ഗെയിം`,
      gameTitle_en: `${title_en} Interactive Game`
    }
  ];
};

export default LESSONS_DATABASE;

