import { Box, VStack, styled } from '@kuma-ui/core'
import logoWhite from '../../assets/sofascore_lockup_white.svg'
import logoBlack from '../../assets/sofascore_lockup_black.svg'
import Image from 'next/image'
import { useThemeContext } from '@/context/ThemeContext'

export const FooterBox = styled.div`
  width: 100%;
  height: 116px;
  background-color: var(--surface-s1);
  padding: 20px;
`

export default function Footer() {
  const { isDark } = useThemeContext()

  return (
    <FooterBox>
      <VStack height={'100%'} justify={'space-around'} alignItems={'center'}>
        <Box>
          <Image src={isDark ? logoWhite : logoBlack} alt="sofascore logo" priority />
        </Box>
        <Box color={'colors.onSurface.nLv2'}>© 2024 Sofascore – All Rights Reserved.</Box>
      </VStack>
    </FooterBox>
  )
}
