import Tournament from '@/models/Tournament'
import { Box, styled } from '@kuma-ui/core'
//import Image from 'next/image'
import { Image } from '@kuma-ui/core'

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
  return (
    <ComponentBox>
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
