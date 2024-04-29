import styled from '@emotion/styled'
import { useViewportDimens } from '@util/react/useViewportDimens.ts'
import React from 'react'
import Modal from 'src/ui/components/Modal/Modal.tsx'
import ModalPortal from 'src/ui/components/Modal/ModalPortal.tsx'
import { ModalStyle } from 'src/ui/components/Modal/ModalStyle.ts'
import { EmotionCommon } from 'src/ui/style/EmotionCommon.ts'
import turnToLandImg from '@img/turn-to-landscape-with-text.png'
import center = EmotionCommon.center



const PortraitWarning =
React.memo(
()=>{
  
  const { isPortrait } = useViewportDimens()
  
  //console.log('isPortrait', isPortrait)
  
  return <>
    { isPortrait && <ModalPortal>
      <Modal css={ModalStyle.modal}>
        <Frame>
          <TurnToLandImg alt="Переверните устройство" src={turnToLandImg}/>
        </Frame>
      </Modal>
    </ModalPortal> }
  </>
})
export default PortraitWarning



const Frame = styled.div`
  width: 100%;
  height: 100%;
  background: white;
  ${center};
`


const TurnToLandImg = styled.img`
  place-self: stretch;
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
`
