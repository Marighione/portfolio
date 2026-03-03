import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

const config: Config = {
    darkMode: "class",
    content: [
        "./app/**/*.{ts,tsx,mdx}",
        "./components/**/*.{ts,tsx}",
        "./content/**/*.mdx",
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ["var(--font-inter)", "system-ui", "sans-serif"],
            },
        },
    },
    plugins: [typography],
};

export default config;
