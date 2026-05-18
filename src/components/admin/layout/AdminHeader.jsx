import React from 'react';

export default function AdminHeader({ title = 'Vedantix Admin CRM', subtitle }) {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        gap: 16,
        flexWrap: 'wrap',
        marginBottom: 24,
      }}
    >
      <div>
        <h1
          style={{
            margin: 0,
            fontSize: 36,
            fontWeight: 900,
            color: '#0f172a',
            letterSpacing: '-0.03em',
          }}
        >
          {title}
        </h1>
        {subtitle ? (
          <p
            style={{
              marginTop: 8,
              marginBottom: 0,
              color: '#64748b',
              fontSize: 15,
              lineHeight: 1.6,
            }}
          >
            {subtitle}
          </p>
        ) : null}
      </div>
    </div>
  );
}
