import { PrismaClient } from '@prisma/client'
import fs from 'fs'
import path from 'path'

const prisma = new PrismaClient()

async function main() {
  console.log('Seeding Dharohar Database...')

  // Enable pgvector extension if not exists
  await prisma.$executeRaw`CREATE EXTENSION IF NOT EXISTS vector;`

  // Read the seed data
  const seedDataPath = path.join(process.cwd(), 'prisma', 'dharohar-seed-data.json')
  if (!fs.existsSync(seedDataPath)) {
    console.warn(`Seed file not found at ${seedDataPath}`)
    return
  }

  const rawData = fs.readFileSync(seedDataPath, 'utf8')
  const seedData = JSON.parse(rawData)

  console.log(`Loaded ${seedData.dataset_name} with ${seedData.record_count} records.`)

  // Create Sources Map
  const sourcesMap = new Map()
  for (const src of seedData.source_registry) {
    const createdSource = await prisma.source.create({
      data: {
        organization: src.organization,
        title: src.purpose,
        sourceType: 'Official',
        url: src.url,
      }
    })
    sourcesMap.set(src.organization, createdSource)
  }

  let count = 0
  for (const record of seedData.records) {
    const slug = record.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')

    // Find a source or use a generic one
    let source = sourcesMap.get(record.source_type.split(' / ')[0])
    if (!source) {
      // Use the first source as a fallback
      source = Array.from(sourcesMap.values())[0]
    }

    try {
      const site = await prisma.heritageSite.upsert({
        where: { slug },
        update: {},
        create: {
          name: record.name,
          slug: slug,
          state: record.state_or_ut,
          district: record.city_or_region,
          category: record.type,
          description: record.short_description,
          significance: record.short_description, // Duplicate for simplicity
          status: 'VERIFIED',
        }
      })

      const doc = await prisma.heritageDocument.create({
        data: {
          heritageId: site.id,
          sourceId: source.id,
          title: `${record.name} Cultural Entry`,
          content: record.short_description,
        }
      })

      // Generate dummy vector for seed to avoid API call cost during dev
      const dummyVector = `[${Array.from({ length: 768 }).fill(0.1).join(',')}]`

      await prisma.$executeRaw`
        INSERT INTO "DocumentChunk" ("id", "documentId", "chunkIndex", "text", "embedding")
        VALUES 
        (gen_random_uuid()::text, ${doc.id}, 1, ${record.short_description}, ${dummyVector}::vector);
      `
      count++
    } catch (e) {
      console.warn(`Skipped ${record.name} - ${e.message}`)
    }
  }

  console.log(`Seeding complete! Added ${count} entries to Knowledge Graph.`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
