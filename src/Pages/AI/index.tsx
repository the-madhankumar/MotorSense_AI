import { Send } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { OpenRouter } from "@openrouter/sdk";
import { useMotorStore } from "@/Context/dashboard_context";
import { subscribeToMachineData } from "@/lib/firebaseUtils";
import { queryLocalVectorDb } from "@/lib/RAGutils/query";
import { useAIStore, useSettingsStore } from "@/Context/ai_context";

import ReactMarkdown from "react-markdown";
import { useAICheck } from "@/Context/rag_context";

type character = "AI" | "HUMAN" | "SYSTEM";

type MessageType = {
    text: string;
    type: character;
};

const SYSTEM_PROMPT = `You are a high-speed Predictive Intelligence AI agent running inside a custom ML evaluation dashboard. 
Your tone is concise, technical, and analytical. 
Analyze the user's inputs specifically looking for structural parameters, predictive requests, or performance metrics.
Always evaluate answers using the provided Real-Time Machine Metrics and Local Knowledge RAG database snippets accompanying the latest prompt.`;

const AIApp = () => {
    const apiKey = useSettingsStore((s) => s.apiKey);

    const getAI = useAICheck((s) => s.getAI);
    const getAIModel = useAIStore((s) => s.getAIModel);

    const raw = useMotorStore((state) => state.raw);
    const setRaw = useMotorStore((state) => state.setRaw);

    useEffect(() => {
        const unsubscribe = subscribeToMachineData((latestData) => {
            setRaw(latestData);
        });

        return () => unsubscribe();
    }, [setRaw]);

    const openRouter = useMemo(() => {
        if (!apiKey) return null;

        return new OpenRouter({
            apiKey,
        });
    }, [apiKey]);

    const [messages, setMessages] = useState<MessageType[]>([
        { text: "System initialized. Predictive Intelligence modules online.", type: "AI" }
    ]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleSend = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || isLoading) return;

        if (!openRouter) {
            setMessages((prev) => [
                ...prev,
                {
                    text: "Please configure an OpenRouter API Key first.",
                    type: "AI",
                },
            ]);
            return;
        }

        const userMessage = input;
        setInput("");
        setIsLoading(true);

        const updatedMessages: MessageType[] = [
            ...messages,
            { text: userMessage, type: "HUMAN" }
        ];
        setMessages(updatedMessages);

        try {
            const textRAG = await queryLocalVectorDb(userMessage);

            const formattedContext = `
[CURRENT METRICS]
${JSON.stringify(raw, null, 2)}

[LOCAL KNOWLEDGE BASE SNIPPETS]
${textRAG}

[USER COMMAND]
${userMessage}
`;

            const openRouterMessages = [
                { role: "system" as const, content: SYSTEM_PROMPT },
                ...messages.map(msg => ({
                    role: msg.type === "HUMAN" ? ("user" as const) : ("assistant" as const),
                    content: msg.text
                })),
                { role: "user" as const, content: formattedContext }
            ];

            let aiReply = "";
            if (getAI) {
                const response = await openRouter.chat.send({
                    chatRequest: {
                        model: getAIModel,
                        messages: openRouterMessages,
                        temperature: 0.2,
                        maxTokens: 512,
                    }
                });

                aiReply = response.choices[0]?.message?.content || "No response received.";
            } else {
                aiReply = "No response received [AI Response is pulled off]"
            }

            setMessages((prev) => [
                ...prev,
                { text: aiReply, type: "AI" }
            ]);
        } catch (error) {
            console.error("OpenRouter API Error:", error);
            setMessages((prev) => [
                ...prev,
                { text: "Error: Failed to process request through language model pipeline.", type: "AI" }
            ]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex h-screen bg-neutral-950 text-white p-6 gap-6 font-mono">

            <div className="w-80 md:w-96 shrink-0 flex flex-col border border-neutral-800 rounded-xl p-4 bg-neutral-900/50 overflow-hidden">
                <h2 className="text-sm uppercase tracking-wider text-neutral-500 mb-4">// ML PART</h2>
                <div className="text-xs text-emerald-400 animate-pulse mb-4">
                    {isLoading ? "Processing pipeline stream..." : "Predictive intelligence active..."}
                </div>

                <div className="flex-1 w-full h-full min-h-0 bg-neutral-950/40 rounded-lg border border-neutral-900 p-3 text-xs text-neutral-400 overflow-y-auto">
                    <div className="text-neutral-600 mb-2">// Active System Config</div>
                    <div className="truncate text-neutral-500 mb-1">Model: Llama 3.3 70B</div>
                    <div className="text-neutral-500 mb-4">System Prompt Status: Loaded</div>

                    <div className="text-neutral-600 mb-2">// Direct State Stream</div>
                    <pre className="bg-neutral-950 p-2 rounded border border-neutral-900 text-[10px] text-neutral-400 overflow-x-auto whitespace-pre-wrap">
                        {JSON.stringify(raw, null, 2)}
                    </pre>
                </div>
            </div>

            <div className="flex-1 flex flex-col border border-neutral-800 rounded-xl bg-neutral-900/30 overflow-hidden">

                <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-none">
                    {messages.map((element, index) => (
                        <div
                            key={index}
                            className={`flex flex-col max-w-[80%] ${element.type === "HUMAN" ? "ml-auto items-end" : "mr-auto items-start"}`}
                        >
                            <span className="text-[10px] text-neutral-500 mb-1">
                                {element.type === "HUMAN" ? "USER" : "AI_AGENT"}
                            </span>

                            {/* ─── CHANGED: WRAPPED TEXT CONTENT IN REACT-MARKDOWN PARSER ─── */}
                            <div className={`p-3 rounded-lg text-sm border ${element.type === "HUMAN"
                                ? "bg-neutral-800 border-neutral-700 text-white"
                                : "bg-neutral-900 border-neutral-800 text-neutral-300"
                                }`}>
                                {/* ... inside your messages.map loop ... */}
                                <div className={`p-3 rounded-lg text-sm border ${element.type === "HUMAN"
                                    ? "bg-neutral-800 border-neutral-700 text-white"
                                    : "bg-neutral-900 border-neutral-800 text-neutral-300"
                                    }`}>

                                    {/* ─── FIX: Move all markdown text styles up to a wrapping div ─── */}
                                    <div className="prose prose-invert max-w-none text-sm space-y-2 
                    prose-p:leading-relaxed prose-pre:bg-neutral-950 
                    prose-pre:border prose-pre:border-neutral-800 
                    prose-code:text-emerald-400 prose-ul:list-disc prose-ul:pl-4">
                                        <ReactMarkdown>
                                            {element.text}
                                        </ReactMarkdown>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                    {isLoading && (
                        <div className="flex flex-col items-start mr-auto max-w-[80%]">
                            <span className="text-[10px] text-neutral-500 mb-1">AI_AGENT</span>
                            <div className="p-3 rounded-lg text-sm border bg-neutral-900 border-neutral-800 text-neutral-500 animate-pulse">
                                Thinking...
                            </div>
                        </div>
                    )}
                </div>

                <form onSubmit={handleSend} className="p-4 border-t border-neutral-800 bg-neutral-900 flex gap-2 items-center">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder={isLoading ? "Waiting for stream response..." : "Type a command or message..."}
                        disabled={isLoading}
                        className="flex-1 bg-neutral-950 border border-neutral-800 rounded-lg px-4 py-2 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-neutral-600 disabled:opacity-50"
                    />
                    <button
                        type="submit"
                        className="p-2 bg-white text-black rounded-lg hover:bg-neutral-200 transition-colors flex items-center justify-center disabled:opacity-50"
                        disabled={!input.trim() || isLoading}
                    >
                        <Send size={16} />
                    </button>
                </form>

            </div>
        </div>
    );
};

export default AIApp;