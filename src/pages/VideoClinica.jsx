import { useEffect, useRef } from "react";
import { MotionConfig, motion } from "framer-motion";
import "./styles/video-clinica.css";

const EASE = [0.22, 1, 0.36, 1];

export default function VideoClinica({
    videoSrc = "video/video-clinica.MOV",
    posterSrc = "",
    eyebrow = "A clínica",
    titulo = "Um espaço pensado para acolher cada passo.",
    subtitulo = "Conheça nossas salas, nossa rotina e como preparamos cada detalhe para o desenvolvimento infantil.",
}) {
    const videoRef = useRef(null);

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        video.muted = true;
        const promessa = video.play();
        if (promessa && typeof promessa.catch === "function") {
            promessa.catch(() => { });
        }
    }, [videoSrc]);

    const temTexto = Boolean(eyebrow || titulo || subtitulo);

    return (
        <MotionConfig reducedMotion="user">
            <section
                id="clinica"
                className="vc"
                aria-labelledby={titulo ? "vc-titulo" : undefined}
                aria-label={!titulo ? "Vídeo institucional da Clínica Cerene" : undefined}
            >
                <div className="vc__midia" aria-hidden="true">
                    <video
                        ref={videoRef}
                        className="vc__video"
                        src={videoSrc}
                        poster={posterSrc || undefined}
                        autoPlay
                        muted
                        loop
                        playsInline
                        preload="auto"
                        disablePictureInPicture
                    />
                    {temTexto && <span className="vc__veu" />}
                </div>

                {temTexto && (
                    <div className="vc__camada">
                        {eyebrow && (
                            <p className="vc__eyebrow">
                                <span className="vc__fio" aria-hidden="true" />
                                {eyebrow}
                            </p>
                        )}

                        {(titulo || subtitulo) && (
                            <motion.div
                                className="vc__texto"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.35 }}
                                transition={{ duration: 0.8, ease: EASE }}
                            >
                                {titulo && (
                                    <h2 id="vc-titulo" className="vc__titulo">
                                        {titulo}
                                    </h2>
                                )}
                                {subtitulo && (
                                    <p className="vc__subtitulo">{subtitulo}</p>
                                )}
                            </motion.div>
                        )}
                    </div>
                )}
            </section>
        </MotionConfig>
    );
}