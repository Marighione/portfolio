"use client";

export type ThemeId =
    | "black"
    | "dark_teal"
    | "dark_navy"
    | "dark_blue"
    | "purple"
    | "pink"
    | "brown"
    | "beige"
    | "olive"
    | "sage"
    | "mint"
    | "light_blue"
    | "very_light"
    | "white";

/**
 * Orden de temas: más oscuro (arriba del slider) → más claro (abajo).
 * Comportamiento inspirado en billysweeney.com: arrastrar o scroll sobre el slider.
 * Para usar las paletas exactas de esa web, inspeccionar en DevTools y copiar --bg, --text, --accent.
 */
export const THEME_ORDER: ThemeId[] = [
    "black",
    "dark_navy",
    "dark_blue",
    "dark_teal",
    "purple",
    "pink",
    "brown",
    "olive",
    "sage",
    "mint",
    "beige",
    "light_blue",
    "very_light",
    "white",
];

/** Progresión mínima estilo Billy (solo 6 pasos negro → blanco). Sustituir THEME_ORDER por esta constante si se prefiere. */
export const BILLY_STYLE_ORDER: ThemeId[] = [
    "black",
    "dark_navy",
    "dark_blue",
    "light_blue",
    "very_light",
    "white",
];

const STORAGE_KEY = "theme";

const DARK_THEMES = new Set<ThemeId>([
    "black",
    "dark_teal",
    "dark_navy",
    "dark_blue",
    "purple",
    "pink",
    "brown",
    "olive",
]);

export const clamp01 = (n: number) => Math.min(1, Math.max(0, n));

const LEGACY_KEY = "portfolio-theme";

const LEGACY_TO_THEME: Record<string, ThemeId> = {
    dark: "dark_blue",
    black: "black",
    navy: "dark_navy",
    teal: "dark_teal",
    purple: "purple",
    rose: "pink",
    brown: "brown",
    beige: "beige",
    olive: "olive",
    mint: "mint",
    light: "very_light",
    white: "white",
};

export function applyTheme(id: ThemeId) {
    if (typeof document === "undefined") return;
    const root = document.documentElement;

    root.dataset.theme = id;
    root.classList.toggle("dark", DARK_THEMES.has(id));

    try {
        window.localStorage.setItem(STORAGE_KEY, id);
    } catch {
        // localStorage may be unavailable; ignore
    }
}

export function getInitialTheme(): ThemeId {
    if (typeof window === "undefined") {
        return "dark_blue";
    }

    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored && (THEME_ORDER as string[]).includes(stored)) {
        return stored as ThemeId;
    }

    const legacy = window.localStorage.getItem(LEGACY_KEY);
    if (legacy && LEGACY_TO_THEME[legacy]) {
        return LEGACY_TO_THEME[legacy];
    }

    return "dark_blue";
}

export function getThemeIndex(id: ThemeId): number {
    const idx = THEME_ORDER.indexOf(id);
    return idx === -1 ? 0 : idx;
}

export function getThemeAtIndex(idx: number): ThemeId {
    const clamped = Math.min(THEME_ORDER.length - 1, Math.max(0, idx));
    return THEME_ORDER[clamped];
}

export function applyThemeByIndex(idx: number): ThemeId {
    const id = getThemeAtIndex(idx);
    applyTheme(id);
    return id;
}
