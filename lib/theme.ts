"use client";

/** Temas de billysweeney.com: theme--00 (negro) a theme--16 (blanco). */
export type ThemeId =
    | "theme--00"
    | "theme--01"
    | "theme--02"
    | "theme--03"
    | "theme--04"
    | "theme--05"
    | "theme--06"
    | "theme--07"
    | "theme--08"
    | "theme--09"
    | "theme--10"
    | "theme--11"
    | "theme--12"
    | "theme--13"
    | "theme--14"
    | "theme--15"
    | "theme--16";

/** Orden: más oscuro (arriba del slider) → más claro (abajo). Paletas de billysweeney.com. */
export const THEME_ORDER: ThemeId[] = [
    "theme--00",
    "theme--01",
    "theme--02",
    "theme--03",
    "theme--04",
    "theme--05",
    "theme--06",
    "theme--07",
    "theme--08",
    "theme--09",
    "theme--10",
    "theme--11",
    "theme--12",
    "theme--13",
    "theme--14",
    "theme--15",
    "theme--16",
];

const STORAGE_KEY = "theme";

export const clamp01 = (n: number) => Math.min(1, Math.max(0, n));

export function applyTheme(id: ThemeId) {
    if (typeof document === "undefined") return;
    const body = document.body;
    const root = document.documentElement;

    // Quitar cualquier clase theme--* y aplicar la nueva
    const rest = body.className
        .split(/\s+/)
        .filter((c) => c && !c.startsWith("theme--"));
    body.className = [...rest, id].filter(Boolean).join(" ");

    const idx = THEME_ORDER.indexOf(id);
    root.classList.toggle("dark", idx <= 8);

    try {
        window.localStorage.setItem(STORAGE_KEY, id);
    } catch {
        // localStorage puede no estar disponible
    }
}

export function getInitialTheme(): ThemeId {
    if (typeof window === "undefined") {
        return "theme--00";
    }

    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored && (THEME_ORDER as string[]).includes(stored)) {
        return stored as ThemeId;
    }

    return "theme--00";
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
