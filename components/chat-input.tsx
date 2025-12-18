"use client"

import {
    Download,
    History,
    Loader2,
    Send,
    Trash2,
} from "lucide-react"
import type React from "react"
import { useCallback, useEffect, useRef, useState } from "react"
import { ButtonWithTooltip } from "@/components/button-with-tooltip"
import { HistoryDialog } from "@/components/history-dialog"
import { ResetWarningModal } from "@/components/reset-warning-modal"
import { SaveDialog } from "@/components/save-dialog"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { useDiagram } from "@/contexts/diagram-context"

interface ChatInputProps {
    input: string
    status: "submitted" | "streaming" | "ready" | "error"
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
    onClearChat: () => void
    showHistory?: boolean
    onToggleHistory?: (show: boolean) => void
    sessionId?: string
    error?: Error | null
    minimalStyle?: boolean
    onMinimalStyleChange?: (value: boolean) => void
}

export function ChatInput({
    input,
    status,
    onSubmit,
    onChange,
    onClearChat,
    showHistory = false,
    onToggleHistory = () => {},
    sessionId,
    error = null,
    minimalStyle = false,
    onMinimalStyleChange = () => {},
}: ChatInputProps) {
    const {
        diagramHistory,
        saveDiagramToFile,
        showSaveDialog,
        setShowSaveDialog,
    } = useDiagram()
    const textareaRef = useRef<HTMLTextAreaElement>(null)
    const [showClearDialog, setShowClearDialog] = useState(false)

    // Allow retry when there's an error (even if status is still "streaming" or "submitted")
    const isDisabled =
        (status === "streaming" || status === "submitted") && !error

    const adjustTextareaHeight = useCallback(() => {
        const textarea = textareaRef.current
        if (textarea) {
            textarea.style.height = "auto"
            textarea.style.height = `${Math.min(textarea.scrollHeight, 200)}px`
        }
    }, [])

    // Handle programmatic input changes (e.g., setInput("") after form submission)
    useEffect(() => {
        adjustTextareaHeight()
    }, [input, adjustTextareaHeight])

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        onChange(e)
        adjustTextareaHeight()
    }

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
            e.preventDefault()
            const form = e.currentTarget.closest("form")
            if (form && input.trim() && !isDisabled) {
                form.requestSubmit()
            }
        }
    }

    const handleClear = () => {
        onClearChat()
        setShowClearDialog(false)
    }

    return (
        <form
            onSubmit={onSubmit}
            className="w-full transition-all duration-200"
        >
            {/* Input container */}
            <div className="relative rounded-2xl border border-border bg-background shadow-sm focus-within:ring-2 focus-within:ring-primary/20 focus-within:border-primary/50 transition-all duration-200">
                <Textarea
                    ref={textareaRef}
                    value={input}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                    placeholder="Describe your diagram..."
                    disabled={isDisabled}
                    aria-label="Chat input"
                    className="min-h-[60px] max-h-[200px] resize-none border-0 bg-transparent px-4 py-3 text-sm focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-muted-foreground/60"
                />

                {/* Action bar */}
                <div className="flex items-center justify-between px-3 py-2 border-t border-border/50">
                    {/* Left actions */}
                    <div className="flex items-center gap-1">
                        <ButtonWithTooltip
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => setShowClearDialog(true)}
                            tooltipContent="Clear conversation"
                            className="h-8 w-8 p-0 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                        >
                            <Trash2 className="h-4 w-4" />
                        </ButtonWithTooltip>

                        <ResetWarningModal
                            open={showClearDialog}
                            onOpenChange={setShowClearDialog}
                            onClear={handleClear}
                        />

                        <HistoryDialog
                            showHistory={showHistory}
                            onToggleHistory={onToggleHistory}
                        />

                        <Tooltip>
                            <TooltipTrigger asChild>
                                <div className="flex items-center gap-1.5">
                                    <Switch
                                        id="minimal-style"
                                        checked={minimalStyle}
                                        onCheckedChange={onMinimalStyleChange}
                                        className="scale-75"
                                    />
                                    <label
                                        htmlFor="minimal-style"
                                        className={`text-xs cursor-pointer select-none ${
                                            minimalStyle
                                                ? "text-primary font-medium"
                                                : "text-muted-foreground"
                                        }`}
                                    >
                                        {minimalStyle ? "Minimal" : "Styled"}
                                    </label>
                                </div>
                            </TooltipTrigger>
                            <TooltipContent side="top">
                                Use minimal for faster generation (no colors)
                            </TooltipContent>
                        </Tooltip>
                    </div>

                    {/* Right actions */}
                    <div className="flex items-center gap-1">
                        <ButtonWithTooltip
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => onToggleHistory(true)}
                            disabled={isDisabled || diagramHistory.length === 0}
                            tooltipContent="Diagram history"
                            className="h-8 w-8 p-0 text-muted-foreground hover:text-foreground"
                        >
                            <History className="h-4 w-4" />
                        </ButtonWithTooltip>

                        <ButtonWithTooltip
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => setShowSaveDialog(true)}
                            disabled={isDisabled}
                            tooltipContent="Save diagram"
                            className="h-8 w-8 p-0 text-muted-foreground hover:text-foreground"
                        >
                            <Download className="h-4 w-4" />
                        </ButtonWithTooltip>

                        <SaveDialog
                            open={showSaveDialog}
                            onOpenChange={setShowSaveDialog}
                            onSave={(filename, format) =>
                                saveDiagramToFile(filename, format, sessionId)
                            }
                            defaultFilename={`diagram-${new Date()
                                .toISOString()
                                .slice(0, 10)}`}
                        />

                        <div className="w-px h-5 bg-border mx-1" />

                        <Button
                            type="submit"
                            disabled={isDisabled || !input.trim()}
                            size="sm"
                            className="h-8 px-4 rounded-xl font-medium shadow-sm"
                            aria-label={
                                isDisabled ? "Sending..." : "Send message"
                            }
                        >
                            {isDisabled ? (
                                <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                                <>
                                    <Send className="h-4 w-4 mr-1.5" />
                                    Send
                                </>
                            )}
                        </Button>
                    </div>
                </div>
            </div>
        </form>
    )
}
