import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Draw_Your_Chart',
    short_name: 'Draw_Your_Chart',
    description: 'Create AWS architecture diagrams, flowcharts, and technical diagrams using AI. Free online tool integrating draw.io with AI assistance for professional diagram creation.',
    start_url: '/',
    display: 'standalone',
    background_color: '#f9fafb',
    theme_color: '#171d26',
    icons: [
      {
        src: 'https://pub-c98d5902eedf42f6a9765dfad981fd88.r2.dev/Icon/draw-chart-icon.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: 'https://pub-c98d5902eedf42f6a9765dfad981fd88.r2.dev/Icon/draw-chart-icon.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any',
      },
    ],
  }
}
