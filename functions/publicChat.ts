import { createClientFromRequest } from 'npm:@base44/sdk@0.8.21';

Deno.serve(async (req) => {
  const base44 = createClientFromRequest(req);

  if (req.method === "GET") {
    // Get messages for a session (public - no auth required)
    const body = await req.json().catch(() => ({}));
    const { session_id } = body;

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

  if (req.method === "POST") {
    const body = await req.json().catch(() => ({}));
    const { session_id, visitor_name, message, from, is_read } = body;

    if (!session_id || !message || !from) {
      return Response.json({ error: "session_id, message, from required" }, { status: 400 });
    }

    // Only allow visitor messages from this endpoint (admin replies via authenticated SDK)
    if (from !== "visitor") {
      return Response.json({ error: "Only visitor messages allowed" }, { status: 403 });
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

  if (req.method === "PATCH") {
    // Mark admin messages as read for a session
    const body = await req.json().catch(() => ({}));
    const { message_ids } = body;

    if (!message_ids || !Array.isArray(message_ids)) {
      return Response.json({ error: "message_ids array required" }, { status: 400 });
    }

    await Promise.all(
      message_ids.map(id => base44.asServiceRole.entities.ChatMessage.update(id, { is_read: true }))
    );

    return Response.json({ ok: true });
  }

  return Response.json({ error: "Method not allowed" }, { status: 405 });
});