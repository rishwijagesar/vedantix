import React from 'react';

export default function ActionButtons({
  onCancel,
  onSubmit,
  submitting = false,
  cancelLabel = 'Annuleren',
  submitLabel = 'Opslaan',
}) {
  return (
    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12, flexWrap: 'wrap' }}>
      <button
        type="button"
        onClick={onCancel}
        disabled={submitting}
        style={{
          padding: '12px 16px',
          borderRadius: 12,
          border: '1px solid #cbd5e1',
          background: '#ffffff',
          fontWeight: 700,
        }}
      >
        {cancelLabel}
      </button>
      <button
        type="button"
        onClick={onSubmit}
        disabled={submitting}
        style={{
          padding: '12px 16px',
          borderRadius: 12,
          border: 'none',
          background: '#0f172a',
          color: '#ffffff',
          fontWeight: 700,
        }}
      >
        {submitting ? 'Opslaan...' : submitLabel}
      </button>
    </div>
  );
}
