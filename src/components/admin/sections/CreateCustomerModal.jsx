import React from 'react';
import CustomerInfoSection from './CustomerInfoSection';
import PackageSection from './PackageSection';
import MailboxSection from './MailboxSection';
import NotesSection from './NotesSection';

export default function CreateCustomerModal({
  open,
  form,
  packageOptions = [],
  extraOptions = [],
  onFieldChange,
  onFormChange,
  onSubmit,
  onClose,
  submitting = false,
}) {
  if (!open) {
    return null;
  }

  const handleSectionChange = (patch) => {
    onFormChange?.({
      ...form,
      ...patch,
    });
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(15, 23, 42, 0.55)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 24,
        zIndex: 1000,
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: 960,
          maxHeight: '90vh',
          overflowY: 'auto',
          background: '#ffffff',
          borderRadius: 24,
          padding: 24,
          display: 'grid',
          gap: 24,
          boxShadow: '0 25px 80px rgba(15, 23, 42, 0.25)',
        }}
      >
        <div>
          <h2 style={{ margin: 0, fontSize: 28, fontWeight: 900, color: '#0f172a' }}>
            Nieuwe klant aanmaken
          </h2>
          <p style={{ marginTop: 8, color: '#64748b' }}>
            Vul de klantgegevens in en configureer direct de mailboxen.
          </p>
        </div>

        <CustomerInfoSection
          form={form}
          onFieldChange={onFieldChange}
        />

        <PackageSection
          packageOptions={packageOptions}
          extraOptions={extraOptions}
          selectedPackageCode={form.packageCode}
          selectedExtras={form.extras || []}
          onPackageChange={(value) => onFieldChange?.('packageCode', value)}
          onExtrasChange={(value) => onFieldChange?.('extras', value)}
        />

        <MailboxSection
          form={form}
          onChange={handleSectionChange}
        />

        <NotesSection
          value={form.notes}
          onChange={(value) => onFieldChange?.('notes', value)}
        />

        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            gap: 12,
          }}
        >
          <button
            type="button"
            onClick={onClose}
            disabled={submitting}
            style={{
              padding: '12px 16px',
              borderRadius: 12,
              border: '1px solid #cbd5e1',
              background: '#ffffff',
              fontWeight: 700,
              cursor: 'pointer',
            }}
          >
            Annuleren
          </button>

          <button
            type="button"
            onClick={onSubmit}
            disabled={submitting}
            style={{
              padding: '12px 16px',
              borderRadius: 12,
              border: 'none',
              background: '#0f172a',
              color: '#ffffff',
              fontWeight: 700,
              cursor: 'pointer',
            }}
          >
            {submitting ? 'Opslaan...' : 'Klant aanmaken'}
          </button>
        </div>
      </div>
    </div>
  );
}
