"use client";

import { Navbar } from "@/components/navbar";
import { buttonVariants } from "@/components/ui/button";
import { ArrowRight, Compass, Sparkles, BookOpen, Map } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { motion } from "framer-motion";

const categories = [
  { name: 'Monuments', img: 'https://images.unsplash.com/photo-1548013146-72479768bada?q=80&w=800&auto=format&fit=crop', desc: 'Centuries of architectural marvels', icon: Compass },
  { name: 'Festivals', img: '/assets/images/holi.jpg', desc: 'Colors, devotion, and celebration', icon: Sparkles },
  { name: 'Arts & Crafts', img: '/assets/images/crafts.jpg', desc: 'The handmade soul of India', icon: BookOpen },
  { name: 'Dance', img: '/assets/images/dance.jpg', desc: 'Rhythm and devotion in motion', icon: Map }
];

const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" as const } }
};

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="flex-1">
        
        {/* HERO SECTION */}
        <section className="relative w-full h-[90vh] flex items-center justify-center overflow-hidden">
          {/* Parallax Background */}
          <motion.div 
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 10, ease: "easeOut" }}
            className="absolute inset-0 z-0"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-background z-10"></div>
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1524492412937-b28074a5d7da?q=80&w=2071&auto=format&fit=crop')] bg-cover bg-center mix-blend-overlay opacity-90"></div>
          </motion.div>

          <div className="container relative z-20 px-4 md:px-6">
            <motion.div 
              variants={staggerContainer} 
              initial="hidden" 
              animate="show"
              className="flex flex-col items-center text-center space-y-6 max-w-4xl mx-auto"
            >
              <motion.div variants={fadeUp} className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-3 py-1 text-sm font-medium text-white backdrop-blur-md">
                <Sparkles className="mr-2 h-4 w-4 text-accent" />
                <span>Next-Gen Heritage Platform</span>
              </motion.div>
              
              <motion.h1 
                variants={fadeUp} 
                className="text-5xl font-extrabold tracking-tight sm:text-7xl md:text-8xl font-serif text-white drop-shadow-lg"
              >
                Experience <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent via-amber-200 to-primary">India's Living</span> Heritage
              </motion.h1>
              
              <motion.p 
                variants={fadeUp} 
                className="mx-auto max-w-[700px] text-white/80 md:text-xl font-sans leading-relaxed"
              >
                An immersive AI-powered journey through monuments, festivals, crafts, and stories. The digital archive of a billion souls.
              </motion.p>
              
              <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4 mt-10">
                <Link href="/explore" className={cn(buttonVariants({ size: "lg" }), "bg-accent text-accent-foreground hover:bg-accent/90 h-14 px-8 rounded-full text-lg shadow-[0_0_40px_rgba(212,175,55,0.4)] transition-all hover:scale-105")}>
                  Start Exploring <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
                <Link href="/assistant" className={cn(buttonVariants({ variant: "outline", size: "lg" }), "h-14 px-8 rounded-full text-lg border-white/30 text-white hover:bg-white/10 backdrop-blur-md transition-all hover:scale-105")}>
                  Ask AI Assistant
                </Link>
              </motion.div>
            </motion.div>
          </div>
          
          {/* Scrolling Mouse Indicator */}
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            transition={{ delay: 2, duration: 1 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center text-white/50 z-20"
          >
            <span className="text-xs uppercase tracking-widest mb-2 font-medium">Scroll to Discover</span>
            <div className="w-[1px] h-12 bg-gradient-to-b from-white/50 to-transparent"></div>
          </motion.div>
        </section>

        {/* EXPLORE GRID SECTION */}
        <section className="w-full py-24 md:py-32 bg-background relative z-30 -mt-10 rounded-t-[3rem] shadow-[0_-20px_50px_rgba(0,0,0,0.5)]">
          <div className="container mx-auto px-4 md:px-6">
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold font-serif text-primary mb-4">
                Curated by Culture
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Dive deep into the structured knowledge graph of India's most prominent heritage categories.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {categories.map((category, index) => (
                <motion.div 
                  key={category.name}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                >
                  <Link href="/explore">
                    <div className="group relative overflow-hidden rounded-2xl bg-card transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl h-[400px] flex flex-col justify-end">
                      <div className="absolute inset-0 bg-black/20 z-10 group-hover:bg-black/10 transition-colors duration-500"></div>
                      <div className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-110" style={{ backgroundImage: `url(${category.img})` }}></div>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-10"></div>
                      
                      <div className="relative z-20 p-8 transform transition-transform duration-500 group-hover:translate-y-[-10px]">
                        <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center mb-4 border border-white/30 text-white">
                          <category.icon className="w-6 h-6" />
                        </div>
                        <h3 className="font-serif text-3xl font-bold mb-2 text-white group-hover:text-accent transition-colors">{category.name}</h3>
                        <p className="text-white/70 text-sm font-sans opacity-0 group-hover:opacity-100 transition-opacity duration-500 translate-y-4 group-hover:translate-y-0">{category.desc}</p>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}
