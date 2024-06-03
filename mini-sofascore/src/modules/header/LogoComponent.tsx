import { Box, Spacer, css, styled } from '@kuma-ui/core'
import { useThemeContext } from '@/context/ThemeContext'
import { Image } from '@kuma-ui/core'
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
        <Image src={`/sofascore_lockup_${isDark ? 'black' : 'white'}.svg`} alt="sofascore logo" />
        <ButtonContainer>
          <Image
            className={css`
              @media screen and (min-width: t('breakpoints.md')) {
                display: none;
              }
            `}
            src={`/trophy_icon_${isDark ? 'black' : 'white'}.svg`}
            alt="trophy icon"
          ></Image>
          <Spacer size={'24px'} horizontal />
          <Image src={`/ic_settings_${isDark ? 'black' : 'white'}.svg`} alt="settings icon"></Image>
        </ButtonContainer>
      </StyledBox>
    </Box>
  )
}
