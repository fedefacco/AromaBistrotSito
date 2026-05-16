import type { PortableTextBlock } from '@portabletext/types'

// --- Immagine Sanity ---

export type SanityImage = {
  _type: 'image'
  asset: { _ref: string; _type: 'reference' }
  hotspot?: { x: number; y: number; height: number; width: number }
  crop?: { top: number; bottom: number; left: number; right: number }
  alt?: string
}

// --- Settings ---

export type OrarioSettimanale = {
  giorno: 'lunedi' | 'martedi' | 'mercoledi' | 'giovedi' | 'venerdi' | 'sabato' | 'domenica'
  orario?: string
  chiuso?: boolean
}

export type Settings = {
  nomeLocale: string
  telefono: string
  whatsapp: string
  indirizzoStrada: string
  citta: string
  googleMapsUrl?: string
  orariSettimanali?: OrarioSettimanale[]
  noteOrari?: string
  instagram?: string
  email?: string
  metaDescrizioneDefault?: string
  ogImageDefault?: SanityImage
}

// --- Menu ---

export type MenuCategory = {
  _id: string
  nome: string
  ordine: number
}

export type MenuItemTag = 'signature' | 'novita' | 'vegetariano' | 'vegano' | 'senza-glutine'

export type MenuItem = {
  _id: string
  nome: string
  descrizione?: string
  prezzo: number
  categoria: Pick<MenuCategory, '_id' | 'nome'>
  tag?: MenuItemTag[]
  allergeni?: string
  ordine?: number
}

export type MenuGalleryImage = SanityImage & {
  alt: string
  didascalia?: string
}

export type MenuGallery = {
  stagione: string
  immagini: MenuGalleryImage[]
}

export type MenuData = {
  categorie: MenuCategory[]
  piatti: MenuItem[]
}

// --- Galleria locale ---

export type SiteGalleryImage = SanityImage & {
  alt: string
  categoria?: 'atmosfera' | 'cucina' | 'dettagli' | 'persone' | 'ingredienti'
  inEvidenza?: boolean
}

export type SiteGallery = {
  immagini: SiteGalleryImage[]
}

// --- About ---

export type About = {
  immagineHero: SanityImage
  titolo: string
  storia?: PortableTextBlock[]
  filosofiaCucina?: PortableTextBlock[]
  immaginiInterne?: (SanityImage & { alt: string })[]
}

// --- Events ---

export type Event = {
  _id: string
  titolo: string
  slug: string
  stato: 'prossimo' | 'passato'
  data: string
  immaginePrincipale: SanityImage
  descrizioneBreve: string
  descrizioneCompleta?: PortableTextBlock[]
  galleriaFoto?: (SanityImage & { alt: string })[]
  whatsappMessaggio?: string
  metaDescrizione?: string
}

// --- Wine ---

export type WineHighlight = {
  _id: string
  nomeBottiglia: string
  cantina: string
  territorio?: string
  descrizione?: string
  immagine?: SanityImage
  ordine?: number
}

// --- Homepage config ---

export type SezioniVisibili = {
  presentazione: boolean
  menuPreview: boolean
  eventi: boolean
  galleryTeaser: boolean
  vini: boolean
}

export type HomepageConfig = {
  immagineHero: SanityImage
  immagineHeroMobile?: SanityImage
  testoHero?: string
  presentazione?: string
  piattiInEvidenza?: (Pick<MenuItem, '_id' | 'nome' | 'descrizione' | 'prezzo' | 'tag'> & {
    categoria: Pick<MenuCategory, 'nome'>
  })[]
  testoVini?: string
  sezioniVisibili?: SezioniVisibili
}

// --- Page config ---

export type PageConfig = {
  pagina: 'menu' | 'galleria' | 'vini' | 'il-bistrot' | 'eventi' | 'contatti'
  titolo: string
  sottotitolo?: string
  testoIntroduttivo?: string
}
