import { LeagueTable } from "../../components/tables/LeagueTable/LeagueTable";
import { useAppSelector } from "../../hooks/redux-hooks";
import { LoadingSpinner } from "../../components/shared/LoadingSpinner/LoadingSpinner";

export function Teams(): JSX.Element {
    const teams = useAppSelector((state) => state.generalInformation.data?.teams || []);
    const status = useAppSelector((state) => state.generalInformation.status);
    return (
        <div>
            {status === 'loading' && <LoadingSpinner />}
            {status === 'succeeded' && (
                <div>
                    <LeagueTable teams={teams} />
                </div>
            )}
            {status === 'failed' && (
                <div>Error loading data</div>
            )}
        </div>
    );
}