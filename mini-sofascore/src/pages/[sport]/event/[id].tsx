import GameEvent from '@/models/GameEvent'
import Sport from '@/models/Sport'
import Tournament from '@/models/Tournament'
import EventDetailsWidget from '@/modules/events/EventDetailsWidget'
import Header from '@/modules/header/Header'
import LeaguesWidget from '@/modules/leagues/LeaguesWidget'
import useMediaQuery from '@/utils/useMediaQuery'
import { Box, styled } from '@kuma-ui/core'
import { GetServerSideProps } from 'next'
import theme from '../../../../kuma.config'

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

interface EventProps {
  event: GameEvent
  sports: Sport[]
  sport: {
    slug: string
  }
  tournaments: Tournament[]
}

export default function EventPage(props: EventProps) {
  const isMobile = useMediaQuery(`(max-width: ${theme.breakpoints['breakpoints.md']})`)
  return (
    <FullscreenContainer>
      {/* Header */}
      <StickyHeader>
        <Header selectedSport={props.sport.slug} allSports={props.sports}></Header>
      </StickyHeader>
      <WidgetContainer>
        {!isMobile && (
          <>
            <Widget>
              <LeaguesWidget tournaments={props.tournaments}></LeaguesWidget>
            </Widget>
            <Widget>
              <EventDetailsWidget selectedEvent={props.event} handleClose={() => {}}></EventDetailsWidget>
            </Widget>
            <WidgetPlaceholder></WidgetPlaceholder>
          </>
        )}
        {isMobile && (
          <Widget>
            <EventDetailsWidget selectedEvent={props.event} handleClose={() => {}}></EventDetailsWidget>
          </Widget>
        )}
      </WidgetContainer>
    </FullscreenContainer>
  )
}

export const getServerSideProps: GetServerSideProps = async context => {
  const { params, res } = context
  try {
    console.log('INSIDE EVENT PAGE!')
    //@ts-ignore
    const { sport, id } = params || {}
    let slug = Array.isArray(sport) ? sport[0] : sport || ''

    if (slug === '') {
      slug = 'football'
    }

    console.log(id)
    console.log(slug)

    const sports = await (await fetch(`https://academy-backend.sofascore.dev/sports`)).json()
    console.log(sports)

    const gameEvent = await (await fetch(`https://academy-backend.sofascore.dev/event/${id}`)).json()
    console.log(gameEvent)

    const tournaments = await (await fetch(`https://academy-backend.sofascore.dev/sport/${slug}/tournaments`)).json()
    console.log(tournaments)

    //const events = await (await fetch(`https://academy-backend.sofascore.dev/sport/${slug}/events/${today}`)).json()
    //console.log(events)

    const props: EventProps = { sport: { slug: slug }, sports: sports, event: gameEvent, tournaments: tournaments }

    return {
      props: props,
    }
  } catch (error) {
    res.statusCode = 404
    return { props: { error } }
  }
}
