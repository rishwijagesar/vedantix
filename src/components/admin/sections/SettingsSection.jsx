import React from 'react';

export default function SettingsSection({
  settings = {},
  onChange,
}) {
  const fields = [
    {
      key: 'defaultVatRate',
      label: 'Standaard BTW (%)',
      type: 'number',
    },
    {
      key: 'defaultHourlyRate',
      label: 'Standaard uurtarief (€)',
      type: 'number',
    },
    {
      key: 'defaultExtraMailboxPrice',
      label: 'Extra mailbox prijs (€ / maand)',
      type: 'number',
    },
    {
      key: 'defaultSetupFee',
      label: 'Standaard setup fee (€)',
      type: 'number',
    },
  ];

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
      <div>
        <h3 style={{ margin: 0, fontSize: 20, fontWeight: 800, color: '#0f172a' }}>
          Instellingen
        </h3>
        <p style={{ marginTop: 6, fontSize: 14, color: '#64748b' }}>
          Algemene standaardwaarden voor offertes en berekeningen.
        </p>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: 12,
        }}
      >
        {fields.map((field) => (
          <div key={field.key} style={{ display: 'grid', gap: 6 }}>
            <label style={{ fontSize: 13, fontWeight: 700, color: '#475569' }}>
              {field.label}
            </label>
            <input
              type={field.type}
              value={settings[field.key] ?? ''}
              onChange={(e) =>
                onChange?.({
                  ...settings,
                  [field.key]: Number(e.target.value || 0),
                })
              }
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
