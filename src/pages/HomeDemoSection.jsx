import NicheCarousel from "./NicheCarousel";

const DEMO_SECTION_STYLES = `
  .demo-section{
    padding:96px 5%;
    background:#fff
  }

  @media(max-width:768px){
    .demo-section{
      padding:80px 5%
    }
  }

  @media(max-width:480px){
    .demo-section{
      padding:60px 5%
    }
  }
`;

export default function HomeDemoSection() {
  return (
    <section id="demo" className="demo-section anchor-section">
      <style>{DEMO_SECTION_STYLES}</style>

      <div className="section-wrap">
        <div className="section-header centered">
          <div className="section-label">Demo concepten</div>
          <h2 className="section-h2">Voorbeelden van richtingen die wij kunnen bouwen</h2>
          <p className="section-p">
            Goede demo’s laten snel zien welke stijl, opbouw en richting mogelijk is voor jouw branche,
            ook als je nog geen groot portfolio hebt bekeken.
          </p>
        </div>

        <NicheCarousel />
      </div>
    </section>
  );
}