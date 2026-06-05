import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import {
  Info,
  Clock,
  Send,
  Heart,
  Bookmark,
  Repeat2,
  MessageCircle,
  ChevronRight,
  TrendingUp
} from 'lucide-react';

const SummaryCard = ({ label, value }) => (
  <div style={{
    backgroundColor: '#1f1f1f',
    borderRadius: '12px',
    padding: '16px',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px'
  }}>
    <span style={{ fontSize: '13px', color: '#aaa' }}>{label}</span>
    <span style={{ fontSize: '20px', fontWeight: '600' }}>{value}</span>
  </div>
);

const ImpactRow = ({ icon: Icon, label, value }) => (
  <div style={{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '16px 0',
    borderBottom: '1px solid #1a1a1a'
  }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
      <div style={{
        width: '40px',
        height: '40px',
        borderRadius: '50%',
        backgroundColor: '#1f1f1f',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <Icon size={20} color="#fff" />
      </div>
      <span style={{ fontSize: '15px' }}>{label}</span>
    </div>
    <span style={{ fontSize: '15px', fontWeight: '600' }}>{value}</span>
  </div>
);

const OverviewTab = ({ data = {} }) => {
  const [apiData, setApiData] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch("http://localhost:5000/protected", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(res => res.json())
      .then(data => setApiData(data))
      .catch(err => console.log(err));
  }, []);

  const followerPct = parseFloat(data.followerPct) || 30;
  const nonFollowerPct = parseFloat(data.nonFollowerPct) || 70;

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      style={{ padding: '24px 16px', color: '#fff' }}
    >

      {/* ================= SUMMARY ================= */}
      <div style={{ marginBottom: '40px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
          <h2 style={{ fontSize: '18px', fontWeight: '600' }}>Summary</h2>
          <Info size={16} color="#888" />
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '12px'
        }}>
          <SummaryCard label="Views" value={data.views || 0} />
          <SummaryCard label="Accounts reached" value={data.accountsReached || 0} />
          <SummaryCard label="Average watch time" value={data.avgWatchTime || '0s'} />
          <SummaryCard label="Follows" value={data.follows || 0} />
        </div>
      </div>

      {/* ================= GRAPH ================= */}
      <div style={{ marginBottom: '40px' }}>
        {/* Header with Info icon */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
          <h2 style={{ fontSize: '18px', fontWeight: '600' }}>Views over time</h2>
          <Info size={16} color="#888" />
        </div>

        {/* Follower pills */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '20px' }}>
          {['All', 'Followers', 'Non-followers'].map((label, i) => (
            <button key={label} style={{
              padding: '8px 16px',
              borderRadius: '20px',
              fontSize: '14px',
              fontWeight: '500',
              border: '1px solid #444',
              backgroundColor: i === 0 ? '#333' : 'transparent',
              color: '#fff',
              cursor: 'pointer'
            }}>{label}</button>
          ))}
        </div>

        {/* Graph Box */}
        <div style={{
          position: 'relative',
          height: '180px',
          background: '#000000',
          borderRadius: '12px',
          padding: '16px 12px 16px 45px',
          border: '1px solid #000000'
        }}>
          {/* Y labels */}
          <div style={{ position: 'absolute', left: '8px', top: '16px', fontSize: '10px', color: '#666' }}>
            {data.startPoint ?? 200}
          </div>

          <div style={{ position: 'absolute', left: '8px', top: 'calc(50% - 6px)', fontSize: '10px', color: '#666' }}>
            {data.midPoint ?? 100}
          </div>

          <div style={{ position: 'absolute', left: '8px', bottom: '16px', fontSize: '10px', color: '#666' }}>
            {data.endPoint ?? 0}
          </div>

          {/* SVG GRAPH */}
          <div style={{ position: 'relative', width: '100%', height: '100%' }}>
            <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none" style={{ overflow: 'visible' }}>
              {/* Horizontal Grid Lines */}
              <line x1="0" y1="0" x2="100" y2="0" stroke="#222" strokeWidth="0.5" />
              <line x1="0" y1="50" x2="100" y2="50" stroke="#222" strokeWidth="0.5" />
              <line x1="0" y1="100" x2="100" y2="100" stroke="#222" strokeWidth="0.5" />

              {/* Typical reel - flat dashed gray */}
              <path
                d="M 0 98 C 20 70, 50 60, 100 40"
                fill="none"
                stroke="#666"
                strokeWidth="1.5"
                strokeDasharray="5 4"
                strokeLinecap="round"
              />

              {/* This reel - glow */}
              <path
                d="M 0 97 C 10 95, 20 88, 33 55 C 45 28, 60 18, 75 12 C 88 8, 95 6, 100 5"
                fill="none"
                stroke="#d946ef"
                strokeWidth="3"
                opacity="0.12"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {/* This reel - core line */}
              <path
                d="M 0 97 C 10 95, 20 88, 33 55 C 45 28, 60 18, 75 12 C 88 8, 95 6, 100 5"
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
          <span>0h</span>
          <span>6h</span>
          <span>12h</span>
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

      {/* ================= IMPACT ================= */}
      <div style={{ marginBottom: '40px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <h2 style={{ fontSize: '18px', fontWeight: '600' }}>What impacts your views</h2>
          <Info size={16} color="#888" />
        </div>
        <p style={{ fontSize: '12px', color: '#888', marginBottom: '8px' }}>
          Rates are listed in order of importance.
        </p>

        <ImpactRow icon={Clock} label="Skip rate" value={data.skipRate || '0%'} />
        <ImpactRow icon={Send} label="Share rate" value={data.shareRate || '0%'} />
        <ImpactRow icon={Heart} label="Like rate" value={data.likeRate || '0%'} />
        <ImpactRow icon={Bookmark} label="Save rate" value={data.saveRate || '0%'} />
        <ImpactRow icon={Repeat2} label="Repost rate" value={data.repostRate || '0%'} />
        <ImpactRow icon={MessageCircle} label="Comment rate" value={data.commentRate || '0%'} />
      </div>

      {/* ================= RETENTION GRAPH ================= */}
      <div style={{ marginBottom: '40px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '24px' }}>
          <h2 style={{ fontSize: '18px', fontWeight: '600' }}>How long people watched your reel</h2>
          <Info size={16} color="#888" />
        </div>

        {/* Thumbnail Placeholder */}
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
                justifyContent: 'center',
                flexDirection: 'column',
                gap: '8px'
              }}>
                <span style={{ color: '#fff', fontSize: '10px', fontWeight: 'bold' }}>IT'S</span>
              </div>
            )}

            {/* Play Button Overlay */}
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '40px',
              height: '40px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="5 3 19 12 5 21 5 3" />
              </svg>
            </div>
          </div>
        </div>

        {/* Graph Area */}
        <div style={{
          position: 'relative',
          height: '130px',
          paddingLeft: '45px',
          paddingRight: '12px',
          paddingBottom: '20px'
        }}>
          {/* Y labels */}
          <div style={{ position: 'absolute', left: '8px', top: '-6px', fontSize: '11px', color: '#888' }}>100%</div>
          <div style={{ position: 'absolute', left: '8px', top: 'calc(50% - 14px)', fontSize: '11px', color: '#888' }}>50%</div>
          <div style={{ position: 'absolute', left: '8px', bottom: '20px', fontSize: '11px', color: '#888' }}>0</div>

          {/* SVG GRAPH */}
          <div style={{ position: 'relative', width: '100%', height: '100%' }}>
            <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none" style={{ overflow: 'visible' }}>
              <line x1="0" y1="0" x2="100" y2="0" stroke="#222" strokeWidth="0.5" />
              <line x1="0" y1="50" x2="100" y2="50" stroke="#222" strokeWidth="0.5" />
              <line x1="0" y1="100" x2="100" y2="100" stroke="#222" strokeWidth="0.5" />

              {/* Retention Curve Glow */}
              {/* Retention Glow */}
              <path
                d="M 0 85 
     C 10 80, 20 70, 30 65 
     C 40 60, 50 50, 60 40 
     C 70 30, 80 18, 90 10 
     C 95 6, 98 4, 100 2"
                fill="none"
                stroke="#d946ef"
                strokeWidth="3"
                opacity="0.12"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* Retention Core Line */}
              <path
                d="M 0 85 
     C 10 80, 20 70, 30 65 
     C 40 60, 50 50, 60 40 
     C 70 30, 80 18, 90 10 
     C 95 6, 98 4, 100 2"
                fill="none"
                stroke="#d946ef"
                strokeWidth="1"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          {/* X labels */}
          <div style={{
            position: 'absolute',
            bottom: 0,
            left: '45px',
            right: '12px',
            display: 'flex',
            justifyContent: 'space-between',
            fontSize: '11px',
            color: '#888'
          }}>
            <span>0:00</span>
            <span>0:19</span>
          </div>
        </div>
      </div>

      {/* ================= TOP SOURCES ================= */}
      <div style={{ marginBottom: '40px' }}>
        <h2 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '16px' }}>
          Top sources
        </h2>

        {[
          { label: 'Reels tab', value: '57.9%', w: '57%' },
          { label: 'Explore', value: '26%', w: '26%' },
          { label: 'Profile', value: '10%', w: '10%' }
        ].map((s) => (
          <div key={s.label} style={{ marginBottom: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>{s.label}</span>
              <span>{s.value}</span>
            </div>

            <div style={{
              height: '6px',
              background: '#222',
              borderRadius: '4px',
              marginTop: '6px'
            }}>
              <div style={{
                width: s.w,
                height: '100%',
                background: '#d946ef',
                borderRadius: '4px'
              }} />
            </div>
          </div>
        ))}
      </div>

      {/* ================= AD ================= */}
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <TrendingUp size={20} />
          <span>Boost this reel</span>
        </div>
        <ChevronRight />
      </div>

    </motion.div>
  );
};

export default OverviewTab;