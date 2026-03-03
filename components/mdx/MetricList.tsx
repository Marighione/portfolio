import type { ReactNode } from "react";

export function MetricList({ children }: { children: ReactNode }) {
    return (
        <div
            className="rounded-2xl px-8 py-7 my-0 space-y-3"
            style={{
                background: "var(--surface)",
                borderColor: "var(--border)",
                border: "1px solid var(--border)",
            }}
        >
            {children}
        </div>
    );
}

export function Metric({ value, label }: { value: string; label: string }) {
    return (
        <div className="flex items-baseline gap-3">
            <span
                className="text-xl font-semibold tracking-tight"
                style={{ color: "var(--accent)" }}
            >
                {value}
            </span>
            <span
                className="text-sm leading-snug"
                style={{ color: "var(--text-muted)" }}
            >
                {label}
            </span>
        </div>
    );
}
