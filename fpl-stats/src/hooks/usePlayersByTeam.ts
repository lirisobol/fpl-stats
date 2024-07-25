import { useAppSelector } from "./redux-hooks"

const usePlayersByTeam = (teamCode: number) => {
    if(!teamCode || teamCode === 0) {
        const players = useAppSelector((state) => state.generalInformation.data?.elements);
        return players;
    }
    const players = useAppSelector((state) => state.generalInformation.data?.elements);
    if(!players) return undefined;
    return players.filter(player => player.team_code === teamCode);
}
export default usePlayersByTeam;