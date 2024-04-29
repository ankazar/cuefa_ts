import { css, keyframes } from '@emotion/react'
import styled from '@emotion/styled'
import rays from '@img/rays.png'
import { AsyncUtils } from '@util/common/AsyncUtils.ts'
import { MathUtils } from '@util/common/MathUtils.ts'
import { Link } from 'react-router-dom'
import { Pages } from 'src/ui/components/Pages/Pages'
import React, { AnimationEvent, useEffect, useState } from 'react'
import swing from '@audio/swing.mp3'
import enemyAva from '@img/enemy-ava.jpg'
import playerAva from '@img/player-ava.jpg'
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
import Button from 'src/ui/elements/Button/Button.tsx'
import { ButtonStyle } from 'src/ui/elements/Button/ButtonStyle.ts'
import { EmotionCommon } from 'src/ui/style/EmotionCommon.ts'
import useSound from 'use-sound'
import randomInt = MathUtils.randomInt
import abs = EmotionCommon.abs
import Txt = EmotionCommon.Txt
import row = EmotionCommon.row
import center = EmotionCommon.center
import rotateAnim = EmotionCommon.rotateAnim
import awaitValue = AsyncUtils.awaitValue
import awaitCallback = AsyncUtils.awaitCallback




type Player = {
  ava: string
  name: string
}
async function findEnemy(): Promise<Player> {
  const enemies: Player[] = [
    {
      ava: enemyAva,
      name: 'Соперник 1',
    },
    {
      ava: enemyAva,
      name: 'Соперник 2',
    },
    {
      ava: enemyAva,
      name: 'Джэйсон Стетхэм',
    },
  ]
  return awaitValue(1500, enemies[randomInt(2)])
}




type RockPaperScissors = 'rock' | 'paper' | 'scissors'
function rockPaperScissors(): RockPaperScissors {
  const r = randomInt(2)
  if (r === 0) return 'rock'
  if (r === 1) return 'paper'
  return 'scissors'
}
type BattleResult = 'win'|'draw'|'defeat'
function getBattleResult(you: RockPaperScissors, enemy: RockPaperScissors): BattleResult {
  const variants = {
    rock: {
      rock: 'draw',
      scissors: 'win',
      paper: 'defeat',
    } as const,
    scissors: {
      rock: 'defeat',
      scissors: 'draw',
      paper: 'win',
    } as const,
    paper: {
      rock: 'win',
      scissors: 'defeat',
      paper: 'draw',
    } as const,
  } as const
  return variants[you][enemy]
}

type GameResult = 'battleWin' | 'battleDraw' | 'battleLost' | 'tourWin' | 'gameLost' | 'gameWin'

const nameToImg = {
  null: rock,
  rock: rock,
  scissors: scissors,
  paper: paper,
}

const timeOfSingleShake = 700 // ms
const fullShakeAnim = timeOfSingleShake*3

type GamesState = 'search'|'start'|'game'|'end'|'next'

const GameScreen =
React.memo(
()=>{
  
  const tourData = {
    tourLevel: 3,
    playerAva: playerAva,
    playerName: 'Имя игрока',
  }
  
  const [play] = useSound(swing)
  
  const [gameState, setGameState] = useState<GamesState>('search')
  const [tourNumber, setTourNumber] = useState(1)
  
  const [enemy, setEnemy] = useState<Player|null>(null)
  
  const [enemyChoice, setEnemyChoice] = useState<RockPaperScissors | null>(null)
  const [playerChoice, setPlayerChoice] = useState<RockPaperScissors | null>(null)
  const selectAction = (action: RockPaperScissors)=>{
    if (gameState==='start') setPlayerChoice(action)
  }
  
  const [enemyPts, setEnemyPts] = useState(0)
  const [playerPts, setPlayerPts] = useState(0)
  
  const [battleResult, setBattleResult] = useState<BattleResult | null>(null)
  const [gameResult, setGameResult] = useState<GameResult | null>(null)
  
  useEffect(()=>{
    if (gameState==='search') {
      findEnemy().then(it=>{
        setEnemy(it)
        setGameState('start')
      })
    }
  }, [gameState])
  useEffect(()=>{
    if (playerChoice) {
      setGameState('game')
      setEnemyChoice(rockPaperScissors())
    }
  }, [playerChoice])
  const endGame = ()=>{
    const result = getBattleResult(playerChoice!, enemyChoice!)
    if (result==='win') setPlayerPts(playerPts+1)
    if (result==='defeat') setEnemyPts(enemyPts+1)
    setBattleResult(result)
    setGameState('end')
  }
  useEffect(
    ()=>{
      if (gameState==='game'){
        const timerId = setTimeout(endGame, fullShakeAnim)
        return ()=>clearTimeout(timerId)
      }
    },
    [gameState]
  )
  
  useEffect(()=>{
    if (gameState==='end'){
      if (enemyPts<2 && playerPts<2) {
        if (battleResult==='win') setGameResult('battleWin')
        if (battleResult==='draw') setGameResult('battleDraw')
        if (battleResult==='defeat') setGameResult('battleLost')
      }
      else if (enemyPts>=2) setGameResult('gameLost')
      else if (playerPts>=2) {
        if (tourNumber < tourData.tourLevel) setGameResult('tourWin')
        if (tourNumber === tourData.tourLevel) setGameResult('gameWin')
      }
      const timerId = setTimeout(()=>setGameState('next'), 3000)
      return ()=>clearTimeout(timerId)
    }
  }, [gameState])
  
  const skip = ()=>{
    if (gameState==='end') setGameState('next')
  }
  
  const next = ()=>{
    if (['battleWin', 'battleDraw', 'battleLost'].includes(gameResult as GameResult)) {
      setGameState('start')
      setPlayerChoice(null)
      setEnemyChoice(null)
      setBattleResult(null)
      setGameResult(null)
    }
    else if ('gameLost'===gameResult) {
      setGameState('search')
      setTourNumber(1)
      setEnemy(null)
      setPlayerChoice(null)
      setEnemyChoice(null)
      setEnemyPts(0)
      setPlayerPts(0)
      setBattleResult(null)
    }
    else if ('tourWin'===gameResult) {
      setGameState('search')
      setTourNumber(tourNumber+1)
      setEnemy(null)
      setPlayerChoice(null)
      setEnemyChoice(null)
      setEnemyPts(0)
      setPlayerPts(0)
      setBattleResult(null)
    }
    else if ('gameWin'===gameResult) { /* go to /main-menu */ }
  }
  
  
  
  const [resultMsg, resultDescription, resultAction] = function(){
    if (gameResult==='battleWin') return ['Победа', '', 'Продолжить']
    if (gameResult==='battleDraw') return ['Ничья', '', 'Продолжить']
    if (gameResult==='battleLost') return ['Проигрыш', '', 'Продолжить']
    if (gameResult==='gameLost') return ['Вы проиграли', '', 'Начать заново']
    if (gameResult==='tourWin') return ['Вы победили!', '', 'Следующий тур']
    if (gameResult==='gameWin') return [
      'Вы выиграли!',
      'Админ свяжется с вами для вручения приза.',
      'Главное меню'
    ]
    return ['', '']
  }()
  
  
  const leftHandProps = function(){
    const img = ['end','next'].includes(gameState) ? nameToImg[enemyChoice + ''] : rock
    return {
      src: img,
      isShrink: img===rock,
    }
  }()
  const rightHandProps = function(){
    const img = ['end','next'].includes(gameState) ? nameToImg[playerChoice + ''] : rock
    return {
      src: img,
      isShrink: img===rock,
    }
  }()
  
  const onAnimation = (ev: React.AnimationEvent)=>{
    if ([shakeLeftAnim.name, shakeRightAnim.name].includes(ev.animationName)) {
      void awaitCallback(timeOfSingleShake*0.33, play)
    }
  }
  
  
  return <Pages.Page>
    <Pages.ContentClampAspectRatio>
      
      
      <Content onClick={skip}>
        <Bgc />
        <Rays src={rays} isRotating={gameState==='end'}/>
        
        
        {gameState!=='search' && <HandContainer
          isShaking={gameState==='game'}
        >
          <Hand
            {...leftHandProps}
          />
        </HandContainer>}
        
        <HandContainer
          isRight
          isShaking={gameState==='game'}
          onAnimationStart={onAnimation}
          onAnimationIteration={onAnimation}
        >
          <Hand
            {...rightHandProps}
            isRight
          />
        </HandContainer>
        
        <Layout>
          
          <StatusBar>
            <Ava img={gameState==='search' ? unknownAva : enemyAva} />
            <NameContainer>
              <Name>
                {gameState==='search' ? 'Поиск достойного противника...' : enemy!.name}
              </Name>
            </NameContainer>
            <PtsContainer><Pts>{enemyPts}</Pts></PtsContainer>
            <Tour>
              <div>Тур</div>
              <div>{tourNumber}/{tourData.tourLevel}</div>
            </Tour>
            <PtsContainer><Pts>{playerPts}</Pts></PtsContainer>
            <NameContainer><Name>{tourData.playerName}</Name></NameContainer>
            <Ava img={tourData.playerAva} />
          </StatusBar>
          <div/>
          {['search','start'].includes(gameState) && <ActionBar>
            <ActionButton
              img={btnRock}
              activeImg={btnRockActive}
              isActive={playerChoice==='rock'}
              isFaded={['search'].includes(gameState)}
              onClick={()=>selectAction('rock')}
            />
            <ActionButton
              img={btnScissors}
              activeImg={btnScissorsActive}
              isActive={playerChoice==='scissors'}
              isFaded={['search'].includes(gameState)}
              onClick={()=>selectAction('scissors')}
            />
            <ActionButton
              img={btnPaper}
              activeImg={btnPaperActive}
              isActive={playerChoice==='paper'}
              isFaded={['search'].includes(gameState)}
              onClick={()=>selectAction('paper')}
            />
          </ActionBar>}
          
        </Layout>
      </Content>
      
      
      {gameState==='next' && <ResultDialogFrame>
        <ResultDialog>
          <ResultDescription>
            <div>{resultMsg}</div>
            {resultDescription && <div>{resultDescription}</div>}
          </ResultDescription>
          {gameResult==='gameWin' && <Link to={'/main-menu'}>
            <Button css={ButtonStyle.button}>
              {resultAction}
            </Button>
          </Link>}
          {gameResult!=='gameWin' && <Button css={ButtonStyle.button} onClick={next}>
            {resultAction}
          </Button>}
        </ResultDialog>
      </ResultDialogFrame>}
      
      
    </Pages.ContentClampAspectRatio>
  </Pages.Page>
})
export default GameScreen


const Content = styled.div`
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 100%;
  color: white;
`


const Bgc = styled.div`
  ${abs};
  background: #004bbc;
`

const Rays = styled.img<{ isRotating: boolean }>`
  position: absolute;
  left: 50%;
  top: 50%;
  width: 100%;
  height: auto;
  translate: -50% -50%;
  scale: 2;
  ${p=>p.isRotating && css`animation: ${rotateAnim} 5s linear infinite`};
`


const Layout = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  
  display: grid;
  grid-template-rows: auto 1fr auto;
  justify-items: stretch;
  gap: 10px;
  padding: 20px 60px 10px 60px;
`


const StatusBar = styled.section`
  ${row};
  border-radius: 20px;
  background: #00000055;
  height: 80px;
  padding: 6px;
`
const Ava = styled.div<{ img: string }>`
  height: 100%;
  width: auto;
  aspect-ratio: 1;
  background-image: url(${p=>p.img});
  background-size: cover;
  background-position: center;
  border-radius: 999999px;
`
const NameContainer = styled.div`
  height: 100%;
  flex:1;
  padding-left: 10px;
  padding-right: 10px;
  ${center};
`
const Name = styled.div`
  ${Txt.large2};
  line-height: 129%;
  overflow-wrap: anywhere;
  text-align: center;
`

const PtsContainer = styled.div`
  height: 100%;
  padding-left: 10px;
  padding-right: 10px;
  ${center};
`
const Pts = styled.div`
  ${Txt.large6};
`

const Tour = styled.div`
  height: 100%;
  aspect-ratio: 1;
  border-radius: 10px;
  background: white;
  display: grid;
  grid-template-rows: auto auto;
  place-content: center;
  justify-items: center;
  color: black;
  ${Txt.large2};
  line-height: 129%;
`


const shakeLeftAnim = keyframes`
  0% { rotate: 0turn }
  33% { rotate: -0.05turn }
  66% { rotate: 0.05turn }
  100% { rotate: 0turn }
`
const shakeRightAnim = keyframes`
  0% { rotate: 0turn }
  33% { rotate: 0.05turn }
  66% { rotate: -0.05turn }
  100% { rotate: 0turn }
`
const HandContainer = styled.div<{
  isRight?: boolean,
  isShaking: boolean,
}>`
  position: absolute;
  bottom: 0;
  top: 40%;
  width: 200%;
  ${p=>!p.isRight && css`left: -100%;`};
  ${p=>p.isRight && css`right: -100%;`};
  ${p=>p.isShaking && !p.isRight && css`
    animation: ${shakeLeftAnim} ${timeOfSingleShake}ms linear 3;
  `};
  ${p=>p.isShaking && p.isRight && css`
    animation: ${shakeRightAnim} ${timeOfSingleShake}ms linear 3;
  `};
`
const Hand = styled.img<{
  isRight?: boolean,
  isShrink: boolean,
}>`
  position: absolute;
  bottom: 20%;
  ${p=>!p.isRight && css`left: 54%;`};
  ${p=>p.isRight && css`right: 54%;`};
  height: calc(90% * ${p=>(p.isShrink ? 0.85 : 1)});
  width: auto;
  ${p=>p.isRight && css`scale: -1 1;`};
`


const ActionBar = styled.section`
  height: 80px;
  ${row};
  justify-content: center;
  gap: 50px;
`
const ActionButton = styled(Button)<{
  img: string,
  activeImg: string,
  isActive: boolean,
  isFaded: boolean,
}>`
  ${ButtonStyle.gameAciton};
  background-image: url(${p=>p.isActive ? p.activeImg : p.img});
  
  ::after {
    content: '';
    ${abs};
    border-radius: inherit;
    ${p=>p.isFaded && css`background: #00000088`};
  }
`



const ResultDialogFrame = styled.section`
  ${abs};
  padding: 120px 100px 20px 100px;
  ${center};
`
const ResultDialog = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 30px;
  background: #000000cc;
  padding: 20px;
  display: grid;
  grid-template-rows: 1fr auto;
  place-items: center;
  gap: 14px;
`
const ResultDescription = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-rows: repeat(auto-fit, auto);
  place-items: center;
  color: white;
  ${Txt.large4};
  line-height: 129%;
  text-align: center;
`
