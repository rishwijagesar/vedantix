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

export async function getLeads(apiBaseUrl, apiKey) {
  const response = await fetch(`${apiBaseUrl}/api/leads`, {
    headers: headers(apiKey),
  });
  return parse(response, 'Leads ophalen mislukt.');
}

export async function createLead(apiBaseUrl, apiKey, payload) {
  const response = await fetch(`${apiBaseUrl}/api/leads`, {
    method: 'POST',
    headers: headers(apiKey),
    body: JSON.stringify(payload),
  });
  return parse(response, 'Lead aanmaken mislukt.');
}
