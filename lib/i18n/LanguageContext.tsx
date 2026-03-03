"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import { es } from "@/lib/i18n/es";
import { en } from "@/lib/i18n/en";
import type { Dictionary } from "@/lib/i18n/es";

type Locale = "es" | "en";

interface LanguageContextValue {
    locale: Locale;
    t: Dictionary;
    setLocale: (l: Locale) => void;
}

const LanguageContext = createContext<LanguageContextValue>({
    locale: "es",
    t: es,
    setLocale: () => { },
});

export function LanguageProvider({ children }: { children: ReactNode }) {
    const [locale, setLocaleState] = useState<Locale>("es");
    const t = locale === "es" ? es : en;

    const setLocale = (l: Locale) => {
        setLocaleState(l);
        document.documentElement.lang = l;
    };

    return (
        <LanguageContext.Provider value={{ locale, t, setLocale }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    return useContext(LanguageContext);
}
