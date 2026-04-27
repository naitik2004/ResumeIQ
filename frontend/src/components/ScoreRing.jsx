import { useEffect, useState } from 'react';

const ScoreRing = ({ score }) => {
  const [animatedScore, setAnimatedScore] = useState(0);
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  
  useEffect(() => {
    // Animate score on mount
    const timer = setTimeout(() => {
      setAnimatedScore(score);
    }, 100);
    return () => clearTimeout(timer);
  }, [score]);

  const offset = circumference - (animatedScore / 100) * circumference;

  let color = 'var(--red)';
  if (score >= 75) color = 'var(--green)';
  else if (score >= 50) color = 'var(--yellow)';

  return (
    <div style={{ position: 'relative', width: '140px', height: '140px' }}>
      <svg
        width="140"
        height="140"
        style={{
          transform: 'rotate(-90deg)',
          filter: `drop-shadow(0 0 8px ${color}40)`
        }}
      >
        {/* Track */}
        <circle
          cx="70"
          cy="70"
          r={radius}
          fill="transparent"
          stroke="var(--surface2)"
          strokeWidth="12"
        />
        {/* Progress Arc */}
        <circle
          cx="70"
          cy="70"
          r={radius}
          fill="transparent"
          stroke={color}
          strokeWidth="12"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          style={{ transition: 'stroke-dashoffset 1s ease-out' }}
        />
      </svg>
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <span style={{ fontFamily: 'var(--font-head)', fontSize: '36px', fontWeight: 'bold' }}>
          {score}
        </span>
        <span style={{ fontSize: '10px', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '1px' }}>
          ATS Score
        </span>
      </div>
    </div>
  );
};

export default ScoreRing;
