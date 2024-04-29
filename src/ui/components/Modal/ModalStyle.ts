import { css } from '@emotion/react'
import { EmotionCommon } from 'src/ui/style/EmotionCommon.ts'
import fixed = EmotionCommon.fixed




export namespace ModalStyle {
  
  
  
  export const modal = css`
    ${fixed};
    background: #0000009a;
    z-index: 1;

    user-select: none;
    touch-action: none;
    pointer-events: none;
    >*{
      user-select: auto;
      touch-action: auto;
      pointer-events: auto;
    }
  `
  
  
  
}