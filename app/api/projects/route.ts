import { getProjects } from "@/lib/getProjects";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
    const projects = await getProjects();
    return NextResponse.json(projects);
}
