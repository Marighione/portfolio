import type { ReactNode } from "react";

type Props = {
    children: ReactNode;
    cols?: 2 | 3;
};

export function ImageGrid({ children, cols = 2 }: Props) {
    return (
        <div
            className={`grid gap-4 my-0 ${cols === 3 ? "grid-cols-3" : "grid-cols-2"}`}
        >
            {children}
        </div>
    );
}
