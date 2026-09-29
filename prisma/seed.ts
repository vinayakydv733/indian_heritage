import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('Seeding Dharohar Database...')

  // Enable pgvector extension if not exists
  await prisma.$executeRaw`CREATE EXTENSION IF NOT EXISTS vector;`

  // 1. Create a Verified Source
  const unescoSource = await prisma.source.create({
    data: {
      organization: 'UNESCO',
      title: 'Intangible Cultural Heritage List',
      sourceType: 'Official',
      url: 'https://ich.unesco.org/en/RL/garba-of-gujarat-01962'
    }
  })

  // 2. Create a Heritage Site
  const garba = await prisma.heritageSite.create({
    data: {
      name: 'Garba of Gujarat',
      slug: 'garba-of-gujarat',
      state: 'Gujarat',
      district: 'Ahmedabad',
      category: 'Dance & Music',
      description: 'Garba is a ritualistic and devotional dance performed on the occasion of the Hindu festival Navratri, which is dedicated to the worship of the feminine energy or Shakti.',
      significance: 'The dance celebrates fertility, honors womanhood, and pays respect to any of an array of mother goddesses. It is a unifying force that brings communities together across socio-economic backgrounds.',
      latitude: 23.0225,
      longitude: 72.5714,
      status: 'VERIFIED',
    }
  })

  // 3. Create a Document
  const doc = await prisma.heritageDocument.create({
    data: {
      heritageId: garba.id,
      sourceId: unescoSource.id,
      title: 'Garba Cultural Entry',
      content: 'Garba is a ritualistic and devotional dance performed on the occasion of the Hindu festival Navratri.',
    }
  })

  // 4. Create Document Chunks (for RAG)
  // Generate dummy vector for seed to avoid API call cost during dev
  const dummyVector = `[${Array.from({ length: 768 }).fill(0.1).join(',')}]`

  await prisma.$executeRaw`
    INSERT INTO "DocumentChunk" ("id", "documentId", "chunkIndex", "text", "embedding")
    VALUES 
    (gen_random_uuid()::text, ${doc.id}, 1, 'Garba is a ritualistic and devotional dance performed on the occasion of the Hindu festival Navratri, dedicated to the worship of Shakti.', ${dummyVector}::vector),
    (gen_random_uuid()::text, ${doc.id}, 2, 'The dance celebrates fertility, honors womanhood, and brings communities together across socio-economic backgrounds.', ${dummyVector}::vector);
  `

  console.log('Seeding complete! Added "Garba of Gujarat" to Knowledge Graph.')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
