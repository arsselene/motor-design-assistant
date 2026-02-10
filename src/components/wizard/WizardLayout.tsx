import { useLanguage } from '@/context/LanguageContext';
import { useCalculation } from '@/context/CalculationContext';
import { ThemeToggle } from '@/components/ThemeToggle';
import { LanguageToggle } from '@/components/LanguageToggle';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import {
  ClipboardList, Zap, RotateCcw, Magnet,
  Cable, Flame, CircleDot, ChevronLeft, ChevronRight,
} from 'lucide-react';

import Step1Specifications from '@/components/wizard/Step1Specifications';
import Step2Stator from '@/components/wizard/Step2Stator';
import Step3Rotor from '@/components/wizard/Step3Rotor';
import Step4MMF from '@/components/wizard/Step4MMF';
import Step5Impedances from '@/components/wizard/Step5Impedances';
import Step6Losses from '@/components/wizard/Step6Losses';
import Step7Circuit from '@/components/wizard/Step7Circuit';

const STEP_ICONS = [ClipboardList, Zap, RotateCcw, Magnet, Cable, Flame, CircleDot];
const STEPS = ['step.1', 'step.2', 'step.3', 'step.4', 'step.5', 'step.6', 'step.7'];
const STEP_COMPONENTS = [Step1Specifications, Step2Stator, Step3Rotor, Step4MMF, Step5Impedances, Step6Losses, Step7Circuit];

export default function WizardLayout() {
  const { t } = useLanguage();
  const { currentStep, setCurrentStep } = useCalculation();
  const progress = ((currentStep + 1) / 7) * 100;
  const StepComponent = STEP_COMPONENTS[currentStep];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="border-b bg-card/80 backdrop-blur-sm sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <CircleDot className="h-6 w-6 text-primary" />
            <h1 className="text-lg font-bold tracking-tight">{t('app.title')}</h1>
          </div>
          <div className="flex items-center gap-1">
            <LanguageToggle />
            <ThemeToggle />
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 pb-2">
          <Progress value={progress} className="h-1.5" />
        </div>
      </header>

      <div className="flex-1 flex max-w-7xl mx-auto w-full">
        {/* Sidebar */}
        <aside className="w-56 border-r bg-card/50 py-4 px-2 hidden md:block">
          <nav className="space-y-1">
            {STEPS.map((stepKey, i) => {
              const Icon = STEP_ICONS[i];
              const isActive = i === currentStep;
              const isDone = i < currentStep;
              return (
                <button
                  key={i}
                  onClick={() => setCurrentStep(i)}
                  className={cn(
                    'w-full flex items-center gap-2.5 px-3 py-2 rounded-md text-sm transition-colors text-left',
                    isActive && 'bg-primary text-primary-foreground font-medium',
                    isDone && !isActive && 'text-primary hover:bg-muted',
                    !isActive && !isDone && 'text-muted-foreground hover:bg-muted hover:text-foreground'
                  )}
                >
                  <Icon className="h-4 w-4 shrink-0" />
                  <span className="truncate">{t(stepKey)}</span>
                </button>
              );
            })}
          </nav>
        </aside>

        {/* Main content */}
        <main className="flex-1 p-6 overflow-auto">
          <div className="mb-6">
            <h2 className="text-2xl font-bold tracking-tight">
              {t(`step.${currentStep + 1}.full`)}
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              {t('step.1') !== t(`step.${currentStep + 1}`) ? `Étape ${currentStep + 1} / 7` : 'Étape 1 / 7'}
            </p>
          </div>

          <StepComponent />

          {/* Navigation */}
          <div className="flex justify-between mt-8 pt-4 border-t">
            <Button
              variant="outline"
              onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
              disabled={currentStep === 0}
            >
              <ChevronLeft className="h-4 w-4 mr-1" />
              {t('nav.prev')}
            </Button>
            <Button
              onClick={() => setCurrentStep(Math.min(6, currentStep + 1))}
              disabled={currentStep === 6}
            >
              {t('nav.next')}
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        </main>
      </div>
    </div>
  );
}
