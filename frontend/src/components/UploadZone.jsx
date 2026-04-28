import { useRef, useState } from 'react';

const UploadZone = ({ onFile, file, label = "Resume", id = "resume" }) => {
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
        onFile(droppedFile, id);
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
        onFile(selectedFile, id);
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
      className="glass-card"
      style={{
        border: `2px dashed ${isDragging ? 'var(--accent)' : file ? 'rgba(0, 255, 157, 0.3)' : 'var(--border)'}`,
        background: isDragging ? 'rgba(0, 240, 255, 0.05)' : 'var(--surface)',
        padding: '2.5rem 1.5rem',
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '180px',
        flex: 1,
        animation: 'slide-in 0.5s ease-out'
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
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>📄</div>
          <h4 style={{ color: 'var(--green)', marginBottom: '0.25rem', fontSize: '1rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '200px' }}>
            {file.name}
          </h4>
          <p style={{ color: 'var(--muted)', fontSize: '0.8rem' }}>
            {label} Ready • Click to swap
          </p>
        </div>
      ) : (
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem', opacity: 0.6 }}>📁</div>
          <h4 style={{ marginBottom: '0.25rem', fontSize: '1rem' }}>Upload {label}</h4>
          <p style={{ color: 'var(--muted)', fontSize: '0.8rem' }}>
            Click or drag PDF
          </p>
        </div>
      )}
    </div>
  );
};

export default UploadZone;
