import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'wineHighlights',
  title: 'Vini in evidenza',
  type: 'document',
  fields: [
    defineField({
      name: 'nomeBottiglia',
      title: 'Nome bottiglia',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'cantina',
      title: 'Cantina',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'territorio',
      title: 'Territorio',
      type: 'string',
      description: 'Es. "Barolo DOCG, Piemonte" o "Franciacorta DOCG, Lombardia"',
    }),
    defineField({
      name: 'descrizione',
      title: 'Descrizione',
      type: 'text',
      rows: 3,
      description: 'Note di degustazione o racconto del vino (max 50 parole)',
      validation: (Rule) =>
        Rule.custom((val: string | undefined) => {
          if (!val) return true
          const parole = val.trim().split(/\s+/).length
          return parole <= 50 || `La descrizione è di ${parole} parole — massimo 50`
        }),
    }),
    defineField({
      name: 'immagine',
      title: 'Immagine bottiglia',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'inEvidenza',
      title: 'In evidenza',
      type: 'boolean',
      description: 'I vini in evidenza appaiono nella homepage e nella pagina vini',
      initialValue: true,
    }),
    defineField({
      name: 'ordine',
      title: 'Ordine',
      type: 'number',
      description: 'Posizione nella lista (1 = primo)',
      validation: (Rule) => Rule.integer().positive(),
    }),
  ],
  orderings: [
    {
      title: 'Ordine',
      name: 'ordineAsc',
      by: [{ field: 'ordine', direction: 'asc' }],
    },
  ],
  preview: {
    select: {
      title: 'nomeBottiglia',
      subtitle: 'cantina',
      media: 'immagine',
      inEvidenza: 'inEvidenza',
    },
    prepare({ title, subtitle, media, inEvidenza }) {
      return {
        title: inEvidenza ? `★ ${title}` : title,
        subtitle,
        media,
      }
    },
  },
})
