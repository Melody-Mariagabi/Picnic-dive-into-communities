
export interface PriceData {
  time: string;
  price: number; // c/kWh
  renewable: number; // percentage 0-100
  type: 'green' | 'amber' | 'red';
}

export interface UsageData {
  time: string;
  usage: number; // kWh
  cost: number; // $
}

export interface SmartDevice {
  id: string;
  name: string;
  type: 'ev' | 'battery' | 'solar' | 'appliance';
  status: 'active' | 'idle' | 'charging' | 'discharging';
  value: number; // percentage or kW
  isAutomated: boolean;
}

export type Tab = 'dashboard' | 'prices' | 'usage' | 'devices' | 'ai';
