import { ArrowLeft, TrendingUp, MoreVertical } from 'lucide-react';

const Header = ({ onBack }) => {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '16px',
      backgroundColor: 'var(--bg-color)',
      position: 'sticky',
      top: 0,
      zIndex: 100,
      height: '56px'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
        <button style={{ padding: '4px 0' }} onClick={onBack}>
          <ArrowLeft size={24} />
        </button>
        <h1 style={{ fontSize: '20px', fontWeight: '600' }}>Reel insights</h1>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        <button><TrendingUp size={24} /></button>
        <button><MoreVertical size={24} /></button>
      </div>
    </div>
  );
};

export default Header;
