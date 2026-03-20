import { createClientFromRequest } from 'npm:@base44/sdk@0.8.21';

const ENTITY_NAMES = [
  "CustomerProfile", "Ticket", "TicketComment", "Payment", "Subscription",
  "Document", "FinancieelItem", "Transaction", "FinanceTarget", "Invoice",
  "Appointment", "Availability", "ChatMessage", "ChatAvailability",
  "EmailTemplate", "EmailLog", "ChangeRequest"
];

const Backup = null; // We store backups in FinanceTarget entity — actually we use a dedicated Backup entity

Deno.serve(async (req) => {
  const base44 = createClientFromRequest(req);
  const user = await base44.auth.me();
  if (!user || user.role !== "admin") {
    return Response.json({ error: "Forbidden" }, { status: 403 });
  }

  const body = await req.json().catch(() => ({}));
  const action = body.action || "create";

  if (action === "list") {
    // List backups from the BackupRecord entity
    const records = await base44.asServiceRole.entities.BackupRecord.list("-created_date", 30);
    return Response.json({ success: true, backups: records });
  }

  if (action === "create") {
    // Fetch all entities
    const backupData = {};
    let totalCount = 0;
    for (const name of ENTITY_NAMES) {
      try {
        const records = await base44.asServiceRole.entities[name].list("-created_date", 5000);
        backupData[name] = records;
        totalCount += records.length;
      } catch {
        backupData[name] = [];
      }
    }

    // Store backup record
    const record = await base44.asServiceRole.entities.BackupRecord.create({
      type: body.auto ? "auto" : "manual",
      entity_count: ENTITY_NAMES.length,
      record_count: totalCount,
      data: backupData,
    });

    return Response.json({ success: true, backup_id: record.id, record_count: totalCount });
  }

  if (action === "restore") {
    const { backup_id } = body;
    if (!backup_id) return Response.json({ error: "backup_id required" }, { status: 400 });

    // Fetch backup
    const records = await base44.asServiceRole.entities.BackupRecord.list();
    const backup = records.find(r => r.id === backup_id);
    if (!backup || !backup.data) {
      return Response.json({ error: "Backup niet gevonden of geen data" }, { status: 404 });
    }

    const backupData = backup.data;
    const results = {};

    for (const [entityName, entityRecords] of Object.entries(backupData)) {
      if (!entityRecords || entityRecords.length === 0) continue;
      try {
        // Delete all current records
        const current = await base44.asServiceRole.entities[entityName].list("-created_date", 5000);
        for (const rec of current) {
          await base44.asServiceRole.entities[entityName].delete(rec.id);
        }
        // Restore from backup (without system fields)
        for (const rec of entityRecords) {
          const { id, created_date, updated_date, created_by, ...data } = rec;
          await base44.asServiceRole.entities[entityName].create(data);
        }
        results[entityName] = { restored: entityRecords.length };
      } catch (err) {
        results[entityName] = { error: err.message };
      }
    }

    return Response.json({ success: true, results });
  }

  return Response.json({ error: "Unknown action" }, { status: 400 });
});