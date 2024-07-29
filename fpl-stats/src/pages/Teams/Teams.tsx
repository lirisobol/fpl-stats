import { LoadingSpinner } from "../../components/LoadingSpinner/LoadingSpinner";
import { LeagueTable } from "../../components/tables/LeagueTable/LeagueTable";
import { useAppSelector } from "../../hooks/redux-hooks";
import { RootState } from "../../store/store";

export function Teams(): JSX.Element {
    // Use a default empty array if `teams` is null
    const teams = useAppSelector((state: RootState) => state.generalInformation.data?.teams ?? []);
    const status = useAppSelector((state: RootState) => state.generalInformation.status);
    // const error = useAppSelector((state: RootState) => state.generalInformation.error);

    return (
        <div>
            {status === "loading" && <LoadingSpinner />}
            <div>
                <LeagueTable teams={teams} />
            </div>
        </div>
    );
}
