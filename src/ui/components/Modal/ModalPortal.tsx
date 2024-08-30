import React from 'react'
import { createPortal } from 'react-dom'
import { TypeUtils } from 'src/util/common/TypeUtils.ts'
import PartialUndef = TypeUtils.PartialUndef




export type ModalPortalProps = PartialUndef<{
  children: React.ReactNode
}>
const ModalPortal =
React.memo(
(props: ModalPortalProps)=>{
  const modalView = document.getElementById('modal-outlet')
  
  
  return <>
    { modalView && createPortal(props.children, modalView) }
  </>
})
export default ModalPortal