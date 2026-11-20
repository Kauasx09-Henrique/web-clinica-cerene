import Header from "./components/navbar/Header.jsx";
import Hero from "./pages/hero";
import ComoFunciona from "./pages/ComoFunciona";
import Especialidades from "./pages/especialidades";
import Equipe from "./pages/equipe";
import Rodape from "./components/footer/rodape.jsx";
import WhatsAppFlutuante from "./components/WhatsAppFlutuante.jsx";
import "./fluxo.css";

const WHATSAPP = "5561999999999";

const LINKS_MENU = [
  { label: "Início", href: "#inicio" },
  { label: "Como funciona", href: "#como-funciona" },
  { label: "Especialidades", href: "#especialidades" },
  { label: "Equipe", href: "#equipe" },
  { label: "Contato", href: "#contato" },
];

function App() {
  return (
    <>
      <Header
        links={LINKS_MENU}
        agendarHref="#contato"
        whatsappNumero={WHATSAPP}
      />

      <main className="pagina">
        <Hero
          agendarHref="#contato"
          whatsappHref={`https://wa.me/${WHATSAPP}`}
        />
        <ComoFunciona agendarHref="#contato" />
        <Especialidades agendarHref="#contato" />
        <Equipe agendarHref="#contato" />
      </main>

      <Rodape
        agendarHref="#contato"
        whatsappNumero={WHATSAPP}
      />

      <WhatsAppFlutuante numero={WHATSAPP} />
    </>
  );
}

export default App;