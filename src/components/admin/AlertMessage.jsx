import React from 'react';

const COLORS = {
  success: { background: '#ecfdf5', border: '#a7f3d0', color: '#065f46' },
  error: { background: '#fef2f2', border: '#fecaca', color: '#991b1b' },
  warning: { background: '#fffbeb', border: '#fde68a', color: '#92400e' },
  info: { background: '#eff6ff', border: '#bfdbfe', color: '#1d4ed8' },
};

export default function AlertMessage({ type = 'info', children }) {
  if (!children) return null;

  const palette = COLORS[type] || COLORS.info;

  return (
    <div
      style={{
        padding: '12px 16px',
        borderRadius: 12,
        border: `1px solid ${palette.border}`,
        background: palette.background,
        color: palette.color,
        fontSize: 14,
        fontWeight: 600,
      }}
    >
      {children}
    </div>
  );
}
