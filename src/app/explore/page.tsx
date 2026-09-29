import { Navbar } from "@/components/navbar";
import Link from "next/link";
import { MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";

import { getCustomSites } from "@/lib/data-store";

const heritageSites = [
  {
    name: "Garba of Gujarat",
    slug: "garba-of-gujarat",
    category: "Dance & Music",
    state: "Gujarat",
    image: "/assets/images/garba.jpg"
  },
  {
    name: "Khajuraho Group of Monuments",
    slug: "khajuraho-monuments",
    category: "Monuments",
    state: "Madhya Pradesh",
    image: "https://images.unsplash.com/photo-1598890777032-bde835ba27c2?q=80&w=800&auto=format&fit=crop"
  },
  {
    name: "Taj Mahal",
    slug: "taj-mahal",
    category: "Monuments",
    state: "Uttar Pradesh",
    image: "https://images.unsplash.com/photo-1548013146-72479768bada?q=80&w=800&auto=format&fit=crop"
  },
  {
    name: "Hampi",
    slug: "hampi",
    category: "Monuments",
    state: "Karnataka",
    image: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?q=80&w=800&auto=format&fit=crop"
  },
  {
    name: "Kathakali Dance",
    slug: "kathakali",
    category: "Dance & Music",
    state: "Kerala",
    image: "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?q=80&w=800&auto=format&fit=crop"
  },
  {
    name: "Gond Art",
    slug: "gond-art",
    category: "Arts & Crafts",
    state: "Madhya Pradesh",
    image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=800&auto=format&fit=crop"
  }
];

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
    })),
    ...heritageSites
  ];

  const filteredSites = currentCategory === "All" 
    ? allSites 
    : allSites.filter(site => site.category === currentCategory);

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

        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map(cat => (
            <Link key={cat} href={`/explore${cat === "All" ? "" : `?category=${encodeURIComponent(cat)}`}`}>
              <Badge variant={currentCategory === cat ? "default" : "secondary"} className="px-5 py-2 text-sm cursor-pointer hover:bg-primary/80 hover:text-primary-foreground transition-all">
                {cat}
              </Badge>
            </Link>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {filteredSites.map((site) => (
            <Link key={site.slug} href={`/explore/${site.slug}`} className="group block">
              <div className="bg-card border rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300">
                <div className="relative h-64 overflow-hidden">
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors z-10"></div>
                  <div 
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110" 
                    style={{ backgroundImage: `url(${site.image})` }}
                  ></div>
                  <div className="absolute top-4 left-4 z-20">
                    <Badge className="bg-primary/90 hover:bg-primary text-primary-foreground backdrop-blur-sm border-none shadow-md">
                      {site.category}
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
