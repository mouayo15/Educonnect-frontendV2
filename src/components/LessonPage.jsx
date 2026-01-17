import { useEffect, useState, useRef } from 'react';
import { AppNav } from './AppNav';
import api from '../lib/api';
import { useNotification } from './NotificationProvider';
import DOMPurify from 'dompurify';
import logger from '../lib/logger';

export default function LessonPage({ lessonId, onNavigate, onLogout }) {
  const [lesson, setLesson] = useState(null);
  const [loading, setLoading] = useState(true);
  const [startTime, setStartTime] = useState(null);
  const notification = useNotification();

  useEffect(() => {
    let mounted = true;
    async function load() {
      if (!lessonId) return setLoading(false);
      try {
        const data = await api.courses.getLessonById(lessonId);
        if (mounted) setLesson(data);
        if (mounted) setStartTime(Date.now());
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
      const elapsed = startTime ? Math.floor((Date.now() - startTime) / 1000) : 1;
      const timeSpent = Math.max(1, elapsed);
      await api.courses.completeLesson(lessonId, { timeSpent });
      notification.success('Leçon complétée !');
      onNavigate('cours');
    } catch (e) {
      const msg = (e && (e.message || (e.body && e.body.error))) || 'Erreur lors de la complétion';
      notification.error(msg);
    }
  };

  const sanitizeHtml = (html = '') => {
    try {
      return DOMPurify.sanitize(typeof html === 'string' ? html : '');
    } catch (e) {
      logger.error('Sanitize error', e);
      return '';
    }
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
