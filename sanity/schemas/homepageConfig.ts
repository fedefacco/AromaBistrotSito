import { defineType, defineField, defineArrayMember } from 'sanity'

export default defineType({
  name: 'homepageConfig',
  title: 'Homepage',
  type: 'document',
  fields: [
    defineField({
      name: 'immagineHero',
      title: 'Immagine hero (desktop)',
      type: 'image',
      description: 'Immagine fullscreen homepage — formato orizzontale, min 1920x1080px',
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'immagineHeroMobile',
      title: 'Immagine hero (mobile)',
      type: 'image',
      description: 'Opzionale — formato verticale 9:16, usata sui dispositivi mobili',
      options: { hotspot: true },
    }),
    defineField({
      name: 'testoHero',
      title: 'Testo hero',
      type: 'string',
      description: 'Sottotitolo breve sotto il nome del locale — es. "Cucina contemporanea · Offanengo"',
      validation: (Rule) => Rule.max(80).warning('Tieni il testo hero entro 80 caratteri'),
    }),
    defineField({
      name: 'presentazione',
      title: 'Testo di presentazione',
      type: 'text',
      rows: 4,
      description: 'Paragrafo introduttivo del locale (3-4 righe) — visibile nella sezione sotto l\'hero',
    }),
    defineField({
      name: 'piattiInEvidenza',
      title: 'Piatti in evidenza',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'reference',
          to: [{ type: 'menuItems' }],
        }),
      ],
      description: 'Massimo 4 piatti mostrati nella sezione anteprima menu in homepage',
      validation: (Rule) => Rule.max(4).warning('Seleziona al massimo 4 piatti in evidenza'),
    }),
    defineField({
      name: 'testoVini',
      title: 'Testo sezione vini',
      type: 'text',
      rows: 3,
      description: 'Breve testo editoriale per il teaser della pagina vini',
    }),
    defineField({
      name: 'sezioniVisibili',
      title: 'Sezioni visibili in homepage',
      type: 'object',
      description: 'Abilita o disabilita le singole sezioni della homepage',
      fields: [
        defineField({
          name: 'presentazione',
          title: 'Sezione presentazione',
          type: 'boolean',
          initialValue: true,
        }),
        defineField({
          name: 'menuPreview',
          title: 'Anteprima menu',
          type: 'boolean',
          initialValue: true,
        }),
        defineField({
          name: 'eventi',
          title: 'Prossimi eventi',
          type: 'boolean',
          initialValue: true,
        }),
        defineField({
          name: 'galleryTeaser',
          title: 'Teaser galleria',
          type: 'boolean',
          initialValue: true,
        }),
        defineField({
          name: 'vini',
          title: 'Teaser vini',
          type: 'boolean',
          initialValue: true,
        }),
      ],
    }),
  ],
  preview: {
    select: { media: 'immagineHero' },
    prepare({ media }) {
      return { title: 'Configurazione Homepage', media }
    },
  },
})
