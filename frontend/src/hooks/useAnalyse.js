import { useState, useRef } from 'react';
import { analyseResume, compareResumes } from '../services/api';
import { parseStreamResult } from '../utils/parseStream';

export const useAnalyse = (mode = 'single') => {
  const [file, setFile] = useState(null);
  const [fileB, setFileB] = useState(null);
  const [jd, setJd] = useState('');
  const [status, setStatus] = useState('idle'); // idle | loading | done | error
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [streamText, setStreamText] = useState('');
  
  const streamRef = useRef('');

  const analyse = async () => {
    if (mode === 'single' && !file) return;
    if (mode === 'compare' && (!file || !fileB)) return;
    
    setStatus('loading');
    setError(null);
    setResult(null);
    setStreamText('');
    streamRef.current = '';

    try {
      const stream = mode === 'single' 
        ? await analyseResume(file, jd)
        : await compareResumes(file, fileB, jd);

      const reader = stream.getReader();
      const decoder = new TextDecoder();

      let isDone = false;
      while (!isDone) {
        const { value, done } = await reader.read();
        if (done) {
          isDone = true;
          break;
        }
        
        const chunk = decoder.decode(value, { stream: true });
        streamRef.current += chunk;
        setStreamText(streamRef.current);
      }
      
      const parsedResult = parseStreamResult(streamRef.current);
      setResult(parsedResult);
      setStatus('done');
    } catch (err) {
      setError(err.message);
      setStatus('error');
    }
  };

  const reset = () => {
    setFile(null);
    setFileB(null);
    setJd('');
    setStatus('idle');
    setResult(null);
    setError(null);
    setStreamText('');
    streamRef.current = '';
  };

  return {
    file,
    setFile,
    fileB,
    setFileB,
    jd,
    setJd,
    status,
    result,
    error,
    streamText,
    analyse,
    reset
  };
};
