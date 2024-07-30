import { useState } from "react";
import { LeagueTable } from "../../components/tables/LeagueTable/LeagueTable";
import { useAppSelector } from "../../hooks/redux-hooks";
import { LoadingSpinner } from "../../components/shared/LoadingSpinner/LoadingSpinner";
import { ErrorToast } from "../../components/shared/Toasts/ErrorToast/ErrorToast";

export function Teams(): JSX.Element {
    const [showToast, setShowToast] = useState(false);
    const status = useAppSelector((state) => state.generalInformation.status);
    const error = useAppSelector((state) => state.generalInformation.error);
    const teams = useAppSelector((state) => state.generalInformation.data?.teams || []);

    return (
        <div>
            {status === 'loading' && <LoadingSpinner />}
            {status === 'succeeded' && (
                <div>
                    <LeagueTable teams={teams} />
                </div>
            )}
            {status === 'failed' && (
                <ErrorToast 
                    show={showToast} 
                    onClose={() => setShowToast(false)} 
                    errorHeader="Error!"
                    errorMessage={error as string}
                    />
            )}
        </div>
    );
}
