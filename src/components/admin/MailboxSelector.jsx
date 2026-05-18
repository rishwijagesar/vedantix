import React, { useEffect, useMemo, useState } from 'react';

const PACKAGE_LIMITS = {
  STARTER: 1,
  GROWTH: 5,
  PRO: 10,
  CUSTOM: Infinity,
};

const DEFAULT_SUGGESTIONS = [
  'info',
  'support',
  'sales',
  'factuur',
  'planning',
  'hr',
  'admin',
  'contact',
  'boekhouding',
  'help',
];

function getIncludedMailboxCount(packageCode) {
  return PACKAGE_LIMITS[packageCode] ?? 1;
}

function normalize(values) {
  return Array.from(
    new Set(
      (values || [])
        .map((v) => String(v || '').trim().toLowerCase())
        .filter(Boolean)
    )
  );
}

export default function MailboxSelector({
  packageCode = 'STARTER',
  value = [],
  extraMailboxes = 0,
  extraMailboxPrice = 7,
  suggestions = DEFAULT_SUGGESTIONS,
  onChange,
}) {
  const [customValue, setCustomValue] = useState('');

  const includedMailboxes = useMemo(
    () => getIncludedMailboxCount(packageCode),
    [packageCode]
  );

  const selected = useMemo(() => normalize(value), [value]);

  const maxMailboxes =
    includedMailboxes === Infinity
      ? Infinity
      : includedMailboxes + Number(extraMailboxes || 0);

  const canAddMore =
    maxMailboxes === Infinity || selected.length < maxMailboxes;

  const monthlyExtraCost = Number(extraMailboxes || 0) * extraMailboxPrice;

  useEffect(() => {
    if (!onChange) return;

    onChange({
      selectedMailboxLocalParts: selected,
      includedMailboxes:
        includedMailboxes === Infinity ? null : includedMailboxes,
      extraMailboxes: Number(extraMailboxes || 0),
      totalMailboxes:
        maxMailboxes === Infinity ? null : maxMailboxes,
      monthlyExtraMailboxCost: monthlyExtraCost,
    });
  }, [
    selected,
    includedMailboxes,
    extraMailboxes,
    maxMailboxes,
    monthlyExtraCost,
    onChange,
  ]);

  function addMailbox(localPart) {
    const normalized = String(localPart || '').trim().toLowerCase();
    if (!normalized || selected.includes(normalized) || !canAddMore) {
      return;
    }

    if (onChange) {
      onChange({
        selectedMailboxLocalParts: [...selected, normalized],
        includedMailboxes:
          includedMailboxes === Infinity ? null : includedMailboxes,
        extraMailboxes: Number(extraMailboxes || 0),
      });
    }

    setCustomValue('');
  }

  function removeMailbox(localPart) {
    if (!onChange) return;

    onChange({
      selectedMailboxLocalParts: selected.filter((v) => v !== localPart),
      includedMailboxes:
        includedMailboxes === Infinity ? null : includedMailboxes,
      extraMailboxes: Number(extraMailboxes || 0),
    });
  }

  return (
    <div style={{ display: 'grid', gap: 16 }}>
      <div
        style={{
          padding: 16,
          border: '1px solid #dbe4ef',
          borderRadius: 16,
          background: '#f8fafc',
        }}
      >
        <strong>Mailbox limiet</strong>
        <div style={{ marginTop: 8, fontSize: 14, color: '#475569' }}>
          Inclusief: {includedMailboxes === Infinity ? 'Onbeperkt' : includedMailboxes}
          {Number(extraMailboxes || 0) > 0 && (
            <> + {extraMailboxes} extra (€ {monthlyExtraCost}/maand)</>
          )}
        </div>
        <div style={{ marginTop: 4, fontSize: 14, color: '#475569' }}>
          Gebruikt: {selected.length}
          {maxMailboxes !== Infinity && <> / {maxMailboxes}</>}
        </div>
      </div>

      <div>
        <label style={{ fontWeight: 700, display: 'block', marginBottom: 8 }}>
          Standaard mailboxen
        </label>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {suggestions.map((item) => {
            const active = selected.includes(item);
            return (
              <button
                key={item}
                type="button"
                disabled={!active && !canAddMore}
                onClick={() =>
                  active ? removeMailbox(item) : addMailbox(item)
                }
                style={{
                  padding: '8px 12px',
                  borderRadius: 999,
                  border: active
                    ? '1px solid #1d4ed8'
                    : '1px solid #cbd5e1',
                  background: active ? '#dbeafe' : '#ffffff',
                  cursor: 'pointer',
                  fontWeight: 600,
                }}
              >
                {item}
              </button>
            );
          })}
        </div>
      </div>

      <div>
        <label style={{ fontWeight: 700, display: 'block', marginBottom: 8 }}>
          Eigen mailbox toevoegen
        </label>
        <div style={{ display: 'flex', gap: 8 }}>
          <input
            type="text"
            value={customValue}
            placeholder="bijv. marketing"
            onChange={(e) => setCustomValue(e.target.value)}
            style={{
              flex: 1,
              padding: '12px 14px',
              borderRadius: 12,
              border: '1px solid #cbd5e1',
            }}
          />
          <button
            type="button"
            disabled={!canAddMore}
            onClick={() => addMailbox(customValue)}
            style={{
              padding: '12px 16px',
              borderRadius: 12,
              border: 'none',
              background: '#0f172a',
              color: '#fff',
              fontWeight: 700,
              cursor: 'pointer',
            }}
          >
            Toevoegen
          </button>
        </div>
      </div>

      {selected.length > 0 && (
        <div>
          <label style={{ fontWeight: 700, display: 'block', marginBottom: 8 }}>
            Geselecteerde mailboxen
          </label>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {selected.map((item) => (
              <span
                key={item}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 6,
                  padding: '8px 12px',
                  borderRadius: 999,
                  background: '#eff6ff',
                  border: '1px solid #bfdbfe',
                  fontWeight: 600,
                }}
              >
                {item}
                <button
                  type="button"
                  onClick={() => removeMailbox(item)}
                  style={{
                    border: 'none',
                    background: 'transparent',
                    cursor: 'pointer',
                    fontWeight: 700,
                  }}
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
