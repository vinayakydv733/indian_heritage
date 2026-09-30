"use client";

import { Badge } from "@/components/ui/badge";
import { useRouter, useSearchParams } from "next/navigation";

export function CategoryFilter({ currentCategory }: { currentCategory: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const categories = ["All", "Monuments", "Festivals", "Dance & Music", "Arts & Crafts"];

  const handleSelect = (cat: string) => {
    if (cat === "All") {
      router.push("/explore", { scroll: false });
    } else {
      router.push(`/explore?category=${encodeURIComponent(cat)}`, { scroll: false });
    }
    router.refresh(); // Forces Next.js to re-fetch the Server Component
  };

  return (
    <div className="flex flex-wrap justify-center gap-3 mb-12">
      {categories.map(cat => (
        <Badge 
          key={cat}
          onClick={() => handleSelect(cat)}
          variant={currentCategory === cat ? "default" : "secondary"} 
          className="px-5 py-2 text-sm cursor-pointer hover:bg-primary/80 hover:text-primary-foreground transition-all"
        >
          {cat}
        </Badge>
      ))}
    </div>
  );
}
