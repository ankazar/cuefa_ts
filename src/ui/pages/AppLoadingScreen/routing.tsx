import AppLoadingScreen from 'src/ui/pages/AppLoadingScreen/AppLoadingScreen.tsx'
import { clearUnknownPathEnding } from 'src/util/react-router/ReactRouterUtils.tsx'
import { RouteObject } from 'react-router-dom'



// path: 'app-loading-screen / <check here>'
export const appLoadingScreenRouting: RouteObject[] = [
  {
    path: '',
    Component: AppLoadingScreen,
  },
  clearUnknownPathEnding,
]


