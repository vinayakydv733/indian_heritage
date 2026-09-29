import { Navbar } from "@/components/navbar";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { CheckCircle, XCircle } from "lucide-react";
import { revalidatePath } from "next/cache";

async function approveContribution(id: string) {
  "use server";
  try {
    await prisma.contribution.update({
      where: { id },
      data: { status: "VERIFIED" }
    });
  } catch (e) {
    console.error(e);
  }
  revalidatePath("/admin");
}

async function rejectContribution(id: string) {
  "use server";
  try {
    await prisma.contribution.update({
      where: { id },
      data: { status: "REJECTED" }
    });
  } catch (e) {
    console.error(e);
  }
  revalidatePath("/admin");
}

export default async function AdminPage() {
  const session = await getServerSession(authOptions);
  
  if (!session) {
    redirect("/api/auth/signin");
  }

  let pending: any[] = [];
  try {
    pending = await prisma.contribution.findMany({
      where: { status: "PENDING" },
      include: { user: true },
      orderBy: { createdAt: "desc" }
    });
  } catch (error) {
    console.error("DB connection failed for admin:", error);
    // Mock data for prototype feel when DB is offline
    pending = [
      {
        id: "dummy-1",
        title: "Kutchi Embroidery (Mock)",
        category: "Arts & Crafts",
        content: "Kutchi embroidery is a handicraft and textile art tradition of the tribal community of Kutch District in Gujarat, India.",
        sourceUrl: "https://en.wikipedia.org/wiki/Kutch_embroidery",
        user: { name: "Demo User" },
        createdAt: new Date(),
      }
    ];
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-12 md:py-16 flex-1">
        <div className="max-w-4xl mx-auto">
          <h1 className="font-serif text-3xl font-bold text-primary mb-2">Verification Dashboard</h1>
          <p className="text-muted-foreground mb-8">Review and verify community submissions before indexing them for AI Search.</p>

          {pending.length === 0 ? (
            <div className="bg-card border rounded-xl p-8 text-center text-muted-foreground">
              No pending submissions to review.
            </div>
          ) : (
            <div className="grid gap-6">
              {pending.map((item) => (
                <div key={item.id} className="bg-card border rounded-xl p-6 shadow-sm flex flex-col md:flex-row gap-6 items-start">
                  <div className="flex-1 space-y-4 w-full">
                    <div className="flex items-center justify-between border-b pb-4">
                       <h3 className="text-xl font-bold font-serif text-primary">{item.title}</h3>
                       <span className="text-xs bg-amber-500/10 text-amber-600 px-3 py-1 rounded-full uppercase tracking-wider font-bold">Pending Review</span>
                    </div>
                    <p className="text-sm text-muted-foreground font-sans">Category: <span className="font-medium text-foreground">{item.category}</span> • Submitted by {item.user.name}</p>
                    <div className="bg-muted/50 border p-4 rounded-lg text-sm text-foreground leading-relaxed">
                      {item.content}
                    </div>
                    {item.sourceUrl && (
                      <a href={item.sourceUrl} target="_blank" rel="noreferrer" className="text-sm text-blue-500 hover:underline font-medium">
                        View Reference Source
                      </a>
                    )}
                  </div>
                  <div className="flex md:flex-col gap-3 w-full md:w-48 pt-2">
                     <form action={approveContribution.bind(null, item.id)} className="w-full">
                       <button type="submit" className="w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2.5 rounded-lg font-medium transition-colors text-sm shadow-sm">
                         <CheckCircle className="w-4 h-4" /> Approve & Index
                       </button>
                     </form>
                     <form action={rejectContribution.bind(null, item.id)} className="w-full">
                       <button type="submit" className="w-full flex items-center justify-center gap-2 bg-destructive/10 hover:bg-destructive text-destructive px-4 py-2.5 rounded-lg font-medium transition-colors text-sm hover:text-white">
                         <XCircle className="w-4 h-4" /> Reject
                       </button>
                     </form>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
