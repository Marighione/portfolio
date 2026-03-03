"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { applyThemeFromPosition, clamp01 } from "@/lib/theme";

const STORAGE_KEY = "theme-drag-position";

export default function ThemeDrag() {
    const trackRef = useRef<HTMLDivElement>(null);
    const dragging = useRef(false);
    const [pos, setPos] = useState(0.82); // default: dark

    // Restore on mount
    useEffect(() => {
        const stored = localStorage.getItem(STORAGE_KEY);
        const initial = stored ? parseFloat(stored) : 0.82;
        const clamped = clamp01(Number.isFinite(initial) ? initial : 0.82);
        setPos(clamped);
        applyThemeFromPosition(clamped);
    }, []);

    const commit = useCallback((nextPos: number) => {
        const clamped = clamp01(nextPos);
        setPos(clamped);
        applyThemeFromPosition(clamped);
        localStorage.setItem(STORAGE_KEY, String(clamped));
    }, []);

    const posFromClientX = useCallback((clientX: number) => {
        const track = trackRef.current;
        if (!track) return pos;
        const { left, width } = track.getBoundingClientRect();
        return (clientX - left) / width;
    }, [pos]);

    const onPointerDown = useCallback((e: React.PointerEvent) => {
        e.currentTarget.setPointerCapture(e.pointerId);
        dragging.current = true;
        commit(posFromClientX(e.clientX));
    }, [commit, posFromClientX]);

    const onPointerMove = useCallback((e: React.PointerEvent) => {
        if (!dragging.current) return;
        commit(posFromClientX(e.clientX));
    }, [commit, posFromClientX]);

    const onPointerUp = useCallback(() => {
        dragging.current = false;
    }, []);

    const onKeyDown = useCallback((e: React.KeyboardEvent) => {
        const step = e.shiftKey ? 0.08 : 0.02;
        if (e.key === "ArrowRight" || e.key === "ArrowUp") {
            e.preventDefault();
            commit(pos + step);
        } else if (e.key === "ArrowLeft" || e.key === "ArrowDown") {
            e.preventDefault();
            commit(pos - step);
        } else if (e.key === "Home") {
            e.preventDefault();
            commit(0);
        } else if (e.key === "End") {
            e.preventDefault();
            commit(1);
        }
    }, [pos, commit]);

    const pct = pos * 100;

    return (
        <div className="w-full select-none">
            <div
                ref={trackRef}
                className="relative h-2 w-full rounded-full cursor-pointer"
                style={{
                    background:
                        "linear-gradient(to right," +
                        " hsl(45 25% 92%), hsl(35 35% 80%), hsl(20 50% 70%)," +
                        " hsl(320 45% 55%), hsl(260 35% 40%), hsl(250 22% 16%))",
                    boxShadow: "inset 0 0 0 1px var(--border)",
                }}
                onPointerDown={onPointerDown}
                onPointerMove={onPointerMove}
                onPointerUp={onPointerUp}
                role="presentation"
            >
                <div
                    role="slider"
                    aria-label="Tema y paleta"
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-valuenow={Math.round(pct)}
                    aria-valuetext={`${Math.round(pct)}%`}
                    tabIndex={0}
                    onKeyDown={onKeyDown}
                    className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 h-3.5 w-3.5 rounded-full outline-none transition-transform duration-75 active:scale-125 focus-visible:ring-2"
                    style={{
                        left: `${pct}%`,
                        backgroundColor: "var(--accent)",
                        boxShadow: "0 0 0 3px color-mix(in oklab, var(--bg) 70%, transparent)",
                    }}
                />
            </div>
        </div>
    );
}
