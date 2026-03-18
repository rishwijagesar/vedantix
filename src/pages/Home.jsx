// redirect-to-vedantixhome
export default function Home() {
  if (typeof window !== "undefined") window.location.replace("/VedantixHome");
  return null;
}
