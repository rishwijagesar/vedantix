const STATUS_LABELS = {
  DRAFT: 'Concept',
  PENDING: 'In behandeling',
  QUEUED: 'In wachtrij',
  RUNNING: 'Bezig',
  IN_PROGRESS: 'Bezig',
  SUCCEEDED: 'Geslaagd',
  FAILED: 'Mislukt',
  ACTIVE: 'Actief',
  INACTIVE: 'Inactief',
  SUSPENDED: 'Gepauzeerd',
  PAID: 'Betaald',
  OVERDUE: 'Te laat',
  CANCELLED: 'Geannuleerd',
  LIVE: 'Live',
  LOST: 'Verloren',
};

export default function formatStatus(status) {
  if (!status) {
    return '-';
  }

  return STATUS_LABELS[status] || status;
}
