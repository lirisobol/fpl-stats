import { LoadingSpinner } from "../../components/LoadingSpinner/LoadingSpinner";
import { LeagueTable } from "../../components/tables/LeagueTable/LeagueTable";
import { useAppSelector } from "../../hooks/redux-hooks";
import { RootState } from "../../store/store";

export function Teams(): JSX.Element {
    // Ensure teams is typed correctly, here as an array of Team objects
    const teams = useAppSelector((state: RootState) => state.generalInformation.data?.teams ?? []);
    const status = useAppSelector((state: RootState) => state.generalInformation.status);

    return (
        <div>
            {status === "loading" && <LoadingSpinner />}
            {status === "succeeded" && (
                <div>
                    <LeagueTable teams={teams} />
                </div>
            )}
            {status === "failed" && (
                <div>Error loading data</div>
            )}
        </div>
    );
}
