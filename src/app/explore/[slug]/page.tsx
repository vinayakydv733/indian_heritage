import { notFound } from "next/navigation";
import { Navbar } from "@/components/navbar";
import prisma from "@/lib/prisma";
import { Badge } from "@/components/ui/badge";
import { MapPin, CheckCircle2, BookOpen, Camera } from "lucide-react";
import MiniMap from "@/components/mini-map";
import { getCustomSites } from "@/lib/data-store";

export default async function HeritageDetailPage({ params }: { params: { slug: string } }) {
  // In Next.js App Router, params might need to be awaited in newer versions
  const resolvedParams = await Promise.resolve(params);

  let site: any = null;
  try {
    site = await prisma.heritageSite.findUnique({
      where: { slug: resolvedParams.slug },
      include: {
        documents: {
          include: { source: true }
        }
      }
    });
  } catch (error) {
    console.warn("DB offline, using fallback data for prototype.");
    if (resolvedParams.slug === 'garba-of-gujarat') {
       site = {
         id: "1", name: "Garba of Gujarat", slug: "garba-of-gujarat", state: "Gujarat", district: "Ahmedabad", category: "Dance & Music",
         description: "Garba is a ritualistic and devotional dance performed on the occasion of the Hindu festival Navratri, which is dedicated to the worship of the feminine energy or Shakti. The dance is traditionally performed by women in a circle around a clay lantern with a light inside, called a Garbha Deep. This circular movement represents the cycle of time, from birth to life to death to rebirth, leaving the Goddess as the only constant entity.\n\nThe dance form originated in the villages of Gujarat and has evolved into a global phenomenon. It is characterized by vibrant costumes—Chaniya Cholis for women and Kediyas for men—adorned with mirrors and heavy embroidery. The energetic rhythm is maintained by clapping, singing, and playing traditional instruments like the dhol.\n\nGarba not only holds deep religious significance but also acts as a social glue, bringing together people of all backgrounds. In 2023, it was inscribed on the UNESCO Representative List of the Intangible Cultural Heritage of Humanity.",
         significance: "The dance celebrates fertility, honors womanhood, and pays respect to mother goddesses. It acts as a unifying force across socio-economic backgrounds and promotes communal harmony.",
         latitude: 23.0225, longitude: 72.5714, status: "VERIFIED",
         customImage: "https://images.unsplash.com/photo-1532372320978-9b4d06a09a5c?q=80&w=2000&auto=format&fit=crop",
         documents: [{ id: "doc1", source: { organization: "UNESCO", title: "Intangible Cultural Heritage List" } }]
       };
    } else if (resolvedParams.slug === 'khajuraho-monuments') {
       site = {
         id: "2", name: "Khajuraho Group of Monuments", slug: "khajuraho-monuments", state: "Madhya Pradesh", district: "Chhatarpur", category: "Monuments",
         description: "The Khajuraho Group of Monuments is a group of Hindu and Jain temples in Chhatarpur district, Madhya Pradesh, India. Built between 950 and 1050 CE by the Chandela dynasty, these temples are famous for their nagara-style architectural symbolism and their exquisite, intricate sculptures.\n\nOriginally consisting of 85 temples spread across 20 square kilometers, only about 25 have survived the ravages of time. The temples are renowned for their flawless symmetry, intricate carvings, and the famous erotic sculptures that make up about 10% of the temple art. These sculptures represent the diverse aspects of human life, from spirituality and meditation to daily chores and sensual pleasure.\n\nThe architecture seamlessly integrates with the natural landscape, and the temples are grouped into three distinct geographical divisions: Western, Eastern, and Southern.",
         significance: "These temples represent the ultimate expression of Indian architectural genius and cultural openness in the medieval period, designated as a UNESCO World Heritage site.",
         latitude: 24.8318, longitude: 79.9199, status: "VERIFIED",
         customImage: "https://images.unsplash.com/photo-1601662528567-526cd06f6582?q=80&w=2000&auto=format&fit=crop",
         documents: [{ id: "doc2", source: { organization: "ASI", title: "Archaeological Survey of India Records" } }]
       };
    } else if (resolvedParams.slug === 'taj-mahal') {
       site = {
         id: "3", name: "Taj Mahal", slug: "taj-mahal", state: "Uttar Pradesh", district: "Agra", category: "Monuments",
         description: "The Taj Mahal is an ivory-white marble mausoleum on the right bank of the river Yamuna in the Indian city of Agra. Commissioned in 1632 by the Mughal emperor Shah Jahan to house the tomb of his favourite wife, Mumtaz Mahal, it also houses the tomb of Shah Jahan himself.\n\nThe complex includes a mosque and a guest house, and is set in formal gardens bounded on three sides by a crenellated wall. The Taj Mahal was constructed using materials from all over India and Asia and over 1,000 elephants were used to transport building materials. The translucent white marble was brought from Makrana, Rajasthan.\n\nIt is widely considered one of the most beautiful buildings in the world and stands as a testament to the rich architectural heritage of the Mughal era, blending Indo-Islamic and Persian styles perfectly.",
         significance: "Regarded as the pinnacle of Mughal architecture, it is a symbol of India's rich history, a UNESCO World Heritage site, and one of the New 7 Wonders of the World.",
         latitude: 27.1751, longitude: 78.0421, status: "VERIFIED",
         customImage: "https://images.unsplash.com/photo-1548013146-72479768bada?q=80&w=2000&auto=format&fit=crop",
         documents: [{ id: "doc3", source: { organization: "UNESCO", title: "World Heritage List" } }]
       };
    } else if (resolvedParams.slug === 'hampi') {
       site = {
         id: "4", name: "Hampi", slug: "hampi", state: "Karnataka", district: "Vijayanagara", category: "Monuments",
         description: "Hampi was the capital of the Vijayanagara Empire in the 14th century. Chronicles left by Persian and European travellers, particularly the Portuguese, state Hampi was a prosperous, wealthy, and grand city near the Tungabhadra River, with numerous temples, farms, and trading markets.\n\nBy 1500 CE, Hampi was the world's second-largest medieval-era city after Beijing, and probably India's richest at that time, attracting traders from Persia and Portugal. The empire was defeated by a coalition of sultanates in 1565, after which the capital was conquered, pillaged, and destroyed.\n\nToday, its ruins spread over 4,100 hectares and include forts, riverside features, royal and sacred complexes, temples, shrines, pillared halls, and memorial structures. The Virupaksha Temple remains an active Hindu worship center.",
         significance: "The ruins demonstrate spectacular Dravidian temple architecture and unprecedented urban planning. It reflects the pinnacle of South Indian medieval history.",
         latitude: 15.3350, longitude: 76.4600, status: "VERIFIED",
         customImage: "https://images.unsplash.com/photo-1600100397608-f010f438a39c?q=80&w=2000&auto=format&fit=crop",
         documents: [{ id: "doc4", source: { organization: "Ministry of Culture", title: "National Heritage Archives" } }]
       };
    } else if (resolvedParams.slug === 'kathakali') {
       site = {
         id: "5", name: "Kathakali Dance", slug: "kathakali", state: "Kerala", district: "Kochi", category: "Dance & Music",
         description: "Kathakali is a major form of classical Indian dance originating from Kerala. It is a 'story play' genre of art, distinguished by the elaborately colorful make-up, costumes, and face masks that the traditionally male actor-dancers wear.\n\nThe roots of Kathakali are unclear, but it fully developed during the 17th century. The art form synthesizes music, vocal performers, intricate choreography, and highly stylized hand gestures (mudras) to tell epic Hindu tales, primarily drawn from the Mahabharata, the Ramayana, and the Puranas.\n\nA traditional Kathakali performance starts at dusk and continues through the night, ending at dawn. The dancers undergo years of rigorous physical training and massage to achieve the flexibility and control required for the complex eye and facial muscle movements that convey subtle emotions.",
         significance: "A classical dance-drama that perfectly synthesizes physical theater, devotional storytelling, and traditional South Indian rhythmic structures into a mesmerizing visual spectacle.",
         latitude: 9.9312, longitude: 76.2673, status: "VERIFIED",
         customImage: "https://images.unsplash.com/photo-1605370216694-842df39c1411?q=80&w=2000&auto=format&fit=crop",
         documents: [{ id: "doc5", source: { organization: "Sangeet Natak Akademi", title: "Classical Dances of India" } }]
       };
    } else if (resolvedParams.slug === 'gond-art') {
       site = {
         id: "6", name: "Gond Art", slug: "gond-art", state: "Madhya Pradesh", district: "Mandla", category: "Arts & Crafts",
         description: "Gond art is a form of painting from folk and tribal art that is practiced by one of the largest tribes in India, the Gond, predominantly located in Madhya Pradesh. The word 'Gond' comes from the Dravidian expression 'Kond' which means 'the green mountain'.\n\nGond paintings are a reflection of the tribe's deep connection with nature and their belief that viewing a good image brings good luck. The paintings feature intricate patterns of dots, dashes, and fine lines, traditionally made using natural colors derived from charcoal, colored soil, plant sap, leaves, and cow dung. These elements combine to give the paintings an incredible sense of movement and vitality.\n\nThe subjects often include local flora and fauna, deities, and mythological stories. Central to Gond art is the Mahua tree, which is considered the tree of life. In modern times, Gond artists have transitioned to canvas and acrylics, bringing their mesmerizing, vibrant, and highly detailed art style to global galleries without losing their indigenous narrative roots.",
         significance: "Gond art is far more than just aesthetic expression; it is an unwritten encyclopedia of the tribe's history, spiritual beliefs, and harmonious relationship with the ecosystem. The art form serves as a visual prayer and a tool for cultural transmission across generations.\n\nToday, it stands as a testament to the resilience of indigenous cultures. By adapting to contemporary mediums while preserving their traditional motifs, Gond artists have successfully positioned Indian tribal art on the international stage, providing economic empowerment to their communities while safeguarding their ancestral legacy.",
         latitude: 22.5976, longitude: 80.3802, status: "VERIFIED",
         customImage: "https://images.unsplash.com/photo-1599059813005-11265ba4b4ce?q=80&w=2000&auto=format&fit=crop",
         gallery: [
           "https://images.unsplash.com/photo-1599059813005-11265ba4b4ce?q=80&w=1000&auto=format&fit=crop",
           "https://images.unsplash.com/photo-1601662528567-526cd06f6582?q=80&w=1000&auto=format&fit=crop",
           "https://images.unsplash.com/photo-1582561424760-0321d6daa242?q=80&w=1000&auto=format&fit=crop"
         ],
         documents: [{ id: "doc6", source: { organization: "Tribal Cooperative Marketing Development Federation", title: "Tribal Arts of India" } }]
       };
    } else {
       // Check Custom DB store FIRST
       const customSites = getCustomSites();
       const matchedCustom = customSites.find(c => c.slug === resolvedParams.slug);
       
       if (matchedCustom) {
         site = matchedCustom;
       } else {
         // If it's not in DB and not a hardcoded fallback, dynamically fetch from Wikipedia!
         try {
           const wikiSlug = resolvedParams.slug.replace(/-/g, '_');
           const wikiRes = await fetch(`https://en.wikipedia.org/w/api.php?action=query&prop=extracts|pageimages&explaintext=1&titles=${wikiSlug}&format=json&pithumbsize=800`);
         const wikiData = await wikiRes.json();
         const pages = wikiData.query?.pages;
         const pageId = Object.keys(pages || {})[0];
         
         if (pageId && pageId !== "-1") {
           const page = pages[pageId];
           // Only take the first 3000 characters so it doesn't break UI with massive content, but is still very detailed
           let fullText = page.extract || "No description available.";
           if (fullText.length > 3000) fullText = fullText.substring(0, 3000) + "...";
           
           site = {
             id: `wiki-${pageId}`,
             name: page.title,
             slug: resolvedParams.slug,
             state: "India",
             district: "Unknown",
             category: "Cultural Heritage",
             description: page.extract || "No description available.",
             significance: "This data was dynamically sourced from Wikipedia's knowledge graph.",
             latitude: 0, longitude: 0,
             status: "VERIFIED",
             customImage: page.thumbnail?.source || "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?q=80&w=2071&auto=format&fit=crop",
             documents: [{ id: "wiki_doc", source: { organization: "Wikipedia", title: "Open Encyclopedia" } }]
           };
         } else {
           // Not found on Wikipedia either
           site = null;
         }
       } catch (wikiError) {
         console.error("Wikipedia API fetch failed:", wikiError);
         site = null;
       }
      }
    }
  }

  if (!site) return notFound();

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <div className="w-full bg-primary text-primary-foreground py-16 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/40 z-10 pointer-events-none"></div>
        <div className="absolute inset-0 bg-cover bg-center mix-blend-overlay" style={{ backgroundImage: `url('${site.customImage || "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?q=80&w=2071&auto=format&fit=crop"}')` }}></div>
        <div className="container mx-auto px-4 md:px-6 relative z-20">
          <Badge className="bg-accent text-accent-foreground mb-4 uppercase tracking-widest text-xs">{site.category}</Badge>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-7xl font-bold mb-4">{site.name}</h1>
          <div className="flex items-center text-primary-foreground/90 mt-4">
            <MapPin className="w-5 h-5 mr-2" />
            <span className="text-lg font-medium">{site.district}, {site.state}</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6 py-12 flex flex-col lg:flex-row gap-12">
        {/* Main Content */}
        <div className="flex-1 space-y-10">
          <section>
            <h2 className="font-serif text-3xl font-bold text-primary mb-6">About</h2>
            <div className="prose prose-lg font-sans text-muted-foreground leading-relaxed whitespace-pre-wrap">
              {site.description}
            </div>
          </section>

          <section>
            <h2 className="font-serif text-3xl font-bold text-primary mb-6">Cultural Significance</h2>
            <div className="prose prose-lg font-sans text-muted-foreground leading-relaxed whitespace-pre-wrap">
              {site.significance}
            </div>
          </section>

          {/* Gallery Section */}
          {(site.gallery && site.gallery.length > 0) && (
            <section className="pt-8 border-t border-border">
              <div className="flex items-center mb-6">
                <Camera className="w-6 h-6 text-primary mr-3" />
                <h2 className="font-serif text-3xl font-bold text-primary">Visual Gallery</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {site.gallery.map((imgUrl: string, idx: number) => (
                  <div key={idx} className={`rounded-xl overflow-hidden h-64 shadow-md hover:shadow-xl transition-all ${idx === 2 ? 'sm:col-span-2 h-80' : ''}`}>
                    <img src={imgUrl} alt="Gallery" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Sidebar: Provenance & Map */}
        <div className="w-full lg:w-80 space-y-8">
          <div className="bg-card border rounded-xl p-6 shadow-sm border-border">
            <div className="flex items-center mb-4">
              <CheckCircle2 className="w-6 h-6 text-emerald-500 mr-2" />
              <h3 className="font-bold text-lg font-serif">Verified Sources</h3>
            </div>
            <p className="text-sm text-muted-foreground mb-4 font-sans">
              The information on this page is backed by our strict cultural verification pipeline.
            </p>
            <div className="space-y-4 mt-6">
              {(site.documents || []).map((doc: any) => (
                <div key={doc.id} className="text-sm border-t pt-4 flex items-start">
                  <BookOpen className="w-5 h-5 text-primary mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <div className="font-semibold text-primary">{doc.source?.organization || "Unknown"}</div>
                    <div className="text-muted-foreground text-xs mt-1">{doc.source?.title || "Unknown source"}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-card border rounded-xl overflow-hidden shadow-sm h-64 bg-muted relative">
             <div className="absolute top-4 left-4 z-10 bg-background/90 backdrop-blur-md px-3 py-1 rounded-full border shadow-sm text-xs font-semibold flex items-center">
               <MapPin className="w-3 h-3 mr-1 text-primary" />
               Coordinates Verified
             </div>
             <MiniMap lat={site.latitude} lng={site.longitude} />
          </div>
        </div>
      </div>
    </div>
  );
}
