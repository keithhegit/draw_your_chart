import { GoogleAnalytics } from "@next/third-parties/google"
import type { Metadata, Viewport } from "next"
import { JetBrains_Mono, Plus_Jakarta_Sans } from "next/font/google"
import { DiagramProvider } from "@/contexts/diagram-context"

import "./globals.css"

const plusJakarta = Plus_Jakarta_Sans({
    variable: "--font-sans",
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
})

const jetbrainsMono = JetBrains_Mono({
    variable: "--font-mono",
    subsets: ["latin"],
    weight: ["400", "500"],
})

export const viewport: Viewport = {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
}

export const metadata: Metadata = {
    title: "Draw_Your_Chart - AI-Powered Diagram Generator",
    description:
        "Create AWS architecture diagrams, flowcharts, and technical diagrams using AI. Free online tool integrating draw.io with AI assistance for professional diagram creation.",
    keywords: [
        "AI diagram generator",
        "AWS architecture",
        "flowchart creator",
        "draw.io",
        "AI drawing tool",
        "technical diagrams",
        "diagram automation",
        "free diagram generator",
        "online diagram maker",
    ],
    authors: [{ name: "Draw_Your_Chart" }],
    creator: "Draw_Your_Chart",
    publisher: "Draw_Your_Chart",
    metadataBase: new URL("https://draw-your-chart.pages.dev"),
    openGraph: {
        title: "Draw_Your_Chart - AI Diagram Generator",
        description:
            "Create professional diagrams with AI assistance. Supports AWS architecture, flowcharts, and more.",
        type: "website",
        url: "https://draw-your-chart.pages.dev",
        siteName: "Draw_Your_Chart",
        locale: "en_US",
        images: [
            {
                url: "https://pub-c98d5902eedf42f6a9765dfad981fd88.r2.dev/Icon/draw-chart-icon.png",
                width: 1200,
                height: 630,
                alt: "Draw_Your_Chart - AI-powered diagram creation tool",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Draw_Your_Chart - AI Diagram Generator",
        description:
            "Create professional diagrams with AI assistance. Free, no login required.",
        images: ["https://pub-c98d5902eedf42f6a9765dfad981fd88.r2.dev/Icon/draw-chart-icon.png"],
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
        },
    },
    icons: {
        icon: "https://pub-c98d5902eedf42f6a9765dfad981fd88.r2.dev/Icon/draw-chart-icon.png",
    },
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        name: "Draw_Your_Chart",
        applicationCategory: "DesignApplication",
        operatingSystem: "Web Browser",
        description:
            "AI-powered diagram generator with targeted XML editing capabilities that integrates with draw.io for creating AWS architecture diagrams, flowcharts, and technical diagrams. Features diagram history, multi-provider AI support, and real-time collaboration.",
        url: "https://draw-your-chart.pages.dev",
        offers: {
            "@type": "Offer",
            price: "0",
            priceCurrency: "USD",
        },
    }

    return (
        <html lang="en" suppressHydrationWarning>
            <head>
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
                />
            </head>
            <body
                className={`${plusJakarta.variable} ${jetbrainsMono.variable} antialiased`}
            >
                <DiagramProvider>{children}</DiagramProvider>
            </body>
            {process.env.NEXT_PUBLIC_GA_ID && (
                <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
            )}
        </html>
    )
}
