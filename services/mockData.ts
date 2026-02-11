
import { PriceData, UsageData, SmartDevice } from '../types';

export const generatePriceForecast = (): PriceData[] => {
  const data: PriceData[] = [];
  const now = new Date();
  now.setMinutes(0, 0, 0);

  for (let i = -12; i < 24; i++) {
    const time = new Date(now.getTime() + i * 30 * 60 * 1000);
    const hour = time.getHours();
    
    // Simple logic for price spikes in evening, low at night/midday
    let basePrice = 15;
    if (hour >= 17 && hour <= 21) basePrice = 45;
    if (hour >= 10 && hour <= 15) basePrice = 5;
    if (hour >= 0 && hour <= 5) basePrice = 12;

    const price = +(basePrice + Math.random() * 10).toFixed(2);
    const renewable = hour >= 10 && hour <= 16 ? 80 + Math.random() * 20 : 20 + Math.random() * 30;

    let type: PriceData['type'] = 'amber';
    if (price < 15) type = 'green';
    if (price > 35) type = 'red';

    data.push({
      time: time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      price,
      renewable: +renewable.toFixed(0),
      type
    });
  }
  return data;
};

export const generateUsageHistory = (): UsageData[] => {
  const data: UsageData[] = [];
  for (let i = 0; i < 24; i++) {
    const usage = +(Math.random() * 2.5).toFixed(2);
    data.push({
      time: `${i}:00`,
      usage,
      cost: +(usage * 0.25).toFixed(2)
    });
  }
  return data;
};

export const MOCK_DEVICES: SmartDevice[] = [
  { id: '1', name: 'Tesla Model 3', type: 'ev', status: 'charging', value: 65, isAutomated: true },
  { id: '2', name: 'Home Battery', type: 'battery', status: 'discharging', value: 42, isAutomated: true },
  { id: '3', name: 'Rooftop Solar', type: 'solar', status: 'active', value: 3.2, isAutomated: false },
  { id: '4', name: 'Dishwasher', type: 'appliance', status: 'idle', value: 0, isAutomated: true },
];
