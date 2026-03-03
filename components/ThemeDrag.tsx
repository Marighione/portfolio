"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
    THEME_ORDER,
    applyThemeByIndex,
    clamp01,
    getInitialTheme,
    getThemeIndex,
} from "@/lib/theme";

export default function ThemeDrag() {
    const trackRef = useRef<HTMLDivElement>(null);
    const dragging = useRef(false);
    // Usamos un valor fijo para SSR y primer render del cliente
    // y luego sincronizamos con `localStorage` en un efecto.
    const [index, setIndex] = useState(() => getThemeIndex("dark_blue"));

    const themeCount = THEME_ORDER.length;

    // Sincroniza el tema inicial desde el cliente una vez hidratado
    useEffect(() => {
        const initialId = getInitialTheme();
        const idx = getThemeIndex(initialId);
        setIndex(idx);
        applyThemeByIndex(idx);
    }, []);

    const commitIndex = useCallback(
        (nextIndex: number) => {
            const clampedIndex = Math.min(
                themeCount - 1,
                Math.max(0, Math.round(nextIndex)),
            );
            setIndex(clampedIndex);
            applyThemeByIndex(clampedIndex);
        },
        [themeCount],
    );

    const indexFromClientY = useCallback(
        (clientY: number) => {
            const track = trackRef.current;
            if (!track) return index;
            const { top, height } = track.getBoundingClientRect();
            const relative = clamp01((clientY - top) / height);
            const rawIndex = relative * (themeCount - 1);
            return rawIndex;
        },
        [index, themeCount],
    );

    const onPointerDown = useCallback(
        (e: React.PointerEvent<HTMLDivElement>) => {
            e.preventDefault();
            e.currentTarget.setPointerCapture(e.pointerId);
            dragging.current = true;
            const next = indexFromClientY(e.clientY);
            commitIndex(next);
        },
        [commitIndex, indexFromClientY],
    );

    const onPointerMove = useCallback(
        (e: React.PointerEvent<HTMLDivElement>) => {
            if (!dragging.current) return;
            const next = indexFromClientY(e.clientY);
            commitIndex(next);
        },
        [commitIndex, indexFromClientY],
    );

    const onPointerUp = useCallback(() => {
        dragging.current = false;
    }, []);

    const onKeyDown = useCallback(
        (e: React.KeyboardEvent<HTMLButtonElement>) => {
            if (e.key === "ArrowUp") {
                e.preventDefault();
                commitIndex(index - 1);
            } else if (e.key === "ArrowDown") {
                e.preventDefault();
                commitIndex(index + 1);
            }
        },
        [commitIndex, index],
    );

    const pct = themeCount > 1 ? (index / (themeCount - 1)) * 100 : 0;

    return (
        <div className="w-full select-none flex justify-center">
            <div
                ref={trackRef}
                className="relative h-40 w-6 rounded-full cursor-pointer flex items-stretch justify-center"
                style={{
                    backgroundColor: "var(--surface)",
                    boxShadow: "inset 0 0 0 1px var(--border)",
                }}
                onPointerDown={onPointerDown}
                onPointerMove={onPointerMove}
                onPointerUp={onPointerUp}
                onPointerCancel={onPointerUp}
                onPointerLeave={onPointerUp}
                role="presentation"
            >
                {THEME_ORDER.map((_, i) => {
                    const dotPct =
                        themeCount > 1 ? (i / (themeCount - 1)) * 100 : 0;
                    const isActive = i === index;
                    return (
                        <span
                            key={i}
                            className="pointer-events-none absolute left-1/2 -translate-x-1/2 rounded-full"
                            style={{
                                top: `${dotPct}%`,
                                width: isActive ? 6 : 4,
                                height: isActive ? 6 : 4,
                                backgroundColor: "var(--border)",
                                opacity: isActive ? 1 : 0.55,
                                transform: "translate(-50%, -50%)",
                            }}
                        />
                    );
                })}

                <button
                    type="button"
                    className="theme-slider-knob pointer-events-auto absolute left-1/2 -translate-x-1/2 rounded-full border shadow-sm outline-none focus-visible:ring-2"
                    role="slider"
                    aria-label="Tema y paleta"
                    aria-orientation="vertical"
                    aria-valuemin={0}
                    aria-valuemax={themeCount - 1}
                    aria-valuenow={index}
                    aria-valuetext={THEME_ORDER[index]}
                    tabIndex={0}
                    onKeyDown={onKeyDown}
                    style={{
                        top: `${pct}%`,
                        width: 16,
                        height: 16,
                        transform: "translate(-50%, -50%)",
                        backgroundColor: "var(--accent)",
                        borderColor: "var(--border)",
                        boxShadow:
                            "0 0 0 3px color-mix(in oklab, var(--bg) 70%, transparent)",
                    }}
                />
            </div>
        </div>
    );
}
