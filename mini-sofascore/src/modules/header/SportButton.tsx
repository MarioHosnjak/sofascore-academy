import { Box, styled } from '@kuma-ui/core'
import { useRouter } from 'next/router'

const CustomSportButton = styled.button`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: var(--primary-default);
  position: relative;
  border: 0px;
  cursor: pointer;
  color: var(--surface-s0);
`
const SelectedLine = styled.div`
  height: 4px;
  width: 90%;
  position: absolute;
  bottom: 0;
  background-color: var(--surface-s0);
  border-radius: 5px;
`

export default function SportButton({
  isSelected,
  sportName,
  sportSlug,
}: {
  isSelected: boolean
  sportName: string
  sportSlug: string
}) {
  const router = useRouter()
  return (
    <CustomSportButton onClick={() => router.push('/' + sportSlug)}>
      <Box pl={'spacings.md'} pr={'spacings.md'}>
        {sportName}
      </Box>
      {isSelected && <SelectedLine />}
    </CustomSportButton>
  )
}
