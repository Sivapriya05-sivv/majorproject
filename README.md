# majorproject

# 🦉 ADHD LEARNING WORLD (പ്രത്യേക വിദ്യാഭ്യാസ ലോകം)
### Complete Full-Stack Special Education Platform for Children with ADHD & Diverse Learning Needs

---

## 🌟 Overview
**ADHD Learning World** is an inclusive, accessible educational web application engineered specifically for children with Attention Deficit Hyperactivity Disorder (ADHD) and special learning needs in Kerala, India. 

Guided by **Ollie**, a wise and friendly owl mascot, the platform provides tailored multi-sensory experiences across **Teacher**, **Student**, and **Parent** roles, featuring all **36 exact curriculum modules** across four learning groups, bilingual Malayalam & English narration, 15 interactive playable games, dedicated Classroom TV mode, and robust Supabase data isolation with Row Level Security (RLS).

---

## 🎨 Pedagogical Design & Sensory Architecture
- **Color Palette**: Calming pastel lavender (`#EDE9FE`), purple (`#DDD6FE`), sky blue (`#E0F2FE`), mint green (`#D1FAE5`), warm yellow (`#FEF08A`), and soft rose pink (`#FCE7F3`).
- **Typography & Malayalam Support**: Bilingual typography using Google Manjari and Gayathri alongside Quicksand and Nunito for optimal legibility.
- **Sensory Accessibility**:
  - One-click **Reduced Motion** toggle for sensory sensitivity.
  - **High Contrast Mode** for visual clarity.
  - Zero-latency synthesized audio feedback chimes via browser Web Audio API (no external mp3 dependency required).
  - Speech synthesis narration in Malayalam (`ml-IN`) and English (`en-US`).
  - Large touch targets (min 48px to 72px) suited for motor-control differences and interactive whiteboard screens.
- **No Stressful Public Rankings**: Rewards are framed with positive stars, achievement badges, and a personal **Progress Garden** where plants bloom as milestones are achieved.

---

## 📚 4 Learning Groups & All 36 Exact Modules

### 1. Care Group (കെയർ ഗ്രൂപ്പ് – 11 Modules)
*Focus: Self-identification, sensory learning, object recognition, colours, shapes, fine motor skills, drawing, music and everyday activities.*
1. **എനിക്കും എന്റെ പേര് അറിയാം** (I Also Know My Name)
2. **കിണ്ണം നിറയെ** (A Full Bowl / Plate Full)
3. **മണ്ണാകാം ചൂടാം** (Clay & Warmth Exploration)
4. **അനുവിന്റെ സ്വന്തം** (Anu's Very Own)
5. **ആഹാ, എന്താ ഭംഗി** (Aha, How Beautiful!)
6. **വരയ്ക്കാം കുറിക്കാം** (Let's Draw and Scribble)
7. **എനിക്കും കഴിയും, മണ്ണും മനുഷ്യനും** (I Can Too: Earth and Humankind)
8. **തപ്പുകൊട്ടം, താളംകൊട്ടം** (Clap Clap, Tap the Rhythm)
9. **തിരശ്ശീല** (The Curtain / Dramatic Play)
10. **കുഞ്ഞിക്കൈകൾ** (Little Hands)
11. **റിംഗ് മാസ്റ്റർ** (Ring Master)

### 2. Primary Group (പ്രൈമറി – 7 Modules)
*Focus: Letters, numbers, counting, shapes, colours, surroundings, hygiene, family, friends, safety and creativity.*
1. **അക്ഷരലോകം** (World of Letters)
2. **സംഖ്യകളും എണ്ണലും** (Numbers and Counting)
3. **ചുറ്റുമുള്ള ലോകം** (The World Around Us)
4. **എന്റെ ശുചിത്വം** (My Hygiene)
5. **കുടുംബവും കൂട്ടുകാരും** (Family and Friends)
6. **സുരക്ഷിതമായ ജീവിതം** (Safe Life)
7. **കളിയും സർഗാത്മകതയും** (Play and Creativity)

### 3. Secondary Group (സെക്കൻഡറി – 9 Modules)
*Focus: Practical mathematics, fractions, personal hygiene, disease prevention, nutrition, dining manners, teamwork, physical activity and creativity.*
1. **അടിസ്ഥാന ഗണിതം – ഭിന്നസംഖ്യകൾ** (Basic Math – Fractions)
2. **വ്യക്തിശുചിത്വം** (Personal Hygiene)
3. **രോഗപ്രതിരോധവും സുരക്ഷയും** (Disease Prevention and Safety)
4. **പോഷകാഹാരം** (Nutrition and Healthy Food)
5. **സാമൂഹിക ഇടപെടലും ഭക്ഷണ മര്യാദകളും** (Social Interaction & Dining Manners)
6. **കായിക വികസനവും ടീം വർക്കും** (Physical Development & Teamwork)
7. **സാമൂഹിക അവബോധം – ഒരാളാണ് എല്ലാവരും** (Social Awareness – Everyone is One)
8. **ശാരീരിക ആരോഗ്യം – സൂംബാ ഡാൻസ്** (Physical Health – Zumba Dance)
9. **കലയും സർഗ്ഗാത്മകതയും** (Art and Creativity)

### 4. Vocational Group (വൊക്കേഷണൽ – 9 Modules)
*Focus: Practical life skills, communication, leadership, occupational awareness, work skills, creativity, social participation and independence.*
1. **നാട്ടിലെ ഉത്സവങ്ങൾ** (Local Festivals)
2. **കൂട്ടം കൂട്ടാം** (Let's Gather and Socialize)
3. **മല കയറാം** (Let's Climb the Hill)
4. **Let's Be a Leader** (Let's Be a Leader)
5. **ആരോഗ്യം നേടാം** (Gain Health)
6. **തൊഴിൽ ചെയ്യാം** (Work and Vocations)
7. **അഭിനയ കലരി** (Acting and Expression Workshop)
8. **കളിച്ച് വളരാം** (Grow Through Play)
9. **ഹലോ കളി** (The Hello Game & Social Greetings)

---

## 🔄 The 4-Phase Critical Lesson Flow
Every lesson strictly adheres to a scientifically proven four-phase pedagogical structure:
1. **Phase 1: Visual Learning**:
   - Ollie the Owl intro narration in Malayalam.
   - Picture-based explanation cards and demonstrations.
   - Google Veo 3 Video Player area with controls and animated placeholder fallbacks.
2. **Phase 2: Common Classroom Activity**:
   - Teacher-led shared classroom activity (turn-taking, picture identification, naming, observation).
   - Designed for large interactive displays / Classroom TV.
3. **Phase 3: Individual Understanding Check**:
   - Separate individual evaluation testing independent student comprehension.
   - Group participation does not substitute for individual understanding.
   - Results saved directly into database and teacher records.
4. **Phase 4: Lesson-Specific Playable Game**:
   - Interactive, tap-friendly game tailored to the lesson.
   - Adjustable difficulty, sound cues, hint triggers, score tracking, and instant praise.

---

## 🎮 15 Playable Educational Games
1. **Picture Match** (`picture_match`): Match objects with identical cards or silhouettes.
2. **Balloon Pop** (`balloon_pop`): Pop floating balloons with target Malayalam letters.
3. **Fruit Basket** (`fruit_basket`): Catch healthy fruits into the basket and avoid obstacles.
4. **Animal Sounds** (`animal_sounds`): Listen to animal sounds/phonics and tap the matching animal.
5. **Healthy Food Sort** (`healthy_food_sort`): Sort nutritious foods vs junk foods.
6. **Smart Workshop** (`smart_workshop`): Step-by-step vocational training (paper bag making).
7. **Safe or Unsafe** (`safe_unsafe`): Classify everyday situations and boundaries (Green Safe vs Red Unsafe).
8. **Memory Cards** (`memory_cards`): Flip cards to find matching pairs and build visual working memory.
9. **Colour Hunt** (`colour_hunt`): Tap items that match the requested color.
10. **Number Train** (`number_train`): Assemble numbered wagons in sequential order (1 to 5).
11. **Shape Detective** (`shape_detective`): Identify real-world items matching geometric shapes.
12. **Family Match** (`family_match`): Match family members with loving everyday responsibilities.
13. **Hygiene Routine** (`hygiene_routine`): Sequence morning-to-night self-care steps.
14. **Fraction Pizza** (`fraction_pizza`): Slice and serve 1/2 and 1/4 portions to friendly customers.
15. **Team Challenge** (`team_challenge`): Collaborative classroom relay supporting turn-taking.

---

## 📺 Classroom TV Mode
- Dedicated full-screen projection layout designed for classrooms and interactive TVs.
- Teacher-controlled turn-taking roster showing which child's turn is active.
- Confetti celebration fanfares for group triumphs.
- High visibility text and enlarged touch targets.

---

## 🔒 Authentication & Role Security
- **Teacher Authentication**: `School ID` + `Email` + `Password`. Authorized strictly by the institution; self-escalation is blocked.
- **Student Authentication**: `School ID` + `Student ID` + `Password`. Designed for young children who do not possess email accounts.
- **Parent Portal**: Separate secure login and signup with mandatory child Student ID linking. Parents have view-only access to their child's permitted data and cannot alter school assessments.
- **Row Level Security (RLS)**: Enforced across PostgreSQL tables.

### 🧪 Pre-Configured Sample Accounts for Testing
- **School ID**: `SCH001` (Kerala Inclusive Model School)
- **Teacher**:
  - Email: `teacher@school.edu`
  - Password: `password123`
- **Student**:
  - Student ID: `STU101` (Aarav Krishna - Care Group)
  - Password: `student123`
  - Other IDs: `STU102` (Diya - Primary), `STU103` (Advaith - Secondary), `STU104` (Fathima - Vocational)
- **Parent**:
  - Email: `parent@gmail.com`
  - Password: `parent123`
  - Linked Student: `STU101` (Aarav Krishna)

---

## 🛠️ Installation & Local Setup

### 1. Prerequisites
- Node.js (v18 or higher recommended, verified on Node v24)
- npm (v9 or higher)

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Variables
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```
Populate your Supabase URL and anon key:
```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```
> **Note**: If Supabase credentials are not yet configured, the platform seamlessly runs in local offline development mode with complete persistence using `localStorage` and all pre-seeded curriculum modules and sample users.

### 4. Supabase Database Execution
Run the following SQL scripts in your Supabase SQL Editor:
1. `supabase/schema.sql` (Creates all 20 relational tables, foreign keys, and indexes)
2. `supabase/rls_policies.sql` (Applies strict Row Level Security policies)
3. `supabase/seed.sql` (Seeds the 4 groups, all 36 exact curriculum modules, and badges)

### 5. Veo 3 Video Placement
Place MP4 videos generated by Google Veo 3 into:
```
public/media/
├── care-group/module-01/lesson-01/main-concept.mp4
├── primary/module-01/lesson-01/main-concept.mp4
├── secondary/module-01/lesson-01/main-concept.mp4
└── vocational/module-01/lesson-01/main-concept.mp4
```
If a video is not yet placed, the app renders a friendly Ollie animated placeholder with playback controls and Malayalam narration.

### 6. Development Server
```bash
npm run dev
```
Open `http://localhost:5173` in your browser.

### 7. Production Build
```bash
npm run build
```
Verify the production build with:
```bash
npm run preview
```

---

## 📦 Downloadable Full Project ZIP
A downloadable ZIP package containing the complete source code, React components, games, database migrations, configuration, and documentation is generated and available at the root of the project: `adhd-learning-world.zip`.

---

## 📄 License
MIT License. Developed with care and devotion for inclusive education in Kerala.
