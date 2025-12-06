import { createContext, useContext, useState, ReactNode } from 'react';

interface FormContextType {
  showCtaForm: boolean;
  setShowCtaForm: (show: boolean) => void;
}

const FormContext = createContext<FormContextType | undefined>(undefined);

export function FormProvider({ children }: { children: ReactNode }) {
  const [showCtaForm, setShowCtaForm] = useState(false);

  return (
    <FormContext.Provider value={{ showCtaForm, setShowCtaForm }}>
      {children}
    </FormContext.Provider>
  );
}

export function useForm() {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error('useForm debe ser usado dentro de FormProvider');
  }
  return context;
}
