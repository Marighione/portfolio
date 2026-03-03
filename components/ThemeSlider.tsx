"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const STORAGE_KEY = "theme-hue";
const DEFAULT_HUE = 220; // blue-ish default

/** Computes WCAG-compatible foreground for the accent hue */
function accentForeground(l: number): string {
    return l > 55 ? "hsl(0 0% 8%)" : "hsl(0 0% 98%)";
}

/** Apply accent palette to :root CSS variables */
function applyHue(hue: number): void {
    const root = document.documentElement;
    root.style.setProperty("--accent-hue", String(hue));

    // Fallback/Legacy variables for components not yet using the hue-based system
    root.style.setProperty("--color-accent", `hsl(${hue} 75% 58%)`);
    root.style.setProperty("--color-accent-subtle", `hsl(${hue} 75% 58% / 0.15)`);
    root.style.setProperty("--color-accent-fg", accentForeground(58));
}

/** Convert x position inside track to hue 0–360 */
function xToHue(x: number, width: number): number {
    return Math.round(Math.min(Math.max(x / width, 0), 1) * 360);
}

export default function ThemeSlider() {
    const trackRef = useRef<HTMLDivElement>(null);
    const dragging = useRef(false);
    const [hue, setHue] = useState<number>(DEFAULT_HUE);

    // Restore from localStorage on mount
    useEffect(() => {
        const stored = localStorage.getItem(STORAGE_KEY);
        const initial = stored ? parseInt(stored, 10) : DEFAULT_HUE;
        setHue(initial);
        applyHue(initial);
    }, []);

    const commit = useCallback((newHue: number) => {
        setHue(newHue);
        applyHue(newHue);
        localStorage.setItem(STORAGE_KEY, String(newHue));
    }, []);

    const hueFromEvent = useCallback((clientX: number): number => {
        const track = trackRef.current;
        if (!track) return 0;
        const { left, width } = track.getBoundingClientRect();
        return xToHue(clientX - left, width);
    }, []);

    // ── Pointer handlers ────────────────────────────────────
    const onPointerDown = useCallback((e: React.PointerEvent) => {
        e.currentTarget.setPointerCapture(e.pointerId);
        dragging.current = true;
        commit(hueFromEvent(e.clientX));
    }, [commit, hueFromEvent]);

    const onPointerMove = useCallback((e: React.PointerEvent) => {
        if (!dragging.current) return;
        commit(hueFromEvent(e.clientX));
    }, [commit, hueFromEvent]);

    const onPointerUp = useCallback(() => {
        dragging.current = false;
    }, []);

    // ── Keyboard handler ─────────────────────────────────────
    const onKeyDown = useCallback((e: React.KeyboardEvent) => {
        const step = e.shiftKey ? 10 : 1;
        if (e.key === "ArrowRight" || e.key === "ArrowUp") {
            e.preventDefault();
            commit(Math.min(hue + step, 360));
        } else if (e.key === "ArrowLeft" || e.key === "ArrowDown") {
            e.preventDefault();
            commit(Math.max(hue - step, 0));
        } else if (e.key === "Home") {
            e.preventDefault();
            commit(0);
        } else if (e.key === "End") {
            e.preventDefault();
            commit(360);
        }
    }, [hue, commit]);

    const pct = (hue / 360) * 100;

    return (
        <div className="w-full" title={`Hue: ${hue}°`}>
            {/* Track */}
            <div
                ref={trackRef}
                className="relative h-1 w-full cursor-pointer rounded-full"
                style={{
                    background:
                        "linear-gradient(to right," +
                        " hsl(0,75%,58%), hsl(40,75%,58%), hsl(80,75%,58%)," +
                        " hsl(130,75%,58%), hsl(180,75%,58%), hsl(220,75%,58%)," +
                        " hsl(270,75%,58%), hsl(310,75%,58%), hsl(360,75%,58%))",
                }}
                onPointerDown={onPointerDown}
                onPointerMove={onPointerMove}
                onPointerUp={onPointerUp}
                // a11y on the track itself for click-to-set
                role="presentation"
            >
                {/* Handle */}
                <div
                    role="slider"
                    aria-label="Accent color hue"
                    aria-valuemin={0}
                    aria-valuemax={360}
                    aria-valuenow={hue}
                    aria-valuetext={`Hue ${hue}°`}
                    tabIndex={0}
                    onKeyDown={onKeyDown}
                    className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 h-3 w-3 rounded-full border border-white/20 shadow-sm outline-none focus-visible:ring-2 focus-visible:ring-white/40 transition-transform duration-75 active:scale-125"
                    style={{
                        left: `${pct}%`,
                        backgroundColor: `hsl(${hue}, 75%, 58%)`,
                    }}
                />
            </div>
        </div>
    );
}
