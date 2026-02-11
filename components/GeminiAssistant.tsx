
import React, { useState, useEffect } from 'react';
import { Sparkles, Loader2, CheckCircle2, AlertTriangle, TrendingDown } from 'lucide-react';
import { getEnergyInsights } from '../services/gemini';
import { PriceData, UsageData } from '../types';

interface Props {
  prices: PriceData[];
  usage: UsageData[];
}

const GeminiAssistant: React.FC<Props> = ({ prices, usage }) => {
  const [loading, setLoading] = useState(true);
  const [insights, setInsights] = useState<any>(null);

  useEffect(() => {
    const fetchInsights = async () => {
      setLoading(true);
      const res = await getEnergyInsights(prices, usage);
      setInsights(res);
      setLoading(false);
    };
    fetchInsights();
  }, [prices, usage]);

  if (loading) {
    return (
      <div className="h-full flex flex-col items-center justify-center p-8 text-center space-y-4">
        <div className="relative">
          <div className="absolute inset-0 bg-amber-200 rounded-full blur-xl animate-pulse" />
          <Loader2 className="w-12 h-12 text-amber-500 animate-spin relative" />
        </div>
        <h3 className="text-xl font-bold text-gray-800">Analyzing Your Energy Signature</h3>
        <p className="text-gray-500 max-w-xs">Gemini is crunching live market data and your usage patterns to find savings...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center gap-3 mb-2">
        <div className="p-2 bg-amber-100 rounded-xl">
          <Sparkles className="text-amber-600" size={24} />
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-800">Amber AI Insights</h2>
          <p className="text-xs text-gray-500">Personalized for your household</p>
        </div>
      </div>

      <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
        <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
          <TrendingDown size={18} className="text-green-500" />
          Today's Summary
        </h3>
        <p className="text-gray-600 leading-relaxed text-sm">
          {insights?.summary || "No specific insights available at the moment."}
        </p>
        
        <div className="mt-6 p-4 bg-amber-50 rounded-2xl border border-amber-100">
          <p className="text-[10px] font-bold text-amber-600 uppercase mb-1">BEST WINDOW TO SAVE</p>
          <p className="text-lg font-bold text-amber-900">{insights?.bestWindow}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        <h3 className="font-bold text-gray-800 px-1">Recommendations</h3>
        {insights?.recommendations?.map((rec: string, idx: number) => (
          <div key={idx} className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex items-start gap-4">
            <div className="bg-green-100 p-2 rounded-full text-green-600 mt-0.5">
              <CheckCircle2 size={16} />
            </div>
            <p className="text-sm text-gray-700 leading-snug">{rec}</p>
          </div>
        ))}
      </div>

      <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-6 rounded-3xl text-white shadow-lg">
        <p className="text-white/80 text-xs font-bold uppercase tracking-widest mb-1">Estimated Savings This Week</p>
        <p className="text-3xl font-bold">{insights?.savingsEstimate || "$12.50"}</p>
        <button className="mt-4 w-full bg-white/20 hover:bg-white/30 transition-colors py-2 rounded-xl font-semibold text-sm">
          Apply Optimization Profile
        </button>
      </div>
    </div>
  );
};

export default GeminiAssistant;
