import { useState, useEffect, useRef } from "react";
import { publicChat } from "@/functions/publicChat";

function getSessionId() {
  let id = localStorage.getItem("chat_session_id");
  if (!id) {
    id = "sess_" + Math.random().toString(36).slice(2) + Date.now();
    localStorage.setItem("chat_session_id", id);
  }
  return id;
}

export default function LiveChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [visitorName, setVisitorName] = useState(() => localStorage.getItem("chat_visitor_name") || "");
  const [nameSet, setNameSet] = useState(() => !!localStorage.getItem("chat_visitor_name"));
  const [nameInput, setNameInput] = useState("");
  const [sending, setSending] = useState(false);
  const bottomRef = useRef(null);
  const sessionId = getSessionId();
  const pollRef = useRef(null);

  useEffect(() => {
    if (!open) {
      clearInterval(pollRef.current);
      return;
    }
    loadMessages();
    pollRef.current = setInterval(loadMessages, 4000);
    return () => clearInterval(pollRef.current);
  }, [open]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const loadMessages = async () => {
    const res = await publicChat({ action: "get_messages", session_id: sessionId });
    const msgs = res.data?.messages || [];
    setMessages(msgs);
    // Mark admin messages as read
    const unread = msgs.filter(m => m.from === "admin" && !m.is_read).map(m => m.id);
    if (unread.length > 0) {
      await publicChat({ action: "mark_read", message_ids: unread });
    }
  };

  const setName = () => {
    if (!nameInput.trim()) return;
    localStorage.setItem("chat_visitor_name", nameInput.trim());
    setVisitorName(nameInput.trim());
    setNameSet(true);
  };

  const sendMessage = async () => {
    if (!input.trim() || sending) return;
    setSending(true);
    await publicChat({
      session_id: sessionId,
      visitor_name: visitorName,
      message: input.trim(),
      from: "visitor",
    });
    setInput("");
    await loadMessages();
    setSending(false);
  };

  const unreadCount = messages.filter(m => m.from === "admin" && !m.is_read).length;

  return (
    <>
      <style>{`
        .lc-fab{position:fixed;bottom:28px;right:28px;z-index:9999;font-family:'Inter',sans-serif}
        .lc-toggle{width:60px;height:60px;border-radius:50%;background:#0a1628;border:none;cursor:pointer;box-shadow:0 4px 24px rgba(10,22,40,0.4);display:flex;align-items:center;justify-content:center;transition:transform 0.2s;position:relative}
        .lc-toggle:hover{transform:scale(1.08)}
        .lc-badge{position:absolute;top:-3px;right:-3px;background:#ef4444;color:#fff;width:20px;height:20px;border-radius:50%;font-size:0.65rem;font-weight:800;display:flex;align-items:center;justify-content:center;border:2px solid #fff}
        .lc-popup{position:absolute;bottom:74px;right:0;width:340px;background:#fff;border-radius:18px;box-shadow:0 12px 48px rgba(0,0,0,0.18);overflow:hidden;display:flex;flex-direction:column;animation:lcPop 0.22s cubic-bezier(.34,1.56,.64,1)}
        @keyframes lcPop{from{opacity:0;transform:scale(0.88) translateY(16px)}to{opacity:1;transform:scale(1) translateY(0)}}
        .lc-head{background:#0a1628;padding:16px 18px;display:flex;align-items:center;gap:12px}
        .lc-avatar{width:40px;height:40px;border-radius:50%;background:#1a73e8;display:flex;align-items:center;justify-content:center;font-weight:900;font-size:1.1rem;color:#fff;flex-shrink:0}
        .lc-body{padding:14px;min-height:200px;max-height:300px;overflow-y:auto;display:flex;flex-direction:column;gap:8px;background:#f7f9fc}
        .lc-msg-visitor{background:#1a73e8;color:#fff;border-radius:14px 14px 4px 14px;padding:9px 13px;font-size:0.85rem;line-height:1.5;max-width:80%;align-self:flex-end}
        .lc-msg-admin{background:#fff;color:#1a1a2e;border-radius:14px 14px 14px 4px;padding:9px 13px;font-size:0.85rem;line-height:1.5;max-width:80%;align-self:flex-start;box-shadow:0 1px 4px rgba(0,0,0,0.08)}
        .lc-msg-time{font-size:0.68rem;opacity:0.55;margin-top:3px}
        .lc-footer{padding:10px 12px;background:#fff;border-top:1px solid #e5e7eb}
        .lc-input-row{display:flex;align-items:center;gap:8px;background:#f7f9fc;border:1.5px solid #e5e7eb;border-radius:24px;padding:6px 6px 6px 14px}
        .lc-input{border:none;outline:none;flex:1;font-size:0.85rem;background:transparent;color:#1a1a2e;font-family:inherit}
        .lc-send{width:34px;height:34px;border-radius:50%;background:#1a73e8;border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;flex-shrink:0;transition:background 0.15s}
        .lc-send:hover{background:#00c2ff}
        .lc-send:disabled{background:#9ca3af;cursor:not-allowed}
        @media(max-width:420px){.lc-popup{width:calc(100vw - 40px);right:-14px}}
      `}</style>
      <div className="lc-fab">
        {open && (
          <div className="lc-popup">
            <div className="lc-head">
              <div className="lc-avatar">V</div>
              <div style={{ flex: 1 }}>
                <div style={{ color: "#fff", fontWeight: 700, fontSize: "0.95rem" }}>Vedantix Support</div>
                <div style={{ color: "rgba(255,255,255,0.55)", fontSize: "0.73rem", display: "flex", alignItems: "center", gap: 4 }}>
                  <span style={{ width: 7, height: 7, background: "#4ade80", borderRadius: "50%", display: "inline-block" }} />
                  Online
                </div>
              </div>
              <button onClick={() => setOpen(false)} style={{ background: "none", border: "none", color: "rgba(255,255,255,0.6)", cursor: "pointer", fontSize: "1.1rem", padding: 4 }}>✕</button>
            </div>

            {!nameSet ? (
              <div style={{ padding: 20 }}>
                <p style={{ fontWeight: 600, marginBottom: 12, fontSize: "0.9rem", color: "#374151" }}>Hoe mogen we je noemen?</p>
                <input
                  style={{ width: "100%", padding: "10px 14px", border: "2px solid #e5e7eb", borderRadius: 10, fontSize: "0.9rem", outline: "none", marginBottom: 10, fontFamily: "inherit", boxSizing: "border-box" }}
                  placeholder="Jouw naam"
                  value={nameInput}
                  onChange={e => setNameInput(e.target.value)}
                  onKeyDown={e => e.key === "Enter" && setName()}
                  autoFocus
                />
                <button onClick={setName} disabled={!nameInput.trim()} style={{ width: "100%", background: "#1a73e8", color: "#fff", border: "none", borderRadius: 10, padding: "10px", fontWeight: 700, cursor: "pointer", fontSize: "0.9rem" }}>
                  Start chat →
                </button>
              </div>
            ) : (
              <>
                <div className="lc-body">
                  {messages.length === 0 && (
                    <div className="lc-msg-admin">
                      👋 Hoi {visitorName}! Hoe kunnen we je helpen?
                    </div>
                  )}
                  {messages.map(m => (
                    <div key={m.id} style={{ display: "flex", flexDirection: "column", alignItems: m.from === "visitor" ? "flex-end" : "flex-start" }}>
                      <div className={m.from === "visitor" ? "lc-msg-visitor" : "lc-msg-admin"}>
                        {m.message}
                      </div>
                      <div className="lc-msg-time" style={{ alignSelf: m.from === "visitor" ? "flex-end" : "flex-start" }}>
                        {new Date(m.created_date).toLocaleTimeString("nl-NL", { hour: "2-digit", minute: "2-digit" })}
                      </div>
                    </div>
                  ))}
                  <div ref={bottomRef} />
                </div>
                <div className="lc-footer">
                  <div className="lc-input-row">
                    <input
                      className="lc-input"
                      placeholder="Typ een bericht..."
                      value={input}
                      onChange={e => setInput(e.target.value)}
                      onKeyDown={e => e.key === "Enter" && sendMessage()}
                    />
                    <button className="lc-send" disabled={!input.trim() || sending} onClick={sendMessage}>
                      <svg viewBox="0 0 24 24" width="16" height="16" fill="#fff"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        )}
        <button className="lc-toggle" onClick={() => setOpen(p => !p)} aria-label="Live chat">
          {unreadCount > 0 && !open && <div className="lc-badge">{unreadCount}</div>}
          {open
            ? <svg viewBox="0 0 24 24" width="22" height="22" fill="#fff"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>
            : <svg viewBox="0 0 24 24" width="26" height="26" fill="#fff"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z"/></svg>
          }
        </button>
      </div>
    </>
  );
}