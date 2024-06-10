import { styled } from '@kuma-ui/core'

const Widget = styled('div')`
  width: calc((100vw - 2 * 4vw) / 3);
  height: auto;
  @media screen and (max-width: t('breakpoints.md')) {
    width: 90vw;
  }
`
export default Widget
