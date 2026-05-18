import React from 'react';
import MailboxSelector from '../MailboxSelector';

export default function MailboxSection({
  form,
  onChange,
}) {
  return (
    <div style={{ display: 'grid', gap: 12 }}>
      <h3
        style={{
          margin: 0,
          fontSize: 20,
          fontWeight: 800,
          color: '#0f172a',
        }}
      >
        Zakelijke e-mailadressen
      </h3>

      <p
        style={{
          margin: 0,
          fontSize: 14,
          lineHeight: 1.6,
          color: '#64748b',
        }}
      >
        Selecteer welke mailboxen automatisch moeten worden aangemaakt in Migadu.
      </p>

      <MailboxSelector
        packageCode={form.packageCode}
        value={form.selectedMailboxLocalParts || []}
        extraMailboxes={form.extraMailboxes || 0}
        onChange={onChange}
      />
    </div>
  );
}
