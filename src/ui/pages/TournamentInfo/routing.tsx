import React from 'react'
import { clearUnknownPathEnding } from 'src/util/react-router/ReactRouterUtils.tsx'
import { Navigate, RouteObject, useParams } from 'react-router-dom'
import TournamentInfo from 'src/ui/pages/TournamentInfo/TournamentInfo.tsx'






const TournamentTournamentId =
React.memo(
()=>{
  const tournamentId = useParams().tournamentId!
  
  const allowedIds = ['1','2','3']
  
  if (allowedIds.includes(tournamentId))
    return <TournamentInfo/>
  else
    return <Navigate to={'/main-menu'} replace />
})


// path: 'tournament / :tournamentId / <check-here>'
const tournamentTournamentIdRouting: RouteObject[] = [
  {
    path: '',
    Component: TournamentTournamentId,
  },
  clearUnknownPathEnding,
]



// path: 'tournament / <check-here>'
export const tournamentRouting: RouteObject[] = [
  {
    path: '',
    element: <Navigate to={'/main-menu'} replace />,
  },
  {
    path: ':tournamentId/*',
    children: tournamentTournamentIdRouting,
  },
  clearUnknownPathEnding,
]


