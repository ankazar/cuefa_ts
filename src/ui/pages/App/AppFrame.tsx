import React, { useLayoutEffect, useRef } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import { AppRecoil } from 'src/recoil/state/AppRecoil.ts'
import { Pages } from 'src/ui/components/Pages/Pages.tsx'
import PortraitWarning from 'src/ui/components/PortraitWarning/PortraitWarning'
import AppRouting from 'src/ui/pages/App/AppRouting'
import AppLoadingScreen from 'src/ui/pages/AppLoadingScreen/AppLoadingScreen.tsx'
import { EmotionCommon } from 'src/ui/style/EmotionCommon.ts'
import contents = EmotionCommon.contents




const AppFrame =
React.memo(
()=>{
  const { resourcesAreReady } = useRecoilValue(AppRecoil)
  
  
  return <div css={contents} id='app-frame'>
    { !resourcesAreReady && <AppLoadingScreen /> }
    { resourcesAreReady && <>
      <AppRouting/>
      <PortraitWarning/>
    </>}
  </div>
})
export default AppFrame


