import Header from '@/modules/header/Header'
import { Box, styled } from '@kuma-ui/core'
import { GetServerSideProps } from 'next'
import Sport from '@/models/Sport'
import Tournament from '@/models/Tournament'
import { useEffect, useRef, useState } from 'react'
import LeaguesWidget from '@/modules/leagues/LeaguesWidget'

interface SportProps {
  sport: {
    slug: string
  }
  sports: Sport[]
  tournaments: Tournament[]
}

const FullscreenContainer = styled('div')`
  background-color: var(--surface-s0);
  min-height: calc(100vh - 116px);
`

const StickyHeader = styled('div')`
  position: sticky;
  top: 0;
`
const WidgetContainer = styled('div')`
  display: flex;
  justify-content: space-evenly;
  width: 100vw;
  margin-top: 6vh;
  margin-bottom: 6vh;
`
const Widget = styled('div')`
  width: calc((100vw - 2 * 4vw) / 3);
  height: auto;
`
const WidgetPlaceholder = styled('div')`
  width: calc((100vw - 2 * 4vw) / 3);
  height: auto;
`

export default function SportPage(props: SportProps) {
  console.log(props.tournaments[0])
  const [showEventWidget, setShowEventWidget] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState(undefined)

  return (
    <FullscreenContainer>
      <StickyHeader>
        <Header selectedSport={props.sport.slug} allSports={props.sports}></Header>
      </StickyHeader>
      <WidgetContainer>
        <Widget>
          <LeaguesWidget tournaments={props.tournaments}></LeaguesWidget>
        </Widget>
        <Widget>Events</Widget>
        {showEventWidget && <Widget>Event</Widget>}
        {!showEventWidget && <WidgetPlaceholder></WidgetPlaceholder>}
      </WidgetContainer>
    </FullscreenContainer>
  )
}

export const getServerSideProps: GetServerSideProps = async context => {
  const { params, res } = context

  try {
    //@ts-ignore
    const { sport } = params || {}
    let slug = Array.isArray(sport) ? sport[0] : sport || ''

    if (slug === '') {
      slug = 'football'
    }

    const sports = await (await fetch(`https://academy-backend.sofascore.dev/sports`)).json()
    console.log(sports)

    const tournaments = await (await fetch(`https://academy-backend.sofascore.dev/sport/${slug}/tournaments`)).json()
    console.log(tournaments)

    const props: SportProps = { sport: { slug: slug }, sports, tournaments }

    return {
      props: props,
    }
  } catch (error) {
    res.statusCode = 404
    return { props: { error } }
  }
}
