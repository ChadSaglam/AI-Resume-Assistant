// Type definition for the toast function
type ShowToastFn = (toast: {
    title: string;
    description?: string;
    variant?: 'default' | 'success' | 'destructive';
    duration?: number;
  }) => string;
  
  // Store the global toast function
  let globalShowToast: ShowToastFn | null = null;
  
  // Function to set the global toast function
  export function addGlobalToast(fn: ShowToastFn | null) {
    globalShowToast = fn;
  }
  
  // The utility function that can be imported anywhere
  export const toast = {
    show: (props: {
      title: string;
      description?: string;
      variant?: 'default' | 'success' | 'destructive';
      duration?: number;
    }): void => {
      if (globalShowToast) {
        globalShowToast(props);
      } else {
        // Fallback to console
        const style = props.variant === 'success' ? 'color: green' : 
                     props.variant === 'destructive' ? 'color: red' : 
                     'color: blue';
                     
        console.log(`%c[TOAST] ${props.title}${props.description ? ': ' + props.description : ''}`, style);
      }
    }
  };