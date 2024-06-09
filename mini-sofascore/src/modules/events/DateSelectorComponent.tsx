import { formatDate, formatDateForUrl, generateDates } from '@/utils/dateUtils'
import { Box, styled } from '@kuma-ui/core'
import { useRouter } from 'next/router'

const Container = styled.div`
  //width: 100%;
  height: 46px;
  background-color: yellow;
  display: flex;
  justify-content: center;
  overflow-x: hidden;
`

const DateButtonStyle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: fit-content;
  background-color: blue;
  padding: 15px;
  cursor: pointer;
`

const SelectedLine = styled.div`
  height: 4px;
  width: 90%;
  position: absolute;
  bottom: 0;
  background-color: var(--surface-s0);
  border-radius: 5px;
`

export function DateButton({ date, isSelected }: { date: Date; isSelected: boolean }) {
  return (
    <DateButtonStyle style={{ backgroundColor: isSelected ? 'red' : 'blue' }}>
      {date.getDate() + '.' + (date.getMonth() + 1).toString() + '.'}
    </DateButtonStyle>
  )
}

export default function DateSelectorComponent({ date, slug }: { date: string; slug: string }) {
  const router = useRouter()
  const dateObject = new Date(date)
  const dateArray = generateDates(dateObject)

  return (
    <Container>
      {dateArray.map(date => {
        return (
          <Box
            onClick={() => {
              router.push('/' + slug + '/' + formatDateForUrl(date))
            }}
            key={date.getDate()}
          >
            <DateButton date={date} isSelected={dateObject.getDate() == date.getDate()}></DateButton>
          </Box>
        )
      })}
    </Container>
  )
}
