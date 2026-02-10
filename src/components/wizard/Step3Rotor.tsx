import { useCalculation } from '@/context/CalculationContext';
import { useLanguage } from '@/context/LanguageContext';
import { InputField } from '@/components/InputField';
import { ResultRow } from '@/components/ResultRow';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { ROTOR_SLOTS } from '@/data/tables';

export default function Step3Rotor() {
  const { input, updateInput, results } = useCalculation();
  const { t } = useLanguage();
  const s1 = results?.step1;
  const s2 = results?.step2;
  const s3 = results?.step3;

  const availableZ2 = s1 && s2 ? (ROTOR_SLOTS[s1.poles2p]?.[s2.Z1] || []) : [];

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card>
        <CardHeader><CardTitle className="text-base">{t('common.input')}</CardTitle></CardHeader>
        <CardContent className="grid gap-4">
          <div className="space-y-1.5">
            <Label className="text-sm font-medium">{t('field.Z2')}</Label>
            <Select
              value={String(input.Z2 ?? availableZ2[0] ?? '')}
              onValueChange={v => updateInput({ Z2: parseInt(v) })}
            >
              <SelectTrigger><SelectValue placeholder={t('field.Z2')} /></SelectTrigger>
              <SelectContent>
                {availableZ2.map(z => (
                  <SelectItem key={z} value={String(z)}>Z₂ = {z}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground">{t('field.Z2.tooltip')}</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle className="text-base">{t('common.results')}</CardTitle></CardHeader>
        <CardContent>
          {s3 && (
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left text-xs font-medium text-muted-foreground py-2 px-3">{t('common.parameter')}</th>
                  <th className="text-right text-xs font-medium text-muted-foreground py-2 px-3">{t('common.value')}</th>
                  <th className="text-left text-xs font-medium text-muted-foreground py-2 px-3">{t('common.unit')}</th>
                </tr>
              </thead>
              <tbody>
                <ResultRow labelKey="field.Z2" value={s3.Z2} decimals={0} />
                <ResultRow labelKey="result.t2" value={s3.t2} unitKey="result.t2.unit" decimals={2} />
                <ResultRow labelKey="result.I2" value={s3.I2} unitKey="result.I2.unit" decimals={2} />
                <ResultRow labelKey="result.Icc" value={s3.Icc} unitKey="result.Icc.unit" decimals={2} />
                <ResultRow labelKey="result.Sb" value={s3.Sb} unitKey="result.Sb.unit" decimals={2} />
                <ResultRow labelKey="result.Sa" value={s3.Sa} unitKey="result.Sa.unit" decimals={2} />
                <ResultRow labelKey="result.Bd2" value={s3.Bd2} unitKey="result.Bd2.unit" />
                <ResultRow labelKey="result.Bcr" value={s3.Bcr} unitKey="result.Bcr.unit" />
              </tbody>
            </table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
