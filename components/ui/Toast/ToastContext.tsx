'use client';
import React, { createContext, useContext, useState } from 'react';

// Define the shape of a toast
export interface ToastData {
  id: string;
  title: string;
  description?: string;
  variant?: 'default' | 'success' | 'destructive';
  duration?: number;
}

// Define the context value shape
interface ToastContextValue {
  toasts: ToastData[];
  showToast: (toast: Omit<ToastData, 'id'>) => string;
  dismissToast: (id: string) => void;
}

// Create the context
export const ToastContext = createContext<ToastContextValue | undefined>(undefined);

// Hook to access the toast context
export function useToast() {
  const context = useContext(ToastContext);
  
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  
  return context;
}