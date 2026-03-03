import { getProjectBySlug, getProjects } from "@/lib/getProjects";
import { notFound } from "next/navigation";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import { ImagePlaceholder } from "@/components/mdx/ImagePlaceholder";
import { ImageGrid } from "@/components/mdx/ImageGrid";
import { MetricList, Metric } from "@/components/mdx/MetricList";

const mdxComponents = { ImagePlaceholder, ImageGrid, MetricList, Metric };

export async function generateStaticParams() {
    const projects = await getProjects();
    return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const project = await getProjectBySlug(slug);
    if (!project) return {};
    return {
        title: `${project.meta.title} — Case Study`,
        description: project.meta.description,
    };
}

export default async function WorkPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const project = await getProjectBySlug(slug);
    if (!project) notFound();

    const { meta, content } = project;

    const metaItems = [
        { label: "Año", value: String(meta.year) },
        ...(meta.role ? [{ label: "Rol", value: meta.role }] : []),
        ...(meta.duration ? [{ label: "Duración", value: meta.duration }] : []),
        ...(meta.team ? [{ label: "Equipo", value: meta.team }] : []),
    ];

    // Find next project for CTA
    const allProjects = await getProjects();
    const currentIndex = allProjects.findIndex((p) => p.slug === slug);
    const nextProject = allProjects[(currentIndex + 1) % allProjects.length];

    return (
        <div className="min-h-screen" style={{ background: "var(--bg)" }}>

            {/* ── Sticky top bar ── */}
            <div
                className="sticky top-0 z-20 border-b"
                style={{ borderColor: "var(--border)", background: "var(--bg)" }}
            >
                <div className="mx-auto max-w-[1200px] px-8 md:px-12 py-4 flex items-center justify-between">
                    <Link
                        href="/#work"
                        className="inline-flex items-center gap-2 text-sm transition-opacity hover:opacity-70"
                        style={{ color: "var(--text-muted)" }}
                    >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                            stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                            strokeLinejoin="round" aria-hidden="true">
                            <line x1="19" y1="12" x2="5" y2="12" />
                            <polyline points="12 19 5 12 12 5" />
                        </svg>
                        Volver a proyectos
                    </Link>

                    {meta.tags.length > 0 && (
                        <div className="flex gap-2">
                            {meta.tags.map((tag) => (
                                <span
                                    key={tag}
                                    className="text-xs px-2.5 py-1 rounded-full border"
                                    style={{ borderColor: "var(--accent)", color: "var(--accent)" }}
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* ── Hero section ── */}
            <div className="mx-auto max-w-[1200px] px-8 md:px-12 pt-20 pb-16">

                {/* Label */}
                <p
                    className="text-xs tracking-[0.2em] uppercase mb-5"
                    style={{ color: "var(--accent)" }}
                >
                    Case Study
                </p>

                {/* Title */}
                <h1
                    className="text-4xl md:text-6xl font-semibold tracking-tight leading-tight mb-8"
                    style={{ color: "var(--heading)" }}
                >
                    {meta.title}
                </h1>

                {/* Meta row */}
                {metaItems.length > 0 && (
                    <div
                        className="flex flex-wrap gap-x-10 gap-y-3 mb-8 pb-8 border-b"
                        style={{ borderColor: "var(--border)" }}
                    >
                        {metaItems.map(({ label, value }) => (
                            <div key={label}>
                                <p className="text-xs uppercase tracking-widest mb-1"
                                    style={{ color: "var(--text-muted)" }}>
                                    {label}
                                </p>
                                <p className="text-sm font-medium"
                                    style={{ color: "var(--text)" }}>
                                    {value}
                                </p>
                            </div>
                        ))}
                    </div>
                )}

                {/* Description */}
                <p
                    className="text-lg md:text-xl leading-relaxed max-w-2xl"
                    style={{ color: "var(--text-muted)" }}
                >
                    {meta.description}
                </p>
            </div>

            {/* ── MDX body ── */}
            <article className="mx-auto max-w-[1200px] px-8 md:px-12 pb-8 case-study-prose">
                <MDXRemote source={content} components={mdxComponents} />
            </article>

            {/* ── Next project CTA ── */}
            {nextProject && nextProject.slug !== slug && (
                <div
                    className="border-t mt-16"
                    style={{ borderColor: "var(--border)" }}
                >
                    <div className="mx-auto max-w-[1200px] px-8 md:px-12 py-20 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                        <div>
                            <p className="text-xs uppercase tracking-widest mb-2"
                                style={{ color: "var(--text-muted)" }}>
                                Siguiente proyecto
                            </p>
                            <p className="text-2xl font-semibold tracking-tight"
                                style={{ color: "var(--heading)" }}>
                                {nextProject.title}
                            </p>
                        </div>
                        <Link
                            href={`/work/${nextProject.slug}`}
                            className="inline-flex items-center gap-3 text-sm font-medium transition-opacity hover:opacity-70 shrink-0"
                            style={{ color: "var(--accent)" }}
                        >
                            Ver caso de estudio
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                                stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                strokeLinejoin="round" aria-hidden="true">
                                <line x1="5" y1="12" x2="19" y2="12" />
                                <polyline points="12 5 19 12 12 19" />
                            </svg>
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
}
