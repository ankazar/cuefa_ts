import { useAutoFullscreen } from '@util/react/useAutoFullscreen.ts'
import React from 'react'
import AppFrame from 'src/ui/pages/App/AppFrame.tsx'
import bridge from '@vkontakte/vk-bridge';


const App =
React.memo(
()=>{
  
  //useAutoFullscreen() полноэкранный режим при любом нажатии
  console.log("start")
  //console.log(window.location)
  bridge.send('VKWebAppInit')
  .then((data) => { 
    if (data.result) {
      console.log("Приложение инициализировано");
      //console.log(data);
      // Приложение инициализировано
    } else {
      console.log("Ошибка");
      // Ошибка
    }
  })
  .catch((error) => {
    // Ошибка
    console.log(error);
  });
  bridge.send('VKWebAppGetUserInfo', {
    })
    .then((data) => { 
      if (data.id) {
        // Данные пользователя получены
        window.localStorage['uniqueId'] = data.id
        window.localStorage['playerAva'] = data.photo_100
        window.localStorage['playerName'] = data.first_name// + ' ' + data.last_name
        //console.log(data);
      }    
    })
    .catch((error) => {
      // Ошибка
      console.log(error);
    });
  return <>
    <AppFrame/>
  </>
})
export default App
