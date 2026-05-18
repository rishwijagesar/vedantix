import { ADMIN_ACTOR_ID, ADMIN_SOURCE } from '../constants';

export function buildHeaders(apiKey) {
  return {
    'Content-Type': 'application/json',
    'X-Api-Key': apiKey,
    'X-Source': ADMIN_SOURCE,
    'X-Actor-Id': ADMIN_ACTOR_ID,
  };
}

export async function parseResponse(response, fallbackMessage) {
  if (!response.ok) {
    let message = fallbackMessage;

    try {
      const body = await response.json();
      if (body?.message) {
        message = body.message;
      }
    } catch {
      // ignore invalid response body
    }

    throw new Error(message);
  }

  if (response.status === 204) {
    return null;
  }

  return response.json();
}
