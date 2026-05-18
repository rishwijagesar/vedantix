import React from 'react';

export default function DeploymentActionsSection({
  customer,
  deploying = false,
  deleting = false,
  onDeploy,
  onRedeploy,
  onDeleteInfrastructure,
  onOpenWebsite,
  onOpenGithub,
}) {
  if (!customer) {
    return null;
  }

  const deployment = customer.latestDeployment || {};
  const status = deployment.status || customer.status || 'UNKNOWN';
  const stage = deployment.currentStage || '—';

  const buttonStyle = {
    padding: '12px 16px',
    borderRadius: 12,
    border: '1px solid #cbd5e1',
    background: '#ffffff',
    fontWeight: 700,
    cursor: 'pointer',
  };

  const primaryButtonStyle = {
    ...buttonStyle,
    background: '#0f172a',
    color: '#ffffff',
    border: 'none',
  };

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
          Deployment acties
        </h3>
        <p style={{ marginTop: 6, fontSize: 14, color: '#64748b' }}>
          Start provisioning, bekijk de status en open relevante resources.
        </p>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: 12,
        }}
      >
        <div>
          <div style={{ fontSize: 12, fontWeight: 700, color: '#64748b' }}>Status</div>
          <div style={{ marginTop: 4, fontWeight: 800, color: '#0f172a' }}>{status}</div>
        </div>

        <div>
          <div style={{ fontSize: 12, fontWeight: 700, color: '#64748b' }}>Huidige stage</div>
          <div style={{ marginTop: 4, fontWeight: 800, color: '#0f172a' }}>{stage}</div>
        </div>
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
        <button
          type="button"
          onClick={() => onDeploy?.(customer)}
          disabled={deploying}
          style={primaryButtonStyle}
        >
          {deploying ? 'Deployen...' : 'Deploy website'}
        </button>

        <button
          type="button"
          onClick={() => onRedeploy?.(customer)}
          style={buttonStyle}
        >
          Redeploy
        </button>

        <button
          type="button"
          onClick={() => onOpenWebsite?.(customer)}
          style={buttonStyle}
        >
          Open website
        </button>

        <button
          type="button"
          onClick={() => onOpenGithub?.(customer)}
          style={buttonStyle}
        >
          Open GitHub
        </button>

        <button
          type="button"
          onClick={() => onDeleteInfrastructure?.(customer)}
          disabled={deleting}
          style={{
            ...buttonStyle,
            background: '#fef2f2',
            border: '1px solid #fecaca',
            color: '#b91c1c',
          }}
        >
          {deleting ? 'Verwijderen...' : 'Delete Everything'}
        </button>
      </div>
    </div>
  );
}
