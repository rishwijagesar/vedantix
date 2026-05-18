import React from 'react';

export default function TabContent({ children }) {
  return (
    <div
      style={{
        display: 'grid',
        gap: 24,
      }}
    >
      {children}
    </div>
  );
}
