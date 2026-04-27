import { VERDICTS } from '../constants/verdicts';

const VerdictBadge = ({ verdict }) => {
  const config = VERDICTS[verdict] || VERDICTS['PASS'];

  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.5rem',
        padding: '0.5rem 1rem',
        backgroundColor: config.bg,
        border: `1px solid ${config.border}`,
        color: config.color,
        borderRadius: '9999px',
        fontFamily: 'var(--font-head)',
        fontWeight: 'bold',
        textTransform: 'uppercase',
        fontSize: '0.875rem',
        letterSpacing: '0.5px'
      }}
    >
      <span>{config.icon}</span>
      <span>{config.label}</span>
    </div>
  );
};

export default VerdictBadge;
