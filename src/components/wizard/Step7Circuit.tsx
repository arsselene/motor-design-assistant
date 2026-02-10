import { useCalculation } from '@/context/CalculationContext';
import { useLanguage } from '@/context/LanguageContext';
import { ResultRow } from '@/components/ResultRow';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function Step7Circuit() {
  const { results } = useCalculation();
  const { t } = useLanguage();
  const s7 = results?.step7;

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card>
        <CardHeader><CardTitle className="text-base">{t('common.results')}</CardTitle></CardHeader>
        <CardContent>
          {s7 && (
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left text-xs font-medium text-muted-foreground py-2 px-3">{t('common.parameter')}</th>
                  <th className="text-right text-xs font-medium text-muted-foreground py-2 px-3">{t('common.value')}</th>
                  <th className="text-left text-xs font-medium text-muted-foreground py-2 px-3">{t('common.unit')}</th>
                </tr>
              </thead>
              <tbody>
                <ResultRow labelKey="result.C1" value={s7.C1} />
                <ResultRow labelKey="result.rcc" value={s7.rcc} unitKey="result.r1.unit" decimals={4} />
                <ResultRow labelKey="result.xcc" value={s7.xcc} unitKey="result.X1.unit" decimals={4} />
                <ResultRow labelKey="result.P0" value={s7.P0} unitKey="result.P0.unit" decimals={1} />
                <ResultRow labelKey="result.I0" value={s7.I0} unitKey="result.I0.unit" decimals={2} />
                <ResultRow labelKey="result.cosPhi0" value={s7.cosPhi0} />
                <ResultRow labelKey="result.Dc" value={s7.Dc} unitKey="result.Dc.unit" decimals={1} />
              </tbody>
            </table>
          )}
        </CardContent>
      </Card>

      {/* Simplified equivalent circuit SVG */}
      <Card>
        <CardHeader><CardTitle className="text-base">
          {t('step.7.full')}
        </CardTitle></CardHeader>
        <CardContent className="flex items-center justify-center">
          {results?.step5 && results?.step7 && (
            <svg viewBox="0 0 400 200" className="w-full max-w-md text-foreground" fill="none" stroke="currentColor" strokeWidth="1.5">
              {/* Stator branch */}
              <text x="10" y="30" className="text-[10px] fill-current" stroke="none">V₁</text>
              <line x1="30" y1="40" x2="30" y2="160" />
              <line x1="30" y1="40" x2="80" y2="40" />
              {/* r1 */}
              <rect x="80" y="32" width="40" height="16" className="fill-background" />
              <text x="88" y="44" className="text-[8px] fill-current" stroke="none">r₁</text>
              <line x1="120" y1="40" x2="150" y2="40" />
              {/* X1 */}
              <path d="M150,40 Q160,25 170,40 Q180,55 190,40" />
              <text x="158" y="60" className="text-[8px] fill-current" stroke="none">X₁</text>
              <line x1="190" y1="40" x2="220" y2="40" />
              {/* Magnetizing branch */}
              <line x1="220" y1="40" x2="220" y2="100" />
              <path d="M210,70 Q220,55 230,70 Q220,85 210,70" />
              <text x="235" y="75" className="text-[8px] fill-current" stroke="none">Xm</text>
              <line x1="220" y1="100" x2="220" y2="160" />
              {/* Rotor branch */}
              <line x1="220" y1="40" x2="270" y2="40" />
              {/* r2' */}
              <rect x="270" y="32" width="40" height="16" className="fill-background" />
              <text x="275" y="44" className="text-[8px] fill-current" stroke="none">r₂'</text>
              <line x1="310" y1="40" x2="340" y2="40" />
              {/* X2' */}
              <path d="M340,40 Q350,25 360,40 Q370,55 380,40" />
              <text x="348" y="60" className="text-[8px] fill-current" stroke="none">X₂'</text>
              <line x1="380" y1="40" x2="380" y2="160" />
              {/* Bottom line */}
              <line x1="30" y1="160" x2="380" y2="160" />
              {/* Ground dots */}
              <circle cx="220" cy="40" r="3" className="fill-primary" />
            </svg>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
