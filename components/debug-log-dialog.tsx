"use client"

import { Copy, Trash2, X } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"

export interface LogEntry {
    timestamp: string
    type: "info" | "error" | "tool-call" | "tool-result" | "message"
    content: string | object
}

interface DebugLogDialogProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    logs: LogEntry[]
    onClearLogs: () => void
}

export function DebugLogDialog({
    open,
    onOpenChange,
    logs,
    onClearLogs,
}: DebugLogDialogProps) {
    const [copied, setCopied] = useState(false)

    const handleCopy = () => {
        const text = logs
            .map(
                (log) =>
                    `[${log.timestamp}] [${log.type}]\n${
                        typeof log.content === "string"
                            ? log.content
                            : JSON.stringify(log.content, null, 2)
                    }`,
            )
            .join("\n\n")
        navigator.clipboard.writeText(text)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[800px] h-[80vh] flex flex-col">
                <DialogHeader>
                    <DialogTitle>Frontend Debug Logs</DialogTitle>
                    <DialogDescription>
                        View console logs, errors, and LLM interactions for
                        debugging.
                    </DialogDescription>
                </DialogHeader>

                <div className="flex-1 min-h-0 border rounded-md bg-muted/50 p-4">
                    <ScrollArea className="h-full">
                        {logs.length === 0 ? (
                            <div className="text-center text-muted-foreground py-8">
                                No logs recorded yet.
                            </div>
                        ) : (
                            <div className="space-y-4 font-mono text-xs">
                                {logs.map((log, index) => (
                                    <div
                                        key={index}
                                        className={`p-2 rounded border ${
                                            log.type === "error"
                                                ? "bg-destructive/10 border-destructive/20 text-destructive"
                                                : "bg-background border-border"
                                        }`}
                                    >
                                        <div className="flex items-center gap-2 mb-1 opacity-70">
                                            <span>{log.timestamp}</span>
                                            <span className="uppercase font-bold text-[10px]">
                                                {log.type}
                                            </span>
                                        </div>
                                        <pre className="whitespace-pre-wrap break-words">
                                            {typeof log.content === "string"
                                                ? log.content
                                                : JSON.stringify(
                                                      log.content,
                                                      null,
                                                      2,
                                                  )}
                                        </pre>
                                    </div>
                                ))}
                            </div>
                        )}
                    </ScrollArea>
                </div>

                <div className="flex justify-end gap-2 pt-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={onClearLogs}
                        disabled={logs.length === 0}
                    >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Clear
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={handleCopy}
                        disabled={logs.length === 0}
                    >
                        <Copy className="w-4 h-4 mr-2" />
                        {copied ? "Copied!" : "Copy All"}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}
