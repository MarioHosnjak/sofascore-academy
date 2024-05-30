import { Box, styled } from '@kuma-ui/core'
import SportButton from './SportButton'

const ButtonsContainer = styled.div`
  height: 6vh;
  background-color: var(--primary-default);
  display: flex;
  justify-content: center;
`

interface SportProps {
  id: number
  name: string
  slug: string
}

export default function ButtonsComponent({
  selectedSport,
  allSports,
}: {
  selectedSport: string
  allSports: SportProps[]
}) {
  return (
    <ButtonsContainer>
      {allSports.map(sport => (
        <SportButton
          key={sport.slug}
          isSelected={selectedSport === sport.slug}
          sportName={sport.name}
          sportSlug={sport.slug}
        ></SportButton>
      ))}
    </ButtonsContainer>
  )
}
