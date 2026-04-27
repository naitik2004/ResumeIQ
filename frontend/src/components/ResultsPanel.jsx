import ScoreRing from './ScoreRing';
import VerdictBadge from './VerdictBadge';
import Card from './Card';
import Chip from './Chip';

const ResultsPanel = ({ data }) => {
  if (!data) return null;

  return (
    <div style={{ animation: 'fadeUp 0.5s ease-out', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      
      {/* Top Row: Score, Verdict, Summary */}
      <div style={{ display: 'flex', gap: '2rem', alignItems: 'center', backgroundColor: 'var(--surface)', padding: '2rem', borderRadius: '12px', border: '1px solid var(--border)', flexWrap: 'wrap' }}>
        <ScoreRing score={data.ats_score} />
        <div style={{ flex: 1, minWidth: '300px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
            <h2 style={{ margin: 0 }}>Analysis Complete</h2>
            <VerdictBadge verdict={data.verdict} />
          </div>
          <p style={{ color: 'var(--text)', lineHeight: '1.6', marginBottom: '0.5rem' }}>{data.summary}</p>
          <p style={{ color: 'var(--muted)', fontSize: '0.9rem', fontStyle: 'italic' }}>Reason: {data.verdict_reason}</p>
        </div>
      </div>

      {/* Row 2: Strengths & Weaknesses */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
        <Card title="Strengths" accentColor="var(--green)">
          <ul style={{ paddingLeft: '1.2rem', color: 'var(--text)', lineHeight: '1.8' }}>
            {data.strengths?.map((item, i) => <li key={i}>{item}</li>)}
          </ul>
        </Card>
        
        <Card title="Weaknesses" accentColor="var(--red)">
          <ul style={{ paddingLeft: '1.2rem', color: 'var(--text)', lineHeight: '1.8' }}>
            {data.weaknesses?.map((item, i) => <li key={i}>{item}</li>)}
          </ul>
        </Card>
      </div>

      {/* Row 3 & Row 4: Keywords & Skill Gaps */}
      <Card title="Missing Keywords" accentColor="var(--accent2)">
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
          {data.missing_keywords?.map((kw, i) => <Chip key={i} text={kw} color="var(--accent2)" />)}
        </div>
      </Card>

      <Card title="Skill Gaps" accentColor="var(--yellow)">
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
          {data.skill_gaps?.map((gap, i) => <Chip key={i} text={gap} color="var(--yellow)" />)}
        </div>
      </Card>

      {/* Row 5: Improvements */}
      <Card title="Actionable Improvements">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {data.improvements?.map((imp, i) => (
            <div key={i} style={{ padding: '1rem', borderLeft: '4px solid var(--accent)', backgroundColor: 'var(--surface2)', borderRadius: '0 8px 8px 0' }}>
              <strong style={{ display: 'block', color: 'var(--accent)', marginBottom: '0.25rem' }}>{imp.section}</strong>
              <p style={{ color: 'var(--text)', fontSize: '0.95rem', margin: 0 }}>{imp.suggestion}</p>
            </div>
          ))}
        </div>
      </Card>

    </div>
  );
};

export default ResultsPanel;
