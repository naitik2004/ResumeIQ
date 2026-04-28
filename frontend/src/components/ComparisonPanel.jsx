import ScoreRing from './ScoreRing';
import VerdictBadge from './VerdictBadge';

const ComparisonPanel = ({ data }) => {
  if (!data || !data.analysis_a || !data.analysis_b) return null;

  const { analysis_a, analysis_b, comparison } = data;

  return (
    <div className="comparison-container" style={{ animation: 'fadeUp 0.6s ease-out' }}>
      <div className="comparison-header glass-card" style={{ padding: '2rem', marginBottom: '2rem', textAlign: 'center' }}>
        <h2 className="gradient-text" style={{ fontSize: '2rem', marginBottom: '1rem' }}>Comparison Verdict</h2>
        <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--accent)' }}>
          Winner: {comparison.winner}
        </div>
        <p style={{ color: 'var(--muted)', marginTop: '1rem', maxWidth: '600px', marginInline: 'auto' }}>
          {comparison.rationale}
        </p>
      </div>

      <div className="comparison-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
        {/* Resume A */}
        <div className="glass-card" style={{ padding: '2rem' }}>
          <h3 style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            {analysis_a.candidate_name || "Resume A"}
            <VerdictBadge verdict={analysis_a.verdict} />
          </h3>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2rem' }}>
            <ScoreRing score={analysis_a.ats_score} size={150} />
          </div>
          <p style={{ color: 'var(--text)', lineHeight: '1.6', marginBottom: '1.5rem' }}>{analysis_a.summary}</p>
          
          <div style={{ marginBottom: '1.5rem' }}>
            <h4 style={{ fontSize: '0.9rem', color: 'var(--accent)', marginBottom: '0.5rem', textTransform: 'uppercase' }}>Top Skills</h4>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              {analysis_a.top_skills.map(skill => (
                <span key={skill} style={{ padding: '0.3rem 0.8rem', background: 'rgba(255,255,255,0.05)', borderRadius: '6px', fontSize: '0.8rem' }}>{skill}</span>
              ))}
            </div>
          </div>

          <div>
            <h4 style={{ fontSize: '0.9rem', color: 'var(--red)', marginBottom: '0.5rem', textTransform: 'uppercase' }}>Critical Gap</h4>
            <p style={{ fontSize: '0.9rem', color: 'var(--muted)' }}>{analysis_a.critical_gap}</p>
          </div>
        </div>

        {/* Resume B */}
        <div className="glass-card" style={{ padding: '2rem' }}>
          <h3 style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            {analysis_b.candidate_name || "Resume B"}
            <VerdictBadge verdict={analysis_b.verdict} />
          </h3>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2rem' }}>
            <ScoreRing score={analysis_b.ats_score} size={150} />
          </div>
          <p style={{ color: 'var(--text)', lineHeight: '1.6', marginBottom: '1.5rem' }}>{analysis_b.summary}</p>

          <div style={{ marginBottom: '1.5rem' }}>
            <h4 style={{ fontSize: '0.9rem', color: 'var(--accent)', marginBottom: '0.5rem', textTransform: 'uppercase' }}>Top Skills</h4>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              {analysis_b.top_skills.map(skill => (
                <span key={skill} style={{ padding: '0.3rem 0.8rem', background: 'rgba(255,255,255,0.05)', borderRadius: '6px', fontSize: '0.8rem' }}>{skill}</span>
              ))}
            </div>
          </div>

          <div>
            <h4 style={{ fontSize: '0.9rem', color: 'var(--red)', marginBottom: '0.5rem', textTransform: 'uppercase' }}>Critical Gap</h4>
            <p style={{ fontSize: '0.9rem', color: 'var(--muted)' }}>{analysis_b.critical_gap}</p>
          </div>
        </div>
      </div>

      <div className="glass-card" style={{ padding: '2rem', marginTop: '2rem' }}>
        <h3 style={{ marginBottom: '1.5rem' }}>Detailed Breakdown</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
          <div>
            <h4 style={{ color: 'var(--accent)', marginBottom: '0.5rem' }}>Technical Depth</h4>
            <p style={{ color: 'var(--muted)', fontSize: '0.95rem' }}>{comparison.technical_comparison}</p>
          </div>
          <div>
            <h4 style={{ color: 'var(--accent)', marginBottom: '0.5rem' }}>Project Impact</h4>
            <p style={{ color: 'var(--muted)', fontSize: '0.95rem' }}>{comparison.project_comparison}</p>
          </div>
        </div>
      </div>

      <div className="differences-section glass-card" style={{ padding: '2rem', marginTop: '2rem' }}>
        <h3 style={{ marginBottom: '1.5rem' }}>Key Differentiators</h3>
        <ul style={{ listStyle: 'none' }}>
          {comparison.differences.map((diff, index) => (
            <li key={index} style={{ 
              padding: '1rem', 
              borderBottom: index !== comparison.differences.length - 1 ? '1px solid var(--border)' : 'none',
              color: 'var(--muted)',
              display: 'flex',
              alignItems: 'start',
              gap: '1rem'
            }}>
              <span style={{ color: 'var(--accent)' }}>✦</span>
              {diff}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ComparisonPanel;
