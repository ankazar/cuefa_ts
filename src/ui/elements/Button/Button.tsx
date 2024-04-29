import { css } from '@emotion/react'
import { EmotionCommon } from 'src/ui/style/EmotionCommon.ts'
import React, { useImperativeHandle, useRef } from "react"
import resetButton = EmotionCommon.resetButton
import row = EmotionCommon.row
import hoverable = EmotionCommon.hoverable





export type ButtonCustomProps = object
export type ButtonForwardRefProps = React.JSX.IntrinsicElements['button']
export type ButtonRefElement = HTMLButtonElement
export type ButtonProps = ButtonCustomProps & ButtonForwardRefProps



const Button =
React.memo(
React.forwardRef<ButtonRefElement, ButtonProps>(
(props, forwardedRef) => {
  const {
    className, type,
    children,
    ...restProps
  } = props
  
  
  const elemRef = useRef<ButtonRefElement>(null)
  useImperativeHandle(forwardedRef, ()=>elemRef.current!,[])
  
  
  const buttonProps = {
    className: className,
    type: type ?? 'button',
    ...restProps
  }
  
  
  
  return <button css={buttonStyle}
    {...buttonProps}
    ref={elemRef}
  >
    
    { children }
    
  </button>
}))
export default Button




const buttonStyle = css`
  ${resetButton};
  position: relative;
  ${row};
  place-content: center;
  place-items: center;

  :active, :focus-visible {
    cursor: pointer;
  }
  ${hoverable}{ :hover {
    cursor: pointer;
  } }
  :disabled {
    cursor: auto;
  }
`
