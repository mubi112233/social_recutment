'use client';

import { useEffect } from 'react';

export default function LangError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error with more details
    console.error('Page rendering error:', {
      message: error.message,
      digest: error.digest,
      stack: error.stack,
      timestamp: new Date().toISOString(),
    });

    // Send to error tracking service if needed
    // logErrorToService(error);
  }, [error]);

  return (
    <div style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      flexDirection: 'column',
      padding: '20px',
      textAlign: 'center',
      backgroundColor: '#f9fafb'
    }}>
      <div style={{
        maxWidth: '600px',
      }}>
        <h1 style={{ 
          fontSize: '32px', 
          fontWeight: 'bold',
          marginBottom: '16px',
          color: '#111827'
        }}>
          Page Load Failed
        </h1>
        <p style={{ 
          fontSize: '16px', 
          color: '#6b7280',
          marginBottom: '24px',
          lineHeight: '1.5'
        }}>
          We encountered an error while loading this page. This might be due to:
        </p>
        <ul style={{
          textAlign: 'left',
          fontSize: '14px',
          color: '#6b7280',
          marginBottom: '24px',
          paddingLeft: '20px'
        }}>
          <li>API service temporarily unavailable</li>
          <li>Network connectivity issues</li>
          <li>Configuration problems</li>
        </ul>
        
        {error.digest && (
          <div style={{
            backgroundColor: '#f3f4f6',
            padding: '12px',
            borderRadius: '6px',
            marginBottom: '24px',
            fontSize: '12px',
            color: '#6b7280',
            wordBreak: 'break-all'
          }}>
            <strong>Error ID:</strong> <code>{error.digest}</code>
          </div>
        )}

        <button
          onClick={() => reset()}
          style={{
            padding: '10px 24px',
            backgroundColor: '#3b82f6',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '16px',
            fontWeight: '500',
            marginRight: '12px',
            marginBottom: '12px'
          }}
        >
          Try Again
        </button>
        
        <button
          onClick={() => window.location.href = '/'}
          style={{
            padding: '10px 24px',
            backgroundColor: '#e5e7eb',
            color: '#374151',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '16px',
            fontWeight: '500',
          }}
        >
          Go Home
        </button>
      </div>
    </div>
  );
}
