import { useAppSelector } from "./redux-hooks"

const usePlayersByTeam = (teamCode: number) => {
    const players = useAppSelector((state) => state.generalInformation.data.elements);
    return players.filter(player => player.team_code === teamCode);
}
export default usePlayersByTeam;