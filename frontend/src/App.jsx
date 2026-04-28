import { useState } from 'react';
import { useAnalyse } from './hooks/useAnalyse';
import UploadZone from './components/UploadZone';
import ResultsPanel from './components/ResultsPanel';
import ComparisonPanel from './components/ComparisonPanel';
import Loader from './components/Loader';

function App() {
  const [mode, setMode] = useState('single'); // 'single' or 'compare'
  const { 
    file, setFile, 
    fileB, setFileB,
    jd, setJd, 
    status, result, error, streamText, 
    analyse, reset 
  } = useAnalyse(mode);

  const handleFileChange = (selectedFile, id) => {
    if (id === 'resume_a' || id === 'resume') setFile(selectedFile);
    if (id === 'resume_b') setFileB(selectedFile);
  };

  const isReady = mode === 'single' ? !!file : (!!file && !!fileB);

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '3rem 1.5rem' }}>
      
      <header style={{ textAlign: 'center', marginBottom: '4rem', animation: 'fadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1)' }}>
        <h1 className="gradient-text" style={{ fontSize: '4.5rem', marginBottom: '0.5rem', letterSpacing: '-2px' }}>ResumeIQ</h1>
        <p style={{ color: 'var(--muted)', fontSize: '1.25rem', letterSpacing: '1px', textTransform: 'uppercase' }}>Elite ATS Intelligence Engine</p>
        
        {/* Mode Toggle */}
        <div className="flex-center" style={{ marginTop: '2.5rem' }}>
          <div className="glass-card" style={{ padding: '0.4rem', borderRadius: '16px', display: 'flex', gap: '0.5rem' }}>
            <button 
              onClick={() => { setMode('single'); reset(); }}
              style={{
                padding: '0.6rem 1.5rem',
                borderRadius: '12px',
                border: 'none',
                background: mode === 'single' ? 'var(--accent)' : 'transparent',
                color: mode === 'single' ? '#000' : 'var(--text)',
                cursor: 'pointer',
                fontWeight: '600',
                transition: 'all 0.3s ease'
              }}
            >
              Single
            </button>
            <button 
              onClick={() => { setMode('compare'); reset(); }}
              style={{
                padding: '0.6rem 1.5rem',
                borderRadius: '12px',
                border: 'none',
                background: mode === 'compare' ? 'var(--accent)' : 'transparent',
                color: mode === 'compare' ? '#000' : 'var(--text)',
                cursor: 'pointer',
                fontWeight: '600',
                transition: 'all 0.3s ease'
              }}
            >
              Compare
            </button>
          </div>
        </div>
      </header>

      <main>
        {status === 'idle' && (
          <div style={{ animation: 'fadeUp 0.6s ease-out', maxWidth: mode === 'compare' ? '1000px' : '700px', margin: '0 auto' }}>
            <div style={{ display: 'flex', gap: '1.5rem', flexDirection: mode === 'compare' ? 'row' : 'column' }}>
              <UploadZone 
                onFile={handleFileChange} 
                file={file} 
                label={mode === 'compare' ? "Resume A" : "Resume"} 
                id="resume_a"
              />
              {mode === 'compare' && (
                <UploadZone 
                  onFile={handleFileChange} 
                  file={fileB} 
                  label="Resume B" 
                  id="resume_b"
                />
              )}
            </div>
            
            <div className="glass-card" style={{ marginTop: '2rem', padding: '2rem' }}>
              <label htmlFor="jd" style={{ display: 'block', marginBottom: '1rem', fontWeight: 'bold', color: 'var(--muted)', fontSize: '0.9rem', textTransform: 'uppercase' }}>
                Target Job Description
              </label>
              <textarea
                id="jd"
                value={jd}
                onChange={(e) => setJd(e.target.value)}
                placeholder="Paste the target role's requirements here for a precision audit..."
                style={{
                  width: '100%',
                  height: '140px',
                  padding: '1.25rem',
                  backgroundColor: 'rgba(255,255,255,0.03)',
                  border: '1px solid var(--border)',
                  borderRadius: '12px',
                  color: 'var(--text)',
                  fontFamily: 'inherit',
                  resize: 'none',
                  outline: 'none',
                  fontSize: '1rem',
                  lineHeight: '1.5'
                }}
              />
            </div>

            <button
              onClick={analyse}
              disabled={!isReady}
              style={{
                marginTop: '2rem',
                width: '100%',
                padding: '1.25rem',
                backgroundColor: isReady ? 'var(--accent)' : 'var(--surface-opaque)',
                color: isReady ? '#000' : 'var(--muted)',
                border: 'none',
                borderRadius: '12px',
                fontSize: '1.2rem',
                fontWeight: 'bold',
                cursor: isReady ? 'pointer' : 'not-allowed',
                transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                fontFamily: 'var(--font-head)',
                transform: isReady ? 'scale(1)' : 'scale(0.98)',
                boxShadow: isReady ? '0 10px 20px rgba(0, 240, 255, 0.2)' : 'none'
              }}
            >
              {mode === 'single' ? 'Launch Analysis' : 'Start Comparison'}
            </button>
          </div>
        )}

        {status === 'loading' && <Loader streamText={streamText} />}

        {status === 'error' && (
          <div className="glass-card" style={{ textAlign: 'center', padding: '4rem', maxWidth: '600px', margin: '0 auto' }}>
            <div style={{ fontSize: '4rem', marginBottom: '1.5rem' }}>🚫</div>
            <h2 style={{ color: 'var(--red)', marginBottom: '1rem' }}>System Malfunction</h2>
            <p style={{ color: 'var(--muted)', marginBottom: '2.5rem' }}>{error || 'An unexpected error occurred.'}</p>
            <button onClick={reset} style={{ padding: '1rem 2.5rem', background: 'var(--accent)', color: '#000', border: 'none', borderRadius: '12px', fontWeight: 'bold', cursor: 'pointer' }}>Reset Engine</button>
          </div>
        )}

        {status === 'done' && result && (
          <div>
            {mode === 'single' ? <ResultsPanel data={result} /> : <ComparisonPanel data={result} />}
            <div style={{ textAlign: 'center', marginTop: '4rem' }}>
              <button
                onClick={reset}
                className="glass-card"
                style={{
                  padding: '1rem 3.5rem',
                  color: 'var(--accent)',
                  fontSize: '1.1rem',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  border: '1px solid var(--accent)'
                }}
              >
                New Audit
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
