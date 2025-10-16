import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["raw.githubusercontent.com"], // ✅ permite imagens da PokéAPI
  },
};


export default nextConfig;

