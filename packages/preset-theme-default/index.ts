import type { Preset } from '@unocss/core'
import { rules } from './rules'
import { shortcuts } from './shortcuts'
import { variants } from './variants'

// ℹ️ We will need this import to generate the CSS file for preset-theme-default. We are just temporary disabling this.
// import './scss/index.scss'

interface PresetOptions {
  shortcutOverrides?: Exclude<Preset['shortcuts'], undefined>
}

const themeColors = {
  context: 'var(--a-c-context)',
  textContext: 'var(--a-t-c-context)',
  primary: 'hsl(var(--a-primary))',
  primaryLight: 'hsl(var(--a-primary-light))',
  textPrimaryLight: 'hsl(var(--a-text-primary-light))',
  success: 'hsl(var(--a-success))',
  successLight: 'hsl(var(--a-success-light))',
  textSuccessLight: 'hsl(var(--a-text-success-light))',
  info: 'hsl(var(--a-info))',
  infoLight: 'hsl(var(--a-info-light))',
  textInfoLight: 'hsl(var(--a-text-info-light))',
  warning: 'hsl(var(--a-warning))',
  warningLight: 'hsl(var(--a-warning-light))',
  textWarningLight: 'hsl(var(--a-text-warning-light))',
  danger: 'hsl(var(--a-danger))',
  dangerLight: 'hsl(var(--a-danger-light))',
  textDangerLight: 'hsl(var(--a-text-danger-light))',
  a: { border: 'hsla(var(--a-base-color),var(--a-border-opacity))' },
}

// TODO: Pass this to Anu plugin so that it can use the classes defined by theme preset
export const colors = Object.keys(themeColors) as (keyof typeof themeColors)[]
export type Colors = typeof colors

export function presetThemeDefault(options: PresetOptions = {}): Preset {
  return {
    name: '@anu-vue/preset-theme-default',
    theme: {
      colors: themeColors,
    },
    safelist: [
      ...colors.map(c => `[--a-layer-color:hsla(var(--a-${c}),var(--un-bg-opacity,1))]`),
      ...colors.map(c => `a-${c}`),
      ...colors.map(c => `a-t-${c}`),
      ...colors.map(c => `bg-${c}`),
      ...colors.map(c => `hover:bg-${c}`),

      ...colors.map(c => `border-${c}`),
      ...[...colors, '$a-layer-text'].map(c => `text-${c}`),
      ...colors.map(c => `shadow-${c}`),
      ...colors.map(c => `after:bg-${c}`),
      ...colors.map(c => `next:checked:bg-${c}`),
      ...colors.map(c => `next:checked:border-${c}`),

      // Typography
      ...[...colors, 'layer-text', 'white'].map(c => `a-title-${c}`),
      ...[...colors, 'layer-text', 'white'].map(c => `a-subtitle-${c}`),
      ...['top', 'right', 'bottom', 'left'].map(dir => `a-drawer-anchor-${dir}`),
    ],
    rules,
    shortcuts: options.shortcutOverrides === undefined
      ? shortcuts
      : Array.isArray(options.shortcutOverrides)
        ? [...options.shortcutOverrides, ...shortcuts]
        : [...Object.entries(options.shortcutOverrides), ...shortcuts],
    variants,
  }
}
