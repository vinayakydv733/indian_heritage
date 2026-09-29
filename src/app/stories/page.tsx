"use client";

import { Navbar } from "@/components/navbar";
import { motion } from "framer-motion";
import Link from "next/link";

const stories = [
  {
    id: 1,
    slug: "rhythm-of-devotion-garba",
    title: "The Rhythm of Devotion: Understanding Garba",
    state: "Gujarat",
    img: "https://images.unsplash.com/photo-1514222709107-a180c68d72b4?q=80&w=800&auto=format&fit=crop",
    excerpt: "Garba is a ritualistic and devotional dance performed on the occasion of the Hindu festival Navratri.",
    featured: false,
    height: "h-72"
  },
  {
    id: 2,
    slug: "weavers-of-varanasi",
    title: "The Weavers of Varanasi",
    state: "Featured Series",
    img: "https://images.unsplash.com/photo-1605559911160-a3d95d213904?q=80&w=800&auto=format&fit=crop",
    excerpt: "Explore the intricate process of creating the world-famous Banarasi silk sarees, an unbroken tradition passing through generations of master craftsmen.",
    featured: true,
    height: "h-96"
  },
  {
    id: 3,
    slug: "gond-art-nature-soul",
    title: "Gond Art: Painting Nature's Soul",
    state: "Madhya Pradesh",
    img: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=800&auto=format&fit=crop",
    excerpt: "A traditional art form practiced by one of the largest tribes in India, Gond art reflects the deep connection between humans and nature.",
    featured: false,
    height: "h-64"
  },
  {
    id: 4,
    slug: "silent-stones-hampi",
    title: "The Silent Stones of Hampi",
    state: "Karnataka",
    img: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?q=80&w=800&auto=format&fit=crop",
    excerpt: "Wander through the remnants of the Vijayanagara Empire, where every boulder tells a story of an era of unprecedented wealth and artistry.",
    featured: false,
    height: "h-80"
  },
  {
    id: 5,
    slug: "kathakali-dance-gods",
    title: "Kathakali: The Dance of the Gods",
    state: "Kerala",
    img: "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?q=80&w=800&auto=format&fit=crop",
    excerpt: "Behind the elaborate masks and vibrant costumes lies a rigorous physical discipline and a deeply spiritual storytelling tradition.",
    featured: false,
    height: "h-64"
  }
];

export default function StoriesPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground selection:bg-accent/30">
      <Navbar />
      
      {/* Editorial Header */}
      <div className="w-full bg-primary relative overflow-hidden py-20 md:py-32">
         <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] mix-blend-overlay"></div>
         <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3"></div>
         <div className="container mx-auto px-4 md:px-6 relative z-10 text-center">
            <motion.span 
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
              className="text-accent font-semibold tracking-[0.2em] uppercase text-sm mb-4 block"
            >
              Editorial
            </motion.span>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
              className="font-serif text-5xl md:text-7xl font-bold text-white mb-6 drop-shadow-md"
            >
              Stories That Keep <br className="hidden md:block" /> Culture Alive
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
              className="text-primary-foreground/80 text-lg md:text-xl font-sans max-w-2xl mx-auto leading-relaxed"
            >
              Dive into the editorial narratives of India's living traditions. Each story is deeply researched, culturally authenticated, and visually breathtaking.
            </motion.p>
         </div>
      </div>

      <div className="container mx-auto px-4 py-16 md:py-24">
        
        {/* Masonry Grid */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
          {stories.map((story, i) => (
            <motion.div 
              key={story.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: (i % 3) * 0.1 }}
              className="break-inside-avoid"
            >
              {story.featured ? (
                <Link href={`/stories/${story.slug}`} className="block w-full h-full">
                  <div className="bg-gradient-to-br from-primary to-primary/90 rounded-2xl border border-primary/20 overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 cursor-pointer group text-primary-foreground relative h-[500px] flex flex-col justify-end p-8 md:p-10">
                    <div className="absolute inset-0 bg-cover bg-center mix-blend-overlay opacity-40 transition-transform duration-1000 group-hover:scale-110 group-hover:opacity-60" style={{ backgroundImage: `url('${story.img}')` }}></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
                    <div className="relative z-10">
                      <span className="text-xs font-bold uppercase tracking-widest text-accent mb-4 block drop-shadow-md">{story.state}</span>
                      <h2 className="font-serif text-3xl md:text-5xl font-bold mb-4 text-white leading-tight drop-shadow-lg">{story.title}</h2>
                      <p className="text-primary-foreground/90 font-sans text-base leading-relaxed mb-8 max-w-md">
                        {story.excerpt}
                      </p>
                      <div className="text-accent font-semibold text-sm uppercase tracking-wider group-hover:translate-x-2 transition-transform inline-block">Read the full series &rarr;</div>
                    </div>
                  </div>
                </Link>
              ) : (
                <Link href={`/stories/${story.slug}`} className="block w-full h-full">
                  <div className="bg-card rounded-2xl border border-border/40 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 cursor-pointer group">
                    <div className={`${story.height} bg-muted relative overflow-hidden`}>
                      <div className="absolute inset-0 bg-primary/20 group-hover:bg-primary/0 transition-colors duration-500 z-10"></div>
                      <div className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-105" style={{ backgroundImage: `url('${story.img}')` }}></div>
                    </div>
                    <div className="p-8">
                      <span className="text-xs font-bold uppercase tracking-widest text-accent mb-3 block">{story.state}</span>
                      <h2 className="font-serif text-2xl font-bold text-primary mb-3 leading-tight group-hover:text-accent transition-colors">{story.title}</h2>
                      <p className="text-muted-foreground font-sans text-sm leading-relaxed">
                        {story.excerpt}
                      </p>
                    </div>
                  </div>
                </Link>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
