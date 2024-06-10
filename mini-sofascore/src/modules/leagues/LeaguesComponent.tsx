import Tournament from '@/models/Tournament'
import { Box, styled } from '@kuma-ui/core'
import { Image } from '@kuma-ui/core'
import { useRouter } from 'next/router'

const ComponentBox = styled.div`
  height: 5.5em;
  padding-top: 20px;
  padding-bottom: 20px;
  display: flex;
  align-items: center;
  padding-left: t('spacings.lg');
  gap: t('spacings.lg');
`

const StyledH3 = styled.h3`
  font-size: 16px;
`

export default function LeagueComponent({ tournament }: { tournament: Tournament }) {
  const router = useRouter()

  const handleClick = (tournamentId: number) => {
    router.push('/' + tournament.sport.slug + '/tournament/' + tournamentId)
  }

  return (
    <ComponentBox style={{ cursor: 'pointer' }} onClick={() => handleClick(tournament.id)}>
      <Image
        width={40}
        height={40}
        src={`https://academy-backend.sofascore.dev/tournament/${tournament.id}/image`}
        alt="League icon"
      ></Image>
      <h3>{tournament.name}</h3>
    </ComponentBox>
  )
}
