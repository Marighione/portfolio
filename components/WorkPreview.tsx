"use client";

import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { useEffect, useState } from "react";
import type { Project } from "@/lib/getProjects";
import PageContainer from "@/components/PageContainer";

export default function WorkPreview() {
    const { t } = useLanguage();
    const [projects, setProjects] = useState<Project[]>([]);

    useEffect(() => {
        fetch("/api/projects")
            .then((r) => r.json())
            .then((data: Project[]) => setProjects(data))
            .catch(() => setProjects([]));
    }, []);

    return (
        <section id="work" className="py-32">
            <PageContainer>
                <p
                    className="text-xs tracking-[0.2em] uppercase mb-6"
                    style={{ color: "var(--accent)" }}
                >
                    {t.work.label}
                </p>

                <h2 className="text-4xl md:text-5xl font-semibold tracking-tight mb-14 leading-tight">
                    {t.work.headline}
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12">
                    {projects.map((project) => (
                        <Link
                            key={project.slug}
                            href={`/work/${project.slug}`}
                            className="group block"
                        >
                            <div
                                className="rounded-2xl overflow-hidden border transition-transform duration-300 group-hover:-translate-y-0.5"
                                style={{
                                    borderColor: "var(--border)",
                                    backgroundColor: "var(--surface)",
                                }}
                            >
                                <div className="relative w-full aspect-[16/9] overflow-hidden rounded-2xl">
                                    <Image
                                        src={project.coverImage}
                                        alt={project.title}
                                        fill
                                        sizes="(max-width: 1024px) 100vw, 33vw"
                                        className="object-cover object-center transition-transform duration-500 group-hover:scale-[1.03]"
                                        style={{ filter: "var(--image-filter)" }}
                                    />
                                </div>
                            </div>

                            <div className="pt-6">
                                <h3 className="text-xl font-semibold tracking-tight">
                                    {project.title}
                                </h3>
                                <p className="mt-2 text-sm leading-relaxed opacity-80">
                                    {project.description}
                                </p>
                            </div>
                        </Link>
                    ))}
                </div>
            </PageContainer>
        </section>
    );
}
