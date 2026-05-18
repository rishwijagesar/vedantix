export function formatCurrency(value) {
  return new Intl.NumberFormat('nl-NL', {
    style: 'currency',
    currency: 'EUR',
  }).format(Number(value || 0));
}

export function formatDate(value) {
  if (!value) {
    return '-';
  }

  return new Date(value).toLocaleDateString('nl-NL');
}

export function formatDateTime(value) {
  if (!value) {
    return '-';
  }

  return new Date(value).toLocaleString('nl-NL');
}

export function formatPercentage(value) {
  return `${Number(value || 0).toFixed(1)}%`;
}
