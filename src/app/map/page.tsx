import { Navbar } from "@/components/navbar";
import dynamic from "next/dynamic";
const MapClient = dynamic(() => import("./map-client"), { ssr: false });
import { getCustomSites } from "@/lib/data-store";

const heritageSites = [
  {
    name: "Garba of Gujarat",
    slug: "garba-of-gujarat",
    category: "Dance & Music",
    state: "Gujarat",
    latitude: 23.0225, 
    longitude: 72.5714,
    image: "/assets/images/garba.jpg"
  },
  {
    name: "Khajuraho Group of Monuments",
    slug: "khajuraho-monuments",
    category: "Monuments",
    state: "Madhya Pradesh",
    latitude: 24.8318, 
    longitude: 79.9199,
    image: "https://images.unsplash.com/photo-1598890777032-bde835ba27c2?q=80&w=800&auto=format&fit=crop"
  },
  {
    name: "Taj Mahal",
    slug: "taj-mahal",
    category: "Monuments",
    state: "Uttar Pradesh",
    latitude: 27.1751, 
    longitude: 78.0421,
    image: "https://images.unsplash.com/photo-1548013146-72479768bada?q=80&w=800&auto=format&fit=crop"
  },
  {
    name: "Hampi",
    slug: "hampi",
    category: "Monuments",
    state: "Karnataka",
    latitude: 15.3350, 
    longitude: 76.4600,
    image: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?q=80&w=800&auto=format&fit=crop"
  },
  {
    name: "Kathakali Dance",
    slug: "kathakali",
    category: "Dance & Music",
    state: "Kerala",
    latitude: 9.9312, 
    longitude: 76.2673,
    image: "/assets/images/dance.jpg"
  },
  {
    name: "Gond Art",
    slug: "gond-art",
    category: "Arts & Crafts",
    state: "Madhya Pradesh",
    latitude: 22.5976, 
    longitude: 80.3802,
    image: "/assets/images/crafts.jpg"
  }
];

export default async function MapPage() {
  const customSites = getCustomSites();
  const allSites = [
    ...customSites,
    ...heritageSites
  ];

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <Navbar />
      <MapClient sites={allSites} />
    </div>
  );
}
