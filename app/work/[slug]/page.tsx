import { getProjectBySlug, getProjects } from "@/lib/getProjects";
import { notFound } from "next/navigation";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";

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

    return (
        <div className="min-h-screen bg-zinc-950 pt-24 pb-32">
            {/* Header */}
            <header className="max-w-3xl mx-auto px-6 mb-16">
                <Link
                    href="/#work"
                    className="inline-flex items-center gap-2 text-sm text-zinc-500 hover:text-zinc-300 transition-colors mb-10"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                    >
                        <line x1="19" y1="12" x2="5" y2="12" />
                        <polyline points="12 19 5 12 12 5" />
                    </svg>
                    All work
                </Link>

                <div className="flex flex-wrap gap-2 mb-4">
                    {project.meta.tags.map((tag) => (
                        <span
                            key={tag}
                            className="text-xs px-2.5 py-1 rounded-full border"
                            style={{ borderColor: "var(--color-accent)", color: "var(--color-accent)" }}
                        >
                            {tag}
                        </span>
                    ))}
                </div>

                <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-zinc-100 mb-4">
                    {project.meta.title}
                </h1>
                <p className="text-zinc-400 text-lg leading-relaxed">
                    {project.meta.description}
                </p>
                <p className="text-zinc-600 text-sm mt-2">{project.meta.year}</p>
            </header>

            {/* MDX content */}
            <article className="max-w-3xl mx-auto px-6 prose prose-invert prose-zinc prose-headings:font-bold prose-headings:tracking-tight prose-a:text-[var(--color-accent)] max-w-none">
                <MDXRemote source={project.content} />
            </article>
        </div>
    );
}
