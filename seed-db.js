const fs = require('fs');
const path = require('path');

const topics = [
  { name: "Qutb Minar", cat: "Monuments", state: "Delhi" },
  { name: "Red Fort", cat: "Monuments", state: "Delhi" },
  { name: "Ajanta Caves", cat: "Monuments", state: "Maharashtra" },
  { name: "Ellora Caves", cat: "Monuments", state: "Maharashtra" },
  { name: "Konark Sun Temple", cat: "Monuments", state: "Odisha" },
  { name: "Gateway of India", cat: "Monuments", state: "Maharashtra" },
  { name: "Mysore Palace", cat: "Monuments", state: "Karnataka" },
  { name: "Diwali", cat: "Festivals", state: "Pan-India" },
  { name: "Holi", cat: "Festivals", state: "Pan-India" },
  { name: "Durga Puja", cat: "Festivals", state: "West Bengal" },
  { name: "Onam", cat: "Festivals", state: "Kerala" },
  { name: "Maha Shivaratri", cat: "Festivals", state: "Pan-India" },
  { name: "Bharatanatyam", cat: "Dance & Music", state: "Tamil Nadu" },
  { name: "Kathak", cat: "Dance & Music", state: "North India" },
  { name: "Odissi", cat: "Dance & Music", state: "Odisha" },
  { name: "Manipuri dance", cat: "Dance & Music", state: "Manipur" },
  { name: "Mohiniyattam", cat: "Dance & Music", state: "Kerala" },
  { name: "Madhubani art", cat: "Arts & Crafts", state: "Bihar" },
  { name: "Warli painting", cat: "Arts & Crafts", state: "Maharashtra" },
  { name: "Pattachitra", cat: "Arts & Crafts", state: "Odisha" },
];

async function seedDB() {
  console.log("Starting data collection for " + topics.length + " heritage sites...");
  const sites = [];
  
  for (const topic of topics) {
    try {
      console.log(`Fetching data for: ${topic.name}`);
      const wikiSlug = encodeURIComponent(topic.name.replace(/ /g, '_'));
      const res = await fetch(`https://en.wikipedia.org/w/api.php?action=query&prop=extracts|pageimages|coordinates&exintro=1&explaintext=1&titles=${wikiSlug}&format=json&pithumbsize=1000`);
      const data = await res.json();
      
      const pages = data.query.pages;
      const pageId = Object.keys(pages)[0];
      
      if (pageId !== "-1") {
        const page = pages[pageId];
        let desc = page.extract || `${topic.name} is a renowned part of Indian heritage.`;
        if (desc.length > 2500) desc = desc.substring(0, 2500) + "...";
        
        const coords = page.coordinates ? page.coordinates[0] : { lat: 20.5937, lon: 78.9629 };
        const image = page.thumbnail ? page.thumbnail.source : "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?q=80&w=1000&auto=format&fit=crop";

        sites.push({
          id: `seed-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          name: topic.name,
          slug: topic.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
          category: topic.cat,
          state: topic.state,
          district: "Multiple",
          description: desc,
          significance: desc, // Duplicate for simplicity
          latitude: coords.lat,
          longitude: coords.lon,
          status: "VERIFIED",
          customImage: image,
          gallery: [image],
          documents: [{ id: `doc-${pageId}`, source: { organization: "Wikipedia Foundation", title: "Open Encyclopedia" } }]
        });
      }
    } catch (err) {
      console.error(`Error fetching ${topic.name}:`, err.message);
    }
  }

  const dbPath = path.join(process.cwd(), 'custom-heritage.json');
  
  // Read existing
  let existing = [];
  if (fs.existsSync(dbPath)) {
    existing = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
  }
  
  const finalSites = [...sites, ...existing];
  
  fs.writeFileSync(dbPath, JSON.stringify(finalSites, null, 2));
  console.log(`\n✅ Database successfully populated with ${sites.length} new high-quality entries!`);
}

seedDB();
