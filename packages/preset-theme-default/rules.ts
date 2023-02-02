import type { Preset } from '@unocss/core'
import { parseColor } from '@unocss/preset-mini/utils'

const rules: Preset['rules'] = [
  // 👉 - Text Color
  // https://github.com/onu-ui/onu-ui/blob/main/packages/preset/src/rules/index.ts#L12
  [/^a-t-(.*)$/, ([, body]: string[], { theme }) => {
    const color = parseColor(body, theme)
    if (color?.cssColor?.type === 'rgb' && color.cssColor.components) {
      return {
        '--a-t-c-context': `${color.cssColor.components.join(',')}`,
      }
    }
    else {
      return {
        '--a-t-c-context': color?.color,
      }
    }
  }],

  // 👉 - Color
  [/^a-(.*)$/, ([, body]: string[], { theme }) => {
    const color = parseColor(body, theme)
    if (color?.cssColor?.type === 'rgb' && color.cssColor.components) {
      return {
        '--a-c-context': `${color.cssColor.components.join(',')}`,
      }
    }
    else {
      return {
        '--a-c-context': color?.color,
      }
    }
  }],

  // Spacing
  [
    /^spacing-(\d+)$/,
    ([, d]) => ({ '--a-spacing': (Number(d) / 100) }),
  ],

  // Typography
  [
    /^a-(title|subtitle|text)-([-\w]+)$/,
    ([, type, c]: string[]) => ({
      [`--a-${type}-color`]: `var(--a-${c})`,
    }),
  ],
  [
    /^a-(title|subtitle|text)-opacity-(\d+)$/,
    ([, type, o]: string[]) => ({
      [`--a-${type}-opacity`]: `${Number(o) * 0.01}`,
    }),
  ],

  [
    'overlay',
    {
      position: 'absolute',
      inset: 0,
      content: '\'\'',
      background: 'currentColor',
      opacity: 0,
    },
  ],
]

export { rules }
