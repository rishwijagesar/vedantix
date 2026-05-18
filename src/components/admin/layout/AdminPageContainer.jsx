import React from 'react';

export default function AdminPageContainer({ children }) {
  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(180deg, #f8fafc 0%, #eef2ff 100%)',
        padding: '24px',
      }}
    >
      <div
        style={{
          maxWidth: 1600,
          margin: '0 auto',
        }}
      >
        {children}
      </div>
    </div>
  );
}
