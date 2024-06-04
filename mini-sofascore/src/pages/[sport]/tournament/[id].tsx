import Sport from '@/models/Sport'
import Tournament from '@/models/Tournament'
import FullscreenContainer from '@/modules/Common/FullscreenContainer'
import StickyHeader from '@/modules/Common/StickyHeader'
import Header from '@/modules/header/Header'
import useMediaQuery from '@/utils/useMediaQuery'
import { GetServerSideProps } from 'next'
import theme from '../../../../kuma.config'
import WidgetContainer from '@/modules/Common/WidgetContainer'
import Widget from '@/modules/Common/Widget'
import LeaguesWidget from '@/modules/leagues/LeaguesWidget'
import { styled } from '@kuma-ui/core'
import { useThemeContext } from '@/context/ThemeContext'
import TournamentInfo from '@/modules/Tournament/TournamentInfo'
import GameEvent from '@/models/GameEvent'

interface TournamentProps {
  tournament: Tournament
  sports: Sport[]
  sport: {
    slug: string
  }
  tournaments: Tournament[]
  events: GameEvent[]
}

const WideWidget = styled.div`
  width: calc((100vw - 2 * 4vw) / 3 * 2);
  height: auto;
  @media screen and (max-width: t('breakpoints.md')) {
    width: 90vw;
  }
`

export default function TournamentPage(props: TournamentProps) {
  const isMobile = useMediaQuery(`(max-width: ${theme.breakpoints['breakpoints.md']})`)
  const { isDark } = useThemeContext()
  return (
    <FullscreenContainer>
      {/* Header */}
      <StickyHeader>
        <Header selectedSport={props.sport.slug} allSports={props.sports} handleTrophyClick={() => {}}></Header>
      </StickyHeader>
      <WidgetContainer>
        {!isMobile && (
          <Widget>
            <LeaguesWidget tournaments={props.tournaments}></LeaguesWidget>
          </Widget>
        )}
        <WideWidget>
          <TournamentInfo tournament={props.tournament} events={props.events}></TournamentInfo>
        </WideWidget>
      </WidgetContainer>
    </FullscreenContainer>
  )
}

export const getServerSideProps: GetServerSideProps = async context => {
  const { params, res } = context
  try {
    console.log('INSIDE TOURNAMENTS PAGE!')
    //@ts-ignore
    const { sport, id } = params || {}
    let slug = Array.isArray(sport) ? sport[0] : sport || ''

    if (slug === '') {
      slug = 'football'
    }

    console.log(id)
    console.log(slug)

    const sports = await (await fetch(`https://academy-backend.sofascore.dev/sports`)).json()
    //console.log(sports)

    const tournaments = await (await fetch(`https://academy-backend.sofascore.dev/sport/${slug}/tournaments`)).json()
    //console.log(tournaments)

    const tournamentDetails = await (await fetch(`https://academy-backend.sofascore.dev/tournament/${id}`)).json()
    //console.log(tournamentDetails)

    const tournamentEvents = await (
      await fetch(`https://academy-backend.sofascore.dev/tournament/${id}/events/next/0`)
    ).json()
    console.log(tournamentEvents)

    const tournamentStandings = await (
      await fetch(`https://academy-backend.sofascore.dev/tournament/${id}/standings`)
    ).json()

    const props: TournamentProps = {
      sport: { slug: slug },
      sports: sports,
      tournament: tournamentDetails,
      tournaments: tournaments,
      events: tournamentEvents,
    }

    return {
      props: props,
    }
  } catch (error) {
    res.statusCode = 404
    return { props: { error } }
  }
}
