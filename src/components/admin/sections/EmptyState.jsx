import React from 'react';

export default function EmptyState({
  title = 'Geen gegevens beschikbaar',
  description = 'Er is momenteel geen data om weer te geven.',
  action,
}) {
  return (
    <div
      style={{
        background: '#ffffff',
        border: '1px dashed #cbd5e1',
        borderRadius: 20,
        padding: 32,
        textAlign: 'center',
        display: 'grid',
        gap: 12,
      }}
    >
      <h3 style={{ margin: 0, fontSize: 20, fontWeight: 800, color: '#0f172a' }}>
        {title}
      </h3>
      <p style={{ margin: 0, color: '#64748b' }}>
        {description}
      </p>
      {action || null}
    </div>
  );
}
