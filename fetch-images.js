const fs = require('fs');
const path = require('path');

const customHeritagePath = path.join(__dirname, 'custom-heritage.json');
let customHeritage = JSON.parse(fs.readFileSync(customHeritagePath, 'utf8'));

const DEFAULT_IMAGE = "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?q=80&w=1000&auto=format&fit=crop";

const FALLBACK_IMAGES = [
  "https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?q=80&w=1000&auto=format&fit=crop", // Hawa Mahal
  "https://images.unsplash.com/photo-1587474260584-136574528ed5?q=80&w=1000&auto=format&fit=crop", // Delhi Street
  "https://images.unsplash.com/photo-1514222134-b57cbb8ce073?q=80&w=1000&auto=format&fit=crop", // Golden Temple
  "https://images.unsplash.com/photo-1533422902779-babfac30fc10?q=80&w=1000&auto=format&fit=crop", // Gateway of India
  "https://images.unsplash.com/photo-1561359313-0639aad3a644?q=80&w=1000&auto=format&fit=crop", // Kerala
  "https://images.unsplash.com/photo-1558431382-27e303142255?q=80&w=1000&auto=format&fit=crop", // Rajasthan Fort
];

const sleep = ms => new Promise(r => setTimeout(r, ms));

async function fetchWithUA(url, retries = 3) {
  for (let i = 0; i < retries; i++) {
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'IndianHeritageApp/2.0 (contact@example.com)'
      }
    });
    if (res.status === 429) {
      console.log(`Rate limited. Waiting ${2000 * (i + 1)}ms...`);
      await sleep(2000 * (i + 1));
      continue;
    }
    if (!res.ok) throw new Error(`Status ${res.status}`);
    const text = await res.text();
    try {
      return JSON.parse(text);
    } catch (e) {
      throw new Error(`Invalid JSON: ${text.substring(0, 50)}`);
    }
  }
  throw new Error("Max retries reached");
}

async function fetchImages() {
  let updatedCount = 0;
  console.log("Starting image fetch for remaining default images...");
  for (let i = 0; i < customHeritage.length; i++) {
    const item = customHeritage[i];
    if (item.customImage === DEFAULT_IMAGE || !item.customImage || item.customImage === 'undefined' || FALLBACK_IMAGES.includes(item.customImage)) {
      console.log(`Fetching image for: ${item.name}`);
      try {
        await sleep(1000); // Wait 1 second between items
        const wikiSlug = encodeURIComponent(item.name.replace(/ /g, '_'));
        const data = await fetchWithUA(`https://en.wikipedia.org/w/api.php?action=query&prop=pageimages&titles=${wikiSlug}&format=json&pithumbsize=1000`);
        
        const pages = data.query.pages;
        const pageId = Object.keys(pages)[0];
        
        let found = false;
        if (pageId !== "-1" && pages[pageId].thumbnail) {
          item.customImage = pages[pageId].thumbnail.source;
          item.gallery = [pages[pageId].thumbnail.source];
          updatedCount++;
          found = true;
          console.log(`  -> Found image for ${item.name}`);
        } else {
          await sleep(1000);
          const searchData = await fetchWithUA(`https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${wikiSlug}&format=json&utf8=`);
          if (searchData.query && searchData.query.search && searchData.query.search.length > 0) {
            const firstResult = encodeURIComponent(searchData.query.search[0].title.replace(/ /g, '_'));
            await sleep(1000);
            const data2 = await fetchWithUA(`https://en.wikipedia.org/w/api.php?action=query&prop=pageimages&titles=${firstResult}&format=json&pithumbsize=1000`);
            const pages2 = data2.query.pages;
            const pageId2 = Object.keys(pages2)[0];
            if (pageId2 !== "-1" && pages2[pageId2].thumbnail) {
              item.customImage = pages2[pageId2].thumbnail.source;
              item.gallery = [pages2[pageId2].thumbnail.source];
              updatedCount++;
              found = true;
              console.log(`  -> Found image for ${item.name} via search (${searchData.query.search[0].title})`);
            }
          }
        }
        
        if (!found) {
            console.log(`  -> No image found on Wiki. Using random fallback.`);
            const fb = FALLBACK_IMAGES[Math.floor(Math.random() * FALLBACK_IMAGES.length)];
            item.customImage = fb;
            item.gallery = [fb];
            updatedCount++;
        }
      } catch (err) {
        console.error(`Error fetching image for ${item.name}:`, err.message);
        console.log(`  -> Using random fallback due to error.`);
        const fb = FALLBACK_IMAGES[Math.floor(Math.random() * FALLBACK_IMAGES.length)];
        item.customImage = fb;
        item.gallery = [fb];
        updatedCount++;
      }
      
      if (updatedCount % 5 === 0 && updatedCount > 0) {
        fs.writeFileSync(customHeritagePath, JSON.stringify(customHeritage, null, 2));
      }
    }
  }
  
  fs.writeFileSync(customHeritagePath, JSON.stringify(customHeritage, null, 2));
  console.log(`\nUpdated images for ${updatedCount} items.`);
}

fetchImages();
