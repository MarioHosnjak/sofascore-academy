import { useThemeContext } from '@/context/ThemeContext'
import GameEvent from '@/models/GameEvent'
import { Box, Button, VStack, styled, Image, HStack, Spacer } from '@kuma-ui/core'
import { formatDate } from '@/utils/formatDate'
import { urlContainsString } from '@/utils/urlContainsString'
import { useEffect, useRef, useState } from 'react'
import Incident from '@/models/Incident'
import useSWR from 'swr'

const EventsDetailsContainer = styled('div')`
  padding-top: 20px;
  padding-bottom: 5px;
  padding-left: t('spacings.lg');
  padding-right: t('spacings.lg');
  background-color: var(--surface-s1);
  border-radius: 16px;
`

const NavigationButtonsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding-bottom: t('spacings.lg');
`

const ResultContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: t('spacings.lg');
  height: 120px;
`

export default function EventDetailsWidget({
  selectedEvent,
  handleClose,
}: {
  selectedEvent: GameEvent | undefined
  handleClose: () => void
}) {
  const { isDark } = useThemeContext()
  const [isEventPage, setIsEventPage] = useState(false)
  const [eventIncidents, setEventIncidents] = useState<Incident[] | undefined>(undefined)

  useEffect(() => {
    setIsEventPage(urlContainsString('event'))
  }, [])

  return (
    <EventsDetailsContainer>
      {!isEventPage && (
        <NavigationButtonsContainer>
          <Image
            w={25}
            h={25}
            src={`/x_icon_${isDark ? 'white' : 'black'}.svg`}
            onClick={() => handleClose()}
            cursor={'pointer'}
          ></Image>
          <a
            href={`/${selectedEvent?.tournament.sport.slug}/event/${selectedEvent?.id}`}
            style={{ color: 'var(--primary-default)' }}
          >
            {'View full page >'}
          </a>
        </NavigationButtonsContainer>
      )}
      <ResultContainer>
        <VStack w={'33%'} gap={10} alignItems={'center'}>
          <Image
            w={40}
            h={40}
            src={`https://academy-backend.sofascore.dev/team/${selectedEvent?.homeTeam.id}/image`}
            alt="team image"
          ></Image>
          <Box textAlign={'center'}>{selectedEvent?.homeTeam.name}</Box>
        </VStack>
        <VStack w={'33%'} alignItems={'center'}>
          {selectedEvent?.status != 'notstarted' && (
            <>
              <Box color={selectedEvent?.status == 'playing' ? 'red' : ''}>
                {selectedEvent?.homeScore.total + ' - ' + selectedEvent?.awayScore.total}
              </Box>
              <Spacer size={'10px'}></Spacer>
              <Box color={selectedEvent?.status == 'playing' ? 'red' : ''}>
                {selectedEvent?.status == 'finished' ? 'FT' : 'Playing'}
              </Box>
            </>
          )}
          {selectedEvent?.status == 'notstarted' && (
            <>
              <Box>{formatDate(selectedEvent?.startDate)}</Box>
              <Spacer size={'10px'}></Spacer>
              <Box>{selectedEvent.startDate.toString().split('T')[1].split('+')[0].substring(0, 5)}</Box>
            </>
          )}
        </VStack>
        <VStack w={'33%'} gap={10} alignItems={'center'}>
          <Image
            w={40}
            h={40}
            src={`https://academy-backend.sofascore.dev/team/${selectedEvent?.awayTeam.id}/image`}
            alt="team image"
          ></Image>
          <Box textAlign={'center'}>{selectedEvent?.awayTeam.name}</Box>
        </VStack>
      </ResultContainer>
      <Box textAlign={'center'}>Incidents?</Box>
    </EventsDetailsContainer>
  )
}
