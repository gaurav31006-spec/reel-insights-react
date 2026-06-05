import React from 'react';
import { Play, Heart, MessageCircle, Send, Bookmark } from 'lucide-react';

const ReelInfo = () => {
  return (
    <div style={{ padding: '16px', display: 'flex', gap: '16px', alignItems: 'center' }}>
      <div style={{
        width: '64px',
        height: '64px',
        borderRadius: '8px',
        backgroundColor: 'var(--surface-color-light)',
        backgroundImage: 'linear-gradient(45deg, #2a2a2a, #1a1a1a)',
        flexShrink: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Mock image placeholder */}
        <div style={{
          position: 'absolute',
          bottom: '4px',
          left: '4px',
          display: 'flex',
          alignItems: 'center',
          gap: '2px',
          fontSize: '10px',
          fontWeight: '600',
          backgroundColor: 'rgba(0,0,0,0.6)',
          padding: '2px 4px',
          borderRadius: '4px'
        }}>
          <Play size={10} fill="white" /> 12.4k
        </div>
      </div>
      
      <div style={{ flex: 1 }}>
        <div style={{ color: 'var(--text-secondary)', fontSize: '12px', marginBottom: '4px' }}>
          May 14 • 11:30 AM
        </div>
        <div style={{ fontSize: '14px', fontWeight: '500', lineHeight: '1.4', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
          Wait until the end to see the craziest transition! 🤯🔥 #reels #viral #editing
        </div>
      </div>
    </div>
  );
};

export default ReelInfo;
