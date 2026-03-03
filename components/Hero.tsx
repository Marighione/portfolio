"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export default function Hero() {
    const { t } = useLanguage();

    return (
        <section
            id="hero"
            className="relative h-screen overflow-hidden"
            style={{ background: "var(--bg)" }}
        >
            {/* Animated blobs (sin blur de imagen; es motion real) */}
            <div aria-hidden="true" className="pointer-events-none absolute inset-0">
                <motion.div
                    className="absolute -top-[20%] -left-[10%] h-[80vh] w-[60vw] blur-[45px]"
                    style={{
                        background:
                            "color-mix(in oklab, var(--accent) 45%, transparent)",
                    }}
                    animate={{
                        x: [0, 50, -30, 40, 0],
                        y: [0, -40, 25, -15, 0],
                        scale: [1, 1.08, 0.94, 1.05, 1],
                        borderRadius: [
                            "60% 40% 30% 70% / 60% 30% 70% 40%",
                            "40% 60% 70% 30% / 40% 70% 30% 60%",
                            "50% 50% 40% 60% / 30% 60% 40% 70%",
                            "30% 70% 60% 40% / 50% 40% 60% 50%",
                            "60% 40% 30% 70% / 60% 30% 70% 40%",
                        ],
                    }}
                    transition={{ duration: 8, ease: "easeInOut", repeat: Infinity }}
                />
                <motion.div
                    className="absolute -top-[5%] right-[-10%] h-[70vh] w-[55vw] blur-[40px]"
                    style={{
                        background:
                            "color-mix(in oklab, var(--surface) 55%, var(--accent-subtle))",
                    }}
                    animate={{
                        x: [0, -55, 25, -30, 0],
                        y: [0, 30, -45, 20, 0],
                        scale: [1, 1.06, 0.93, 1.07, 1],
                        borderRadius: [
                            "40% 60% 60% 40% / 50% 30% 70% 50%",
                            "60% 40% 30% 70% / 60% 70% 30% 40%",
                            "50% 50% 70% 30% / 40% 60% 40% 60%",
                            "30% 70% 40% 60% / 70% 40% 60% 30%",
                            "40% 60% 60% 40% / 50% 30% 70% 50%",
                        ],
                    }}
                    transition={{ duration: 11, ease: "easeInOut", repeat: Infinity }}
                />
                <motion.div
                    className="absolute bottom-[10%] left-[15%] h-[55vh] w-[50vw] blur-[35px]"
                    style={{
                        background:
                            "color-mix(in oklab, var(--heading) 14%, transparent)",
                    }}
                    animate={{
                        x: [0, 30, -20, 35, 0],
                        y: [0, 35, -20, 10, 0],
                        scale: [1, 0.95, 1.08, 0.97, 1],
                        borderRadius: [
                            "55% 45% 40% 60% / 45% 55% 45% 55%",
                            "35% 65% 60% 40% / 55% 35% 65% 45%",
                            "65% 35% 45% 55% / 35% 65% 35% 65%",
                            "45% 55% 55% 45% / 65% 45% 55% 35%",
                            "55% 45% 40% 60% / 45% 55% 45% 55%",
                        ],
                    }}
                    transition={{ duration: 15, ease: "easeInOut", repeat: Infinity }}
                />
            </div>

            {/* Bottom block: nombre derecha + copy abajo-izquierda */}
            <div className="absolute bottom-0 left-150 right-0 z-10 pb-2 pr-6">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                    className="text-right text-[11vw] font-normal tracking-tighter leading-[0.85] whitespace-nowrap"
                    style={{ color: "var(--heading)" }}
                >
                    MARIANA
                </motion.div>

                <div className="relative">
                    {/* Subtitle absolute so it doesn't shrink GHIONE's container */}
                    <motion.p
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.4 }}
                        className="absolute bottom-[1.6vw] left-0 max-w-[260px] text-sm leading-relaxed"
                        style={{ color: "var(--text-muted)" }}
                    >
                        {t.hero.sub}
                    </motion.p>

                    {/* Full-width block with text-right — right edge matches MARIANA exactly */}
                    <motion.h1
                        initial={{ opacity: 0, y: 60 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
                        className="w-full text-right text-[11vw] font-normal tracking-tighter leading-[0.85] whitespace-nowrap"
                        style={{ color: "var(--heading)" }}
                    >
                        GHIONE
                    </motion.h1>
                </div>
            </div>
        </section>
    );
}
