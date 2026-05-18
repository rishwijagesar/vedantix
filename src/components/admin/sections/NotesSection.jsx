import React from 'react';

export default function NotesSection({ value, onChange }) {
  return (
    <div style={{ display: 'grid', gap: 12 }}>
      <h3 style={{ margin: 0, fontSize: 20, fontWeight: 800, color: '#0f172a' }}>
        Notities
      </h3>

      <textarea
        value={value || ''}
        onChange={(e) => onChange?.(e.target.value)}
        rows={6}
        placeholder="Interne notities, bijzonderheden en afspraken..."
        style={{
          width: '100%',
          borderRadius: 12,
          border: '1px solid #cbd5e1',
          padding: '12px 14px',
          fontSize: 14,
          resize: 'vertical',
        }}
      />
    </div>
  );
}
