import { useRef, useState } from 'react';

const UploadZone = ({ onFile, file }) => {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const droppedFile = e.dataTransfer.files[0];
      if (droppedFile.type === 'application/pdf') {
        onFile(droppedFile);
      } else {
        alert('Only PDF files are allowed.');
      }
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      if (selectedFile.type === 'application/pdf') {
        onFile(selectedFile);
      } else {
        alert('Only PDF files are allowed.');
      }
    }
  };

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={handleClick}
      style={{
        border: `2px dashed ${isDragging ? 'var(--accent)' : file ? 'var(--green)' : 'var(--border)'}`,
        backgroundColor: isDragging ? 'rgba(0, 229, 255, 0.05)' : 'var(--surface2)',
        padding: '3rem 2rem',
        borderRadius: '12px',
        textAlign: 'center',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '200px'
      }}
    >
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="application/pdf"
        style={{ display: 'none' }}
      />
      
      {file ? (
        <>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📄</div>
          <h3 style={{ color: 'var(--green)', marginBottom: '0.5rem' }}>{file.name}</h3>
          <p style={{ color: 'var(--muted)', fontSize: '0.9rem' }}>
            {(file.size / 1024 / 1024).toFixed(2)} MB • Click to change
          </p>
        </>
      ) : (
        <>
          <div style={{ fontSize: '3rem', marginBottom: '1rem', opacity: 0.8 }}>📁</div>
          <h3 style={{ marginBottom: '0.5rem' }}>Drag & Drop your Resume</h3>
          <p style={{ color: 'var(--muted)', fontSize: '0.9rem' }}>
            Supports PDF up to 5MB
          </p>
        </>
      )}
    </div>
  );
};

export default UploadZone;
