import fs from "fs";
import path from "path";
import matter from "gray-matter";

export type Project = {
    slug: string;
    title: string;
    description: string;
    tags: string[];
    year: number;
    coverImage: string;
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
                description: data.description as string,
                tags: (data.tags as string[]) ?? [],
                year: (data.year as number) ?? new Date().getFullYear(),
                coverImage: (data.coverImage as string) ?? "",
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
            description: data.description as string,
            tags: (data.tags as string[]) ?? [],
            year: (data.year as number) ?? new Date().getFullYear(),
            coverImage: (data.coverImage as string) ?? "",
        },
        content,
    };
}
