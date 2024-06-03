import GameEvent from '@/models/GameEvent'
import { Box, styled } from '@kuma-ui/core'

const EventContainer = styled.div`
  height: 56px;
  width: 100%;
  position: relative;
  display: flex;
  align-items: center;
  padding-left: t('spacings.lg');
  padding-right: t('spacings.lg');
  cursor: pointer;
`

const TimeStatus = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  width: 64px;
  position: sticky;
  left: 0;
`

const Result = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: flex-end;
  width: 64px;
  position: sticky;
  right: 0;
`

const Teams = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: flex-start;
  padding-left: t('spacings.lg');
  width: 100%;
`

export default function EventComponent({ event, isSelected }: { event: GameEvent; isSelected: boolean }) {
  return (
    <EventContainer style={{ backgroundColor: isSelected ? 'var(--primary-highlight)' : 'transparent' }}>
      <TimeStatus>
        <Box>{event.startDate.toString().split('T')[1].split('+')[0].substring(0, 5)}</Box>
        <Box>{event.status == 'finished' ? 'FT' : event.status == 'notstarted' ? '-' : 'In progress'}</Box>
      </TimeStatus>
      <Teams>
        <Box>{event.homeTeam.name}</Box>
        <Box>{event.awayTeam.name}</Box>
      </Teams>
      <Result>
        <Box>{event.homeScore.total}</Box>
        <Box>{event.awayScore.total}</Box>
      </Result>
    </EventContainer>
  )
}
