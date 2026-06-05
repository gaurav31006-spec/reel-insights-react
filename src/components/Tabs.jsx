import React from 'react';
import { motion } from 'framer-motion';

const Tabs = ({ activeTab, setActiveTab }) => {
  const tabs = ['Overview', 'Engagement', 'Audience'];

  return (
    <div style={{
      display: 'flex',
      borderBottom: '1px solid var(--divider-color)',
      position: 'sticky',
      top: 0,
      backgroundColor: 'var(--bg-color)',
      zIndex: 90
    }}>
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => setActiveTab(tab)}
          style={{
            flex: 1,
            padding: '16px 0',
            fontWeight: '600',
            fontSize: '15px',
            color: activeTab === tab ? 'var(--text-primary)' : 'var(--text-secondary)',
            position: 'relative',
            transition: 'color 0.2s'
          }}
        >
          {tab}
          {activeTab === tab && (
            <motion.div
              layoutId="activeTabIndicator"
              style={{
                position: 'absolute',
                bottom: -1,
                left: '20%',
                right: '20%',
                height: '2px',
                backgroundColor: 'var(--text-primary)'
              }}
            />
          )}
        </button>
      ))}
    </div>
  );
};

export default Tabs;
