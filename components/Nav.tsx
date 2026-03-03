"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import ThemeDrag from "@/components/ThemeDrag";

const SECTION_IDS = ["hero", "about", "work", "resume", "contact"] as const;

export default function Nav() {
    const { t } = useLanguage();
    const [active, setActive] = useState<string>("hero");

    const navLinks = [
        { id: "hero", label: "Intro" },
        { id: "about", label: t.nav.about },
        { id: "work", label: t.nav.work },
        { id: "resume", label: t.nav.resume },
        { id: "contact", label: t.nav.contact },
    ];

    useEffect(() => {
        const observers: IntersectionObserver[] = [];

        SECTION_IDS.forEach((id) => {
            const el = document.getElementById(id);
            if (!el) return;

            const obs = new IntersectionObserver(
                ([entry]) => {
                    if (entry.isIntersecting) setActive(id);
                },
                { threshold: 0.4 }
            );
            obs.observe(el);
            observers.push(obs);
        });

        return () => observers.forEach((o) => o.disconnect());
    }, []);

    return (
        <aside className="fixed left-0 top-0 z-50 flex h-screen w-32 flex-col justify-between py-10 px-6">
            <nav aria-label="Sections">
                <ul className="flex flex-col gap-3">
                    {navLinks.map(({ id, label }) => (
                        <li key={id}>
                            <a
                                href={`#${id}`}
                                className={`block text-sm transition-colors duration-200 ${active === id
                                    ? "font-semibold brightness-110"
                                    : "opacity-40 hover:opacity-100"
                                    }`}
                            >
                                {label}
                            </a>
                        </li>
                    ))}
                </ul>
            </nav>

            <div className="flex flex-col gap-4 pb-32">
                <ThemeDrag />
                <LanguageSwitcher />
            </div>
        </aside>
    );
}
