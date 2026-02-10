import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { Info } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

interface InputFieldProps {
  labelKey: string;
  unitKey?: string;
  tooltipKey?: string;
  value: number | string;
  onChange: (value: number) => void;
  placeholder?: string;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
}

export function InputField({
  labelKey, unitKey, tooltipKey, value, onChange,
  placeholder, min, max, step = 0.1, disabled,
}: InputFieldProps) {
  const { t } = useLanguage();

  return (
    <div className="space-y-1.5">
      <div className="flex items-center gap-1.5">
        <Label className="text-sm font-medium">{t(labelKey)}</Label>
        {unitKey && <span className="text-xs text-muted-foreground">({t(unitKey)})</span>}
        {tooltipKey && (
          <Tooltip>
            <TooltipTrigger asChild>
              <Info className="h-3.5 w-3.5 text-muted-foreground cursor-help" />
            </TooltipTrigger>
            <TooltipContent side="right" className="max-w-xs">
              <p className="text-xs">{t(tooltipKey)}</p>
            </TooltipContent>
          </Tooltip>
        )}
      </div>
      <Input
        type="number"
        value={value}
        onChange={e => onChange(parseFloat(e.target.value) || 0)}
        placeholder={placeholder}
        min={min}
        max={max}
        step={step}
        disabled={disabled}
        className="font-mono"
      />
    </div>
  );
}
