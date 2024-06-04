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
  handleTrophyClick,
}: {
  selectedSport: string
  allSports: SportProps[]
  handleTrophyClick: any
}) {
  return (
    <>
      <LogoComponent handleTrophyClick={handleTrophyClick}></LogoComponent>
      <ButtonsComponent selectedSport={selectedSport} allSports={allSports}></ButtonsComponent>
    </>
  )
}
