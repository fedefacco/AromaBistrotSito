import type { SchemaTypeDefinition } from 'sanity'

// TASK-011
import settings from './settings'
import about from './about'
import homepageConfig from './homepageConfig'
import pages from './pages'

// TASK-012: menuCategories, menuItems, menuGallery
// TASK-013: siteGallery, events, wineHighlights

export const schemaTypes: SchemaTypeDefinition[] = [
  settings,
  about,
  homepageConfig,
  pages,
]
