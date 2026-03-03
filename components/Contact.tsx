"use client";

import Image from "next/image";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import PageContainer from "@/components/PageContainer";

const links = [
    {
        label: "marianalourghione@gmail.com",
        href: "mailto:marianalourghione@gmail.com",
    },
    {
        label: "LinkedIn",
        href: "https://www.linkedin.com/in/mariana-ghione/",
    },
];

export default function Contact() {
    const { t } = useLanguage();
    const c = t.contact;

    return (
        <section id="contact" className="py-32">
            <PageContainer>
                <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-end">

                    {/* Texto */}
                    <div>
                        <p
                            className="text-xs tracking-[0.2em] uppercase mb-6"
                            style={{ color: "var(--accent)" }}
                        >
                            {c.label}
                        </p>

                        <h2 className="text-4xl md:text-5xl font-semibold tracking-tight mb-6 leading-tight">
                            {c.headline}
                        </h2>

                        <p className="text-lg leading-relaxed mb-14 opacity-85">
                            {c.sub}
                        </p>

                        <div className="flex flex-row gap-10">
                            {links.map(({ label, href }) => (
                                <a
                                    key={label}
                                    href={href}
                                    target={href.startsWith("http") ? "_blank" : undefined}
                                    rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                                    className="text-sm font-medium underline underline-offset-4 transition-opacity duration-200 hover:opacity-80"
                                >
                                    {label}
                                </a>
                            ))}
                        </div>

                        <p className="mt-24 text-xs opacity-55">
                            {c.built} · {new Date().getFullYear()}
                        </p>
                    </div>

                    {/* Imagen */}
                    <div className="relative w-full h-[480px] md:h-[560px]">
                        <Image
                            src="/foto_prueba.png"
                            alt="Mariana Ghione"
                            fill
                            className="object-contain object-bottom"
                            priority
                        />
                    </div>

                </div>
            </PageContainer>
        </section>
    );
}
