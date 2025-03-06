/**
 * Step definition for the stepper component
 */
export interface Step {
    id: string;
    label: string;
    description?: string;
    icon?: string;
  }
  
  /**
   * Props for the ModernStepper component
   */
  export interface ModernStepperProps {
    steps: Step[];
    currentStep: string;
  }