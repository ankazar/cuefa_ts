import { atom } from 'recoil'
import appLoadingScreen from '@img/app-loading-screen.png'
import buttonBgc from '@img/button-bgc.png'
import btnExit from '@img/btn-exit-white.png'
import turnToLandImg from '@img/turn-to-landscape-with-text.png'
import rays from '@img/rays.png'
import leftChar from '@img/char-left.png'
import rightChar from '@img/char-right.png'
import unknownAva from '@img/ava-unknown.png'
import btnRock from '@img/btn-rock.png'
import btnRockActive from '@img/btn-rock-active.png'
import btnScissors from '@img/btn-scissors.png'
import btnScissorsActive from '@img/btn-scissors-active.png'
import btnPaper from '@img/btn-paper.png'
import btnPaperActive from '@img/btn-paper-active.png'
import rock from '@img/rock.png'
import scissors from '@img/scissors.png'
import paper from '@img/paper.png'
import swing from '@audio/swing.mp3'


const trophy = 'https://img.freepik.com/free-vector/trophy-award-laurel-wreath-composition-with-realistic-image-of-golden-cup-decorated-with-garland-with-reflection_1284-32301.jpg?w=740&t=st=1713073149~exp=1713073749~hmac=2ee2e4d49d713eaf20ce5f86d1810c7835851c839b2f169b55bc62aab5d7c12c'
const enemyAva = 'https://sun3-9.userapi.com/s/v1/if2/R2uC-AgaqmhAAQg2GVu98lC-hjNXFJX8YIWsx5wWr41fat8zv7Rv6Ir57T7NA77kQHj_mRGd5LFmZ8DPf-pBhNUZ.jpg?quality=95&crop=960,1193,319,319&as=50x50,100x100,200x200&ava=1&u=0QT7OygNsVaalrxEYgoHT0KcIz_tCOEAp32nf3FHWBI&cs=100x100'
const playerAva = 'https://sun3-9.userapi.com/s/v1/if2/R2uC-AgaqmhAAQg2GVu98lC-hjNXFJX8YIWsx5wWr41fat8zv7Rv6Ir57T7NA77kQHj_mRGd5LFmZ8DPf-pBhNUZ.jpg?quality=95&crop=960,1193,319,319&as=50x50,100x100,200x200&ava=1&u=0QT7OygNsVaalrxEYgoHT0KcIz_tCOEAp32nf3FHWBI&cs=100x100'



type ResourceDataUrl = {
  type: 'dataUrl'
  url: string
  dataUrl: string
  isLoading: boolean
  isReady: boolean
}
type ResourceImage = {
  type: 'image'
  url: string
  image: HTMLImageElement
  isLoading: boolean
  isReady: boolean
}
type Resource = ResourceDataUrl | ResourceImage



export type AppRecoilType = {
  resources: {
    appLoadingScreen: ResourceDataUrl,
    
    buttonBgc: ResourceDataUrl,
    btnExit: ResourceDataUrl,
    
    turnToLandImg: ResourceDataUrl,
    
    rays: ResourceDataUrl,
    
    leftChar: ResourceDataUrl,
    rightChar: ResourceDataUrl,
    
    trophy: ResourceImage,
    
    enemyAva: ResourceImage,
    playerAva: ResourceImage,
    unknownAva: ResourceDataUrl,
    btnRock: ResourceDataUrl,
    btnRockActive: ResourceDataUrl,
    btnScissors: ResourceDataUrl,
    btnScissorsActive: ResourceDataUrl,
    btnPaper: ResourceDataUrl,
    btnPaperActive: ResourceDataUrl,
    rock: ResourceDataUrl,
    scissors: ResourceDataUrl,
    paper: ResourceDataUrl,
    swing: ResourceDataUrl,
  }
  resourcesAreReady: boolean
}
const Default: AppRecoilType = {
  resources: {
    appLoadingScreen: createResourceDataUrl(appLoadingScreen),
    
    buttonBgc: createResourceDataUrl(buttonBgc),
    btnExit: createResourceDataUrl(btnExit),
    
    turnToLandImg: createResourceDataUrl(turnToLandImg),
    
    rays: createResourceDataUrl(rays),
    
    leftChar: createResourceDataUrl(leftChar),
    rightChar: createResourceDataUrl(rightChar),
    
    trophy: createResourceImage(trophy),
    
    enemyAva: createResourceImage(enemyAva),
    playerAva: createResourceImage(playerAva),
    unknownAva: createResourceDataUrl(unknownAva),
    btnRock: createResourceDataUrl(btnRock),
    btnRockActive: createResourceDataUrl(btnRockActive),
    btnScissors: createResourceDataUrl(btnScissors),
    btnScissorsActive: createResourceDataUrl(btnScissorsActive),
    btnPaper: createResourceDataUrl(btnPaper),
    btnPaperActive: createResourceDataUrl(btnPaperActive),
    rock: createResourceDataUrl(rock),
    scissors: createResourceDataUrl(scissors),
    paper: createResourceDataUrl(paper),
    swing: createResourceDataUrl(swing),
  },
  resourcesAreReady: false,
}
export const AppRecoil = atom<AppRecoilType>({
  key: 'app',
  default: Default,
})


function createResourceDataUrl(url: string): ResourceDataUrl {
  return {
    type: 'dataUrl',
    url,
    dataUrl: '',
    isLoading: false,
    isReady: false,
  }
}
function createResourceImage(url: string): ResourceImage {
  return {
    type: 'image',
    url,
    image: new Image(),
    isLoading: false,
    isReady: false,
  }
}