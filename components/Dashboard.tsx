
import React from 'react';
import { ArrowUpRight, ArrowDownRight, Sun, Leaf, Zap } from 'lucide-react';
import { PriceData, UsageData } from '../types';
import PriceChart from './PriceChart';

interface Props {
  currentPrice: PriceData;
  forecast: PriceData[];
  usage: UsageData[];
}

const Dashboard: React.FC<Props> = ({ currentPrice, forecast, usage }) => {
  const dailyCost = usage.reduce((acc, curr) => acc + curr.cost, 0);
  const totalUsage = usage.reduce((acc, curr) => acc + curr.usage, 0);

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Current Price Header */}
      <div className={`rounded-3xl p-6 text-white shadow-lg overflow-hidden relative ${
        currentPrice.type === 'green' ? 'bg-green-500' : 
        currentPrice.type === 'red' ? 'bg-red-500' : 'amber-gradient'
      }`}>
        <div className="relative z-10">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-white/80 text-sm font-medium">Current Wholesale Price</p>
              <h1 className="text-5xl font-bold mt-1 tracking-tight">{currentPrice.price}<span className="text-xl font-normal ml-1">c/kWh</span></h1>
            </div>
            <div className="bg-white/20 backdrop-blur-md rounded-2xl p-3 flex flex-col items-center">
              <Leaf size={20} className="mb-1" />
              <span className="text-xs font-bold">{currentPrice.renewable}%</span>
              <span className="text-[8px] uppercase tracking-wider">Green</span>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex items-center gap-1.5 bg-white/10 rounded-lg px-3 py-1.5 text-xs">
              <ArrowDownRight size={14} />
              <span>Trending Down</span>
            </div>
            <div className="flex items-center gap-1.5 bg-white/10 rounded-lg px-3 py-1.5 text-xs">
              <Sun size={14} />
              <span>High Solar Window</span>
            </div>
          </div>
        </div>
        {/* Decorative Circles */}
        <div className="absolute top-[-20px] right-[-20px] w-48 h-48 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute bottom-[-50px] left-[-20px] w-64 h-64 bg-black/5 rounded-full blur-3xl" />
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex items-center gap-2 text-gray-500 text-xs mb-1">
            <Zap size={14} className="text-amber-500" />
            USAGE TODAY
          </div>
          <p className="text-2xl font-bold text-gray-800">{totalUsage.toFixed(1)} <span className="text-sm font-normal text-gray-400">kWh</span></p>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex items-center gap-2 text-gray-500 text-xs mb-1">
            <Leaf size={14} className="text-green-500" />
            COST TODAY
          </div>
          <p className="text-2xl font-bold text-gray-800">${dailyCost.toFixed(2)}</p>
        </div>
      </div>

      {/* Main Chart */}
      <PriceChart data={forecast} />

      {/* Upcoming events / Smart Insights Summary */}
      <div className="bg-blue-50 border border-blue-100 p-4 rounded-2xl flex items-start gap-4">
        <div className="bg-blue-500 p-2 rounded-xl text-white">
          <Leaf size={20} />
        </div>
        <div>
          <h4 className="font-semibold text-blue-900 text-sm">Optimal Charge Window</h4>
          <p className="text-xs text-blue-700 mt-0.5">Renewables will peak at 1:30 PM today. We've scheduled your EV to start charging then.</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
