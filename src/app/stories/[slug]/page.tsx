import { Navbar } from "@/components/navbar";
import { Badge } from "@/components/ui/badge";
import { Clock, User, Calendar, MapPin, ChevronRight, BookOpen } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

// Hardcoded rich editorial data for the stories
const editorialData: Record<string, any> = {
  "rhythm-of-devotion-garba": {
    title: "The Rhythm of Devotion: Understanding Garba",
    state: "Gujarat",
    img: "https://images.unsplash.com/photo-1514222709107-a180c68d72b4?q=80&w=2071&auto=format&fit=crop",
    author: "Dr. Anjali Desai",
    date: "September 15, 2026",
    content: "Garba is a traditional dance form originating from the state of Gujarat, India. Performed predominantly during the nine-night festival of Navratri, it is a vibrant expression of devotion to Goddess Durga, who represents divine feminine energy (Shakti). \n\nThe word 'Garba' comes from the Sanskrit word 'Garbha', meaning womb, and 'Deep', meaning a small earthenware lamp. Typically, dancers move in circular patterns around a centrally lit lamp or a picture/statue of the Goddess, symbolizing the cyclical nature of life—from birth to death to rebirth—while the Goddess (the only constant) remains unchanged in the center.",
    timeline: [
      { year: "15th Century", event: "Early references to Garba in Gujarati literature and devotional poetry by Narsinh Mehta." },
      { year: "1930s", event: "Garba became a symbol of cultural unity during the Indian independence movement in Gujarat." },
      { year: "2023", event: "Garba of Gujarat was inscribed on UNESCO's Representative List of the Intangible Cultural Heritage of Humanity." }
    ],
    artists: [
      { name: "Falguni Pathak", role: "Iconic Singer", desc: "Known as the 'Queen of Dandiya', she transformed modern Garba music in the 1990s." },
      { name: "Narsinh Mehta", role: "Poet-Saint", desc: "Composed early devotional songs that formed the rhythmic basis for traditional Garba." }
    ]
  },
  "weavers-of-varanasi": {
    title: "The Weavers of Varanasi: Threads of Gold",
    state: "Uttar Pradesh",
    img: "https://images.unsplash.com/photo-1605559911160-a3d95d213904?q=80&w=2071&auto=format&fit=crop",
    author: "Ravi Shankar",
    date: "August 22, 2026",
    content: "The Banarasi saree is a timeless testament to India's handloom heritage. Woven in Varanasi (Banaras), these sarees are characterized by their brocade or zari, fine silk, and opulent embroidery. \n\nThe weaving tradition here spans centuries. The intricate floral motifs (kalga and bel), a string of upright leaves at the outer edge of the border (jhallar), and heavy gold work are hallmarks of Banarasi weaving. A single saree can take anywhere from 15 days to a month, or sometimes up to six months, to complete depending on the complexity of its design.",
    timeline: [
      { year: "14th Century", event: "Introduction of Persian motifs like paisley into traditional Indian handloom weaving during the Mughal era." },
      { year: "2009", event: "Banaras Brocades and Sarees secured Geographical Indication (GI) rights, protecting the artisans from cheap imitations." },
      { year: "2025", event: "Launch of the 'National Handloom Tech' initiative to preserve digital archives of ancient Jacquard punch cards." }
    ],
    artists: [
      { name: "Master Weaver Maqbool", role: "Master Craftsman", desc: "A 7th-generation weaver keeping the traditional 'Naksha' weaving technique alive." },
      { name: "Kabir", role: "15th-Century Poet", desc: "The legendary mystic poet of Varanasi who was a weaver by profession and used weaving metaphors in his spiritual verses." }
    ]
  },
  "gond-art-nature-soul": {
    title: "Gond Art: Painting Nature's Soul",
    state: "Madhya Pradesh",
    img: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=2071&auto=format&fit=crop",
    author: "Shyam Vyam",
    date: "October 10, 2026",
    content: "The Gond tribe, one of the largest indigenous communities in India, believes that viewing a good image brings good luck. This belief is the foundation of Gond art. \n\nCharacterized by intricate patterns of dots, lines, and dashes, Gond paintings vibrantly capture the deep connection between humans, animals, and the natural world. Traditionally painted on mud walls using natural colors extracted from charcoal, colored soil, plant sap, and cow dung, the art form has successfully transitioned to canvas and paper, reaching global art galleries.",
    timeline: [
      { year: "Ancient Times", event: "Traditional Digna and Bhittichitra paintings on the mud walls of Gond homes during festivals." },
      { year: "1980s", event: "Jangarh Singh Shyam was discovered by J. Swaminathan, bringing Gond art from village walls to paper." },
      { year: "2001", event: "The tragic death of Jangarh Singh Shyam, leading to the naming of the art style as 'Jangarh Kalam' in his honor." }
    ],
    artists: [
      { name: "Jangarh Singh Shyam", role: "Pioneer", desc: "The first Gond artist to use canvas and acrylics, creating the modern school of Gond Art." },
      { name: "Bhajju Shyam", role: "Contemporary Artist", desc: "Author of 'The London Jungle Book', bringing global recognition to Gond storytelling." }
    ]
  },
  "silent-stones-hampi": {
    title: "The Silent Stones of Hampi",
    state: "Karnataka",
    img: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?q=80&w=2071&auto=format&fit=crop",
    author: "Vikram Raya",
    date: "July 04, 2026",
    content: "Set amidst an otherworldly landscape of giant boulders, Hampi was once the capital of the Vijayanagara Empire—one of the richest and most powerful empires in Indian history. \n\nToday, the ruins of Hampi stretch over 4,100 hectares, containing more than 1,600 surviving remains, including forts, riverside features, royal and sacred complexes, temples, shrines, and pillared halls. The Virupaksha Temple and the iconic Stone Chariot in the Vittala Temple complex stand as silent witnesses to an era of immense wealth, profound artistic patronage, and thriving international trade.",
    timeline: [
      { year: "1336 CE", event: "Foundation of the Vijayanagara Empire by Harihara I and Bukka Raya I." },
      { year: "1509–1529 CE", event: "The golden age of the empire under the reign of Emperor Krishnadevaraya." },
      { year: "1565 CE", event: "The Battle of Talikota resulting in the destruction and abandonment of Hampi." },
      { year: "1986", event: "Hampi was designated as a UNESCO World Heritage site." }
    ],
    artists: [
      { name: "Krishnadevaraya", role: "Emperor & Patron", desc: "A great patron of literature and architecture, directly responsible for Hampi's grandest structures." },
      { name: "Purandara Dasa", role: "Composer", desc: "The father of Carnatic music, who composed many of his legendary songs in the temples of Hampi." }
    ]
  },
  "kathakali-dance-gods": {
    title: "Kathakali: The Dance of the Gods",
    state: "Kerala",
    img: "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?q=80&w=2071&auto=format&fit=crop",
    author: "Meera Nair",
    date: "November 18, 2026",
    content: "Kathakali, which translates to 'story play', is a classical Indian dance-drama from Kerala. It is renowned for its elaborate makeup, vibrant costumes, and complex gestures (mudras) that convey deep emotions and tell epic stories from the Ramayana, Mahabharata, and Puranas. \n\nThe training for a Kathakali artist begins at a very young age and involves rigorous physical conditioning, eye exercises, and mastering over 500 different mudras. A traditional performance begins at dusk and continues until dawn, lit only by a massive brass lamp (Kalivilakku) that casts dramatic shadows on the performers' painted faces.",
    timeline: [
      { year: "17th Century", event: "Evolution of Kathakali from earlier art forms like Ramanattam and Krishnattam under the patronage of the Raja of Kottarakkara." },
      { year: "1930", event: "Poet Vallathol Narayana Menon founded the Kerala Kalamandalam, saving the dying art form from extinction." },
      { year: "2010", event: "UNESCO recognition of Mudiyettu (a precursor to Kathakali) elevating the global profile of Kerala's ritualistic arts." }
    ],
    artists: [
      { name: "Kalamandalam Gopi", role: "Legendary Actor", desc: "Renowned for his emotional depth in romantic and dramatic roles, especially as Nala or Arjuna." },
      { name: "Vallathol Narayana Menon", role: "Poet & Reviver", desc: "The visionary poet who rescued Kathakali from obscurity in the early 20th century." }
    ]
  }
};

export default async function StoryDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const story = editorialData[resolvedParams.slug];

  if (!story) return notFound();

  return (
    <div className="flex flex-col min-h-screen bg-background selection:bg-primary/30">
      <Navbar />

      <div className="w-full relative h-[60vh] md:h-[70vh] flex items-end pb-16 md:pb-24">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('${story.img}')` }}></div>
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl">
            <Badge className="mb-4 bg-accent text-accent-foreground hover:bg-accent/90 px-4 py-1 text-sm tracking-wider uppercase">
              {story.state}
            </Badge>
            <h1 className="font-serif text-5xl md:text-7xl font-bold text-foreground leading-tight mb-6">
              {story.title}
            </h1>
            <div className="flex flex-wrap items-center gap-6 text-muted-foreground font-sans">
              <div className="flex items-center">
                <User className="w-5 h-5 mr-2" />
                <span>{story.author}</span>
              </div>
              <div className="flex items-center">
                <Calendar className="w-5 h-5 mr-2" />
                <span>{story.date}</span>
              </div>
              <div className="flex items-center">
                <MapPin className="w-5 h-5 mr-2" />
                <span>{story.state}, India</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="flex flex-col lg:flex-row gap-16 max-w-6xl mx-auto">
          
          {/* Main Content */}
          <div className="lg:w-2/3">
            <div className="prose prose-lg dark:prose-invert prose-headings:font-serif prose-p:font-sans prose-p:leading-relaxed max-w-none">
              <p className="text-xl md:text-2xl font-serif text-primary leading-relaxed border-l-4 border-accent pl-6 mb-12">
                {story.content.split("\n\n")[0]}
              </p>
              
              <h2 className="text-3xl font-serif font-bold mt-12 mb-6">Historical Context & Significance</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {story.content.split("\n\n")[1]}
              </p>
            </div>
          </div>

          {/* Sidebar: Timeline & Artists */}
          <div className="lg:w-1/3 space-y-12">
            
            {/* Timeline */}
            <div className="bg-card border rounded-3xl p-8 shadow-sm">
              <h3 className="font-serif text-2xl font-bold flex items-center mb-8 border-b pb-4">
                <Clock className="w-6 h-6 mr-3 text-primary" />
                Historical Timeline
              </h3>
              <div className="space-y-8 relative before:absolute before:inset-0 before:ml-2 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-border before:to-transparent">
                {story.timeline.map((item: any, i: number) => (
                  <div key={i} className="relative flex items-start gap-4">
                    <div className="absolute left-[-29px] mt-1.5 w-4 h-4 rounded-full bg-accent ring-4 ring-background border border-border"></div>
                    <div className="pl-4">
                      <span className="text-xs font-bold uppercase tracking-widest text-primary block mb-1">{item.year}</span>
                      <p className="text-sm text-muted-foreground">{item.event}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Notable Figures */}
            <div className="bg-muted/30 border rounded-3xl p-8">
              <h3 className="font-serif text-2xl font-bold flex items-center mb-8 border-b pb-4">
                <BookOpen className="w-6 h-6 mr-3 text-primary" />
                Key Figures & Artists
              </h3>
              <div className="space-y-6">
                {story.artists.map((artist: any, i: number) => (
                  <div key={i} className="group">
                    <h4 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">{artist.name}</h4>
                    <span className="text-xs font-semibold text-accent uppercase tracking-wider block mb-2">{artist.role}</span>
                    <p className="text-sm text-muted-foreground leading-relaxed">{artist.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
