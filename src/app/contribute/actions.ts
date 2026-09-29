"use server";

import { addCustomSite } from "@/lib/data-store";
import { revalidatePath } from "next/cache";

export async function submitContribution(formData: FormData) {
  const name = formData.get("name") as string;
  const category = formData.get("category") as string;
  const state = formData.get("state") as string;
  const district = formData.get("district") as string;
  const description = formData.get("description") as string;
  const customImage = formData.get("customImage") as string;

  if (!name || !category || !state || !description) {
    throw new Error("Missing required fields");
  }

  // Create site
  addCustomSite({
    name,
    category,
    state,
    district: district || "Unknown",
    description,
    significance: description,
    latitude: 0,
    longitude: 0,
    customImage: customImage || "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?q=80&w=2071&auto=format&fit=crop",
    gallery: [],
    documents: [{ id: `custom-doc-${Date.now()}`, source: { organization: "Community Contribution", title: "Self Data Entry Form" } }]
  });

  // Revalidate explore pages so the new site shows up immediately
  revalidatePath("/explore");
  
  return { success: true };
}
