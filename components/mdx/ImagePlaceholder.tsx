/**
 * ImagePlaceholder — renders a blurred, frosted-glass rectangle
 * used as a stand-in for real project screenshots/mockups.
 * Aspect ratio: "video" (16/9) | "wide" (21/9) | "square" (1/1) | "tall" (3/4)
 */
type Props = {
    label?: string;
    aspect?: "video" | "wide" | "square" | "tall";
};

const aspectMap: Record<string, string> = {
    video: "16 / 9",
    wide: "21 / 9",
    square: "1 / 1",
    tall: "3 / 4",
};

export function ImagePlaceholder({ label = "[ Imagen ]", aspect = "video" }: Props) {
    return (
        <div
            className="relative w-full rounded-2xl overflow-hidden"
            style={{ aspectRatio: aspectMap[aspect] ?? "16 / 9" }}
        >
            {/* Frosted surface */}
            <div
                className="absolute inset-0"
                style={{ background: "var(--surface)" }}
            />

            {/* Subtle grid pattern for texture */}
            <div
                className="absolute inset-0 opacity-[0.07]"
                style={{
                    backgroundImage:
                        "linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)",
                    backgroundSize: "32px 32px",
                }}
            />

            {/* Soft central blur blob */}
            <div
                className="absolute inset-[20%] rounded-full opacity-20"
                style={{
                    background:
                        "radial-gradient(ellipse at center, color-mix(in srgb, var(--accent) 40%, transparent), transparent 70%)",
                    filter: "blur(40px)",
                }}
            />

            {/* Label */}
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                <svg
                    width="28"
                    height="28"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.2"
                    className="opacity-25"
                    style={{ color: "var(--text-muted)" }}
                    aria-hidden="true"
                >
                    <rect x="3" y="3" width="18" height="18" rx="2" />
                    <circle cx="8.5" cy="8.5" r="1.5" />
                    <polyline points="21 15 16 10 5 21" />
                </svg>
                <p
                    className="text-xs tracking-wide"
                    style={{ color: "var(--text-muted)", opacity: 0.45 }}
                >
                    {label}
                </p>
            </div>
        </div>
    );
}
