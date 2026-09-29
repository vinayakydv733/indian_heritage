"use client";

import dynamic from "next/dynamic";

const MapClient = dynamic(() => import("./map-client"), { ssr: false });

export default function MapWrapper({ sites }: { sites: any[] }) {
  return <MapClient sites={sites} />;
}
