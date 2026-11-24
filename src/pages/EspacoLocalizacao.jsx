import { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { AnimatePresence, MotionConfig, motion } from "framer-motion";
import {
    ArrowLeft,
    ArrowRight,
    ArrowUpRight,
    Check,
    Clock,
    Copy,
    MapPin,
    NavigationArrow,
    Phone,
    X,
} from "@phosphor-icons/react";
import "./styles/espaco-localizacao.css";

const COORDENADAS = [-15.810660184831903, -47.91292192635848];

const MAPS_EMBED_URL =
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3838.8727913374128!2d-47.91292192635848!3d-15.810660184831903!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x935a31c0cfaa5c43%3A0xc68f09b56f76a9b9!2sCl%C3%ADnica%20Cerene%20-%20Centro%20de%20Reabilita%C3%A7%C3%A3o%20e%20Estudo%20Neurol%C3%B3gico!5e0!3m2!1spt-BR!2sbr!4v1795553362722!5m2!1spt-BR!2sbr";

const FOTOS_PADRAO = [
    {
        id: "recepcao",
        titulo: "",
        subtitulo: "",
        src: "fotos/clinica/foto1.webp",
    },
    {
        id: "integracao-sensorial",
        titulo: "",
        subtitulo: "",
        src: "fotos/clinica/foto2.webp",
    },
    {
        id: "fisioterapia",
        titulo: "",
        subtitulo: "",
        src: "fotos/clinica/foto3.webp",
    },
    {
        id: "fonoaudiologia",
        titulo: "",
        subtitulo: "Sala preparada para linguagem, fala e desenvolvimento alimentar.",
        src: "fotos/clinica/foto4.webp",
    },
    {
        id: "psicopedagogia",
        titulo: "",
        subtitulo: "",
        src: "fotos/clinica/foto5.webp",
    },
    {
        id: "convivencia",
        titulo: "",
        subtitulo: "",
        src: "fotos/clinica/foto6.webp",
    },
];

const EASE = [0.22, 1, 0.36, 1];

export default function EspacoLocalizacao({
    fotos = FOTOS_PADRAO,
    endereco = "Endereço completo da Clínica Cerene",
    cidade = "Brasília — DF",
    horario = "Segunda a sexta, das 7h às 19h",
    telefone = "(61) 0000-0000",
    embedUrl = MAPS_EMBED_URL,
}) {
    const [fotoAberta, setFotoAberta] = useState(null);
    const [modoMapa, setModoMapa] = useState("interativo");
    const [copiado, setCopiado] = useState(false);

    const mapaElRef = useRef(null);
    const mapaInstRef = useRef(null);
    const timerCopiaRef = useRef(null);

    const [lat, lng] = COORDENADAS;
    const googleMapsHref = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
    const wazeHref = `https://waze.com/ul?ll=${lat},${lng}&navigate=yes`;

    useEffect(() => {
        if (modoMapa !== "interativo" || !mapaElRef.current) return undefined;

        const mapa = L.map(mapaElRef.current, {
            center: COORDENADAS,
            zoom: 16,
            scrollWheelZoom: false,
            zoomControl: true,
        });

        L.tileLayer(
            `https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png?key=${import.meta.env.VITE_CARTO_KEY}`,
            {
                maxZoom: 19,
                attribution: "&copy; OpenStreetMap &copy; CARTO",
            }
        ).addTo(mapa);

        const pino = L.divIcon({
            className: "el-pino-wrap",
            html: '<span class="el-pino"><span class="el-pino__pulso"></span><span class="el-pino__nucleo"></span></span>',
            iconSize: [44, 44],
            iconAnchor: [22, 22],
            popupAnchor: [0, -20],
        });

        const marcador = L.marker(COORDENADAS, { icon: pino }).addTo(mapa);
        marcador
            .bindPopup(
                `<div class="el-popup"><strong>Clínica Cerene</strong><span>Centro de Reabilitação e Estudo Neurológico</span></div>`,
                { closeButton: false, offset: [0, -6] }
            )
            .openPopup();

        mapaInstRef.current = mapa;

        return () => {
            mapa.remove();
            mapaInstRef.current = null;
        };
    }, [modoMapa]);

    useEffect(() => {
        if (fotoAberta === null) return undefined;

        const overflowAnterior = document.body.style.overflow;
        document.body.style.overflow = "hidden";

        const aoTeclar = (e) => {
            if (e.key === "Escape") setFotoAberta(null);
            if (e.key === "ArrowRight") {
                setFotoAberta((prev) => (prev + 1) % fotos.length);
            }
            if (e.key === "ArrowLeft") {
                setFotoAberta((prev) => (prev - 1 + fotos.length) % fotos.length);
            }
        };

        window.addEventListener("keydown", aoTeclar);
        return () => {
            document.body.style.overflow = overflowAnterior;
            window.removeEventListener("keydown", aoTeclar);
        };
    }, [fotoAberta, fotos.length]);

    useEffect(() => {
        return () => {
            if (timerCopiaRef.current) clearTimeout(timerCopiaRef.current);
        };
    }, []);

    const copiarEndereco = () => {
        const texto = `${endereco}, ${cidade}`;
        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(texto).catch(() => { });
        }
        setCopiado(true);
        if (timerCopiaRef.current) clearTimeout(timerCopiaRef.current);
        timerCopiaRef.current = setTimeout(() => setCopiado(false), 2200);
    };

    const fotoAtual = fotoAberta !== null ? fotos[fotoAberta] : null;

    return (
        <MotionConfig reducedMotion="user">
            <section className="el" id="espaco" aria-labelledby="el-titulo">
                <div className="el__in">
                    <header className="el__cab">
                        <div className="el__cab-esq">
                            <motion.p
                                className="el__eyebrow"
                                initial={{ opacity: 0, y: 12 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.4 }}
                                transition={{ duration: 0.6, ease: EASE }}
                            >
                                <span className="el__fio" aria-hidden="true" />
                                Nosso espaço
                            </motion.p>

                            <h2 id="el-titulo" className="el__titulo">
                                <span className="el__mascara">
                                    <motion.span
                                        initial={{ y: "105%" }}
                                        whileInView={{ y: "0%" }}
                                        viewport={{ once: true, amount: 0.4 }}
                                        transition={{ duration: 0.8, ease: EASE }}
                                    >
                                        Ambientes preparados
                                    </motion.span>
                                </span>
                                <span className="el__mascara">
                                    <motion.span
                                        initial={{ y: "105%" }}
                                        whileInView={{ y: "0%" }}
                                        viewport={{ once: true, amount: 0.4 }}
                                        transition={{ duration: 0.8, delay: 0.08, ease: EASE }}
                                    >
                                        para <em>acolher e evoluir</em>.
                                    </motion.span>
                                </span>
                            </h2>
                        </div>

                        <motion.p
                            className="el__intro"
                            initial={{ opacity: 0, y: 16 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.4 }}
                            transition={{ duration: 0.7, delay: 0.12, ease: EASE }}
                        >
                            Salas claras, recursos especializados e um ambiente calmo
                            projetado para que a criança se sinta segura desde a chegada.
                        </motion.p>
                    </header>

                    <ul className="el__galeria" aria-label="Galeria de fotos da Clínica Cerene">
                        {fotos.slice(0, 6).map((foto, indice) => (
                            <motion.li
                                key={foto.id}
                                className={`el-foto el-foto--${indice + 1}`}
                                initial={{ opacity: 0, y: 26 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.15 }}
                                transition={{
                                    duration: 0.75,
                                    delay: (indice % 3) * 0.08,
                                    ease: EASE,
                                }}
                            >
                                <button
                                    type="button"
                                    className="el-foto__btn"
                                    onClick={() => setFotoAberta(indice)}
                                    aria-label={`Ampliar foto: ${foto.titulo}`}
                                >
                                    <img
                                        src={foto.src}
                                        alt={foto.titulo}
                                        className="el-foto__img"
                                        loading="lazy"
                                    />
                                    <span className="el-foto__veu" aria-hidden="true" />
                                    <span className="el-foto__legenda">
                                        <span className="el-foto__n">
                                            {String(indice + 1).padStart(2, "0")}
                                        </span>
                                        <span className="el-foto__titulo">{foto.titulo}</span>
                                    </span>
                                </button>
                            </motion.li>
                        ))}
                    </ul>

                    <div className="el__local" id="localizacao">
                        <div className="el__local-info">
                            <p className="el__eyebrow">
                                <span className="el__fio" aria-hidden="true" />
                                Onde estamos
                            </p>

                            <h3 className="el__local-titulo">
                                Venha conhecer a <em>Clínica Cerene</em>.
                            </h3>

                            <ul className="el__dados">
                                <li className="el__dado">
                                    <span className="el__dado-ic" aria-hidden="true">
                                        <MapPin size={22} weight="regular" />
                                    </span>
                                    <div className="el__dado-corpo">
                                        <span className="el__dado-rotulo">Endereço</span>
                                        <p className="el__dado-valor">
                                            {endereco}
                                            <br />
                                            {cidade}
                                        </p>
                                        <button
                                            type="button"
                                            className="el__copiar"
                                            onClick={copiarEndereco}
                                        >
                                            {copiado ? (
                                                <>
                                                    <Check size={16} weight="regular" />
                                                    <span>Endereço copiado</span>
                                                </>
                                            ) : (
                                                <>
                                                    <Copy size={16} weight="regular" />
                                                    <span>Copiar endereço</span>
                                                </>
                                            )}
                                        </button>
                                    </div>
                                </li>

                                <li className="el__dado">
                                    <span className="el__dado-ic" aria-hidden="true">
                                        <Clock size={22} weight="regular" />
                                    </span>
                                    <div className="el__dado-corpo">
                                        <span className="el__dado-rotulo">Atendimento</span>
                                        <p className="el__dado-valor">{horario}</p>
                                    </div>
                                </li>

                                <li className="el__dado">
                                    <span className="el__dado-ic" aria-hidden="true">
                                        <Phone size={22} weight="regular" />
                                    </span>
                                    <div className="el__dado-corpo">
                                        <span className="el__dado-rotulo">Telefone</span>
                                        <a
                                            className="el__dado-link"
                                            href={`tel:${telefone.replace(/[^+\d]/g, "")}`}
                                        >
                                            {telefone}
                                        </a>
                                    </div>
                                </li>
                            </ul>

                            <div className="el__rotas">
                                <a
                                    className="el__rota-btn el__rota-btn--primario"
                                    href={googleMapsHref}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span>Abrir no Google Maps</span>
                                    <ArrowUpRight size={18} weight="regular" />
                                </a>

                                <a
                                    className="el__rota-btn el__rota-btn--secundario"
                                    href={wazeHref}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <NavigationArrow size={18} weight="regular" />
                                    <span>Ir pelo Waze</span>
                                </a>
                            </div>
                        </div>

                        <div className="el__mapa-col">
                            <div className="el__mapa-topo">
                                <div className="el__mapa-abas" role="tablist" aria-label="Visualização do mapa">
                                    <button
                                        type="button"
                                        role="tab"
                                        aria-selected={modoMapa === "interativo"}
                                        className={`el__mapa-aba ${modoMapa === "interativo" ? "is-ativa" : ""}`}
                                        onClick={() => setModoMapa("interativo")}
                                    >
                                        {modoMapa === "interativo" && (
                                            <motion.span
                                                layoutId="el-mapa-pilula"
                                                className="el__mapa-aba-bg"
                                                transition={{
                                                    type: "spring",
                                                    stiffness: 420,
                                                    damping: 34,
                                                }}
                                            />
                                        )}
                                        <span>Mapa interativo</span>
                                    </button>

                                    <button
                                        type="button"
                                        role="tab"
                                        aria-selected={modoMapa === "google"}
                                        className={`el__mapa-aba ${modoMapa === "google" ? "is-ativa" : ""}`}
                                        onClick={() => setModoMapa("google")}
                                    >
                                        {modoMapa === "google" && (
                                            <motion.span
                                                layoutId="el-mapa-pilula"
                                                className="el__mapa-aba-bg"
                                                transition={{
                                                    type: "spring",
                                                    stiffness: 420,
                                                    damping: 34,
                                                }}
                                            />
                                        )}
                                        <span>Google Maps</span>
                                    </button>
                                </div>
                            </div>

                            <div className="el__mapa-palco">
                                {modoMapa === "interativo" ? (
                                    <div
                                        ref={mapaElRef}
                                        className="el__leaflet"
                                        aria-label="Mapa interativo com a localização da Clínica Cerene"
                                    />
                                ) : (
                                    <iframe
                                        className="el__iframe"
                                        src={embedUrl}
                                        title="Mapa da Clínica Cerene no Google Maps"
                                        allowFullScreen
                                        loading="lazy"
                                        referrerPolicy="no-referrer-when-downgrade"
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                <AnimatePresence>
                    {fotoAtual && (
                        <motion.div
                            className="el-lb"
                            role="dialog"
                            aria-modal="true"
                            aria-label={fotoAtual.titulo}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.25 }}
                            onClick={() => setFotoAberta(null)}
                        >
                            <div className="el-lb__topo" onClick={(e) => e.stopPropagation()}>
                                <span className="el-lb__cont">
                                    {String(fotoAberta + 1).padStart(2, "0")} /{" "}
                                    {String(fotos.length).padStart(2, "0")}
                                </span>

                                <button
                                    type="button"
                                    className="el-lb__fechar"
                                    onClick={() => setFotoAberta(null)}
                                    aria-label="Fechar galeria"
                                >
                                    <X size={22} weight="regular" />
                                </button>
                            </div>

                            <div className="el-lb__palco" onClick={(e) => e.stopPropagation()}>
                                <button
                                    type="button"
                                    className="el-lb__nav"
                                    onClick={() =>
                                        setFotoAberta(
                                            (prev) => (prev - 1 + fotos.length) % fotos.length
                                        )
                                    }
                                    aria-label="Foto anterior"
                                >
                                    <ArrowLeft size={22} weight="regular" />
                                </button>

                                <AnimatePresence mode="wait">
                                    <motion.figure
                                        key={fotoAtual.id}
                                        className="el-lb__figura"
                                        initial={{ opacity: 0, scale: 0.97 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.97 }}
                                        transition={{ duration: 0.32, ease: EASE }}
                                    >
                                        <img
                                            src={fotoAtual.src}
                                            alt={fotoAtual.titulo}
                                            className="el-lb__img"
                                        />
                                        <figcaption className="el-lb__legenda">
                                            <strong>{fotoAtual.titulo}</strong>
                                            <span>{fotoAtual.subtitulo}</span>
                                        </figcaption>
                                    </motion.figure>
                                </AnimatePresence>

                                <button
                                    type="button"
                                    className="el-lb__nav"
                                    onClick={() =>
                                        setFotoAberta((prev) => (prev + 1) % fotos.length)
                                    }
                                    aria-label="Próxima foto"
                                >
                                    <ArrowRight size={22} weight="regular" />
                                </button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </section>
        </MotionConfig>
    );
}