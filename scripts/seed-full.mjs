/**
 * Seeding completo Aroma Bistrot — menu, eventi, vini, galleria, about, pagine.
 * Esegui con: node scripts/seed-full.mjs
 * Richiede: NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET, SANITY_API_TOKEN in .env.local
 */

import { readFileSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dir = dirname(fileURLToPath(import.meta.url))
const envPath = resolve(__dir, '../.env.local')
const env = Object.fromEntries(
  readFileSync(envPath, 'utf8')
    .split('\n')
    .filter(l => l.includes('=') && !l.startsWith('#'))
    .map(l => {
      const idx = l.indexOf('=')
      return [l.slice(0, idx).trim(), l.slice(idx + 1).trim()]
    })
)

const PROJECT_ID = env.NEXT_PUBLIC_SANITY_PROJECT_ID
const DATASET    = env.NEXT_PUBLIC_SANITY_DATASET ?? 'production'
const TOKEN      = env.SANITY_API_TOKEN
const API_VER    = '2024-01-01'
const BASE       = `https://${PROJECT_ID}.api.sanity.io/v${API_VER}`

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
  process.stdout.write(`    ${label}... `)
  const res = await fetch(url)
  if (!res.ok) throw new Error(`Fetch immagine fallito (${res.status}): ${url}`)
  const buffer = await res.arrayBuffer()
  const uploadRes = await fetch(`${BASE}/assets/images/${DATASET}`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${TOKEN}`, 'Content-Type': 'image/jpeg' },
    body: buffer,
  })
  const json = await uploadRes.json()
  if (!uploadRes.ok) throw new Error(`Upload error: ${JSON.stringify(json)}`)
  console.log('✓')
  return json.document._id
}

const imgRef = (assetId, alt) => ({
  _type: 'image',
  asset: { _type: 'reference', _ref: assetId },
  alt,
})

// Portable text: paragrafo semplice
const blk = (text, key) => ({
  _type: 'block',
  _key: key,
  style: 'normal',
  children: [{ _type: 'span', _key: `${key}s`, text, marks: [] }],
  markDefs: [],
})

// ─── Immagini Picsum (seed fisso = stessa immagine ad ogni run) ──────────────

const PICSUM = (seed, w, h) => `https://picsum.photos/seed/${seed}/${w}/${h}`

const IMGS = {
  heroDesktop:    PICSUM('ab-hero-d', 1920, 1080),
  heroMobile:     PICSUM('ab-hero-m', 768, 1366),
  aboutHero:      PICSUM('ab-about', 1400, 800),
  aboutInt1:      PICSUM('ab-aint1', 900, 600),
  aboutInt2:      PICSUM('ab-aint2', 600, 900),
  gallery1:       PICSUM('ab-g1', 900, 600),
  gallery2:       PICSUM('ab-g2', 600, 900),
  gallery3:       PICSUM('ab-g3', 900, 600),
  gallery4:       PICSUM('ab-g4', 900, 600),
  gallery5:       PICSUM('ab-g5', 600, 900),
  gallery6:       PICSUM('ab-g6', 900, 600),
  gallery7:       PICSUM('ab-g7', 900, 600),
  gallery8:       PICSUM('ab-g8', 600, 900),
  menu1:          PICSUM('ab-m1', 800, 600),
  menu2:          PICSUM('ab-m2', 800, 600),
  menu3:          PICSUM('ab-m3', 800, 600),
  menu4:          PICSUM('ab-m4', 800, 600),
  menu5:          PICSUM('ab-m5', 800, 600),
  menu6:          PICSUM('ab-m6', 800, 600),
  event1:         PICSUM('ab-ev1', 1200, 800),
  event2:         PICSUM('ab-ev2', 1200, 800),
  event3:         PICSUM('ab-ev3', 1200, 800),
  event4:         PICSUM('ab-ev4', 1200, 800),
  wine1:          PICSUM('ab-w1', 400, 600),
  wine2:          PICSUM('ab-w2', 400, 600),
  wine3:          PICSUM('ab-w3', 400, 600),
  wine4:          PICSUM('ab-w4', 400, 600),
  wine5:          PICSUM('ab-w5', 400, 600),
}

// ─── Main ──────────────────────────────────────────────────────────────────────

async function main() {
  console.log('\n🌱 Seeding completo Aroma Bistrot')
  console.log('━'.repeat(52))

  // ─ 1. Upload immagini ─────────────────────────────────────────────────────
  console.log('\n📸 Upload immagini...')
  const ids = {}
  for (const [key, url] of Object.entries(IMGS)) {
    ids[key] = await uploadImageFromUrl(url, key)
  }
  console.log(`  → ${Object.keys(ids).length} immagini caricate`)

  // ─ 2. Settings ────────────────────────────────────────────────────────────
  console.log('\n⚙️  Settings...')
  await mutate([{ createOrReplace: {
    _id: 'settings',
    _type: 'settings',
    nomeLocale: 'Aroma Bistrot',
    telefono: '+39 0373 88 21 45',
    whatsapp: '390373882145',
    indirizzoStrada: 'Via Madonna del Pozzo 30',
    citta: 'Offanengo (CR)',
    googleMapsUrl: 'https://maps.google.com/?q=Via+Madonna+del+Pozzo+30+Offanengo+CR',
    instagram: 'aromabistrot',
    email: 'info@aromabistrot.it',
    metaDescrizioneDefault: 'Aroma Bistrot — cucina contemporanea di territorio a Offanengo (CR). Ingredienti selezionati, stagionalità e passione in ogni piatto.',
    noteOrari: 'Chiusi il lunedì e il martedì. Prenotazione consigliata, specialmente nel fine settimana.',
    orariSettimanali: [
      { _key: 'lun', giorno: 'lunedi',    chiuso: true },
      { _key: 'mar', giorno: 'martedi',   chiuso: true },
      { _key: 'mer', giorno: 'mercoledi', orario: '19:30 – 22:30',                    chiuso: false },
      { _key: 'gio', giorno: 'giovedi',   orario: '19:30 – 22:30',                    chiuso: false },
      { _key: 'ven', giorno: 'venerdi',   orario: '12:30 – 14:30 · 19:30 – 22:30',   chiuso: false },
      { _key: 'sab', giorno: 'sabato',    orario: '12:30 – 14:30 · 19:30 – 22:30',   chiuso: false },
      { _key: 'dom', giorno: 'domenica',  orario: '12:30 – 14:30',                    chiuso: false },
    ],
  }}])
  console.log('  ✓')

  // ─ 3. Categorie menu ──────────────────────────────────────────────────────
  console.log('\n🗂  Categorie menu...')
  await mutate([
    { createOrReplace: { _id: 'cat-antipasti', _type: 'menuCategories', nome: 'Antipasti', ordine: 1 } },
    { createOrReplace: { _id: 'cat-primi',     _type: 'menuCategories', nome: 'Primi',     ordine: 2 } },
    { createOrReplace: { _id: 'cat-secondi',   _type: 'menuCategories', nome: 'Secondi',   ordine: 3 } },
    { createOrReplace: { _id: 'cat-dessert',   _type: 'menuCategories', nome: 'Dessert',   ordine: 4 } },
  ])
  console.log('  ✓ 4 categorie')

  // ─ 4. Piatti ──────────────────────────────────────────────────────────────
  console.log('\n🍽  Piatti...')
  const ITEMS = [
    // Antipasti
    { _id: 'item-burrata',    catId: 'cat-antipasti', ordine: 1, nome: 'Burrata pugliese con pomodorini confit',         prezzo: 12, tag: ['signature'],              allergeni: 'Latte, frutta a guscio',         descrizione: 'Cuore cremoso di latte fresco, pomodorini arrostiti al timo, olio al basilico e pistacchi di Bronte' },
    { _id: 'item-carpaccio',  catId: 'cat-antipasti', ordine: 2, nome: 'Carpaccio di fassona con rucola e grana',        prezzo: 16, tag: [],                          allergeni: 'Latte, senape',                  descrizione: 'Fettine sottili di fassona piemontese, scaglie di Grana Padano DOP, senape antica e limone Meyer' },
    { _id: 'item-tartare',    catId: 'cat-antipasti', ordine: 3, nome: 'Tartare di branzino, avocado e cedro',           prezzo: 15, tag: ['novita', 'senza-glutine'], allergeni: 'Pesce',                          descrizione: 'Branzino dell\'Adriatico battuto al coltello, crema di avocado, germogli e olio al cedro di Sorrento' },
    { _id: 'item-fiori',      catId: 'cat-antipasti', ordine: 4, nome: 'Fiori di zucca ripieni in pastella leggera',     prezzo: 11, tag: ['vegetariano'],             allergeni: 'Glutine, uova, latte, pesce',    descrizione: 'Fiori di zucca con ricotta di pecora e menta, pastella alla birra, salsa di acciughe del Cantabrico' },
    // Primi
    { _id: 'item-tagliatelle',catId: 'cat-primi',     ordine: 1, nome: 'Tagliatelle al ragù di cinghiale',               prezzo: 18, tag: ['signature'],              allergeni: 'Glutine, uova',                  descrizione: 'Pasta fresca all\'uovo, ragù lento di cinghiale del Chianti con rosmarino, bacche di ginepro e Chianti Classico' },
    { _id: 'item-risotto',    catId: 'cat-primi',     ordine: 2, nome: 'Risotto al Barolo con ossobuco e gremolata',     prezzo: 22, tag: [],                          allergeni: 'Latte, sedano',                  descrizione: 'Carnaroli mantecato al Barolo, ossobuco di vitello brasato, gremolata di limone, prezzemolo e aglio' },
    { _id: 'item-paccheri',   catId: 'cat-primi',     ordine: 3, nome: 'Paccheri con calamaretti, datterino e bottarga', prezzo: 19, tag: ['novita'],                  allergeni: 'Glutine, molluschi, pesce',      descrizione: 'Pasta di Gragnano, calamaretti saltati, pomodorino datterino confit, bottarga di muggine di Cabras' },
    { _id: 'item-gnocchi',    catId: 'cat-primi',     ordine: 4, nome: 'Gnocchi di patate viola al gorgonzola e noci',   prezzo: 16, tag: ['vegetariano'],             allergeni: 'Glutine, latte, frutta a guscio', descrizione: 'Gnocchi di patate viola di Avezzano, fonduta di Gorgonzola DOP, noci di Sorrento tostate, miele di castagno' },
    // Secondi
    { _id: 'item-filetto',    catId: 'cat-secondi',   ordine: 1, nome: 'Filetto di fassona al pepe verde',              prezzo: 28, tag: [],                          allergeni: 'Latte',                          descrizione: 'Fassona piemontese 220 g, salsa al pepe verde in grani, patate rösti al burro di malga, radicchio di Treviso brasato' },
    { _id: 'item-branzino',   catId: 'cat-secondi',   ordine: 2, nome: 'Branzino in crosta di erbe aromatiche',         prezzo: 24, tag: ['senza-glutine'],           allergeni: 'Pesce',                          descrizione: 'Filetto di branzino selvaggio, crosta di timo, rosmarino e origano fresco, verdure di stagione al vapore, limone confit' },
    { _id: 'item-piccione',   catId: 'cat-secondi',   ordine: 3, nome: 'Piccione arrosto con lenticchie e tartufo',     prezzo: 26, tag: ['signature'],              allergeni: 'Sedano',                         descrizione: 'Piccione allevato all\'aperto cotto in casseruola, lenticchie rosse di Colfiorito, lamelle di tartufo nero di Norcia' },
    { _id: 'item-tagliata',   catId: 'cat-secondi',   ordine: 4, nome: 'Tagliata di Black Angus con rucola e Parmigiano', prezzo: 30, tag: [],                        allergeni: 'Latte',                          descrizione: 'Black Angus irlandese 260 g, rucola selvatica, Parmigiano Reggiano 24 mesi, aceto balsamico tradizionale di Modena' },
    // Dessert
    { _id: 'item-tiramisu',   catId: 'cat-dessert',   ordine: 1, nome: 'Tiramisù della casa',                            prezzo: 8,  tag: ['signature'],              allergeni: 'Glutine, uova, latte',           descrizione: 'La ricetta di famiglia: savoiardi artigianali, mascarpone freschissimo, caffè espresso ristretto e cacao amaro di qualità' },
    { _id: 'item-pannacotta', catId: 'cat-dessert',   ordine: 2, nome: 'Panna cotta alla vaniglia con coulis di lamponi', prezzo: 7, tag: ['vegetariano', 'senza-glutine'], allergeni: 'Latte',                    descrizione: 'Panna cotta con vaniglia Bourbon del Madagascar, coulis caldo di lamponi e mirtilli selvatici, foglia di menta fresca' },
    { _id: 'item-souffle',    catId: 'cat-dessert',   ordine: 3, nome: 'Soufflé al cioccolato fondente 72%',             prezzo: 9,  tag: [],                          allergeni: 'Glutine, uova, latte',           descrizione: 'Soufflé caldo con cuore di Valrhona Guanaja 72%, servito con gelato alla vaniglia di Madagascar (15 min di attesa)' },
    { _id: 'item-formaggi',   catId: 'cat-dessert',   ordine: 4, nome: 'Selezione di formaggi lombardi',                 prezzo: 12, tag: ['vegetariano'],             allergeni: 'Latte, frutta a guscio, senape', descrizione: 'Tre formaggi di stagione della Lombardia, miele di acacia locale, mostarda di Cremona fatta in casa, noci e crackers artigianali' },
  ]
  await mutate(ITEMS.map(it => ({ createOrReplace: {
    _id: it._id, _type: 'menuItems',
    nome: it.nome, descrizione: it.descrizione, prezzo: it.prezzo,
    tag: it.tag, allergeni: it.allergeni,
    categoria: { _type: 'reference', _ref: it.catId },
    visibile: true, ordine: it.ordine,
  }})))
  console.log(`  ✓ ${ITEMS.length} piatti`)

  // ─ 5. About ───────────────────────────────────────────────────────────────
  console.log('\n📖 About...')
  await mutate([{ createOrReplace: {
    _id: 'about', _type: 'about',
    immagineHero: imgRef(ids.aboutHero, 'La sala di Aroma Bistrot — luci calde e atmosfera raccolta'),
    titolo: 'Un bistrot con l\'anima',
    storia: [
      blk('Aroma Bistrot nasce nel 2018 dall\'idea di Marta e Giorgio Ferretti, una coppia con radici nella ristorazione ma con uno sguardo rivolto al futuro. Dopo anni trascorsi tra cucine stellate di Milano e Brescia, il loro ritorno a Offanengo porta con sé una visione chiara: un locale dove la qualità non è ostentazione, ma quotidianità.', 'b-s1'),
      blk('Il nome stesso racconta tutto. Aroma è il profumo della terra che cambia stagione, degli ingredienti scelti con cura, del vino aperto nel momento giusto. Bistrot è la promessa di un\'accoglienza senza formalità eccessive, dove ci si sente a casa pur vivendo qualcosa di speciale.', 'b-s2'),
      blk('La sala conta trenta coperti distribuiti in due ambienti: uno più raccolto per le serate intime, uno affacciato sul piccolo giardino interno per la bella stagione. Ogni dettaglio — dalle posate ai bicchieri, dai tessuti alle ceramiche di Faenza — è stato scelto con la stessa attenzione riservata ai piatti.', 'b-s3'),
    ],
    filosofiaCucina: [
      blk('La nostra cucina è figlia del territorio e delle stagioni. Ogni settimana il menu cambia in funzione di quello che il mercato, i fornitori di fiducia e l\'orto offrono di meglio. Non lavoriamo con listini fissi: lavoriamo con relazioni — con contadini, allevatori, pescatori che condividono la nostra ossessione per la qualità.', 'b-f1'),
      blk('I piatti hanno radici nella tradizione lombarda e italiana, ma non hanno paura di guardare oltre confine quando ha senso farlo. La tecnica è uno strumento, non un fine: l\'obiettivo è che ogni boccone racconti qualcosa, che lasci un ricordo.', 'b-f2'),
      blk('Crediamo nel valore della semplicità complessa: un carpaccio di fassona richiede materia prima eccezionale e una mano precisa, non venti ingredienti. È la filosofia che guida ogni scelta, dalla selezione vini al dessert del giorno.', 'b-f3'),
    ],
    immaginiInterne: [
      { _key: 'ai1', ...imgRef(ids.aboutInt1, 'La cucina di Aroma Bistrot — il cuore pulsante del locale') },
      { _key: 'ai2', ...imgRef(ids.aboutInt2, 'Dettaglio di un piatto — cura e precisione in ogni preparazione') },
    ],
  }}])
  console.log('  ✓')

  // ─ 6. Homepage config ─────────────────────────────────────────────────────
  console.log('\n🏠 Homepage config...')
  await mutate([{ createOrReplace: {
    _id: 'homepageConfig', _type: 'homepageConfig',
    immagineHero:       imgRef(ids.heroDesktop, 'La sala di Aroma Bistrot all\'imbrunire'),
    immagineHeroMobile: imgRef(ids.heroMobile,  'Atmosfera serale — Aroma Bistrot'),
    testoHero: 'Cucina di territorio · Offanengo (CR)',
    presentazione: 'Aroma Bistrot è un luogo dove la cucina incontra la passione per gli ingredienti di qualità. Ogni piatto racconta una storia di stagioni, di piccoli produttori e di una terra generosa. Vi aspettiamo per condividere con voi momenti che restano.',
    testoVini: 'Una selezione curata di etichette italiane e internazionali, pensata per accompagnare ogni portata con il bicchiere giusto. Dal Franciacorta al Barolo, dai bianchi freschi dell\'Alto Adige ai rossi strutturati della Toscana.',
    piattiInEvidenza: [
      { _key: 'ev1', _type: 'reference', _ref: 'item-burrata' },
      { _key: 'ev2', _type: 'reference', _ref: 'item-tagliatelle' },
      { _key: 'ev3', _type: 'reference', _ref: 'item-piccione' },
      { _key: 'ev4', _type: 'reference', _ref: 'item-tiramisu' },
    ],
    sezioniVisibili: {
      presentazione: true,
      menuPreview: true,
      eventi: true,
      galleryTeaser: true,
      vini: true,
    },
  }}])
  console.log('  ✓ tutte le sezioni abilitate')

  // ─ 7. Site gallery ────────────────────────────────────────────────────────
  console.log('\n🖼  Galleria locale...')
  await mutate([{ createOrReplace: {
    _id: 'siteGallery', _type: 'siteGallery',
    immagini: [
      { _key: 'sg1', ...imgRef(ids.gallery1, 'La sala principale di Aroma Bistrot'),            categoria: 'atmosfera',    inEvidenza: true  },
      { _key: 'sg2', ...imgRef(ids.gallery2, 'Dettaglio tovagliato e mise en place'),            categoria: 'dettagli',     inEvidenza: true  },
      { _key: 'sg3', ...imgRef(ids.gallery3, 'Burrata pugliese con pomodorini confit'),          categoria: 'cucina',       inEvidenza: true  },
      { _key: 'sg4', ...imgRef(ids.gallery4, 'Il giardino interno nella bella stagione'),        categoria: 'atmosfera',    inEvidenza: true  },
      { _key: 'sg5', ...imgRef(ids.gallery5, 'Tagliatelle fresche al ragù di cinghiale'),        categoria: 'cucina',       inEvidenza: true  },
      { _key: 'sg6', ...imgRef(ids.gallery6, 'La cantina vini di Aroma Bistrot'),                categoria: 'dettagli',     inEvidenza: true  },
      { _key: 'sg7', ...imgRef(ids.gallery7, 'Serata speciale — tavolo apparecchiato per l\'occasione'), categoria: 'atmosfera', inEvidenza: false },
      { _key: 'sg8', ...imgRef(ids.gallery8, 'Ingredienti freschi del mercato settimanale'),     categoria: 'ingredienti',  inEvidenza: false },
    ],
  }}])
  console.log('  ✓ 8 foto (6 in evidenza)')

  // ─ 8. Menu gallery ────────────────────────────────────────────────────────
  console.log('\n📷 Galleria menu stagionale...')
  await mutate([{ createOrReplace: {
    _id: 'menuGallery-primavera-2026', _type: 'menuGallery',
    stagione: 'Primavera · Estate 2026',
    attiva: true,
    immagini: [
      { _key: 'mg1', ...imgRef(ids.menu1, 'Burrata con pomodorini confit'),           didascalia: 'Il nostro signature estivo' },
      { _key: 'mg2', ...imgRef(ids.menu2, 'Tartare di branzino con avocado'),         didascalia: 'Novità della stagione' },
      { _key: 'mg3', ...imgRef(ids.menu3, 'Tagliatelle fresche al ragù'),             didascalia: 'Pasta fatta a mano ogni mattina' },
      { _key: 'mg4', ...imgRef(ids.menu4, 'Piccione arrosto con lenticchie rosse'),   didascalia: 'Il secondo d\'autore' },
      { _key: 'mg5', ...imgRef(ids.menu5, 'Tiramisù della casa'),                     didascalia: 'La ricetta di famiglia' },
      { _key: 'mg6', ...imgRef(ids.menu6, 'Il giardino aperto per la bella stagione'),didascalia: 'Primavera 2026' },
    ],
  }}])
  console.log('  ✓ "Primavera · Estate 2026" (attiva)')

  // ─ 9. Eventi ──────────────────────────────────────────────────────────────
  console.log('\n📅 Eventi...')
  const EVENTS = [
    {
      _id: 'event-franciacorta',
      titolo: 'Serata Franciacorta con Bellavista',
      slug: 'serata-franciacorta-bellavista',
      stato: 'prossimo',
      data: '2026-06-07T19:30:00.000Z',
      imgId: ids.event1,
      descrizioneBreve: 'Una serata dedicata alle bollicine più eleganti d\'Italia, con la cantina Bellavista in sala.',
      descrizioneCompleta: [
        blk('Vi invitiamo a una serata esclusiva dedicata al Franciacorta, in compagnia di Matteo Vezzola, enologo di Bellavista. Quattro portate create da Marta Ferretti per accompagnare altrettanti calici: dal Non Dosato al Satèn, fino alla Riserva Vittorio Moretti.', 'ev1b1'),
        blk('Il menu si aprirà con un\'ostrica su crema di burro acido e caviale Osetra, per proseguire con un risotto allo champagne e tartufo bianco d\'Alba. Il piccione arrosto concluderà il percorso salato, prima di un dessert studiato per abbinarsi alla complessità della Riserva.', 'ev1b2'),
        blk('I posti sono limitati a venti coperti. Prenotazione obbligatoria entro il 3 giugno. Include quattro calici abbinati alle portate.', 'ev1b3'),
      ],
      whatsappMessaggio: 'Vorrei prenotare per la Serata Franciacorta del 7 giugno — Aroma Bistrot',
    },
    {
      _id: 'event-olio-evo',
      titolo: 'Cena con il produttore di olio EVO',
      slug: 'cena-produttore-olio-evo-giugno-2026',
      stato: 'prossimo',
      data: '2026-06-21T19:30:00.000Z',
      imgId: ids.event2,
      descrizioneBreve: 'Cena a tema dedicata all\'olio extravergine d\'oliva, con degustazione guidata e menu ad hoc.',
      descrizioneCompleta: [
        blk('L\'olio extravergine d\'oliva è molto più di un condimento: è un ingrediente con una storia, un territorio, un\'identità. Questa sera lo scopriremo insieme a Luca Oliveri, produttore toscano di terza generazione, che porterà in sala sei monocultivar dalla sua azienda di Cortona.', 'ev2b1'),
        blk('Il menu si articola su cinque portate pensate per esaltare le sfumature di ogni olio. L\'extravergine entra in ogni piatto come protagonista: sulla tartare di tonno, sul pane di segale cotto al momento, sul gelato artigianale di chiusura.', 'ev2b2'),
      ],
      whatsappMessaggio: 'Vorrei prenotare per la Cena con il produttore di olio del 21 giugno — Aroma Bistrot',
    },
    {
      _id: 'event-capodanno-2025',
      titolo: 'Cena di Capodanno 2025',
      slug: 'cena-capodanno-2025',
      stato: 'passato',
      data: '2025-12-31T20:00:00.000Z',
      imgId: ids.event3,
      descrizioneBreve: 'Il menu speciale con cui abbiamo salutato il 2025 — otto portate, tre ore di puro piacere.',
      descrizioneCompleta: [
        blk('L\'ultimo dell\'anno 2025 ha riunito trenta ospiti per una serata indimenticabile. Otto portate, quattro calici di selezione, e la mezzanotte festeggiata con un brindisi di Champagne Krug Grande Cuvée.', 'ev3b1'),
        blk('Il menu ha percorso l\'Italia da Nord a Sud: dall\'ostrica di Taranto con vodka e cetriolo all\'agnello delle Langhe con salsa di Barolo, passando per un risotto alla milanese con zafferano DOP e midollo di vitello.', 'ev3b2'),
      ],
      whatsappMessaggio: 'Vorrei informazioni sulla prossima Cena di Capodanno — Aroma Bistrot',
    },
    {
      _id: 'event-jazz-2026',
      titolo: 'Serata Jazz & Vini Naturali',
      slug: 'serata-jazz-vini-naturali-marzo-2026',
      stato: 'passato',
      data: '2026-03-15T19:30:00.000Z',
      imgId: ids.event4,
      descrizioneBreve: 'Un trio jazz dal vivo, sei etichette di vini naturali e un menu degustazione in perfetta armonia.',
      descrizioneCompleta: [
        blk('Sabato 15 marzo abbiamo ospitato il Trio Pellegrini — pianoforte, contrabbasso e sassofono — per una serata dove la musica e il vino si sono intrecciati in modo inaspettato. Sei etichette di produttori naturali italiani e francesi, abbinate a un menu di cinque portate.', 'ev4b1'),
        blk('L\'esperimento è riuscito oltre ogni aspettativa: l\'improvvisazione del jazz e la sorpresa di un vino non filtrato hanno creato una sintonia perfetta. Torneremo a proporre serate simili nella stagione autunnale.', 'ev4b2'),
      ],
      whatsappMessaggio: 'Vorrei informazioni sulle prossime Serate Jazz — Aroma Bistrot',
    },
  ]
  for (const ev of EVENTS) {
    await mutate([{ createOrReplace: {
      _id: ev._id, _type: 'events',
      titolo: ev.titolo,
      slug: { _type: 'slug', current: ev.slug },
      stato: ev.stato,
      data: ev.data,
      immaginePrincipale: imgRef(ev.imgId, ev.titolo),
      descrizioneBreve: ev.descrizioneBreve,
      descrizioneCompleta: ev.descrizioneCompleta,
      whatsappMessaggio: ev.whatsappMessaggio,
      metaDescrizione: ev.descrizioneBreve,
    }}])
    const icon = ev.stato === 'prossimo' ? '📅' : '📁'
    console.log(`  ✓ ${icon} ${ev.titolo}`)
  }

  // ─ 10. Vini ───────────────────────────────────────────────────────────────
  console.log('\n🍷 Vini in evidenza...')
  const WINES = [
    { _id: 'wine-franciacorta', ordine: 1, imgId: ids.wine1,
      nomeBottiglia: 'Alma Franciacorta DOCG Non Dosato',
      cantina: 'Bellavista', territorio: 'Franciacorta, Lombardia',
      descrizione: 'Perlage finissimo e persistente. Profumi di agrumi canditi, crosta di pane e mandorla tostata. Freschezza e profondità si alternano in un finale lunghissimo. Il nostro benvenuto d\'eccellenza.' },
    { _id: 'wine-barolo', ordine: 2, imgId: ids.wine2,
      nomeBottiglia: 'Barolo "Ceretta" 2019',
      cantina: 'Giacomo Conterno', territorio: 'Barolo DOCG, Piemonte',
      descrizione: 'Struttura poderosa e carattere austero. Note di rosa appassita, tabacco, spezie dolci e tartufo. Tannini presenti ma vellutati. Si abbina alla perfezione con il piccione e la tagliata di Angus.' },
    { _id: 'wine-brunello', ordine: 3, imgId: ids.wine3,
      nomeBottiglia: 'Brunello di Montalcino 2018',
      cantina: 'Biondi Santi', territorio: 'Brunello DOCG, Toscana',
      descrizione: 'L\'orgoglio della nostra carta vini. Elegante e longevo, profumi eterici di ciliegia e viola, tannini setosi e un finale che evoca il territorio senese. Da aprire con almeno un\'ora di anticipo.' },
    { _id: 'wine-pinot', ordine: 4, imgId: ids.wine4,
      nomeBottiglia: 'Pinot Grigio "Meczan" 2023',
      cantina: 'J. Hofstätter', territorio: 'Alto Adige DOC',
      descrizione: 'Fresco e minerale come le montagne da cui proviene. Profumi floreali e fruttati, finale sapido e persistente. Ideale con il branzino in crosta di erbe e la tartare di pesce.' },
    { _id: 'wine-vermentino', ordine: 5, imgId: ids.wine5,
      nomeBottiglia: 'Vermentino di Sardegna "Canayli" 2023',
      cantina: 'Cantina Gallura', territorio: 'Gallura DOC, Sardegna',
      descrizione: 'Profumato e solare. Note di fiori bianchi, pesca e macchia mediterranea. Acidità vivace e finale amarognolo tipico del Vermentino. Ottimo aperitivo e compagno dei crudi di pesce.' },
  ]
  await mutate(WINES.map(w => ({ createOrReplace: {
    _id: w._id, _type: 'wineHighlights',
    nomeBottiglia: w.nomeBottiglia, cantina: w.cantina, territorio: w.territorio,
    descrizione: w.descrizione,
    immagine: imgRef(w.imgId, `${w.nomeBottiglia} — ${w.cantina}`),
    inEvidenza: true, ordine: w.ordine,
  }})))
  console.log(`  ✓ ${WINES.length} vini`)

  // ─ 11. Pages ──────────────────────────────────────────────────────────────
  console.log('\n📄 Configurazione pagine...')
  const PAGES = [
    { _id: 'page-menu',      pagina: 'menu',       titolo: 'Il Menu Serale',               sottotitolo: 'Cucina di territorio · Stagione Primavera · Estate 2026', testoIntroduttivo: 'Il nostro menu cambia con le stagioni e con quello che il territorio ci offre. Ogni piatto nasce dalla collaborazione con produttori locali, da una materia prima scelta con cura, e dalla voglia di raccontare qualcosa di autentico.' },
    { _id: 'page-galleria',  pagina: 'galleria',   titolo: 'La Galleria',                  sottotitolo: 'Atmosfera, sapori e momenti',                             testoIntroduttivo: 'Scorrere queste immagini significa entrare un poco in Aroma Bistrot prima ancora di sedersi a tavola. La luce delle candele, i dettagli della mise en place, i colori dei piatti: benvenuti.' },
    { _id: 'page-vini',      pagina: 'vini',       titolo: 'I Nostri Vini',                sottotitolo: 'Una selezione curata, territorio per territorio',          testoIntroduttivo: 'La carta vini di Aroma Bistrot nasce da anni di assaggi, viaggi e relazioni con produttori che la pensano come noi: il vino deve emozionare, non intimidire. Trovate qui etichette conosciute e qualche scoperta inattesa.' },
    { _id: 'page-il-bistrot',pagina: 'il-bistrot', titolo: 'Il Bistrot',                   sottotitolo: 'La nostra storia, la nostra filosofia',                   testoIntroduttivo: 'Aroma Bistrot è nato nel 2018 dall\'idea di portare in un piccolo comune della Bassa Cremonese una cucina contemporanea di qualità, accessibile e sincera. Questa è la nostra storia.' },
    { _id: 'page-eventi',    pagina: 'eventi',     titolo: 'Gli Eventi',                   sottotitolo: 'Serate speciali, degustazioni e cene a tema',             testoIntroduttivo: 'Oltre alla cucina quotidiana, Aroma Bistrot è anche un luogo di incontro per chi ama scoprire produttori, territori e abbinamenti fuori dal comune. Qui trovate i prossimi appuntamenti e il racconto di quelli passati.' },
    { _id: 'page-contatti',  pagina: 'contatti',   titolo: 'Dove Siamo',                   sottotitolo: 'Offanengo (CR) · Prenotazioni e informazioni',            testoIntroduttivo: 'Siamo a Offanengo, in provincia di Cremona, facilmente raggiungibili dalla Statale 591. Il parcheggio è libero nelle strade circostanti. Per prenotare, scrivici su WhatsApp o chiamaci direttamente.' },
  ]
  await mutate(PAGES.map(p => ({ createOrReplace: {
    _id: p._id, _type: 'pages',
    pagina: p.pagina, titolo: p.titolo,
    sottotitolo: p.sottotitolo, testoIntroduttivo: p.testoIntroduttivo,
  }})))
  console.log(`  ✓ ${PAGES.length} pagine`)

  // ─ Fine ───────────────────────────────────────────────────────────────────
  console.log('\n' + '━'.repeat(52))
  console.log('✅ Seeding completato!\n')
  console.log('   → http://localhost:3000        sito')
  console.log('   → http://localhost:3000/studio  CMS\n')
}

main().catch(err => {
  console.error('\n❌ Errore:', err.message)
  process.exit(1)
})
