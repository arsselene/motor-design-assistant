import { useCalculation } from '@/context/CalculationContext';
import { useLanguage } from '@/context/LanguageContext';
import { ResultRow } from '@/components/ResultRow';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function Step5Impedances() {
  const { results } = useCalculation();
  const { t } = useLanguage();
  const s5 = results?.step5;

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card>
        <CardHeader><CardTitle className="text-base">{t('common.results')}</CardTitle></CardHeader>
        <CardContent>
          {s5 && (
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left text-xs font-medium text-muted-foreground py-2 px-3">{t('common.parameter')}</th>
                  <th className="text-right text-xs font-medium text-muted-foreground py-2 px-3">{t('common.value')}</th>
                  <th className="text-left text-xs font-medium text-muted-foreground py-2 px-3">{t('common.unit')}</th>
                </tr>
              </thead>
              <tbody>
                <ResultRow labelKey="result.r1" value={s5.r1} unitKey="result.r1.unit" decimals={4} />
                <ResultRow labelKey="result.r2" value={s5.r2} unitKey="result.r2.unit" decimals={6} />
                <ResultRow labelKey="result.r2_prime" value={s5.r2_prime} unitKey="result.r1.unit" decimals={4} />
                <ResultRow labelKey="result.X1" value={s5.X1} unitKey="result.X1.unit" decimals={4} />
                <ResultRow labelKey="result.X2_prime" value={s5.X2_prime} unitKey="result.X1.unit" decimals={4} />
                <ResultRow labelKey="result.Lc" value={s5.Lc} unitKey="result.Lc.unit" decimals={0} />
              </tbody>
            </table>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle className="text-base">Per Unit</CardTitle></CardHeader>
        <CardContent>
          {s5 && (
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left text-xs font-medium text-muted-foreground py-2 px-3">{t('common.parameter')}</th>
                  <th className="text-right text-xs font-medium text-muted-foreground py-2 px-3">{t('common.value')}</th>
                  <th className="text-left text-xs font-medium text-muted-foreground py-2 px-3">p.u.</th>
                </tr>
              </thead>
              <tbody>
                <ResultRow labelKey="result.r1" value={s5.r1_pu} decimals={4} />
                <ResultRow labelKey="result.r2_prime" value={s5.r2_pu} decimals={4} />
                <ResultRow labelKey="result.X1" value={s5.x1_pu} decimals={4} />
                <ResultRow labelKey="result.X2_prime" value={s5.x2_pu} decimals={4} />
              </tbody>
            </table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
