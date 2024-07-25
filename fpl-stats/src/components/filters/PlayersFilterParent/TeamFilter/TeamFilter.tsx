import { useAppDispatch, useAppSelector } from "../../../../hooks/redux-hooks"
import {setTeam} from "../../../../store/slices/filterSlice";

export function TeamFilter():JSX.Element {
    const dispatch = useAppDispatch();
    const teamCode = useAppSelector((state) => state.filters.teamCode);
    const teams = useAppSelector((state) => state.generalInformation.data?.teams);

    const handleTeamChange = (event:React.ChangeEvent<HTMLSelectElement>) => {
        const selectedTeamCode = parseInt(event.target.value, 10);
        dispatch(setTeam(selectedTeamCode));
    }
    return (
        <select value={teamCode} onChange={handleTeamChange} className="form-select">
            <option key='all-teams' value="0">All Teams</option>
            {teams && teams.map(team => (
                <option key={team.code} value={team.code}>
                    
                    {team.name}
                </option>
            ))}
        </select>
    )
}