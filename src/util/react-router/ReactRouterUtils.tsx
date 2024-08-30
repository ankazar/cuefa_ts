import React from 'react'
import {
  Navigate,
  NonIndexRouteObject,
  useLocation, useParams,
} from 'react-router-dom'




const ClearUnknownPathEnding =
React.memo(
()=>{
  const location = useLocation()
  const params = useParams()
  const pathEnding = params['*']!
  const newUrlString = location.pathname.slice(0, -pathEnding.length) + location.search
  
  return <Navigate
    to={newUrlString}
    replace={true}
  />
})



// path: <any-path> / *
export const clearUnknownPathEnding: NonIndexRouteObject = {
  path: '*',
  Component: ClearUnknownPathEnding,
}





