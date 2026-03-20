import NavBar from "./components/NavBar";

export default function WebsiteRestaurant() {
  return (
    <div style={{ padding: "40px", maxWidth: 900, margin: "0 auto" }}>
      <NavBar />

      <h1>Website laten maken voor restaurants</h1>

      <p>
        Meer reserveringen voor jouw restaurant? Dan heb je een sterke online aanwezigheid nodig.
      </p>

      <h2>Meer gasten via Google</h2>
      <p>
        Mensen zoeken dagelijks naar restaurants in de buurt.
        Zonder website loop je reserveringen mis.
      </p>

      <ul>
        <li>Online reserveringen</li>
        <li>Menu tonen</li>
        <li>Locatie zichtbaar</li>
      </ul>

      <h2>Wij bouwen</h2>
      <ul>
        <li>Snelle website</li>
        <li>Mobielvriendelijk</li>
        <li>Google Maps integratie</li>
      </ul>

      <a href="https://wa.me/310626219989">Start nu →</a>
    </div>
  );
}