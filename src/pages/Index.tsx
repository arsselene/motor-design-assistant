import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/context/LanguageContext';
import { ThemeToggle } from '@/components/ThemeToggle';
import { LanguageToggle } from '@/components/LanguageToggle';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CircleDot, Zap, Calculator, BookOpen } from 'lucide-react';

const Index = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/80 backdrop-blur-sm">
        <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <CircleDot className="h-6 w-6 text-primary" />
            <h1 className="text-lg font-bold tracking-tight">{t('app.title')}</h1>
          </div>
          <div className="flex items-center gap-1">
            <LanguageToggle />
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Hero */}
      <main className="max-w-5xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            <Zap className="h-3.5 w-3.5" />
            MAS Dimensioning Tool
          </div>
          <h2 className="text-4xl font-bold tracking-tight mb-4">
            {t('app.subtitle')}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Dimensionnement complet d'un moteur asynchrone triphasé à cage d'écureuil
            selon le polycopié "Conception MAS 2026"
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3 mb-12">
          <Card className="hover:shadow-md transition-shadow">
            <CardHeader>
              <Calculator className="h-8 w-8 text-primary mb-2" />
              <CardTitle className="text-lg">7 étapes de calcul</CardTitle>
              <CardDescription>
                Du cahier des charges au diagramme du cercle, toutes les formules du polycopié
              </CardDescription>
            </CardHeader>
          </Card>
          <Card className="hover:shadow-md transition-shadow">
            <CardHeader>
              <Zap className="h-8 w-8 text-primary mb-2" />
              <CardTitle className="text-lg">Calcul instantané</CardTitle>
              <CardDescription>
                Résultats en temps réel avec interpolation des courbes et tables intégrées
              </CardDescription>
            </CardHeader>
          </Card>
          <Card className="hover:shadow-md transition-shadow">
            <CardHeader>
              <BookOpen className="h-8 w-8 text-primary mb-2" />
              <CardTitle className="text-lg">Fidèle au document</CardTitle>
              <CardDescription>
                Toutes les tables (1–6.2) et courbes (Figures 1–7) du polycopié intégrées
              </CardDescription>
            </CardHeader>
          </Card>
        </div>

        <div className="text-center">
          <Button size="lg" onClick={() => navigate('/calculator')} className="gap-2 text-base px-8">
            <Calculator className="h-5 w-5" />
            {t('app.newProject')}
          </Button>
        </div>
      </main>
    </div>
  );
};

export default Index;
