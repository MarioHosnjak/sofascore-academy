import Header from '@/modules/header/Header'
import { Box, styled } from '@kuma-ui/core'
import { GetServerSideProps } from 'next'
import Sport from '@/models/Sport'
import Tournament from '@/models/Tournament'
import { useEffect, useRef, useState } from 'react'
import LeaguesWidget from '@/modules/leagues/LeaguesWidget'
import useMediaQuery from '@/utils/useMediaQuery'
import theme from '../../../kuma.config'

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
  const [selectedEvent, setSelectedEvent] = useState(undefined)
  const isMobile = useMediaQuery(`(max-width: ${theme.breakpoints['breakpoints.md']})`)
  console.log(isMobile)

  return (
    <FullscreenContainer>
      <StickyHeader>
        <Header selectedSport={props.sport.slug} allSports={props.sports}></Header>
      </StickyHeader>
      <WidgetContainer>
        {!isMobile && (
          <Widget>
            <LeaguesWidget tournaments={props.tournaments}></LeaguesWidget>
          </Widget>
        )}
        <Widget>Events</Widget>
        {showEventWidget && !isMobile && <Widget>Event</Widget>}
        {!showEventWidget && !isMobile && <WidgetPlaceholder></WidgetPlaceholder>}
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
