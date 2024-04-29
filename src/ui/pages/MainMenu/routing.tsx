import { clearUnknownPathEnding } from 'src/util/react-router/ReactRouterUtils.tsx'
import { RouteObject } from 'react-router-dom'
import MainMenu from 'src/ui/pages/MainMenu/MainMenu.tsx'



// path: 'main-menu / <check here>'
export const mainMenuRouting: RouteObject[] = [
  {
    path: '',
    Component: MainMenu,
  },
  clearUnknownPathEnding,
]


