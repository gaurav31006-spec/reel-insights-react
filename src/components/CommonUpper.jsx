import React from 'react';
import { Heart, MessageCircle, Repeat2, Send, Bookmark } from 'lucide-react';

const MetricIcon = ({ Icon, count }) => (
  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
    <Icon size={24} color="#fff" />
    <span style={{ fontSize: '15px', fontWeight: '500', color: '#fff' }}>{count}</span>
  </div>
);

const CommonUpper = ({ data }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '16px 0 0 0' }}>
      <div style={{
        width: '160px',
        height: '280px',
        borderRadius: '8px',
        marginBottom: '24px',
        position: 'relative',
        overflow: 'hidden',
        border: '1px solid #333',
        backgroundColor: '#111'
      }}>
        {data.imageUrl ? (
          <img
            src={data.imageUrl}
            alt="reel thumbnail"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        ) : (
          <div style={{
            width: '100%', height: '100%',
            background: 'linear-gradient(135deg, #1a1a1a, #2a2a2a)',
            display: 'flex', alignItems: 'center', justifyContent: 'center'
          }}>
            <span style={{ color: '#555', fontSize: '13px' }}>No image</span>
          </div>
        )}
      </div>

      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        width: '100%',
        padding: '0 32px',
        marginBottom: '16px'
      }}>
        <MetricIcon Icon={Heart} count={data.likes || '0'} />
        <MetricIcon Icon={MessageCircle} count={data.comments || '0'} />
        <MetricIcon Icon={Repeat2} count={data.reposts || '0'} />
        <MetricIcon Icon={Send} count={data.shares || '0'} />
        <MetricIcon Icon={Bookmark} count={data.saves || '0'} />
      </div>
    </div>
  );
};

export default CommonUpper;
