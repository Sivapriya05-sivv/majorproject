-- ==============================================================================
-- ADHD LEARNING WORLD - SEED DATA
-- 4 Groups, All 36 Exact Curriculum Modules, Initial Lessons, Activities & Games
-- ==============================================================================

-- 1. SEED DEFAULT SCHOOL
INSERT INTO public.schools (id, school_code, name, address, phone, email)
VALUES 
    ('11111111-1111-1111-1111-111111111111', 'SCH001', 'Kerala Inclusive Model School', 'Thiruvananthapuram, Kerala', '+91 471 2345678', 'contact@keralasped.edu')
ON CONFLICT (school_code) DO NOTHING;

-- 2. SEED THE 4 LEARNING GROUPS
INSERT INTO public.learning_groups (id, code, name_en, name_ml, description_en, description_ml, icon_name, theme_color, display_order)
VALUES
    ('22222222-2222-2222-2222-222222222201', 'care', 'Care Group', 'കെയർ ഗ്രൂപ്പ്', 'Focus on self-identification, sensory learning, object recognition, colours, shapes, fine motor skills and everyday activities', 'സ്വയം തിരിച്ചറിയൽ, ഇന്ദ്രിയ പഠനം, നിറങ്ങൾ, ആകൃതികൾ, കൊച്ചു വിരലുകളുടെ ചലനശേഷി എന്നിവയിൽ ശ്രദ്ധ കേന്ദ്രീകരിക്കുന്നു.', 'Heart', 'pink', 1),
    ('22222222-2222-2222-2222-222222222202', 'primary', 'Primary', 'പ്രൈമറി', 'Focus on letters, numbers, counting, surroundings, hygiene, family, friends, safety and creativity', 'അക്ഷരങ്ങൾ, സംഖ്യകൾ, ചുറ്റുമുള്ള ലോകം, ശുചിത്വം, സുരക്ഷ, കുടുംബം എന്നിവ പഠിക്കുന്നു.', 'Sparkles', 'sky', 2),
    ('22222222-2222-2222-2222-222222222203', 'secondary', 'Secondary', 'സെക്കൻഡറി', 'Focus on practical math, fractions, hygiene, safety, nutrition, dining manners, teamwork, physical activity and creativity', 'പ്രായോഗിക ഗണിതം, ഭിന്നസംഖ്യകൾ, വ്യക്തിശുചിത്വം, പോഷകാഹാരം, സാമൂഹിക മര്യാദകൾ എന്നിവ പരിശീലിക്കുന്നു.', 'BookOpen', 'purple', 3),
    ('22222222-2222-2222-2222-222222222204', 'vocational', 'Vocational', 'വൊക്കേഷണൽ', 'Focus on practical life skills, communication, leadership, occupational awareness, work skills and independence', 'പ്രായോഗിക ജീവിത നൈപുണ്യങ്ങൾ, തൊഴിൽ അവബോധം, നേതൃത്വം, സ്വാതന്ത്ര്യം എന്നിവ വളർത്തുന്നു.', 'Briefcase', 'mint', 4)
ON CONFLICT (code) DO NOTHING;

-- 3. SEED ALL 36 EXACT TEXTBOOK MODULES

-- CARE GROUP (11 Modules)
INSERT INTO public.modules (group_id, module_number, title_ml, title_en, description_ml, description_en, icon_name, theme_color, focus_areas)
VALUES
    ('22222222-2222-2222-2222-222222222201', 1, 'എനിക്കും എന്റെ പേര് അറിയാം', 'I Also Know My Name', 'സ്വന്തം പേര്, ഫോട്ടോ, ഐഡന്റിറ്റി തിരിച്ചറിയൽ പരിശീലനം', 'Self-identification, name response, recognising own photo and belongings', 'UserCheck', 'purple', ARRAY['Self-Identity', 'Name Recognition', 'Auditory Focus']),
    ('22222222-2222-2222-2222-222222222201', 2, 'കിണ്ണം നിറയെ', 'A Full Bowl', 'ഭക്ഷണ പാത്രങ്ങളും പഴങ്ങളും തിരിച്ചറിയൽ, കൈകൊണ്ട് ഭക്ഷണം കഴിക്കൽ', 'Healthy eating, plate recognition, food items and self-feeding habits', 'Utensils', 'yellow', ARRAY['Food Habits', 'Fine Motor', 'Self-Feeding']),
    ('22222222-2222-2222-2222-222222222201', 3, 'മണ്ണാകാം ചൂടാം', 'Clay & Warmth Exploration', 'മണ്ണും കളിമണ്ണും സ്പർശിച്ചുള്ള ഇന്ദ്രിയാനുഭവങ്ങൾ, ചൂടും തണുപ്പും തിരിച്ചറിയൽ', 'Tactile sensory stimulation, texture exploration, warm and cold concepts', 'Flame', 'peach', ARRAY['Sensory Stimulation', 'Tactile Processing', 'Warm/Cold']),
    ('22222222-2222-2222-2222-222222222201', 4, 'അനുവിന്റെ സ്വന്തം', 'Anu''s Very Own', 'കുടുംബാംഗങ്ങളെയും സ്വന്തം വീട്ടുപകരണങ്ങളെയും തിരിച്ചറിയൽ', 'Recognising family members, personal belongings and safe space', 'Home', 'sky', ARRAY['Family Awareness', 'Belongings', 'Emotional Bonding']),
    ('22222222-2222-2222-2222-222222222201', 5, 'ആഹാ, എന്താ ഭംഗി', 'Aha, How Beautiful!', 'നിറങ്ങളും പൂക്കളും ചിത്രശലഭങ്ങളും നിരീക്ഷിക്കൽ', 'Visual discrimination of colours, flowers, butterflies and nature', 'Palette', 'pink', ARRAY['Colour Recognition', 'Visual Attention', 'Nature Observation']),
    ('22222222-2222-2222-2222-222222222201', 6, 'വരയ്ക്കാം കുറിക്കാം', 'Let''s Draw and Scribble', 'വരയ്ക്കലും ക്രയോൺ ഉപയോഗിച്ചുള്ള ആദ്യ ചുവടുകളും', 'Grip strength, crayon scribbling, circular motions and free-drawing', 'Pencil', 'mint', ARRAY['Pre-Writing', 'Pencil Grip', 'Eye-Hand Coordination']),
    ('22222222-2222-2222-2222-222222222201', 7, 'എനിക്കും കഴിയും, മണ്ണും മനുഷ്യനും', 'I Can Too: Earth and Humankind', 'എളിയ ജോലികൾ സ്വയം ചെയ്യൽ, മണ്ണിൽ ചെടി നടീൽ', 'Simple daily independence, planting seeds, respecting nature', 'Smile', 'yellow', ARRAY['Independence', 'Nature Interaction', 'Simple Tasks']),
    ('22222222-2222-2222-2222-222222222201', 8, 'തപ്പുകൊട്ടം, താളംകൊട്ടം', 'Clap Clap, Tap the Rhythm', 'സംഗീതം, താളം, കൈയടിയിലൂടെ ചലന നിയന്ത്രണം', 'Auditory rhythm, hand-clapping games, music-based auditory focus', 'Music', 'purple', ARRAY['Rhythm', 'Auditory Attention', 'Bilateral Coordination']),
    ('22222222-2222-2222-2222-222222222201', 9, 'തിരശ്ശീല', 'The Curtain / Dramatic Play', 'പാവനാടകം, എക്സ്പ്രഷനുകൾ, അനുകരണ കളികൾ', 'Puppet shows, emotional expressions, imitation and social smiling', 'Drama', 'rose', ARRAY['Emotional Expression', 'Imitation', 'Non-Verbal Comm']),
    ('22222222-2222-2222-2222-222222222201', 10, 'കുഞ്ഞിക്കൈകൾ', 'Little Hands', 'വിരലുകളുടെയും കൈപ്പത്തികളുടെയും മൃദുവായ വ്യായാമങ്ങൾ', 'Fine motor finger gym, pinching, threading and squeezing activities', 'Hand', 'sky', ARRAY['Fine Motor', 'Pincer Grasp', 'Dexterity']),
    ('22222222-2222-2222-2222-222222222201', 11, 'റിംഗ് മാസ്റ്റർ', 'Ring Master', 'റിംഗ് അടുക്കലും വലുപ്പ ക്രമീകരണവും', 'Stacking rings by size, colour matching and hand-eye coordination', 'Disc', 'yellow', ARRAY['Spatial Reasoning', 'Size Discrimination', 'Stacking'])
ON CONFLICT DO NOTHING;

-- PRIMARY GROUP (7 Modules)
INSERT INTO public.modules (group_id, module_number, title_ml, title_en, description_ml, description_en, icon_name, theme_color, focus_areas)
VALUES
    ('22222222-2222-2222-2222-222222222202', 1, 'അക്ഷരലോകം', 'World of Letters', 'മലയാളം അക്ഷരങ്ങളുടെ ശബ്ദവും രൂപവും തിരിച്ചറിയൽ', 'Malayalam alphabet phonics, letter tracing and word association', 'BookOpen', 'purple', ARRAY['Malayalam Letters', 'Phonics', 'Visual Discrimination']),
    ('22222222-2222-2222-2222-222222222202', 2, 'സംഖ്യകളും എണ്ണലും', 'Numbers and Counting', '1 മുതൽ 10 വരെയുള്ള സംഖ്യകൾ എണ്ണലും തിരിച്ചറിയലും', 'Number counting 1 to 10 with interactive visual counters and objects', 'Hash', 'sky', ARRAY['Number Sense', 'Counting Objects', 'Basic Math']),
    ('22222222-2222-2222-2222-222222222202', 3, 'ചുറ്റുമുള്ള ലോകം', 'The World Around Us', 'മൃഗങ്ങൾ, പക്ഷികൾ, വാഹനങ്ങൾ, പ്രകൃതി എന്നിവ കണ്ടെത്തൽ', 'Animals, birds, common vehicles and environmental objects', 'Compass', 'mint', ARRAY['Environment', 'Animals & Birds', 'Vehicles']),
    ('22222222-2222-2222-2222-222222222202', 4, 'എന്റെ ശുചിത്വം', 'My Hygiene', 'പല്ലുതേപ്പ്, കുളി, കൈകഴുകൽ ദിനചര്യകൾ', 'Daily personal hygiene: brushing, handwashing, bath routine and neatness', 'Sparkles', 'pink', ARRAY['Handwashing Steps', 'Brushing Teeth', 'Clean Habits']),
    ('22222222-2222-2222-2222-222222222202', 5, 'കുടുംബവും കൂട്ടുകാരും', 'Family and Friends', 'അമ്മ, അച്ഛൻ, സഹോദരങ്ങൾ, സുഹൃത്തുക്കളുമായി പങ്കിടൽ', 'Understanding family roles, sharing with peers and social greetings', 'Users', 'yellow', ARRAY['Family Tree', 'Sharing', 'Kindness']),
    ('22222222-2222-2222-2222-222222222202', 6, 'സുരക്ഷിതമായ ജീവിതം', 'Safe Life', 'ട്രാഫിക് ലൈറ്റ്, സുരക്ഷിതമായ സ്പർശനം, വീട്ടിലെ അപായങ്ങൾ', 'Good touch/bad touch, traffic signals and avoiding domestic dangers', 'ShieldCheck', 'rose', ARRAY['Body Safety', 'Traffic Signals', 'Domestic Safety']),
    ('22222222-2222-2222-2222-222222222202', 7, 'കളിയും സർഗാത്മകതയും', 'Play and Creativity', 'കളികളിലൂടെയുള്ള സഹകരണം, കരകൗശല നിർമ്മാണം', 'Structured social play, clay modelling, building blocks and crafts', 'Puzzle', 'peach', ARRAY['Collaborative Play', 'Crafts', 'Creativity'])
ON CONFLICT DO NOTHING;

-- SECONDARY GROUP (9 Modules)
INSERT INTO public.modules (group_id, module_number, title_ml, title_en, description_ml, description_en, icon_name, theme_color, focus_areas)
VALUES
    ('22222222-2222-2222-2222-222222222203', 1, 'അടിസ്ഥാന ഗണിതം – ഭിന്നസംഖ്യകൾ', 'Basic Math – Fractions', 'പിസ്സ, ആപ്പിൾ പങ്കുവെക്കലിലൂടെ ഭിന്നസംഖ്യകൾ (1/2, 1/4, 3/4) പഠിക്കാം', 'Visual fraction concepts using pizza slices, circles and real life items', 'PieChart', 'purple', ARRAY['Fractions (1/2, 1/4)', 'Equal Sharing', 'Visual Math']),
    ('22222222-2222-2222-2222-222222222203', 2, 'വ്യക്തിശുചിത്വം', 'Personal Hygiene', 'കൗമാര ശുചിത്വം, വസ്ത്രധാരണം, വൃത്തിയുള്ള അന്തരീക്ഷം', 'Adolescent grooming, nail trimming, neat attire and laundry care', 'HeartPulse', 'sky', ARRAY['Self-Grooming', 'Clean Clothing', 'Adolescent Care']),
    ('22222222-2222-2222-2222-222222222203', 3, 'രോഗപ്രതിരോധവും സുരക്ഷയും', 'Disease Prevention and Safety', 'മാസ്ക്, ശുദ്ധജലം, പ്രാഥമിക ചികിത്സ, ഡോക്ടറെ സന്ദർശിക്കൽ', 'Germs, clean water, first aid awareness and medication safety', 'ShieldAlert', 'rose', ARRAY['First Aid', 'Germ Awareness', 'Doctor Interaction']),
    ('22222222-2222-2222-2222-222222222203', 4, 'പോഷകാഹാരം', 'Nutrition and Healthy Food', 'സമീകൃതാഹാരം, ജങ്ക് ഫുഡ് ഒഴിവാക്കൽ, പോഷക ഗുണങ്ങൾ', 'Balanced diet, vegetables, fruit benefits and avoiding junk food', 'Apple', 'mint', ARRAY['Balanced Plate', 'Vitamins', 'Hydration']),
    ('22222222-2222-2222-2222-222222222203', 5, 'സാമൂഹിക ഇടപെടലും ഭക്ഷണ മര്യാദകളും', 'Social Interaction & Dining Manners', 'മേശ മര്യാദകൾ, നന്ദി പറയൽ, പൊതുസ്ഥലങ്ങളിലെ പെരുമാറ്റം', 'Dining etiquette, table setting, using polite words and restaurant visits', 'Coffee', 'yellow', ARRAY['Table Manners', 'Polite Expressions', 'Social Etiquette']),
    ('22222222-2222-2222-2222-222222222203', 6, 'കായിക വികസനവും ടീം വർക്കും', 'Physical Development & Teamwork', 'കായിക വിനോദങ്ങൾ, റിലേ, കൂട്ടായ്മയുടെ ശക്തി', 'Team sports, simple obstacle courses, passing the ball and cheering', 'Trophy', 'peach', ARRAY['Team Sports', 'Gross Motor', 'Turn-Taking']),
    ('22222222-2222-2222-2222-222222222203', 7, 'സാമൂഹിക അവബോധം – ഒരാളാണ് എല്ലാവരും', 'Social Awareness – Everyone is One', 'സഹാനുഭൂതി, പരസ്പര ബഹുമാനം, ഭിന്നശേഷി സൗഹൃദ ചിന്തകൾ', 'Empathy, inclusive mindset, helping elders and treating everyone fairly', 'HeartHandshake', 'purple', ARRAY['Empathy', 'Inclusion', 'Mutual Respect']),
    ('22222222-2222-2222-2222-222222222203', 8, 'ശാരീരിക ആരോഗ്യം – സൂംബാ ഡാൻസ്', 'Physical Health – Zumba Dance', 'സംഗീതത്തോടൊപ്പം നൃത്തച്ചുവടുകൾ, മനസ്സിനും ശരീരത്തിനും ഉന്മേഷം', 'Fun energetic rhythmic moves, cardio exercise and stress release', 'Activity', 'pink', ARRAY['Zumba Exercise', 'Rhythm Coordination', 'Endurance']),
    ('22222222-2222-2222-2222-222222222203', 9, 'കലയും സർഗ്ഗാത്മകതയും', 'Art and Creativity', 'കൊളാഷ് വർക്ക്, പേപ്പർ ക്രാഫ്റ്റ്, കളർ മിക്സിംഗ്', 'Paper crafting, collage creation, colour mixing and aesthetic joy', 'Paintbrush', 'sky', ARRAY['Paper Crafts', 'Collage', 'Visual Expression'])
ON CONFLICT DO NOTHING;

-- VOCATIONAL GROUP (9 Modules)
INSERT INTO public.modules (group_id, module_number, title_ml, title_en, description_ml, description_en, icon_name, theme_color, focus_areas)
VALUES
    ('22222222-2222-2222-2222-222222222204', 1, 'നാട്ടിലെ ഉത്സവങ്ങൾ', 'Local Festivals', 'ഓണം, വിഷു, പെരുന്നാൾ, ക്രിസ്മസ് ആഘോഷങ്ങളും പാരമ്പര്യവും', 'Cultural festivals, traditional dressing, festive sweets and communal unity', 'PartyPopper', 'yellow', ARRAY['Cultural Heritage', 'Celebration Etiquette', 'Traditions']),
    ('22222222-2222-2222-2222-222222222204', 2, 'കൂട്ടം കൂട്ടാം', 'Let''s Gather and Socialize', 'സമൂഹത്തിൽ കൂടിച്ചേരൽ, ഗ്രൂപ്പ് ചർച്ചകൾ, ചിട്ടയായ അവതരണം', 'Group socialising, joining peer discussions and community awareness', 'UsersCheck', 'mint', ARRAY['Group Activities', 'Communication', 'Civic Etiquette']),
    ('22222222-2222-2222-2222-222222222204', 3, 'മല കയറാം', 'Let''s Climb the Hill', 'പ്രതിസന്ധികളെ തരണം ചെയ്യൽ, ലക്ഷ്യബോധം, നിശ്ചയദാർഢ്യം', 'Resilience training, goal-setting step-by-step and nature trekking', 'Mountain', 'sky', ARRAY['Resilience', 'Goal Setting', 'Determination']),
    ('22222222-2222-2222-2222-222222222204', 4, 'Let''s Be a Leader', 'Let''s Be a Leader', 'ഉത്തരവാദിത്തങ്ങൾ ഏറ്റെടുക്കൽ, സഹായഹസ്തം നൽകൽ', 'Taking simple responsibilities, leading a small activity and helping peers', 'Award', 'purple', ARRAY['Leadership', 'Responsibility', 'Decision Making']),
    ('22222222-2222-2222-2222-222222222204', 5, 'ആരോഗ്യം നേടാം', 'Gain Health', 'യോഗ, പ്രാണായാമം, ഉറക്കം, മാനസിക ഉന്മേഷം', 'Yoga, breathing exercises, proper sleep schedule and mental wellness', 'SmilePlus', 'rose', ARRAY['Yoga & Breathing', 'Sleep Routine', 'Mental Wellness']),
    ('22222222-2222-2222-2222-222222222204', 6, 'തൊഴിൽ ചെയ്യാം', 'Work and Vocations', 'ചെറുകിട തൊഴിൽ പരിശീലനം, കവറുകൾ ഉണ്ടാക്കൽ, കമ്പ്യൂട്ടർ അടിസ്ഥാനം', 'Paper bag making, file binding, digital data entry and vocational habits', 'Briefcase', 'peach', ARRAY['Paper Bag Making', 'Computer Basics', 'Work Routine']),
    ('22222222-2222-2222-2222-222222222204', 7, 'അഭിനയ കലരി', 'Acting and Expression Workshop', 'റോൾ പ്ലേ, പബ്ലിക് സ്പീക്കിംഗ്, ആത്മവിശ്വാസം', 'Role playing daily interactions (shopkeeper, bus conductor), dialogue', 'Film', 'pink', ARRAY['Role Play', 'Confidence', 'Body Language']),
    ('22222222-2222-2222-2222-222222222204', 8, 'കളിച്ച് വളരാം', 'Grow Through Play', 'തന്ത്രപരമായ ബോർഡ് ഗെയിമുകൾ, നിയമങ്ങൾ പാലിക്കൽ', 'Strategic board games, following rules, accepting win/loss gracefully', 'Gamepad2', 'mint', ARRAY['Sportsmanship', 'Rule Adherence', 'Emotional Regulation']),
    ('22222222-2222-2222-2222-222222222204', 9, 'ഹലോ കളി', 'The Hello Game & Social Greetings', 'ഫോൺ സംഭാഷണം, അഭിസംബോധനകൾ, ഇൻറർവ്യൂ മര്യാദകൾ', 'Telephone greetings, answering questions politely and formal introductions', 'PhoneCall', 'sky', ARRAY['Telephone Manners', 'Social Greetings', 'Job Interview Basics'])
ON CONFLICT DO NOTHING;

-- 4. SEED SAMPLE BADGES
INSERT INTO public.badges (code, title_ml, title_en, description_ml, description_en, icon_name, badge_color, requirement_type, threshold)
VALUES
    ('STARTER', 'ആദ്യ ചുവട്', 'First Step', 'ആദ്യ പാഠം വിജയകരമായി പൂർത്തിയാക്കി!', 'Completed the very first lesson!', 'Sparkles', 'yellow', 'lessons_completed', 1),
    ('STAR_COLLECTOR', 'നക്ഷത്ര കൂട്ടുകാരൻ', 'Star Collector', '10 നക്ഷത്രങ്ങൾ സ്വന്തമാക്കി!', 'Earned 10 learning stars!', 'Star', 'purple', 'total_stars', 10),
    ('GAME_CHAMPION', 'ഗെയിം ചാമ്പ്യൻ', 'Game Champion', '5 വ്യത്യസ്ത കളികൾ കളിച്ചു!', 'Successfully completed 5 learning games!', 'Trophy', 'mint', 'games_completed', 5),
    ('SUPER_HELPER', 'നല്ല സഹായി', 'Super Helper', 'ക്ലാസ്സ്റൂം പ്രവർത്തനങ്ങളിൽ മുന്നിൽ നിന്നു!', 'Active and helpful classroom participation!', 'Heart', 'pink', 'classroom_activities', 3),
    ('GARDEN_BLOOM', 'പൂന്തോട്ടം ചിരിക്കുന്നു', 'Garden Bloomer', 'പ്രോഗ്രസ്സ് ഗാർഡനിൽ 3 ചെടികൾ വളർത്തി!', 'Nurtured 3 flowers in the progress garden!', 'Flower2', 'sky', 'garden_plants', 3)
ON CONFLICT (code) DO NOTHING;

