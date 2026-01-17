import { useEffect, useState } from 'react';
import { AppNav } from './AppNav';
import api from '../lib/api';
import { useNotification } from './NotificationProvider';

export default function LessonPage({ lessonId, onNavigate, onLogout }) {
  const [lesson, setLesson] = useState(null);
  const [loading, setLoading] = useState(true);
  const notification = useNotification();

  useEffect(() => {
    let mounted = true;
    async function load() {
      if (!lessonId) return setLoading(false);
      try {
        const data = await api.courses.getLessonById(lessonId);
        if (mounted) setLesson(data);
      } catch (e) {
        notification.error('Impossible de charger la leçon');
      } finally {
        if (mounted) setLoading(false);
      }
    }
    load();
    return () => { mounted = false; };
  }, [lessonId, notification]);

  const handleComplete = async () => {
    if (!lessonId) return;
    try {
      await api.courses.completeLesson(lessonId, { timeSpent: 1 });
      notification.success('Leçon complétée !');
      onNavigate('cours');
    } catch (e) {
      const msg = (e && (e.message || (e.body && e.body.error))) || 'Erreur lors de la complétion';
      notification.error(msg);
    }
  };

  // Basic HTML sanitizer to strip scripts and event handlers (suitable for trusted content)
  const sanitizeHtml = (html = '') => {
    if (typeof html !== 'string') return '';
    // remove script tags
    let cleaned = html.replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, '');
    // remove on* attributes like onclick=, onload= etc.
    cleaned = cleaned.replace(/\son[A-Za-z]+\s*=\s*("[^"]*"|'[^']*'|[^\s>]+)/gi, '');
    // remove javascript: in href/src
    cleaned = cleaned.replace(/(href|src)\s*=\s*("|')?javascript:[^"'>\s]*/gi, '');
    return cleaned;
  };

  return (
    <div className="min-h-screen">
      <AppNav currentPage="cours" onNavigate={onNavigate} onLogout={onLogout} />
      <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {loading ? (
          <div>Chargement...</div>
        ) : lesson ? (
          <div className="bg-white rounded-2xl p-8 shadow-sm">
            <h1 className="text-2xl font-bold mb-4">{lesson.title}</h1>
            <div className="prose max-w-none text-gray-700 mb-6">
              {(() => {
                const raw = lesson.body || lesson.content || '';
                const html = raw ? sanitizeHtml(raw) : null;
                return html ? (
                  <div dangerouslySetInnerHTML={{ __html: html }} />
                ) : (
                  <p>Contenu indisponible</p>
                );
              })()}
            </div>
            <div className="flex gap-3">
              <button onClick={handleComplete} className="px-4 py-2 bg-blue-600 text-white rounded-lg">Marquer comme complétée</button>
              <button onClick={() => onNavigate('cours')} className="px-4 py-2 bg-gray-100 rounded-lg">Retour aux cours</button>
            </div>
          </div>
        ) : (
          <div className="text-center">Aucune leçon sélectionnée</div>
        )}
      </div>
    </div>
  );
}
