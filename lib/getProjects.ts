import fs from "fs";
import path from "path";
import matter from "gray-matter";

export type Project = {
    slug: string;
    title: string;
    titleEn?: string;
    description: string;
    descriptionEn?: string;
    tags: string[];
    year: number;
    coverImage: string;
    role?: string;
    duration?: string;
    team?: string;
};

const PROJECTS_DIR = path.join(process.cwd(), "content", "projects");

export async function getProjects(): Promise<Project[]> {
    const files = fs.readdirSync(PROJECTS_DIR).filter((f) => f.endsWith(".mdx"));

    return files
        .map((filename) => {
            const slug = filename.replace(/\.mdx$/, "");
            const raw = fs.readFileSync(path.join(PROJECTS_DIR, filename), "utf-8");
            const { data } = matter(raw);

            return {
                slug,
                title: data.title as string,
                titleEn: (data.titleEn as string) ?? undefined,
                description: data.description as string,
                descriptionEn: (data.descriptionEn as string) ?? undefined,
                tags: (data.tags as string[]) ?? [],
                year: (data.year as number) ?? new Date().getFullYear(),
                coverImage: (() => {
                    const base = (data.coverImage as string) ?? "";
                    return base ? base + (base.includes("?") ? "&v=2" : "?v=2") : "";
                })(),
                role: (data.role as string) ?? undefined,
                duration: (data.duration as string) ?? undefined,
                team: (data.team as string) ?? undefined,
            };
        })
        .sort((a, b) => b.year - a.year);
}

export async function getProjectBySlug(
    slug: string
): Promise<{ meta: Project; content: string } | null> {
    const filePath = path.join(PROJECTS_DIR, `${slug}.mdx`);
    if (!fs.existsSync(filePath)) return null;

    const raw = fs.readFileSync(filePath, "utf-8");
    const { data, content } = matter(raw);

    return {
        meta: {
            slug,
            title: data.title as string,
            titleEn: (data.titleEn as string) ?? undefined,
            description: data.description as string,
            descriptionEn: (data.descriptionEn as string) ?? undefined,
            tags: (data.tags as string[]) ?? [],
            year: (data.year as number) ?? new Date().getFullYear(),
            coverImage: (() => {
                const base = (data.coverImage as string) ?? "";
                return base ? base + (base.includes("?") ? "&v=2" : "?v=2") : "";
            })(),
            role: (data.role as string) ?? undefined,
            duration: (data.duration as string) ?? undefined,
            team: (data.team as string) ?? undefined,
        },
        content,
    };
}
