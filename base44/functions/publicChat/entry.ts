import { createClientFromRequest } from 'npm:@base44/sdk@0.8.21';

Deno.serve(async (req) => {
  const base44 = createClientFromRequest(req);
  const body = await req.json().catch(() => ({}));
  const { action, session_id, visitor_name, message, from, message_ids } = body;

  // action: "get_messages" | "send_message" | "mark_read"

  if (action === "get_messages") {
    if (!session_id) {
      return Response.json({ error: "session_id required" }, { status: 400 });
    }
    const messages = await base44.asServiceRole.entities.ChatMessage.filter(
      { session_id },
      "created_date",
      100
    );
    return Response.json({ messages });
  }

  if (action === "send_message") {
    if (!session_id || !message) {
      return Response.json({ error: "session_id and message required" }, { status: 400 });
    }
    const created = await base44.asServiceRole.entities.ChatMessage.create({
      session_id,
      visitor_name: visitor_name || "Bezoeker",
      message,
      from: "visitor",
      is_read: false,
    });
    return Response.json({ message: created });
  }

  if (action === "mark_read") {
    if (!message_ids || !Array.isArray(message_ids)) {
      return Response.json({ error: "message_ids array required" }, { status: 400 });
    }
    await Promise.all(
      message_ids.map(id => base44.asServiceRole.entities.ChatMessage.update(id, { is_read: true }))
    );
    return Response.json({ ok: true });
  }

  return Response.json({ error: "Invalid action" }, { status: 400 });
});