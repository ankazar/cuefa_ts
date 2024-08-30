import styled from '@emotion/styled'
import { FileUtils } from '@util/file/FileUtils.ts'
import React, { useEffect, useMemo } from 'react'
import { useRecoilState } from 'recoil'
import { AppRecoil } from 'src/recoil/state/AppRecoil.ts'
import { Pages } from 'src/ui/components/Pages/Pages'
import { EmotionCommon } from 'src/ui/style/EmotionCommon.ts'
import abs = EmotionCommon.abs
//import appLoadingScreen from '@img/app-loading-screen.png'
import fetchToBlob = FileUtils.fetchToBlob
import blobToDataUrl = FileUtils.blobToDataUrl




const AppLoadingScreen =
React.memo(
()=>{
  const [{ resources }, setAppState] = useRecoilState(AppRecoil)
  
  const progress = useMemo(
    ()=>{
      const entreies = Object.entries(resources)
      return entreies.reduce(
        (cnt, [name, resData])=>resData.isReady ? cnt+1 : cnt,
        0
      ) / entreies.length * 100
    },
    [resources]
  )
  useEffect(()=>{
    if (progress===100) setAppState(s=>({ ...s, resourcesAreReady: true }))
  }, [progress])
  
  useEffect(() => {
    let hasAnyChanges = false
    const newRess = { ...resources }
    for (const name in newRess) {
      const res = newRess[name]
      const newRes = { ...res }
      let hasChanges = false
      if (!newRes.isLoading && !newRes.isReady) {
        hasAnyChanges = true
        hasChanges = true
        newRes.isLoading = true
        if (newRes.type==='dataUrl') {
          ;(async()=>{
            const blob = await fetchToBlob(newRes.url)
            const dataUrl = await blobToDataUrl(blob)
            setAppState(s => ({
              ...s,
              resources: {
                ...s.resources,
                [name]: {
                  ...s.resources[name],
                  isLoading: false,
                  isReady: true,
                  dataUrl,
                }
              },
            }))
          })()
        }
        else if (newRes.type==='image') {
          newRes.image.onload = ()=>{
            setAppState(s => ({
              ...s,
              resources: {
                ...s.resources,
                [name]: {
                  ...s.resources[name],
                  isLoading: false,
                  isReady: true,
                }
              },
            }))
          }
          newRes.image.src = newRes.url
        }
      }
      if (hasChanges) newRess[name] = newRes
    }
    
    if (hasAnyChanges) setAppState(s=>({ ...s, resources: newRess }))
  }, [resources])
  
  
  return <Pages.Page>
    <Pages.ContentClampAspectRatio>
      
      <Bgc
        style={{ backgroundImage: `url(${resources.appLoadingScreen.dataUrl})` }}
      />
      
      <PageLayout>
        <ProgressBar progress={progress}/>
      </PageLayout>
      
    </Pages.ContentClampAspectRatio>
  </Pages.Page>
})
export default AppLoadingScreen



const Bgc = styled.div`
  ${abs};
  //background-image: url(${0/*appLoadingScreen*/});
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
`


const PageLayout = styled.div`
  ${abs};
  display: grid;
  place-items: start center;
  grid: 'empty' 1fr
        'progress' auto
        'padding' 10%
        / 100%;
`
const ProgressBar = styled.article<{
  progress: number
}>`
  grid-area: progress;
  border: 2px solid white;
  border-radius: 999999px;
  height: 36px;
  width: 240px;
  background-image: linear-gradient(
    to right,
    #5ff900 0% ${p=>p.progress}%,
    transparent ${p=>p.progress}% 100%
  );
`