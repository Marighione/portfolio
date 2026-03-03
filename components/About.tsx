"use client";

import { useLanguage } from "@/lib/i18n/LanguageContext";
import PageContainer from "@/components/PageContainer";

export default function About() {
    const { t } = useLanguage();
    const a = t.about;

    return (
        <section id="about" className="py-32">
            <PageContainer>
                <p
                    className="text-xs tracking-[0.2em] uppercase mb-6"
                    style={{ color: "var(--accent)" }}
                >
                    {a.label}
                </p>

                <h2 className="text-4xl md:text-5xl font-semibold tracking-tight mb-12 leading-tight">
                    {a.headline1}
                    <br />
                    {a.headline2}
                </h2>

                <div className="grid md:grid-cols-[1fr_320px] gap-12 md:gap-20 items-start">
                    <div className="space-y-8">
                        <p className="text-base md:text-lg leading-relaxed opacity-90">
                            {a.p1}
                        </p>

                        {a.p2.split("\n\n").map((para, i) => (
                            <p key={i} className="text-base md:text-lg leading-relaxed opacity-80">
                                {para}
                            </p>
                        ))}
                    </div>

                    <aside
                        className="sticky top-28 h-fit rounded-2xl border px-6 py-6"
                        style={{
                            borderColor: "var(--border)",
                            backgroundColor: "var(--surface)",
                        }}
                    >
                        <div className="space-y-6">
                            <div>
                                <h3 className="text-xs font-semibold uppercase tracking-[0.2em] mb-2" style={{ color: "var(--accent)" }}>
                                    {a.edu_label}
                                </h3>
                                <p className="text-sm opacity-85">{a.edu_val}</p>
                            </div>

                            <div className="h-px w-full" style={{ backgroundColor: "var(--border)" }} />

                            <div>
                                <h3 className="text-xs font-semibold uppercase tracking-[0.2em] mb-2" style={{ color: "var(--accent)" }}>
                                    {a.approach_label}
                                </h3>
                                <p className="text-sm opacity-85">{a.approach_val}</p>
                            </div>

                            <div className="h-px w-full" style={{ backgroundColor: "var(--border)" }} />

                            <div>
                                <h3 className="text-xs font-semibold uppercase tracking-[0.2em] mb-2" style={{ color: "var(--accent)" }}>
                                    {a.langs_label}
                                </h3>
                                <p className="text-sm opacity-85">{a.langs_val}</p>
                            </div>
                        </div>
                    </aside>
                </div>
            </PageContainer>
        </section>
    );
}
