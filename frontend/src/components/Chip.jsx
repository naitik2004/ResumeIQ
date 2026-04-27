const Chip = ({ text, color = 'var(--accent)' }) => {
  return (
    <span
      style={{
        display: 'inline-block',
        padding: '0.4rem 0.8rem',
        backgroundColor: 'var(--surface2)',
        border: `1px solid ${color}40`,
        color: color,
        borderRadius: '6px',
        fontSize: '0.85rem',
        fontWeight: '500',
        margin: '0.25rem'
      }}
    >
      {text}
    </span>
  );
};

export default Chip;
