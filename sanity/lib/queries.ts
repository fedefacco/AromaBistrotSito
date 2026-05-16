import { groq } from 'next-sanity'

export const settingsQuery = groq`*[_type == "settings"][0]{
  nomeLocale,
  telefono,
  whatsapp,
  indirizzoStrada,
  citta,
  googleMapsUrl,
  orariSettimanali[]{
    giorno,
    orario,
    chiuso
  },
  noteOrari,
  instagram,
  email,
  metaDescrizioneDefault,
  ogImageDefault
}`

export const homepageConfigQuery = groq`*[_type == "homepageConfig"][0]{
  immagineHero,
  immagineHeroMobile,
  testoHero,
  presentazione,
  piattiInEvidenza[]->{
    _id,
    nome,
    descrizione,
    prezzo,
    tag,
    "categoria": categoria->{ nome }
  },
  testoVini,
  sezioniVisibili
}`

export const menuQuery = groq`{
  "categorie": *[_type == "menuCategories"] | order(ordine asc){
    _id,
    nome,
    ordine
  },
  "piatti": *[_type == "menuItems" && visibile == true] | order(ordine asc){
    _id,
    nome,
    descrizione,
    prezzo,
    tag,
    allergeni,
    ordine,
    "categoria": categoria->{ _id, nome }
  }
}`

export const activeMenuGalleryQuery = groq`*[_type == "menuGallery" && attiva == true][0]{
  stagione,
  immagini[]{
    ...,
    alt,
    didascalia
  }
}`

export const siteGalleryQuery = groq`*[_type == "siteGallery"][0]{
  immagini[]{
    ...,
    alt,
    categoria,
    inEvidenza
  }
}`

export const aboutQuery = groq`*[_type == "about"][0]{
  immagineHero,
  titolo,
  storia,
  filosofiaCucina,
  immaginiInterne[]{
    ...,
    alt
  }
}`

export const upcomingEventsQuery = groq`*[_type == "events" && stato == "prossimo"] | order(data asc){
  _id,
  titolo,
  "slug": slug.current,
  data,
  immaginePrincipale,
  descrizioneBreve,
  whatsappMessaggio
}`

export const pastEventsQuery = groq`*[_type == "events" && stato == "passato"] | order(data desc){
  _id,
  titolo,
  "slug": slug.current,
  data,
  immaginePrincipale,
  descrizioneBreve
}`

export const eventBySlugQuery = groq`*[_type == "events" && slug.current == $slug][0]{
  _id,
  titolo,
  "slug": slug.current,
  stato,
  data,
  immaginePrincipale,
  descrizioneBreve,
  descrizioneCompleta,
  galleriaFoto[]{
    ...,
    alt
  },
  whatsappMessaggio,
  metaDescrizione
}`

export const wineHighlightsQuery = groq`*[_type == "wineHighlights" && inEvidenza == true] | order(ordine asc){
  _id,
  nomeBottiglia,
  cantina,
  territorio,
  descrizione,
  immagine,
  ordine
}`

export const allEventSlugsQuery = groq`*[_type == "events"]{ "slug": slug.current }`

export const pageConfigQuery = groq`*[_type == "pages" && pagina == $pagina][0]{
  pagina,
  titolo,
  sottotitolo,
  testoIntroduttivo
}`
