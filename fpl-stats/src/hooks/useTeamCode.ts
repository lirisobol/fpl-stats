import { useAppSelector } from "./redux-hooks";

const useTeamCode = (teamShortName:string) => {
    teamShortName = teamShortName.toUpperCase();
    const teams = useAppSelector((state) => state.generalInformation.data?.teams);
    const team = teams.find(t => t.short_name === teamShortName);
    return team ? team.code : null;
}
export default useTeamCode;