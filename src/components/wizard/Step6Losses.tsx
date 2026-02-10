import { useCalculation } from '@/context/CalculationContext';
import { useLanguage } from '@/context/LanguageContext';
import { ResultRow } from '@/components/ResultRow';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { STEEL_LOSSES } from '@/data/tables';

export default function Step6Losses() {
  const { input, updateInput, results } = useCalculation();
  const { t } = useLanguage();
  const s6 = results?.step6;

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card>
        <CardHeader><CardTitle className="text-base">{t('common.input')}</CardTitle></CardHeader>
        <CardContent className="grid gap-4">
          <div className="space-y-1.5">
            <Label className="text-sm font-medium">{t('field.steelType')}</Label>
            <Select value={input.steelType ?? 'M400-50A'} onValueChange={v => updateInput({ steelType: v })}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                {Object.keys(STEEL_LOSSES).map(type => (
                  <SelectItem key={type} value={type}>{type} ({STEEL_LOSSES[type].p10_50} W/kg)</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle className="text-base">{t('common.results')}</CardTitle></CardHeader>
        <CardContent>
          {s6 && (
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left text-xs font-medium text-muted-foreground py-2 px-3">{t('common.parameter')}</th>
                  <th className="text-right text-xs font-medium text-muted-foreground py-2 px-3">{t('common.value')}</th>
                  <th className="text-left text-xs font-medium text-muted-foreground py-2 px-3">{t('common.unit')}</th>
                </tr>
              </thead>
              <tbody>
                <ResultRow labelKey="result.Gd1" value={s6.Gd1} unitKey="result.Gd1.unit" decimals={2} />
                <ResultRow labelKey="result.Gcs" value={s6.Gcs} unitKey="result.Gcs.unit" decimals={2} />
                <ResultRow labelKey="result.Pfer" value={s6.Pfer_total} unitKey="result.Pfer.unit" decimals={1} />
                <ResultRow labelKey="result.Pmec" value={s6.Pmec} unitKey="result.Pmec.unit" decimals={1} />
                <ResultRow labelKey="result.Pj1" value={s6.Pj1} unitKey="result.Pj1.unit" decimals={1} />
                <ResultRow labelKey="result.Pj2" value={s6.Pj2} unitKey="result.Pj2.unit" decimals={1} />
                <ResultRow labelKey="result.Ptotal" value={s6.Ptotal} unitKey="result.Ptotal.unit" decimals={1} />
                <ResultRow labelKey="result.eta_calc" value={(s6.eta_calc * 100).toFixed(1) + '%'} />
              </tbody>
            </table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
