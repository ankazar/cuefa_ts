import GameScreen from 'src/ui/pages/GameScreen/GameScreen.tsx'
import { clearUnknownPathEnding } from 'src/util/react-router/ReactRouterUtils.tsx'
import { RouteObject } from 'react-router-dom'



// path: 'game-screen / <check here>'
export const gameScreenRouting: RouteObject[] = [
  {
    path: '',
    Component: GameScreen,
  },
  clearUnknownPathEnding,
]


