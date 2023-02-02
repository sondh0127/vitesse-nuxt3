import type { ExtractPropTypes } from 'vue'
import { useProps as useLayerProps } from '@/composables/anu/useLayer'
import { configurable, spacing } from '@/composables/anu/useProps'

export const avatarProps = {
  spacing,

  ...useLayerProps({
    color: {
      default: 'primary',
    },
    variant: {
      default: 'light',
    },
  }),

  /**
   * Icon to render in avatar
   */
  icon: configurable,

  /**
   * Content to render inside avatar
   */
  content: String,

  /**
   * Render image using this prop
   */
  src: String,

  /**
   * Provide alt attribute for image given by `src` prop
   */
  alt: {
    type: String,
    default: 'avatar',
  },
}

export type AvatarProps = ExtractPropTypes<typeof avatarProps>
