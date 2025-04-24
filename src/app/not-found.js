import React from 'react';
import { useRouter } from 'next/router';

const NotFound = () => {
  const router = useRouter();

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>404 - Page Not Found</h1>
      <p>The page you are looking for does not exist.</p>
      <button
        onClick={() => router.push('/')}
        style={{
          padding: '10px 20px',
          backgroundColor: '#0070f3',
          color: '#fff',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
        }}
      >
        Go Back Home
      </button>
    </div>
  );
};

export default NotFound;