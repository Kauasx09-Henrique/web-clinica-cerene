import Header from "./components/navbar/Header.jsx";
import Rodape from "./components/footer/rodape.jsx";
import WhatsAppFlutuante from "./components/WhatsAppFlutuante.jsx";
import Hero from "./pages/hero";
import ComoFunciona from "./pages/ComoFunciona";
import Especialidades from "./pages/especialidades";
import Equipe from "./pages/equipe";
import VideoClinica from "./pages/VideoClinica.jsx";
import EspacoLocalizacao from "./pages/EspacoLocalizacao.jsx";
import { SpeedInsights } from "@vercel/speed-insights/react"
import "./fluxo.css";

const WHATSAPP = "5561983632530";


const LINKS_MENU = [
  { label: "Início", href: "#inicio" },
  { label: "Como funciona", href: "#como-funciona" },
  { label: "Especialidades", href: "#especialidades" },
  { label: "Equipe", href: "#equipe" },
  { label: "A clínica", href: "#clinica" },
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
        <VideoClinica videoSrc="video/video-clinica.MOV" />
        <EspacoLocalizacao
          endereco={Rodape.endereco}
          cidade={Rodape.cidade}
          horario={Rodape.horario}
          telefone={Rodape.telefone}
        />
      </main>

      <Rodape
        agendarHref="#contato"
        whatsappNumero={WHATSAPP}

        horario={Rodape.horario}
        telefone={Rodape.telefone}
      />

      <WhatsAppFlutuante numero={WHATSAPP} />
      <SpeedInsights />
    </>
  );
}

export default App;