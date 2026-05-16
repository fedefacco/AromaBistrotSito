import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'pages',
  title: 'Pagine',
  type: 'document',
  fields: [
    defineField({
      name: 'pagina',
      title: 'Pagina',
      type: 'string',
      options: {
        list: [
          { title: 'Menu', value: 'menu' },
          { title: 'Galleria', value: 'galleria' },
          { title: 'Vini', value: 'vini' },
          { title: 'Il Bistrot', value: 'il-bistrot' },
          { title: 'Eventi', value: 'eventi' },
          { title: 'Contatti', value: 'contatti' },
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'titolo',
      title: 'Titolo',
      type: 'string',
      description: 'Titolo H1 della pagina — es. "Il Menu" o "Galleria"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'sottotitolo',
      title: 'Sottotitolo',
      type: 'string',
      description: 'Riga opzionale sotto il titolo nell\'hero',
    }),
    defineField({
      name: 'testoIntroduttivo',
      title: 'Testo introduttivo',
      type: 'text',
      rows: 3,
      description: 'Paragrafo opzionale di introduzione alla pagina',
    }),
  ],
  preview: {
    select: { pagina: 'pagina', titolo: 'titolo' },
    prepare({ pagina, titolo }) {
      const labels: Record<string, string> = {
        menu: 'Menu',
        galleria: 'Galleria',
        vini: 'Vini',
        'il-bistrot': 'Il Bistrot',
        eventi: 'Eventi',
        contatti: 'Contatti',
      }
      return {
        title: titolo ?? labels[pagina] ?? pagina,
        subtitle: `Pagina: ${labels[pagina] ?? pagina}`,
      }
    },
  },
})
