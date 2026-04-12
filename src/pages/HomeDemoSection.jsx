import NicheCarousel from "./NicheCarousel";

const DEMO_SECTION_STYLES = `
  .demo-section{
    padding:96px 5%;
    background:#fff;
  }

  @media(max-width:768px){
    .demo-section{
      padding:80px 5%;
    }
  }

  @media(max-width:480px){
    .demo-section{
      padding:60px 5%;
    }
  }
`;

export default function HomeDemoSection() {
  return (
    <section id="demo" className="demo-section anchor-section">
      <style>{DEMO_SECTION_STYLES}</style>

      <div className="section-wrap">
        <div className="section-header centered">
          <div className="section-label">Voorbeelden</div>
          <h2 className="section-h2">Zo zou jouw website eruit kunnen zien</h2>
          <p className="section-p">
            Bekijk voorbeelden per branche en krijg sneller gevoel bij de stijl, uitstraling en opbouw die past bij jouw bedrijf.
            Zo zie je direct wat mogelijk is, zonder dat je alles zelf hoeft te bedenken.
          </p>
        </div>

        <NicheCarousel />
      </div>
    </section>
  );
}