import { useEffect, useState } from "react";
import {
    AnimatePresence,
    MotionConfig,
    motion,
    useScroll,
    useSpring,
} from "framer-motion";
import "./styles/header.css";

const LINKS = [
    { label: "Início", href: "#inicio" },
    { label: "Especialidades", href: "#especialidades" },
    { label: "Como funciona", href: "#como-funciona" },
    { label: "Equipe", href: "#equipe" },
    { label: "Contato", href: "#contato" },
];

const EASE = [0.22, 1, 0.36, 1];

function Seta() {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
        >
            <path d="M5 12h14" />
            <path d="m13 6 6 6-6 6" />
        </svg>
    );
}

export default function Header({
    logoSrc = "logos/logo-principal.png",
    links = LINKS,
    agendarHref = "#contato",
    whatsappNumero = "55XXXXXXXXXXX",
}) {
    const [rolou, setRolou] = useState(false);
    const [menuAberto, setMenuAberto] = useState(false);
    const [secaoAtiva, setSecaoAtiva] = useState(links[0]?.href || "#inicio");
    const [semLogo, setSemLogo] = useState(false);

    const { scrollYProgress } = useScroll();
    const progresso = useSpring(scrollYProgress, {
        stiffness: 240,
        damping: 32,
        restDelta: 0.001,
    });

    useEffect(() => {
        let rafId = 0;

        const atualizar = () => {
            rafId = 0;
            setRolou(window.scrollY > 24);

            const linhaCorte = window.innerHeight * 0.36;
            let encontrada = links[0]?.href || "#inicio";

            for (let i = 0; i < links.length; i++) {
                const href = links[i].href;
                if (!href.startsWith("#")) continue;
                const el = document.querySelector(href);
                if (!el) continue;
                const rect = el.getBoundingClientRect();
                if (rect.top <= linhaCorte) {
                    encontrada = href;
                }
            }

            if (
                window.innerHeight + window.scrollY >=
                document.documentElement.scrollHeight - 40
            ) {
                encontrada = links[links.length - 1]?.href || encontrada;
            }

            setSecaoAtiva(encontrada);
        };

        const aoRolar = () => {
            if (!rafId) rafId = window.requestAnimationFrame(atualizar);
        };

        atualizar();
        window.addEventListener("scroll", aoRolar, { passive: true });
        window.addEventListener("resize", aoRolar);

        return () => {
            if (rafId) window.cancelAnimationFrame(rafId);
            window.removeEventListener("scroll", aoRolar);
            window.removeEventListener("resize", aoRolar);
        };
    }, [links]);

    useEffect(() => {
        if (!menuAberto) return undefined;

        const overflowAnterior = document.body.style.overflow;
        document.body.style.overflow = "hidden";

        const aoTeclar = (e) => {
            if (e.key === "Escape") setMenuAberto(false);
        };

        const aoRedimensionar = () => {
            if (window.innerWidth > 960) setMenuAberto(false);
        };

        window.addEventListener("keydown", aoTeclar);
        window.addEventListener("resize", aoRedimensionar);

        return () => {
            document.body.style.overflow = overflowAnterior;
            window.removeEventListener("keydown", aoTeclar);
            window.removeEventListener("resize", aoRedimensionar);
        };
    }, [menuAberto]);

    const navegar = (href) => {
        setSecaoAtiva(href);
        setMenuAberto(false);
    };

    return (
        <MotionConfig reducedMotion="user">
            <header className={`hd ${rolou ? "hd--rolou" : ""} ${menuAberto ? "hd--aberto" : ""}`}>
                <div className="hd__in">
                    <a
                        className="hd__logo"
                        href="#inicio"
                        onClick={() => navegar("#inicio")}
                        aria-label="Clínica Cerene — página inicial"
                    >
                        {!semLogo ? (
                            <img
                                src={logoSrc}
                                alt="Clínica Cerene"
                                onError={() => setSemLogo(true)}
                            />
                        ) : (
                            <span className="hd__logo-texto">Clínica Cerene</span>
                        )}
                    </a>

                    <nav className="hd__nav" aria-label="Navegação principal">
                        <ul className="hd__lista">
                            {links.map((item) => {
                                const ativo = secaoAtiva === item.href;
                                return (
                                    <li key={item.href} className="hd__item">
                                        <a
                                            href={item.href}
                                            className={`hd__link ${ativo ? "is-ativo" : ""}`}
                                            aria-current={ativo ? "page" : undefined}
                                            onClick={() => navegar(item.href)}
                                        >
                                            <span>{item.label}</span>
                                            {ativo && (
                                                <motion.span
                                                    layoutId="hd-ativo"
                                                    className="hd__ativo-barra"
                                                    transition={{
                                                        type: "spring",
                                                        stiffness: 420,
                                                        damping: 34,
                                                    }}
                                                />
                                            )}
                                        </a>
                                    </li>
                                );
                            })}
                        </ul>
                    </nav>

                    <div className="hd__acoes">
                        <a
                            className="hd__cta"
                            href={agendarHref}
                            onClick={() => navegar(agendarHref)}
                        >
                            <span>Agendar avaliação</span>
                            <span className="hd__cta-ic" aria-hidden="true">
                                <Seta />
                            </span>
                        </a>

                        <button
                            type="button"
                            className={`hd__burger ${menuAberto ? "is-aberto" : ""}`}
                            aria-expanded={menuAberto}
                            aria-controls="hd-menu-mobile"
                            aria-label={menuAberto ? "Fechar menu" : "Abrir menu"}
                            onClick={() => setMenuAberto((prev) => !prev)}
                        >
                            <span />
                            <span />
                        </button>
                    </div>
                </div>

                <div className="hd__progresso" aria-hidden="true">
                    <motion.span
                        className="hd__progresso-fill"
                        style={{ scaleX: progresso }}
                    />
                </div>
            </header>

            <AnimatePresence>
                {menuAberto && (
                    <motion.div
                        className="hd-overlay"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        onClick={() => setMenuAberto(false)}
                    >
                        <motion.aside
                            id="hd-menu-mobile"
                            className="hd-drawer"
                            role="dialog"
                            aria-modal="true"
                            aria-label="Menu principal"
                            initial={{ x: "100%" }}
                            animate={{ x: "0%" }}
                            exit={{ x: "100%" }}
                            transition={{ duration: 0.42, ease: EASE }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="hd-drawer__faixa" aria-hidden="true">
                                <span className="hd-drawer__seg hd-drawer__seg--verde" />
                                <span className="hd-drawer__seg hd-drawer__seg--amarelo" />
                                <span className="hd-drawer__seg hd-drawer__seg--vermelho" />
                                <span className="hd-drawer__seg hd-drawer__seg--ciano" />
                            </div>

                            <nav className="hd-drawer__nav" aria-label="Links do menu">
                                <ul>
                                    {links.map((item, indice) => {
                                        const ativo = secaoAtiva === item.href;
                                        return (
                                            <motion.li
                                                key={item.href}
                                                initial={{ opacity: 0, x: 20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{
                                                    duration: 0.4,
                                                    delay: 0.08 + indice * 0.045,
                                                    ease: EASE,
                                                }}
                                            >
                                                <a
                                                    href={item.href}
                                                    className={`hd-drawer__link ${ativo ? "is-ativo" : ""}`}
                                                    onClick={() => navegar(item.href)}
                                                >
                                                    <span className="hd-drawer__n">
                                                        {String(indice + 1).padStart(2, "0")}
                                                    </span>
                                                    <span className="hd-drawer__label">
                                                        {item.label}
                                                    </span>
                                                </a>
                                            </motion.li>
                                        );
                                    })}
                                </ul>
                            </nav>

                            <motion.div
                                className="hd-drawer__base"
                                initial={{ opacity: 0, y: 16 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.45, delay: 0.28, ease: EASE }}
                            >
                                <a
                                    className="hd-drawer__btn hd-drawer__btn--primario"
                                    href={agendarHref}
                                    onClick={() => navegar(agendarHref)}
                                >
                                    <span>Agendar avaliação</span>
                                    <Seta />
                                </a>

                                <a
                                    className="hd-drawer__btn hd-drawer__btn--whatsapp"
                                    href={`https://wa.me/${whatsappNumero}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={() => setMenuAberto(false)}
                                >
                                    <span>Falar no WhatsApp</span>
                                    <Seta />
                                </a>
                            </motion.div>
                        </motion.aside>
                    </motion.div>
                )}
            </AnimatePresence>
        </MotionConfig>
    );
}