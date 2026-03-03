"use client";

import { useLanguage } from "@/lib/i18n/LanguageContext";

export default function LanguageSwitcher() {
    const { locale, setLocale } = useLanguage();

    return (
        <div className="flex items-center gap-1 text-xs font-medium">
            <button
                aria-label="Cambiar a español"
                onClick={() => setLocale("es")}
                className={`transition-colors ${locale === "es"
                        ? "text-[color:var(--heading)]"
                        : "text-[color:var(--text-muted)] hover:text-[color:var(--heading)]"
                    }`}
            >
                ES
            </button>
            <span className="select-none text-[color:var(--text-muted)]">/</span>
            <button
                aria-label="Switch to English"
                onClick={() => setLocale("en")}
                className={`transition-colors ${locale === "en"
                        ? "text-[color:var(--heading)]"
                        : "text-[color:var(--text-muted)] hover:text-[color:var(--heading)]"
                    }`}
            >
                EN
            </button>
        </div>
    );
}
