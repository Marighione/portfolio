import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const withMDX = createMDX({
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
  },
});

const nextConfig: NextConfig = {
  pageExtensions: ["ts", "tsx", "md", "mdx"],
  images: {
    localPatterns: [
      { pathname: "/images/**" },
      { pathname: "/*" }, // archivos en la raíz de public (ej. foto_sin_fondo1.png)
    ],
  },
};

export default withMDX(nextConfig);
