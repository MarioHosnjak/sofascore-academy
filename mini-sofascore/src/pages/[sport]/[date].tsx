import Header from '@/modules/header/Header'
import { Box, Button, styled } from '@kuma-ui/core'
import { GetServerSideProps } from 'next'
import Sport from '@/models/Sport'
import Tournament from '@/models/Tournament'
import GameEvent from '@/models/GameEvent'
import { useEffect, useRef, useState } from 'react'
import LeaguesWidget from '@/modules/leagues/LeaguesWidget'
import useMediaQuery from '@/utils/useMediaQuery'
import theme from '../../../kuma.config'
import EventsWidget from '@/modules/events/EventsWidget'
import EventDetailsWidget from '@/modules/events/EventDetailsWidget'
import FullscreenContainer from '@/modules/Common/FullscreenContainer'
import StickyHeader from '@/modules/Common/StickyHeader'
import WidgetContainer from '@/modules/Common/WidgetContainer'
import Widget from '@/modules/Common/Widget'
import WidgetPlaceholder from '@/modules/Common/WidgetPlaceholder'

interface SportProps {
  sport: {
    slug: string
  }
  sports: Sport[]
  tournaments: Tournament[]
  events: GameEvent[]
  date: string
}

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
              date={props.date}
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
  try {
    //@ts-ignore
    const { sport, date } = params || {}
    let slug = Array.isArray(sport) ? sport[0] : sport || ''

    if (slug === '') {
      slug = 'football'
    }

    const dateString = Array.isArray(date) ? date[0] : date || new Date().toISOString().split('T')[0]
    console.log(dateString)

    console.log(slug)

    const sports = await (await fetch(`https://academy-backend.sofascore.dev/sports`)).json()
    //console.log(sports)

    const tournaments = await (await fetch(`https://academy-backend.sofascore.dev/sport/${slug}/tournaments`)).json()
    //console.log(tournaments)

    const events = await (
      await fetch(`https://academy-backend.sofascore.dev/sport/${slug}/events/${dateString}`)
    ).json()
    //console.log(events)

    const props: SportProps = { sport: { slug: slug }, sports, tournaments, events, date: dateString }

    return {
      props: props,
    }
  } catch (error) {
    res.statusCode = 404
    return { props: { error } }
  }
}
