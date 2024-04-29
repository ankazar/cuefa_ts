import styled from '@emotion/styled'
import React from 'react'
import parse from 'html-react-parser'
import { Link, useParams } from 'react-router-dom'
import { Pages } from 'src/ui/components/Pages/Pages'
import rays from '@img/rays.png'
import trophy from '@img/trophy-award-laurel-wreath-composition-with-realistic-image-of-golden-cup-decorated-with-garland-with-reflection_1284-32301.jpg'
import Button from 'src/ui/elements/Button/Button.tsx'
import { ButtonStyle } from 'src/ui/elements/Button/ButtonStyle.ts'
import { EmotionCommon } from 'src/ui/style/EmotionCommon.ts'
import Txt = EmotionCommon.Txt
import abs = EmotionCommon.abs



const TournamentInfo =
React.memo(
()=>{
  const tournamentId = useParams().tournamentId!
  
  const tournamentName = `Турнир ${tournamentId}`
  const tournamentLevel = '20'
  const tournamentRules = `\
    <p>1. Правило 1</p>
    <p>2. Правило 2</p>
    <p>3. Правило 3</p>
    <p>4. Правило 4</p>
  `
  
  return <Pages.Page>
    <Pages.ContentClampAspectRatio>
      <Layout>
        <Bgc />
        <Rays src={rays}/>
        
        <DescriptionContainer>
          <TourDescription>
            <div>{tournamentName}</div>
            <div>Сложность: {tournamentLevel}</div>
            <div/>
            <TourRulesTitle>Правила турнира</TourRulesTitle>
          </TourDescription>
          <TrophyFrame>
            <Trophy/>
          </TrophyFrame>
          <Rules>
            {parse(tournamentRules)}
            <div style={{ height: 10 }} />
          </Rules>
        </DescriptionContainer>
        
        <Link to={'/game-screen'}>
          <Btn>Участвовать</Btn>
        </Link>
        
      </Layout>
    </Pages.ContentClampAspectRatio>
  </Pages.Page>
})
export default TournamentInfo



const Layout = styled.div`
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 100%;
  
  display: grid;
  grid:
    'desc'   3.3fr
    'btn'    0.7fr
  ;
  gap: 10px;
  padding: 20px 60px 10px 60px;
`


const Bgc = styled.div`
  ${abs};
  background: #004bbc;
`
const Rays = styled.img`
  position: absolute;
  left: 50%;
  top: 88%;
  width: 100%;
  height: auto;
  translate: -50% -50%;
  scale: 2;
`



const DescriptionContainer = styled.div`
  width: 100%;
  height: 100%;
  z-index: 0;
  background: #00000055;
  border-radius: 10px;
  padding: 10px;
  
  display: grid;
  grid:
    'tour  trophy'   85%
    'rules rules'    auto
  / 2fr    2fr;
  gap: 10px;
  overflow-y: auto;
  
  color: white;
  ${Txt.large3};
`


const TourDescription = styled.div`
  grid-area: tour;
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-rows: auto auto 1fr auto;
  place-content: start start;
  gap: 20px;
  z-index: 0;
`
const TourRulesTitle = styled.div`
  justify-self: end;
  /*grid-area: tour;
  z-index: 0;*/
`
const TrophyFrame = styled.div`
  grid-area: trophy;
  width: 100%;
  height: 100%;
  background: white;
  display: grid;
  place-items: stretch center;
  z-index: 0;
`
const Trophy = styled.div`
  width: 100%;
  height: 100%;
  background: url(${trophy});
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
  z-index: 0;
`

const Rules = styled.div`
  grid-area: rules;
  place-self: stretch stretch;
  min-height: 40px;
  height: fit-content;
  z-index: 0;
  //border: 2px solid white;
  //border-radius: 10px;
  ${Txt.normal1};
  color: white;
`
const Btn = styled(Button)`
  ${ButtonStyle.button};
  grid-area: btn;
  place-self: center;
`
