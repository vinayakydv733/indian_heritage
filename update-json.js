const fs = require('fs');
const path = require('path');

const seedDataPath = path.join(__dirname, 'prisma', 'dharohar-seed-data.json');
const customHeritagePath = path.join(__dirname, 'custom-heritage.json');

const seedData = JSON.parse(fs.readFileSync(seedDataPath, 'utf8'));
let customHeritage = [];
if (fs.existsSync(customHeritagePath)) {
  customHeritage = JSON.parse(fs.readFileSync(customHeritagePath, 'utf8'));
}

const existingSlugs = new Set(customHeritage.map(item => item.slug));
let added = 0;

for (const record of seedData.records) {
  const slug = record.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  if (!existingSlugs.has(slug)) {
    customHeritage.push({
      id: record.id,
      name: record.name,
      slug: slug,
      category: record.type,
      state: record.state_or_ut,
      district: record.city_or_region,
      description: record.short_description,
      significance: record.short_description,
      latitude: 20.5937,
      longitude: 78.9629,
      status: 'VERIFIED',
      customImage: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?q=80&w=1000&auto=format&fit=crop",
      gallery: ["https://images.unsplash.com/photo-1524492412937-b28074a5d7da?q=80&w=1000&auto=format&fit=crop"],
      documents: [{ id: `doc-${record.id}`, source: { organization: record.source_type.split(' / ')[0], title: record.name } }]
    });
    added++;
  }
}

fs.writeFileSync(customHeritagePath, JSON.stringify(customHeritage, null, 2));
console.log(`Added ${added} items to custom-heritage.json`);
