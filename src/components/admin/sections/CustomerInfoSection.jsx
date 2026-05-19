import React, { useEffect, useState } from 'react';

function DomainCheckStatus({ checking, result }) {
  if (checking) return <div style={{ marginTop: 6, fontSize: 12, color: '#2563eb' }}>⏳ Domein controleren...</div>;
  if (!result) return null;
  if (result.status === 'AVAILABLE' && result.canProceed) {
    return <div style={{ marginTop: 6, fontSize: 12, color: '#059669' }}>✅ Domein is beschikbaar</div>;
  }
  if (result.status === 'DNS_EXISTS' || result.status === 'HTTP_ACTIVE') {
    return <div style={{ marginTop: 6, fontSize: 12, color: '#d97706' }}>⚠️ Domein lijkt al in gebruik</div>;
  }
  return <div style={{ marginTop: 6, fontSize: 12, color: '#dc2626' }}>❌ Ongeldig of niet beschikbaar domein</div>;
}

export default function CustomerInfoSection({ form, onFieldChange, onDomainStatusChange }) {
  const [checkingDomain, setCheckingDomain] = useState(false);
  const [domainResult, setDomainResult] = useState(null);

  useEffect(() => {
    const domain = (form?.domain || '').trim().toLowerCase();

    if (!domain || domain.length < 4 || !domain.includes('.')) {
      setDomainResult(null);
      onDomainStatusChange?.(null);
      return;
    }

    const timer = setTimeout(async () => {
      setCheckingDomain(true);

      try {
        const response = await fetch('/api/domains/check', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ domain }),
        });

        const data = await response.json();
        const result = data?.result || { status: 'ERROR', canProceed: false };

        setDomainResult(result);
        onDomainStatusChange?.(result);
      } catch {
        const result = { status: 'ERROR', canProceed: false };
        setDomainResult(result);
        onDomainStatusChange?.(result);
      } finally {
        setCheckingDomain(false);
      }
    }, 650);

    return () => clearTimeout(timer);
  }, [form?.domain, onDomainStatusChange]);

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
            {key === 'domain' && (
              <DomainCheckStatus checking={checkingDomain} result={domainResult} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
