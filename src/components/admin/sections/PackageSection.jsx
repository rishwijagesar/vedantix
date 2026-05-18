import React from 'react';

export default function PackageSection({
  packageOptions = [],
  selectedPackageCode,
  selectedExtras = [],
  extraOptions = [],
  onPackageChange,
  onExtrasChange,
}) {
  function toggleExtra(code) {
    const exists = selectedExtras.includes(code);

    const next = exists
      ? selectedExtras.filter((item) => item !== code)
      : [...selectedExtras, code];

    onExtrasChange?.(next);
  }

  return (
    <div style={{ display: 'grid', gap: 16 }}>
      <h3 style={{ margin: 0, fontSize: 20, fontWeight: 800, color: '#0f172a' }}>
        Pakket en extra opties
      </h3>

      <div style={{ display: 'grid', gap: 8 }}>
        <label style={{ fontSize: 13, fontWeight: 700, color: '#475569' }}>
          Pakket
        </label>
        <select
          value={selectedPackageCode || 'STARTER'}
          onChange={(e) => onPackageChange?.(e.target.value)}
          style={{
            width: '100%',
            borderRadius: 12,
            border: '1px solid #cbd5e1',
            padding: '12px 14px',
            fontSize: 14,
          }}
        >
          {packageOptions.map((pkg) => (
            <option key={pkg.code} value={pkg.code}>
              {pkg.label} (€ {pkg.monthlyPrice}/maand)
            </option>
          ))}
        </select>
      </div>

      <div style={{ display: 'grid', gap: 8 }}>
        <label style={{ fontSize: 13, fontWeight: 700, color: '#475569' }}>
          Extra opties
        </label>

        <div style={{ display: 'grid', gap: 8 }}>
          {extraOptions.map((extra) => {
            const checked = selectedExtras.includes(extra.code);

            return (
              <label
                key={extra.code}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  padding: '10px 12px',
                  borderRadius: 12,
                  border: '1px solid #e2e8f0',
                }}
              >
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => toggleExtra(extra.code)}
                />
                <span style={{ fontSize: 14, color: '#0f172a' }}>
                  {extra.label} (+€ {extra.monthlyPrice}/maand)
                </span>
              </label>
            );
          })}
        </div>
      </div>
    </div>
  );
}
