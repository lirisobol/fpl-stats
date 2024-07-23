import { useSelector } from 'react-redux';

export const useTeamCode = (teamShortName: string | undefined) => {
    if (!teamShortName) {
        return undefined;
    }

    const upperTeamShortName = teamShortName.toUpperCase();
    const teams = useSelector((state: any) => state.generalInformation.data?.teams);

    if (!teams) {
        return undefined;
    }

    const team = teams.find((team: any) => team.short_name === upperTeamShortName);
    return team ? team.code : undefined;
};
