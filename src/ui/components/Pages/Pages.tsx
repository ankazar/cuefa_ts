import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { MathUtils } from '@util/common/MathUtils.ts'
import { useViewportDimens } from '@util/react/useViewportDimens.ts'
import React from 'react'
import { EmotionCommon } from 'src/ui/style/EmotionCommon.ts'
import center = EmotionCommon.center
import fitRange = MathUtils.fitRange
import centerAll = EmotionCommon.centerAll



export namespace Pages {
  
  
  export const fillViewport = css`
    min-width: 220px;
    width: 100dvw;
    min-height: 220px;
    height: 100dvh;
  `
  
  
  export const Page = styled.main`
    width: 100dvw;
    height: 100dvh;
    background: #004bbc;
    position: relative;
    ${center};
  `
  export const Content = styled.section`
    width: auto;
    //max-width: 100%;
    height: 100%;
    aspect-ratio: 4/3;
    background: aquamarine;
  `
  
  
  
  export type ContentClampAspectRatioProps = {
    children: React.ReactNode
  }
  export const ContentClampAspectRatio =
  React.memo(
  (props: ContentClampAspectRatioProps)=>{
    const minRatio = 4/3
    const maxRatio = 20/9
    const { ratio } = useViewportDimens()
    
    const finalRatio = fitRange(ratio, [minRatio, maxRatio])
    
    return <section css={css`
      position: relative;
      ${centerAll};
      overflow: hidden;
      //background: aquamarine;
    `}
      style={{
        aspectRatio: finalRatio,
        width: ratio < minRatio ? '100%' : 'auto',
        height: ratio >= minRatio ? '100%' : 'auto',
      }}
    >
      {props.children}
    </section>
  })
  
  
}