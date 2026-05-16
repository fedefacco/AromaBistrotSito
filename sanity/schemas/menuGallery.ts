import { defineType, defineField, defineArrayMember } from 'sanity'

export default defineType({
  name: 'menuGallery',
  title: 'Galleria menu',
  type: 'document',
  fields: [
    defineField({
      name: 'stagione',
      title: 'Stagione',
      type: 'string',
      description: 'Es. "Primavera · Estate 2025" — usato come titolo nella pagina menu',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'attiva',
      title: 'Galleria attiva',
      type: 'boolean',
      description: 'Una sola galleria può essere attiva per volta — quella attiva appare nella pagina menu',
      initialValue: false,
      // Sanity non supporta validation cross-document nativa; il warning viene gestito in studio
    }),
    defineField({
      name: 'immagini',
      title: 'Immagini',
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
              validation: (Rule) =>
                Rule.required().error('Il testo alternativo è obbligatorio per l\'accessibilità'),
            }),
            defineField({
              name: 'didascalia',
              title: 'Didascalia',
              type: 'string',
              description: 'Testo opzionale mostrato sotto la foto nello slider',
            }),
          ],
        }),
      ],
      validation: (Rule) => Rule.min(1).error('Aggiungi almeno un\'immagine alla galleria'),
    }),
  ],
  preview: {
    select: {
      title: 'stagione',
      attiva: 'attiva',
      media: 'immagini.0',
    },
    prepare({ title, attiva, media }) {
      return {
        title: attiva ? `✓ ${title}` : title,
        subtitle: attiva ? 'Galleria attiva' : 'Non attiva',
        media,
      }
    },
  },
})
