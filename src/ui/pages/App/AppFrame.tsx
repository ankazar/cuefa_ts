import React, { useLayoutEffect, useRef } from 'react'
import { Pages } from 'src/ui/components/Pages/Pages.tsx'
import PortraitWarning from 'src/ui/components/PortraitWarning/PortraitWarning'
import AppRouting from 'src/ui/pages/App/AppRouting'
import { EmotionCommon } from 'src/ui/style/EmotionCommon.ts'
import contents = EmotionCommon.contents




const AppFrame =
React.memo(
()=>{
  return <div css={contents} id='app-frame'>
    <AppRouting/>
    <PortraitWarning/>
  </div>
})
export default AppFrame


