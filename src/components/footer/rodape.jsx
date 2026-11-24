import { useEffect, useRef, useState } from "react";
import "./styles/rodape.css";

const ICONES = {
    "whatsapp-logo":
        "M187.58,144.84l-32-16a8,8,0,0,0-8,.5l-14.69,9.8a40.55,40.55,0,0,1-16-16l9.8-14.69a8,8,0,0,0,.5-8l-16-32A8,8,0,0,0,104,64a40,40,0,0,0-40,40,88.1,88.1,0,0,0,88,88,40,40,0,0,0,40-40A8,8,0,0,0,187.58,144.84ZM152,176a72.08,72.08,0,0,1-72-72A24,24,0,0,1,99.29,80.46l11.48,23L101,118a8,8,0,0,0-.73,7.51,56.47,56.47,0,0,0,30.15,30.15A8,8,0,0,1,138,155l14.61-9.74,23,11.48A24,24,0,0,1,152,176ZM128,24A104,104,0,0,0,36.18,176.88L24.83,210.93a16,16,0,0,0,20.24,20.24l34.05-11.35A104,104,0,1,0,128,24Zm0,192a87.87,87.87,0,0,1-44.06-11.81,8,8,0,0,0-6.54-.67L40,216,52.47,178.6a8,8,0,0,0-.66-6.54A88,88,0,1,1,128,216Z",
    phone:
        "M222.37,158.46l-47.11-21.11-.13-.06a16,16,0,0,0-15.17,1.4,8.12,8.12,0,0,0-.75.56L134.87,160c-15.42-7.49-31.34-23.29-38.83-38.51l20.78-24.71c.2-.25.39-.5.57-.77a16,16,0,0,0,1.32-15.06l0-.12L97.54,33.64a16,16,0,0,0-16.62-9.52A56.26,56.26,0,0,0,32,80c0,79.4,64.6,144,144,144a56.26,56.26,0,0,0,55.88-48.92A16,16,0,0,0,222.37,158.46ZM176,208A128.14,128.14,0,0,1,48,80,40.2,40.2,0,0,1,82.87,40a.61.61,0,0,0,0,.12l21,47L83.2,111.86a6.13,6.13,0,0,0-.57.77,16,16,0,0,0-1,15.7c9.06,18.53,27.73,37.06,46.46,46.11a16,16,0,0,0,15.75-1.14,8.44,8.44,0,0,0,.74-.56L168.89,152l47,21.05h0s.08,0,.11,0A40.21,40.21,0,0,1,176,208Z",
    "map-pin":
        "M128,64a40,40,0,1,0,40,40A40,40,0,0,0,128,64Zm0,64a24,24,0,1,1,24-24A24,24,0,0,1,128,128Zm0-112a88.1,88.1,0,0,0-88,88c0,31.4,14.51,64.68,42,96.25a254.19,254.19,0,0,0,41.45,38.3,8,8,0,0,0,9.18,0A254.19,254.19,0,0,0,174,200.25c27.45-31.57,42-64.85,42-96.25A88.1,88.1,0,0,0,128,16Zm0,206c-16.53-13-72-60.75-72-118a72,72,0,0,1,144,0C200,161.23,144.53,209,128,222Z",
    clock:
        "M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm64-88a8,8,0,0,1-8,8H128a8,8,0,0,1-8-8V72a8,8,0,0,1,16,0v48h48A8,8,0,0,1,192,128Z",
    "envelope-simple":
        "M224,48H32a8,8,0,0,0-8,8V192a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V56A8,8,0,0,0,224,48ZM203.43,64,128,133.15,52.57,64ZM216,192H40V74.19l82.59,75.71a8,8,0,0,0,10.82,0L216,74.19V192Z",
    "instagram-logo":
        "M128,80a48,48,0,1,0,48,48A48.05,48.05,0,0,0,128,80Zm0,80a32,32,0,1,1,32-32A32,32,0,0,1,128,160ZM176,24H80A56.06,56.06,0,0,0,24,80v96a56.06,56.06,0,0,0,56,56h96a56.06,56.06,0,0,0,56-56V80A56.06,56.06,0,0,0,176,24Zm40,152a40,40,0,0,1-40,40H80a40,40,0,0,1-40-40V80A40,40,0,0,1,80,40h96a40,40,0,0,1,40,40ZM192,76a12,12,0,1,1-12-12A12,12,0,0,1,192,76Z",
    "arrow-up":
        "M205.66,117.66a8,8,0,0,1-11.32,0L136,59.31V216a8,8,0,0,1-16,0V59.31L61.66,117.66a8,8,0,0,1-11.32-11.32l72-72a8,8,0,0,1,11.32,0l72,72A8,8,0,0,1,205.66,117.66Z",
    "arrow-up-right":
        "M200,64V168a8,8,0,0,1-16,0V83.31L69.66,197.66a8,8,0,0,1-11.32-11.32L172.69,72H88a8,8,0,0,1,0-16H192A8,8,0,0,1,200,64Z",
};

function Ic({ nome }) {
    return (
        <i className="rp-ic" aria-hidden="true">
            <svg viewBox="0 0 256 256" fill="currentColor" focusable="false">
                <path d={ICONES[nome]} />
            </svg>
        </i>
    );
}

const NAVEGACAO = [
    { label: "Início", href: "#inicio" },
    { label: "A clínica", href: "#clinica" },
    { label: "Especialidades", href: "#especialidades" },
    { label: "Como funciona", href: "#como-funciona" },
    { label: "Equipe", href: "#equipe" },
    { label: "Contato", href: "#contato" },
];

export default function Rodape({
    logoSrc = "logos/logo-principal.png",
    agendarHref = "#contato",
    whatsappNumero = "55XXXXXXXXXXX",
    telefone = "[TELEFONE]",
    email = "[E-MAIL]",
    endereco = "[ENDEREÇO COMPLETO]",
    cidade = "[CIDADE — UF]",
    horario = "[HORÁRIO DE ATENDIMENTO]",
    instagram = "https://instagram.com/[PERFIL]",
    responsavelTecnico = "[NOME] · [CONSELHO] [NÚMERO]",
    cnpj = "[CNPJ]",
}) {
    const ref = useRef(null);
    const [dentro, setDentro] = useState(false);

    useEffect(() => {
        const el = ref.current;
        if (!el || !("IntersectionObserver" in window)) {
            setDentro(true);
            return;
        }
        const io = new IntersectionObserver(
            ([e]) => {
                if (e.isIntersecting) {
                    setDentro(true);
                    io.disconnect();
                }
            },
            { threshold: 0.12 }
        );
        io.observe(el);
        return () => io.disconnect();
    }, []);

    const ano = new Date().getFullYear();
    const aoTopo = () => {
        const reduz = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        window.scrollTo({ top: 0, behavior: reduz ? "auto" : "smooth" });
    };

    return (
        <footer ref={ref} className={`rp ${dentro ? "rp--in" : ""}`} id="contato">
            <div className="rp__faixa" aria-hidden="true">
                <span className="rp__faixa-seg rp__faixa-seg--verde" />
                <span className="rp__faixa-seg rp__faixa-seg--amarelo" />
                <span className="rp__faixa-seg rp__faixa-seg--vermelho" />
                <span className="rp__faixa-seg rp__faixa-seg--ciano" />
            </div>

            <div className="rp__in">
                <div className="rp__chamada">
                    <h2 className="rp__titulo">
                        Cada passo é uma <em>conquista</em>.
                        <br />
                        Vamos dar o primeiro juntos?
                    </h2>

                    <div className="rp__acoes">
                        <a className="rp__btn" href={agendarHref}>
                            Agendar avaliação
                            <span className="rp__btn-seta" aria-hidden="true">
                                <Ic nome="arrow-up-right" />
                            </span>
                        </a>
                        <a
                            className="rp__link"
                            href={`https://wa.me/${whatsappNumero}`}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <Ic nome="whatsapp-logo" />
                            Falar no WhatsApp
                        </a>
                    </div>
                </div>

                <div className="rp__colunas">
                    <div className="rp__col rp__col--marca">
                        <a className="rp__logo" href="#inicio" aria-label="Clínica Cerene — voltar ao início">
                            <img
                                src={logoSrc}
                                alt="Clínica Cerene"
                            />
                        </a>
                        <p className="rp__bio">
                            Acolhemos a criança e a família em todas as etapas do
                            desenvolvimento, com ciência, método e atenção a cada detalhe.
                        </p>
                        <a
                            className="rp__social"
                            href={instagram}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Instagram da Clínica Cerene"
                        >
                            <Ic nome="instagram-logo" />
                            <span>Instagram</span>
                        </a>
                    </div>

                    <nav className="rp__col" aria-label="Rodapé">
                        <h3>Navegação</h3>
                        <ul className="rp__nav">
                            {NAVEGACAO.map((item) => (
                                <li key={item.href}>
                                    <a href={item.href}>{item.label}</a>
                                </li>
                            ))}
                        </ul>
                    </nav>

                    <div className="rp__col">
                        <h3>Contato</h3>
                        <ul className="rp__contato">
                            <li>
                                <Ic nome="map-pin" />
                                <span>
                                    {endereco}
                                    <br />
                                    {cidade}
                                </span>
                            </li>
                            <li>
                                <Ic nome="phone" />
                                <a href={`tel:${telefone.replace(/[^+\d]/g, "")}`}>{telefone}</a>
                            </li>
                            <li>
                                <Ic nome="envelope-simple" />
                                <a href={`mailto:${email}`}>{email}</a>
                            </li>
                            <li>
                                <Ic nome="clock" />
                                <span>{horario}</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="rp__base">
                    <p className="rp__legal">
                        © {ano} Clínica Cerene — Centro de Reabilitação e Estudo Neurológico.
                        <span>CNPJ {cnpj} · Responsável técnico: {responsavelTecnico}</span>
                    </p>

                    <button type="button" className="rp__topo" onClick={aoTopo}>
                        <span>Voltar ao topo</span>
                        <span className="rp__topo-ic" aria-hidden="true">
                            <Ic nome="arrow-up" />
                        </span>
                    </button>
                </div>
            </div>
        </footer>
    );
}