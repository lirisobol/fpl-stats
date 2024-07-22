import { useSelector } from 'react-redux';

export const useTeamCode = (teamShortName: string) => {
    const upperTeamShortName = teamShortName.toUpperCase();
    const teams = useSelector((state) => state.generalInformation.data.teams);
    if (!teams) {
        return undefined;
    }
    const team = teams.find(team => team.short_name === upperTeamShortName);
    return team ? team.code : undefined;
};
