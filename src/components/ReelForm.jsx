import React, { useState } from 'react';
import { Camera, Image, Heart, MessageCircle, Repeat2, Send, Bookmark, Eye, UserPlus, TrendingUp, Clock, Share2 } from 'lucide-react';

const InputField = ({ label, icon: Icon, name, value, onChange, type = 'text', placeholder }) => (
  <div style={{ marginBottom: '16px' }}>
    <label style={{ display: 'block', fontSize: '13px', color: '#a8a8a8', marginBottom: '8px', fontWeight: '500' }}>
      {label}
    </label>
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      backgroundColor: '#1f1f1f',
      border: '1px solid #333',
      borderRadius: '12px',
      padding: '14px 16px',
      transition: 'border-color 0.2s'
    }}
    onFocus={(e) => e.currentTarget.style.borderColor = '#0095f6'}
    onBlur={(e) => e.currentTarget.style.borderColor = '#333'}
    >
      {Icon && <Icon size={18} color="#a8a8a8" />}
      <input
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder || ''}
        style={{
          background: 'none',
          border: 'none',
          outline: 'none',
          color: '#f5f5f5',
          fontSize: '15px',
          width: '100%',
          fontFamily: 'inherit'
        }}
      />
    </div>
  </div>
);

const SectionTitle = ({ children }) => (
  <div style={{
    fontSize: '13px',
    fontWeight: '700',
    color: '#a8a8a8',
    letterSpacing: '0.8px',
    textTransform: 'uppercase',
    marginBottom: '16px',
    marginTop: '28px'
  }}>
    {children}
  </div>
);

const ReelForm = ({ onSubmit }) => {
  const [form, setForm] = useState({
    imageUrl: '',
    views: '',
    accountsReached: '',
    avgWatchTime: '',
    follows: '',
    likes: '',
    comments: '',
    reposts: '',
    shares: '',
    saves: '',
    profileVisits: '',
    skipRate: '',
    shareRate: '',
    likeRate: '',
    saveRate: '',
    repostRate: '',
    commentRate: '',
    followerPct: '',
    nonFollowerPct: '',
    menPct: '',
    womenPct: '',
    country1Name: '', country1Pct: '',
    country2Name: '', country2Pct: '',
    country3Name: '', country3Pct: '',
    country4Name: '', country4Pct: '',
    country5Name: '', country5Pct: '',
  });

  const [preview, setPreview] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    if (name === 'imageUrl') setPreview(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const followerP    = parseFloat(form.followerPct)    || 0;
    const nonFollowerP = parseFloat(form.nonFollowerPct) || (100 - followerP);
    const menP         = parseFloat(form.menPct)         || 70.4;
    const womenP       = parseFloat(form.womenPct)       || 29.6;

    // Build country array from filled entries
    const countries = [1,2,3,4,5]
      .map(i => ({
        label: form[`country${i}Name`],
        pct:   parseFloat(form[`country${i}Pct`]) || 0,
      }))
      .filter(c => c.label && c.pct > 0)
      .map(c => ({ ...c, value: c.pct.toFixed(1) + '%' }));

    onSubmit({
      ...form,
      views:          form.views          || '0',
      accountsReached:form.accountsReached|| '0',
      avgWatchTime:   form.avgWatchTime   || '0s',
      follows:        form.follows        || '0',
      likes:          form.likes          || '0',
      comments:       form.comments       || '0',
      reposts:        form.reposts        || '0',
      shares:         form.shares         || '0',
      saves:          form.saves          || '0',
      profileVisits:  form.profileVisits  || '0',
      skipRate:    form.skipRate    ? form.skipRate    + '%' : '0.0%',
      shareRate:   form.shareRate   ? form.shareRate   + '%' : '0.0%',
      likeRate:    form.likeRate    ? form.likeRate    + '%' : '0.0%',
      saveRate:    form.saveRate    ? form.saveRate    + '%' : '0.0%',
      repostRate:  form.repostRate  ? form.repostRate  + '%' : '0.0%',
      commentRate: form.commentRate ? form.commentRate + '%' : '0.0%',
      followerPct:    followerP,
      nonFollowerPct: nonFollowerP,
      menPct:         menP,
      womenPct:       womenP,
      countries:      countries.length ? countries : null,
    });
  };

  return (
    <div style={{ height: '100%', overflowY: 'auto', scrollbarWidth: 'none' }}>
      {/* Header */}
      <div style={{
        background: 'linear-gradient(135deg, #833ab4, #fd1d1d, #fcb045)',
        padding: '32px 20px 24px',
        textAlign: 'center',
        position: 'sticky',
        top: 0,
        zIndex: 10
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', marginBottom: '6px' }}>
          <Camera size={24} color="white" />
          <h1 style={{ fontSize: '22px', fontWeight: '700', color: 'white' }}>Reel Insights</h1>
        </div>
        <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.8)' }}>Enter your reel data to see insights</p>
      </div>

      <form onSubmit={handleSubmit} style={{ padding: '20px 16px 32px' }}>
        {/* Thumbnail */}
        <SectionTitle>Reel Thumbnail</SectionTitle>
        <InputField label="Image URL" icon={Image} name="imageUrl" value={form.imageUrl} onChange={handleChange} placeholder="https://your-image-url.com/photo.jpg" />
        
        {preview && (
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '8px' }}>
            <div style={{ width: '120px', height: '200px', borderRadius: '8px', overflow: 'hidden', border: '2px solid #833ab4' }}>
              <img src={preview} alt="preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={(e) => { e.target.style.display = 'none'; }} />
            </div>
          </div>
        )}

        {/* Engagement */}
        <SectionTitle>Post Interactions</SectionTitle>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
          <InputField label="Likes" icon={Heart} name="likes" value={form.likes} onChange={handleChange} type="string" placeholder="171" />
          <InputField label="Comments" icon={MessageCircle} name="comments" value={form.comments} onChange={handleChange} type="string" placeholder="0" />
          <InputField label="Reposts" icon={Repeat2} name="reposts" value={form.reposts} onChange={handleChange} type="string" placeholder="1" />
          <InputField label="Shares" icon={Send} name="shares" value={form.shares} onChange={handleChange} type="string" placeholder="0" />
          <InputField label="Saves" icon={Bookmark} name="saves" value={form.saves} onChange={handleChange} type="string" placeholder="0" />
          <InputField label="Profile Visits" icon={Eye} name="profileVisits" value={form.profileVisits} onChange={handleChange} type="string" placeholder="0" />
        </div>

        {/* Overview */}
        <SectionTitle>Performance Summary</SectionTitle>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
          <InputField label="Views" icon={Eye} name="views" value={form.views} onChange={handleChange} type="number" placeholder="10363" />
          <InputField label="Accounts Reached" icon={UserPlus} name="accountsReached" value={form.accountsReached} onChange={handleChange} type="number" placeholder="64" />
          <InputField label="Avg Watch Time" icon={Clock} name="avgWatchTime" value={form.avgWatchTime} onChange={handleChange} placeholder="20.6s" />
          <InputField label="Follows" icon={UserPlus} name="follows" value={form.follows} onChange={handleChange} type="number" placeholder="0" />
        </div>

        {/* Rates */}
        <SectionTitle>Impact Rates (%)</SectionTitle>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
          <InputField label="Skip Rate (%)" icon={TrendingUp} name="skipRate" value={form.skipRate} onChange={handleChange} type="number" placeholder="1.3" />
          <InputField label="Share Rate (%)" icon={Share2} name="shareRate" value={form.shareRate} onChange={handleChange} type="number" placeholder="0.0" />
          <InputField label="Like Rate (%)" icon={Heart} name="likeRate" value={form.likeRate} onChange={handleChange} type="number" placeholder="8.1" />
          <InputField label="Save Rate (%)" icon={Bookmark} name="saveRate" value={form.saveRate} onChange={handleChange} type="number" placeholder="0.0" />
          <InputField label="Repost Rate (%)" icon={Repeat2} name="repostRate" value={form.repostRate} onChange={handleChange} type="number" placeholder="0.0" />
          <InputField label="Comment Rate (%)" icon={MessageCircle} name="commentRate" value={form.commentRate} onChange={handleChange} type="number" placeholder="0.0" />
        </div>

        {/* Audience */}
        <SectionTitle>Audience Split</SectionTitle>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
          <InputField label="Followers (%)" icon={UserPlus} name="followerPct" value={form.followerPct} onChange={handleChange} type="number" placeholder="0" />
          <InputField label="Non-followers (%)" icon={UserPlus} name="nonFollowerPct" value={form.nonFollowerPct} onChange={handleChange} type="number" placeholder="100" />
        </div>

        {/* Gender */}
        <SectionTitle>Gender Split</SectionTitle>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
          <InputField label="Men (%)" icon={UserPlus} name="menPct" value={form.menPct} onChange={handleChange} type="number" placeholder="70.4" />
          <InputField label="Women (%)" icon={UserPlus} name="womenPct" value={form.womenPct} onChange={handleChange} type="number" placeholder="29.6" />
        </div>

        {/* Countries */}
        <SectionTitle>Top Countries</SectionTitle>
        {[1,2,3,4,5].map(i => (
          <div key={i} style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '12px' }}>
            <InputField label={`Country ${i}`} icon={UserPlus} name={`country${i}Name`} value={form[`country${i}Name`]} onChange={handleChange} placeholder={['India','Thailand','Brazil','Japan','Turkey'][i-1]} />
            <InputField label="%" icon={TrendingUp} name={`country${i}Pct`} value={form[`country${i}Pct`]} onChange={handleChange} type="number" placeholder={['61.5','6.4','3.5','2.7','2.6'][i-1]} />
          </div>
        ))}

        <button
          type="submit"
          style={{
            width: '100%',
            padding: '18px',
            marginTop: '24px',
            background: 'linear-gradient(135deg, #833ab4, #fd1d1d, #fcb045)',
            color: 'white',
            fontSize: '16px',
            fontWeight: '700',
            borderRadius: '16px',
            border: 'none',
            cursor: 'pointer',
            letterSpacing: '0.5px',
            boxShadow: '0 4px 20px rgba(131,58,180,0.4)',
            transition: 'opacity 0.2s, transform 0.1s',
          }}
          onMouseDown={(e) => e.currentTarget.style.transform = 'scale(0.98)'}
          onMouseUp={(e) => e.currentTarget.style.transform = 'scale(1)'}
        >
          View Insights →
        </button>
      </form>
    </div>
  );
};

export default ReelForm;
