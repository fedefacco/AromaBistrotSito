import { defineType, defineField, defineArrayMember } from 'sanity'

export default defineType({
  name: 'about',
  title: 'Il Bistrot',
  type: 'document',
  fields: [
    defineField({
      name: 'immagineHero',
      title: 'Immagine hero',
      type: 'image',
      description: 'Immagine principale della pagina (formato orizzontale, min 1920px)',
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'titolo',
      title: 'Titolo pagina',
      type: 'string',
      description: 'Es. "Il Bistrot" o "La nostra storia"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'storia',
      title: 'Storia del locale',
      type: 'array',
      of: [
        defineArrayMember({ type: 'block' }),
      ],
      description: 'Testo narrativo sulla storia e l\'origine del locale',
    }),
    defineField({
      name: 'filosofiaCucina',
      title: 'Filosofia di cucina',
      type: 'array',
      of: [
        defineArrayMember({ type: 'block' }),
      ],
      description: 'Approccio alla cucina, ingredienti, stagionalità',
    }),
    defineField({
      name: 'immaginiInterne',
      title: 'Immagini interne',
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
              validation: (Rule) => Rule.required().error('Il testo alternativo è obbligatorio per l\'accessibilità'),
            }),
          ],
        }),
      ],
      description: 'Foto del locale da alternare con il testo (cucina, sala, dettagli)',
    }),
  ],
  preview: {
    select: { title: 'titolo', media: 'immagineHero' },
    prepare({ title, media }) {
      return { title: title ?? 'Il Bistrot', media }
    },
  },
})
