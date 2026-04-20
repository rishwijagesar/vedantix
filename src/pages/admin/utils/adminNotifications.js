const ADMIN_NOTIFICATION_EVENT = "vedantix:admin-notification";

function emitNotification(type, message) {
  if (typeof window === "undefined") {
    return;
  }

  window.dispatchEvent(
    new CustomEvent(ADMIN_NOTIFICATION_EVENT, {
      detail: {
        id:
          (window.crypto &&
            window.crypto.randomUUID &&
            window.crypto.randomUUID()) ||
          `notif-${Date.now()}`,
        type,
        message,
        createdAt: new Date().toISOString(),
      },
    })
  );
}

export function notifySuccess(message) {
  emitNotification("success", message);
}

export function notifyError(message) {
  emitNotification("error", message);
}

export function notifyInfo(message) {
  emitNotification("info", message);
}

export function subscribeToAdminNotifications(callback) {
  if (typeof window === "undefined") {
    return () => {};
  }

  const handler = (event) => {
    callback(event.detail);
  };

  window.addEventListener(ADMIN_NOTIFICATION_EVENT, handler);

  return () => {
    window.removeEventListener(ADMIN_NOTIFICATION_EVENT, handler);
  };
}