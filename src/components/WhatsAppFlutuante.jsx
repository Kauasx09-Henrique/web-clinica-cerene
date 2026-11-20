import { useEffect, useState } from "react";
import "./whatsapp.css";

/*
  Botão flutuante do WhatsApp — Clínica Cerene
  Coloque UMA vez no layout raiz do site (App.jsx / layout), fora das seções,
  para aparecer em todas as páginas:

    <WhatsAppFlutuante numero="5561999999999" />

  `numero`: código do país + DDD + número, só dígitos (ex.: 5561999999999).
*/

const ICONE_WHATS =
  "M187.58,144.84l-32-16a8,8,0,0,0-8,.5l-14.69,9.8a40.55,40.55,0,0,1-16-16l9.8-14.69a8,8,0,0,0,.5-8l-16-32A8,8,0,0,0,104,64a40,40,0,0,0-40,40,88.1,88.1,0,0,0,88,88,40,40,0,0,0,40-40A8,8,0,0,0,187.58,144.84ZM152,176a72.08,72.08,0,0,1-72-72A24,24,0,0,1,99.29,80.46l11.48,23L101,118a8,8,0,0,0-.73,7.51,56.47,56.47,0,0,0,30.15,30.15A8,8,0,0,0,138,155l14.61-9.74,23,11.48A24,24,0,0,1,152,176ZM128,24A104,104,0,0,0,36.18,176.88L24.83,210.93a16,16,0,0,0,20.24,20.24l34.05-11.35A104,104,0,1,0,128,24Zm0,192a87.87,87.87,0,0,1-44.06-11.81,8,8,0,0,0-6.54-.67L40,216,52.47,178.6a8,8,0,0,0-.66-6.54A88,88,0,1,1,128,216Z";

export default function WhatsAppFlutuante({
  numero = "55XXXXXXXXXXX", // [SEU NÚMERO]
  mensagem = "Olá! Gostaria de agendar uma avaliação na Clínica Cerene.",
  rotulo = "Falar no WhatsApp",
  balao = "Olá! Podemos ajudar?",
}) {
  const [visivel, setVisivel] = useState(false);
  const [mostrarBalao, setMostrarBalao] = useState(false);
  const [dispensado, setDispensado] = useState(false);

  // entra depois de um instante; o balão aparece uma vez e some sozinho
  useEffect(() => {
    const t1 = setTimeout(() => setVisivel(true), 1200);
    const t2 = setTimeout(() => setMostrarBalao(true), 4500);
    const t3 = setTimeout(() => setMostrarBalao(false), 11000);
    return () => [t1, t2, t3].forEach(clearTimeout);
  }, []);

  const href = `https://wa.me/${numero}?text=${encodeURIComponent(mensagem)}`;
  const balaoAberto = mostrarBalao && !dispensado;

  return (
    <div className={`wa ${visivel ? "wa--on" : ""}`}>
      {balaoAberto && (
        <div className="wa__balao" role="status">
          <span>{balao}</span>
          <button
            type="button"
            className="wa__fechar"
            aria-label="Fechar mensagem"
            onClick={() => setDispensado(true)}
          >
            ×
          </button>
        </div>
      )}

      <a
        className="wa__botao"
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${rotulo} (abre em nova aba)`}
        onClick={() => setDispensado(true)}
      >
        <span className="wa__onda" aria-hidden="true" />
        <span className="wa__icone" aria-hidden="true">
          <svg viewBox="0 0 256 256" fill="currentColor" focusable="false">
            <path d={ICONE_WHATS} />
          </svg>
        </span>
        <span className="wa__texto">{rotulo}</span>
      </a>
    </div>
  );
}
