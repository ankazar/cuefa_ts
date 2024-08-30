import {
  createBrowserRouter,
  Navigate,
  RouteObject,
  RouterProvider,
} from 'react-router-dom'
import { appLoadingScreenRouting } from 'src/ui/pages/AppLoadingScreen/routing.tsx'
import { gameScreenRouting } from 'src/ui/pages/GameScreen/routing.tsx'
import { mainMenuRouting } from 'src/ui/pages/MainMenu/routing.tsx'
import React from 'react'
import { tournamentRouting } from 'src/ui/pages/TournamentInfo/routing.tsx'






// path: '/ <check here>'
const rootRoutes: RouteObject[] = [
  /* {
    path: 'app-loading-screen'+'/!*',
    children: appLoadingScreenRouting,
  }, */
  {
    path: 'main-menu'+'/*',
    children: mainMenuRouting,
  },
  {
    path: 'tournament'+'/*',
    children: tournamentRouting,
  },
  {
    path: 'game-screen'+'/*',
    children: gameScreenRouting,
  },
  {
    path: '*',
    element: <Navigate to={'/main-menu'} replace />
  },
]
const router = createBrowserRouter(rootRoutes)




const AppRouting =
React.memo(
()=>{
  return <RouterProvider router={router} />
})
export default AppRouting


