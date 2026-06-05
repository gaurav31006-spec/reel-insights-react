import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Info } from 'lucide-react';

/* ── Horizontal bar row ── */
const BarRow = ({ label, value, pct }) => (
  <div style={{ marginBottom: '22px' }}>
    <span style={{ fontSize: '15px', color: '#fff', display: 'block', marginBottom: '8px' }}>
      {label}
    </span>
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
      <div style={{
        flex: 1,
        height: '8px',
        backgroundColor: '#2a2a2a',
        borderRadius: '99px',
        overflow: 'hidden'
      }}>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          style={{ height: '100%', backgroundColor: '#ff0069', borderRadius: '99px' }}
        />
      </div>
      <span style={{ fontSize: '14px', fontWeight: '700', color: '#fff', minWidth: '44px', textAlign: 'right' }}>
        {value}
      </span>
    </div>
  </div>
);

/* ── Small thin SVG Donut ── */
const DonutChart = ({ menPct, womenPct }) => {
  const r   = 40;
  const cx  = 50;
  const cy  = 50;
  const circ = 2 * Math.PI * r;
  const gap  = 2;

  const menDash   = (menPct   / 100) * circ;
  const womenDash = (womenPct / 100) * circ;

  return (
    <svg width="100" height="100" viewBox="0 0 100 100">
      {/* track */}
      <circle cx={cx} cy={cy} r={r} fill="none" stroke="#2a2a2a" strokeWidth="10" />
      {/* men – pink */}
      <circle
        cx={cx} cy={cy} r={r}
        fill="none" stroke="#ff0069" strokeWidth="10"
        strokeDasharray={`${menDash - gap} ${circ - menDash + gap}`}
        strokeDashoffset={circ / 4}
        strokeLinecap="butt"
      />
      {/* women – purple */}
      <circle
        cx={cx} cy={cy} r={r}
        fill="none" stroke="#a855f7" strokeWidth="10"
        strokeDasharray={`${womenDash - gap} ${circ - womenDash + gap}`}
        strokeDashoffset={circ / 4 - menDash + gap}
        strokeLinecap="butt"
      />
    </svg>
  );
};

/* ══════════════ MAIN ══════════════ */
const defaultCountries = [
  { label: 'India',    value: '61.5%', pct: 61.5 },
  { label: 'Thailand', value: '6.4%',  pct: 6.4  },
  { label: 'Brazil',   value: '3.5%',  pct: 3.5  },
  { label: 'Japan',    value: '2.7%',  pct: 2.7  },
  { label: 'Turkey',   value: '2.6%',  pct: 2.6  },
];

const defaultAges = [
  { label: '13-17', value: '2.4%',  pct: 2.4  },
  { label: '18-24', value: '25.0%', pct: 25.0 },
  { label: '25-34', value: '44.5%', pct: 44.5 },
  { label: '35-44', value: '16.4%', pct: 16.4 },
  { label: '45-54', value: '7.9%',  pct: 7.9  },
  { label: '55-64', value: '1.9%',  pct: 1.9  },
  { label: '65+',   value: '1.9%',  pct: 1.9  },
];

const AudienceTab = ({ data = {} }) => {
  const [activeFilter, setActiveFilter] = useState('Gender');
  const filters = ['Gender', 'Country', 'Age'];

  const menPct   = parseFloat(data.menPct)   || 70.4;
  const womenPct = parseFloat(data.womenPct) || 29.6;

  /* Use form countries if available, else defaults */
  const countries = (data.countries && data.countries.length > 0)
    ? data.countries
    : defaultCountries;

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      style={{ padding: '24px 16px', color: '#fff' }}
    >

      {/* Heading */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '24px' }}>
        <h2 style={{ fontSize: '22px', fontWeight: '700' }}>Audience</h2>
        <Info size={18} color="#888" />
      </div>

      {/* Pills */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '32px' }}>
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setActiveFilter(f)}
            style={{
              padding: '10px 20px',
              borderRadius: '20px',
              fontSize: '15px',
              fontWeight: '600',
              border: '1px solid #444',
              backgroundColor: activeFilter === f ? '#333' : 'transparent',
              color: '#fff',
              cursor: 'pointer',
              transition: 'background-color 0.2s'
            }}
          >
            {f}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">

        {/* ── GENDER ── */}
        {activeFilter === 'Gender' && (
          <motion.div key="gender"
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.25 }}
          >
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '20px',
              padding: '16px 0'
            }}>
              {/* Men */}
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '24px', fontWeight: '800' }}>{menPct}%</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '5px', justifyContent: 'flex-end', marginTop: '4px' }}>
                  <span style={{ fontSize: '13px', color: '#aaa' }}>Men</span>
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#ff0069' }} />
                </div>
              </div>

              {/* Donut – small & thin */}
              <DonutChart menPct={menPct} womenPct={womenPct} />

              {/* Women */}
              <div style={{ textAlign: 'left' }}>
                <div style={{ fontSize: '24px', fontWeight: '800' }}>{womenPct}%</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '5px', marginTop: '4px' }}>
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#a855f7' }} />
                  <span style={{ fontSize: '13px', color: '#aaa' }}>Women</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* ── COUNTRY ── */}
        {activeFilter === 'Country' && (
          <motion.div key="country"
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.25 }}
          >
            {countries.map((c) => (
              <BarRow key={c.label} {...c} />
            ))}
          </motion.div>
        )}

        {/* ── AGE ── */}
        {activeFilter === 'Age' && (
          <motion.div key="age"
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.25 }}
          >
            {defaultAges.map((a) => (
              <BarRow key={a.label} {...a} />
            ))}
          </motion.div>
        )}

      </AnimatePresence>
    </motion.div>
  );
};

export default AudienceTab;
