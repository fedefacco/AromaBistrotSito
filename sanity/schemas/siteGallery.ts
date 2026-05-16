import { defineType, defineField, defineArrayMember } from 'sanity'

export default defineType({
  name: 'siteGallery',
  title: 'Galleria locale',
  type: 'document',
  fields: [
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
              name: 'categoria',
              title: 'Categoria',
              type: 'string',
              options: {
                list: [
                  { title: 'Atmosfera', value: 'atmosfera' },
                  { title: 'Cucina', value: 'cucina' },
                  { title: 'Dettagli', value: 'dettagli' },
                  { title: 'Persone', value: 'persone' },
                  { title: 'Ingredienti', value: 'ingredienti' },
                ],
              },
            }),
            defineField({
              name: 'inEvidenza',
              title: 'In evidenza',
              type: 'boolean',
              description: 'Le foto in evidenza appaiono nella homepage',
              initialValue: false,
            }),
          ],
        }),
      ],
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Galleria locale' }
    },
  },
})
