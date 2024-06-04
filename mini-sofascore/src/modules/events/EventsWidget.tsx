import { Box, styled } from '@kuma-ui/core'
import GameEvent from '@/models/GameEvent'
import EventComponent from './EventComponent'
import useMediaQuery from '@/utils/useMediaQuery'
import theme from '../../../kuma.config'
import { useRouter } from 'next/router'

const EventsContainer = styled('div')`
  padding-top: 20px;
  padding-bottom: 5px;
  background-color: var(--surface-s1);
  border-radius: 16px;
`

export default function EventsWidget({
  events,
  setSelectedEvent,
  selectedEvent,
}: {
  events: GameEvent[]
  setSelectedEvent: (value: undefined | GameEvent) => void
  selectedEvent: GameEvent | undefined
}) {
  const isMobile = useMediaQuery(`(max-width: ${theme.breakpoints['breakpoints.md']})`)
  const router = useRouter()

  const handleComponentClick = (event: GameEvent) => {
    if (!isMobile) {
      setSelectedEvent(event)
    } else {
      router.push('/' + event.tournament.sport.slug + '/event/' + event.id)
    }
  }

  return (
    <EventsContainer>
      <p style={{ marginBottom: '15px', paddingLeft: '20px' }}>Events Widget</p>
      {events.map(event => (
        <Box
          key={event.id}
          onClick={() => {
            handleComponentClick(event)
          }}
        >
          <EventComponent event={event} isSelected={event == selectedEvent}></EventComponent>
        </Box>
      ))}
    </EventsContainer>
  )
}
