import { useState, useEffect, useRef } from "react";
import { base44 } from "@/api/base44Client";

const ChatMessage = base44.entities.ChatMessage;

export default function ChatInbox() {
  const [sessions, setSessions] = useState([]);
  const [selectedSession, setSelectedSession] = useState(null);
  const [messages, setMessages] = useState([]);
  const [reply, setReply] = useState("");
  const [sending, setSending] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    loadSessions();
    const unsub = ChatMessage.subscribe(() => loadSessions());
    return unsub;
  }, []);

  useEffect(() => {
    if (!selectedSession) return;
    loadMessages(selectedSession);
    const unsub = ChatMessage.subscribe((event) => {
      if (event.data?.session_id === selectedSession) {
        loadMessages(selectedSession);
      }
    });
    return unsub;
  }, [selectedSession]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const loadSessions = async () => {
    const all = await ChatMessage.list("-created_date", 500);
    // Group by session_id, get latest message per session
    const sessionMap = {};
    all.forEach(m => {
      if (!sessionMap[m.session_id]) {
        sessionMap[m.session_id] = {
          session_id: m.session_id,
          visitor_name: m.visitor_name || "Bezoeker",
          last_message: m.message,
          last_date: m.created_date,
          unread: 0,
        };
      }
      if (m.from === "visitor" && !m.is_read) {
        sessionMap[m.session_id].unread++;
      }
    });
    setSessions(Object.values(sessionMap).sort((a, b) => new Date(b.last_date) - new Date(a.last_date)));
  };

  const loadMessages = async (sessionId) => {
    const msgs = await ChatMessage.filter({ session_id: sessionId }, "created_date", 200);
    setMessages(msgs);
    // Mark visitor messages as read
    msgs.filter(m => m.from === "visitor" && !m.is_read).forEach(m =>
      ChatMessage.update(m.id, { is_read: true })
    );
  };

  const sendReply = async () => {
    if (!reply.trim() || !selectedSession || sending) return;
    setSending(true);
    await ChatMessage.create({
      session_id: selectedSession,
      visitor_name: "Admin",
      message: reply.trim(),
      from: "admin",
      is_read: false,
    });
    setReply("");
    await loadMessages(selectedSession);
    setSending(false);
  };

  const totalUnread = sessions.reduce((s, sess) => s + sess.unread, 0);

  return (
    <div style={{ display: "grid", gridTemplateColumns: "280px 1fr", gap: 0, background: "#fff", borderRadius: 16, border: "1px solid #e5e7eb", overflow: "hidden", minHeight: 500 }}>
      {/* Sidebar */}
      <div style={{ borderRight: "1px solid #e5e7eb", display: "flex", flexDirection: "column" }}>
        <div style={{ padding: "16px 18px", borderBottom: "1px solid #e5e7eb", background: "#f8fafc" }}>
          <h3 style={{ fontWeight: 700, fontSize: "0.95rem" }}>💬 Chats {totalUnread > 0 && <span style={{ background: "#ef4444", color: "#fff", borderRadius: "50%", padding: "1px 7px", fontSize: "0.72rem", marginLeft: 6 }}>{totalUnread}</span>}</h3>
        </div>
        <div style={{ overflowY: "auto", flex: 1 }}>
          {sessions.length === 0 && (
            <p style={{ color: "#94a3b8", fontSize: "0.85rem", padding: 20, textAlign: "center" }}>Nog geen chats.</p>
          )}
          {sessions.map(sess => (
            <div key={sess.session_id}
              onClick={() => setSelectedSession(sess.session_id)}
              style={{
                padding: "14px 18px", cursor: "pointer", borderBottom: "1px solid #f1f5f9",
                background: selectedSession === sess.session_id ? "#eff6ff" : "#fff",
                borderLeft: selectedSession === sess.session_id ? "3px solid #1a73e8" : "3px solid transparent",
              }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
                <span style={{ fontWeight: 700, fontSize: "0.88rem" }}>{sess.visitor_name}</span>
                {sess.unread > 0 && (
                  <span style={{ background: "#1a73e8", color: "#fff", borderRadius: 100, padding: "1px 7px", fontSize: "0.7rem", fontWeight: 700 }}>{sess.unread}</span>
                )}
              </div>
              <p style={{ color: "#94a3b8", fontSize: "0.78rem", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{sess.last_message}</p>
              <p style={{ color: "#cbd5e1", fontSize: "0.7rem", marginTop: 3 }}>{new Date(sess.last_date).toLocaleString("nl-NL", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" })}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Chat area */}
      {!selectedSession ? (
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", color: "#94a3b8", flexDirection: "column", gap: 10 }}>
          <div style={{ fontSize: "2.5rem" }}>💬</div>
          <p style={{ fontSize: "0.9rem" }}>Selecteer een gesprek</p>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column" }}>
          {/* Header */}
          <div style={{ padding: "14px 20px", borderBottom: "1px solid #e5e7eb", background: "#f8fafc", display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 34, height: 34, borderRadius: "50%", background: "#1a73e8", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 700, fontSize: "0.9rem" }}>
              {(sessions.find(s => s.session_id === selectedSession)?.visitor_name || "B")[0].toUpperCase()}
            </div>
            <span style={{ fontWeight: 700, fontSize: "0.92rem" }}>{sessions.find(s => s.session_id === selectedSession)?.visitor_name || "Bezoeker"}</span>
          </div>

          {/* Messages */}
          <div style={{ flex: 1, overflowY: "auto", padding: 16, display: "flex", flexDirection: "column", gap: 8, background: "#f7f9fc", minHeight: 0, maxHeight: 380 }}>
            {messages.map(m => (
              <div key={m.id} style={{ display: "flex", flexDirection: "column", alignItems: m.from === "admin" ? "flex-end" : "flex-start" }}>
                <div style={{
                  background: m.from === "admin" ? "#1a73e8" : "#fff",
                  color: m.from === "admin" ? "#fff" : "#1a1a2e",
                  borderRadius: m.from === "admin" ? "14px 14px 4px 14px" : "14px 14px 14px 4px",
                  padding: "9px 13px", fontSize: "0.87rem", lineHeight: 1.5, maxWidth: "75%",
                  boxShadow: m.from === "visitor" ? "0 1px 4px rgba(0,0,0,0.08)" : "none"
                }}>
                  {m.message}
                </div>
                <span style={{ fontSize: "0.68rem", color: "#94a3b8", marginTop: 3 }}>
                  {new Date(m.created_date).toLocaleTimeString("nl-NL", { hour: "2-digit", minute: "2-digit" })}
                </span>
              </div>
            ))}
            <div ref={bottomRef} />
          </div>

          {/* Reply input */}
          <div style={{ padding: "10px 14px", borderTop: "1px solid #e5e7eb", display: "flex", gap: 8, background: "#fff" }}>
            <input
              style={{ flex: 1, padding: "10px 14px", border: "2px solid #e5e7eb", borderRadius: 24, fontSize: "0.88rem", outline: "none", fontFamily: "inherit" }}
              placeholder="Typ een antwoord..."
              value={reply}
              onChange={e => setReply(e.target.value)}
              onKeyDown={e => e.key === "Enter" && sendReply()}
            />
            <button disabled={!reply.trim() || sending} onClick={sendReply}
              style={{ background: "#1a73e8", color: "#fff", border: "none", borderRadius: "50%", width: 40, height: 40, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, opacity: !reply.trim() ? 0.5 : 1 }}>
              <svg viewBox="0 0 24 24" width="16" height="16" fill="#fff"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}