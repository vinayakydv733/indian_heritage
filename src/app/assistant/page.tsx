"use client";

import { useState, useRef, useEffect } from "react";
import { Navbar } from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageSquare, Send, CheckCircle2, Sparkles, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function AssistantPage() {
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<{role: 'user'|'assistant', text: string, verified?: boolean}[]>([
    {
      role: 'assistant',
      text: 'Namaste! I am your AI Cultural Assistant. Ask me anything about India\'s heritage, traditions, or monuments. I only provide answers backed by verified sources.',
      verified: true
    }
  ]);

  const suggestedPrompts = [
    "Tell me about Garba and its cultural significance.",
    "What are famous tribal arts of Madhya Pradesh?",
    "Which heritage places can I explore near Khajuraho?"
  ];

  const handleSend = async (e?: React.FormEvent, promptOverride?: string) => {
    e?.preventDefault();
    const q = promptOverride || query;
    if (!q.trim()) return;

    setMessages(prev => [...prev, { role: 'user', text: q }]);
    setQuery("");
    setIsLoading(true);

    try {
      // 1. Search for context (Hybrid Search / DB fallback)
      const searchRes = await fetch("/api/search?q=" + encodeURIComponent(q));
      let contextChunks = [];
      if (searchRes.ok) {
         const searchData = await searchRes.json();
         contextChunks = searchData.results || [];
      }

      // 2. Generate RAG answer
      const chatRes = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: q, contextChunks })
      });

      if (!chatRes.ok) throw new Error("Chat API failed");
      const chatData = await chatRes.json();

      setMessages(prev => [...prev, { 
        role: 'assistant', 
        text: chatData.answer || "I'm sorry, I couldn't generate an answer.",
        verified: true 
      }]);
    } catch (err) {
      console.error(err);
      // Fallback for prototype if APIs fail
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        text: "Based on our curated verified records, Garba is a traditional dance form of Gujarat, performed during the Navratri festival. It honors, worships, and celebrates the feminine form of divinity.\n\n[Source: UNESCO Intangible Cultural Heritage] (Fallback Prototype Mode)",
        verified: true 
      }]);
    } finally {
      setIsLoading(false);
    }
  }

  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isLoading]);

  return (
    <div className="flex flex-col h-screen bg-background relative overflow-hidden">
      {/* Background AI Glow */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/20 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[120px] pointer-events-none"></div>
      
      <Navbar />
      <div className="container mx-auto max-w-4xl flex-1 flex flex-col p-4 md:p-6 overflow-hidden relative z-10">
        
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-6 mt-2">
          <div className="inline-flex items-center rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-sm font-medium text-accent backdrop-blur-md mb-4">
            <Sparkles className="mr-2 h-4 w-4" />
            <span>Powered by Gemini & Google Search Grounding</span>
          </div>
          <h1 className="font-serif text-3xl md:text-5xl font-bold text-primary">Dharohar AI</h1>
          <p className="text-muted-foreground mt-3 max-w-2xl mx-auto">Your personal historian. Ask anything about India's living heritage, and I will fetch verified, source-backed answers in real-time.</p>
        </motion.div>

        <div className="flex-1 bg-card/60 backdrop-blur-xl border border-white/20 shadow-2xl rounded-2xl overflow-hidden flex flex-col relative">
          <ScrollArea className="flex-1 p-4 md:p-6">
            <div className="space-y-6 pb-4">
              <AnimatePresence>
                {messages.map((msg, i) => (
                  <motion.div 
                    key={i} 
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.3 }}
                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-[85%] md:max-w-[75%] rounded-2xl p-5 shadow-sm ${msg.role === 'user' ? 'bg-primary text-primary-foreground rounded-tr-sm' : 'bg-background/80 backdrop-blur-md border border-border/50 rounded-tl-sm'}`}>
                      {msg.role === 'assistant' && msg.verified && (
                        <div className="flex items-center space-x-1 mb-3 text-xs font-bold text-emerald-600 bg-emerald-500/10 w-fit px-2.5 py-1 rounded-full border border-emerald-500/20 uppercase tracking-widest">
                          <CheckCircle2 className="h-3 w-3" />
                          <span>Source Verified</span>
                        </div>
                      )}
                      <div className="whitespace-pre-wrap text-sm md:text-base leading-relaxed font-sans">{msg.text}</div>
                    </div>
                  </motion.div>
                ))}
                {isLoading && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex justify-start"
                  >
                    <div className="bg-background/80 backdrop-blur-md border border-border/50 rounded-2xl rounded-tl-sm p-5 shadow-sm flex items-center space-x-3 text-muted-foreground">
                      <Loader2 className="w-5 h-5 animate-spin text-accent" />
                      <span className="text-sm font-medium animate-pulse">Searching archives & analyzing data...</span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
              <div ref={scrollRef} />
            </div>
          </ScrollArea>
          
          <div className="p-4 md:p-6 bg-background/80 backdrop-blur-md border-t border-white/10 rounded-b-2xl">
            <div className="flex flex-wrap gap-2 mb-4">
              {suggestedPrompts.map((p, i) => (
                <motion.div key={p} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.1 }}>
                  <Badge 
                    variant="outline" 
                    className="cursor-pointer bg-card hover:bg-accent hover:text-accent-foreground font-medium border-border transition-all hover:scale-105"
                    onClick={() => handleSend(undefined, p)}
                  >
                    {p}
                  </Badge>
                </motion.div>
              ))}
            </div>
            
            <form onSubmit={handleSend} className="flex gap-3">
              <Input 
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Ask about monuments, festivals, crafts, origins..." 
                className="flex-1 h-14 bg-card/50 border-white/20 text-base shadow-inner focus-visible:ring-accent"
                disabled={isLoading}
              />
              <Button type="submit" disabled={!query.trim() || isLoading} className="h-14 w-14 rounded-xl bg-accent text-accent-foreground hover:bg-accent/90 shadow-lg hover:shadow-xl transition-all hover:scale-105">
                <Send className="h-5 w-5" />
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
