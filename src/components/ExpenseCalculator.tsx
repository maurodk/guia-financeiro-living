import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Calculator, Home, GraduationCap, Plane, Users, DollarSign, CreditCard, ChevronDown, ChevronUp, Info } from 'lucide-react';
interface HousingOption {
  id: string;
  name: string;
  type: string;
  firstMonth: {
    min: number;
    max: number;
  };
  monthlyAfter?: {
    min: number;
    max: number;
  };
  entranceFee?: number;
  additionalCosts?: {
    min: number;
    max: number;
    description?: string;
  };
  notes?: string;
  details?: string[];
}
interface SchoolOption {
  id: string;
  name: string;
  selectionFee: number;
  firstSemester: number;
  transport: number;
  accommodationSemestral: {
    min: number;
    max: number;
  };
  accommodationEntrance: number;
  accommodationMaintenance: number;
  total: {
    min: number;
    max: number;
  };
  dailyBalance: number;
  annualIncome: number;
  transportIncluded: boolean;
  accommodationIncluded: boolean;
  details?: string[];
}
interface ExpenseCategory {
  id: string;
  name: string;
  amount: number;
  currency: 'JPY' | 'BRL';
  isCustom: boolean;
  isIgnored: boolean;
}
const housingOptions: HousingOption[] = [{
  id: 'eheya',
  name: 'Eheya Net いい部屋ネット',
  type: 'Apartamento',
  firstMonth: {
    min: 320000,
    max: 450000
  },
  monthlyAfter: {
    min: 60000,
    max: 80000
  },
  notes: 'Apartamento tradicional japonês',
  details: ['Apartamento tradicional com privacidade total', 'Primeira locação exige taxas administrativas altas', 'Ideal para quem busca independência', 'Necessário fiador japonês ou empresa de garantia']
}, {
  id: 'begood',
  name: 'BeGood Japan',
  type: 'Residência Estudantil',
  firstMonth: {
    min: 80000,
    max: 100000
  },
  entranceFee: 16500,
  notes: 'Taxa varia conforme duração da estadia',
  details: ['Residência específica para estudantes estrangeiros', 'Taxa de entrada varia: 1 mês ¥33.000, 2 meses ¥27.500, 3 meses ¥22.000, 4+ meses ¥16.500', 'Comunidade internacional', 'Suporte em inglês disponível']
}, {
  id: 'xross-share',
  name: 'Xross House - Sharehouse',
  type: 'Casa Compartilhada',
  firstMonth: {
    min: 56100,
    max: 126100
  },
  monthlyAfter: {
    min: 25000,
    max: 75000
  },
  additionalCosts: {
    min: 1100,
    max: 1100,
    description: "Taxa de condomínio mensal de ¥1.100"
  },
  notes: 'Inclui taxa de condomínio',
  details: ['Casa compartilhada com outros residentes', 'Taxa de condomínio mensal de ¥1.100', 'Áreas comuns compartilhadas (cozinha, sala)', 'Quarto privativo com móveis básicos', 'Ideal para socialização e economia']
}, {
  id: 'xross-studio',
  name: 'Xross House - Quitinete',
  type: 'Estúdio',
  firstMonth: {
    min: 101100,
    max: 191000
  },
  monthlyAfter: {
    min: 56100,
    max: 126100
  },
  additionalCosts: {
    min: 15000,
    max: 20000,
    description: "Utilities (água, gás, luz e WiFi) estimados em ¥15.000-20.000 por mês"
  },
  notes: 'Água, gás, luz e WiFi não inclusos',
  details: ['Quitinete completa com privacidade', 'Água, gás, luz e WiFi custam aproximadamente ¥15.000-20.000/mês', 'Cozinha e banheiro privativos', 'Mobiliado com o básico', 'Localização conveniente próximo a estações']
}];
const schoolOptions: SchoolOption[] = [{
  id: 'sakuragaoka',
  name: 'Tokyo Sakuragaoka',
  selectionFee: 20000,
  firstSemester: 400000,
  transport: 0,
  accommodationSemestral: {
    min: 138000,
    max: 270000
  },
  accommodationEntrance: 30000,
  accommodationMaintenance: 30000,
  total: {
    min: 618000,
    max: 750000
  },
  dailyBalance: 2000000,
  annualIncome: 1000000,
  transportIncluded: true,
  accommodationIncluded: true,
  details: ['Taxa de seleção: ¥20.000', 'Primeiro semestre: ¥400.000', 'Transporte incluído', 'Acomodação incluída: ¥138.000 - ¥270.000', 'Taxa de entrada da acomodação: ¥30.000', 'Taxa de manutenção: ¥30.000']
}, {
  id: 'mirai-gakuen',
  name: 'Mirai Gakuen',
  selectionFee: 20000,
  firstSemester: 415000,
  transport: 0,
  accommodationSemestral: {
    min: 180000,
    max: 180000
  },
  accommodationEntrance: 80000,
  accommodationMaintenance: 0,
  total: {
    min: 695000,
    max: 695000
  },
  dailyBalance: 2000000,
  annualIncome: 2500000,
  transportIncluded: true,
  accommodationIncluded: true,
  details: ['Taxa de seleção: ¥20.000', 'Primeiro semestre: ¥415.000', 'Transporte incluído', 'Acomodação incluída: ¥180.000', 'Taxa de entrada da acomodação: ¥80.000', 'Renda anual necessária: ¥2.500.000']
}, {
  id: 'human-academy',
  name: 'Human Academy',
  selectionFee: 27500,
  firstSemester: 489500,
  transport: 0,
  accommodationSemestral: {
    min: 0,
    max: 0
  },
  accommodationEntrance: 0,
  accommodationMaintenance: 0,
  total: {
    min: 517000,
    max: 517000
  },
  dailyBalance: 1700000,
  annualIncome: 1700000,
  transportIncluded: false,
  accommodationIncluded: false,
  details: ['Taxa de seleção: ¥27.500', 'Primeiro semestre: ¥489.500', 'Transporte e acomodação não inclusos', 'Escola focada em tecnologia e design', 'Renda anual necessária: ¥1.700.000']
}, {
  id: 'isi-shinjuku',
  name: 'ISI International Study Institute (Shinjuku)',
  selectionFee: 33000,
  firstSemester: 519000,
  transport: 0,
  accommodationSemestral: {
    min: 0,
    max: 0
  },
  accommodationEntrance: 0,
  accommodationMaintenance: 0,
  total: {
    min: 552000,
    max: 552000
  },
  dailyBalance: 1500000,
  annualIncome: 1500000,
  transportIncluded: false,
  accommodationIncluded: false,
  details: ['Taxa de seleção: ¥33.000', 'Primeiro semestre: ¥519.000', 'Localização central em Shinjuku', 'Escola especializada em língua japonesa', 'Suporte para estudantes internacionais']
}, {
  id: 'isi-ikebukuro',
  name: 'ISI International Study Institute (Ikebukuro)',
  selectionFee: 33000,
  firstSemester: 493000,
  transport: 0,
  accommodationSemestral: {
    min: 0,
    max: 0
  },
  accommodationEntrance: 0,
  accommodationMaintenance: 0,
  total: {
    min: 526000,
    max: 526000
  },
  dailyBalance: 1500000,
  annualIncome: 1500000,
  transportIncluded: false,
  accommodationIncluded: false,
  details: ['Taxa de seleção: ¥33.000', 'Primeiro semestre: ¥493.000', 'Localização em Ikebukuro', 'Mesmo grupo ISI, campus diferente', 'Ambiente multicultural']
}, {
  id: 'isi-shibuya',
  name: 'ISI Career and Language Academy (Shibuya)',
  selectionFee: 33000,
  firstSemester: 514000,
  transport: 0,
  accommodationSemestral: {
    min: 0,
    max: 0
  },
  accommodationEntrance: 0,
  accommodationMaintenance: 0,
  total: {
    min: 547000,
    max: 547000
  },
  dailyBalance: 1500000,
  annualIncome: 1500000,
  transportIncluded: false,
  accommodationIncluded: false,
  details: ['Taxa de seleção: ¥33.000', 'Primeiro semestre: ¥514.000', 'Localização em Shibuya', 'Foco em carreira e idioma', 'Oportunidades de networking']
}, {
  id: 'labo-japanese',
  name: 'Labo Japanese Language Institute',
  selectionFee: 20000,
  firstSemester: 390000,
  transport: 0,
  accommodationSemestral: {
    min: 240000,
    max: 480000
  },
  accommodationEntrance: 30000,
  accommodationMaintenance: 30000,
  total: {
    min: 710000,
    max: 950000
  },
  dailyBalance: 1800000,
  annualIncome: 1800000,
  transportIncluded: false,
  accommodationIncluded: false,
  details: ['Taxa de seleção: ¥20.000', 'Primeiro semestre: ¥390.000', 'Acomodação: ¥240.000 - ¥480.000', 'Taxa de entrada da acomodação: ¥30.000', 'Taxa de manutenção: ¥30.000']
}, {
  id: 'yu-language',
  name: 'Yu Language Academy',
  selectionFee: 30000,
  firstSemester: 460000,
  transport: 0,
  accommodationSemestral: {
    min: 260000,
    max: 280000
  },
  accommodationEntrance: 0,
  accommodationMaintenance: 0,
  total: {
    min: 642000,
    max: 770000
  },
  dailyBalance: 1900000,
  annualIncome: 1900000,
  transportIncluded: false,
  accommodationIncluded: false,
  details: ['Taxa de seleção: ¥30.000', 'Primeiro semestre: ¥460.000', 'Acomodação: ¥260.000 - ¥280.000', 'Taxa de entrada e manutenção inclusas', 'Ambiente acolhedor para estudantes']
}, {
  id: 'tomonoshi',
  name: 'Tomonoshi Japanese Language Academy',
  selectionFee: 20000,
  firstSemester: 479000,
  transport: 0,
  accommodationSemestral: {
    min: 372000,
    max: 372000
  },
  accommodationEntrance: 38000,
  accommodationMaintenance: 0,
  total: {
    min: 807000,
    max: 1013400
  },
  dailyBalance: 2100000,
  annualIncome: 2100000,
  transportIncluded: false,
  accommodationIncluded: false,
  details: ['Taxa de seleção: ¥20.000', 'Primeiro semestre: ¥479.000', 'Acomodação: ¥372.000', 'Taxa de entrada da acomodação: ¥38.000', 'Taxa de manutenção inclusa']
}, {
  id: 'ohara',
  name: 'O-Hara Japanese Language School',
  selectionFee: 30000,
  firstSemester: 425000,
  transport: 0,
  accommodationSemestral: {
    min: 0,
    max: 0
  },
  accommodationEntrance: 0,
  accommodationMaintenance: 0,
  total: {
    min: 455000,
    max: 455000
  },
  dailyBalance: 1600000,
  annualIncome: 1600000,
  transportIncluded: false,
  accommodationIncluded: false,
  details: ['Taxa de seleção: ¥30.000', 'Primeiro semestre: ¥425.000', 'Transporte e acomodação não inclusos', 'Escola tradicional japonesa', 'Foco em disciplina e excelência acadêmica']
}, {
  id: 'syonan',
  name: 'Syonan Japanese Academy',
  selectionFee: 33000,
  firstSemester: 748000,
  transport: 0,
  accommodationSemestral: {
    min: 138000,
    max: 138000
  },
  accommodationEntrance: 25000,
  accommodationMaintenance: 24000,
  total: {
    min: 968000,
    max: 968000
  },
  dailyBalance: 2200000,
  annualIncome: 2200000,
  transportIncluded: false,
  accommodationIncluded: false,
  details: ['Taxa de seleção: ¥33.000', 'Primeiro semestre: ¥748.000', 'Acomodação: ¥138.000', 'Taxa de entrada da acomodação: ¥25.000', 'Taxa de manutenção: ¥24.000 (¥12.000 seguro + ¥12.000 utensílios)']
}, {
  id: 'yokohama-design',
  name: 'Yokohama Design College',
  selectionFee: 25000,
  firstSemester: 485000,
  transport: 0,
  accommodationSemestral: {
    min: 300000,
    max: 300000
  },
  accommodationEntrance: 40000,
  accommodationMaintenance: 0,
  total: {
    min: 850000,
    max: 850000
  },
  dailyBalance: 2000000,
  annualIncome: 2000000,
  transportIncluded: false,
  accommodationIncluded: false,
  details: ['Taxa de seleção: ¥25.000', 'Primeiro semestre: ¥485.000', 'Acomodação: ¥300.000', 'Taxa de entrada da acomodação: ¥40.000', 'Taxa de manutenção inclusa', 'Foco em design e artes visuais']
}];
const ExpenseCalculator = () => {
  const [selectedHousing, setSelectedHousing] = useState<string>('');
  const [selectedSchool, setSelectedSchool] = useState<string>('');
  const [exchangeRate, setExchangeRate] = useState<number>(0.033); // 1 JPY = 0.033 BRL aproximadamente
  const [months, setMonths] = useState<number>(6);
  const [showHousingDetails, setShowHousingDetails] = useState<boolean>(false);
  const [showSchoolDetails, setShowSchoolDetails] = useState<boolean>(false);
  const [customExpenses, setCustomExpenses] = useState<ExpenseCategory[]>([{
    id: 'school',
    name: 'Escola',
    amount: 200000,
    currency: 'JPY',
    isCustom: true,
    isIgnored: false
  }, {
    id: 'flight',
    name: 'Passagem Aérea',
    amount: 3000,
    currency: 'BRL',
    isCustom: true,
    isIgnored: false
  }, {
    id: 'advisory',
    name: 'Assessoria',
    amount: 1500,
    currency: 'BRL',
    isCustom: true,
    isIgnored: false
  }, {
    id: 'food',
    name: 'Alimentação (mensal)',
    amount: 40000,
    currency: 'JPY',
    isCustom: true,
    isIgnored: false
  }, {
    id: 'transport',
    name: 'Transporte (mensal)',
    amount: 15000,
    currency: 'JPY',
    isCustom: true,
    isIgnored: false
  }]);
  const [totalJPY, setTotalJPY] = useState<number>(0);
  const [totalBRL, setTotalBRL] = useState<number>(0);

  // Função para verificar se a escola selecionada tem acomodação inclusa
  const getSelectedSchoolWithAccommodation = () => {
    if (!selectedSchool) return false;
    const school = schoolOptions.find(s => s.id === selectedSchool);
    return school?.accommodationIncluded || false;
  };

  // Limpar seleção de moradia quando escola com acomodação for selecionada
  useEffect(() => {
    if (getSelectedSchoolWithAccommodation() && selectedHousing) {
      setSelectedHousing('');
    }
  }, [selectedSchool]);
  const calculateTotal = () => {
    let total = 0;

    // Custos de moradia (só considerar se a escola não inclui acomodação)
    if (selectedHousing && !getSelectedSchoolWithAccommodation()) {
      const housing = housingOptions.find(h => h.id === selectedHousing);
      if (housing) {
        // Primeiro mês
        const firstMonthAvg = (housing.firstMonth.min + housing.firstMonth.max) / 2;
        total += firstMonthAvg;

        // Meses subsequentes
        if (housing.monthlyAfter && months > 1) {
          const monthlyAvg = (housing.monthlyAfter.min + housing.monthlyAfter.max) / 2;
          total += monthlyAvg * (months - 1);
        }

        // Taxa de entrada
        if (housing.entranceFee) {
          total += housing.entranceFee;
        }

        // Custos adicionais mensais
        if (housing.additionalCosts) {
          const additionalAvg = (housing.additionalCosts.min + housing.additionalCosts.max) / 2;
          total += additionalAvg * months;
        }
      }
    }

    // Custos da escola
    if (selectedSchool) {
      const school = schoolOptions.find(s => s.id === selectedSchool);
      if (school) {
        total += school.selectionFee;
        total += school.firstSemester;
        if (!school.transportIncluded && school.transport > 0) {
          total += school.transport;
        }

        // Incluir custos de acomodação sempre que houver valores, independente se está inclusa ou não
        if (school.accommodationSemestral.min > 0) {
          const accommodationAvg = (school.accommodationSemestral.min + school.accommodationSemestral.max) / 2;
          total += accommodationAvg;
        }
        if (school.accommodationEntrance > 0) {
          total += school.accommodationEntrance;
        }
        if (school.accommodationMaintenance > 0) {
          total += school.accommodationMaintenance;
        }
      }
    }

    // Outros gastos (filtrar escola se já selecionada)
    customExpenses.forEach(expense => {
      // Se escola foi selecionada, não incluir o gasto customizado de escola
      if (expense.id === 'school' && selectedSchool) {
        return;
      }

      // Se o gasto está marcado para ser ignorado, não incluir no cálculo
      if (expense.isIgnored) {
        return;
      }
      let expenseValueInJPY = expense.amount;

      // Converter BRL para JPY se necessário
      if (expense.currency === 'BRL') {
        expenseValueInJPY = expense.amount / exchangeRate;
      }
      if (expense.id === 'food' || expense.id === 'transport') {
        total += expenseValueInJPY * months;
      } else {
        total += expenseValueInJPY;
      }
    });
    setTotalJPY(total);
    setTotalBRL(total * exchangeRate);
  };
  useEffect(() => {
    calculateTotal();
  }, [selectedHousing, selectedSchool, months, customExpenses, exchangeRate]);
  const updateCustomExpense = (id: string, amount: number) => {
    setCustomExpenses(prev => prev.map(expense => expense.id === id ? {
      ...expense,
      amount
    } : expense));
  };
  const updateCustomExpenseCurrency = (id: string, currency: 'JPY' | 'BRL') => {
    setCustomExpenses(prev => prev.map(expense => expense.id === id ? {
      ...expense,
      currency
    } : expense));
  };
  const toggleExpenseIgnore = (id: string) => {
    setCustomExpenses(prev => prev.map(expense => expense.id === id ? {
      ...expense,
      isIgnored: !expense.isIgnored
    } : expense));
  };
  const getHousingDisplay = () => {
    if (!selectedHousing) return null;
    const housing = housingOptions.find(h => h.id === selectedHousing);
    if (!housing) return null;
    return <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">Primeiro mês:</span>
          <span className="text-japan-red font-bold">
            ¥{housing.firstMonth.min.toLocaleString()} - ¥{housing.firstMonth.max.toLocaleString()}
          </span>
        </div>
        {housing.monthlyAfter && <>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Meses seguintes:</span>
              <span className="text-japan-red font-bold">
                ¥{housing.monthlyAfter.min.toLocaleString()} - ¥{housing.monthlyAfter.max.toLocaleString()}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Média Total:</span>
              <span className="text-japan-red font-bold">
                ¥{Math.round((housing.monthlyAfter.min + housing.monthlyAfter.max) / 2).toLocaleString()}
              </span>
            </div>
          </>}
        {housing.entranceFee && <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Taxa de entrada:</span>
            <span className="text-japan-red font-bold">¥{housing.entranceFee.toLocaleString()}</span>
          </div>}
        {housing.notes && <p className="text-xs text-muted-foreground italic">{housing.notes}</p>}
        
        {housing.details && <div className="mt-3">
            <Button variant="ghost" size="sm" onClick={() => setShowHousingDetails(!showHousingDetails)} className="text-japan-red hover:text-japan-red/80 p-0 h-auto font-normal">
              <Info className="w-3 h-3 mr-1" />
              {showHousingDetails ? 'Ocultar detalhes' : 'Ver mais detalhes'}
              {showHousingDetails ? <ChevronUp className="w-3 h-3 ml-1" /> : <ChevronDown className="w-3 h-3 ml-1" />}
            </Button>
            
            {showHousingDetails && <div className="mt-2 p-3 bg-white/50 rounded-lg">
                <ul className="text-xs space-y-1">
                  {housing.details.map((detail, index) => <li key={index} className="flex items-start">
                      <span className="w-1 h-1 bg-japan-red rounded-full mt-2 mr-2 flex-shrink-0"></span>
                      {detail}
                    </li>)}
                </ul>
              </div>}
          </div>}
      </div>;
  };
  const getSchoolDisplay = () => {
    if (!selectedSchool) return null;
    const school = schoolOptions.find(s => s.id === selectedSchool);
    if (!school) return null;
    return <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">Taxa de seleção:</span>
          <span className="text-japan-red font-bold">¥{school.selectionFee.toLocaleString()}</span>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">Primeiro semestre:</span>
          <span className="text-japan-red font-bold">¥{school.firstSemester.toLocaleString()}</span>
        </div>
        
        {!school.transportIncluded && school.transport > 0 && <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Transporte:</span>
            <span className="text-japan-red font-bold">¥{school.transport.toLocaleString()}</span>
          </div>}
        
        {school.transportIncluded && <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Transporte:</span>
            <Badge variant="secondary" className="text-xs">Incluído</Badge>
          </div>}
        
        {school.accommodationSemestral.min > 0 && <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Acomodação semestral:</span>
            <span className="text-japan-red font-bold">
              ¥{school.accommodationSemestral.min.toLocaleString()} 
              {school.accommodationSemestral.max !== school.accommodationSemestral.min && ` - ¥${school.accommodationSemestral.max.toLocaleString()}`}
            </span>
          </div>}
        
        {school.accommodationIncluded && school.accommodationSemestral.min === 0 && <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Acomodação:</span>
            <Badge variant="secondary" className="text-xs">Incluída</Badge>
          </div>}
        
        <div className="flex items-center justify-between font-medium border-t pt-2">
          <span className="text-sm">Total estimado:</span>
          <span className="text-japan-red font-bold">
            ¥{school.total.min.toLocaleString()}
            {school.total.max !== school.total.min && ` - ¥${school.total.max.toLocaleString()}`}
          </span>
        </div>
        
        {school.total.max !== school.total.min && <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Média Total:</span>
            <span className="text-japan-red font-bold">
              ¥{Math.round((school.total.min + school.total.max) / 2).toLocaleString()}
            </span>
          </div>}
        
        {school.details && <div className="mt-3">
            <Button variant="ghost" size="sm" onClick={() => setShowSchoolDetails(!showSchoolDetails)} className="text-japan-red hover:text-japan-red/80 p-0 h-auto font-normal">
              <Info className="w-3 h-3 mr-1" />
              {showSchoolDetails ? 'Ocultar detalhes' : 'Ver mais detalhes'}
              {showSchoolDetails ? <ChevronUp className="w-3 h-3 ml-1" /> : <ChevronDown className="w-3 h-3 ml-1" />}
            </Button>
            
            {showSchoolDetails && <div className="mt-2 p-3 bg-white/50 rounded-lg">
                <ul className="text-xs space-y-1">
                  {school.details.map((detail, index) => <li key={index} className="flex items-start">
                      <span className="w-1 h-1 bg-japan-red rounded-full mt-2 mr-2 flex-shrink-0"></span>
                      {detail}
                    </li>)}
                </ul>
              </div>}
          </div>}
      </div>;
  };
  return <div className="space-y-6">
      {/* Header Card */}
      <Card className="bg-gradient-to-r from-japan-red to-japan-navy text-white overflow-hidden relative">
        <div className="absolute inset-0 bg-black/10"></div>
        <CardContent className="relative z-10 pt-6">
          <div className="flex items-center space-x-3 mb-4">
            <Calculator className="w-8 h-8" />
            <h2 className="text-2xl font-bold">Calculadora de Intercâmbio</h2>
          </div>
          <p className="text-white/90">Baseado em valores compartilhados pela assessoria Living in Japan</p>
        </CardContent>
      </Card>

      {/* Configurações */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <DollarSign className="w-5 h-5 text-japan-red" />
            <span>Configurações</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
            <div className="flex-1">
              <Label htmlFor="exchange-rate">Taxa de Câmbio (1 JPY = ? BRL)</Label>
              <Input id="exchange-rate" type="number" step="0.001" value={exchangeRate} onChange={e => setExchangeRate(parseFloat(e.target.value) || 0)} className="mt-1" />
            </div>
            
            <div className="flex-1">
              <Label htmlFor="months">Duração da Estadia (meses)</Label>
              <Input id="months" type="number" min="1" value={months} onChange={e => setMonths(parseInt(e.target.value) || 1)} className="mt-1" />
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Moradia */}
        <Card className={getSelectedSchoolWithAccommodation() ? "opacity-60" : ""}>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Home className="w-5 h-5 text-japan-red" />
              <span>Moradia</span>
              {getSelectedSchoolWithAccommodation() && <Badge variant="secondary" className="text-xs">Não disponível</Badge>}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {getSelectedSchoolWithAccommodation() ? <div className="p-4 bg-muted/50 rounded-lg text-center">
                <p className="text-sm text-muted-foreground">
                  A escola selecionada já inclui acomodação semestral. 
                  A seleção de moradia não está disponível.
                </p>
              </div> : <>
                <div>
                  <Label>Opção de Moradia</Label>
                  <Select value={selectedHousing} onValueChange={setSelectedHousing}>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Selecione uma opção" />
                    </SelectTrigger>
                    <SelectContent>
                      {housingOptions.map(option => <SelectItem key={option.id} value={option.id}>
                          <div className="flex flex-col">
                            <span className="font-medium">{option.name}</span>
                            <span className="text-xs text-muted-foreground">{option.type}</span>
                          </div>
                        </SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                
                {getHousingDisplay()}
              </>}
          </CardContent>
        </Card>

        {/* Escola */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <GraduationCap className="w-5 h-5 text-japan-red" />
              <span>Escola</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Opção de Escola</Label>
              <Select value={selectedSchool} onValueChange={setSelectedSchool}>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Selecione uma escola" />
                </SelectTrigger>
                <SelectContent>
                  {schoolOptions.map(option => <SelectItem key={option.id} value={option.id}>
                      <div className="flex flex-col">
                        <span className="font-medium">{option.name}</span>
                        <span className="text-xs text-muted-foreground">
                          ¥{option.total.min.toLocaleString()} - ¥{option.total.max.toLocaleString()}
                        </span>
                      </div>
                    </SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            
            {getSchoolDisplay()}
          </CardContent>
        </Card>
      </div>

      {/* Outros Gastos */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <CreditCard className="w-5 h-5 text-japan-red" />
            <span>Outros Gastos</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {customExpenses.map(expense => {
            // Ocultar campo escola se uma escola foi selecionada
            if (expense.id === 'school' && selectedSchool) {
              return null;
            }
            return <div key={expense.id} className={`space-y-3 p-4 border rounded-lg transition-opacity ${expense.isIgnored ? 'bg-gray-100 opacity-60' : 'bg-white/50'}`}>
                  <div className="flex items-center justify-between">
                    <Label className="text-sm font-medium flex items-center space-x-2">
                      {expense.id === 'school' && <GraduationCap className="w-4 h-4" />}
                      {expense.id === 'flight' && <Plane className="w-4 h-4" />}
                      {expense.id === 'advisory' && <Users className="w-4 h-4" />}
                      <span className={expense.isIgnored ? 'line-through text-muted-foreground' : ''}>{expense.name}</span>
                      {(expense.id === 'food' || expense.id === 'transport') && <Badge variant="secondary" className="text-xs">mensal</Badge>}
                    </Label>
                    
                    <div className="flex items-center space-x-2">
                      <Checkbox checked={expense.isIgnored} onCheckedChange={() => toggleExpenseIgnore(expense.id)} id={`ignore-${expense.id}`} />
                      <Label htmlFor={`ignore-${expense.id}`} className="text-xs text-muted-foreground cursor-pointer">
                        Ignorar
                      </Label>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    <div className="flex-1">
                      <Input type="number" value={expense.amount} onChange={e => updateCustomExpense(expense.id, parseInt(e.target.value) || 0)} placeholder={expense.currency === 'JPY' ? '¥ 0' : 'R$ 0'} />
                    </div>
                    
                    <Select value={expense.currency} onValueChange={(value: 'JPY' | 'BRL') => updateCustomExpenseCurrency(expense.id, value)}>
                      <SelectTrigger className="w-20">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="JPY">¥</SelectItem>
                        <SelectItem value="BRL">R$</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="text-xs text-muted-foreground">
                    {expense.currency === 'BRL' ? <span>≈ ¥{(expense.amount / exchangeRate).toLocaleString('pt-BR', {
                    maximumFractionDigits: 0
                  })}</span> : <span>≈ R${(expense.amount * exchangeRate).toLocaleString('pt-BR', {
                    minimumFractionDigits: 2
                  })}</span>}
                  </div>
                </div>;
          })}
          </div>
        </CardContent>
      </Card>

      {/* Resultado */}
      <Card className="mt-6 bg-gradient-to-br from-japan-red-light to-japan-cherry">
        <CardHeader>
          <CardTitle className="text-japan-red">💰 Total Estimado</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            <div className="text-center p-4 bg-white/80 rounded-lg">
              <div className="text-3xl font-bold text-japan-red mb-2">
                ¥{Math.round(totalJPY).toLocaleString()}
              </div>
              <p className="text-sm text-muted-foreground">Ienes Japoneses</p>
            </div>
            
            <div className="text-center p-4 bg-white/80 rounded-lg">
              <div className="text-3xl font-bold text-japan-navy mb-2">
                R${Math.round(totalBRL).toLocaleString('pt-BR')}
              </div>
              <p className="text-sm text-muted-foreground">Reais Brasileiros</p>
            </div>
          </div>
          
          <div className="mt-4 text-center">
            <p className="text-sm text-muted-foreground">
              Estimativa para {months} mês{months > 1 ? 'es' : ''} de intercâmbio
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Detalhamento de Preços */}
      {(selectedHousing || selectedSchool || customExpenses.some(e => !e.isIgnored && !(e.id === 'school' && selectedSchool))) && <Card className="mt-6">
          <CardHeader>
            <CardTitle className="text-japan-red">📊 Detalhamento de Preços</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Detalhamento em Ienes */}
              <div className="space-y-3">
                <h3 className="font-semibold text-japan-red border-b pb-2">Em Ienes (¥)</h3>
                
                {selectedHousing && (() => {
              const housing = housingOptions.find(h => h.id === selectedHousing);
              if (!housing) return null;
              const firstMonthAvg = (housing.firstMonth.min + housing.firstMonth.max) / 2;
              const monthlyAfterAvg = housing.monthlyAfter ? (housing.monthlyAfter.min + housing.monthlyAfter.max) / 2 : 0;
              const additionalCostsAvg = housing.additionalCosts ? (housing.additionalCosts.min + housing.additionalCosts.max) / 2 : 0;
              return <div className="border-l-2 border-japan-red/30 pl-3 space-y-1">
                      <div className="font-medium text-sm">Moradia - {housing.name}</div>
                      <div className="text-xs space-y-1 text-muted-foreground">
                        <div className="flex justify-between">
                          <span>Primeiro mês:</span>
                          <span>¥{Math.round(firstMonthAvg).toLocaleString()}</span>
                        </div>
                        {housing.monthlyAfter && months > 1 && <div className="flex justify-between">
                            <span>Outros {months - 1} meses:</span>
                            <span>¥{Math.round(monthlyAfterAvg * (months - 1)).toLocaleString()}</span>
                          </div>}
                        {housing.entranceFee && <div className="flex justify-between">
                            <span>Taxa de entrada:</span>
                            <span>¥{housing.entranceFee.toLocaleString()}</span>
                          </div>}
                         {housing.additionalCosts && <div className="space-y-1">
                             <div className="flex justify-between items-center">
                               <span>Custos adicionais ({months} meses):</span>
                               <div className="flex items-center gap-2">
                                 <span>¥{Math.round(additionalCostsAvg * months).toLocaleString()}</span>
                                 <Collapsible>
                                   <CollapsibleTrigger asChild>
                                     <Button variant="ghost" size="sm" className="h-4 w-4 p-0">
                                       <Info className="h-3 w-3" />
                                     </Button>
                                   </CollapsibleTrigger>
                                   <CollapsibleContent className="mt-1">
                                     <div className="text-xs bg-muted/50 rounded p-2 text-muted-foreground">
                                       {housing.additionalCosts.description}
                                     </div>
                                   </CollapsibleContent>
                                 </Collapsible>
                               </div>
                             </div>
                           </div>}
                      </div>
                    </div>;
            })()}

                {selectedSchool && (() => {
              const school = schoolOptions.find(s => s.id === selectedSchool);
              if (!school) return null;
              return <div className="border-l-2 border-japan-red/30 pl-3 space-y-1">
                      <div className="font-medium text-sm">Escola - {school.name}</div>
                      <div className="text-xs space-y-1 text-muted-foreground">
                        <div className="flex justify-between">
                          <span>Taxa de seleção:</span>
                          <span>¥{school.selectionFee.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Primeiro semestre:</span>
                          <span>¥{school.firstSemester.toLocaleString()}</span>
                        </div>
                        {!school.transportIncluded && school.transport > 0 && <div className="flex justify-between">
                            <span>Transporte:</span>
                            <span>¥{school.transport.toLocaleString()}</span>
                          </div>}
                        {school.accommodationSemestral.min > 0 && <div className="flex justify-between">
                            <span>Acomodação semestral:</span>
                            <span>¥{Math.round((school.accommodationSemestral.min + school.accommodationSemestral.max) / 2).toLocaleString()}</span>
                          </div>}
                        {school.accommodationEntrance > 0 && <div className="flex justify-between">
                            <span>Taxa entrada acomodação:</span>
                            <span>¥{school.accommodationEntrance.toLocaleString()}</span>
                          </div>}
                        {school.accommodationMaintenance > 0 && <div className="flex justify-between">
                            <span>Manutenção acomodação:</span>
                            <span>¥{school.accommodationMaintenance.toLocaleString()}</span>
                          </div>}
                         
                         {/* Seção de Comprovação - Destaque diferenciado */}
                         <div className="border-t border-amber-200 pt-2 mt-2">
                           <div className="text-xs font-medium text-amber-700 mb-1">Comprovação de Renda (Informativo)</div>
                           <div className="flex justify-between items-center">
                             <span className="text-amber-600">Saldo do dia:</span>
                             <div className="flex items-center gap-1">
                               <span className="text-amber-800 font-medium">¥{school.dailyBalance.toLocaleString()}</span>
                               <TooltipProvider>
                                 <Tooltip>
                                   <TooltipTrigger asChild>
                                     <Button variant="ghost" size="sm" className="h-4 w-4 p-0 text-amber-600">
                                       <Info className="h-3 w-3" />
                                     </Button>
                                   </TooltipTrigger>
                                   <TooltipContent className="max-w-xs">
                                     <p className="text-sm">
                                       Valor que o Garantidor deve apresentar em conta bancária (corrente ou poupança) 
                                       aproximadamente 6 meses antes da data da viagem.
                                     </p>
                                   </TooltipContent>
                                 </Tooltip>
                               </TooltipProvider>
                             </div>
                           </div>
                           <div className="flex justify-between items-center">
                             <span className="text-amber-600">Renda anual:</span>
                             <div className="flex items-center gap-1">
                               <span className="text-amber-800 font-medium">¥{school.annualIncome.toLocaleString()}</span>
                               <TooltipProvider>
                                 <Tooltip>
                                   <TooltipTrigger asChild>
                                     <Button variant="ghost" size="sm" className="h-4 w-4 p-0 text-amber-600">
                                       <Info className="h-3 w-3" />
                                     </Button>
                                   </TooltipTrigger>
                                   <TooltipContent className="max-w-xs">
                                     <p className="text-sm">
                                       Soma da renda mensal multiplicada por 12 meses que deverá ser comprovada 
                                       de acordo aos requisitos da escola aproximadamente 6 meses antes da data da viagem.
                                     </p>
                                   </TooltipContent>
                                 </Tooltip>
                               </TooltipProvider>
                             </div>
                           </div>
                         </div>
                       </div>
                     </div>;
            })()}

                {customExpenses.filter(e => !e.isIgnored && !(e.id === 'school' && selectedSchool)).map(expense => {
              const valueInJPY = expense.currency === 'BRL' ? expense.amount / exchangeRate : expense.amount;
              const isMonthly = expense.id === 'food' || expense.id === 'transport';
              const totalValue = isMonthly ? valueInJPY * months : valueInJPY;
              return <div key={expense.id} className="border-l-2 border-japan-red/30 pl-3 space-y-1">
                      <div className="font-medium text-sm">{expense.name}</div>
                      <div className="text-xs text-muted-foreground flex justify-between">
                        <span>{isMonthly ? `${months} meses:` : 'Valor único:'}</span>
                        <span>¥{Math.round(totalValue).toLocaleString()}</span>
                      </div>
                    </div>;
            })}
              </div>

              {/* Detalhamento em Reais */}
              <div className="space-y-3">
                <h3 className="font-semibold text-japan-navy border-b pb-2">Em Reais (R$)</h3>
                
                {selectedHousing && (() => {
              const housing = housingOptions.find(h => h.id === selectedHousing);
              if (!housing) return null;
              const firstMonthAvg = (housing.firstMonth.min + housing.firstMonth.max) / 2;
              const monthlyAfterAvg = housing.monthlyAfter ? (housing.monthlyAfter.min + housing.monthlyAfter.max) / 2 : 0;
              const additionalCostsAvg = housing.additionalCosts ? (housing.additionalCosts.min + housing.additionalCosts.max) / 2 : 0;
              return <div className="border-l-2 border-japan-navy/30 pl-3 space-y-1">
                      <div className="font-medium text-sm">Moradia - {housing.name}</div>
                      <div className="text-xs space-y-1 text-muted-foreground">
                        <div className="flex justify-between">
                          <span>Primeiro mês:</span>
                          <span>R${Math.round(firstMonthAvg * exchangeRate).toLocaleString('pt-BR')}</span>
                        </div>
                        {housing.monthlyAfter && months > 1 && <div className="flex justify-between">
                            <span>Outros {months - 1} meses:</span>
                            <span>R${Math.round(monthlyAfterAvg * (months - 1) * exchangeRate).toLocaleString('pt-BR')}</span>
                          </div>}
                        {housing.entranceFee && <div className="flex justify-between">
                            <span>Taxa de entrada:</span>
                            <span>R${Math.round(housing.entranceFee * exchangeRate).toLocaleString('pt-BR')}</span>
                          </div>}
                         {housing.additionalCosts && <div className="space-y-1">
                             <div className="flex justify-between items-center">
                               <span>Custos adicionais ({months} meses):</span>
                               <div className="flex items-center gap-2">
                                 <span>R${Math.round(additionalCostsAvg * months * exchangeRate).toLocaleString('pt-BR')}</span>
                                 <Collapsible>
                                   <CollapsibleTrigger asChild>
                                     <Button variant="ghost" size="sm" className="h-4 w-4 p-0">
                                       <Info className="h-3 w-3" />
                                     </Button>
                                   </CollapsibleTrigger>
                                   <CollapsibleContent className="mt-1">
                                     <div className="text-xs bg-muted/50 rounded p-2 text-muted-foreground">
                                       {housing.additionalCosts.description}
                                     </div>
                                   </CollapsibleContent>
                                 </Collapsible>
                               </div>
                             </div>
                           </div>}
                      </div>
                    </div>;
            })()}

                {selectedSchool && (() => {
              const school = schoolOptions.find(s => s.id === selectedSchool);
              if (!school) return null;
              return <div className="border-l-2 border-japan-navy/30 pl-3 space-y-1">
                      <div className="font-medium text-sm">Escola - {school.name}</div>
                      <div className="text-xs space-y-1 text-muted-foreground">
                        <div className="flex justify-between">
                          <span>Taxa de seleção:</span>
                          <span>R${Math.round(school.selectionFee * exchangeRate).toLocaleString('pt-BR')}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Primeiro semestre:</span>
                          <span>R${Math.round(school.firstSemester * exchangeRate).toLocaleString('pt-BR')}</span>
                        </div>
                        {!school.transportIncluded && school.transport > 0 && <div className="flex justify-between">
                            <span>Transporte:</span>
                            <span>R${Math.round(school.transport * exchangeRate).toLocaleString('pt-BR')}</span>
                          </div>}
                        {school.accommodationSemestral.min > 0 && <div className="flex justify-between">
                            <span>Acomodação semestral:</span>
                            <span>R${Math.round((school.accommodationSemestral.min + school.accommodationSemestral.max) / 2 * exchangeRate).toLocaleString('pt-BR')}</span>
                          </div>}
                        {school.accommodationEntrance > 0 && <div className="flex justify-between">
                            <span>Taxa entrada acomodação:</span>
                            <span>R${Math.round(school.accommodationEntrance * exchangeRate).toLocaleString('pt-BR')}</span>
                          </div>}
                        {school.accommodationMaintenance > 0 && <div className="flex justify-between">
                            <span>Manutenção acomodação:</span>
                            <span>R${Math.round(school.accommodationMaintenance * exchangeRate).toLocaleString('pt-BR')}</span>
                          </div>}
                         
                         {/* Seção de Comprovação em Reais - Destaque diferenciado */}
                         <div className="border-t border-amber-200 pt-2 mt-2">
                           <div className="text-xs font-medium text-amber-700 mb-1">Comprovação de Renda (Informativo)</div>
                           <div className="flex justify-between items-center">
                             <span className="text-amber-600">Saldo do dia:</span>
                             <div className="flex items-center gap-1">
                               <span className="text-amber-800 font-medium">R${Math.round(school.dailyBalance * exchangeRate).toLocaleString('pt-BR')}</span>
                               <TooltipProvider>
                                 <Tooltip>
                                   <TooltipTrigger asChild>
                                     <Button variant="ghost" size="sm" className="h-4 w-4 p-0 text-amber-600">
                                       <Info className="h-3 w-3" />
                                     </Button>
                                   </TooltipTrigger>
                                   <TooltipContent className="max-w-xs">
                                     <p className="text-sm">
                                       Valor que o Garantidor deve apresentar em conta bancária (corrente ou poupança) 
                                       aproximadamente 6 meses antes da data da viagem.
                                     </p>
                                   </TooltipContent>
                                 </Tooltip>
                               </TooltipProvider>
                             </div>
                           </div>
                           <div className="flex justify-between items-center">
                             <span className="text-amber-600">Renda anual:</span>
                             <div className="flex items-center gap-1">
                               <span className="text-amber-800 font-medium">R${Math.round(school.annualIncome * exchangeRate).toLocaleString('pt-BR')}</span>
                               <TooltipProvider>
                                 <Tooltip>
                                   <TooltipTrigger asChild>
                                     <Button variant="ghost" size="sm" className="h-4 w-4 p-0 text-amber-600">
                                       <Info className="h-3 w-3" />
                                     </Button>
                                   </TooltipTrigger>
                                   <TooltipContent className="max-w-xs">
                                     <p className="text-sm">
                                       Soma da renda mensal multiplicada por 12 meses que deverá ser comprovada 
                                       de acordo aos requisitos da escola aproximadamente 6 meses antes da data da viagem.
                                     </p>
                                   </TooltipContent>
                                 </Tooltip>
                               </TooltipProvider>
                             </div>
                           </div>
                         </div>
                       </div>
                     </div>;
            })()}

                {customExpenses.filter(e => !e.isIgnored && !(e.id === 'school' && selectedSchool)).map(expense => {
              const valueInBRL = expense.currency === 'JPY' ? expense.amount * exchangeRate : expense.amount;
              const isMonthly = expense.id === 'food' || expense.id === 'transport';
              const totalValue = isMonthly ? valueInBRL * months : valueInBRL;
              return <div key={expense.id} className="border-l-2 border-japan-navy/30 pl-3 space-y-1">
                      <div className="font-medium text-sm">{expense.name}</div>
                      <div className="text-xs text-muted-foreground flex justify-between">
                        <span>{isMonthly ? `${months} meses:` : 'Valor único:'}</span>
                        <span>R${Math.round(totalValue).toLocaleString('pt-BR')}</span>
                      </div>
                    </div>;
            })}
              </div>
            </div>
          </CardContent>
        </Card>}
    </div>;
};
export default ExpenseCalculator;