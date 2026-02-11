
import React from 'react';
import { Smartphone, Battery, Zap, Car, Settings2, Power } from 'lucide-react';
import { SmartDevice } from '../types';

interface Props {
  device: SmartDevice;
  onToggle: (id: string) => void;
}

const DeviceCard: React.FC<Props> = ({ device, onToggle }) => {
  const Icon = {
    ev: Car,
    battery: Battery,
    solar: Zap,
    appliance: Smartphone
  }[device.type];

  return (
    <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between">
      <div className="flex justify-between items-start mb-3">
        <div className={`p-2 rounded-xl ${device.status === 'active' || device.status === 'charging' ? 'bg-amber-100 text-amber-600' : 'bg-gray-100 text-gray-500'}`}>
          <Icon size={24} />
        </div>
        <button 
          onClick={() => onToggle(device.id)}
          className={`w-10 h-6 rounded-full transition-colors relative ${device.isAutomated ? 'bg-green-500' : 'bg-gray-200'}`}
        >
          <div className={`absolute top-1 bg-white w-4 h-4 rounded-full transition-transform ${device.isAutomated ? 'left-5' : 'left-1'}`} />
        </button>
      </div>
      
      <div>
        <h4 className="font-semibold text-gray-800">{device.name}</h4>
        <p className="text-xs text-gray-500 capitalize mb-2">{device.status} • {device.value}{device.type === 'solar' ? ' kW' : '%'}</p>
        
        {device.type !== 'solar' && (
          <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
            <div 
              className={`h-full transition-all duration-1000 ${device.status === 'charging' ? 'bg-blue-500 animate-pulse' : 'bg-amber-500'}`} 
              style={{ width: `${device.value}%` }} 
            />
          </div>
        )}
      </div>

      <div className="mt-4 flex items-center gap-2 text-[10px] font-bold text-gray-400 uppercase tracking-tighter">
        <Settings2 size={12} />
        {device.isAutomated ? 'Smart Optimized' : 'Manual Control'}
      </div>
    </div>
  );
};

export default DeviceCard;
