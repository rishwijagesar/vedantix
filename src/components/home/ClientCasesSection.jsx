const CLIENT_CASES = [
    {
      name: "Horeca Topper",
      website: "https://www.horeca-topper.nl/",
      domainLabel: "horeca-topper.nl",
      branch: "Horeca / dienstverlening",
      status: "Live",
      intro:
        "Voor Horeca Topper hebben we een professionele website gerealiseerd met een duidelijke structuur, sterke uitstraling en een opbouw die vertrouwen uitstraalt naar bezoekers.",
      challenge:
        "De website moest professioneel ogen, snel laden en bezoekers snel richting contact of aanvraag sturen.",
      solution:
        "We hebben gekozen voor een heldere contentstructuur, een nette visuele uitstraling, mobielvriendelijke opbouw en een snelle livegang.",
      delivered: [
        "Professioneel webdesign",
        "Responsive uitwerking voor mobiel en desktop",
        "Heldere contentstructuur",
        "Snelle oplevering en livegang",
      ],
      result:
        "Een verzorgde online presentatie waarmee het bedrijf direct professioneler overkomt en bezoekers sneller vertrouwen krijgen.",
    },
  ];
  
  export default function ClientCasesSection() {
    return (
      <section style={styles.section}>
        <div style={styles.bgGlowOne} />
        <div style={styles.bgGlowTwo} />
  
        <div style={styles.container}>
          <div style={styles.header}>
            <div style={styles.eyebrow}>KLANTDOSSIER</div>
            <h2 style={styles.title}>Echte websites voor echte klanten</h2>
            <p style={styles.subtitle}>
              Geen concepten of demo’s, maar live projecten die laten zien wat wij
              daadwerkelijk opleveren.
            </p>
          </div>
  
          <div style={styles.stack}>
            {CLIENT_CASES.map((client) => (
              <article key={client.name} style={styles.caseCard}>
                <div style={styles.caseTop}>
                  <div style={styles.caseLeft}>
                    <div style={styles.caseMetaRow}>
                      <span style={styles.statusBadge}>{client.status}</span>
                      <span style={styles.dot} />
                      <span style={styles.branch}>{client.branch}</span>
                    </div>
  
                    <h3 style={styles.caseTitle}>{client.name}</h3>
  
                    <a
                      href={client.website}
                      target="_blank"
                      rel="noreferrer"
                      style={styles.domainLink}
                    >
                      {client.domainLabel}
                    </a>
  
                    <p style={styles.intro}>{client.intro}</p>
                  </div>
  
                  <div style={styles.caseRight}>
                    <a
                      href={client.website}
                      target="_blank"
                      rel="noreferrer"
                      style={styles.primaryButton}
                    >
                      Bekijk website
                    </a>
                  </div>
                </div>
  
                <div style={styles.divider} />
  
                <div style={styles.contentGrid}>
                  <div style={styles.mainColumn}>
                    <div style={styles.infoCard}>
                      <div style={styles.infoLabel}>Vraagstuk</div>
                      <p style={styles.infoText}>{client.challenge}</p>
                    </div>
  
                    <div style={styles.infoCard}>
                      <div style={styles.infoLabel}>Aanpak</div>
                      <p style={styles.infoText}>{client.solution}</p>
                    </div>
  
                    <div style={styles.infoCard}>
                      <div style={styles.infoLabel}>Resultaat</div>
                      <p style={styles.infoText}>{client.result}</p>
                    </div>
                  </div>
  
                  <aside style={styles.sideColumn}>
                    <div style={styles.deliverablesCard}>
                      <div style={styles.deliverablesTitle}>Opgeleverd</div>
  
                      <ul style={styles.deliverablesList}>
                        {client.delivered.map((item) => (
                          <li key={item} style={styles.deliverablesItem}>
                            <span style={styles.check}>✓</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </aside>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    );
  }
  
  const styles = {
    section: {
      position: "relative",
      overflow: "hidden",
      padding: "110px 20px",
      background:
        "radial-gradient(circle at top, rgba(99,102,241,0.10), transparent 30%), #07111f",
      color: "#ffffff",
    },
    bgGlowOne: {
      position: "absolute",
      top: "-120px",
      left: "-100px",
      width: "320px",
      height: "320px",
      borderRadius: "999px",
      background: "rgba(59,130,246,0.10)",
      filter: "blur(80px)",
      pointerEvents: "none",
    },
    bgGlowTwo: {
      position: "absolute",
      right: "-80px",
      bottom: "-80px",
      width: "280px",
      height: "280px",
      borderRadius: "999px",
      background: "rgba(168,85,247,0.10)",
      filter: "blur(80px)",
      pointerEvents: "none",
    },
    container: {
      position: "relative",
      zIndex: 1,
      maxWidth: "1200px",
      margin: "0 auto",
    },
    header: {
      maxWidth: "760px",
      margin: "0 auto 52px auto",
      textAlign: "center",
    },
    eyebrow: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      minHeight: "34px",
      padding: "0 14px",
      borderRadius: "999px",
      border: "1px solid rgba(255,255,255,0.12)",
      background: "rgba(255,255,255,0.05)",
      fontSize: "12px",
      fontWeight: 800,
      letterSpacing: "0.14em",
      color: "rgba(255,255,255,0.78)",
      marginBottom: "18px",
    },
    title: {
      margin: "0 0 16px 0",
      fontSize: "clamp(32px, 5vw, 52px)",
      lineHeight: 1.06,
      fontWeight: 800,
      letterSpacing: "-0.03em",
    },
    subtitle: {
      margin: 0,
      fontSize: "18px",
      lineHeight: 1.75,
      color: "rgba(255,255,255,0.72)",
    },
    stack: {
      display: "grid",
      gridTemplateColumns: "1fr",
      gap: "28px",
    },
    caseCard: {
      borderRadius: "32px",
      border: "1px solid rgba(255,255,255,0.10)",
      background:
        "linear-gradient(180deg, rgba(255,255,255,0.08), rgba(255,255,255,0.04))",
      backdropFilter: "blur(16px)",
      WebkitBackdropFilter: "blur(16px)",
      boxShadow: "0 24px 80px rgba(0,0,0,0.32)",
      padding: "34px",
    },
    caseTop: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "flex-start",
      gap: "24px",
      flexWrap: "wrap",
      marginBottom: "28px",
    },
    caseLeft: {
      flex: "1 1 620px",
      minWidth: 0,
    },
    caseRight: {
      display: "flex",
      alignItems: "flex-start",
      justifyContent: "flex-end",
      flex: "0 0 auto",
    },
    caseMetaRow: {
      display: "flex",
      alignItems: "center",
      gap: "10px",
      flexWrap: "wrap",
      marginBottom: "16px",
    },
    statusBadge: {
      display: "inline-flex",
      alignItems: "center",
      minHeight: "34px",
      padding: "0 12px",
      borderRadius: "999px",
      background: "rgba(34,197,94,0.12)",
      border: "1px solid rgba(34,197,94,0.28)",
      color: "#86efac",
      fontSize: "13px",
      fontWeight: 700,
    },
    dot: {
      width: "5px",
      height: "5px",
      borderRadius: "999px",
      background: "rgba(255,255,255,0.35)",
    },
    branch: {
      fontSize: "14px",
      color: "rgba(255,255,255,0.68)",
    },
    caseTitle: {
      margin: "0 0 8px 0",
      fontSize: "clamp(28px, 4vw, 40px)",
      lineHeight: 1.08,
      fontWeight: 800,
      letterSpacing: "-0.02em",
    },
    domainLink: {
      display: "inline-block",
      marginBottom: "18px",
      fontSize: "15px",
      color: "#93c5fd",
      textDecoration: "none",
      wordBreak: "break-word",
    },
    intro: {
      margin: 0,
      maxWidth: "760px",
      fontSize: "17px",
      lineHeight: 1.85,
      color: "rgba(255,255,255,0.84)",
    },
    primaryButton: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      minHeight: "50px",
      padding: "0 18px",
      borderRadius: "14px",
      background: "#ffffff",
      color: "#09111f",
      textDecoration: "none",
      fontWeight: 700,
      boxShadow: "0 12px 30px rgba(255,255,255,0.12)",
      whiteSpace: "nowrap",
    },
    divider: {
      height: "1px",
      background: "linear-gradient(90deg, rgba(255,255,255,0.12), rgba(255,255,255,0.04))",
      marginBottom: "28px",
    },
    contentGrid: {
      display: "grid",
      gridTemplateColumns: "minmax(0, 1.5fr) minmax(280px, 0.9fr)",
      gap: "22px",
    },
    mainColumn: {
      display: "grid",
      gap: "16px",
    },
    sideColumn: {
      display: "block",
    },
    infoCard: {
      borderRadius: "22px",
      background: "rgba(255,255,255,0.04)",
      border: "1px solid rgba(255,255,255,0.08)",
      padding: "22px",
    },
    infoLabel: {
      marginBottom: "10px",
      fontSize: "12px",
      fontWeight: 800,
      letterSpacing: "0.12em",
      textTransform: "uppercase",
      color: "rgba(255,255,255,0.58)",
    },
    infoText: {
      margin: 0,
      fontSize: "16px",
      lineHeight: 1.8,
      color: "rgba(255,255,255,0.88)",
    },
    deliverablesCard: {
      height: "100%",
      borderRadius: "22px",
      background:
        "linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.03))",
      border: "1px solid rgba(255,255,255,0.08)",
      padding: "22px",
    },
    deliverablesTitle: {
      marginBottom: "16px",
      fontSize: "16px",
      fontWeight: 700,
      color: "#ffffff",
    },
    deliverablesList: {
      listStyle: "none",
      padding: 0,
      margin: 0,
      display: "grid",
      gap: "12px",
    },
    deliverablesItem: {
      display: "flex",
      alignItems: "flex-start",
      gap: "12px",
      fontSize: "15px",
      lineHeight: 1.6,
      color: "rgba(255,255,255,0.84)",
    },
    check: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      width: "22px",
      height: "22px",
      borderRadius: "999px",
      background: "rgba(255,255,255,0.08)",
      border: "1px solid rgba(255,255,255,0.10)",
      fontSize: "13px",
      fontWeight: 700,
      flexShrink: 0,
      marginTop: "1px",
    },
  };