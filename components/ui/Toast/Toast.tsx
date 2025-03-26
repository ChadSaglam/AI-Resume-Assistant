import React from "react";
import { X } from "lucide-react";

export interface ToastProps {
  id: string;
  title: string;
  description?: string;
  variant?: "default" | "success" | "destructive";
  onClose: (id: string) => void;
}

export function Toast({
  id,
  title,
  description,
  variant = "default",
  onClose,
}: ToastProps) {
  // Get variant-specific styles
  const variantStyles = {
    default: "bg-white border-gray-200 text-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100",
    destructive: "bg-red-50 border-red-200 text-red-800 dark:bg-red-900/30 dark:border-red-800 dark:text-red-300",
    success: "bg-green-50 border-green-200 text-green-800 dark:bg-green-900/30 dark:border-green-800 dark:text-green-300",
  }[variant];

  return (
    <div
      className={`group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md border p-6 pr-8 shadow-lg transition-all ${variantStyles}`}
      role="alert"
    >
      <div className="flex-1 pr-2">
        <h3 className="text-sm font-semibold">{title}</h3>
        {description && <p className="text-sm opacity-90 mt-1">{description}</p>}
      </div>
      <button
        onClick={() => onClose(id)}
        className="absolute right-2 top-2 rounded-md p-1 text-gray-400 opacity-0 transition-opacity hover:text-gray-600 focus:opacity-100 focus:outline-none focus:ring-2 group-hover:opacity-100"
        aria-label="Close"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}