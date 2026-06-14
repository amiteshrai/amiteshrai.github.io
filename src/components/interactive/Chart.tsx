import { useEffect, useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

// Tier 2 - data viz. Sample series; swap for real data via props later.
const data = [
  { month: 'Jan', latency: 240, throughput: 120 },
  { month: 'Feb', latency: 210, throughput: 145 },
  { month: 'Mar', latency: 190, throughput: 168 },
  { month: 'Apr', latency: 160, throughput: 190 },
  { month: 'May', latency: 175, throughput: 205 },
  { month: 'Jun', latency: 140, throughput: 232 },
];

// Watch the <html> class so the chart recolors when the theme toggles.
function useIsDark() {
  const [dark, setDark] = useState(false);
  useEffect(() => {
    const el = document.documentElement;
    const update = () => setDark(el.classList.contains('dark'));
    update();
    const obs = new MutationObserver(update);
    obs.observe(el, { attributes: true, attributeFilter: ['class'] });
    return () => obs.disconnect();
  }, []);
  return dark;
}

export default function Chart() {
  const dark = useIsDark();
  const grid = dark ? '#33302b' : '#e7ddd0';
  const axis = dark ? '#b0a99e' : '#57534e';
  const accent = dark ? '#cf7c6a' : '#7c2d2d';
  const second = dark ? '#8b97a6' : '#8a8a8a';

  return (
    <div className="my-6 rounded-xl border border-border p-4" style={{ width: '100%', height: 320 }}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 8, right: 16, bottom: 8, left: -8 }}>
          <CartesianGrid strokeDasharray="3 3" stroke={grid} />
          <XAxis dataKey="month" stroke={axis} fontSize={12} />
          <YAxis stroke={axis} fontSize={12} />
          <Tooltip
            contentStyle={{
              background: dark ? '#232019' : '#fffdf8',
              border: `1px solid ${grid}`,
              borderRadius: 8,
              color: dark ? '#f5f1ea' : '#1a1a1a',
              fontSize: 12,
            }}
          />
          <Line type="monotone" dataKey="latency" stroke={accent} strokeWidth={2} dot={false} />
          <Line type="monotone" dataKey="throughput" stroke={second} strokeWidth={2} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
