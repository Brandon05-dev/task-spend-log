import React, { useState } from 'react';
import { downloadPDFStatement, downloadExcelStatement } from '../../services/api';

/**
 * DownloadStatement Component - Standalone component for downloading statements
 * Features: PDF and Excel downloads with progress indicators
 */
const DownloadStatement = ({ projectId, projectName, className = '' }) => {
  const [downloadingPDF, setDownloadingPDF] = useState(false);
  const [downloadingExcel, setDownloadingExcel] = useState(false);
  const [error, setError] = useState(null);

  /**
   * Utility function to handle file downloads
   */
  const downloadFile = (blob, filename) => {
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  /**
   * Handle PDF download
   */
  const handleDownloadPDF = async () => {
    if (!projectId) return;

    try {
      setDownloadingPDF(true);
      setError(null);
      
      const blob = await downloadPDFStatement(projectId);
      const filename = `${(projectName || 'project').replace(/[^a-zA-Z0-9]/g, '_')}_statement.pdf`;
      downloadFile(blob, filename);
      
    } catch (err) {
      const errorMessage = 'Failed to download PDF statement. Please try again.';
      setError(errorMessage);
      console.error('Error downloading PDF:', err);
      
      // Clear error after 5 seconds
      setTimeout(() => setError(null), 5000);
    } finally {
      setDownloadingPDF(false);
    }
  };

  /**
   * Handle Excel download
   */
  const handleDownloadExcel = async () => {
    if (!projectId) return;

    try {
      setDownloadingExcel(true);
      setError(null);
      
      const blob = await downloadExcelStatement(projectId);
      const filename = `${(projectName || 'project').replace(/[^a-zA-Z0-9]/g, '_')}_statement.xlsx`;
      downloadFile(blob, filename);
      
    } catch (err) {
      const errorMessage = 'Failed to download Excel statement. Please try again.';
      setError(errorMessage);
      console.error('Error downloading Excel:', err);
      
      // Clear error after 5 seconds
      setTimeout(() => setError(null), 5000);
    } finally {
      setDownloadingExcel(false);
    }
  };

  if (!projectId) {
    return (
      <div className={`download-statement disabled ${className}`}>
        <p>No project selected</p>
      </div>
    );
  }

  return (
    <div className={`download-statement ${className}`}>
      {error && (
        <div className="download-error">
          {error}
        </div>
      )}
      
      <div className="download-buttons">
        <button
          onClick={handleDownloadPDF}
          disabled={downloadingPDF}
          className="download-btn pdf"
          title="Download PDF statement"
        >
          {downloadingPDF ? (
            <>
              <span className="spinner">⏳</span>
              Generating PDF...
            </>
          ) : (
            <>
              📄 Download PDF
            </>
          )}
        </button>
        
        <button
          onClick={handleDownloadExcel}
          disabled={downloadingExcel}
          className="download-btn excel"
          title="Download Excel statement"
        >
          {downloadingExcel ? (
            <>
              <span className="spinner">⏳</span>
              Generating Excel...
            </>
          ) : (
            <>
              📊 Download Excel
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default DownloadStatement;
