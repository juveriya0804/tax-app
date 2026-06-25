import { Calendar, ChevronDown } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer } from 'recharts';

const data = [
  {
    name: 'imran khan',
    conversionRate: 0,
    leadsAssigned: 4,
  }
];

export default function TeamSalesReport() {

  return (
    <div style={{ padding: '32px', background: 'white', minHeight: '100vh', fontFamily: 'Inter, sans-serif' }}>
      
      {/* Header */}
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ margin: 0, fontSize: '1.6rem', fontWeight: 700, color: '#334155' }}>Team Sales Report</h1>
        <div style={{ color: '#64748b', fontSize: '0.95rem', marginTop: '6px' }}>
          Last Updated at: 6/24/2026, 2:32:23 PM
        </div>
      </div>

      {/* Filters Container */}
      <div style={{ background: '#f8fafc', borderRadius: '8px', padding: '32px', border: '1px solid #f1f5f9' }}>
        
        <h2 style={{ margin: '0 0 32px 0', fontSize: '1.1rem', fontWeight: 700, color: '#334155' }}>Filters</h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '32px 24px', marginBottom: '40px' }}>
          
          {/* Lead Created At */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <label style={{ fontSize: '1rem', color: '#334155', fontWeight: 500 }}>Lead Created At<span style={{ color: '#ef4444' }}>*</span></label>
            <div style={{ display: 'flex', border: '1px solid #e2e8f0', borderRadius: '6px', overflow: 'hidden', background: 'white' }}>
              <input type="text" value="Mar 24, 2026 - Jun 24, 2026" readOnly style={{ flex: 1, padding: '12px 14px', border: 'none', outline: 'none', fontSize: '0.95rem', color: '#0f172a' }} />
              <div style={{ padding: '0 16px', background: '#f8fafc', borderLeft: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94a3b8' }}>
                <Calendar size={18} />
              </div>
            </div>
          </div>

          {/* Lead Closed At */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <label style={{ fontSize: '1rem', color: '#334155', fontWeight: 500 }}>Lead Closed At</label>
            <div style={{ display: 'flex', border: '1px solid #e2e8f0', borderRadius: '6px', overflow: 'hidden', background: 'white' }}>
              <input type="text" placeholder="Start Date - End date" readOnly style={{ flex: 1, padding: '12px 14px', border: 'none', outline: 'none', fontSize: '0.95rem', color: '#94a3b8' }} />
              <div style={{ padding: '0 16px', background: '#f8fafc', borderLeft: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94a3b8' }}>
                <Calendar size={18} />
              </div>
            </div>
          </div>

          {/* Pipeline */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <label style={{ fontSize: '1rem', color: '#334155', fontWeight: 500 }}>Pipeline<span style={{ color: '#ef4444' }}>*</span></label>
            <div style={{ position: 'relative' }}>
              <select style={{ width: '100%', padding: '12px 14px', border: '1px solid #e2e8f0', borderRadius: '6px', appearance: 'none', background: 'white', outline: 'none', fontSize: '0.95rem', color: '#334155' }}>
                <option>Sales Pipeline</option>
              </select>
              <div style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: '#334155' }}>
                <ChevronDown size={18} />
              </div>
            </div>
          </div>

          {/* Source */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <label style={{ fontSize: '1rem', color: '#334155', fontWeight: 500 }}>Source</label>
            <div style={{ position: 'relative' }}>
              <select style={{ width: '100%', padding: '12px 14px', border: '1px solid #e2e8f0', borderRadius: '6px', appearance: 'none', background: 'white', outline: 'none', fontSize: '0.95rem', color: '#94a3b8' }}>
                <option>Select...</option>
              </select>
              <div style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: '#1e293b' }}>
                <ChevronDown size={18} />
              </div>
            </div>
          </div>

          {/* Label */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <label style={{ fontSize: '1rem', color: '#334155', fontWeight: 500 }}>Label</label>
            <div style={{ position: 'relative' }}>
              <select style={{ width: '100%', padding: '12px 14px', border: '1px solid #e2e8f0', borderRadius: '6px', appearance: 'none', background: 'white', outline: 'none', fontSize: '0.95rem', color: '#94a3b8' }}>
                <option>Select...</option>
              </select>
              <div style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: '#1e293b' }}>
                <ChevronDown size={18} />
              </div>
            </div>
          </div>

          {/* Assigned To */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <label style={{ fontSize: '1rem', color: '#334155', fontWeight: 500 }}>Assigned To</label>
            <div style={{ position: 'relative' }}>
              <input type="text" placeholder="Select" readOnly style={{ width: '100%', padding: '12px 14px', border: '1px solid #e2e8f0', borderRadius: '6px', background: 'white', outline: 'none', fontSize: '0.95rem', color: '#94a3b8', boxSizing: 'border-box' }} />
            </div>
          </div>

        </div>

        {/* Action Button */}
        <div>
          <button style={{ background: '#f472b6', color: 'white', border: 'none', padding: '12px 24px', borderRadius: '6px', fontWeight: 600, fontSize: '0.95rem', cursor: 'pointer', transition: 'background 0.2s', letterSpacing: '0.01em' }} onMouseOver={e => e.currentTarget.style.background = '#ec4899'} onMouseOut={e => e.currentTarget.style.background = '#f472b6'}>
            Apply Filters
          </button>
        </div>

      </div>

      {/* Chart Area */}
      <div style={{ marginTop: '60px', height: '350px', width: '100%' }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 20, right: 30, left: 30, bottom: 20 }}
            barCategoryGap="20%"
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
            
            <XAxis 
              dataKey="name" 
              axisLine={{ stroke: '#64748b' }}
              tickLine={{ stroke: '#64748b' }}
              tick={{ fill: '#64748b', fontSize: 13, dy: 10 }}
            />
            
            <YAxis 
              yAxisId="left" 
              orientation="left" 
              tickFormatter={(value) => `${value}%`}
              axisLine={{ stroke: '#64748b' }}
              tickLine={{ stroke: '#64748b' }}
              tick={{ fill: '#64748b', fontSize: 13 }}
              label={{ value: 'Conversion Rate (%)', angle: -90, position: 'insideLeft', offset: -15, fill: '#334155', fontSize: 13 }}
              domain={[0, 4]}
              tickCount={5}
            />
            
            <YAxis 
              yAxisId="right" 
              orientation="right" 
              axisLine={{ stroke: '#64748b' }}
              tickLine={{ stroke: '#64748b' }}
              tick={{ fill: '#64748b', fontSize: 13 }}
              domain={[0, 4]}
              tickCount={5}
            />
            
            <Legend 
              wrapperStyle={{ paddingTop: '20px' }}
              iconType="square"
              formatter={(value) => <span style={{ color: '#0f172a', fontWeight: 500, fontSize: '14px', marginLeft: '4px' }}>{value}</span>}
            />
            
            <Bar yAxisId="left" dataKey="conversionRate" name="Conversion Rate" fill="#8b5cf6" />
            <Bar yAxisId="right" dataKey="leadsAssigned" name="Leads Assigned" fill="#e9d5ff" barSize={350} />
          </BarChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
}
