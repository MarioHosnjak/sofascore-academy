import Header from '@/modules/header/Header'
import { Box, Button, styled } from '@kuma-ui/core'
import { GetServerSideProps } from 'next'
import Sport from '@/models/Sport'
import Tournament from '@/models/Tournament'
import GameEvent from '@/models/GameEvent'
import { useEffect, useRef, useState } from 'react'
import LeaguesWidget from '@/modules/leagues/LeaguesWidget'
import useMediaQuery from '@/utils/useMediaQuery'
import theme from '../../kuma.config'
import EventsWidget from '@/modules/events/EventsWidget'
import EventDetailsWidget from '@/modules/events/EventDetailsWidget'

interface SportProps {
  sport: {
    slug: string
  }
  sports: Sport[]
  tournaments: Tournament[]
  events: GameEvent[]
}

const FullscreenContainer = styled('div')`
  background-color: var(--surface-s0);
  min-height: calc(100vh - 116px);
  position: relative;
`

const StickyHeader = styled('div')`
  position: sticky;
  top: 0;
  z-index: 5;
`
const WidgetContainer = styled('div')`
  display: flex;
  justify-content: space-evenly;
  width: 100%;
  padding-top: 6vh;
  padding-bottom: 6vh;
`
const Widget = styled('div')`
  width: calc((100vw - 2 * 4vw) / 3);
  height: auto;
  @media screen and (max-width: t('breakpoints.md')) {
    width: 90vw;
  }
`
const WidgetPlaceholder = styled('div')`
  width: calc((100vw - 2 * 4vw) / 3);
  height: auto;
`

export default function SportPage(props: SportProps) {
  const [showEventWidget, setShowEventWidget] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState<undefined | GameEvent>(undefined)
  const isMobile = useMediaQuery(`(max-width: ${theme.breakpoints['breakpoints.md']})`)
  const [showTournaments, setShowTournaments] = useState(false)
  //console.log(isMobile)

  useEffect(() => {
    if (selectedEvent != undefined) {
      setShowEventWidget(true)
    }
    console.log(selectedEvent)
  }, [selectedEvent])

  const handleEventWidgetClose = () => {
    setShowEventWidget(false)
    setSelectedEvent(undefined)
  }

  const handleTrophyClick = () => {
    setShowTournaments(v => !v)
  }

  return (
    <FullscreenContainer>
      {/* Header */}
      <StickyHeader>
        <Header
          selectedSport={props.sport.slug}
          allSports={props.sports}
          handleTrophyClick={handleTrophyClick}
        ></Header>
      </StickyHeader>
      <WidgetContainer>
        {/* Tournaments */}
        {!isMobile && (
          <Widget>
            <LeaguesWidget tournaments={props.tournaments}></LeaguesWidget>
          </Widget>
        )}
        {isMobile && showTournaments && (
          <Widget>
            <LeaguesWidget tournaments={props.tournaments}></LeaguesWidget>
          </Widget>
        )}
        {/* Events */}
        {(!showTournaments || !isMobile) && (
          <Widget>
            <EventsWidget
              events={props.events}
              setSelectedEvent={setSelectedEvent}
              selectedEvent={selectedEvent}
            ></EventsWidget>
          </Widget>
        )}
        {/* Selected event */}
        {showEventWidget && !isMobile && (
          <Widget>
            <EventDetailsWidget selectedEvent={selectedEvent} handleClose={handleEventWidgetClose}></EventDetailsWidget>
          </Widget>
        )}
        {!showEventWidget && !isMobile && <WidgetPlaceholder></WidgetPlaceholder>}
      </WidgetContainer>
    </FullscreenContainer>
  )
}

export const getServerSideProps: GetServerSideProps = async context => {
  const { params, res } = context
  const today = '2024-05-25'
  //const today = new Date().toISOString().split('T')[0]
  try {
    console.log('INSIDE OUTER INDEX!')
    //@ts-ignore
    const { sport } = params || {}
    let slug = Array.isArray(sport) ? sport[0] : sport || ''

    if (slug === '') {
      slug = 'football'
    }

    console.log(today)
    console.log(slug)

    const sports = await (await fetch(`https://academy-backend.sofascore.dev/sports`)).json()

    const tournaments = await (await fetch(`https://academy-backend.sofascore.dev/sport/${slug}/tournaments`)).json()

    const events = await (await fetch(`https://academy-backend.sofascore.dev/sport/${slug}/events/${today}`)).json()

    const props: SportProps = { sport: { slug: slug }, sports, tournaments, events }

    return {
      props: props,
    }
  } catch (error) {
    res.statusCode = 404
    return { props: { error } }
  }
}
