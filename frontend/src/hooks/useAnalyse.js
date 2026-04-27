import { useState, useRef } from 'react';
import { analyseResume } from '../services/api';
import { parseStreamResult } from '../utils/parseStream';

export const useAnalyse = () => {
  const [file, setFile] = useState(null);
  const [jd, setJd] = useState('');
  const [status, setStatus] = useState('idle'); // idle | loading | done | error
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [streamText, setStreamText] = useState('');
  
  const streamRef = useRef('');

  const analyse = async () => {
    if (!file) return;
    
    setStatus('loading');
    setError(null);
    setResult(null);
    setStreamText('');
    streamRef.current = '';

    try {
      const stream = await analyseResume(file, jd);
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
      
      // Parse once stream ends
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
