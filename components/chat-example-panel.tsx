"use client"

import {
    Palette,
    Zap,
} from "lucide-react"

interface ExampleCardProps {
    icon: React.ReactNode
    title: string
    description: string
    onClick: () => void
    isNew?: boolean
}

function ExampleCard({
    icon,
    title,
    description,
    onClick,
    isNew,
}: ExampleCardProps) {
    return (
        <button
            onClick={onClick}
            className={`group w-full text-left p-4 rounded-xl border bg-card hover:bg-accent/50 hover:border-primary/30 transition-all duration-200 hover:shadow-sm ${
                isNew
                    ? "border-primary/40 ring-1 ring-primary/20"
                    : "border-border/60"
            }`}
        >
            <div className="flex items-start gap-3">
                <div
                    className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                        isNew
                            ? "bg-primary/20 group-hover:bg-primary/25"
                            : "bg-primary/10 group-hover:bg-primary/15"
                    }`}
                >
                    {icon}
                </div>
                <div className="min-w-0">
                    <div className="flex items-center gap-2">
                        <h3 className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                            {title}
                        </h3>
                        {isNew && (
                            <span className="px-1.5 py-0.5 text-[10px] font-semibold bg-primary text-primary-foreground rounded">
                                NEW
                            </span>
                        )}
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">
                        {description}
                    </p>
                </div>
            </div>
        </button>
    )
}

export default function ExamplePanel({
    setInput,
}: {
    setInput: (input: string) => void
}) {
    return (
        <div className="py-6 px-2 animate-fade-in">
            {/* Welcome section */}
            <div className="text-center mb-6">
                <h2 className="text-lg font-semibold text-foreground mb-2">
                    使用 AI 创建图表
                </h2>
                <p className="text-sm text-muted-foreground max-w-xs mx-auto">
                    描述您想要创建的内容
                </p>
            </div>

            {/* Examples grid */}
            <div className="space-y-3">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider px-1">
                    快速示例
                </p>

                <div className="grid gap-2">
                    <ExampleCard
                        icon={<Zap className="w-4 h-4 text-primary" />}
                        title="动态图表"
                        description="绘制带有动态连接线的 Transformer 架构图"
                        onClick={() => {
                            setInput(
                                "Give me a **animated connector** diagram of transformer's architecture",
                            )
                        }}
                    />

                    <ExampleCard
                        icon={<Palette className="w-4 h-4 text-primary" />}
                        title="创意绘图"
                        description="绘制一些有趣和有创意的内容"
                        onClick={() => {
                            setInput("Draw a cat for me")
                        }}
                    />
                </div>

                <p className="text-[11px] text-muted-foreground/60 text-center mt-4">
                    示例已缓存，可即时响应
                </p>
            </div>
        </div>
    )
}
