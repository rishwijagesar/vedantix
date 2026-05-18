import React from 'react';

const STAGE_LABELS = {
  DOMAIN_CHECK: 'Domeincontrole',
  GITHUB_PROVISION: 'GitHub repository',
  S3_BUCKET: 'S3 bucket',
  ACM_REQUEST: 'SSL certificaat aanvragen',
  ACM_VALIDATION_RECORDS: 'DNS validatie records',
  ACM_DNS_PROPAGATION: 'DNS propagatie',
  ACM_WAIT: 'Wachten op certificaat',
  CLOUDFRONT: 'CloudFront distributie',
  ROUTE53_ALIAS: 'Route53 records',
  GITHUB_DISPATCH: 'GitHub deployment',
  DYNAMODB: 'Opslaan in database',
  SQS: 'Post deployment sync',
};

function getLabel(stage) {
  return STAGE_LABELS[stage] || stage || 'Onbekend';
}

function getColor(status) {
  switch (status) {
    case 'COMPLETED':
    case 'SUCCEEDED':
      return '#10b981';
    case 'FAILED':
      return '#ef4444';
    case 'IN_PROGRESS':
    case 'RUNNING':
      return '#3b82f6';
    default:
      return '#94a3b8';
  }
}

export default function DeploymentTimelineSection({ deployment }) {
  const events = deployment?.events || deployment?.history || [];

  if (!events.length) {
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
          Deployment timeline
        </h3>
        <p style={{ marginTop: 6, fontSize: 14, color: '#64748b' }}>
          Overzicht van alle provisioning stages.
        </p>
      </div>

      <div style={{ display: 'grid', gap: 12 }}>
        {events.map((event, index) => {
          const stage = event.stage || event.currentStage || event.name;
          const status = event.status || event.type;
          const color = getColor(status);

          return (
            <div
              key={`${stage}-${index}`}
              style={{
                display: 'grid',
                gridTemplateColumns: '14px 1fr',
                gap: 12,
                alignItems: 'start',
              }}
            >
              <div
                style={{
                  width: 12,
                  height: 12,
                  borderRadius: '50%',
                  background: color,
                  marginTop: 4,
                }}
              />

              <div>
                <div style={{ fontWeight: 800, color: '#0f172a' }}>
                  {getLabel(stage)}
                </div>
                <div style={{ fontSize: 13, color: '#64748b' }}>
                  {status || 'PENDING'}
                </div>
                {event.timestamp ? (
                  <div style={{ fontSize: 12, color: '#94a3b8', marginTop: 2 }}>
                    {new Date(event.timestamp).toLocaleString('nl-NL')}
                  </div>
                ) : null}
                {event.message ? (
                  <div style={{ fontSize: 12, color: '#475569', marginTop: 4 }}>
                    {event.message}
                  </div>
                ) : null}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
