import { useAutoFullscreen } from '@util/react/useAutoFullscreen.ts'
import React from 'react'
import AppFrame from 'src/ui/pages/App/AppFrame.tsx'



const App =
React.memo(
()=>{
  
  useAutoFullscreen()
  
  return <>
    <AppFrame/>
  </>
})
export default App
