import React from 'react';
import { motion } from 'framer-motion';
import { Info } from 'lucide-react';

const Row = ({ label, value }) => (
  <div style={{
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '16px 0',
    borderBottom: '1px solid #1a1a1a'
  }}>
    <span style={{ fontSize: '15px', color: '#fff' }}>{label}</span>
    <span style={{ fontSize: '16px', fontWeight: '600', color: '#fff' }}>{value}</span>
  </div>
);

const EngagementTab = ({ data = {} }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      style={{ padding: '24px 16px', color: '#fff' }}
    >

      {/* Profile visits row */}
      <div style={{ marginBottom: '40px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', margin: '24px 0 16px' }}>
          <h2 style={{ fontSize: '18px', fontWeight: '600' }}>Action after viewing</h2>
          <Info size={16} color="#888" />
        </div>
        <Row label="Profile visits" value={data.profileVisits || '984'} />
      </div>


      {/* ================= INTERACTIONS ================= */}
      <div style={{ marginBottom: '40px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', margin: '24px 0 16px' }}>
          <h2 style={{ fontSize: '18px', fontWeight: '600' }}>Interactions</h2>
          <Info size={16} color="#888" />
        </div>
        <Row label="Likes" value={Number(data.likes || 0).toLocaleString()} />
        <Row label="Comments" value={Number(data.comments || 0).toLocaleString()} />
        <Row label="Reposts" value={Number(data.reposts || 0).toLocaleString()} />
        <Row label="Shares" value={Number(data.shares || 0).toLocaleString()} />
        <Row label="Saves" value={Number(data.saves || 0).toLocaleString()} />
      </div>

      {/* ================= WHEN PEOPLE LIKED YOUR REEL ================= */}
      <div style={{ marginBottom: '40px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '24px' }}>
          <h2 style={{ fontSize: '18px', fontWeight: '600' }}>When people liked your reel</h2>
          <Info size={16} color="#888" />
        </div>

        {/* Thumbnail */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '32px' }}>
          <div style={{
            width: '120px',
            height: '210px',
            borderRadius: '8px',
            overflow: 'hidden',
            border: '1px solid #333',
            backgroundColor: '#111',
            position: 'relative'
          }}>
            {data.imageUrl ? (
              <img src={data.imageUrl} alt="thumb" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            ) : (
              <div style={{
                width: '100%',
                height: '100%',
                background: 'linear-gradient(135deg, #2a2a2a, #1a1a1a)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="5 3 19 12 5 21 5 3" />
                </svg>
              </div>
            )}
          </div>
        </div>

        {/* Graph — styled identical to Overview */}
        <div style={{
          position: 'relative',
          height: '180px',
          background: '#000000',
          borderRadius: '12px',
          padding: '16px 12px 16px 45px',
          border: '1px solid #000000'
        }}>
          {/* Y labels */}
          <div style={{ position: 'absolute', left: '8px', top: '16px', fontSize: '10px', color: '#666' }}>100%</div>
          <div style={{ position: 'absolute', left: '8px', top: 'calc(50% - 6px)', fontSize: '10px', color: '#666' }}>50%</div>
          <div style={{ position: 'absolute', left: '8px', bottom: '16px', fontSize: '10px', color: '#666' }}>0</div>

          {/* SVG */}
          <div style={{ position: 'relative', width: '100%', height: '100%' }}>
            <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none" style={{ overflow: 'visible' }}>
              {/* Grid lines */}
              <line x1="0" y1="0" x2="100" y2="0" stroke="#222" strokeWidth="0.5" />
              <line x1="0" y1="50" x2="100" y2="50" stroke="#222" strokeWidth="0.5" />
              <line x1="0" y1="100" x2="100" y2="100" stroke="#222" strokeWidth="0.5" />

              {/* Typical reel — flat dashed gray */}
              {/* Typical line (dashed baseline) */}
              <path
                d="M 0 92 
     C 20 90, 40 88, 60 86 
     C 80 84, 90 82, 100 80"
                fill="none"
                stroke="#666"
                strokeWidth="1"
                strokeDasharray="5 4"
                strokeLinecap="round"
              />

              {/* This reel - smooth upward growth curve */}
              <path
                d="M 0 100 
     C 15 98, 25 85, 40 70 
     C 55 55, 70 35, 85 18 
     C 92 10, 96 6, 100 3"
                fill="none"
                stroke="#d946ef"
                strokeWidth="1"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>

        {/* X labels */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          fontSize: '11px',
          color: '#666',
          marginTop: '8px',
          paddingLeft: '45px',
          paddingRight: '12px'
        }}>
          <span>0:00</span>
          <span>0:10</span>
          <span>0:19</span>
        </div>

        {/* Legend */}
        <div style={{ display: 'flex', gap: '20px', marginTop: '14px', paddingLeft: '4px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#d946ef' }} />
            <span style={{ fontSize: '13px', color: '#aaa' }}>This reel</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#666' }} />
            <span style={{ fontSize: '13px', color: '#aaa' }}>Your typical reel</span>
          </div>
        </div>
      </div>

    </motion.div>
  );
};

export default EngagementTab;
