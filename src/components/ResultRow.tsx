import { useLanguage } from '@/context/LanguageContext';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { Info } from 'lucide-react';

interface ResultRowProps {
  labelKey: string;
  value: number | string;
  unitKey?: string;
  tooltipKey?: string;
  decimals?: number;
}

export function ResultRow({ labelKey, value, unitKey, tooltipKey, decimals = 3 }: ResultRowProps) {
  const { t } = useLanguage();
  const formatted = typeof value === 'number'
    ? (Math.abs(value) > 1000 ? value.toFixed(1) : value.toFixed(decimals))
    : value;

  return (
    <tr className="border-b border-border/50 hover:bg-muted/30 transition-colors">
      <td className="py-2 px-3 text-sm font-medium flex items-center gap-1.5">
        {t(labelKey)}
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
      </td>
      <td className="py-2 px-3 text-sm font-mono text-right">{formatted}</td>
      <td className="py-2 px-3 text-sm text-muted-foreground">{unitKey ? t(unitKey) : ''}</td>
    </tr>
  );
}
