import { defineManifest } from '@crxjs/vite-plugin'
import packageJson from './package.json'

const { version, name, description, displayName } = packageJson
// Convert from Semver (example: 0.1.0-beta6)
const [major, minor, patch, label = '0'] = version
  // can only contain digits, dots, or dash
  .replace(/[^\d.-]+/g, '')
  // split into version parts
  .split(/[.-]/)

export default defineManifest(async (env) => ({
  name: env.mode === 'staging' ? `[INTERNAL] ${name}` : displayName || name,
  description,
  // up to four numbers separated by dots
  version: `${major}.${minor}.${patch}.${label}`,
  // semver is OK in "version_name"
  version_name: version,
  manifest_version: 3,
  // key: 'ekgmcbpgglflmgcfajnglpbcbdccnnje',
  action: {
    default_popup: 'src/popup/index.html',
  },
  background: {
    service_worker: 'src/background/index.ts',
  },
  content_scripts: [
    {
      all_frames: false,
      js: ['src/content-script/subscriptionsScraper.ts'],
      matches: ['https://podcasts.google.com/subscriptions*'],
      run_at: 'document_end',
    },
    {
      all_frames: false,
      js: ['src/content-script/feedScraper.ts'],
      matches: ['https://podcasts.google.com/feed/*'],
      run_at: 'document_end',
    },
    {
      all_frames: false,
      js: ['src/content-script/queueScraper.ts'],
      matches: ['https://podcasts.google.com/queue*'],
      run_at: 'document_end',
    },
  ],
  icons: {
    16: 'src/assets/icon16.png',
    32: 'src/assets/icon32.png',
    48: 'src/assets/icon48.png',
    128: 'src/assets/icon128.png',
  },
  host_permissions: ['https://podcasts.google.com/*'],
  options_page: 'src/options/index.html',
  permissions: ['storage'],
  web_accessible_resources: [],
}))
