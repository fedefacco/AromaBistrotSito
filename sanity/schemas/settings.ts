import { defineType, defineField, defineArrayMember } from 'sanity'

export default defineType({
  name: 'settings',
  title: 'Impostazioni sito',
  type: 'document',
  fields: [
    defineField({
      name: 'nomeLocale',
      title: 'Nome del locale',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'telefono',
      title: 'Telefono',
      type: 'string',
      description: 'Es. +39 0373 123456',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'whatsapp',
      title: 'WhatsApp',
      type: 'string',
      description: 'Numero senza spazi né simboli, es. 393371234567',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'indirizzoStrada',
      title: 'Indirizzo',
      type: 'string',
      description: 'Es. Via Roma 12',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'citta',
      title: 'Città',
      type: 'string',
      description: 'Es. Offanengo (CR)',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'googleMapsUrl',
      title: 'URL Google Maps',
      type: 'url',
      description: 'Link diretto alla posizione su Google Maps',
    }),
    defineField({
      name: 'orariSettimanali',
      title: 'Orari settimanali',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'giorno',
              title: 'Giorno',
              type: 'string',
              options: {
                list: [
                  { title: 'Lunedì', value: 'lunedi' },
                  { title: 'Martedì', value: 'martedi' },
                  { title: 'Mercoledì', value: 'mercoledi' },
                  { title: 'Giovedì', value: 'giovedi' },
                  { title: 'Venerdì', value: 'venerdi' },
                  { title: 'Sabato', value: 'sabato' },
                  { title: 'Domenica', value: 'domenica' },
                ],
              },
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'orario',
              title: 'Orario',
              type: 'string',
              description: 'Es. 12:00 – 14:30 / 19:30 – 22:30',
            }),
            defineField({
              name: 'chiuso',
              title: 'Chiuso',
              type: 'boolean',
              initialValue: false,
            }),
          ],
          preview: {
            select: {
              giorno: 'giorno',
              orario: 'orario',
              chiuso: 'chiuso',
            },
            prepare({ giorno, orario, chiuso }) {
              const giorni: Record<string, string> = {
                lunedi: 'Lunedì',
                martedi: 'Martedì',
                mercoledi: 'Mercoledì',
                giovedi: 'Giovedì',
                venerdi: 'Venerdì',
                sabato: 'Sabato',
                domenica: 'Domenica',
              }
              return {
                title: giorni[giorno] ?? giorno,
                subtitle: chiuso ? 'Chiuso' : orario,
              }
            },
          },
        }),
      ],
    }),
    defineField({
      name: 'noteOrari',
      title: 'Note sugli orari',
      type: 'text',
      rows: 2,
      description: 'Es. "Chiuso il lunedì sera" o "In agosto orari ridotti"',
    }),
    defineField({
      name: 'instagram',
      title: 'URL Instagram',
      type: 'url',
      description: 'Es. https://www.instagram.com/aromabistrot',
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
    }),
    defineField({
      name: 'metaDescrizioneDefault',
      title: 'Meta descrizione default',
      type: 'text',
      rows: 3,
      description: 'Usata come descrizione SEO nelle pagine senza descrizione specifica',
      validation: (Rule) => Rule.max(160).warning('La meta descrizione dovrebbe essere al massimo 160 caratteri'),
    }),
    defineField({
      name: 'ogImageDefault',
      title: 'Immagine Open Graph default',
      type: 'image',
      description: 'Immagine mostrata quando una pagina viene condivisa sui social (1200x630px)',
      options: { hotspot: true },
    }),
  ],
  preview: {
    select: { title: 'nomeLocale' },
    prepare({ title }) {
      return { title: title ?? 'Impostazioni sito' }
    },
  },
})
