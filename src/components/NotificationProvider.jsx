import { createContext, useContext, useCallback } from 'react';
import { toast } from 'sonner';

const NotificationContext = createContext();

export function NotificationProvider({ children }) {
  const notify = useCallback((message, options = {}) => {
    const {
      type = 'success',
      duration = 3000,
      icon = null,
      action = null,
    } = options;

    const toastOptions = {
      duration,
      description: options.description,
      action: action ? {
        label: action.label,
        onClick: action.onClick,
      } : undefined,
    };

    switch (type) {
      case 'success':
        return toast.success(message, toastOptions);
      case 'error':
        return toast.error(message, toastOptions);
      case 'info':
        return toast.info(message, toastOptions);
      case 'warning':
        return toast.warning(message, toastOptions);
      case 'loading':
        return toast.loading(message, toastOptions);
      default:
        return toast(message, toastOptions);
    }
  }, []);

  const value = {
    success: (msg, opts) => notify(msg, { ...opts, type: 'success' }),
    error: (msg, opts) => notify(msg, { ...opts, type: 'error' }),
    info: (msg, opts) => notify(msg, { ...opts, type: 'info' }),
    warning: (msg, opts) => notify(msg, { ...opts, type: 'warning' }),
    loading: (msg, opts) => notify(msg, { ...opts, type: 'loading' }),
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotification() {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotification must be used within NotificationProvider');
  }
  return context;
}
