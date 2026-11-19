import React, { useState, useEffect } from 'react';
import { Users, CheckSquare, ClipboardPlus, Search, Star } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useLanguage } from '../../contexts/LanguageContext';
import StudentCard from '../../components/cards/StudentCard';
import Modal from '../../components/common/Modal';
import Button from '../../components/common/Button';
import soundEffects from '../../utils/soundSynth';
import { classService } from '../../services/classService';
import { assessmentService } from '../../services/assessmentService';
import { homeworkService } from '../../services/homeworkService';
import { ALL_MODULES } from '../../data/modulesData';

export const TeacherStudents = () => {
  const { user } = useAuth();
  const { t } = useLanguage();

  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedStudent, setSelectedStudent] = useState(null);

  // Modals
  const [assessModalOpen, setAssessModalOpen] = useState(false);
  const [homeworkModalOpen, setHomeworkModalOpen] = useState(false);

  // Assessment Form State
  const [selectedModuleId, setSelectedModuleId] = useState('care-m01');
  const [understandingLevel, setUnderstandingLevel] = useState('independent');
  const [assessmentScore, setAssessmentScore] = useState(10);
  const [teacherNotes, setTeacherNotes] = useState('');

  // Homework Form State
  const [hwModuleId, setHwModuleId] = useState('care-m01');
  const [hwInstructions, setHwInstructions] = useState('');
  const [hwDueDate, setHwDueDate] = useState('');
  const [hwGameCode, setHwGameCode] = useState('picture_match');

  useEffect(() => {
    classService.getTeacherAssignedStudents(user?.id).then(setStudents);
  }, [user]);

  const handleOpenAssess = (student) => {
    setSelectedStudent(student);
    setAssessModalOpen(true);
  };

  const handleOpenHomework = (student) => {
    setSelectedStudent(student);
    setHomeworkModalOpen(true);
  };

  const handleSaveAssessment = async (e) => {
    e.preventDefault();
    const mod = ALL_MODULES.find(m => m.id === selectedModuleId);
    await assessmentService.recordAssessment({
      studentId: selectedStudent.id,
      teacherId: user?.id,
      moduleId: selectedModuleId,
      lessonId: `${selectedModuleId}-l01`,
      understandingLevel,
      score: Number(assessmentScore),
      teacherNotes
    });
    soundEffects.playSuccess();
    setAssessModalOpen(false);
    setTeacherNotes('');
  };

  const handleSaveHomework = async (e) => {
    e.preventDefault();
    const mod = ALL_MODULES.find(m => m.id === hwModuleId);
    await homeworkService.assignHomework({
      teacherId: user?.id || 'teacher-priya-01',
      studentId: selectedStudent.id,
      moduleTitle_ml: mod?.title_ml || 'പാഠം',
      moduleTitle_en: mod?.title_en || 'Module',
      lessonTitle_ml: `${mod?.title_ml} – ഹോംവർക്ക്`,
      lessonTitle_en: `${mod?.title_en} Home Activity`,
      gameCode: hwGameCode,
      instructions_ml: hwInstructions,
      instructions_en: hwInstructions,
      dueDate: hwDueDate
    });
    soundEffects.playSuccess();
    setHomeworkModalOpen(false);
    setHwInstructions('');
  };

  const filtered = students.filter(s =>
    s.fullName.toLowerCase().includes(search.toLowerCase()) ||
    s.studentIdNumber.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-black text-brand-purple uppercase tracking-wider">
            {t('വിദ്യാർത്ഥി മാനേജ്മെന്റ്', 'Student Management')}
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-800">
            {t('അനുവദിച്ച കുട്ടികൾ (Assigned Students)', 'Assigned Students')}
          </h2>
          <p className="text-xs font-bold text-slate-500 mt-1">
            {t('ഓരോ കുട്ടിയെയും വെവ്വേറെ വിലയിരുത്തുക & വ്യക്തിഗത ഹോംവർക്ക് നൽകുക', 'Assess individually and assign personalized homework')}
          </p>
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            placeholder={t('പേര് അല്ലെങ്കിൽ ഐഡി...', 'Search student...')}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs font-bold rounded-2xl border border-purple-200 bg-white"
          />
        </div>
      </div>

      {/* Grid of Student Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {filtered.map((st) => (
          <StudentCard
            key={st.id}
            student={st}
            onAssess={handleOpenAssess}
            onAssignHomework={handleOpenHomework}
          />
        ))}
      </div>

      {/* Modal: Individual Understanding Assessment */}
      <Modal
        isOpen={assessModalOpen}
        onClose={() => setAssessModalOpen(false)}
        title={t(`വ്യക്തിഗത വിലയിരുത്തൽ: ${selectedStudent?.fullName}`, `Assess: ${selectedStudent?.fullName}`)}
        size="md"
      >
        <form onSubmit={handleSaveAssessment} className="space-y-4">
          <div>
            <label className="block text-xs font-black text-slate-700 mb-1">
              {t('പാഠ്യവിഭാഗം തിരഞ്ഞെടുക്കുക (Module)', 'Select Module')}
            </label>
            <select
              value={selectedModuleId}
              onChange={(e) => setSelectedModuleId(e.target.value)}
              className="w-full p-3 rounded-2xl border-2 border-purple-100 font-bold text-sm bg-purple-50/20"
            >
              {ALL_MODULES.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.moduleNumber}. {m.title_ml} ({m.title_en})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-black text-slate-700 mb-1">
              {t('ധാരണാ നിലവാരം (Understanding Level)', 'Understanding Level')}
            </label>
            <select
              value={understandingLevel}
              onChange={(e) => setUnderstandingLevel(e.target.value)}
              className="w-full p-3 rounded-2xl border-2 border-purple-100 font-bold text-sm bg-purple-50/20"
            >
              <option value="independent">{t('സ്വതന്ത്രമായി ചെയ്തു (Independent Understanding)', 'Independent')}</option>
              <option value="with_guidance">{t('ടീച്ചറുടെ സഹായത്തോടെ (With Guidance)', 'With Guidance')}</option>
              <option value="developing">{t('വികസിച്ചു വരുന്നു (Developing)', 'Developing')}</option>
              <option value="needs_practice">{t('കൂടുതൽ പരിശീലനം വേണം (Needs Practice)', 'Needs Practice')}</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-black text-slate-700 mb-1">
              {t('സ്കോർ (Score / 10)', 'Score / 10')}
            </label>
            <input
              type="number"
              min="1"
              max="10"
              value={assessmentScore}
              onChange={(e) => setAssessmentScore(e.target.value)}
              className="w-full p-3 rounded-2xl border-2 border-purple-100 font-bold text-sm bg-purple-50/20"
            />
          </div>

          <div>
            <label className="block text-xs font-black text-slate-700 mb-1">
              {t('അധ്യാപികയുടെ കുറിപ്പ് (Teacher Observation Notes)', 'Observation Notes')}
            </label>
            <textarea
              rows={3}
              required
              value={teacherNotes}
              onChange={(e) => setTeacherNotes(e.target.value)}
              placeholder={t('കുട്ടിയുടെ പ്രതികരണവും പുരോഗതിയും രേഖപ്പെടുത്തുക...', 'Enter detailed observation...')}
              className="w-full p-3 rounded-2xl border-2 border-purple-100 font-bold text-sm bg-purple-50/20"
            />
          </div>

          <div className="flex justify-end gap-3 pt-3">
            <Button variant="ghost" onClick={() => setAssessModalOpen(false)}>
              {t('റദ്ദാക്കുക', 'Cancel')}
            </Button>
            <Button type="submit" variant="purple">
              {t('രേഖപ്പെടുത്തുക (Save Result)', 'Save Assessment')}
            </Button>
          </div>
        </form>
      </Modal>

      {/* Modal: Individual Homework Assignment */}
      <Modal
        isOpen={homeworkModalOpen}
        onClose={() => setHomeworkModalOpen(false)}
        title={t(`വ്യക്തിഗത ഹോംവർക്ക് നൽകുക: ${selectedStudent?.fullName}`, `Assign Individual Homework: ${selectedStudent?.fullName}`)}
        size="md"
      >
        <form onSubmit={handleSaveHomework} className="space-y-4">
          <div className="p-3 rounded-2xl bg-amber-50 border border-amber-200 text-xs font-bold text-amber-900">
            ⚠️ {t('ശ്രദ്ധിക്കുക: വ്യക്തിഗത ഹോംവർക്ക് മാത്രമേ അനുവദിക്കൂ. ഗ്രൂപ്പ് ഹോംവർക്ക് നൽകരുത്.', 'Strict Rule: Group homework is NOT allowed. Assign tailored tasks for this student only.')}
          </div>

          <div>
            <label className="block text-xs font-black text-slate-700 mb-1">
              {t('പാഠ്യവിഭാഗം (Module)', 'Module')}
            </label>
            <select
              value={hwModuleId}
              onChange={(e) => setHwModuleId(e.target.value)}
              className="w-full p-3 rounded-2xl border-2 border-purple-100 font-bold text-sm bg-purple-50/20"
            >
              {ALL_MODULES.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.moduleNumber}. {m.title_ml} ({m.title_en})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-black text-slate-700 mb-1">
              {t('വീട്ടുപരിശീലന ഗെയിം (Practice Game)', 'Practice Game')}
            </label>
            <select
              value={hwGameCode}
              onChange={(e) => setHwGameCode(e.target.value)}
              className="w-full p-3 rounded-2xl border-2 border-purple-100 font-bold text-sm bg-purple-50/20"
            >
              <option value="picture_match">ചിത്രവും നിഴലും പൊരുത്തപ്പെടുത്തൽ (Picture Match)</option>
              <option value="number_train">നമ്പർ ട്രെയിൻ അഡ്വഞ്ചർ (Number Train)</option>
              <option value="fruit_basket">പഴക്കൂട കളി (Fruit Basket)</option>
              <option value="healthy_food_sort">നല്ല ഭക്ഷണങ്ങൾ തരംതിരിക്കാം (Healthy Food Sort)</option>
              <option value="memory_cards">ഓർമ്മച്ചെപ്പ് (Memory Cards)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-black text-slate-700 mb-1">
              {t('രക്ഷിതാക്കൾക്കുള്ള ലളിതമായ നിർദ്ദേശങ്ങൾ (Parent/Child Instructions)', 'Instructions')}
            </label>
            <textarea
              rows={3}
              required
              value={hwInstructions}
              onChange={(e) => setHwInstructions(e.target.value)}
              placeholder={t('വീട്ടിൽ അമ്മയോടൊപ്പം ചെയ്യേണ്ട ലളിതമായ നിർദ്ദേശങ്ങൾ മലയാളത്തിൽ എഴുതുക...', 'Enter simple instructions...')}
              className="w-full p-3 rounded-2xl border-2 border-purple-100 font-bold text-sm bg-purple-50/20"
            />
          </div>

          <div>
            <label className="block text-xs font-black text-slate-700 mb-1">
              {t('പൂർത്തിയാക്കേണ്ട തീയതി (Due Date)', 'Due Date')}
            </label>
            <input
              type="date"
              required
              value={hwDueDate}
              onChange={(e) => setHwDueDate(e.target.value)}
              className="w-full p-3 rounded-2xl border-2 border-purple-100 font-bold text-sm bg-purple-50/20"
            />
          </div>

          <div className="flex justify-end gap-3 pt-3">
            <Button variant="ghost" onClick={() => setHomeworkModalOpen(false)}>
              {t('റദ്ദാക്കുക', 'Cancel')}
            </Button>
            <Button type="submit" variant="purple">
              {t('ഹോംവർക്ക് നൽകുക (Assign)', 'Assign Individual HW')}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default TeacherStudents;

