import { keyframes } from '@emotion/react'
import styled from '@emotion/styled'
import React from 'react'
import { Link } from 'react-router-dom'
import { useRecoilValue } from 'recoil'
import { AppRecoil } from 'src/recoil/state/AppRecoil.ts'
import { Pages } from 'src/ui/components/Pages/Pages'
import Button from 'src/ui/elements/Button/Button.tsx'
import { ButtonStyle } from 'src/ui/elements/Button/ButtonStyle.ts'
import { EmotionCommon } from 'src/ui/style/EmotionCommon.ts'
import center = EmotionCommon.center
import abs = EmotionCommon.abs
//import rays from '@img/rays.png'
//import leftChar from '@img/char-left.png'
//import rightChar from '@img/char-right.png'




const MainMenu =
React.memo(
()=>{
  const { resources } = useRecoilValue(AppRecoil)
  
  
  return <Pages.Page>
    <Pages.ContentClampAspectRatio>
      <BgcColor/>
      <BgcRays
        style={{ maskImage: `url(${resources.rays.dataUrl})` }}
      />
      
      <LeftChar src={resources.leftChar.dataUrl}/>
      <RightChar src={resources.rightChar.dataUrl}/>
      <Link to={'/tournament/1'}>
        <Button css={ButtonStyle.button}
          style={{ backgroundImage: `url(${resources.buttonBgc.dataUrl})` }}
        >Турнир</Button>
      </Link>
      
    </Pages.ContentClampAspectRatio>
  </Pages.Page>
})
export default MainMenu





const BgcColor = styled.div`
  ${abs};
  //background: #f6bd15;
  background: #004bbc;
  ${center};
`
const BgcRays = styled.div`
  ${abs};
  //background: #ff6c02;
  background: #146dcc;
  //mask-image: url(${0/*rays*/});
  mask-mode: alpha;
  mask-position: center;
  mask-size: cover;
  ${center};
`


const movingOutFromLeftEffect = keyframes`
  from { translate: -100%; }
  to { translate: 0; }
`
const LeftChar = styled.img`
  position: absolute;
  left: 0;
  padding-top: 2%;
  height: 100%;
  width: auto;
  translate: -100%;
  animation: ${movingOutFromLeftEffect} 2s linear forwards;
`


const movingOutFromRightEffect = keyframes`
  from { translate: 100%; }
  to { translate: 0; }
`
const RightChar = styled.img`
  position: absolute;
  right: 0;
  padding-top: 2%;
  height: 100%;
  width: auto;
  translate: 100%;
  animation: ${movingOutFromRightEffect} 2s linear forwards;
`