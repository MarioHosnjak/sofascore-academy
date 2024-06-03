import { useThemeContext } from '@/context/ThemeContext'
import GameEvent from '@/models/GameEvent'
import { Box, Button, VStack, styled, Image, HStack } from '@kuma-ui/core'

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
  return (
    <EventsDetailsContainer>
      <NavigationButtonsContainer>
        <Image
          w={25}
          h={25}
          src={`/x_icon_${isDark ? 'white' : 'black'}.svg`}
          onClick={() => handleClose()}
          cursor={'pointer'}
        ></Image>
        <a href="/nesto" style={{ color: 'var(--primary-default)' }}>
          {'View full page >'}
        </a>
      </NavigationButtonsContainer>
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
          <Box>{selectedEvent?.homeScore.total + ' - ' + selectedEvent?.awayScore.total}</Box>
          <Box>{selectedEvent?.status}</Box>
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
      <Box textAlign={'center'}>Incidets?</Box>
    </EventsDetailsContainer>
  )
}
