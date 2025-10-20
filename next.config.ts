import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["raw.githubusercontent.com"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "projectpokemon.org",
        pathname: "/images/**",
      },
     ] // ✅ permite imagens da PokéAPI
  },
};


export default nextConfig;

