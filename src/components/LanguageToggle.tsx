import { Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/context/LanguageContext';

export function LanguageToggle() {
  const { lang, setLang } = useLanguage();

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => setLang(lang === 'fr' ? 'en' : 'fr')}
      className="gap-1.5 font-medium"
    >
      <Globe className="h-4 w-4" />
      {lang === 'fr' ? 'EN' : 'FR'}
    </Button>
  );
}
