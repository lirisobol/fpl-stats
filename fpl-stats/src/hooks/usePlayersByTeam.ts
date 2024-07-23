import { useAppSelector } from "./redux-hooks"

const usePlayersByTeam = (teamCode: number) => {
    if(!teamCode) return undefined;
    const players = useAppSelector((state) => state.generalInformation.data?.elements);
    if(!players) return undefined;
    return players.filter(player => player.team_code === teamCode);
}
export default usePlayersByTeam;