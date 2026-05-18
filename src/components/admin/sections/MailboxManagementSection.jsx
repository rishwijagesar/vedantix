import React from 'react';

export default function MailboxManagementSection({
  customer,
  mailboxStats,
  onCreateMailbox,
  onSuspendMailbox,
  onActivateMailbox,
  onDeleteMailbox,
  onResetPassword,
}) {
  if (!customer) {
    return null;
  }

  const mailboxes = customer.mailboxes || [];
  const included = mailboxStats?.includedMailboxes ?? customer.includedMailboxes ?? 0;
  const extra = mailboxStats?.extraMailboxes ?? customer.extraMailboxes ?? 0;
  const totalAllowed = mailboxStats?.totalAllowed ?? included + extra;

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
          Mailboxbeheer
        </h3>
        <p style={{ marginTop: 6, fontSize: 14, color: '#64748b' }}>
          {mailboxes.length} van {totalAllowed || 0} mailboxen in gebruik.
        </p>
      </div>

      <button
        type="button"
        onClick={() => onCreateMailbox?.(customer)}
        style={{
          width: 'fit-content',
          padding: '12px 16px',
          borderRadius: 12,
          border: 'none',
          background: '#0f172a',
          color: '#ffffff',
          fontWeight: 700,
          cursor: 'pointer',
        }}
      >
        Nieuwe mailbox
      </button>

      <div style={{ display: 'grid', gap: 12 }}>
        {mailboxes.map((mailbox) => (
          <div
            key={mailbox.id || mailbox.email}
            style={{
              border: '1px solid #e2e8f0',
              borderRadius: 16,
              padding: 16,
              display: 'grid',
              gap: 12,
            }}
          >
            <div>
              <div style={{ fontWeight: 800, color: '#0f172a' }}>
                {mailbox.email}
              </div>
              <div style={{ fontSize: 13, color: '#64748b' }}>
                Status: {mailbox.status || 'ACTIVE'}
              </div>
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              <button type="button" onClick={() => onResetPassword?.(mailbox)}>
                Reset wachtwoord
              </button>
              <button type="button" onClick={() => onSuspendMailbox?.(mailbox)}>
                Pauzeren
              </button>
              <button type="button" onClick={() => onActivateMailbox?.(mailbox)}>
                Activeren
              </button>
              <button type="button" onClick={() => onDeleteMailbox?.(mailbox)}>
                Verwijderen
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
