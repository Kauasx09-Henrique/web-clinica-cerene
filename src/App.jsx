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

const WHATSAPP = "5561999999999";

const DADOS_CLINICA = {
  endereco: "Endereço completo da Clínica Cerene",
  cidade: "Brasília — DF",
  horario: "Segunda a sexta, das 7h às 19h",
  telefone: "(61) 0000-0000",
};

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
          endereco={DADOS_CLINICA.endereco}
          cidade={DADOS_CLINICA.cidade}
          horario={DADOS_CLINICA.horario}
          telefone={DADOS_CLINICA.telefone}
        />
      </main>

      <Rodape
        agendarHref="#contato"
        whatsappNumero={WHATSAPP}
        endereco={`${DADOS_CLINICA.endereco}, ${DADOS_CLINICA.cidade}`}
        horario={DADOS_CLINICA.horario}
        telefone={DADOS_CLINICA.telefone}
      />

      <WhatsAppFlutuante numero={WHATSAPP} />
      <SpeedInsights />
    </>
  );
}

export default App;