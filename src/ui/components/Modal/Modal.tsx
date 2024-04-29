import React, { useImperativeHandle, useRef } from 'react'
import { useUpNodesScrollLock } from 'src/util/react/useUpNodesScrollLock.ts'




export type ModalCustomProps = object
export type ForwardRefProps = React.JSX.IntrinsicElements['article']
type RefElement = HTMLDivElement

export type ModalProps = ModalCustomProps & ForwardRefProps
const Modal =
React.memo(
React.forwardRef<RefElement, ModalProps>(
(props, forwardedRef)=>{
  const { ...restProps } = props
  
  const elemRef = useRef<RefElement>(null)
  useImperativeHandle(forwardedRef, ()=>elemRef.current!,[])
  
  useUpNodesScrollLock(true, { elementRef: elemRef })
  
  return <div
    {...restProps}
    ref={elemRef}
  />
}))
export default Modal



