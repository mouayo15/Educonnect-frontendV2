const isDev = typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.DEV;

const logger = {
  debug: (...args) => { if (isDev) console.debug(...args); },
  info: (...args) => { console.info(...args); },
  warn: (...args) => { console.warn(...args); },
  error: (...args) => { console.error(...args); },
};

export default logger;
