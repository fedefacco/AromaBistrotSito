import type { SchemaTypeDefinition } from 'sanity'

// TASK-011
import settings from './settings'
import about from './about'
import homepageConfig from './homepageConfig'
import pages from './pages'

// TASK-012
import menuCategories from './menuCategories'
import menuItems from './menuItems'
import menuGallery from './menuGallery'

// TASK-013
import siteGallery from './siteGallery'
import events from './events'
import wineHighlights from './wineHighlights'

export const schemaTypes: SchemaTypeDefinition[] = [
  settings,
  about,
  homepageConfig,
  pages,
  menuCategories,
  menuItems,
  menuGallery,
  siteGallery,
  events,
  wineHighlights,
]
