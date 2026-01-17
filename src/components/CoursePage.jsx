import { useState, useEffect } from 'react';
import { AppNav } from './AppNav';
import { ChevronRight, Play, CheckCircle, Lock, Star, Clock, BookOpen } from 'lucide-react';
import api from '../lib/api';
import logger from '../lib/logger';
import { useNotification } from './NotificationProvider';
import { useGame } from '../contexts/GameContext';

export function CoursePage({ onNavigate, onLogout }) {
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [selectedChapter, setSelectedChapter] = useState(null);
  const [animateCards, setAnimateCards] = useState(false);
  const [subjects, setSubjects] = useState([]);
  const [chapters, setChapters] = useState({});
  const [lessonsByChapter, setLessonsByChapter] = useState({});

  useEffect(() => {
    setAnimateCards(true);
  }, [selectedChapter]);

  useEffect(() => {
    let mounted = true;
    async function loadSubjects() {
      try {
        const subs = await api.courses.getAllSubjects();
        if (mounted && Array.isArray(subs)) {
          setSubjects(subs);
          if (!selectedSubject && subs.length) setSelectedSubject(subs[0].id || subs[0].subjectId || subs[0].slug || subs[0].name);
        }
      } catch (e) {
        // keep defaults if error
      }
    }
    loadSubjects();
    return () => { mounted = false; };
  }, []);

  useEffect(() => {
    let mounted = true;
    async function loadChapters() {
      if (!selectedSubject) return;
      try {
        const ch = await api.courses.getChaptersBySubject(selectedSubject);
        if (mounted) logger.debug('courses.getChaptersBySubject', selectedSubject, ch);
        if (mounted && Array.isArray(ch)) {
          const normalized = await Promise.all(ch.map(async (c) => {
            const base = {
              ...c,
              lessons: Array.isArray(c?.lessons) ? c.lessons : [],
              progress: typeof c?.progress === 'number' ? c.progress : 0
            };
            // If backend returns empty lessons array but we have a chapter id, try fetching lessons explicitly
            if ((!base.lessons || base.lessons.length === 0) && (c.id || c.chapterId)) {
              try {
                const chapterId = c.id || c.chapterId;
                const lessons = await api.courses.getLessonsByChapter(chapterId);
                if (Array.isArray(lessons) && lessons.length) {
                  base.lessons = lessons;
                }
              } catch (e) {
                // ignore per-chapter fetch errors
              }
            }
            return base;
          }));
          setChapters(prev => ({ ...prev, [selectedSubject]: normalized }));
        }
      } catch (e) {}
    }
    loadChapters();
    return () => { mounted = false; };
  }, [selectedSubject]);

  const currentChapters = chapters[selectedSubject] || [];

  const notification = useNotification();
  const { completeLesson: localCompleteLesson } = useGame();
  const [loadingLesson, setLoadingLesson] = useState(false);
  const [lessonModal, setLessonModal] = useState({ open: false, content: null });

  const handleCompleteLesson = async (lesson, chapterId, idx) => {
    const lessonId = lesson?.id || lesson?.lessonId;
    logger.debug('handleCompleteLesson called', { lesson, lessonId, chapterId, idx });
    try {
      if (lessonId) {
        // Send a minimal timeSpent to satisfy backend validation
        const timeSpent = 1;
        await api.courses.completeLesson(lessonId, { timeSpent });
      } else {
        console.warn('No lessonId available, skipping API call and marking locally completed');
      }
      // update local game state
      localCompleteLesson(lessonId || `${chapterId}-${idx}`, selectedSubject || 'unknown');
      // update local UI state
      setChapters(prev => {
        const copied = { ...prev };
        const list = (copied[selectedSubject] || []).map((c) => {
          if (c.id !== chapterId) return c;
          const newLessons = (c.lessons || []).map((l, i) => i === idx ? { ...l, completed: true } : l);
          return { ...c, lessons: newLessons };
        });
        copied[selectedSubject] = list;
        return copied;
      });
      notification.success('Leçon marquée comme complétée');
    } catch (e) {
      console.error('completeLesson API error', e);
      const msg = (e && (e.message || (e.body && e.body.error))) || 'Erreur lors de la complétion de la leçon';
      notification.error(msg);
    }
  };

  const openLessonReview = async (lesson) => {
    const lessonId = lesson?.id || lesson?.lessonId;
    setLoadingLesson(true);
    try {
      if (lessonId) {
        const data = await api.courses.getLessonById(lessonId);
        setLessonModal({ open: true, content: data });
      } else {
        // fallback to local lesson data
        setLessonModal({ open: true, content: lesson });
      }
    } catch (e) {
      notification.error('Impossible de charger la leçon');
    } finally {
      setLoadingLesson(false);
    }
  };

  return (
    <div className="min-h-screen">
      <AppNav currentPage="cours" onNavigate={onNavigate} onLogout={onLogout} />
      
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {/* Header */}
        <div className="mb-8 md:mb-10 transform transition-all duration-700">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 mb-3 flex items-center gap-3">
            <BookOpen className="w-10 h-10 md:w-12 md:h-12 text-blue-600" />
            My Lessons
          </h1>
          <p className="text-gray-700 text-lg font-bold">Choose a subject and start learning!</p>
        </div>

        {/* Subject Tabs */}
        <div className="flex gap-3 mb-8 overflow-x-auto pb-2 scroll-smooth">
          {subjects.map((subject, index) => (
            <button
              key={subject.id}
              onClick={() => {
                setSelectedSubject(subject.id);
                setSelectedChapter(null);
              }}
              className={`flex-shrink-0 flex items-center gap-3 px-6 py-4 rounded-2xl transition-all duration-300 font-semibold ${
                selectedSubject === subject.id
                  ? `${subject.color} text-gray-900 shadow-lg scale-105 hover:shadow-xl`
                  : 'bg-white text-gray-700 hover:shadow-md hover:scale-102'
              }`}
              style={{
                animation: 'fadeInDown 0.6s ease-out',
                animationDelay: `${index * 50}ms`,
              }}
            >
              <span className="text-2xl animate-float" style={{ animationDelay: `${index * 0.1}s` }}>{subject.emoji}</span>
              <span>{subject.name}</span>
            </button>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Chapters List */}
          <div className="lg:col-span-1 space-y-4 animate-slideInLeft">
            <h2 className="text-xl font-bold text-gray-900 mb-4">📑 Chapitres</h2>
            {currentChapters.map((chapter, index) => (
              <button
                key={chapter.id}
                onClick={() => setSelectedChapter(chapter.id)}
                className={`w-full text-left p-5 rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg ${
                  selectedChapter === chapter.id
                    ? 'bg-gradient-to-br from-blue-500 to-purple-600 text-white shadow-xl scale-105'
                    : 'bg-white hover:shadow-md'
                }`}
                style={{
                  animation: 'fadeInUp 0.6s ease-out',
                  animationDelay: `${index * 100}ms`,
                }}
              >
                <div className="flex items-start justify-between mb-3">
                  <h3 className={`font-semibold ${selectedChapter === chapter.id ? 'text-white' : 'text-gray-900'}`}>
                    {chapter.title}
                  </h3>
                  <ChevronRight className={`w-5 h-5 transition-transform duration-300 ${selectedChapter === chapter.id ? 'text-white translate-x-1' : 'text-gray-400'}`} />
                </div>
                
                <div className="flex items-center gap-2 mb-2">
                  <span className={`text-sm font-semibold ${selectedChapter === chapter.id ? 'text-white' : 'text-gray-600'}`}>
                    {(Array.isArray(chapter.lessons) ? chapter.lessons.length : 0)} leçons
                  </span>
                </div>
                
                <div className="w-full bg-white/20 rounded-full h-2 overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${selectedChapter === chapter.id ? 'bg-white' : 'bg-blue-500'}`}
                    style={{ width: `${chapter.progress}%` }}
                  ></div>
                </div>
                <span className={`text-xs mt-1 block font-medium ${selectedChapter === chapter.id ? 'text-white' : 'text-gray-500'}`}>
                  {chapter.progress}% complété
                </span>
              </button>
            ))}
          </div>

          {/* Lessons Detail */}
          <div className="lg:col-span-2">
            {selectedChapter ? (
              <div className={`bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 animate-slideInRight ${
                animateCards ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
              }`}>
                <div className="mb-6">
                  {(() => {
                    const selected = currentChapters.find(c => c.id === selectedChapter);
                    const lessons = Array.isArray(selected?.lessons) ? selected.lessons : [];
                    return (
                      <>
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">
                          {selected?.title || 'Chapitre'}
                        </h2>
                        <p className="text-gray-600">
                          {lessons.length} leçons à découvrir
                        </p>
                      </>
                    );
                  })()}
                </div>

                <div className="space-y-3">
                  {(Array.isArray(currentChapters.find(c => c.id === selectedChapter)?.lessons)
                    ? currentChapters.find(c => c.id === selectedChapter)?.lessons
                    : []
                   ).map((lesson, index) => (
                    <div
                      key={index}
                      className={`p-5 rounded-xl border-2 transition-all duration-300 transform hover:scale-102 hover:shadow-lg ${
                        lesson.locked
                          ? 'border-gray-200 bg-gray-50 opacity-60'
                          : lesson.completed
                          ? 'border-green-200 bg-green-50 hover:shadow-md cursor-pointer hover:bg-green-100'
                          : 'border-blue-200 bg-blue-50 hover:shadow-md cursor-pointer hover:bg-blue-100'
                      }`}
                      style={{
                        animation: 'fadeInUp 0.6s ease-out',
                        animationDelay: `${index * 50}ms`,
                      }}
                    >
                      <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-transform duration-300 hover:scale-125 ${
                          lesson.locked
                            ? 'bg-gray-300'
                            : lesson.completed
                            ? 'bg-gradient-to-br from-green-400 to-green-600'
                            : 'bg-gradient-to-br from-blue-400 to-blue-600'
                        }`}>
                          {lesson.locked ? (
                            <Lock className="w-6 h-6 text-white" />
                          ) : lesson.completed ? (
                            <CheckCircle className="w-6 h-6 text-white animate-bounce-slow" />
                          ) : (
                            <Play className="w-6 h-6 text-white" />
                          )}
                        </div>
                        
                        <div className="flex-1">
                          <h4 className="text-gray-900 font-semibold mb-1">{lesson.title}</h4>
                          <div className="flex items-center gap-3 text-sm text-gray-600">
                            <span className="flex items-center gap-1 font-medium">
                              <Clock className="w-4 h-4" />
                              {lesson.duration}
                            </span>
                            {lesson.completed && (
                              <span className="flex items-center gap-1 text-green-600 font-semibold">
                                <Star className="w-4 h-4 fill-green-600" />
                                Terminé
                              </span>
                            )}
                            {lesson.locked && (
                              <span className="text-gray-500 font-semibold">🔒 Bloqué</span>
                            )}
                          </div>
                        </div>

                        {!lesson.locked && (
                          <button
                            onClick={() => {
                              const lessonId = lesson?.id || lesson?.lessonId;
                              if (lesson.completed) {
                                openLessonReview(lesson);
                              } else if (lessonId) {
                                onNavigate('lesson', { lessonId });
                              } else {
                                // fallback to marking complete locally
                                handleCompleteLesson(lesson, selectedChapter, index);
                              }
                            }}
                            className={`px-4 py-2 rounded-lg transition-all duration-300 font-semibold transform hover:scale-105 hover:shadow-md ${
                              lesson.completed
                                ? 'bg-gradient-to-r from-green-500 to-green-600 text-white hover:shadow-lg'
                                : 'bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:shadow-lg'
                            }`}
                          >
                            {lesson.completed ? '👀 Revoir' : '▶️ Commencer'}
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Lesson Modal */}
                {lessonModal.open && (
                  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
                    <div className="bg-white rounded-2xl max-w-2xl w-full p-6">
                      <div className="flex items-start justify-between mb-4">
                        <h3 className="text-xl font-bold">{lessonModal.content?.title || 'Leçon'}</h3>
                        <button onClick={() => setLessonModal({ open: false, content: null })} className="text-gray-500">Fermer</button>
                      </div>
                      <div className="prose max-w-none text-gray-700">
                        {lessonModal.content?.body || lessonModal.content?.content || <p>Contenu indisponible</p>}
                      </div>
                    </div>
                  </div>
                )}

                {/* Chapter Summary */}
                <div className="mt-6 p-5 bg-gradient-to-br from-purple-100 to-pink-100 rounded-xl hover:shadow-lg transition-all duration-300 transform hover:scale-102">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-2xl animate-bounce-slow">💡</span>
                    <h3 className="text-gray-900 font-bold">Astuce</h3>
                  </div>
                  <p className="text-gray-700">
                    N'oublie pas de faire les exercices après chaque leçon pour bien comprendre ! 
                    Tu peux aussi refaire les leçons autant de fois que tu veux.
                  </p>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-2xl p-12 shadow-sm text-center animate-scaleIn">
                <div className="text-6xl mb-4 animate-float">📚</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Choisis un chapitre</h3>
                <p className="text-gray-600">
                  Sélectionne un chapitre sur la gauche pour voir toutes les leçons
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
