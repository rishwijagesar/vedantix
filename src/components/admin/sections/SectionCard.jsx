import React from 'react';

export default function SectionCard({
  title,
  description,
  actions,
  children,
}) {
  return (
    <div
      style={{
        background: '#ffffff',
        border: '1px solid #dbe4ef',
        borderRadius: 20,
        padding: 24,
        display: 'grid',
        gap: 16,
      }}
    >
      {(title || description || actions) ? (
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            gap: 16,
          }}
        >
          <div>
            {title ? (
              <h3
                style={{
                  margin: 0,
                  fontSize: 20,
                  fontWeight: 800,
                  color: '#0f172a',
                }}
              >
                {title}
              </h3>
            ) : null}

            {description ? (
              <p
                style={{
                  margin: '6px 0 0 0',
                  fontSize: 14,
                  color: '#64748b',
                }}
              >
                {description}
              </p>
            ) : null}
          </div>

          {actions ? <div>{actions}</div> : null}
        </div>
      ) : null}

      <div>{children}</div>
    </div>
  );
}
