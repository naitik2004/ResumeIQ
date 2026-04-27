import { useAnalyse } from './hooks/useAnalyse';
import UploadZone from './components/UploadZone';
import ResultsPanel from './components/ResultsPanel';
import Loader from './components/Loader';

function App() {
  const { file, setFile, jd, setJd, status, result, error, streamText, analyse, reset } = useAnalyse();

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '2rem 1rem' }}>
      
      <header style={{ textAlign: 'center', marginBottom: '3rem', animation: 'fadeUp 0.5s ease-out' }}>
        <h1 style={{ fontSize: '3rem', color: 'var(--accent)', marginBottom: '0.5rem' }}>ResumeIQ</h1>
        <p style={{ color: 'var(--muted)', fontSize: '1.2rem' }}>AI-Powered ATS Analysis</p>
      </header>

      <main>
        {status === 'idle' && (
          <div style={{ animation: 'fadeUp 0.5s ease-out', maxWidth: '600px', margin: '0 auto' }}>
            <UploadZone onFile={setFile} file={file} />
            
            <div style={{ marginTop: '2rem' }}>
              <label htmlFor="jd" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
                Job Description (Optional)
              </label>
              <textarea
                id="jd"
                value={jd}
                onChange={(e) => setJd(e.target.value)}
                placeholder="Paste the job description here to tailor the analysis..."
                style={{
                  width: '100%',
                  height: '120px',
                  padding: '1rem',
                  backgroundColor: 'var(--surface2)',
                  border: '1px solid var(--border)',
                  borderRadius: '8px',
                  color: 'var(--text)',
                  fontFamily: 'inherit',
                  resize: 'vertical',
                  outline: 'none'
                }}
              />
            </div>

            <button
              onClick={analyse}
              disabled={!file}
              style={{
                marginTop: '2rem',
                width: '100%',
                padding: '1rem',
                backgroundColor: file ? 'var(--accent)' : 'var(--surface2)',
                color: file ? '#000' : 'var(--muted)',
                border: 'none',
                borderRadius: '8px',
                fontSize: '1.1rem',
                fontWeight: 'bold',
                cursor: file ? 'pointer' : 'not-allowed',
                transition: 'all 0.3s ease',
                fontFamily: 'var(--font-head)'
              }}
            >
              Analyse Resume
            </button>
          </div>
        )}

        {status === 'loading' && <Loader streamText={streamText} />}

        {status === 'error' && (
          <div style={{ textAlign: 'center', animation: 'fadeUp 0.5s ease-out', padding: '3rem' }}>
            <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>⚠️</div>
            <h2 style={{ color: 'var(--red)', marginBottom: '1rem' }}>Analysis Failed</h2>
            <p style={{ color: 'var(--muted)', marginBottom: '2rem', maxWidth: '500px', margin: '0 auto 2rem auto' }}>
              {error || 'An unexpected error occurred.'}
            </p>
            <button
              onClick={reset}
              style={{
                padding: '0.8rem 2rem',
                backgroundColor: 'var(--surface2)',
                color: 'var(--text)',
                border: '1px solid var(--border)',
                borderRadius: '8px',
                cursor: 'pointer',
                fontFamily: 'var(--font-head)'
              }}
            >
              Try Again
            </button>
          </div>
        )}

        {status === 'done' && result && (
          <div>
            <ResultsPanel data={result} />
            <div style={{ textAlign: 'center', marginTop: '3rem' }}>
              <button
                onClick={reset}
                style={{
                  padding: '1rem 3rem',
                  backgroundColor: 'transparent',
                  color: 'var(--accent)',
                  border: '2px solid var(--accent)',
                  borderRadius: '8px',
                  fontSize: '1.1rem',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  fontFamily: 'var(--font-head)'
                }}
                onMouseOver={(e) => {
                  e.target.style.backgroundColor = 'var(--accent)';
                  e.target.style.color = '#000';
                }}
                onMouseOut={(e) => {
                  e.target.style.backgroundColor = 'transparent';
                  e.target.style.color = 'var(--accent)';
                }}
              >
                New Analysis
              </button>
            </div>
          </div>
        )}
      </main>

    </div>
  );
}

export default App;
