import { useCalculation } from '@/context/CalculationContext';
import { useLanguage } from '@/context/LanguageContext';
import { InputField } from '@/components/InputField';
import { ResultRow } from '@/components/ResultRow';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';

export default function Step2Stator() {
  const { input, updateInput, results } = useCalculation();
  const { t } = useLanguage();
  const s2 = results?.step2;

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card>
        <CardHeader><CardTitle className="text-base">{t('common.input')}</CardTitle></CardHeader>
        <CardContent className="grid gap-4">
          <InputField labelKey="field.q1" tooltipKey="field.q1.tooltip"
            value={input.q1 ?? 3} onChange={v => updateInput({ q1: v })} min={1} max={6} step={1} />
          <div className="space-y-1.5">
            <Label className="text-sm font-medium">{t('field.insulationClass')}</Label>
            <Select value={input.insulationClass ?? 'F'} onValueChange={v => updateInput({ insulationClass: v })}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="A">Classe A (105°C)</SelectItem>
                <SelectItem value="B">Classe B (130°C)</SelectItem>
                <SelectItem value="F">Classe F (155°C)</SelectItem>
                <SelectItem value="H">Classe H (180°C)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle className="text-base">{t('common.results')}</CardTitle></CardHeader>
        <CardContent>
          {s2 && (
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left text-xs font-medium text-muted-foreground py-2 px-3">{t('common.parameter')}</th>
                  <th className="text-right text-xs font-medium text-muted-foreground py-2 px-3">{t('common.value')}</th>
                  <th className="text-left text-xs font-medium text-muted-foreground py-2 px-3">{t('common.unit')}</th>
                </tr>
              </thead>
              <tbody>
                <ResultRow labelKey="result.Z1" value={s2.Z1} decimals={0} />
                <ResultRow labelKey="result.t1" value={s2.t1} unitKey="result.t1.unit" decimals={2} />
                <ResultRow labelKey="result.I1n" value={s2.I1n} unitKey="result.I1n.unit" decimals={2} />
                <ResultRow labelKey="result.Nc" value={s2.Nc} decimals={0} />
                <ResultRow labelKey="result.w1" value={s2.w1} decimals={0} />
                <ResultRow labelKey="result.Kw1" value={s2.Kw1} />
                <ResultRow labelKey="result.Sc" value={s2.Sc} unitKey="result.Sc.unit" />
                <ResultRow labelKey="result.dc" value={s2.dc} unitKey="result.dc.unit" />
                <ResultRow labelKey="result.Jc" value={s2.Jc} unitKey="result.Jc.unit" decimals={2} />
                <ResultRow labelKey="result.Phi" value={s2.Phi} unitKey="result.Phi.unit" decimals={5} />
                <ResultRow labelKey="result.Km" value={s2.Km} />
                <ResultRow labelKey="result.Bd1" value={s2.Bd1} unitKey="result.Bd1.unit" />
                <ResultRow labelKey="result.Bcs" value={s2.Bcs} unitKey="result.Bcs.unit" />
              </tbody>
            </table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
