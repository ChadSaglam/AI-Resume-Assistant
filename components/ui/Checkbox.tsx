import React from 'react';
import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';

export interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, checked, onCheckedChange, ...props }, ref) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (onCheckedChange) {
        onCheckedChange(e.target.checked);
      }
    };

    return (
      <div className="relative flex items-center">
        <input
          type="checkbox"
          className="absolute h-4 w-4 opacity-0"
          checked={checked}
          onChange={handleChange}
          ref={ref}
          {...props}
        />
        <div
          className={cn(
            "border border-gray-300 dark:border-gray-600 h-4 w-4 rounded flex items-center justify-center",
            checked ? "bg-blue-600 border-blue-600 dark:bg-blue-500 dark:border-blue-500" : "bg-white dark:bg-gray-800",
            "mr-2"
          )}
        >
          {checked && <Check size={12} className="text-white" />}
        </div>
      </div>
    );
  }
);

Checkbox.displayName = 'Checkbox';