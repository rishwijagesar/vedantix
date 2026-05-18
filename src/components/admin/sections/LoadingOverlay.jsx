import React from 'react';

export default function LoadingOverlay({
  show = false,
  label = 'Laden...',
}) {
  if (!show) {
    return null;
  }

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        background: 'rgba(255, 255, 255, 0.75)',
        backdropFilter: 'blur(2px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 'inherit',
        zIndex: 20,
      }}
    >
      <div
        style={{
          padding: '12px 18px',
          borderRadius: 12,
          background: '#0f172a',
          color: '#ffffff',
          fontWeight: 700,
          fontSize: 14,
          boxShadow: '0 10px 25px rgba(15, 23, 42, 0.15)',
        }}
      >
        {label}
      </div>
    </div>
  );
}
