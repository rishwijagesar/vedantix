function buildHeaders(apiKey) {
  return {
    'Content-Type': 'application/json',
    'X-Api-Key': apiKey,
    'X-Source': 'ADMIN_PANEL',
    'X-Actor-Id': 'admin-crm',
  };
}

async function parseResponse(response, fallbackMessage) {
  if (!response.ok) {
    throw new Error(fallbackMessage);
  }
  return response.json();
}

export async function deployCustomer(apiBaseUrl, apiKey, customerId) {
  const response = await fetch(`${apiBaseUrl}/api/deploy`, {
    method: 'POST',
    headers: buildHeaders(apiKey),
    body: JSON.stringify({ customerId }),
  });

  return parseResponse(response, 'Deployment starten mislukt.');
}

export async function getDeployment(apiBaseUrl, apiKey, deploymentId) {
  const response = await fetch(`${apiBaseUrl}/api/deployments/${deploymentId}`, {
    headers: buildHeaders(apiKey),
  });

  return parseResponse(response, 'Deployment ophalen mislukt.');
}

export async function deleteInfrastructure(apiBaseUrl, apiKey, customerId) {
  const response = await fetch(`${apiBaseUrl}/api/customers/${customerId}/teardown`, {
    method: 'POST',
    headers: buildHeaders(apiKey),
  });

  return parseResponse(response, 'Verwijderen van infrastructuur mislukt.');
}
