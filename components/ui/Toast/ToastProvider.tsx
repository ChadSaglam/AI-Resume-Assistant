'use client';
import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Toast } from './Toast';
import { ToastContext, ToastData } from './ToastContext';
import { addGlobalToast } from './ToastGlobal';

// Animation classes for toast entry/exit
const TOAST_ANIMATION_CSS = `
@keyframes toast-in {
  from { 
    opacity: 0;
    transform: translateY(1rem);
  }
  to { 
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes toast-out {
  from { 
    opacity: 1;
    transform: translateY(0);
  }
  to { 
    opacity: 0;
    transform: translateY(1rem);
  }
}

.toast-enter {
  animation: toast-in 0.3s ease forwards;
}

.toast-exit {
  animation: toast-out 0.3s ease forwards;
}
`;

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastData[]>([]);
  const [isMounted, setIsMounted] = useState(false);

  // Handle mounting/unmounting
  useEffect(() => {
    setIsMounted(true);
    
    // Add animation styles
    const styleEl = document.createElement('style');
    styleEl.textContent = TOAST_ANIMATION_CSS;
    document.head.appendChild(styleEl);
    
    return () => {
      setIsMounted(false);
      document.head.removeChild(styleEl);
    };
  }, []);

  // Function to add a toast
  const showToast = (toast: Omit<ToastData, 'id'>): string => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
    const newToast = { ...toast, id };
    
    setToasts(prev => [...prev, newToast]);
    
    // Auto dismiss after duration
    if (toast.duration !== Infinity) {
      setTimeout(() => {
        dismissToast(id);
      }, toast.duration || 5000);
    }
    
    return id;
  };

  // Function to dismiss a toast
  const dismissToast = (id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };

  // Register the global toast function
  useEffect(() => {
    // Register the global toast function
    addGlobalToast(showToast);

    return () => {
      // Clean up the global toast function
      addGlobalToast(null);
    };
  }, []);

  // Expose methods via context
  const contextValue = { toasts, showToast, dismissToast };

  return (
    <ToastContext.Provider value={contextValue}>
      {children}
      
      {/* Toast container portal */}
      {isMounted && typeof window !== 'undefined' && createPortal(
        <div className="fixed top-4 right-4 z-50 flex flex-col gap-2 w-full max-w-xs">
          {toasts.map((toast) => (
            <div key={toast.id} className="toast-enter">
              <Toast
                id={toast.id}
                title={toast.title}
                description={toast.description}
                variant={toast.variant}
                onClose={dismissToast}
              />
            </div>
          ))}
        </div>,
        document.body
      )}
    </ToastContext.Provider>
  );
}