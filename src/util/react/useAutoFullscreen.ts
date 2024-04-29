import { useLayoutEffect } from 'react'


export const useAutoFullscreen = ()=>{
  useLayoutEffect(()=>{
    const html = document.documentElement
    const onClick = async()=>{
      //console.log('click')
      if(!document.fullscreenElement){
        await html.requestFullscreen()
      }
    }
    html.addEventListener('click', onClick)
    return ()=>{
      html.removeEventListener('click', onClick)
    }
  },[])
}