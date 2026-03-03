"use client";

import { useLanguage } from "@/lib/i18n/LanguageContext";
import PageContainer from "@/components/PageContainer";

type EducationItem = {
    degree: string;
    institution: string;
    period: string;
    details?: string[];
};

export default function Resume() {
    const { t } = useLanguage();
    const r = t.resume;

    return (
        <section id="resume" className="py-32">
            <PageContainer>
                <p className="text-xs tracking-[0.2em] uppercase mb-6" style={{ color: "var(--accent)" }}>
                    {r.label}
                </p>

                <h2 className="text-4xl md:text-5xl font-semibold tracking-tight mb-14 leading-tight">
                    {r.headline}
                </h2>

                <div className="space-y-12 mb-24">
                    {r.exp.map((job) => (
                        <div key={job.company} className="grid md:grid-cols-[220px_1fr] gap-6 md:gap-10">
                            <div>
                                <p className="font-semibold text-sm">{job.company}</p>
                                <p className="text-sm opacity-70 mt-1">{job.period}</p>
                            </div>

                            <div>
                                <h3 className="text-lg font-semibold mb-3">{job.role}</h3>
                                {job.description.split("\n\n").map((para, i) => (
                                    <p key={i} className="text-sm leading-relaxed opacity-80 mb-3 last:mb-0">
                                        {para}
                                    </p>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                <p className="text-xs tracking-[0.2em] uppercase mb-6" style={{ color: "var(--accent)" }}>
                    {r.edu_label}
                </p>

                <div className="space-y-16">
                    <div>
                        <h3 className="text-lg font-semibold mb-8">{r.edu_academic_label}</h3>
                        <div className="space-y-10">
                            {r.edu_academic.map((edu: EducationItem) => (
                                <div key={edu.degree} className="grid md:grid-cols-[220px_1fr] gap-6 md:gap-10">
                                    <div className="text-sm opacity-70">{edu.period}</div>
                                    <div>
                                        <p className="font-semibold">{edu.degree}</p>
                                        <p className="text-sm opacity-75">{edu.institution}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold mb-8">{r.edu_complementary_label}</h3>
                        <div className="space-y-10">
                            {r.edu_complementary.map((edu: EducationItem) => (
                                <div key={edu.degree} className="grid md:grid-cols-[220px_1fr] gap-6 md:gap-10">
                                    <div className="text-sm opacity-70">{edu.period}</div>
                                    <div>
                                        <p className="font-semibold">{edu.degree}</p>
                                        <p className="text-sm opacity-75">{edu.institution}</p>

                                        {edu.details?.length ? (
                                            <ul className="mt-3 space-y-1.5 text-sm opacity-80 list-disc pl-5">
                                                {edu.details.map((d) => (
                                                    <li key={d}>{d}</li>
                                                ))}
                                            </ul>
                                        ) : null}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </PageContainer>
        </section>
    );
}
