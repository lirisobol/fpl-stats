import { LeagueTable } from "../../components/tables/LeagueTable/LeagueTable";
import { useAppSelector } from "../../hooks/redux-hooks";
import styles from "./Teams.module.scss";


export function Teams(): JSX.Element {
    const teams = useAppSelector((state) => state.generalInformation.data?.teams);
    return (
        <div className={styles.TeamsPage}>
            <div className={styles.TableWrapper}>
                <LeagueTable  teams={teams}/>
            </div>
        </div>
    );
}
