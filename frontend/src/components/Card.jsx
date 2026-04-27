const Card = ({ title, children, accentColor = 'var(--accent)' }) => {
  return (
    <div
      style={{
        backgroundColor: 'var(--surface)',
        border: '1px solid var(--border)',
        borderRadius: '12px',
        padding: '1.5rem',
        height: '100%'
      }}
    >
      <h3
        style={{
          color: accentColor,
          marginBottom: '1rem',
          fontSize: '1.2rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem'
        }}
      >
        {title}
      </h3>
      <div>{children}</div>
    </div>
  );
};

export default Card;
