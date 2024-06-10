import { useThemeContext } from '@/context/ThemeContext'
import useMediaQuery from '@/utils/useMediaQuery'
import { Box, HStack, Spacer, VStack, styled } from '@kuma-ui/core'
import theme from '../../../kuma.config'
import { Image } from '@kuma-ui/core'
import Tournament from '@/models/Tournament'
import { getAlpha2Code } from '@/utils/getAlpha2Code'
import { useEffect, useState } from 'react'
import GameEvent from '@/models/GameEvent'
import { groupEventsByRound } from '@/utils/groupEventsByRound'
import EventComponent from '../events/EventComponent'
import { useRouter } from 'next/router'
import EventDetailsWidget from '../events/EventDetailsWidget'

/* 

        Pisano u žurbi, trebalo bi razlomiti na puno komponenti i ispočetka srediti CSS

*/

const InfoContainer = styled.div`
  padding-top: 20px;
  padding-bottom: 5px;
  padding-left: 20px;
  background-color: var(--surface-s1);
  border-radius: 16px;
`

const InfoContainerUpper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 30px;
`

const InfoContainerLower = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
`

const ImageContainer = styled.div`
  border: 1px solid;
  border-radius: 5px;
  padding: 5px;
  height: 70px;
  color: var(--on-surface-nLv3);
`

const ButtonsContainer = styled.div`
  height: 6vh;
  display: flex;
  justify-content: flex-start;
`

const CustomButton = styled.button`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: transparent;
  position: relative;
  border: 0px;
  cursor: pointer;
  color: var(--primary-default);
`

const SelectedLine = styled.div`
  height: 4px;
  width: 90%;
  position: absolute;
  bottom: 0;
  background-color: var(--primary-default);
  border-radius: 5px;
`

const QuarterWidget = styled.div`
  background-color: var(--surface-s1);
  padding: 15px;
  border-radius: 16px;
`
const QuarterWidgetPlaceholder = styled.div`
  width: 48%;
`
const QuarterWidgetContainer = styled.div`
  width: 49%;
  height: fit-content;
  @media screen and (max-width: t('breakpoints.md')) {
    width: 90vw;
  }
`

export default function TournamentInfo({ tournament, events }: { tournament: Tournament; events: GameEvent[] }) {
  const isMobile = useMediaQuery(`(max-width: ${theme.breakpoints['breakpoints.md']})`)
  const { isDark } = useThemeContext()
  const router = useRouter()
  const [selectedSubpage, setSelectedSubpage] = useState<'Matches' | 'Standings'>('Matches')
  const [selectedMatch, setSelectedMatch] = useState<GameEvent | undefined>(undefined)
  const [groupedMatches, setGroupedMatches] = useState<{ [round: number]: GameEvent[] }>({})

  useEffect(() => {
    setGroupedMatches(groupEventsByRound(events))
  }, [events])

  const handleComponentClick = (event: GameEvent) => {
    if (!isMobile) {
      setSelectedMatch(event)
    } else {
      router.push('/' + event.tournament.sport.slug + '/event/' + event.id)
    }
  }

  const handleEventWidgetClose = () => {
    setSelectedMatch(undefined)
  }

  return (
    <>
      <InfoContainer>
        <InfoContainerUpper>
          <ImageContainer style={{ backgroundColor: isDark ? 'white' : 'transparent' }}>
            <Image
              width={60}
              height={60}
              src={`https://academy-backend.sofascore.dev/tournament/${tournament.id}/image`}
              alt="League icon"
            ></Image>
          </ImageContainer>
          <VStack>
            <Box>
              <h1 style={{ fontSize: '32px', fontFamily: 'Roboto', fontWeight: 'bold' }}>{tournament.name}</h1>
            </Box>
            <Spacer size={'10px'}></Spacer>
            <HStack>
              <Image
                width={16}
                height={16}
                src={`https://www.sofascore.com/static/images/flags/${getAlpha2Code(tournament.country.name)}.png`}
                alt="League icon"
              ></Image>
              <Spacer alignItems={'center'} size={'10px'} horizontal></Spacer>
              <Box>{tournament.country.name}</Box>
            </HStack>
          </VStack>
        </InfoContainerUpper>
        <Spacer size={'20px'}></Spacer>
        <ButtonsContainer>
          <CustomButton
            onClick={() => {
              setSelectedSubpage('Matches')
            }}
          >
            <Box pl={'spacings.md'} pr={'spacings.md'}>
              Matches
            </Box>
            {selectedSubpage == 'Matches' && <SelectedLine />}
          </CustomButton>
          <CustomButton
            onClick={() => {
              setSelectedSubpage('Standings')
            }}
          >
            <Box pl={'spacings.md'} pr={'spacings.md'}>
              Standings
            </Box>
            {selectedSubpage == 'Standings' && <SelectedLine />}
          </CustomButton>
        </ButtonsContainer>
      </InfoContainer>
      <Spacer size={'15px'}></Spacer>
      {selectedSubpage == 'Matches' && (
        <InfoContainerLower>
          <QuarterWidgetContainer>
            <QuarterWidget>
              {Object.keys(groupedMatches).map(round => {
                const roundNumber = parseInt(round, 10)
                const eventsInRound = groupedMatches[roundNumber]
                return (
                  <div key={roundNumber}>
                    <p>Round {roundNumber}</p>
                    {eventsInRound &&
                      eventsInRound.map(event => (
                        <Box key={event.id} onClick={() => handleComponentClick(event)}>
                          <EventComponent event={event} isSelected={event == selectedMatch}></EventComponent>
                        </Box>
                      ))}
                    <Spacer size={'10px'}></Spacer>
                  </div>
                )
              })}
            </QuarterWidget>
          </QuarterWidgetContainer>
          {!isMobile && selectedMatch != undefined && (
            <QuarterWidgetContainer>
              <EventDetailsWidget
                selectedEvent={selectedMatch}
                handleClose={handleEventWidgetClose}
              ></EventDetailsWidget>
            </QuarterWidgetContainer>
          )}
          {!isMobile && selectedMatch == undefined && <QuarterWidgetPlaceholder></QuarterWidgetPlaceholder>}
        </InfoContainerLower>
      )}
    </>
  )
}
