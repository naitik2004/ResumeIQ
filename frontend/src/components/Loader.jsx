const Loader = ({ streamText }) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '4rem 2rem',
        animation: 'fadeUp 0.5s ease-out'
      }}
    >
      <div
        style={{
          width: '50px',
          height: '50px',
          border: '4px solid var(--surface2)',
          borderTopColor: 'var(--accent)',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite',
          marginBottom: '2rem'
        }}
      />
      <h3 style={{ marginBottom: '1rem', color: 'var(--accent)' }}>Analysing Resume...</h3>
      <p style={{ color: 'var(--muted)', fontSize: '0.9rem', marginBottom: '2rem' }}>
        Extracting text, evaluating skills, and matching keywords.
      </p>

      {/* Stream Preview */}
      <div
        style={{
          width: '100%',
          maxWidth: '600px',
          backgroundColor: 'var(--surface)',
          border: '1px solid var(--border)',
          borderRadius: '8px',
          padding: '1rem',
          textAlign: 'left',
          fontFamily: 'monospace',
          fontSize: '0.85rem',
          color: 'var(--muted)',
          height: '150px',
          overflowY: 'auto',
          whiteSpace: 'pre-wrap',
          wordBreak: 'break-word',
          position: 'relative'
        }}
      >
        {streamText || 'Connecting to Claude...'}
        <span
          style={{
            display: 'inline-block',
            width: '6px',
            height: '14px',
            backgroundColor: 'var(--accent)',
            marginLeft: '4px',
            animation: 'fadeUp 0.5s infinite alternate'
          }}
        />
      </div>
    </div>
  );
};

export default Loader;
