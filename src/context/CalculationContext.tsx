import React, { createContext, useContext, useState, useCallback } from 'react';
import { MASInput, MASResults, computeAll } from '@/calc/engine';

interface CalculationContextType {
  input: MASInput;
  results: MASResults | null;
  updateInput: (partial: Partial<MASInput>) => void;
  recalculate: () => void;
  currentStep: number;
  setCurrentStep: (step: number) => void;
}

const defaultInput: MASInput = {
  Pn: 13,
  n: 1500,
  V: 380,
  f: 50,
  m1: 3,
};

const CalculationContext = createContext<CalculationContextType>({
  input: defaultInput,
  results: null,
  updateInput: () => {},
  recalculate: () => {},
  currentStep: 0,
  setCurrentStep: () => {},
});

export function CalculationProvider({ children }: { children: React.ReactNode }) {
  const [input, setInput] = useState<MASInput>(defaultInput);
  const [results, setResults] = useState<MASResults | null>(() => {
    try { return computeAll(defaultInput); } catch { return null; }
  });
  const [currentStep, setCurrentStep] = useState(0);

  const updateInput = useCallback((partial: Partial<MASInput>) => {
    setInput(prev => {
      const next = { ...prev, ...partial };
      try { setResults(computeAll(next)); } catch { /* keep old */ }
      return next;
    });
  }, []);

  const recalculate = useCallback(() => {
    try { setResults(computeAll(input)); } catch { /* */ }
  }, [input]);

  return (
    <CalculationContext.Provider value={{ input, results, updateInput, recalculate, currentStep, setCurrentStep }}>
      {children}
    </CalculationContext.Provider>
  );
}

export const useCalculation = () => useContext(CalculationContext);
