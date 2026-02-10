import { useCalculation } from '@/context/CalculationContext';
import { useLanguage } from '@/context/LanguageContext';
import { InputField } from '@/components/InputField';
import { ResultRow } from '@/components/ResultRow';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function Step1Specifications() {
  const { input, updateInput, results } = useCalculation();
  const { t } = useLanguage();
  const s1 = results?.step1;

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {/* Inputs */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">{t('common.input')}</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-2">
          <InputField labelKey="field.Pn" unitKey="field.Pn.unit" tooltipKey="field.Pn.tooltip"
            value={input.Pn} onChange={v => updateInput({ Pn: v })} min={0.1} max={500} step={0.5} />
          <InputField labelKey="field.n" unitKey="field.n.unit" tooltipKey="field.n.tooltip"
            value={input.n} onChange={v => updateInput({ n: v })} min={100} max={6000} step={50} />
          <InputField labelKey="field.V" unitKey="field.V.unit" tooltipKey="field.V.tooltip"
            value={input.V} onChange={v => updateInput({ V: v })} min={100} max={6000} step={10} />
          <InputField labelKey="field.f" unitKey="field.f.unit" tooltipKey="field.f.tooltip"
            value={input.f} onChange={v => updateInput({ f: v })} min={25} max={400} step={5} />
          <InputField labelKey="field.cosPhi" tooltipKey="field.cosPhi.tooltip"
            value={input.cosPhi ?? ''} onChange={v => updateInput({ cosPhi: v || undefined })}
            min={0.5} max={1} step={0.01} placeholder={t('common.auto')} />
          <InputField labelKey="field.eta" tooltipKey="field.eta.tooltip"
            value={input.eta ?? ''} onChange={v => updateInput({ eta: v || undefined })}
            min={0.5} max={1} step={0.01} placeholder={t('common.auto')} />
        </CardContent>
      </Card>

      {/* Results */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">{t('common.results')}</CardTitle>
        </CardHeader>
        <CardContent>
          {s1 && (
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left text-xs font-medium text-muted-foreground py-2 px-3">{t('common.parameter')}</th>
                  <th className="text-right text-xs font-medium text-muted-foreground py-2 px-3">{t('common.value')}</th>
                  <th className="text-left text-xs font-medium text-muted-foreground py-2 px-3">{t('common.unit')}</th>
                </tr>
              </thead>
              <tbody>
                <ResultRow labelKey="result.poles2p" value={s1.poles2p} decimals={0} />
                <ResultRow labelKey="result.ns" value={s1.ns} unitKey="result.ns.unit" decimals={0} />
                <ResultRow labelKey="field.cosPhi" value={s1.cosPhi} />
                <ResultRow labelKey="field.eta" value={s1.eta} />
                <ResultRow labelKey="result.ke" value={s1.ke} tooltipKey="result.ke.tooltip" />
                <ResultRow labelKey="result.Dint" value={s1.Dint} unitKey="result.Dint.unit" tooltipKey="result.Dint.tooltip" decimals={1} />
                <ResultRow labelKey="result.Dext" value={s1.Dext} unitKey="result.Dext.unit" decimals={0} />
                <ResultRow labelKey="result.delta" value={s1.delta} unitKey="result.delta.unit" />
                <ResultRow labelKey="result.Drotor" value={s1.Drotor} unitKey="result.Drotor.unit" decimals={1} />
                <ResultRow labelKey="result.tau" value={s1.tau} unitKey="result.tau.unit" decimals={1} />
                <ResultRow labelKey="result.ls" value={s1.ls} unitKey="result.ls.unit" decimals={1} />
                <ResultRow labelKey="result.A" value={s1.A} unitKey="result.A.unit" decimals={0} />
                <ResultRow labelKey="result.Bdelta" value={s1.Bdelta} unitKey="result.Bdelta.unit" />
                <ResultRow labelKey="result.I1n" value={s1.I1n} unitKey="result.I1n.unit" decimals={2} />
                <ResultRow labelKey="result.Pa" value={s1.Pa} unitKey="result.Pa.unit" decimals={0} />
              </tbody>
            </table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
