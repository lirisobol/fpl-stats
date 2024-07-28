import { LoadingSpinner } from "../../components/LoadingSpinner/LoadingSpinner";
import { LeagueTable } from "../../components/tables/LeagueTable/LeagueTable";
import { useAppSelector } from "../../hooks/redux-hooks";


export function Teams(): JSX.Element {
    const teams = useAppSelector((state) => state.generalInformation.data?.teams);
    const status = useAppSelector((state => state.generalInformation.status));
    // const error = useAppSelector((state) => state.generalInformation.error);
    return (
        <div>
            {status === "loading" && <LoadingSpinner />}
            <div>
                <LeagueTable  teams={teams}/>
            </div>
        </div>
    );
}
