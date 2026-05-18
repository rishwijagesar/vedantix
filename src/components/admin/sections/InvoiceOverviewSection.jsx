import React from 'react';

function formatCurrency(value) {
  return new Intl.NumberFormat('nl-NL', {
    style: 'currency',
    currency: 'EUR',
  }).format(Number(value || 0));
}

function getStatusColor(status) {
  switch (status) {
    case 'PAID':
      return '#10b981';
    case 'OVERDUE':
      return '#ef4444';
    case 'SENT':
      return '#3b82f6';
    default:
      return '#94a3b8';
  }
}

export default function InvoiceOverviewSection({
  invoices = [],
  onCreateInvoice,
  onOpenInvoice,
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
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: 12,
        }}
      >
        <div>
          <h3 style={{ margin: 0, fontSize: 20, fontWeight: 800, color: '#0f172a' }}>
            Facturen
          </h3>
          <p style={{ marginTop: 6, fontSize: 14, color: '#64748b' }}>
            Overzicht van verzonden en openstaande facturen.
          </p>
        </div>

        <button
          type="button"
          onClick={onCreateInvoice}
          style={{
            padding: '12px 16px',
            borderRadius: 12,
            border: 'none',
            background: '#0f172a',
            color: '#ffffff',
            fontWeight: 700,
          }}
        >
          Nieuwe factuur
        </button>
      </div>

      <div style={{ display: 'grid', gap: 12 }}>
        {invoices.map((invoice) => (
          <button
            key={invoice.id}
            type="button"
            onClick={() => onOpenInvoice?.(invoice)}
            style={{
              textAlign: 'left',
              border: '1px solid #e2e8f0',
              borderRadius: 16,
              padding: 16,
              background: '#ffffff',
              cursor: 'pointer',
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                gap: 12,
              }}
            >
              <div>
                <div style={{ fontWeight: 800, color: '#0f172a' }}>
                  {invoice.number || invoice.id}
                </div>
                <div style={{ fontSize: 13, color: '#64748b' }}>
                  {invoice.dueDate}
                </div>
              </div>

              <div style={{ textAlign: 'right' }}>
                <div style={{ fontWeight: 800, color: '#0f172a' }}>
                  {formatCurrency(invoice.total)}
                </div>
                <div
                  style={{
                    fontSize: 12,
                    fontWeight: 700,
                    color: getStatusColor(invoice.status),
                  }}
                >
                  {invoice.status}
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
