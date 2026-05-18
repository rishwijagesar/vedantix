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

export async function createMailbox(apiBaseUrl, apiKey, payload) {
  const response = await fetch(`${apiBaseUrl}/api/mail/mailboxes`, {
    method: 'POST',
    headers: headers(apiKey),
    body: JSON.stringify(payload),
  });

  return parse(response, 'Mailbox aanmaken mislukt.');
}

export async function updateMailboxStatus(apiBaseUrl, apiKey, mailboxId, action) {
  const response = await fetch(`${apiBaseUrl}/api/mail/mailboxes/${mailboxId}/${action}`, {
    method: 'POST',
    headers: headers(apiKey),
  });

  return parse(response, 'Mailbox status wijzigen mislukt.');
}

export async function resetMailboxPassword(apiBaseUrl, apiKey, mailboxId, password) {
  const response = await fetch(`${apiBaseUrl}/api/mail/mailboxes/${mailboxId}/password`, {
    method: 'POST',
    headers: headers(apiKey),
    body: JSON.stringify({ password }),
  });

  return parse(response, 'Wachtwoord resetten mislukt.');
}
