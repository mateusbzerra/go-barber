import React, { createContext, useContext, useCallback, useState } from 'react';
import ToastContainer from '../components/ToastContainer';

interface ToastContextProps {
  addToast(message: Omit<ToastMessage, 'id'>): void;
  removeToast(id: string): void;
}

export interface ToastMessage {
  id: string;
  type?: 'success' | 'error' | 'info';
  title: string;
  description?: string;
}

const ToastContext = createContext<ToastContextProps>({} as ToastContextProps);

const ToastProvider: React.FC = ({ children }) => {
  const [messages, setMessages] = useState<ToastMessage[]>([]);

  const addToast = useCallback(
    ({ title, type, description }: Omit<ToastMessage, 'id'>) => {
      const id = Date.now().toString();

      const toast = {
        id,
        title,
        type,
        description,
      };
      setMessages((oldState) => [...oldState, toast]);
    },
    [],
  );
  const removeToast = useCallback((id: string) => {
    setMessages((oldState) => oldState.filter((message) => message.id !== id));
  }, []);
  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}
      <ToastContainer messages={messages} />
    </ToastContext.Provider>
  );
};

function useToast(): ToastContextProps {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error('useToast must be declared inside an ToastProvider');
  }
  return context;
}

export { ToastProvider, useToast };
