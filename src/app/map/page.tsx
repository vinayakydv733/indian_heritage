import { Navbar } from "@/components/navbar";
import MapWrapper from "./map-wrapper";
import { getCustomSites } from "@/lib/data-store";

export default async function MapPage() {
  const customSites = getCustomSites();
  const allSites = [...customSites];

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <Navbar />
      <MapWrapper sites={allSites} />
    </div>
  );
}
