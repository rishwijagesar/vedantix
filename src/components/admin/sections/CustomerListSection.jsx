import React from 'react';

function formatCurrency(value) {
  return new Intl.NumberFormat('nl-NL', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0,
  }).format(Number(value || 0));
}

export default function CustomerListSection({
  customers = [],
  selectedCustomerId,
  onSelect,
}) {
  if (customers.length === 0) {
    return (
      <div style={{ padding: 24, color: '#64748b' }}>
        Er zijn nog geen klanten aangemaakt.
      </div>
    );
  }

  return (
    <div style={{ display: 'grid', gap: 12 }}>
      {customers.map((customer) => {
        const selected = customer.id === selectedCustomerId;

        return (
          <button
            key={customer.id}
            type="button"
            onClick={() => onSelect?.(customer)}
            style={{
              textAlign: 'left',
              padding: 16,
              borderRadius: 16,
              border: selected
                ? '2px solid #2563eb'
                : '1px solid #dbe4ef',
              background: selected ? '#eff6ff' : '#ffffff',
              cursor: 'pointer',
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                gap: 12,
                alignItems: 'center',
              }}
            >
              <div>
                <div
                  style={{
                    fontWeight: 800,
                    fontSize: 15,
                    color: '#0f172a',
                  }}
                >
                  {customer.companyName}
                </div>
                <div style={{ fontSize: 13, color: '#64748b' }}>
                  {customer.domain}
                </div>
              </div>

              <div
                style={{
                  fontSize: 13,
                  fontWeight: 700,
                  color: '#0f172a',
                }}
              >
                {formatCurrency(
                  customer.finance?.monthlyRevenue ||
                    customer.finance?.monthlyRevenueInclVat ||
                    0,
                )}
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
}
