import { Box, styled } from '@kuma-ui/core'
import logoWhite from '../../assets/sofascore_lockup_white.svg'
import logoBlack from '../../assets/sofascore_lockup_black.svg'
import { useThemeContext } from '@/context/ThemeContext'
import Image from 'next/image'
import { relative } from 'path'

const StyledBox = styled('div')`
  width: 100%;
  height: 7vh;
  background-color: var(--primary-default);
  padding-left: t('spacings.lg');
  padding-right: t('spacings.lg');
  display: flex;
  justify-content: center;
  align-items: center;
  @media screen and (max-width: t('breakpoints.md')) {
    justify-content: start;
  }
`

export default function LogoComponent() {
  const { isDark } = useThemeContext()

  return (
    <Box>
      <StyledBox>
        <Image src={isDark ? logoBlack : logoWhite} alt="sofascore logo"></Image>
      </StyledBox>
    </Box>
  )
}
