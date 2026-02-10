import { useCalculation } from '@/context/CalculationContext';
import { useLanguage } from '@/context/LanguageContext';
import { ResultRow } from '@/components/ResultRow';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function Step4MMF() {
  const { results } = useCalculation();
  const { t } = useLanguage();
  const s4 = results?.step4;

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card className="lg:col-span-2">
        <CardHeader><CardTitle className="text-base">{t('common.results')}</CardTitle></CardHeader>
        <CardContent>
          {s4 && (
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left text-xs font-medium text-muted-foreground py-2 px-3">{t('common.parameter')}</th>
                  <th className="text-right text-xs font-medium text-muted-foreground py-2 px-3">{t('common.value')}</th>
                  <th className="text-left text-xs font-medium text-muted-foreground py-2 px-3">{t('common.unit')}</th>
                </tr>
              </thead>
              <tbody>
                <ResultRow labelKey="result.Kdelta" value={s4.Kdelta} />
                <ResultRow labelKey="result.Fdelta" value={s4.Fdelta} unitKey="result.Fdelta.unit" decimals={1} />
                <ResultRow labelKey="result.Fd1" value={s4.Fd1} unitKey="result.Fdelta.unit" decimals={1} />
                <ResultRow labelKey="result.Fd2" value={s4.Fd2} unitKey="result.Fdelta.unit" decimals={1} />
                <ResultRow labelKey="result.Fcs" value={s4.Fcs} unitKey="result.Fdelta.unit" decimals={1} />
                <ResultRow labelKey="result.Fcr" value={s4.Fcr} unitKey="result.Fdelta.unit" decimals={1} />
                <ResultRow labelKey="result.Ftotal" value={s4.Ftotal} unitKey="result.Ftotal.unit" decimals={1} />
                <ResultRow labelKey="result.Ksat" value={s4.Ksat} />
                <ResultRow labelKey="result.Im" value={s4.Im} unitKey="result.Im.unit" decimals={2} />
              </tbody>
            </table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
