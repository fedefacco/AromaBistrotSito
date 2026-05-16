import { defineType, defineField, defineArrayMember } from 'sanity'

export default defineType({
  name: 'menuItems',
  title: 'Piatti',
  type: 'document',
  fields: [
    defineField({
      name: 'nome',
      title: 'Nome del piatto',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'descrizione',
      title: 'Descrizione',
      type: 'text',
      rows: 2,
      description: 'Breve descrizione degli ingredienti o della preparazione (max 100 caratteri)',
      validation: (Rule) =>
        Rule.max(100).warning('La descrizione dovrebbe essere al massimo 100 caratteri'),
    }),
    defineField({
      name: 'prezzo',
      title: 'Prezzo (€)',
      type: 'number',
      validation: (Rule) => Rule.required().positive(),
    }),
    defineField({
      name: 'categoria',
      title: 'Categoria',
      type: 'reference',
      to: [{ type: 'menuCategories' }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'tag',
      title: 'Tag',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'string',
          options: {
            list: [
              { title: 'Signature', value: 'signature' },
              { title: 'Novità', value: 'novita' },
              { title: 'Vegetariano', value: 'vegetariano' },
              { title: 'Vegano', value: 'vegano' },
              { title: 'Senza glutine', value: 'senza-glutine' },
            ],
          },
        }),
      ],
    }),
    defineField({
      name: 'allergeni',
      title: 'Allergeni',
      type: 'string',
      description: 'Es. "Contiene glutine, lattosio, uova"',
    }),
    defineField({
      name: 'visibile',
      title: 'Visibile nel menu',
      type: 'boolean',
      description: 'Deseleziona per nascondere temporaneamente il piatto senza eliminarlo',
      initialValue: true,
    }),
    defineField({
      name: 'ordine',
      title: 'Ordine',
      type: 'number',
      description: 'Posizione all\'interno della categoria (1 = primo)',
      validation: (Rule) => Rule.integer().positive(),
    }),
  ],
  orderings: [
    {
      title: 'Categoria poi ordine',
      name: 'categoriaOrdineAsc',
      by: [
        { field: 'categoria.ordine', direction: 'asc' },
        { field: 'ordine', direction: 'asc' },
      ],
    },
    {
      title: 'Ordine nel menu',
      name: 'ordineAsc',
      by: [{ field: 'ordine', direction: 'asc' }],
    },
  ],
  preview: {
    select: {
      title: 'nome',
      subtitle: 'categoria.nome',
      prezzo: 'prezzo',
      visibile: 'visibile',
    },
    prepare({ title, subtitle, prezzo, visibile }) {
      return {
        title: visibile === false ? `(nascosto) ${title}` : title,
        subtitle: `${subtitle ?? '—'} · € ${prezzo ?? '—'}`,
      }
    },
  },
})
