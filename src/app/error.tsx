'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Application error:', error);
    if (error.digest) {
      console.error('Error digest:', error.digest);
    }
  }, [error]);

  return (
    <div style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      flexDirection: 'column',
      padding: '20px',
      textAlign: 'center'
    }}>
      <h2 style={{ marginBottom: '20px', fontSize: '24px' }}>
        Something went wrong!
      </h2>
      <p style={{ marginBottom: '20px', color: '#666' }}>
        We encountered an error while loading this page.
        {error.digest && (
          <><br />Error ID: <code>{error.digest}</code></>
        )}
      </p>
      <button
        onClick={() => reset()}
        style={{
          padding: '10px 20px',
          backgroundColor: '#3b82f6',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          fontSize: '16px'
        }}
      >
        Try again
      </button>
    </div>
  );
}
