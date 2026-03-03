"use client";

import type { ReactNode } from "react";

type Props = {
    children: ReactNode;
    className?: string;
};

export default function PageContainer({ children, className = "" }: Props) {
    return (
        <div className={`mx-auto max-w-[1200px] px-8 md:px-12 ${className}`}>
            {children}
        </div>
    );
}
