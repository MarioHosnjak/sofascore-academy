import { styled } from '@kuma-ui/core'
import ButtonsComponent from './ButtonsComponent'
import LogoComponent from './LogoComponent'

interface SportProps {
  id: number
  name: string
  slug: string
}

export default function Header({
  selectedSport,
  allSports,
  setShowTournaments,
}: {
  selectedSport: string
  allSports: SportProps[]
  setShowTournaments: any
}) {
  return (
    <>
      <LogoComponent setShowTournaments={setShowTournaments}></LogoComponent>
      <ButtonsComponent selectedSport={selectedSport} allSports={allSports}></ButtonsComponent>
    </>
  )
}
