import { LoadingSpinner } from "../../components/LoadingSpinner/LoadingSpinner";
import { LeagueTable } from "../../components/tables/LeagueTable/LeagueTable";
import { useAppSelector } from "../../hooks/redux-hooks";
import styles from "./Teams.module.scss";


export function Teams(): JSX.Element {
    const teams = useAppSelector((state) => state.generalInformation.data?.teams);
    const status = useAppSelector((state => state.generalInformation.status));
    // const error = useAppSelector((state) => state.generalInformation.error);
    return (
        <div className={styles.TeamsPage}>
            {status === "loading" && <LoadingSpinner />}
            <div className={styles.TableWrapper}>
                <LeagueTable  teams={teams}/>
            </div>
        </div>
    );
}
