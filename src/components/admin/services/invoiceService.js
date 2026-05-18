function headers(apiKey) {
  return {
    'Content-Type': 'application/json',
    'X-Api-Key': apiKey,
    'X-Source': 'ADMIN_PANEL',
    'X-Actor-Id': 'admin-crm',
  };
}

async function parse(response, message) {
  if (!response.ok) {
    throw new Error(message);
  }

  if (response.status === 204) {
    return null;
  }

  return response.json();
}

export async function createInvoice(apiBaseUrl, apiKey, payload) {
  const response = await fetch(`${apiBaseUrl}/api/invoices`, {
    method: 'POST',
    headers: headers(apiKey),
    body: JSON.stringify(payload),
  });

  return parse(response, 'Factuur aanmaken mislukt.');
}

export async function sendPaymentReminder(apiBaseUrl, apiKey, invoiceId) {
  const response = await fetch(`${apiBaseUrl}/api/invoices/${invoiceId}/send-reminder`, {
    method: 'POST',
    headers: headers(apiKey),
  });

  return parse(response, 'Betalingsherinnering versturen mislukt.');
}
