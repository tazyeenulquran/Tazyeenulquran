import React, { useState } from 'react';
import { 
  Calculator, 
  Sparkles, 
  Check, 
  Users, 
  Calendar, 
  Clock, 
  ArrowRight, 
  ShieldCheck, 
  Phone
} from 'lucide-react';
import { PageTab } from '../types';

interface FeeCalculatorProps {
  setActiveTab: (tab: PageTab) => void;
  onSelectCalculatedPlan?: (planDetails: string) => void;
}

type CurrencyCode = 'USD' | 'GBP' | 'EUR' | 'PKR' | 'SAR' | 'CAD' | 'AUD';

interface CurrencyRate {
  code: CurrencyCode;
  symbol: string;
  name: string;
  baseRatePerDay: number; // Base rate for 1 student, 1 day per week per month (30 min)
}

const CURRENCIES: Record<CurrencyCode, CurrencyRate> = {
  USD: { code: 'USD', symbol: '$', name: 'US Dollar', baseRatePerDay: 11 },
  GBP: { code: 'GBP', symbol: '£', name: 'British Pound', baseRatePerDay: 9 },
  EUR: { code: 'EUR', symbol: '€', name: 'Euro', baseRatePerDay: 10 },
  PKR: { code: 'PKR', symbol: '₨', name: 'Pakistani Rupee', baseRatePerDay: 1200 },
  SAR: { code: 'SAR', symbol: 'ر.س', name: 'Saudi Riyal', baseRatePerDay: 42 },
  CAD: { code: 'CAD', symbol: 'C$', name: 'Canadian Dollar', baseRatePerDay: 15 },
  AUD: { code: 'AUD', symbol: 'A$', name: 'Australian Dollar', baseRatePerDay: 16 }
};

export const FeeCalculator: React.FC<FeeCalculatorProps> = ({ setActiveTab, onSelectCalculatedPlan }) => {
  const [selectedCurrency, setSelectedCurrency] = useState<CurrencyCode>('USD');
  const [studentsCount, setStudentsCount] = useState<number>(1);
  const [daysPerWeek, setDaysPerWeek] = useState<number>(3);
  const [durationMins, setDurationMins] = useState<30 | 45>(30);

  const curr = CURRENCIES[selectedCurrency];

  // Base calculation:
  // Base cost per student = baseRatePerDay * daysPerWeek * (duration multiplier)
  const durationMultiplier = durationMins === 45 ? 1.4 : 1.0;
  const rawPerStudent = curr.baseRatePerDay * daysPerWeek * durationMultiplier;
  const totalRaw = rawPerStudent * studentsCount;

  // Sibling discount:
  // 1 student: 0%
  // 2 students: 10% off
  // 3+ students: 15% off
  let discountPercent = 0;
  if (studentsCount === 2) discountPercent = 10;
  else if (studentsCount >= 3) discountPercent = 15;

  const discountAmount = Math.round((totalRaw * discountPercent) / 100);
  const finalTotal = Math.round(totalRaw - discountAmount);
  const perStudentFinal = Math.round(finalTotal / studentsCount);

  const handleProceedToTrial = () => {
    const details = `${studentsCount} Student(s), ${daysPerWeek} Days/week (${durationMins} mins) - Est. ${curr.symbol}${finalTotal}/mo`;
    if (onSelectCalculatedPlan) {
      onSelectCalculatedPlan(details);
    }
    setActiveTab('trial');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleWhatsAppInquiry = () => {
    const msg = encodeURIComponent(
      `Assalamu Alaikum! I used the fee calculator on your website for ${studentsCount} student(s), ${daysPerWeek} days/week (${durationMins} min sessions). Estimated total: ${curr.symbol}${finalTotal}/month. Please share trial availability.`
    );
    window.open(`https://wa.me/923052350269?text=${msg}`, '_blank');
  };

  return (
    <div className="bg-white rounded-3xl border border-accent/30 shadow-xl p-6 sm:p-10 relative overflow-hidden">
      
      {/* Decorative top border */}
      <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-accent via-accent-light to-primary"></div>

      <div className="max-w-3xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent/20 text-accent-dark text-xs font-bold uppercase tracking-wider">
            <Calculator className="w-3.5 h-3.5 text-accent-dark" />
            <span>Interactive Tuition & Discount Estimator</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-serif font-bold text-primary">
            Calculate Your Custom Monthly Fee
          </h3>
          <p className="text-xs sm:text-sm text-charcoal/70 max-w-lg mx-auto">
            Choose your currency, number of children, and weekly lesson frequency to see your transparent fee with applied family discounts.
          </p>
        </div>

        {/* Currency Switcher */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-charcoal/80 flex items-center gap-1">
            <span>Select Currency:</span>
          </label>
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
            {(Object.keys(CURRENCIES) as CurrencyCode[]).map((cCode) => (
              <button
                key={cCode}
                onClick={() => setSelectedCurrency(cCode)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  selectedCurrency === cCode
                    ? 'bg-primary text-white shadow-sm ring-2 ring-accent'
                    : 'bg-ivory hover:bg-gray-100 text-charcoal/80 border border-gray-200'
                }`}
              >
                {CURRENCIES[cCode].symbol} {cCode}
              </button>
            ))}
          </div>
        </div>

        {/* Inputs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-ivory/60 p-6 rounded-2xl border border-gray-100">
          
          {/* 1. Number of Students */}
          <div className="space-y-3">
            <span className="text-xs font-bold text-primary flex items-center gap-1.5">
              <Users className="w-4 h-4 text-accent" />
              Number of Students:
            </span>
            <div className="grid grid-cols-3 gap-2">
              {[1, 2, 3].map((num) => (
                <button
                  key={num}
                  onClick={() => setStudentsCount(num)}
                  className={`py-2 rounded-xl text-xs font-bold transition-all border ${
                    studentsCount === num
                      ? 'bg-primary text-white border-primary shadow-sm'
                      : 'bg-white text-charcoal/80 border-gray-200 hover:border-accent'
                  }`}
                >
                  {num === 3 ? '3+ Kids' : `${num} ${num === 1 ? 'Student' : 'Students'}`}
                </button>
              ))}
            </div>
            {discountPercent > 0 && (
              <span className="inline-block text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                🎉 {discountPercent}% Family Discount Applied
              </span>
            )}
          </div>

          {/* 2. Days per Week */}
          <div className="space-y-3">
            <span className="text-xs font-bold text-primary flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-accent" />
              Weekly Class Days:
            </span>
            <div className="grid grid-cols-4 gap-1.5">
              {[2, 3, 4, 5].map((d) => (
                <button
                  key={d}
                  onClick={() => setDaysPerWeek(d)}
                  className={`py-2 rounded-xl text-xs font-bold transition-all border ${
                    daysPerWeek === d
                      ? 'bg-primary text-white border-primary shadow-sm'
                      : 'bg-white text-charcoal/80 border-gray-200 hover:border-accent'
                  }`}
                >
                  {d} Days
                </button>
              ))}
            </div>
            <span className="text-[10px] text-charcoal/50 block">
              1-on-1 private live sessions
            </span>
          </div>

          {/* 3. Class Duration */}
          <div className="space-y-3">
            <span className="text-xs font-bold text-primary flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-accent" />
              Session Duration:
            </span>
            <div className="grid grid-cols-2 gap-2">
              {[30, 45].map((mins) => (
                <button
                  key={mins}
                  onClick={() => setDurationMins(mins as 30 | 45)}
                  className={`py-2 rounded-xl text-xs font-bold transition-all border ${
                    durationMins === mins
                      ? 'bg-primary text-white border-primary shadow-sm'
                      : 'bg-white text-charcoal/80 border-gray-200 hover:border-accent'
                  }`}
                >
                  {mins} Mins
                </button>
              ))}
            </div>
            <span className="text-[10px] text-charcoal/50 block">
              {durationMins === 30 ? 'Recommended for Kids' : 'Intensive Recitation'}
            </span>
          </div>

        </div>

        {/* Calculation Result Summary Card */}
        <div className="bg-gradient-to-br from-primary via-primary-dark to-secondary text-white rounded-2xl p-6 sm:p-8 shadow-lg border border-accent/40 flex flex-col md:flex-row items-center justify-between gap-6">
          
          <div className="space-y-2 text-center md:text-left">
            <span className="text-xs uppercase tracking-wider text-accent font-bold">
              Estimated Monthly Total ({curr.code})
            </span>
            
            <div className="flex items-baseline justify-center md:justify-start gap-2">
              <span className="text-4xl sm:text-5xl font-serif font-extrabold text-accent">
                {curr.symbol}{finalTotal}
              </span>
              <span className="text-ivory/70 text-sm">/ month</span>
              
              {discountAmount > 0 && (
                <span className="line-through text-ivory/50 text-sm ml-2">
                  {curr.symbol}{totalRaw}
                </span>
              )}
            </div>

            {studentsCount > 1 && (
              <p className="text-xs text-ivory/80">
                Averages ~<span className="text-accent font-bold">{curr.symbol}{perStudentFinal}</span> per student each month
              </p>
            )}

            <div className="flex flex-wrap gap-2 pt-1 justify-center md:justify-start">
              <span className="text-[11px] text-ivory/90 flex items-center gap-1">
                <Check className="w-3.5 h-3.5 text-accent" /> Free 3-Day Trial
              </span>
              <span className="text-[11px] text-ivory/90 flex items-center gap-1">
                <Check className="w-3.5 h-3.5 text-accent" /> No Registration Fee
              </span>
              <span className="text-[11px] text-ivory/90 flex items-center gap-1">
                <Check className="w-3.5 h-3.5 text-accent" /> Cancel Anytime
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row md:flex-col gap-3 w-full md:w-auto shrink-0">
            <button
              onClick={handleProceedToTrial}
              className="px-6 py-3.5 rounded-full bg-gradient-to-r from-accent via-accent-light to-accent text-primary-dark font-bold text-sm shadow-md hover:shadow-gold hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-primary" />
              <span>Book Trial with this Plan</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={handleWhatsAppInquiry}
              className="px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white font-semibold text-xs border border-accent/40 transition-colors flex items-center justify-center gap-2"
            >
              <Phone className="w-3.5 h-3.5 text-accent" />
              <span>Ask via WhatsApp</span>
            </button>
          </div>

        </div>

      </div>

    </div>
  );
};
