import React from 'react';

const STAGES = [
  'LEAD',
  'INTAKE',
  'OFFER_SENT',
  'WAITING_FOR_APPROVAL',
  'PROVISIONING',
  'LIVE',
  'LOST',
];

const LABELS = {
  LEAD: 'Lead',
  INTAKE: 'Intake',
  OFFER_SENT: 'Offerte verstuurd',
  WAITING_FOR_APPROVAL: 'Wacht op akkoord',
  PROVISIONING: 'Provisioning',
  LIVE: 'Live',
  LOST: 'Verloren',
};

export default function LeadPipelineSection({ leads = [], onOpenLead }) {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${STAGES.length}, minmax(240px, 1fr))`,
        gap: 16,
        overflowX: 'auto',
      }}
    >
      {STAGES.map((stage) => {
        const stageLeads = leads.filter((lead) => lead.stage === stage);

        return (
          <div
            key={stage}
            style={{
              background: '#f8fafc',
              border: '1px solid #dbe4ef',
              borderRadius: 20,
              padding: 16,
              display: 'grid',
              gap: 12,
              minWidth: 240,
            }}
          >
            <div>
              <div style={{ fontWeight: 800, color: '#0f172a' }}>
                {LABELS[stage]}
              </div>
              <div style={{ fontSize: 12, color: '#64748b' }}>
                {stageLeads.length} leads
              </div>
            </div>

            <div style={{ display: 'grid', gap: 8 }}>
              {stageLeads.map((lead) => (
                <button
                  key={lead.id}
                  type="button"
                  onClick={() => onOpenLead?.(lead)}
                  style={{
                    textAlign: 'left',
                    border: '1px solid #e2e8f0',
                    borderRadius: 12,
                    padding: 12,
                    background: '#ffffff',
                    cursor: 'pointer',
                  }}
                >
                  <div style={{ fontWeight: 700, color: '#0f172a' }}>
                    {lead.companyName}
                  </div>
                  <div style={{ fontSize: 12, color: '#64748b' }}>
                    {lead.contactName}
                  </div>
                </button>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
