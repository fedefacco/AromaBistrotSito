/**
 * Script di seeding dati placeholder per sviluppo.
 * Esegui con: node scripts/seed-dev.mjs
 * Richiede: NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET, SANITY_API_TOKEN in .env.local
 */

import { readFileSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dir = dirname(fileURLToPath(import.meta.url))

// Legge .env.local manualmente
const envPath = resolve(__dir, '../.env.local')
const env = Object.fromEntries(
  readFileSync(envPath, 'utf8')
    .split('\n')
    .filter(l => l.includes('='))
    .map(l => l.split('=').map(s => s.trim()))
)

const PROJECT_ID = env.NEXT_PUBLIC_SANITY_PROJECT_ID
const DATASET = env.NEXT_PUBLIC_SANITY_DATASET ?? 'production'
const TOKEN = env.SANITY_API_TOKEN
const API_VERSION = '2024-01-01'
const BASE = `https://${PROJECT_ID}.api.sanity.io/v${API_VERSION}`

const headers = {
  Authorization: `Bearer ${TOKEN}`,
  'Content-Type': 'application/json',
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

async function mutate(mutations) {
  const res = await fetch(`${BASE}/data/mutate/${DATASET}`, {
    method: 'POST',
    headers,
    body: JSON.stringify({ mutations }),
  })
  const json = await res.json()
  if (!res.ok) throw new Error(`Mutate error: ${JSON.stringify(json)}`)
  return json
}

async function uploadImageFromUrl(url, label) {
  console.log(`  ↑ Carico immagine: ${label}`)
  const res = await fetch(url)
  if (!res.ok) throw new Error(`Fetch immagine fallito: ${url}`)
  const buffer = await res.arrayBuffer()

  const uploadRes = await fetch(`${BASE}/assets/images/${DATASET}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      'Content-Type': 'image/jpeg',
    },
    body: buffer,
  })
  const json = await uploadRes.json()
  if (!uploadRes.ok) throw new Error(`Upload error: ${JSON.stringify(json)}`)
  return json.document._id // es. "image-abc123-1920x1080-jpg"
}

function imageRef(assetId, alt) {
  return { _type: 'image', asset: { _type: 'reference', _ref: assetId }, alt }
}

// ─── Dati ─────────────────────────────────────────────────────────────────────

const CATEGORIES = [
  { _id: 'cat-antipasti', nome: 'Antipasti', ordine: 1 },
  { _id: 'cat-primi',     nome: 'Primi',     ordine: 2 },
  { _id: 'cat-secondi',   nome: 'Secondi',   ordine: 3 },
  { _id: 'cat-dessert',   nome: 'Dessert',   ordine: 4 },
]

const ITEMS = [
  {
    _id: 'item-burrata',
    nome: 'Burrata pugliese con pomodorini confit',
    descrizione: 'Crema fresca di latte con cuore morbido, pomodorini arrostiti, olio al basilico',
    prezzo: 12,
    tag: ['signature'],
    categoriaId: 'cat-antipasti',
    ordine: 1,
  },
  {
    _id: 'item-carpaccio',
    nome: 'Carpaccio di manzo con rucola e grana',
    descrizione: 'Fettine sottili di fassona piemontese, scaglie di Grana Padano, senape antica',
    prezzo: 16,
    tag: [],
    categoriaId: 'cat-antipasti',
    ordine: 2,
  },
  {
    _id: 'item-tagliatelle',
    nome: 'Tagliatelle al ragù di cinghiale',
    descrizione: 'Pasta fresca all\'uovo, ragù lento di cinghiale del Chianti, rosmarino e ginepro',
    prezzo: 18,
    tag: ['signature'],
    categoriaId: 'cat-primi',
    ordine: 1,
  },
  {
    _id: 'item-risotto',
    nome: 'Risotto al Barolo con ossobuco',
    descrizione: 'Riso Carnaroli mantecato al Barolo, gremolata di limone e prezzemolo',
    prezzo: 22,
    tag: [],
    categoriaId: 'cat-primi',
    ordine: 2,
  },
  {
    _id: 'item-filetto',
    nome: 'Filetto di manzo al pepe verde',
    descrizione: 'Fassona piemontese 200g, salsa al pepe verde in grani, patate al forno con rosmarino',
    prezzo: 28,
    tag: [],
    categoriaId: 'cat-secondi',
    ordine: 1,
  },
  {
    _id: 'item-branzino',
    nome: 'Branzino in crosta di erbe aromatiche',
    descrizione: 'Filetto di branzino con crosta di erbette, verdure di stagione, limone confit',
    prezzo: 24,
    tag: ['glutenFree'],
    categoriaId: 'cat-secondi',
    ordine: 2,
  },
  {
    _id: 'item-tiramisu',
    nome: 'Tiramisù della casa',
    descrizione: 'Ricetta della nonna, savoiardi imbevuti, mascarpone al caffè espresso',
    prezzo: 8,
    tag: ['signature'],
    categoriaId: 'cat-dessert',
    ordine: 1,
  },
  {
    _id: 'item-pannacotta',
    nome: 'Panna cotta ai frutti di bosco',
    descrizione: 'Panna cotta alla vaniglia bourbon, coulis caldo di lamponi e mirtilli selvatici',
    prezzo: 7,
    tag: ['vegetarian'],
    categoriaId: 'cat-dessert',
    ordine: 2,
  },
]

// ─── Main ──────────────────────────────────────────────────────────────────────

async function main() {
  console.log('🌱 Seeding dati placeholder Aroma Bistrot...\n')

  // 1. Carica immagini placeholder
  console.log('📸 Carico immagini placeholder...')
  const heroId    = await uploadImageFromUrl('https://picsum.photos/seed/hero/1920/1080',    'Hero desktop')
  const foodId    = await uploadImageFromUrl('https://picsum.photos/seed/food/800/1067',     'Immagine editoriale menu')
  const mobile1Id = await uploadImageFromUrl('https://picsum.photos/seed/mobile/768/1024',   'Hero mobile')
  console.log('  ✓ Immagini caricate\n')

  // 2. Crea categorie menu
  console.log('🗂  Creo categorie menu...')
  await mutate(
    CATEGORIES.map(cat => ({
      createOrReplace: { _id: cat._id, _type: 'menuCategories', nome: cat.nome, ordine: cat.ordine },
    }))
  )
  console.log(`  ✓ ${CATEGORIES.length} categorie create\n`)

  // 3. Crea piatti
  console.log('🍽  Creo piatti...')
  await mutate(
    ITEMS.map(item => ({
      createOrReplace: {
        _id: item._id,
        _type: 'menuItems',
        nome: item.nome,
        descrizione: item.descrizione,
        prezzo: item.prezzo,
        tag: item.tag,
        categoria: { _type: 'reference', _ref: item.categoriaId },
        visibile: true,
        ordine: item.ordine,
      },
    }))
  )
  console.log(`  ✓ ${ITEMS.length} piatti creati\n`)

  // 4. Aggiorna settings (se non esiste)
  console.log('⚙️  Aggiorno settings...')
  await mutate([{
    createIfNotExists: {
      _id: 'settings',
      _type: 'settings',
      nomeLocale: 'Aroma Bistrot',
      telefono: '+39 0373 123456',
      whatsapp: '390373123456',
      indirizzoStrada: 'Via Madonna del Pozzo 30',
      citta: 'Offanengo (CR)',
      instagram: 'aromabistrot',
      email: 'info@aromabistrot.it',
      metaDescrizioneDefault: 'Aroma Bistrot — cucina contemporanea nel cuore della Lombardia, Offanengo (CR).',
      orariSettimanali: [
        { giorno: 'lunedi',    chiuso: true },
        { giorno: 'martedi',   chiuso: true },
        { giorno: 'mercoledi', orario: '19:30 – 22:30', chiuso: false },
        { giorno: 'giovedi',   orario: '19:30 – 22:30', chiuso: false },
        { giorno: 'venerdi',   orario: '12:30 – 14:30 · 19:30 – 22:30', chiuso: false },
        { giorno: 'sabato',    orario: '12:30 – 14:30 · 19:30 – 22:30', chiuso: false },
        { giorno: 'domenica',  orario: '12:30 – 14:30', chiuso: false },
      ],
    },
  }])
  console.log('  ✓ Settings OK\n')

  // 5. Crea/aggiorna homepageConfig
  console.log('🏠 Aggiorno homepageConfig...')
  await mutate([{
    createOrReplace: {
      _id: 'homepageConfig',
      _type: 'homepageConfig',
      immagineHero: imageRef(heroId, 'Vista della sala di Aroma Bistrot'),
      immagineHeroMobile: imageRef(mobile1Id, 'Aroma Bistrot — atmosfera'),
      testoHero: 'Cucina contemporanea nel cuore della Lombardia',
      presentazione: 'Aroma Bistrot è un luogo dove la cucina incontra la passione. Ogni piatto racconta una storia di territorio, stagionalità e ricerca degli ingredienti migliori. Vi aspettiamo per condividere con voi momenti indimenticabili.',
      testoVini: 'Una selezione curata di vini italiani e internazionali, pensata per accompagnare ogni piatto e ogni momento della serata.',
      piattiInEvidenza: [
        { _key: 'ev1', _type: 'reference', _ref: 'item-burrata' },
        { _key: 'ev2', _type: 'reference', _ref: 'item-tagliatelle' },
        { _key: 'ev3', _type: 'reference', _ref: 'item-filetto' },
        { _key: 'ev4', _type: 'reference', _ref: 'item-tiramisu' },
      ],
      sezioniVisibili: {
        presentazione: true,
        menuPreview: true,
        eventi: false,
        galleryTeaser: false,
        vini: false,
      },
    },
  }])
  console.log('  ✓ homepageConfig aggiornato\n')

  // 6. Crea siteGallery con immagine in evidenza (per decorativa MenuPreview)
  console.log('🖼  Aggiorno siteGallery...')
  await mutate([{
    createOrReplace: {
      _id: 'siteGallery',
      _type: 'siteGallery',
      immagini: [
        { _key: 'g1', ...imageRef(foodId, 'Dettaglio di un piatto — Aroma Bistrot'), categoria: 'cucina', inEvidenza: true },
      ],
    },
  }])
  console.log('  ✓ siteGallery aggiornata\n')

  console.log('✅ Seeding completato! Ricarica http://localhost:3000')
}

main().catch(err => {
  console.error('❌ Errore:', err.message)
  process.exit(1)
})
