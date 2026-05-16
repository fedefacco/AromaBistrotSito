import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import type { StructureBuilder } from 'sanity/structure'
import { schemaTypes } from './schemas'

const singletonTypes = new Set(['settings', 'about', 'homepageConfig'])

const singletonActions = new Set(['publish', 'discardChanges', 'restore'])

export default defineConfig({
  name: 'aroma-bistrot',
  title: 'Aroma Bistrot CMS',

  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production',

  plugins: [
    structureTool({
      structure: (S: StructureBuilder) =>
        S.list()
          .title('Contenuti')
          .items([
            S.listItem()
              .title('Impostazioni sito')
              .id('settings')
              .child(S.document().schemaType('settings').documentId('settings')),
            S.listItem()
              .title('Homepage')
              .id('homepageConfig')
              .child(S.document().schemaType('homepageConfig').documentId('homepageConfig')),
            S.listItem()
              .title('Il Bistrot')
              .id('about')
              .child(S.document().schemaType('about').documentId('about')),
            S.divider(),
            S.listItem()
              .title('Pagine')
              .child(S.documentTypeList('pages').title('Pagine')),
            S.divider(),
            S.listItem()
              .title('Menu — Categorie')
              .child(S.documentTypeList('menuCategories').title('Categorie menu')),
            S.listItem()
              .title('Menu — Piatti')
              .child(S.documentTypeList('menuItems').title('Piatti')),
            S.listItem()
              .title('Menu — Galleria foto')
              .child(S.documentTypeList('menuGallery').title('Gallerie menu')),
            // TASK-013: Galleria locale, Eventi, Vini in evidenza
          ]),
    }),
  ],

  schema: {
    types: schemaTypes,
    templates: (templates) =>
      templates.filter(({ schemaType }) => !singletonTypes.has(schemaType)),
  },

  document: {
    actions: (input, context) =>
      singletonTypes.has(context.schemaType)
        ? input.filter(({ action }) => action && singletonActions.has(action))
        : input,
  },
})
