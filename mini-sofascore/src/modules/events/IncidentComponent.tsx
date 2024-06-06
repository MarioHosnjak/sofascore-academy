import Incident from '@/models/Incident'
import { Box, Image, styled } from '@kuma-ui/core'

const IncidentBox = styled.div`
  width: 100%;
  padding: 10px;
  display: flex;
  height: auto;
`
const PeriodBox = styled.div`
  width: 100%;
  border-radius: 10px;
  background-color: var(--secondary-highlight);
  //height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
`

const IncidentElement = styled.div`
  padding-left: 10px;
  padding-right: 10px;
`

export default function IncidentComponent({ incident }: { incident: Incident }) {
  return (
    <IncidentBox
      style={{ flexDirection: incident.teamSide == 'home' || incident.scoringTeam == 'home' ? 'row' : 'row-reverse' }}
    >
      {incident.type == 'card' && (
        <>
          {incident.color == 'yellowred' && (
            <>
              <Box>
                <Image w={24} h={24} src={`/card_yellow_icon.svg`}></Image>
                <Image w={24} h={24} src={`/card_red_icon.svg`}></Image>
              </Box>
              <IncidentElement>
                {' '}
                {incident.player.name} ({incident.time}'){' '}
              </IncidentElement>
            </>
          )}
          {incident.color != 'yellowred' && (
            <>
              <Image w={24} h={24} src={`/card_${incident.color}_icon.svg`}></Image>
              <IncidentElement>
                {' '}
                {incident.player.name} ({incident.time}'){' '}
              </IncidentElement>
            </>
          )}
        </>
      )}
      {incident.type == 'goal' && (
        <>
          <Image w={24} h={24} src={`/goal_icon.svg`}></Image>
          <IncidentElement>
            {' '}
            {incident.homeScore} - {incident.awayScore}{' '}
          </IncidentElement>
          <IncidentElement>
            {incident.player.name} ({incident.time}'){' '}
          </IncidentElement>
        </>
      )}
      {incident.type == 'period' && <PeriodBox>{incident.text}</PeriodBox>}
    </IncidentBox>
  )
}
