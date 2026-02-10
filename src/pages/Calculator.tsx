import WizardLayout from '@/components/wizard/WizardLayout';
import { CalculationProvider } from '@/context/CalculationContext';

export default function Calculator() {
  return (
    <CalculationProvider>
      <WizardLayout />
    </CalculationProvider>
  );
}
