import React from 'react';

export default function PaymentReminderSection({ overdueInvoices = [], onSendReminder }) {
  if (!overdueInvoices.length) {
    return null;
  }

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
          Betalingsherinneringen
        </h3>
        <p style={{ marginTop: 6, fontSize: 14, color: '#64748b' }}>
          Facturen die over de vervaldatum heen zijn.
        </p>
      </div>

      <div style={{ display: 'grid', gap: 12 }}>
        {overdueInvoices.map((invoice) => (
          <div
            key={invoice.id}
            style={{
              border: '1px solid #e2e8f0',
              borderRadius: 16,
              padding: 16,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: 12,
              flexWrap: 'wrap',
            }}
          >
            <div>
              <div style={{ fontWeight: 800, color: '#0f172a' }}>
                {invoice.number || invoice.id}
              </div>
              <div style={{ fontSize: 13, color: '#64748b' }}>
                {invoice.customerName || 'Onbekende klant'}
              </div>
            </div>

            <button
              type="button"
              onClick={() => onSendReminder?.(invoice)}
              style={{
                padding: '10px 14px',
                borderRadius: 12,
                border: 'none',
                background: '#0f172a',
                color: '#ffffff',
                fontWeight: 700,
              }}
            >
              Herinnering sturen
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
