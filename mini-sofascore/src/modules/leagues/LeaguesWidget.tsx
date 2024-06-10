import Tournament from '@/models/Tournament'
import { Box, styled } from '@kuma-ui/core'
import LeagueComponent from './LeaguesComponent'
import { useEffect, useRef, useState } from 'react'

const LeaguesContainer = styled('div')`
  padding-top: 20px;
  padding-bottom: 5px;
  background-color: var(--surface-s1);
  border-radius: 16px;
`

const StyledH2 = styled.h2`
  margin-left: 20px;
  color: var(--on-surface-nLv1);
`

const ViewMoreButtonContainer = styled.div`
  height: 3em;
  padding-left: t('spacings.lg');
  display: flex;
  align-items: center;
`

const ViewMoreButton = styled.button`
  color: var(--primary-default);
  background-color: transparent;
  border: 0px;
  font-size: 16px;
  cursor: pointer;
`

export default function LeaguesWidget({ tournaments }: { tournaments: Tournament[] }) {
  const tournamentsLimit = useRef(2)
  const [shownTournaments, setShownTournaments] = useState(tournaments.slice(0, tournamentsLimit.current))

  const viewMoreHandler = () => {
    setShownTournaments(tournaments)
  }

  useEffect(() => {
    setShownTournaments(tournaments.slice(0, tournamentsLimit.current))
  }, [tournaments])

  return (
    <LeaguesContainer>
      <StyledH2>Leagues</StyledH2>
      {shownTournaments.map(tournament => (
        <LeagueComponent key={tournament.id} tournament={tournament}></LeagueComponent>
      ))}
      {shownTournaments.length < tournaments.length && (
        <ViewMoreButtonContainer>
          <ViewMoreButton onClick={viewMoreHandler}>Show more</ViewMoreButton>
        </ViewMoreButtonContainer>
      )}
    </LeaguesContainer>
  )
}
