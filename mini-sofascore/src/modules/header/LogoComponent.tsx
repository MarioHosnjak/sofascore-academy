import { Box, Spacer, css, styled } from '@kuma-ui/core'
import logoWhite from '@/assets/sofascore_lockup_white.svg'
import logoBlack from '@/assets/sofascore_lockup_black.svg'
import settingsWhite from '@/assets/ic_settings_white.svg'
import settingsBlack from '@/assets/ic_settings_black.svg'
import trophyWhite from '@/assets/trophy_icon_white.svg'
import trophyBlack from '@/assets/trophy_icon_black.svg'
import { useThemeContext } from '@/context/ThemeContext'
import Image from 'next/image'
import { relative } from 'path'

const StyledBox = styled('div')`
  width: 100%;
  height: 7vh;
  background-color: var(--primary-default);
  padding-left: t('spacings.lg');
  position: relative;
  padding-right: t('spacings.lg');
  display: flex;
  justify-content: center;
  align-items: center;
  @media screen and (max-width: t('breakpoints.md')) {
    justify-content: start;
  }
`

const ButtonContainer = styled.div`
  position: absolute;
  right: 0px;
  padding: t('spacings.lg');
`

export default function LogoComponent() {
  const { isDark } = useThemeContext()

  return (
    <Box>
      <StyledBox>
        <Image src={isDark ? logoBlack : logoWhite} alt="sofascore logo"></Image>
        <ButtonContainer>
          <Image
            className={css`
              @media screen and (min-width: t('breakpoints.md')) {
                display: none;
              }
            `}
            src={isDark ? trophyBlack : trophyWhite}
            alt="trophy icon"
          ></Image>
          <Spacer size={'24px'} horizontal />
          <Image src={isDark ? settingsBlack : settingsWhite} alt="settings icon"></Image>
        </ButtonContainer>
      </StyledBox>
    </Box>
  )
}
