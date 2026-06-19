import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchApi, getAuthToken, removeAuthToken } from '../services/api';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  Legend
} from 'recharts';

const COLORS = ['#10b981', '#f59e0b', '#3b82f6', '#ef4444'];

export default function Reports() {
  const navigate = useNavigate();
  const [trends, setTrends] = useState<any[]>([]);
  const [vatBreakdown, setVatBreakdown] = useState<any[]>([]);
  const [customerGrowth, setCustomerGrowth] = useState<any[]>([]);

  useEffect(() => {
    if (!getAuthToken()) {
      navigate('/login');
      return;
    }
    loadData();
  }, [navigate]);

  const loadData = async () => {
    try {
      const [trendsRes, vatRes, growthRes] = await Promise.all([
        fetchApi('/reports/revenue-trends'),
        fetchApi('/reports/vat-breakdown'),
        fetchApi('/reports/customer-growth')
      ]);
      setTrends(trendsRes.data);
      setVatBreakdown(vatRes.data);
      setCustomerGrowth(growthRes.data);
    } catch (error) {
      console.error(error);
      if ((error as Error).message === 'Unauthorized: Token is invalid or expired') {
        removeAuthToken();
        navigate('/login');
      }
    }
  };

  return (
    <div style={{ padding: '20px 0' }}>
      <div style={{ marginBottom: '40px' }}>
        <h1 className="text-gradient">Financial Reports</h1>
        <p className="text-muted" style={{ marginTop: '8px' }}>Analyze your revenue growth and historical performance.</p>
      </div>

      <div className="glass-panel" style={{ padding: '30px', height: '400px', marginBottom: '40px' }}>
        <h3 style={{ marginBottom: '24px', fontWeight: 500 }}>Monthly Revenue Trends</h3>
        {trends.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={trends} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--success)" stopOpacity={0.4}/>
                  <stop offset="95%" stopColor="var(--success)" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis dataKey="name" stroke="var(--text-secondary)" />
              <YAxis stroke="var(--text-secondary)" tickFormatter={(value) => `₹${value}`} />
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.05)" />
              <Tooltip 
                contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.95)', border: '1px solid rgba(0,0,0,0.1)', borderRadius: '8px', color: 'var(--text-primary)' }}
                itemStyle={{ color: 'var(--success)' }}
                formatter={(value: number) => [`₹${value.toFixed(2)}`, 'Revenue']}
              />
              <Area type="monotone" dataKey="revenue" stroke="var(--success)" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" />
            </AreaChart>
          </ResponsiveContainer>
        ) : (
          <div style={{ display: 'flex', height: '100%', alignItems: 'center', justifyContent: 'center', color: 'var(--text-secondary)' }}>
            No revenue data available yet.
          </div>
        )}
      </div>

      {/* Additional Charts */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '24px' }}>
        <div className="glass-panel" style={{ padding: '30px', height: '400px' }}>
          <h3 style={{ marginBottom: '24px', fontWeight: 500 }}>Outstanding VAT Breakdown</h3>
          {vatBreakdown.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={vatBreakdown}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {vatBreakdown.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.95)', border: 'none', borderRadius: '8px' }}
                  formatter={(value: number) => `₹${value.toFixed(2)}`}
                />
                <Legend verticalAlign="bottom" height={36} />
              </PieChart>
            </ResponsiveContainer>
          ) : (
             <div style={{ display: 'flex', height: '100%', alignItems: 'center', justifyContent: 'center', color: 'var(--text-secondary)' }}>
                No VAT data available.
             </div>
          )}
        </div>

        <div className="glass-panel" style={{ padding: '30px', height: '400px' }}>
          <h3 style={{ marginBottom: '24px', fontWeight: 500 }}>Customer Growth</h3>
          {customerGrowth.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={customerGrowth} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.05)" />
                <XAxis dataKey="month" stroke="var(--text-secondary)" />
                <YAxis stroke="var(--text-secondary)" allowDecimals={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.95)', border: 'none', borderRadius: '8px' }}
                  cursor={{ fill: 'rgba(37, 99, 235, 0.05)' }}
                />
                <Bar dataKey="customers" fill="var(--accent-primary)" radius={[4, 4, 0, 0]} name="New Customers" />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div style={{ display: 'flex', height: '100%', alignItems: 'center', justifyContent: 'center', color: 'var(--text-secondary)' }}>
                No customer data available.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
