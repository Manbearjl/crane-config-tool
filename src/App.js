
import { useState } from "react";

const loadChart = [
  { radius: 5, boomLength: "27ft", angle: 7, rating: 34000 },
  { radius: 10, boomLength: "27ft", angle: 66, rating: 21100 },
  { radius: 10, boomLength: "34ft", angle: 71, rating: 17100 },
  { radius: 10, boomLength: "43ft", angle: 75, rating: 16000 },
  { radius: 10, boomLength: "52ft", angle: 78, rating: 15700 },
  { radius: 15, boomLength: "27ft", angle: 54, rating: 15100 },
  { radius: 15, boomLength: "34ft", angle: 62, rating: 14000 },
  { radius: 15, boomLength: "43ft", angle: 68, rating: 12100 },
  { radius: 15, boomLength: "52ft", angle: 72, rating: 14100 },
  { radius: 20, boomLength: "27ft", angle: 39, rating: 11100 },
  { radius: 20, boomLength: "34ft", angle: 51, rating: 10100 },
  { radius: 20, boomLength: "43ft", angle: 61, rating: 9100 },
  { radius: 20, boomLength: "52ft", angle: 66, rating: 8600 },
  { radius: 25, boomLength: "27ft", angle: null, rating: 7900 },
  { radius: 25, boomLength: "34ft", angle: 40, rating: 7700 },
  { radius: 25, boomLength: "43ft", angle: 53, rating: 7100 },
  { radius: 25, boomLength: "52ft", angle: 61, rating: 6900 },
  { radius: 30, boomLength: "27ft", angle: null, rating: 6500 },
  { radius: 30, boomLength: "34ft", angle: 44, rating: 6100 },
  { radius: 30, boomLength: "43ft", angle: 54, rating: 5600 },
  { radius: 35, boomLength: "34ft", angle: 33, rating: 4000 },
];

export default function App() {
  const [loadWeight, setLoadWeight] = useState(0);
  const [safetyFactor, setSafetyFactor] = useState(0.85);

  const validConfigs = loadChart.filter((item) => loadWeight <= item.rating * safetyFactor);
  const sortedConfigs = [...validConfigs].sort((a, b) => {
    if (a.radius !== b.radius) return a.radius - b.radius;
    if (a.boomLength !== b.boomLength) return parseInt(a.boomLength) - parseInt(b.boomLength);
    return (a.angle || 180) - (b.angle || 180);
  });

  return (
    <div style={{ padding: '1rem', maxWidth: '800px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '1rem' }}>Crane Configuration Calculator</h1>
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
        <div style={{ flex: 1 }}>
          <label>Load Weight (lbs)</label>
          <input
            type="number"
            value={loadWeight}
            onChange={(e) => setLoadWeight(Number(e.target.value))}
          />
        </div>
        <div style={{ flex: 1 }}>
          <label>Safety Factor</label>
          <input
            type="number"
            step="0.01"
            value={safetyFactor}
            onChange={(e) => setSafetyFactor(Number(e.target.value))}
          />
        </div>
      </div>

      <table>
        <thead>
          <tr>
            <th>Radius (ft)</th>
            <th>Boom Length</th>
            <th>Boom Angle (°)</th>
            <th>Load Rating (lbs)</th>
            <th>Safe Load Limit (lbs)</th>
          </tr>
        </thead>
        <tbody>
          {sortedConfigs.map((item, index) => (
            <tr key={index} className="bg-green-50">
              <td>{item.radius}</td>
              <td>{item.boomLength}</td>
              <td>{item.angle ?? "–"}</td>
              <td>{item.rating.toLocaleString()}</td>
              <td>{(item.rating * safetyFactor).toFixed(0)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
