import { Box, styled } from '@kuma-ui/core'
import GameEvent from '@/models/GameEvent'
import EventComponent from './EventComponent'
import { useState } from 'react'

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
  return (
    <EventsContainer>
      <p style={{ marginBottom: '15px', paddingLeft: '20px' }}>Events Widget</p>
      {events.map(event => (
        <Box
          key={event.id}
          onClick={() => {
            setSelectedEvent(event)
          }}
        >
          <EventComponent event={event} isSelected={event == selectedEvent}></EventComponent>
        </Box>
      ))}
    </EventsContainer>
  )
}
