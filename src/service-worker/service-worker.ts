/// <reference lib="webworker" />

// This service worker can be customized!
// See https://developers.google.com/web/tools/workbox/modules
// for the list of available Workbox modules, or add any other
// code you'd like.
// You can also remove this file if you'd prefer not to use a
// service worker, and the Workbox build step will be skipped.

import { clientsClaim, WorkboxPlugin } from 'workbox-core'
import { ExpirationPlugin } from 'workbox-expiration'
import {
  precacheAndRoute,
  createHandlerBoundToURL,
  precache,
  addRoute,
  cleanupOutdatedCaches,
} from 'workbox-precaching'
import { NavigationRoute, registerRoute } from 'workbox-routing'
import { NavigationRouteMatchOptions } from 'workbox-routing/src/NavigationRoute.ts'
import { StaleWhileRevalidate } from 'workbox-strategies'



declare const self: ServiceWorkerGlobalScope



const selfWbManifest = self.__WB_MANIFEST
// self.__WB_MANIFEST is the default injection point



// Precache all the assets generated by your build process.
// Their URLs are injected into the manifest variable below.
// This variable must be present somewhere in your service worker file,
// even if you decide not to use precaching.
precacheAndRoute(selfWbManifest)

// clean old res
cleanupOutdatedCaches()


// Set up App Shell-style routing, so that all navigation requests
// are fulfilled with your index.html shell.
{
  const navigationRouteMatchOptions: NavigationRouteMatchOptions = {}
  if (import.meta.env.PROD) {
    // cache all navigation routes
    navigationRouteMatchOptions.allowlist = [/.*/]
  }
  else {
    // disable cache
    navigationRouteMatchOptions.denylist = [/.*/]
  }
  
  // to allow work offline
  registerRoute(new NavigationRoute(
    createHandlerBoundToURL(import.meta.env.BASE_URL + 'index.html'),
    navigationRouteMatchOptions
  ))
}




{
  /*
   An example runtime caching route for requests that aren't handled by the
   precache, in this case same-origin .png requests like those from in public/
   */
  const imgExtsList = ['webp','svg','heic','heif','jpeg','jpg','png','gif','bmp']
  const imgExts = new RegExp(`\\.(${imgExtsList.join('|')})$`,'i')
  registerRoute(
    // Add in any other file extensions or routing criteria as needed.
    ({ url }) => {
      /* console.log('url.pathname',url.pathname)
       console.log('url.pathname is image',imgExts.test(url.pathname))
       console.log('url.origin',url.origin)
       console.log('self.location.origin',self.location.origin)
       console.log('url.origin===self.location.origin',url.origin===self.location.origin) */
      
      if (import.meta.env.DEV) return false
      
      //return url.origin===self.location.origin && imgExts.test(url.pathname)
      return imgExts.test(url.pathname)
    },
    // Customize this strategy as needed, e.g., by changing to CacheFirst.
    new StaleWhileRevalidate({
      cacheName: 'images',
      plugins: [
        // Ensure that once this runtime cache reaches a maximum size the
        // least-recently used images are removed.
        new ExpirationPlugin({ maxEntries: 50 }) as WorkboxPlugin,
      ],
    })
  )
}




/*
 This allows the web app to trigger skipWaiting via
 registration.waiting.postMessage({ type: 'skip-waiting' })
 */
self.addEventListener('message', async ev=>{
  switch (ev.data?.type){
    case 'skip-waiting':
      void self.skipWaiting()
      break
    case 'console.log':
      console.log('console.log',ev)
      break
    case 'clear-cache':
      // Service Worker won't be stopped until the Promise passed to 'waitUtil' is settled.
      ev.waitUntil(
        (async()=>{
          await clearCache()
          ev.ports[0]?.postMessage({ type: 'cache cleared' })
        })()
      )
      //self.registration.unregister()
      break
  }
})




async function clearCache(): Promise<void> {
  const entryKeys = await caches.keys()
  await Promise.allSettled(entryKeys.map(key=>caches.delete(key)))
}




void self.skipWaiting()
clientsClaim()
