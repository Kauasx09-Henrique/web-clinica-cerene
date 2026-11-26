import { useEffect, useRef, useState } from "react";
import "./styles/como-funciona.css";

const W = 1000;
const H = 2400;

const ETAPAS = [
    {
        id: "agendamento",
        cor: "verde",
        titulo: "Agendamento",
        texto: "Você fala com a nossa equipe pelo WhatsApp ou pelo telefone e escolhe o melhor horário para a primeira conversa.",
    },
    {
        id: "avaliacao",
        cor: "amarelo",
        titulo: "Avaliação inicial",
        texto: "Escutamos a família e observamos o desenvolvimento com calma, para entender as necessidades de cada paciente.",
    },
    {
        id: "plano",
        cor: "vermelho",
        titulo: "Plano individual",
        texto: "Elaborado especificamente para cada criança, considerando suas necessidades, seu diagnóstico, suas habilidades motoras, suas dificuldades e, principalmente, seu potencial de desenvolvimento.",
    },
    {
        id: "acompanhamento",
        cor: "ciano",
        titulo: "Acompanhamento",
        texto: "Acompanhamos cada passo, revisamos o plano quando necessário e mantemos a família sempre por dentro da evolução.",
    },
];

const PARADAS = [
    { x: 300, y: 300, cx1: 338, cx2: 408 },
    { x: 700, y: 900, cx1: 662, cx2: 592 },
    { x: 300, y: 1500, cx1: 338, cx2: 408 },
    { x: 700, y: 2100, cx1: 662, cx2: 592 },
];

const TRECHOS = [
    { cor: "verde", d: "M 500 0 C 500 130, 300 130, 300 300" },
    { cor: "amarelo", d: "M 300 300 C 300 600, 700 600, 700 900" },
    { cor: "vermelho", d: "M 700 900 C 700 1200, 300 1200, 300 1500" },
    { cor: "ciano", d: "M 300 1500 C 300 1800, 700 1800, 700 2100" },
    { cor: "ciano", d: "M 700 2100 C 700 2250, 500 2250, 500 2400" },
];

export default function ComoFunciona({
    etapas = ETAPAS,
    agendarHref = "#contato",
}) {
    const [alcancadas, setAlcancadas] = useState(0);
    const [finalAtivo, setFinalAtivo] = useState(false);

    const trilhoRef = useRef(null);
    const desenhoRef = useRef([]);
    const bolinhaRef = useRef(null);
    const cartoesRef = useRef([]);
    const alcancadasRef = useRef(0);
    const finalRef = useRef(false);

    useEffect(() => {
        const tr = trilhoRef.current;
        if (!tr) return;

        const reduz = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        const pecas = desenhoRef.current.filter(Boolean);
        if (!pecas.length) return;

        const lens = pecas.map((p) => p.getTotalLength());
        const cum = [];
        lens.reduce((acc, l, i) => ((cum[i] = acc), acc + l), 0);
        const total = lens.reduce((a, b) => a + b, 0);

        pecas.forEach((p, i) => {
            p.style.strokeDasharray = lens[i];
            p.style.strokeDashoffset = reduz ? 0 : lens[i];
        });

        if (reduz) {
            setAlcancadas(PARADAS.length);
            setFinalAtivo(true);
            return;
        }

        const pontoEm = (s) => {
            let i = 0;
            while (i < pecas.length - 1 && s > cum[i] + lens[i]) i++;
            return {
                pt: pecas[i].getPointAtLength(Math.min(lens[i], Math.max(0, s - cum[i]))),
                trecho: i,
            };
        };

        const calcularAlvo = () => {
            const vh = window.innerHeight;
            const r = tr.getBoundingClientRect();
            return Math.min(1, Math.max(0, (vh * 0.56 - r.top) / r.height));
        };

        let alvo = calcularAlvo();
        let atual = alvo;
        let raf = 0;

        const renderizar = (frac) => {
            const vh = window.innerHeight;
            tr.style.setProperty("--p", frac.toFixed(4));

            const svg = pecas[0].ownerSVGElement;
            const desktop = svg && window.getComputedStyle(svg).display !== "none";

            if (desktop) {
                const yAlvo = frac * H;
                let lo = 0;
                let hi = total;
                for (let k = 0; k < 16; k++) {
                    const mid = (lo + hi) / 2;
                    if (pontoEm(mid).pt.y < yAlvo) lo = mid;
                    else hi = mid;
                }
                const s = lo;

                pecas.forEach((p, i) => {
                    const desenhado = Math.min(lens[i], Math.max(0, s - cum[i]));
                    p.style.strokeDashoffset = lens[i] - desenhado;
                });

                const { pt, trecho } = pontoEm(s);
                if (bolinhaRef.current) {
                    bolinhaRef.current.setAttribute("transform", `translate(${pt.x} ${pt.y})`);
                    bolinhaRef.current.dataset.cor = TRECHOS[trecho].cor;
                    bolinhaRef.current.style.opacity = frac > 0.005 && frac < 0.995 ? 1 : 0;
                }

                let passou = 0;
                PARADAS.forEach((_, i) => {
                    if (s >= cum[i] + lens[i] - 4) passou = i + 1;
                });

                if (passou !== alcancadasRef.current) {
                    alcancadasRef.current = passou;
                    setAlcancadas(passou);
                }

                const chegouFinal = frac >= 0.94;
                if (chegouFinal !== finalRef.current) {
                    finalRef.current = chegouFinal;
                    setFinalAtivo(chegouFinal);
                }
            } else {
                let passou = 0;
                cartoesRef.current.forEach((c, i) => {
                    if (c && c.getBoundingClientRect().top < vh * 0.68) passou = i + 1;
                });

                if (passou !== alcancadasRef.current) {
                    alcancadasRef.current = passou;
                    setAlcancadas(passou);
                }

                const chegouFinal = passou === etapas.length;
                if (chegouFinal !== finalRef.current) {
                    finalRef.current = chegouFinal;
                    setFinalAtivo(chegouFinal);
                }
            }
        };

        const animar = () => {
            const diff = alvo - atual;
            if (Math.abs(diff) < 0.0004) {
                atual = alvo;
                renderizar(atual);
                raf = 0;
                return;
            }
            atual += diff * 0.12;
            renderizar(atual);
            raf = requestAnimationFrame(animar);
        };

        const onScroll = () => {
            alvo = calcularAlvo();
            if (!raf) raf = requestAnimationFrame(animar);
        };

        renderizar(atual);
        window.addEventListener("scroll", onScroll, { passive: true });
        window.addEventListener("resize", onScroll);
        if (document.fonts && document.fonts.ready) {
            document.fonts.ready.then(onScroll);
        }

        return () => {
            window.removeEventListener("scroll", onScroll);
            window.removeEventListener("resize", onScroll);
            if (raf) cancelAnimationFrame(raf);
        };
    }, [etapas.length]);

    const irParaEtapa = (indice) => {
        const cartao = cartoesRef.current[indice];
        if (!cartao) return;
        const rect = cartao.getBoundingClientRect();
        const destino = rect.top + window.scrollY - window.innerHeight * 0.42;
        window.scrollTo({ top: destino, behavior: "smooth" });
    };

    return (
        <section className="cf" id="como-funciona" aria-labelledby="cf-titulo">
            <div className="cf__in">
                <header className="cf__topo">
                    <p className="cf__eyebrow">
                        <span className="cf__fio" aria-hidden="true" />
                        Como funciona
                        <span className="cf__fio" aria-hidden="true" />
                    </p>
                    <h2 id="cf-titulo" className="cf__titulo">
                        Da primeira conversa ao <em>acompanhamento</em>
                    </h2>
                    <p className="cf__intro">
                        Um caminho claro, em quatro etapas, para que a família saiba
                        sempre o que vem a seguir.
                    </p>
                </header>

                <div ref={trilhoRef} className="cf__trilho">
                    <svg
                        className="cf__svg"
                        viewBox={`0 0 ${W} ${H}`}
                        aria-hidden="true"
                        focusable="false"
                    >
                        {TRECHOS.map((t, i) => (
                            <path key={`s${i}`} className="cf__trilho-sombra" d={t.d} />
                        ))}

                        {TRECHOS.map((t, i) => (
                            <path key={`b${i}`} className="cf__base" d={t.d} />
                        ))}

                        {TRECHOS.map((t, i) => (
                            <path
                                key={`d${i}`}
                                ref={(el) => (desenhoRef.current[i] = el)}
                                className={`cf__tinta cf__tinta--${t.cor}`}
                                d={t.d}
                            />
                        ))}

                        {PARADAS.map((p, i) => (
                            <line
                                key={`c${i}`}
                                className={`cf__conector cf__conector--${etapas[i].cor} ${i < alcancadas ? "cf__conector--on" : ""}`}
                                x1={p.cx1}
                                y1={p.y}
                                x2={p.cx2}
                                y2={p.y}
                                pathLength="1"
                            />
                        ))}

                        {PARADAS.map((p, i) => {
                            const on = i < alcancadas;
                            const atual = i === alcancadas - 1;
                            return (
                                <g
                                    key={i}
                                    className={`parada parada--${etapas[i].cor} ${on ? "parada--on" : ""} ${atual ? "parada--atual" : ""}`}
                                    transform={`translate(${p.x} ${p.y})`}
                                    onClick={() => irParaEtapa(i)}
                                >
                                    <circle className="parada__pulso" r="40" />
                                    <circle className="parada__onda" r="40" />
                                    <circle className="parada__fundo" r="40" />
                                    <circle className="parada__cor" r="36" />
                                    <text className="parada__n" textAnchor="middle" dominantBaseline="central">
                                        {String(i + 1).padStart(2, "0")}
                                    </text>
                                </g>
                            );
                        })}

                        <g
                            ref={bolinhaRef}
                            className="cf__marca"
                            data-cor="verde"
                            transform="translate(500 0)"
                        >
                            <circle className="cf__marca-onda" r="16" />
                            <circle className="cf__marca-anel" r="20" />
                            <circle className="cf__marca-ponto" r="12" />
                        </g>
                    </svg>

                    <ol className="cf__cartoes">
                        {etapas.map((e, i) => {
                            const on = i < alcancadas;
                            const atual = i === alcancadas - 1;
                            return (
                                <li
                                    key={e.id}
                                    ref={(el) => (cartoesRef.current[i] = el)}
                                    className={`cartao cartao--${e.cor} ${i % 2 === 0 ? "cartao--dir" : "cartao--esq"} ${on ? "cartao--on" : ""} ${atual ? "cartao--atual" : ""}`}
                                    style={{ "--y": `${(PARADAS[i].y / H) * 100}%` }}
                                >
                                    <span className="cartao__numero" aria-hidden="true">
                                        {String(i + 1).padStart(2, "0")}
                                    </span>
                                    <div className="cartao__topo">
                                        <span className="cartao__tag">
                                            <span className="cartao__ponto" aria-hidden="true" />
                                            Etapa {i + 1} de {etapas.length}
                                        </span>
                                    </div>
                                    <h3 className="cartao__titulo">{e.titulo}</h3>
                                    <p className="cartao__texto">{e.texto}</p>
                                </li>
                            );
                        })}
                    </ol>
                </div>

                <div className={`final ${finalAtivo ? "final--on" : ""}`}>
                    <div className="final__faixa" aria-hidden="true">
                        <span className="final__faixa-item final__faixa-item--verde" />
                        <span className="final__faixa-item final__faixa-item--amarelo" />
                        <span className="final__faixa-item final__faixa-item--vermelho" />
                        <span className="final__faixa-item final__faixa-item--ciano" />
                    </div>
                    <span className="final__forma final__forma--1" aria-hidden="true" />
                    <span className="final__forma final__forma--2" aria-hidden="true" />
                    <h3 className="final__titulo">
                        Pronto para o <em>primeiro passo</em>?
                    </h3>
                    <p className="final__texto">
                        Fale com a nossa equipe e agende a avaliação. Estamos aqui para
                        acolher você e sua família.
                    </p>
                    <a className="cf__btn" href={agendarHref}>
                        Agendar avaliação
                        <span className="cf__btn-seta" aria-hidden="true">→</span>
                    </a>
                </div>
            </div>
        </section>
    );
}