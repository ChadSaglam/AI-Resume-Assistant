import React, { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import { ChevronDown, Check } from 'lucide-react';

interface SelectContextValue {
  value: string;
  onValueChange: (value: string) => void;
  open: boolean;
  setOpen: (open: boolean) => void;
}

const SelectContext = React.createContext<SelectContextValue | undefined>(undefined);

const useSelectContext = () => {
  const context = React.useContext(SelectContext);
  if (!context) {
    throw new Error('Select components must be used within a Select provider');
  }
  return context;
};

interface SelectProps {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  children: React.ReactNode;
  className?: string;
}

export function Select({
  value: controlledValue,
  defaultValue,
  onValueChange,
  children,
  className,
}: SelectProps) {
  const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue || '');
  const [open, setOpen] = useState(false);

  const value = controlledValue !== undefined ? controlledValue : uncontrolledValue;

  const handleValueChange = (newValue: string) => {
    if (onValueChange) {
      onValueChange(newValue);
    } else {
      setUncontrolledValue(newValue);
    }
    setOpen(false);
  };

  return (
    <SelectContext.Provider
      value={{
        value,
        onValueChange: handleValueChange,
        open,
        setOpen,
      }}
    >
      <div className={cn('relative', className)}>
        {children}
      </div>
    </SelectContext.Provider>
  );
}

interface SelectTriggerProps {
  children?: React.ReactNode;
  className?: string;
  placeholder?: string;
}

export function SelectTrigger({
  children,
  className,
  placeholder = 'Select an option',
}: SelectTriggerProps) {
  const { value, open, setOpen } = useSelectContext();

  return (
    <button
      type="button"
      className={cn(
        'flex w-full items-center justify-between rounded-md border border-gray-300 bg-white px-3 py-2 text-sm dark:border-gray-600 dark:bg-gray-800',
        'focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-1',
        className
      )}
      onClick={() => setOpen(!open)}
      aria-expanded={open}
    >
      <span className="flex-1 text-left">{value ? children : placeholder}</span>
      <ChevronDown className={cn('h-4 w-4 transition-transform', open ? 'rotate-180' : '')} />
    </button>
  );
}

interface SelectValueProps {
  placeholder?: string;
}

export function SelectValue({ placeholder = 'Select an option' }: SelectValueProps) {
  const { value } = useSelectContext();
  return <span>{value || placeholder}</span>;
}

interface SelectContentProps {
  children: React.ReactNode;
  className?: string;
}

export function SelectContent({ children, className }: SelectContentProps) {
  const { open, setOpen } = useSelectContext();
  const ref = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [open, setOpen]);

  if (!open) return null;

  return (
    <div
      ref={ref}
      className={cn(
        'absolute z-50 w-full rounded-md border border-gray-200 bg-white shadow-md animate-in fade-in-0 zoom-in-95 dark:border-gray-800 dark:bg-gray-950',
        'mt-1 max-h-60 overflow-auto',
        className
      )}
    >
      <div className="p-1">{children}</div>
    </div>
  );
}

interface SelectItemProps {
  value: string;
  children: React.ReactNode;
  className?: string;
}

export function SelectItem({ value, children, className }: SelectItemProps) {
  const { value: selectedValue, onValueChange } = useSelectContext();
  const isSelected = selectedValue === value;

  return (
    <button
      type="button"
      className={cn(
        'relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 px-2 text-sm outline-none',
        'hover:bg-gray-100 dark:hover:bg-gray-800',
        isSelected ? 'bg-gray-100 dark:bg-gray-800' : '',
        className
      )}
      onClick={() => onValueChange(value)}
    >
      <span className="flex-1 text-left">{children}</span>
      {isSelected && <Check className="h-4 w-4 ml-2" />}
    </button>
  );
}