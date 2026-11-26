import { useEffect, useMemo, useRef, useState } from "react";
import {
    AnimatePresence,
    MotionConfig,
    motion,
    useScroll,
    useTransform,
} from "framer-motion";
import "./styles/equipe.css";

const ORDEM_CATEGORIAS = [
    "Terapia Ocupacional",
    "Fisioterapia",
    "Fonoaudiologia",
    "Psicopedagogia",
    "Atendimento",
];

const EQUIPE = [
    {
        id: "monica-lemos",
        nome: "Monica Lemos",
        categoria: "Terapia Ocupacional",
        funcao: "Terapeuta ocupacional · Sócia-proprietária",
        registro: "CREFITO-11 00000",
        cor: "verde",
        status: "ativo",
        destaque: true,
        foto: "fotos/equipe/monica.jpg",
        frase: "Atuação no desenvolvimento infantil, com foco na integração sensorial, saúde perinatal e promoção do desenvolvimento e da autonomia da criança.",
        formacao: "Graduada em Terapia Ocupacional pela FCMMG (1993). Especialista em Saúde Perinatal, Desenvolvimento e Educação do Bebê pela UnB. Possui formações em Bobath Básico Pediátrico e Baby Avançado, Integração Sensorial de Ayres®, Integração Sensorial pela USC WPS e Advanced Intensive Mentorship – Level 1 (Star Institute). Treinamento nas escalas AIMS, TIMP, Denver, Bayley e HINE.",
    },
    {
        id: "leticia-dornelas",
        nome: "Letícia Dornelas",
        categoria: "Terapia Ocupacional",
        funcao: "Terapeuta ocupacional",
        registro: "CREFITO-11 19866-TO",
        cor: "verde",
        status: "ativo",
        foto: "fotos/equipe/leticia.jpg",
        frase: "Atuação no desenvolvimento infantil, com foco na integração sensorial, aprendizagem, seletividade alimentar e habilidades necessárias para a autonomia da criança.",
        formacao: "Graduada em Terapia Ocupacional pela Universidade de Brasília (UnB), em 2017. Pós-graduada em Transtorno do Espectro Autista (TEA). Possui Certificação Internacional em Integração Sensorial de Ayres pela CLASI, formação internacional em avaliação e intervenção no ensino e aprendizagem da escrita, habilitação em avaliação e intervenção em seletividade alimentar e formação em avaliação e tratamento do processamento visual, percepção visual e habilidades motoras visuais.",
    },
    {
        id: "tiago-leles",
        nome: "Tiago Leles",
        categoria: "Terapia Ocupacional",
        funcao: "Terapeuta ocupacional",
        registro: "CREFITO-11 00000",
        cor: "verde",
        status: "ativo",
        foto: "fotos/equipe/tiago.jpg",
        frase: "Atuação no desenvolvimento infantil, com foco na integração sensorial, no contexto escolar e na promoção da autonomia e participação da criança.",
        formacao: "Graduado em Terapia Ocupacional pela Universidade de Brasília (UnB), em fevereiro de 2017. Especialista Profissional em Terapia Ocupacional no Contexto Escolar pelo COFFITO. Possui Certificação Internacional em Integração Sensorial de Ayres (CLASI), habilitação no Conceito Neuroevolutivo Bobath Infantil (ABDAN) e no Curso Avançado de Bebês (Bobath Baby).",
    },
    {
        id: "luiza",
        nome: "Luiza",
        categoria: "Terapia Ocupacional",
        funcao: "Terapeuta ocupacional",
        registro: "CREFITO-11 00000",
        cor: "verde",
        status: "inativo",
        foto: "",
        frase: "Atuação voltada para a autonomia e o desenvolvimento funcional da criança no dia a dia.",
        formacao: "Formação em atualização.",
    },
    {
        id: "raquel-aboudib",
        nome: "Raquel Aboudib",
        categoria: "Fisioterapia",
        funcao: "Fisioterapeuta · Sócia-proprietária",
        registro: "CREFITO-23566",
        cor: "azul",
        status: "ativo",
        destaque: true,
        foto: "fotos/equipe/raquel.jpg",
        frase: "Atuação em fisioterapia pediátrica e reabilitação neurofuncional.",
        formacao: "Formação em atualização.",
    },
    {
        id: "barbara",
        nome: "Barbara",
        categoria: "Fisioterapia",
        funcao: "Fisioterapeuta",
        registro: "CREFITO-11 00000",
        cor: "azul",
        status: "ativo",
        foto: "fotos/equipe/barbara.jpg",
        frase: "Atuação especializada em neuropediatria, com foco na reabilitação neurofuncional e no desenvolvimento motor de crianças e adolescentes.",
        formacao: "Graduada em Fisioterapia desde 2014, atua na área de neuropediatria desde 2016. Especialista em Fisioterapia Neurofuncional na Criança e no Adolescente. Possui formações nos métodos Bobath, TheraSuit e RTA.",
    },
    {
        id: "raquel-pires",
        nome: "Raquel Pires",
        categoria: "Fisioterapia",
        funcao: "Fisioterapeuta",
        registro: "CREFITO-11 00000",
        cor: "azul",
        status: "ativo",
        foto: "fotos/equipe/pires.jpg",
        frase: "Reabilitação neuromotora infantil com abordagens terapêuticas individualizadas, promovendo o desenvolvimento, a funcionalidade e a qualidade de vida das crianças.",
        formacao: "Graduada em Fisioterapia pela Universidade Católica de Brasília (UCB), em 2010. Pós-graduada em Reabilitação Neurofuncional. Atua em neuropediatria desde 2011, com experiência na reabilitação de crianças com alterações neuromotoras. Possui formações em Bobath Pediátrico e Baby Avançado, CME I, RTA, TASES, TheraTogs, tDCS e abordagem em Mielomeningocele.",
    },
    {
        id: "lourrane",
        nome: "Lourrane",
        categoria: "Fisioterapia",
        funcao: "Fisioterapeuta",
        registro: "CREFITO-11 00000",
        cor: "azul",
        status: "ativo",
        foto: "fotos/equipe/lourrane.jpg",
        frase: "Atuação especializada em fisioterapia pediátrica e neurofuncional, promovendo o desenvolvimento motor, a funcionalidade e a autonomia de crianças e adolescentes.",
        formacao: "Graduada em Fisioterapia pela Universidade de Brasília (UnB), com 9 anos de formação. Mestre em Ciências e Tecnologias da Saúde pela UnB. Pós-graduada em Fisioterapia Pediátrica e Especialista em Fisioterapia Neurofuncional da Criança e do Adolescente pelo COFFITO. Habilitada no Conceito Neuroevolutivo Bobath, com formação em TheraSuit (Avançado), RTA, entre outros métodos terapêuticos.",
    },
    {
        id: "carla-marina-tome-mendes",
        nome: "Carla Marina Tomé Mendes",
        categoria: "Fonoaudiologia",
        funcao: "Fonoaudióloga",
        registro: "CRFa 5-00000",
        cor: "vermelho",
        status: "ativo",
        foto: "fotos/equipe/carla.jpg",
        frase: "Atuação no desenvolvimento das funções oromotoras, linguagem e alimentação infantil, promovendo mais autonomia e qualidade de vida para as crianças.",
        formacao: "Graduada em Fonoaudiologia pela UNIPLAN/DF (2009), com pós-graduação em Motricidade Oral com enfoque em Disfagia. Possui formações em Motricidade Oral no Período Neonatal e Disfagia Infantil, Conceito Bobath aplicado às funções oromotoras e à alimentação infantil, Abordagem Integrativa para o Desenvolvimento Alimentar Infantil, Laserterapia aplicada à Fonoaudiologia e Método Therapy Taping – Estimulação Tegumentar.",
    },
    {
        id: "tatiana",
        nome: "Tatiana",
        categoria: "Fonoaudiologia",
        funcao: "Fonoaudióloga",
        registro: "CRFa 5-00000",
        cor: "vermelho",
        status: "inativo",
        foto: "",
        frase: "Apoio à comunicação, à linguagem e à fala infantil.",
        formacao: "Formação em atualização.",
    },
    {
        id: "paula",
        nome: "Paula",
        categoria: "Psicopedagogia",
        funcao: "Psicopedagoga",
        registro: "ABPp 00000",
        cor: "amarelo",
        status: "inativo",
        foto: "",
        frase: "Estratégias de aprendizagem e acompanhamento junto à família e à escola.",
        formacao: "Formação em atualização.",
    },
    {
        id: "silvia",
        nome: "Silvia",
        categoria: "Atendimento",
        funcao: "Secretária",
        registro: "Recepção e agendamentos",
        cor: "ciano",
        status: "inativo",
        foto: "",
        frase: "Primeiro acolhimento às famílias, agendamentos e organização da rotina da clínica.",
        formacao: "Atendimento humanizado às famílias da Clínica Cerene.",
    },
];

const EASE = [0.22, 1, 0.36, 1];
const TEMPO_TROCA = 7500;

function iniciais(nome) {
    return nome
        .replace(/^(Dr\.|Dra\.)\s*/i, "")
        .split(" ")
        .filter(Boolean)
        .slice(0, 2)
        .map((p) => p[0])
        .join("")
        .toUpperCase();
}

function Seta({ invertida = false }) {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={invertida ? { transform: "rotate(180deg)" } : undefined}
            aria-hidden="true"
        >
            <path d="M4 12h16" />
            <path d="m14 6 6 6-6 6" />
        </svg>
    );
}

const laminaVariants = {
    enter: (dir) => ({
        clipPath: dir >= 0 ? "inset(0% 0% 0% 100%)" : "inset(0% 100% 0% 0%)",
        zIndex: 2,
    }),
    center: {
        clipPath: "inset(0% 0% 0% 0%)",
        zIndex: 2,
        transition: { duration: 0.85, ease: EASE },
    },
    exit: {
        clipPath: "inset(0% 0% 0% 0%)",
        zIndex: 1,
        transition: { duration: 0.85, ease: EASE },
    },
};

export default function Equipe({
    profissionais = EQUIPE,
}) {
    const secaoRef = useRef(null);
    const [estado, setEstado] = useState({ catIdx: 0, profIdx: 0, direcao: 1 });
    const [pausado, setPausado] = useState(false);
    const [semFoto, setSemFoto] = useState({});

    const grupos = useMemo(() => {
        const ativos = profissionais.filter((p) => p.status === "ativo");
        const mapa = new Map();

        ativos.forEach((p) => {
            const cat = p.categoria || "Equipe";
            if (!mapa.has(cat)) mapa.set(cat, []);
            mapa.get(cat).push(p);
        });

        const nomesOrdenados = [
            ...ORDEM_CATEGORIAS.filter((c) => mapa.has(c)),
            ...[...mapa.keys()].filter((c) => !ORDEM_CATEGORIAS.includes(c)),
        ];

        return nomesOrdenados.map((nome) => {
            const itensOrdenados = [...mapa.get(nome)].sort(
                (a, b) => Number(Boolean(b.destaque)) - Number(Boolean(a.destaque))
            );

            return {
                nome,
                cor: itensOrdenados[0].cor || "verde",
                itens: itensOrdenados,
            };
        });
    }, [profissionais]);

    const { scrollYProgress } = useScroll({
        target: secaoRef,
        offset: ["start end", "end start"],
    });

    const parallaxY = useTransform(scrollYProgress, [0, 1], [-24, 24]);

    const totalCategorias = grupos.length;
    const catSegura = totalCategorias > 0 ? estado.catIdx % totalCategorias : 0;
    const grupoAtual = grupos[catSegura];
    const itensCategoria = grupoAtual ? grupoAtual.itens : [];
    const totalCategoria = itensCategoria.length;
    const profSeguro = totalCategoria > 0 ? Math.min(estado.profIdx, totalCategoria - 1) : 0;
    const atual = itensCategoria[profSeguro];

    const podeAvancar = totalCategorias > 1 || totalCategoria > 1;

    useEffect(() => {
        if (pausado || !podeAvancar || !grupoAtual) return undefined;

        const timer = setTimeout(() => {
            setEstado((prev) => {
                const c = prev.catIdx % grupos.length;
                const lista = grupos[c].itens;
                if (prev.profIdx + 1 < lista.length) {
                    return { catIdx: c, profIdx: prev.profIdx + 1, direcao: 1 };
                }
                return {
                    catIdx: (c + 1) % grupos.length,
                    profIdx: 0,
                    direcao: 1,
                };
            });
        }, TEMPO_TROCA);

        return () => clearTimeout(timer);
    }, [estado, pausado, podeAvancar, grupoAtual, grupos]);

    if (!atual) {
        return <section ref={secaoRef} id="equipe" hidden />;
    }

    const selecionarCategoria = (novaCatIdx) => {
        if (novaCatIdx === catSegura) return;
        setEstado({
            catIdx: novaCatIdx,
            profIdx: 0,
            direcao: novaCatIdx > catSegura ? 1 : -1,
        });
    };

    const selecionarProfissional = (novoProfIdx) => {
        if (novoProfIdx === profSeguro) return;
        setEstado({
            catIdx: catSegura,
            profIdx: novoProfIdx,
            direcao: novoProfIdx > profSeguro ? 1 : -1,
        });
    };

    const proximo = () => {
        if (profSeguro + 1 < totalCategoria) {
            setEstado({ catIdx: catSegura, profIdx: profSeguro + 1, direcao: 1 });
        } else {
            setEstado({
                catIdx: (catSegura + 1) % totalCategorias,
                profIdx: 0,
                direcao: 1,
            });
        }
    };

    const anterior = () => {
        if (profSeguro > 0) {
            setEstado({ catIdx: catSegura, profIdx: profSeguro - 1, direcao: -1 });
        } else {
            const catAnterior = (catSegura - 1 + totalCategorias) % totalCategorias;
            setEstado({
                catIdx: catAnterior,
                profIdx: grupos[catAnterior].itens.length - 1,
                direcao: -1,
            });
        }
    };

    const aoDeslizar = (_, info) => {
        if (info.offset.x < -45 || info.velocity.x < -280) {
            proximo();
        } else if (info.offset.x > 45 || info.velocity.x > 280) {
            anterior();
        }
    };

    const marcarSemFoto = (id) => {
        setSemFoto((prev) => ({ ...prev, [id]: true }));
    };

    return (
        <MotionConfig reducedMotion="user">
            <section
                ref={secaoRef}
                className={`eq eq--${atual.cor}`}
                id="equipe"
                aria-labelledby="eq-titulo"
                onMouseEnter={() => setPausado(true)}
                onMouseLeave={() => setPausado(false)}
                onFocusCapture={() => setPausado(true)}
                onBlurCapture={() => setPausado(false)}
            >
                <div className="eq__in">
                    <div className="eq__barra-topo">
                        <h2 id="eq-titulo" className="eq__eyebrow">
                            <span className="eq__fio" aria-hidden="true" />
                            Equipe
                        </h2>

                        <nav className="eq__cats" aria-label="Áreas da equipe" role="tablist">
                            {grupos.map((grupo, idx) => {
                                const ativa = idx === catSegura;
                                return (
                                    <button
                                        key={grupo.nome}
                                        type="button"
                                        role="tab"
                                        aria-selected={ativa}
                                        className={`eq-cat ${ativa ? "is-ativa" : ""}`}
                                        onClick={() => selecionarCategoria(idx)}
                                    >
                                        <span className="eq-cat__nome">{grupo.nome}</span>
                                        <sup className="eq-cat__qtd">
                                            {String(grupo.itens.length).padStart(2, "0")}
                                        </sup>
                                        {ativa && (
                                            <motion.span
                                                layoutId="eq-cat-linha"
                                                className="eq-cat__linha"
                                                transition={{
                                                    type: "spring",
                                                    stiffness: 380,
                                                    damping: 34,
                                                }}
                                            />
                                        )}
                                    </button>
                                );
                            })}
                        </nav>
                    </div>

                    <div className="eq__monografia">
                        <div className="eq__retrato-col">
                            <motion.div
                                className="eq__quadro"
                                onPanEnd={aoDeslizar}
                                initial={{ opacity: 0, y: 24 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.2 }}
                                transition={{ duration: 0.85, ease: EASE }}
                            >
                                <AnimatePresence initial={false} custom={estado.direcao}>
                                    <motion.div
                                        key={atual.id}
                                        custom={estado.direcao}
                                        variants={laminaVariants}
                                        initial="enter"
                                        animate="center"
                                        exit="exit"
                                        className="eq__lamina"
                                    >
                                        <motion.div
                                            className="eq__parallax"
                                            style={{ y: parallaxY }}
                                        >
                                            {atual.foto && !semFoto[atual.id] ? (
                                                <motion.img
                                                    src={atual.foto}
                                                    alt={`${atual.nome}, ${atual.funcao}`}
                                                    className="eq__foto"
                                                    draggable={false}
                                                    initial={{ scale: 1.09 }}
                                                    animate={{ scale: 1 }}
                                                    exit={{ scale: 1.03 }}
                                                    transition={{ duration: 1, ease: EASE }}
                                                    onError={() => marcarSemFoto(atual.id)}
                                                />
                                            ) : (
                                                <div className="eq__fallback" aria-hidden="true">
                                                    <span>{iniciais(atual.nome)}</span>
                                                </div>
                                            )}
                                        </motion.div>
                                    </motion.div>
                                </AnimatePresence>
                            </motion.div>
                        </div>

                        <div className="eq__texto-col">
                            <div className="eq__controle-topo">
                                <span className="eq__indice" aria-live="polite">
                                    <em>{String(profSeguro + 1).padStart(2, "0")}</em>
                                    <span>/ {String(totalCategoria).padStart(2, "0")}</span>
                                </span>

                                <div className="eq__setas">
                                    <button
                                        type="button"
                                        className="eq__seta"
                                        onClick={anterior}
                                        aria-label="Profissional anterior"
                                    >
                                        <Seta invertida />
                                    </button>
                                    <button
                                        type="button"
                                        className="eq__seta"
                                        onClick={proximo}
                                        aria-label="Próximo profissional"
                                    >
                                        <Seta />
                                    </button>
                                </div>
                            </div>

                            <div className="eq__conteudo">
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={atual.id}
                                        className="eq__bloco"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0, transition: { duration: 0.2 } }}
                                    >
                                        <motion.p
                                            className="eq__meta"
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.48, ease: EASE }}
                                        >
                                            <span className="eq__ponto" aria-hidden="true" />
                                            <span className="eq__funcao">{atual.funcao}</span>
                                            <span className="eq__sep" aria-hidden="true">·</span>
                                            <span className="eq__registro">{atual.registro}</span>
                                        </motion.p>

                                        <h3 className="eq__nome">
                                            <span className="eq__mascara">
                                                <motion.span
                                                    initial={{ y: "105%" }}
                                                    animate={{ y: "0%" }}
                                                    transition={{ duration: 0.68, delay: 0.04, ease: EASE }}
                                                >
                                                    {atual.nome}
                                                </motion.span>
                                            </span>
                                        </h3>

                                        <motion.p
                                            className="eq__frase"
                                            initial={{ opacity: 0, y: 12 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.56, delay: 0.1, ease: EASE }}
                                        >
                                            {atual.frase}
                                        </motion.p>

                                        <motion.div
                                            className="eq__formacao-wrap"
                                            initial={{ opacity: 0, y: 12 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.56, delay: 0.16, ease: EASE }}
                                        >
                                            <span className="eq__rotulo">Formação</span>
                                            <p className="eq__formacao">{atual.formacao}</p>
                                        </motion.div>

                                        <motion.div
                                            className="eq__acao-wrap"
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.5, delay: 0.22, ease: EASE }}
                                        >

                                        </motion.div>
                                    </motion.div>
                                </AnimatePresence>
                            </div>

                            <div className="eq__rodape-col">
                                <span className="eq__rodape-rotulo">{grupoAtual.nome}</span>
                                <ol className="eq__nomes" aria-label={`Profissionais de ${grupoAtual.nome}`}>
                                    {itensCategoria.map((pessoa, indice) => {
                                        const ativo = indice === profSeguro;
                                        return (
                                            <li
                                                key={pessoa.id}
                                                className={`eq-nome-item ${ativo ? "is-ativo" : ""}`}
                                            >
                                                <button
                                                    type="button"
                                                    className="eq-nome-btn"
                                                    aria-current={ativo ? "true" : undefined}
                                                    onClick={() => selecionarProfissional(indice)}
                                                    onMouseEnter={() => selecionarProfissional(indice)}
                                                >
                                                    <span className="eq-nome-btn__n">
                                                        {String(indice + 1).padStart(2, "0")}
                                                    </span>
                                                    <span className="eq-nome-btn__txt">
                                                        {pessoa.nome}
                                                    </span>
                                                </button>

                                                <span className="eq-nome-item__trilho" aria-hidden="true">
                                                    {ativo && (
                                                        !pausado && podeAvancar ? (
                                                            <motion.span
                                                                key={`prog-${pessoa.id}-${catSegura}`}
                                                                className="eq-nome-item__barra"
                                                                initial={{ scaleX: 0 }}
                                                                animate={{ scaleX: 1 }}
                                                                transition={{
                                                                    duration: TEMPO_TROCA / 1000,
                                                                    ease: "linear",
                                                                }}
                                                            />
                                                        ) : (
                                                            <span className="eq-nome-item__barra" />
                                                        )
                                                    )}
                                                </span>
                                            </li>
                                        );
                                    })}
                                </ol>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </MotionConfig>
    );
}