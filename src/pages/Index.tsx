import ExpenseCalculator from '@/components/ExpenseCalculator';
import heroImage from '@/assets/japan-hero.jpg';
const Index = () => {
  return <div className="min-h-screen bg-gradient-to-br from-background to-japan-red-light">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="h-96 bg-cover bg-center relative" style={{
        backgroundImage: `url(${heroImage})`
      }}>
          <div className="absolute inset-0 bg-gradient-to-r from-japan-navy/80 to-japan-red/60"></div>
          <div className="relative z-10 container mx-auto px-4 h-full flex items-center">
            <div className="text-white max-w-2xl">
              <h1 className="text-5xl font-bold mb-4 leading-tight">
                Intercâmbio no
                <span className="text-japan-gold block">Japão 🇯🇵</span>
              </h1>
              <p className="text-xl leading-relaxed text-white/90">Planeje seus gastos e realize o sonho de estudar no país do sol nascente. Calcule custos de moradia, escola, e muito mais!</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8 -mt-20 relative z-20">
        <ExpenseCalculator />
      </div>

      {/* Footer */}
      <footer className="bg-japan-navy text-white py-8 mt-16">
        <div className="container mx-auto px-4 text-center">
          <p className="text-white/80">
            💡 Dica: Os valores são estimativas baseadas em médias de mercado. 
            Consulte sempre as fontes oficiais para informações atualizadas.
          </p>
          <p className="text-white/60 text-sm mt-2">
            Desenvolvido para intercambistas brasileiros
          </p>
          <p className="text-white/60 text-sm">Developed By: Mauro l ABRIL/2028</p>
        </div>
      </footer>
    </div>;
};
export default Index;