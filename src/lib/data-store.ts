import fs from 'fs';
import path from 'path';

export interface CustomHeritageSite {
  id: string;
  name: string;
  slug: string;
  state: string;
  district: string;
  category: string;
  description: string;
  significance: string;
  latitude: number;
  longitude: number;
  status: string;
  customImage: string;
  gallery: string[];
  documents?: any[];
}

const dbPath = path.join(process.cwd(), 'custom-heritage.json');

export function getCustomSites(): CustomHeritageSite[] {
  if (!fs.existsSync(dbPath)) {
    return [];
  }
  const data = fs.readFileSync(dbPath, 'utf8');
  return JSON.parse(data);
}

export function addCustomSite(site: Omit<CustomHeritageSite, 'id' | 'slug' | 'status'>) {
  const sites = getCustomSites();
  const slug = site.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
  
  const newSite: CustomHeritageSite = {
    ...site,
    id: `custom-${Date.now()}`,
    slug,
    status: 'VERIFIED'
  };
  
  sites.push(newSite);
  fs.writeFileSync(dbPath, JSON.stringify(sites, null, 2));
  return newSite;
}
