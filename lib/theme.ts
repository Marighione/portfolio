"use client";

export type HslColor = {
    h: number;
    s: number;
    l: number;
};

const clamp = (min: number, max: number, value: number) =>
    Math.min(max, Math.max(min, value));

export const clamp01 = (n: number) => clamp(0, 1, n);

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

const LIGHT_BG: HslColor = { h: 45, s: 10, l: 94 };
const DARK_BG: HslColor = { h: 230, s: 12, l: 10 };

function hslToRgb(h: number, s: number, l: number) {
    s /= 100;
    l /= 100;
    const c = (1 - Math.abs(2 * l - 1)) * s;
    const hh = h / 60;
    const x = c * (1 - Math.abs((hh % 2) - 1));
    let r1 = 0, g1 = 0, b1 = 0;
    if (hh >= 0 && hh < 1) { r1 = c; g1 = x; }
    else if (hh >= 1 && hh < 2) { r1 = x; g1 = c; }
    else if (hh >= 2 && hh < 3) { g1 = c; b1 = x; }
    else if (hh >= 3 && hh < 4) { g1 = x; b1 = c; }
    else if (hh >= 4 && hh < 5) { r1 = x; b1 = c; }
    else if (hh >= 5 && hh <= 6) { r1 = c; b1 = x; }
    const m = l - c / 2;
    return { r: (r1 + m) * 255, g: (g1 + m) * 255, b: (b1 + m) * 255 };
}

function relativeLuminance(r: number, g: number, b: number) {
    const toLinear = (v: number) => {
        const c = v / 255;
        return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    };
    return 0.2126 * toLinear(r) + 0.7152 * toLinear(g) + 0.0722 * toLinear(b);
}

export function contrastRatio(fg: HslColor, bg: HslColor) {
    const fgRgb = hslToRgb(fg.h, fg.s, fg.l);
    const bgRgb = hslToRgb(bg.h, bg.s, bg.l);
    const L1 = relativeLuminance(fgRgb.r, fgRgb.g, fgRgb.b);
    const L2 = relativeLuminance(bgRgb.r, bgRgb.g, bgRgb.b);
    const [maxL, minL] = L1 > L2 ? [L1, L2] : [L2, L1];
    return (maxL + 0.05) / (minL + 0.05);
}

export function ensureContrast(
    fgCandidate: HslColor,
    bg: HslColor,
    minRatio = 4.5,
): HslColor {
    const bgIsLight = bg.l >= 50;
    let fg: HslColor = { ...fgCandidate };
    const direction = bgIsLight ? -1 : 1;
    for (let i = 0; i < 32; i++) {
        if (contrastRatio(fg, bg) >= minRatio) break;
        fg = { ...fg, l: clamp(0, 100, fg.l + direction * 2.5) };
    }
    return fg;
}

const hslToCss = (c: HslColor) => `hsl(${c.h} ${c.s}% ${c.l}%)`;
const hslWithAlpha = (c: HslColor, alpha: number) =>
    `hsl(${c.h} ${c.s}% ${c.l}% / ${alpha})`;

export function applyThemeFromPosition(pos: number) {
    const p = clamp01(pos);
    const root = document.documentElement;
    const bg: HslColor = {
        h: lerp(LIGHT_BG.h, DARK_BG.h, p),
        s: lerp(LIGHT_BG.s, DARK_BG.s, p),
        l: lerp(LIGHT_BG.l, DARK_BG.l, p),
    };
    const surface: HslColor = {
        h: bg.h, s: bg.s,
        l: clamp(0, 100, bg.l + (p < 0.5 ? -4 : 4)),
    };
    const border: HslColor = {
        h: bg.h, s: clamp(0, 100, bg.s + 4),
        l: clamp(0, 100, bg.l + (p < 0.5 ? -12 : 12)),
    };
    const textBaseCandidate: HslColor = { h: bg.h, s: 6, l: bg.l >= 60 ? 12 : 90 };
    const text = ensureContrast(textBaseCandidate, bg, 4.5);
    const headingCandidate: HslColor = { h: bg.h, s: 8, l: bg.l >= 60 ? 10 : 94 };
    const heading = ensureContrast(headingCandidate, bg, 4.5);
    const mutedCandidate: HslColor = { h: bg.h, s: 6, l: bg.l >= 60 ? 32 : 72 };
    const textMuted = ensureContrast(mutedCandidate, bg, 4.5);
    const midBlend = 1 - Math.abs(p - 0.5) * 2;
    const accent: HslColor = {
        h: lerp(330, 260, p),
        s: lerp(48, 62, midBlend),
        l: lerp(52, 58, 1 - midBlend),
    };
    const imageFilter = `brightness(${lerp(1, 0.94, p)}) contrast(${lerp(1, 1.05, p)}) saturate(${lerp(0.96, 0.9, p)})`;
    root.style.setProperty("--bg", hslToCss(bg));
    root.style.setProperty("--surface", hslToCss(surface));
    root.style.setProperty("--border", hslToCss(border));
    root.style.setProperty("--text", hslToCss(text));
    root.style.setProperty("--text-muted", hslToCss(textMuted));
    root.style.setProperty("--heading", hslToCss(heading));
    root.style.setProperty("--accent", hslToCss(accent));
    root.style.setProperty("--accent-subtle", hslWithAlpha(accent, 0.16));
    root.style.setProperty("--image-filter", imageFilter);
    root.style.setProperty("--fg", hslToCss(heading));
    root.style.setProperty("--muted", hslToCss(textMuted));
    root.classList.toggle("dark", p > 0.55);
}
