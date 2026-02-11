
import React, { useState, useEffect } from 'react';
import { Home, BarChart2, Zap, LayoutGrid, Sparkles } from 'lucide-react';
import { generatePriceForecast, generateUsageHistory, MOCK_DEVICES } from './services/mockData';
import { PriceData, UsageData, SmartDevice, Tab } from './types';
import Dashboard from './components/Dashboard';
import DeviceCard from './components/DeviceCard';
import GeminiAssistant from './components/GeminiAssistant';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('dashboard');
  const [prices, setPrices] = useState<PriceData[]>([]);
  const [usage, setUsage] = useState<UsageData[]>([]);
  const [devices, setDevices] = useState<SmartDevice[]>(MOCK_DEVICES);

  useEffect(() => {
    setPrices(generatePriceForecast());
    setUsage(generateUsageHistory());
  }, []);

  const handleToggleAutomation = (id: string) => {
    setDevices(prev => prev.map(d => d.id === id ? { ...d, isAutomated: !d.isAutomated } : d));
  };

  const renderContent = () => {
    const currentPrice = prices[12] || { price: 0, time: '', renewable: 0, type: 'amber' };

    switch (activeTab) {
      case 'dashboard':
        return <Dashboard currentPrice={currentPrice} forecast={prices} usage={usage} />;
      case 'devices':
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center px-1">
              <h2 className="text-2xl font-bold text-gray-800">Smart Devices</h2>
              <button className="text-amber-600 text-sm font-semibold">+ Add Device</button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {devices.map(device => (
                <DeviceCard 
                  key={device.id} 
                  device={device} 
                  onToggle={handleToggleAutomation} 
                />
              ))}
            </div>
            <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm text-center">
              <p className="text-sm text-gray-500 mb-4 italic">"I've automated your Tesla and Powerwall to sync with the cheapest 100% renewable windows."</p>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-xs font-bold">
                <Sparkles size={14} /> Smart Profile: MAX_SAVINGS
              </div>
            </div>
          </div>
        );
      case 'usage':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800 px-1">Usage History</h2>
            <div className="bg-white p-4 rounded-3xl shadow-sm border border-gray-100 h-64 flex items-center justify-center text-gray-400">
              {/* Detailed Usage Chart component could go here */}
              <BarChart2 size={48} className="opacity-20" />
              <p className="ml-4">Daily/Monthly usage views</p>
            </div>
            <div className="space-y-3">
              <h3 className="font-bold text-gray-800 px-1">Recent Sessions</h3>
              {[
                { label: 'EV Charging', value: '14.2 kWh', cost: '$1.04', date: 'Last night' },
                { label: 'Solar Export', value: '4.8 kWh', cost: '-$0.34', date: 'Yesterday' },
                { label: 'General Household', value: '2.1 kWh', cost: '$0.52', date: 'Today, 8am-10am' },
              ].map((item, i) => (
                <div key={i} className="bg-white p-4 rounded-2xl flex justify-between items-center shadow-sm border border-gray-50">
                   <div>
                     <p className="font-semibold text-gray-800">{item.label}</p>
                     <p className="text-xs text-gray-400">{item.date}</p>
                   </div>
                   <div className="text-right">
                     <p className="font-bold text-gray-800">{item.value}</p>
                     <p className={`text-xs font-bold ${item.cost.startsWith('-') ? 'text-green-500' : 'text-amber-500'}`}>{item.cost}</p>
                   </div>
                </div>
              ))}
            </div>
          </div>
        );
      case 'ai':
        return <GeminiAssistant prices={prices} usage={usage} />;
      default:
        return <div className="p-8 text-center text-gray-500">Feature coming soon...</div>;
    }
  };

  return (
    <div className="max-w-md mx-auto min-h-screen flex flex-col pb-24 relative shadow-2xl bg-gray-50 overflow-hidden">
      {/* Top Bar */}
      <header className="px-6 pt-6 pb-2 flex justify-between items-center sticky top-0 bg-gray-50/80 backdrop-blur-md z-40">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 amber-gradient rounded-xl flex items-center justify-center text-white font-black text-xl italic">A</div>
          <span className="font-bold text-lg tracking-tight text-gray-800">Amberly</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white shadow-sm">
            <img src="https://picsum.photos/seed/amber/100/100" alt="Avatar" />
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="px-6 flex-1 overflow-y-auto pt-4">
        {renderContent()}
      </main>

      {/* Persistent Bottom Nav */}
      <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto px-6 py-4 bg-white/80 backdrop-blur-xl border-t border-gray-100 flex justify-between items-center z-50">
        <NavItem active={activeTab === 'dashboard'} icon={Home} label="Home" onClick={() => setActiveTab('dashboard')} />
        <NavItem active={activeTab === 'usage'} icon={BarChart2} label="Usage" onClick={() => setActiveTab('usage')} />
        <NavItem active={activeTab === 'ai'} icon={Sparkles} label="Amber AI" onClick={() => setActiveTab('ai')} isSpecial />
        <NavItem active={activeTab === 'devices'} icon={Zap} label="Devices" onClick={() => setActiveTab('devices')} />
        <NavItem active={activeTab === 'prices'} icon={LayoutGrid} label="More" onClick={() => setActiveTab('dashboard')} />
      </nav>
    </div>
  );
};

const NavItem: React.FC<{ 
  active: boolean; 
  icon: any; 
  label: string; 
  onClick: () => void;
  isSpecial?: boolean;
}> = ({ active, icon: Icon, label, onClick, isSpecial }) => (
  <button 
    onClick={onClick}
    className={`flex flex-col items-center gap-1 transition-all duration-300 relative ${
      isSpecial ? 'scale-110 -translate-y-2' : ''
    }`}
  >
    <div className={`p-2 rounded-2xl transition-all ${
      isSpecial 
        ? (active ? 'bg-amber-500 text-white shadow-lg shadow-amber-200' : 'bg-gray-100 text-gray-500')
        : (active ? 'bg-amber-100 text-amber-600' : 'text-gray-400')
    }`}>
      <Icon size={isSpecial ? 24 : 20} strokeWidth={active ? 2.5 : 2} />
    </div>
    <span className={`text-[10px] font-bold uppercase tracking-tight ${active ? 'text-gray-800' : 'text-gray-400'}`}>
      {label}
    </span>
  </button>
);

export default App;
