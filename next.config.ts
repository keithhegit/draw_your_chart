import type { NextConfig } from "next"

const nextConfig: NextConfig = {
    /* config options here */
    // output: "standalone",
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "pub-c98d5902eedf42f6a9765dfad981fd88.r2.dev",
            },
        ],
    },
}

export default nextConfig
