import { Navbar } from "@/components/navbar";

export default function Loading() {
  const skeletonArray = Array.from({ length: 9 });
  
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-12 md:py-20">
        <div className="text-center mb-10">
          <div className="h-12 bg-muted rounded w-3/4 max-w-lg mx-auto mb-6 animate-pulse"></div>
          <div className="h-6 bg-muted rounded w-full max-w-2xl mx-auto animate-pulse"></div>
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="h-10 w-24 bg-muted rounded-full animate-pulse"></div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {skeletonArray.map((_, i) => (
            <div key={i} className="bg-card border rounded-2xl overflow-hidden shadow-sm">
              <div className="relative h-64 bg-muted animate-pulse"></div>
              <div className="p-6">
                <div className="h-6 bg-muted rounded w-3/4 mb-3 animate-pulse"></div>
                <div className="h-4 bg-muted rounded w-1/2 animate-pulse"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
