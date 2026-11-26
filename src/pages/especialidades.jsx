import { useEffect, useRef, useState } from "react";
import Icon from "../components/icon";
import "./styles/especialidades.css";

const ESPECIALIDADES = [
    {
        id: "fisioterapia",
        foto: "./fotos/especialidades/fisioterapia.webp",
        cor: "amarelo",
        icone: "person-simple-walk",
        titulo: "Fisioterapia",
        texto: "Cuidado  com o desenvolvimento motorde bebês e crianças , promovendo novas conquistas, autonomia e qualidade de vida.",
    },
    {
        id: "fonoaudiologia",
        foto: "./fotos/especialidades/fonoaudiologia.webp",
        cor: "vermelho",
        icone: "chats-circle",
        titulo: "Fonoaudiologia",
        texto: "Apoio à comunicação, à linguagem e à fala, para que a criança se expresse e seja compreendida, alimetação e deglutição.",
    },
    {
        id: "psicologia",
        foto: "./fotos/especialidades/psicologia.webp",
        cor: "ciano",
        icone: "hand-heart",
        titulo: "Psicologia",
        texto: "Acolhimento para a criança e para a família, incluindo o acompanhamento de pessoas com TEA.",
    },
    {
        id: "terapia-ocupacional",
        foto: "./fotos/especialidades/terapia-ocupacional.webp",
        cor: "verde",
        icone: "smiley",
        titulo: "Terapia ocupacional",
        texto: "Atividades que ampliam a autonomia no dia a dia, em casa e na escola.",
    },
    {
        id: "psicopedagogia",
        foto: "./fotos/especialidades/psicopedagogia.webp",
        cor: "amarelo",
        icone: "student",
        titulo: "Psicopedagogia",
        texto: "Estratégias para aprender melhor e apoio à vida escolar, com orientação à família e à escola.",
    },
];

export default function Especialidades({
    itens = ESPECIALIDADES,
    agendarHref = "#contato",
    hrefEspecialidade = (id) => `#especialidades/${id}`,
}) {
    const secaoRef = useRef(null);
    const viewportRef = useRef(null);
    const trilhoRef = useRef(null);
    const barraRef = useRef(null);
    const ativoRef = useRef(0);

    const [ativo, setAtivo] = useState(0);
    const [semFoto, setSemFoto] = useState({});

    useEffect(() => {
        let rafId = 0;

        const atualizarDesktop = () => {
            const secao = secaoRef.current;
            const viewport = viewportRef.current;
            const trilho = trilhoRef.current;
            if (!secao || !viewport || !trilho) return;

            if (window.innerWidth <= 860) {
                trilho.style.transform = "";
                return;
            }

            const rect = secao.getBoundingClientRect();
            const percurso = secao.offsetHeight - window.innerHeight;
            if (percurso <= 0) return;

            const progresso = Math.min(Math.max(-rect.top / percurso, 0), 1);
            const maxDeslocamento = Math.max(0, trilho.scrollWidth - viewport.clientWidth);

            trilho.style.transform = `translate3d(${-progresso * maxDeslocamento}px, 0, 0)`;

            if (barraRef.current) {
                barraRef.current.style.transform = `scaleX(${progresso})`;
            }

            const indice = Math.round(progresso * (itens.length - 1));
            if (indice !== ativoRef.current) {
                ativoRef.current = indice;
                setAtivo(indice);
            }
        };

        const agendarAtualizacao = () => {
            if (rafId) return;
            rafId = window.requestAnimationFrame(() => {
                rafId = 0;
                atualizarDesktop();
            });
        };

        atualizarDesktop();
        window.addEventListener("scroll", agendarAtualizacao, { passive: true });
        window.addEventListener("resize", agendarAtualizacao);

        return () => {
            if (rafId) window.cancelAnimationFrame(rafId);
            window.removeEventListener("scroll", agendarAtualizacao);
            window.removeEventListener("resize", agendarAtualizacao);
        };
    }, [itens.length]);

    const aoRolarMobile = () => {
        if (window.innerWidth > 860) return;
        const viewport = viewportRef.current;
        if (!viewport) return;

        const maxScroll = viewport.scrollWidth - viewport.clientWidth;
        if (maxScroll <= 0) return;

        const progresso = Math.min(Math.max(viewport.scrollLeft / maxScroll, 0), 1);
        if (barraRef.current) {
            barraRef.current.style.transform = `scaleX(${progresso})`;
        }

        const indice = Math.round(progresso * (itens.length - 1));
        if (indice !== ativoRef.current) {
            ativoRef.current = indice;
            setAtivo(indice);
        }
    };

    const irPara = (indice) => {
        const alvoIndice = Math.min(Math.max(indice, 0), itens.length - 1);

        if (window.innerWidth <= 860) {
            const viewport = viewportRef.current;
            if (viewport) {
                viewport.scrollTo({
                    left: alvoIndice * viewport.clientWidth,
                    behavior: "smooth",
                });
            }
            return;
        }

        const secao = secaoRef.current;
        if (!secao) return;

        const topo = secao.getBoundingClientRect().top + window.scrollY;
        const percurso = secao.offsetHeight - window.innerHeight;
        const fracao = itens.length > 1 ? alvoIndice / (itens.length - 1) : 0;

        window.scrollTo({
            top: topo + fracao * percurso,
            behavior: "smooth",
        });
    };

    return (
        <section
            ref={secaoRef}
            className="esp"
            id="especialidades"
            aria-labelledby="esp-titulo"
            style={{ "--total": itens.length }}
        >
            <div className="esp__palco">
                <header className="esp__topo">
                    <h2 id="esp-titulo" className="esp__eyebrow">
                        <span className="esp__fio" aria-hidden="true" />
                        Especialidades
                    </h2>

                    <div className="esp__controles">
                        <span className="esp__contador" aria-live="polite">
                            {String(ativo + 1).padStart(2, "0")} / {String(itens.length).padStart(2, "0")}
                        </span>
                        <div className="esp__setas">
                            <button
                                type="button"
                                className="esp__seta esp__seta--prev"
                                onClick={() => irPara(ativo - 1)}
                                disabled={ativo === 0}
                                aria-label="Especialidade anterior"
                            >
                                <Icon name="arrow-left" />
                            </button>
                            <button
                                type="button"
                                className="esp__seta"
                                onClick={() => irPara(ativo + 1)}
                                disabled={ativo === itens.length - 1}
                                aria-label="Próxima especialidade"
                            >
                                <Icon name="arrow-right" />
                            </button>
                        </div>
                    </div>
                </header>

                <div
                    ref={viewportRef}
                    className="esp__viewport"
                    onScroll={aoRolarMobile}
                >
                    <ul ref={trilhoRef} className="esp__trilho">
                        {itens.map((e, i) => {
                            const aberto = i === ativo;
                            const temFoto = !semFoto[e.id];
                            return (
                                <li
                                    key={e.id}
                                    className={`painel painel--${e.cor} ${aberto ? "painel--ativo" : ""}`}
                                >
                                    {temFoto && (
                                        <>
                                            <img
                                                className="painel__foto"
                                                src={e.foto}
                                                alt={e.titulo}
                                                loading={i === 0 ? "eager" : "lazy"}
                                                onError={() => setSemFoto((s) => ({ ...s, [e.id]: true }))}
                                            />
                                            <span className="painel__veu" aria-hidden="true" />
                                        </>
                                    )}

                                    <div className="painel__corpo">
                                        <div className="painel__conteudo">
                                            <span className="painel__meta">
                                                <span className="painel__ponto" aria-hidden="true" />
                                                <span className="painel__n">
                                                    {String(i + 1).padStart(2, "0")}
                                                </span>
                                            </span>
                                            <h3 className="painel__titulo">{e.titulo}</h3>
                                            <p>{e.texto}</p>
                                            <a
                                                className="painel__link"
                                                href={hrefEspecialidade(e.id)}
                                            >

                                            </a>
                                        </div>
                                    </div>
                                </li>
                            );
                        })}
                    </ul>
                </div>

                <footer className="esp__base">
                    <div className="esp__base-in">
                        <div className="esp__passos" role="tablist" aria-label="Navegar entre especialidades">
                            {itens.map((e, i) => (
                                <button
                                    key={e.id}
                                    type="button"
                                    role="tab"
                                    aria-selected={i === ativo}
                                    className={`esp__passo ${i === ativo ? "is-ativo" : ""}`}
                                    onClick={() => irPara(i)}
                                >
                                    {e.titulo}
                                </button>
                            ))}
                        </div>

                        <a className="esp__agendar" href={agendarHref}>
                            Agendar avaliação
                            <Icon name="arrow-right" />
                        </a>
                    </div>

                    <div className="esp__progresso" aria-hidden="true">
                        <span ref={barraRef} className="esp__progresso-fill" />
                    </div>
                </footer>
            </div>
        </section>
    );
}