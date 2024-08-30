import { css } from '@emotion/react'
//import buttonBgc from '@img/button-bgc.png'
//import btnExit from '@img/btn-exit-white.png'
import { EmotionCommon } from 'src/ui/style/EmotionCommon.ts'
import Txt = EmotionCommon.Txt




export namespace ButtonStyle {
  
  
  export const button = css`
    width: 200px;
    height: 55px;
    background-size: 100% 100%;
    color: white;
    ${Txt.large2};
    text-transform: uppercase;
  `
  
  
  export const gameAction = css`
    height: 100%;
    width: auto;
    aspect-ratio: 1;
    background-size: cover;
    background-position: center;
    border-radius: 999999px;
  `
  
  
  export const backBtn = css`
    width: 30px;
    height: 30px;
    //background-image: url(${0/*btnExit*/});
    background-size: cover;
    background-position: center;
  `
  
  
}