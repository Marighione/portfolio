"use client";

import { create } from "zustand";

const ACCENT_IDS = ["blue", "coral", "emerald", "amber", "violet"] as const;
export type AccentId = (typeof ACCENT_IDS)[number];

interface ThemeStore {
    accent: AccentId;
    setAccent: (id: AccentId) => void;
}

export const useThemeStore = create<ThemeStore>((set) => ({
    accent: "blue",
    setAccent: (id) => {
        document.documentElement.dataset.accent = id;
        set({ accent: id });
    },
}));
