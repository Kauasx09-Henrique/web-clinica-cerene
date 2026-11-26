import { useEffect, useState } from "react";
import Icon from "../components/icon.jsx";
import "./styles/hero.css";

const ETAPAS = [
    { n: "01", titulo: "Acolhimento", texto: "Escuta da família", x: 60, y: 470, r: 9, halo: 20 },
    { n: "02", titulo: "Avaliação", texto: "Olhar multidisciplinar", x: 190, y: 380, r: 10, halo: 22 },
    { n: "03", titulo: "Plano individual", texto: "Metas para cada paciente", x: 320, y: 250, r: 12, halo: 25 },
    { n: "04", titulo: "Evolução", texto: "Acompanhamento contínuo", x: 440, y: 90, r: 14, halo: 29 },
];

const DIFERENCIAIS = [
    { icone: "users-three", titulo: "Equipe multidisciplinar", texto: "Todas as terapias em um so lugar" },
    { icone: "hand-heart", titulo: "Acolhimento à família", texto: "Cada etapa explicada com clareza e carinho." },
    { icone: "brain", titulo: "Estudo neurológico", texto: "Método e ciência a serviço do desenvolvimento." },
];

const CURVA_TRILHA = "M 60 470 C 110 440, 140 400, 190 380 S 280 300, 320 250 S 410 150, 440 90";

export default function Hero({
    agendarHref = "#contato",
    whatsappHref = "https://wa.me/55XXXXXXXXXXX",
}) {
    const [etapaAtiva, setEtapaAtiva] = useState(0);
    const [pausado, setPausado] = useState(false);

    useEffect(() => {
        if (pausado) return undefined;

        const inicio = setTimeout(() => {
            setEtapaAtiva((prev) => (prev + 1) % ETAPAS.length);
        }, 2800);

        return () => clearTimeout(inicio);
    }, [etapaAtiva, pausado]);

    return (
        <section className="hero" id="inicio" aria-labelledby="hero-titulo">
            <div className="hero__grade" aria-hidden="true" />

            <div className="hero__in">
                <div className="hero__texto">
                    <p className="hero__eyebrow">
                        <span className="hero__fio" aria-hidden="true" />
                        Centro de reabilitação e estudo neurológico
                    </p>

                    <h1 id="hero-titulo" className="hero__titulo">
                        <span className="l"><span>Cada passo</span></span>
                        <span className="l"><span>é uma <em>conquista</em>.</span></span>
                    </h1>

                    <p className="hero__destaque">
                        Acolhemos a criança e a família em todas as etapas do
                        desenvolvimento, com ciência, método e atenção a cada detalhe.
                    </p>

                    <div className="hero__acoes">
                        <a className="hero__btn" href={agendarHref}>
                            Agendar avaliação
                            <span className="hero__btn-seta" aria-hidden="true">
                                <Icon name="arrow-right" />
                            </span>
                        </a>
                        <a className="hero__link" href={whatsappHref} target="_blank" rel="noopener noreferrer">
                            <Icon name="whatsapp-logo" />
                            Falar no WhatsApp
                        </a>
                    </div>
                </div>

                <div
                    className="trilha"
                    onMouseEnter={() => setPausado(true)}
                    onMouseLeave={() => setPausado(false)}
                >
                    <svg className="trilha__svg" viewBox="0 0 500 560" aria-hidden="true">
                        <circle className="trilha__anel trilha__anel--1" cx="470" cy="70" r="210" />
                        <circle className="trilha__anel trilha__anel--2" cx="470" cy="70" r="320" />

                        <line className="trilha__eixo" x1="36" y1="528" x2="464" y2="528" />

                        {ETAPAS.map((e, i) => (
                            <line
                                key={`guia-${e.n}`}
                                className={`trilha__guia trilha__guia--${i + 1} ${etapaAtiva === i ? "is-ativa" : ""}`}
                                x1={e.x}
                                y1={e.y}
                                x2={e.x}
                                y2="528"
                            />
                        ))}

                        <path className="trilha__base" d={CURVA_TRILHA} />
                        <path className="trilha__linha" pathLength="1" d={CURVA_TRILHA} />
                        <path className="trilha__fluxo" pathLength="1" d={CURVA_TRILHA} />

                        {ETAPAS.map((e, i) => (
                            <g
                                key={`no-${e.n}`}
                                className={`no no--${i + 1} ${etapaAtiva === i ? "is-ativa" : ""}`}
                                onMouseEnter={() => setEtapaAtiva(i)}
                                onClick={() => setEtapaAtiva(i)}
                            >
                                <circle className="no__onda" cx={e.x} cy={e.y} r={e.halo} />
                                <circle className="no__halo" cx={e.x} cy={e.y} r={e.halo} />
                                <circle className="no__nucleo" cx={e.x} cy={e.y} r={e.r} />
                            </g>
                        ))}
                    </svg>

                    <ol className="trilha__etapas">
                        {ETAPAS.map((e, i) => (
                            <li
                                key={e.n}
                                className={`etapa etapa--${i + 1} ${etapaAtiva === i ? "is-ativa" : ""}`}
                                onMouseEnter={() => setEtapaAtiva(i)}
                                onClick={() => setEtapaAtiva(i)}
                            >
                                <span className="etapa__n">{e.n}</span>
                                <strong>{e.titulo}</strong>
                                <small>{e.texto}</small>
                            </li>
                        ))}
                    </ol>
                </div>
            </div>

            <div className="hero__base">
                <ul className="hero__diferenciais">
                    {DIFERENCIAIS.map((d, i) => (
                        <li key={d.titulo} style={{ "--ordem": i }}>
                            <Icon name={d.icone} />
                            <span>
                                <strong>{d.titulo}</strong>
                                {d.texto}
                            </span>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
}