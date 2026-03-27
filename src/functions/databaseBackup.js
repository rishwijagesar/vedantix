export async function databaseBackup(payload) {
  try {
    const res = await fetch("/api/database-backup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = await res.json();

    return { data };
  } catch (err) {
    return {
      data: {
        success: false,
        error: err.message,
      },
    };
  }
}
