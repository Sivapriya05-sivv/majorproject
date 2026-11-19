// VEO 3 VIDEO CATALOG CONFIGURATION
// Maps Educational Modules & Lessons to Veo 3 Videos

export const VIDEO_CATALOG = {
  'care-m01-l01': [
    {
      id: 'v-care-01-01',
      title_ml: 'പേര് തിരിച്ചറിയൽ വീഡിയോ',
      title_en: 'Name Recognition Demonstration',
      videoUrl: '/media/care-group/module-01/lesson-01/main-concept.mp4',
      thumbnailUrl: '',
      duration: 180,
      description_ml: 'ഒല്ലി കുട്ടികൾക്ക് അവരുടെ പേര് വിളിക്കുമ്പോൾ എങ്ങനെ പ്രതികരിക്കണമെന്ന് കാണിച്ചുതരുന്നു.',
      description_en: 'Ollie demonstrates raising hand and smiling when your name is called in class.'
    }
  ],
  'care-m02-l01': [
    {
      id: 'v-care-02-01',
      title_ml: 'പഴങ്ങളുടെ അത്ഭുത ലോകം',
      title_en: 'Fruit Bowl Exploration',
      videoUrl: '/media/care-group/module-02/lesson-01/main-concept.mp4',
      thumbnailUrl: '',
      duration: 195,
      description_ml: 'വിവിധ വർണ്ണങ്ങളിലുള്ള പഴങ്ങൾ കഴിക്കുന്നതിന്റെ സന്തോഷം ഒല്ലി അവതരിപ്പിക്കുന്നു.',
      description_en: 'Visual joy of tasting colourful fruits and keeping our bowl clean.'
    }
  ],
  'primary-m01-l01': [
    {
      id: 'v-prim-01-01',
      title_ml: 'അക്ഷരങ്ങളുടെ പാട്ട്',
      title_en: 'Malayalam Vowels Song & Shapes',
      videoUrl: '/media/primary/module-01/lesson-01/main-concept.mp4',
      thumbnailUrl: '',
      duration: 240,
      description_ml: 'അ, ആ, ഇ, ഈ എന്നീ അക്ഷരങ്ങളുടെ മാന്ത്രിക രൂപങ്ങൾ.',
      description_en: 'Magical visual representation of vowels: Amma, Aana, Ila, and Eecha.'
    }
  ],
  'primary-m02-l01': [
    {
      id: 'v-prim-02-01',
      title_ml: 'എണ്ണൽ വണ്ടി (1 മുതൽ 5 വരെ)',
      title_en: 'Counting Train 1 to 5',
      videoUrl: '/media/primary/module-02/lesson-01/main-concept.mp4',
      thumbnailUrl: '',
      duration: 210,
      description_ml: 'നമ്പർ ട്രെയിനിലേക്ക് മൃഗങ്ങളും പഴങ്ങളും കയറുന്നു.',
      description_en: 'Animated train counting friendly animals and stars from 1 to 5.'
    }
  ],
  'secondary-m01-l01': [
    {
      id: 'v-sec-01-01',
      title_ml: 'പിസ്സ പങ്കുവെക്കാം (ഭിന്നസംഖ്യകൾ)',
      title_en: 'Pizza Equal Sharing & Fractions',
      videoUrl: '/media/secondary/module-01/lesson-01/main-concept.mp4',
      thumbnailUrl: '',
      duration: 260,
      description_ml: '1/2, 1/4 ഭാഗങ്ങളായി തുല്യമായി മുറിക്കുന്നതിന്റെ പ്രാക്ടിക്കൽ ഡെമോ.',
      description_en: 'Practical demonstration of dividing pizza into equal halves and quarters.'
    }
  ],
  'vocational-m06-l01': [
    {
      id: 'v-voc-06-01',
      title_ml: 'പേപ്പർ ബാഗ് നിർമ്മാണം',
      title_en: 'Eco Paper Bag Step-by-Step Workshop',
      videoUrl: '/media/vocational/module-06/lesson-01/main-concept.mp4',
      thumbnailUrl: '',
      duration: 300,
      description_ml: 'പേപ്പർ മടക്കലും പശ തേക്കലും കൈപ്പിടി ഘടിപ്പിക്കലും ക്രമമായി കാണിക്കുന്നു.',
      description_en: 'Step-by-step vocational demonstration of crafting sturdy paper bags.'
    }
  ]
};

export const getVideosForLesson = (lessonId) => {
  return VIDEO_CATALOG[lessonId] || [];
};

export default VIDEO_CATALOG;

