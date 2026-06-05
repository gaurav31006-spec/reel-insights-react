import React from 'react';
import { motion } from 'framer-motion';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler
);

const ReachTab = () => {
  const chartData = {
    labels: ['0s', '3s', '6s', '9s', '12s', '15s'],
    datasets: [
      {
        fill: true,
        label: 'Retention',
        data: [100, 75, 60, 45, 30, 20],
        borderColor: 'var(--accent-color)',
        backgroundColor: 'rgba(0, 149, 246, 0.2)',
        tension: 0.4,
        pointRadius: 0,
        pointHoverRadius: 4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        mode: 'index',
        intersect: false,
        backgroundColor: 'rgba(0,0,0,0.8)',
        titleColor: '#fff',
        bodyColor: '#fff',
      },
    },
    scales: {
      x: {
        grid: { display: false, drawBorder: false },
        ticks: { color: 'var(--text-secondary)', maxTicksLimit: 6 }
      },
      y: {
        grid: { color: 'var(--divider-color)', drawBorder: false },
        ticks: { color: 'var(--text-secondary)', stepSize: 25, callback: (value) => value + '%' },
        min: 0,
        max: 100
      }
    },
    interaction: {
      mode: 'nearest',
      axis: 'x',
      intersect: false
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      style={{ padding: '16px' }}
    >
      <div style={{
        backgroundColor: 'var(--surface-color)',
        borderRadius: '12px',
        padding: '16px',
        marginBottom: '16px'
      }}>
        <h2 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '8px' }}>Audience retention</h2>
        <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '16px' }}>
          See how long people are watching your Reel. A drop-off indicates where viewers scroll past.
        </p>
        
        <div style={{ display: 'flex', gap: '16px', marginBottom: '16px' }}>
          <div>
            <div style={{ fontSize: '24px', fontWeight: '600' }}>32%</div>
            <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Skip rate</div>
          </div>
          <div>
            <div style={{ fontSize: '24px', fontWeight: '600' }}>8.4s</div>
            <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Avg. watch time</div>
          </div>
        </div>

        <div style={{ height: '200px', width: '100%' }}>
          <Line options={chartOptions} data={chartData} />
        </div>
      </div>

      <div style={{
        backgroundColor: 'var(--surface-color)',
        borderRadius: '12px',
        padding: '16px'
      }}>
        <h2 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '16px' }}>Accounts reached</h2>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '8px' }}>
          <span style={{ fontSize: '28px', fontWeight: '600' }}>8,230</span>
        </div>
        
        {/* Progress Bar for Followers vs Non-Followers */}
        <div style={{ display: 'flex', height: '12px', borderRadius: '6px', overflow: 'hidden', marginBottom: '16px' }}>
          <div style={{ width: '28%', backgroundColor: 'var(--accent-color)' }}></div>
          <div style={{ width: '72%', backgroundColor: '#4a4a4a' }}></div>
        </div>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--accent-color)' }}></div>
            <span style={{ fontSize: '14px' }}>Followers</span>
          </div>
          <span style={{ fontSize: '14px', fontWeight: '500' }}>2,304 (28%)</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#4a4a4a' }}></div>
            <span style={{ fontSize: '14px' }}>Non-followers</span>
          </div>
          <span style={{ fontSize: '14px', fontWeight: '500' }}>5,926 (72%)</span>
        </div>
      </div>
    </motion.div>
  );
};

export default ReachTab;
