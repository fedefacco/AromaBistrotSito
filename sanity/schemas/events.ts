import { defineType, defineField, defineArrayMember } from 'sanity'

export default defineType({
  name: 'events',
  title: 'Eventi',
  type: 'document',
  fields: [
    defineField({
      name: 'titolo',
      title: 'Titolo evento',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug URL',
      type: 'slug',
      options: {
        source: 'titolo',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'stato',
      title: 'Stato',
      type: 'string',
      options: {
        list: [
          { title: 'Prossimo', value: 'prossimo' },
          { title: 'Passato', value: 'passato' },
        ],
        layout: 'radio',
      },
      initialValue: 'prossimo',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'data',
      title: 'Data e ora',
      type: 'datetime',
      options: { dateFormat: 'DD/MM/YYYY', timeFormat: 'HH:mm' },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'immaginePrincipale',
      title: 'Immagine principale',
      type: 'image',
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'descrizioneBreve',
      title: 'Descrizione breve',
      type: 'string',
      description: 'Usata nelle card e nei meta tag (max 120 caratteri)',
      validation: (Rule) =>
        Rule.required().max(120).error('La descrizione breve non può superare 120 caratteri'),
    }),
    defineField({
      name: 'descrizioneCompleta',
      title: 'Descrizione completa',
      type: 'array',
      of: [defineArrayMember({ type: 'block' })],
    }),
    defineField({
      name: 'galleriaFoto',
      title: 'Galleria foto',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'image',
          options: { hotspot: true },
          fields: [
            defineField({
              name: 'alt',
              title: 'Testo alternativo',
              type: 'string',
              validation: (Rule) => Rule.required().error('Il testo alternativo è obbligatorio'),
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'whatsappMessaggio',
      title: 'Messaggio WhatsApp precompilato',
      type: 'string',
      description: 'Testo pre-inserito nel link WhatsApp — es. "Vorrei prenotare per la serata del 15 maggio"',
    }),
    defineField({
      name: 'metaDescrizione',
      title: 'Meta descrizione',
      type: 'string',
      description: 'Opzionale — se vuota viene usata la descrizione breve',
      validation: (Rule) => Rule.max(160).warning('La meta descrizione dovrebbe essere al massimo 160 caratteri'),
    }),
  ],
  orderings: [
    {
      title: 'Data (più recente prima)',
      name: 'dataDesc',
      by: [{ field: 'data', direction: 'desc' }],
    },
    {
      title: 'Data (più vecchio prima)',
      name: 'dataAsc',
      by: [{ field: 'data', direction: 'asc' }],
    },
  ],
  preview: {
    select: {
      title: 'titolo',
      data: 'data',
      stato: 'stato',
      media: 'immaginePrincipale',
    },
    prepare({ title, data, stato, media }) {
      const dataFormattata = data
        ? new Date(data).toLocaleDateString('it-IT', { day: '2-digit', month: 'short', year: 'numeric' })
        : '—'
      const statoLabel = stato === 'prossimo' ? '📅' : '📁'
      return {
        title: `${statoLabel} ${title}`,
        subtitle: dataFormattata,
        media,
      }
    },
  },
})
