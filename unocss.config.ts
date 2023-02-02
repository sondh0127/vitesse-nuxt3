import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetTypography,
  presetUno,
  presetWebFonts,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'

import type { Preset } from '@unocss/core'
import { presetThemeDefault } from './packages/preset-theme-default'

// SECTION - Anu presets
export const presetIconExtraProperties = {
  'height': '1.2em',
  'width': '1.2em',

  // ℹ️ We also have to find a way to inject this without this config. (e.g. [class^=i-])
  'vertical-align': 'text-top',
  'flex-shrink': '0',
  'display': 'inline-block',
  'backface-visibility': 'hidden',
}

export function presetAnu(): Preset {
  return {
    name: '@anu-vue/preset-core',
    variants: [
      (matcher: string) => {
        if (!matcher.startsWith('i:'))
          return matcher

        return {
          // slice `i:` prefix and passed to the next variants and rules
          matcher: matcher.slice(2),
          selector: (s: string) => `${s} > i`,
        }
      },
    ],
  }
}
// !SECTION

export default defineConfig({
  shortcuts: [
    ['btn', 'px-4 py-1 rounded inline-block bg-teal-600 text-white cursor-pointer hover:bg-teal-700 disabled:cursor-default disabled:bg-gray-600 disabled:opacity-50'],
    ['icon-btn', 'inline-block cursor-pointer select-none opacity-75 transition duration-200 ease-in-out hover:opacity-100 hover:text-teal-600'],
  ],
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons({
      scale: 1.2,
      unit: 'em',
      extraProperties: presetIconExtraProperties,
    }),
    // anu-vue presets
    presetAnu(),
    presetThemeDefault(),
    presetTypography(),
    presetWebFonts({
      fonts: {
        sans: 'DM Sans',
        serif: 'DM Serif Display',
        mono: 'DM Mono',
      },
    }),
  ],
  transformers: [
    transformerDirectives(),
    transformerVariantGroup(),
  ],
  configDeps: [
    './packages/preset-theme-default/shortcuts.ts',
    './packages/preset-theme-default/rules.ts',
    './packages/preset-theme-default/variants.ts',
    './packages/preset-theme-default/index.ts',
  ],
})
