import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'menuCategories',
  title: 'Categorie menu',
  type: 'document',
  fields: [
    defineField({
      name: 'nome',
      title: 'Nome categoria',
      type: 'string',
      description: 'Es. Antipasti, Primi, Secondi, Dessert',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'ordine',
      title: 'Ordine',
      type: 'number',
      description: 'Numero progressivo per l\'ordinamento nel menu (1 = prima categoria)',
      validation: (Rule) => Rule.required().integer().positive(),
    }),
  ],
  orderings: [
    {
      title: 'Ordine nel menu',
      name: 'ordineAsc',
      by: [{ field: 'ordine', direction: 'asc' }],
    },
  ],
  preview: {
    select: { title: 'nome', subtitle: 'ordine' },
    prepare({ title, subtitle }) {
      return { title, subtitle: `Posizione ${subtitle}` }
    },
  },
})
