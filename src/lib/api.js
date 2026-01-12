const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:5000/api/v1';

async function request(path, { method = 'GET', body, headers = {}, auth = false } = {}) {
  const opts = { method, headers: { ...headers } };
  // For GET requests from the frontend, prefer fresh responses to avoid 304 cached empty bodies
  if (method && method.toUpperCase() === 'GET') {
    try {
      opts.cache = 'no-store';
      opts.headers['Cache-Control'] = 'no-cache';
    } catch (e) {}
  }
  if (body && !(body instanceof FormData)) {
    opts.body = JSON.stringify(body);
    opts.headers['Content-Type'] = 'application/json';
  } else if (body instanceof FormData) {
    opts.body = body;
  }

  if (auth) {
    const token = localStorage.getItem('token');
    if (token) opts.headers['Authorization'] = `Bearer ${token}`;
  }

  const doFetch = async (url = `${API_BASE}${path}`) => await fetch(url, opts);
  let res = await doFetch();
  // Dev-only: log response preview to help debug empty Network panel issues
  if (import.meta.env.DEV) {
    try {
      const preview = await res.clone().text();
      // Truncate long bodies to keep console readable
      const short = preview.length > 2000 ? preview.slice(0, 2000) + '... (truncated)' : preview;
      console.debug('[api] fetch', path, 'status=', res.status, 'content-type=', res.headers.get('content-type'));
      console.debug('[api] response preview:', short);
    } catch (e) {
      // ignore clone/text errors
    }
  }
  let data = null;
  try { data = await res.json(); } catch (e) { /* empty response */ }

  // If server returned 304 Not Modified (browser cache), attempt a cache-busting retry
  if (res.status === 304) {
    try {
      const bustUrl = `${API_BASE}${path}${path.includes('?') ? '&' : '?'}_=${Date.now()}`;
      // force no-cache and retry
      opts.cache = 'no-store';
      opts.headers['Cache-Control'] = 'no-cache';
      res = await doFetch(bustUrl);
      try { data = await res.json(); } catch (e) { /* still empty */ }
    } catch (e) {
      // ignore retry errors
    }
  }

  // if unauthorized and auth was requested, try refresh once
  if (res.status === 401 && auth) {
    const refreshToken = localStorage.getItem('refreshToken');
    if (refreshToken) {
      try {
        const refreshRes = await fetch(`${API_BASE}/auth/refresh`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ token: refreshToken })
        });
        const refreshData = await refreshRes.json();
        if (refreshRes.ok && refreshData.token) {
          localStorage.setItem('token', refreshData.token);
          // retry original request with new token
          opts.headers['Authorization'] = `Bearer ${refreshData.token}`;
          res = await doFetch();
          try { data = await res.json(); } catch (e) {}
        }
      } catch (e) {
        // refresh failed — fall through to throw original error
      }
    }
  }

  // If still unauthorized after refresh attempt, clear local tokens and redirect to login (browser only)
  if (res.status === 401) {
    try {
      if (typeof window !== 'undefined') {
        // Don't redirect if the request was for auth endpoints (avoid loop)
        const authPaths = ['/auth/refresh', '/auth/login', '/auth/register', '/auth/me', '/auth/logout'];
        const isAuthRequest = authPaths.some(p => path.includes(p));
        if (!isAuthRequest) {
          // Persist a redirect guard so we don't loop across full page reloads
          const guardKey = '__api_auth_redirecting';
          const alreadyRedirecting = localStorage.getItem(guardKey) === '1';
          const isOnLogin = typeof window !== 'undefined' && (window.location.pathname === '/login' || window.location.pathname === '/register');
          if (!alreadyRedirecting && !isOnLogin) {
            try { localStorage.setItem(guardKey, '1'); } catch (e) {}
            localStorage.removeItem('token');
            localStorage.removeItem('refreshToken');
            try { window.location.replace('/login'); } catch (e) { window.location.href = '/login'; }
          }
        }
      }
    } catch (e) {
      // ignore
    }
  }

  if (!res.ok) {
    const message = data?.message || res.statusText || 'Request failed';
    const err = new Error(message);
    err.status = res.status;
    err.body = data;
    throw err;
  }
  // If backend wraps responses as { success: true, data: ... }, unwrap for convenience
  if (data && typeof data === 'object' && Object.prototype.hasOwnProperty.call(data, 'data')) {
    return data.data;
  }
  return data;
}

const auth = {
  login: (credentials) => request('/auth/login', { method: 'POST', body: credentials }),
  register: (payload) => request('/auth/register', { method: 'POST', body: payload }),
  refresh: (payload) => request('/auth/refresh', { method: 'POST', body: payload }),
  me: () => request('/auth/me', { auth: true }),
  logout: () => request('/auth/logout', { method: 'POST', auth: true }),
  changePassword: (payload) => request('/auth/change-password', { method: 'POST', auth: true, body: payload }),
};

const users = {
  getProfile: () => request('/users/profile', { auth: true }),
  updateProfile: (payload) => request('/users/profile', { method: 'PATCH', auth: true, body: payload }),
  getStats: () => request('/users/stats', { auth: true }),
  getAchievements: () => request('/users/achievements', { auth: true }),
  getActivity: (params = '') => request(`/users/activity${params ? `?${params}` : ''}`, { auth: true }),
  getUserById: (id) => request(`/users/${id}`),
};

const courses = {
  getAllSubjects: (params = '') => request(`/courses/subjects${params ? `?${params}` : ''}`),
  getSubjectById: (id) => request(`/courses/subjects/${id}`),
  getChaptersBySubject: (subjectId) => request(`/courses/subjects/${subjectId}/chapters`),
  getChapterById: (chapterId) => request(`/courses/chapters/${chapterId}`),
  getLessonsByChapter: (chapterId) => request(`/courses/chapters/${chapterId}/lessons`),
  getLessonById: (lessonId) => request(`/courses/lessons/${lessonId}`),
  completeLesson: (lessonId, payload) => request(`/courses/lessons/${lessonId}/complete`, { method: 'POST', auth: true, body: payload }),
};

const exercises = {
  getAll: (params = '') => request(`/exercises${params ? `?${params}` : ''}`),
  getById: (id) => request(`/exercises/${id}`),
  getQuestions: (id) => request(`/exercises/${id}/questions`),
  submitAttempt: (id, payload) => request(`/exercises/${id}/submit`, { method: 'POST', auth: true, body: payload }),
  getUserAttempts: () => request('/exercises/attempts/history', { auth: true }),
};

const quizzes = {
  getAll: (params = '') => request(`/quizzes${params ? `?${params}` : ''}`),
  getById: (id) => request(`/quizzes/${id}`),
  getQuestions: (id) => request(`/quizzes/${id}/questions`),
  submitAttempt: (id, payload) => request(`/quizzes/${id}/submit`, { method: 'POST', auth: true, body: payload }),
  getUserAttempts: () => request('/quizzes/attempts/history', { auth: true }),
  getLeaderboard: (id) => request(`/quizzes/${id}/leaderboard`),
};

const leaderboard = {
  getGlobal: (params = '') => request(`/leaderboard/global${params ? `?${params}` : ''}`),
  getSubject: (subjectId) => request(`/leaderboard/subject/${subjectId}`),
  getWeekly: () => request('/leaderboard/weekly'),
  getStreak: () => request('/leaderboard/streak'),
  updateCache: () => request('/leaderboard/cache/update', { method: 'POST', auth: true }),
};

const api = { auth, users, courses, exercises, quizzes, leaderboard, request };

export default api;
