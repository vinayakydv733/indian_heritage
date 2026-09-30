import { Navbar } from "@/components/navbar";

export default function Loading() {
  return (
    <div className="flex flex-col h-screen overflow-hidden bg-background">
      <Navbar />
      <div className="flex flex-1 relative animate-pulse">
        {/* Sidebar Skeleton */}
        <div className="w-80 bg-background border-r p-6 hidden md:block z-10 relative">
          <div className="h-8 bg-muted rounded w-3/4 mb-6"></div>
          <div className="space-y-6">
            <div>
              <div className="h-5 bg-muted rounded w-1/2 mb-3"></div>
              <div className="space-y-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="h-6 w-3/4 bg-muted rounded"></div>
                ))}
              </div>
            </div>
            <div className="h-px w-full bg-border"></div>
            <div>
              <div className="h-4 bg-muted rounded w-1/3 mb-3"></div>
              <div className="h-24 bg-muted rounded-lg w-full"></div>
            </div>
          </div>
        </div>
        
        {/* Map Area Skeleton */}
        <div className="flex-1 bg-muted/50 relative z-0 flex items-center justify-center">
          <div className="flex flex-col items-center space-y-4 text-muted-foreground">
            <div className="h-16 w-16 bg-muted rounded-full animate-bounce"></div>
            <p className="font-medium text-lg">Loading Heritage Map...</p>
          </div>
        </div>
      </div>
    </div>
  );
}
