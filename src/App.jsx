import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Header from './components/Header';
import CommonUpper from './components/CommonUpper';
import Tabs from './components/Tabs';
import OverviewTab from './components/OverviewTab';
import EngagementTab from './components/EngagementTab';
import AudienceTab from './components/AudienceTab';
import ReelForm from './components/ReelForm';
import './App.css';

const defaultData = {
  imageUrl: '',
  likes: 0,
  comments: 0,
  reposts: 1,
  shares: 0,
  saves: 0,
  views: 0,
  accountsReached: 0,
  avgWatchTime: '0s',
  follows: 0,
  skipRate: '0.0%',
  shareRate: '0.0%',
  likeRate: '0.0%',
  saveRate: '0.0%',
  repostRate: '0.0%',
  commentRate: '0.0%',
  followerPct: 0,
  nonFollowerPct: 100,
  profileVisits: 0,
};

function App() {
  const [activeTab, setActiveTab] = useState('Overview');
  const [reelData, setReelData] = useState(null);

  const handleFormSubmit = (data) => {
    setReelData(data);
  };

  const handleBack = () => {
    setReelData(null);
    setActiveTab('Overview');
  };

  return (
    <div className="app-container">
      <AnimatePresence mode="wait">
        {!reelData ? (
          <motion.div
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, x: -40 }}
            style={{ height: '100%' }}
          >
            <ReelForm onSubmit={handleFormSubmit} />
          </motion.div>
        ) : (
          <motion.div
            key="insights"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0 }}
            style={{ height: '100%', display: 'flex', flexDirection: 'column' }}
          >
            <Header onBack={handleBack} />
            <div className="content-area">
              <CommonUpper data={reelData} />
              <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
              <AnimatePresence mode="wait">
                {activeTab === 'Overview' && <OverviewTab key="overview" data={reelData} />}
                {activeTab === 'Engagement' && <EngagementTab key="engagement" data={reelData} />}
                {activeTab === 'Audience' && <AudienceTab key="audience" data={reelData} />}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
