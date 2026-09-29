"use client";

import { Navbar } from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { UploadCloud, CheckCircle2 } from "lucide-react";
import { useState, useTransition } from "react";
import { submitContribution } from "./actions";

export default function ContributePage() {
  const [submitted, setSubmitted] = useState(false);
  const [isPending, startTransition] = useTransition();

  return (
    <div className="flex flex-col min-h-screen bg-muted/20">
      <Navbar />
      <div className="container mx-auto px-4 py-12 max-w-3xl flex-1">
        <div className="text-center mb-8">
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-primary">Share Your Heritage</h1>
          <p className="text-muted-foreground mt-2 font-sans">Your story could preserve a tradition for the next generation.</p>
        </div>

        {submitted ? (
          <Card className="text-center py-12 border-emerald-200 bg-emerald-50/50">
            <CardContent className="flex flex-col items-center">
              <CheckCircle2 className="h-16 w-16 text-emerald-500 mb-4" />
              <h2 className="text-2xl font-bold text-emerald-800 font-serif">Submission Received!</h2>
              <p className="text-emerald-700/80 mt-2 max-w-md mx-auto">
                Thank you for contributing. Your submission is now in the <strong>PENDING</strong> state. 
                It will be reviewed by our moderators, source-checked, and once verified, it will be indexed for the Dharohar AI.
              </p>
              <Button className="mt-8 bg-emerald-600 hover:bg-emerald-700 text-white" onClick={() => setSubmitted(false)}>
                Submit Another
              </Button>
            </CardContent>
          </Card>
        ) : (
          <Card className="shadow-md">
            <CardHeader>
              <CardTitle className="font-serif text-xl">Heritage Submission Form</CardTitle>
              <CardDescription>Fill out the details carefully. Verified content shapes our cultural AI.</CardDescription>
            </CardHeader>
            <CardContent>
              <form 
                className="space-y-6"
                action={(formData) => {
                  startTransition(async () => {
                    await submitContribution(formData);
                    setSubmitted(true);
                  });
                }}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Tradition / Monument Name</Label>
                    <Input id="title" name="name" placeholder="e.g. Garba of Gujarat" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Select name="category" required>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="monument">Monument</SelectItem>
                        <SelectItem value="festival">Festival</SelectItem>
                        <SelectItem value="dance">Dance & Music</SelectItem>
                        <SelectItem value="craft">Arts & Craft</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="state">State</Label>
                    <Input id="state" name="state" placeholder="e.g. Gujarat" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="district">District / City</Label>
                    <Input id="district" name="district" placeholder="e.g. Ahmedabad" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="customImage">Main Image URL</Label>
                  <Input id="customImage" name="customImage" type="url" placeholder="https://example.com/image.jpg (Optional)" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Detailed Description</Label>
                  <Textarea 
                    id="description" 
                    name="description"
                    placeholder="Describe the history, significance, and cultural impact..." 
                    className="min-h-[120px]" 
                    required 
                  />
                </div>

                <div className="space-y-2">
                  <Label>Media Upload (Signed Cloudinary direct upload)</Label>
                  <div className="border-2 border-dashed rounded-lg p-8 flex flex-col items-center justify-center text-muted-foreground hover:bg-muted/50 cursor-pointer transition-colors">
                    <UploadCloud className="h-8 w-8 mb-2" />
                    <p className="text-sm font-medium">Coming Soon (Use Image URL above instead)</p>
                  </div>
                </div>

                <Button type="submit" disabled={isPending} className="w-full bg-primary hover:bg-primary/90 text-lg py-6 mt-4">
                  {isPending ? "Submitting..." : "Submit for Verification"}
                </Button>
              </form>
            </CardContent>
          </Card>
        )}

        <div className="mt-12">
          <h3 className="text-sm font-bold text-center text-muted-foreground uppercase tracking-wider mb-6">Our Strict Verification Pipeline</h3>
          <div className="flex flex-col md:flex-row items-center justify-between text-xs md:text-sm font-medium text-muted-foreground gap-2">
            <div className="bg-background px-4 py-2 rounded-full border shadow-sm">1. Submission</div>
            <div className="hidden md:block h-px bg-border flex-1 mx-2"></div>
            <div className="bg-background px-4 py-2 rounded-full border shadow-sm">2. Moderation</div>
            <div className="hidden md:block h-px bg-border flex-1 mx-2"></div>
            <div className="bg-background px-4 py-2 rounded-full border shadow-sm">3. Source Check</div>
            <div className="hidden md:block h-px bg-border flex-1 mx-2"></div>
            <div className="bg-primary text-primary-foreground px-4 py-2 rounded-full border shadow-sm flex items-center">
              <CheckCircle2 className="w-4 h-4 mr-1" />
              4. Verified & Indexed
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
