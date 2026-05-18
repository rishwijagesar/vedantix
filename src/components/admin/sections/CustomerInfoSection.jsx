import React from 'react';

export default function CustomerInfoSection({ form, onFieldChange }) {
  const fields = [
    ['companyName', 'Bedrijfsnaam'],
    ['contactName', 'Contactpersoon'],
    ['email', 'E-mailadres'],
    ['phone', 'Telefoonnummer'],
    ['domain', 'Domeinnaam'],
    ['address', 'Adres'],
    ['postalCode', 'Postcode'],
    ['city', 'Plaats'],
    ['country', 'Land'],
  ];

  return (
    <div style={{ display: 'grid', gap: 16 }}>
      <h3 style={{ margin: 0, fontSize: 20, fontWeight: 800, color: '#0f172a' }}>
        Klantgegevens
      </h3>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: 12,
        }}
      >
        {fields.map(([key, label]) => (
          <div key={key} style={{ display: 'grid', gap: 6 }}>
            <label style={{ fontSize: 13, fontWeight: 700, color: '#475569' }}>
              {label}
            </label>
            <input
              type={key === 'email' ? 'email' : 'text'}
              value={form?.[key] || ''}
              onChange={(e) => onFieldChange?.(key, e.target.value)}
              style={{
                width: '100%',
                borderRadius: 12,
                border: '1px solid #cbd5e1',
                padding: '12px 14px',
                fontSize: 14,
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
