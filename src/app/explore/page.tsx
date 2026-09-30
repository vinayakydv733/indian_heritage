export const dynamic = "force-dynamic";

import Image from "next/image";
import { Navbar } from "@/components/navbar";
import { MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { CategoryFilter } from "./category-filter";
import Link from "next/link";
import { getCustomSites } from "@/lib/data-store";

export default async function ExplorePage({ searchParams }: { searchParams: Promise<{ category?: string }> }) {
  const resolvedParams = await searchParams;
  const currentCategory = resolvedParams.category || "All";
  
  const customSites = getCustomSites();
  const allSites = [
    ...customSites.map(s => ({
      name: s.name,
      slug: s.slug,
      category: s.category,
      state: s.state,
      image: s.customImage
    }))
  ];

  const getStandardCategory = (cat: string) => {
    const lower = cat.toLowerCase();
    if (lower.includes('monument') || lower.includes('place')) return 'Monuments';
    if (lower.includes('festival')) return 'Festivals';
    if (lower.includes('dance') || lower.includes('music') || lower.includes('tradition')) return 'Dance & Music';
    if (lower.includes('art') || lower.includes('craft')) return 'Arts & Crafts';
    return cat;
  };

  const filteredSites = currentCategory === "All" 
    ? allSites 
    : allSites.filter(site => getStandardCategory(site.category) === currentCategory);

  const categories = ["All", "Monuments", "Festivals", "Dance & Music", "Arts & Crafts"];

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-12 md:py-20">
        <div className="text-center mb-10">
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-primary mb-6">Heritage Knowledge Graph</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto font-sans">
            Browse verified Indian Heritage nodes. Each entry is backed by strict sourcing and mapped via AI into our cultural network.
          </p>
        </div>

        <CategoryFilter currentCategory={currentCategory} />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {filteredSites.map((site) => (
            <Link key={site.slug} href={`/explore/${site.slug}`} className="group block">
              <div className="bg-card border rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300">
                <div className="relative h-64 overflow-hidden">
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors z-10"></div>
                  <Image 
                    src={site.image}
                    alt={site.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute top-4 left-4 z-20">
                    <Badge className="bg-primary/90 hover:bg-primary text-primary-foreground backdrop-blur-sm border-none shadow-md">
                      {getStandardCategory(site.category)}
                    </Badge>
                  </div>
                </div>
                <div className="p-6">
                  <h2 className="font-serif text-2xl font-bold text-primary mb-3 group-hover:text-accent transition-colors">
                    {site.name}
                  </h2>
                  <div className="flex items-center text-muted-foreground text-sm font-sans">
                    <MapPin className="w-4 h-4 mr-1 text-accent" />
                    {site.state}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
