import styled from '@emotion/styled'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useRecoilValue } from 'recoil'
import { AppRecoil } from 'src/recoil/state/AppRecoil.ts'
import Button from 'src/ui/elements/Button/Button.tsx'
import { ButtonStyle } from 'src/ui/elements/Button/ButtonStyle.ts'
import { EmotionCommon } from 'src/ui/style/EmotionCommon.ts'
import abs = EmotionCommon.abs



const PageBackBtn =
React.memo(
()=>{
  const { resources } = useRecoilValue(AppRecoil)
  const navigate = useNavigate()
  
  return <BackBtnContainer>
    <Button
      css={ButtonStyle.backBtn}
      style={{ backgroundImage: `url(${resources.btnExit.dataUrl})` }}
      onClick={()=>navigate(-1)}
    />
  </BackBtnContainer>
})
export default PageBackBtn



const BackBtnContainer = styled.div`
  ${abs};
  left: 0.5%;
  bottom: 1%;
  z-index: 1;
  display: grid;
  place-items: end start;
  pointer-events: none;
  >*{
    pointer-events: auto;
  }
`
