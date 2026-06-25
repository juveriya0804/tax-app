import { useState } from 'react';
import { Rocket, MessageCircle, Mail, FormInput, Activity, Zap, ArrowRight, Play, Settings } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function GrowthSuite() {
  const navigate = useNavigate();

  return (
    <div style={{ padding: '24px', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{
        background: 'linear-gradient(135deg, var(--accent-main), #8b5cf6)',
        borderRadius: '16px',
        padding: '32px',
        color: 'white',
        marginBottom: '32px',
        boxShadow: '0 10px 25px rgba(99, 102, 241, 0.2)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
            <Rocket size={32} />
            <h1 style={{ fontSize: '2.5rem', fontWeight: 700, margin: 0 }}>Growth Suite</h1>
          </div>
          <p style={{ fontSize: '1.1rem', opacity: 0.9, maxWidth: '600px', margin: 0 }}>
            Supercharge your business with automated marketing, lead generation, and multi-channel engagement tools.
          </p>
        </div>
        <div style={{
          position: 'absolute',
          right: '-50px',
          top: '-50px',
          width: '300px',
          height: '300px',
          background: 'radial-gradient(circle, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 70%)',
          borderRadius: '50%'
        }} />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
        
        {/* WhatsApp Campaigns */}
        <div className="glass-panel hover-lift" style={{ position: 'relative', overflow: 'hidden' }}>
          <div style={{ padding: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(34, 197, 94, 0.1)', color: '#22c55e', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <MessageCircle size={24} />
              </div>
              <span style={{ fontSize: '0.8rem', fontWeight: 600, background: '#22c55e', color: 'white', padding: '4px 8px', borderRadius: '100px' }}>Active</span>
            </div>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '8px' }}>WhatsApp Campaigns</h3>
            <p className="text-muted" style={{ marginBottom: '24px', minHeight: '48px' }}>
              Engage clients directly. Automate payment reminders, festival greetings, and promotional broadcasts.
            </p>
            <div style={{ display: 'flex', gap: '12px' }}>
              <button className="btn-primary" style={{ flex: 1, background: '#22c55e' }} onClick={() => navigate('/workflows')}>
                <Play size={16} /> New Campaign
              </button>
            </div>
          </div>
        </div>

        {/* Email Marketing */}
        <div className="glass-panel hover-lift" style={{ position: 'relative', overflow: 'hidden' }}>
          <div style={{ padding: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(59, 130, 246, 0.1)', color: '#3b82f6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Mail size={24} />
              </div>
            </div>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '8px' }}>Email Marketing</h3>
            <p className="text-muted" style={{ marginBottom: '24px', minHeight: '48px' }}>
              Design beautiful newsletters, trigger welcome sequences, and nurture leads with automated email flows.
            </p>
            <button className="btn-primary" style={{ width: '100%' }}>
              Create Newsletter
            </button>
          </div>
        </div>

        {/* Lead Capture */}
        <div className="glass-panel hover-lift" style={{ position: 'relative', overflow: 'hidden' }}>
          <div style={{ padding: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(249, 115, 22, 0.1)', color: '#f97316', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <FormInput size={24} />
              </div>
            </div>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '8px' }}>Lead Generation Forms</h3>
            <p className="text-muted" style={{ marginBottom: '24px', minHeight: '48px' }}>
              Build high-converting forms to embed on your website and route leads directly into your CRM.
            </p>
            <button className="btn-primary" style={{ width: '100%', background: '#f97316' }} onClick={() => navigate('/forms')}>
              Build Form
            </button>
          </div>
        </div>

        {/* Automations */}
        <div className="glass-panel hover-lift" style={{ position: 'relative', overflow: 'hidden' }}>
          <div style={{ padding: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(168, 85, 247, 0.1)', color: '#a855f7', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Zap size={24} />
              </div>
            </div>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '8px' }}>Automation Workflows</h3>
            <p className="text-muted" style={{ marginBottom: '24px', minHeight: '48px' }}>
              Put your business on autopilot. Visually map out internal tasks, client follow-ups, and data syncs.
            </p>
            <button className="btn-primary" style={{ width: '100%', background: '#a855f7' }} onClick={() => navigate('/all-workflows')}>
              Manage Workflows
            </button>
          </div>
        </div>

      </div>

      {/* Analytics / Recent Activity Overview */}
      <div style={{ marginTop: '32px' }} className="glass-panel">
        <div style={{ padding: '24px', borderBottom: '1px solid rgba(0,0,0,0.05)', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Activity size={20} className="text-muted" />
          <h2 style={{ fontSize: '1.25rem', margin: 0 }}>Recent Activity</h2>
        </div>
        <div style={{ padding: '0 24px' }}>
          {[
            { title: 'Diwali Promo Campaign Sent', desc: 'WhatsApp broadcast to 450 contacts completed.', time: '2 hours ago' },
            { title: 'New Web Lead Captured', desc: 'John Doe filled out "Contact Us" form.', time: '5 hours ago' },
            { title: 'Automated Invoice Reminder', desc: 'Triggered for Invoice #INV-2023-08.', time: '1 day ago' },
          ].map((activity, i) => (
            <div key={i} style={{ 
              display: 'flex', 
              alignItems: 'flex-start', 
              padding: '16px 0',
              borderBottom: i !== 2 ? '1px solid rgba(0,0,0,0.05)' : 'none'
            }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--accent-main)', marginTop: '6px', marginRight: '16px' }} />
              <div style={{ flex: 1 }}>
                <h4 style={{ margin: '0 0 4px 0' }}>{activity.title}</h4>
                <p className="text-muted" style={{ margin: 0, fontSize: '0.9rem' }}>{activity.desc}</p>
              </div>
              <span className="text-muted" style={{ fontSize: '0.85rem' }}>{activity.time}</span>
            </div>
          ))}
        </div>
        <div style={{ padding: '16px 24px', background: 'rgba(0,0,0,0.02)', textAlign: 'center' }}>
          <button style={{ background: 'none', border: 'none', color: 'var(--accent-main)', fontWeight: 600, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
            View Full Report <ArrowRight size={16} />
          </button>
        </div>
      </div>

    </div>
  );
}
