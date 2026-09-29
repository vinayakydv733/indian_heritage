"use client";

import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";
import { Button, buttonVariants } from "@/components/ui/button";
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { Map, BookOpen, MessageSquare, PlusCircle } from "lucide-react";

export function Navbar() {
  const { data: session } = useSession();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 py-2">
      <div className="container mx-auto px-4 md:px-8 flex h-20 items-center justify-between">
        <div className="flex gap-6 md:gap-10 items-center">
          <Link href="/" className="flex items-center space-x-2 mr-6">
            <span className="font-serif font-bold text-3xl text-primary inline-block tracking-tight">
              Dharohar
            </span>
          </Link>
          <NavigationMenu className="hidden md:flex">
            <NavigationMenuList className="gap-2">
              <NavigationMenuItem>
                <NavigationMenuLink render={<Link href="/explore" />} className={cn(navigationMenuTriggerStyle(), "text-base font-medium h-12 px-5")}>
                  Explore
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink render={<Link href="/map" />} className={cn(navigationMenuTriggerStyle(), "text-base font-medium h-12 px-5")}>
                  <Map className="mr-2 h-5 w-5" />
                  India Map
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink render={<Link href="/stories" />} className={cn(navigationMenuTriggerStyle(), "text-base font-medium h-12 px-5")}>
                  <BookOpen className="mr-2 h-5 w-5" />
                  Stories
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink render={<Link href="/assistant" />} className={cn(navigationMenuTriggerStyle(), "text-base font-medium h-12 px-5")}>
                  <MessageSquare className="mr-2 h-5 w-5" />
                  AI Assistant
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
        <div className="flex items-center space-x-5">
          <Link href="/contribute" className={cn(buttonVariants({ variant: "outline", size: "lg" }), "text-base h-12 px-6")}>
            <PlusCircle className="mr-2 h-5 w-5" />
            Contribute
          </Link>
          {session ? (
            <Button variant="ghost" size="lg" className="text-base h-12 px-6" onClick={() => signOut()}>
              Sign Out
            </Button>
          ) : (
            <Button size="lg" className="text-base h-12 px-6 shadow-md" onClick={() => signIn("google")}>
              Sign In
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
