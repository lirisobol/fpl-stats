import { LeagueTable } from "../../components/tables/LeagueTable/LeagueTable";
import { TeamsModel } from "../../models/DataModel";
import styles from "./Teams.module.scss";

interface TeamsProps {
    teams: TeamsModel[];
}

export function Teams({ teams }: TeamsProps): JSX.Element {
    return (
        <div className={styles.TeamsPage}>
            <div className={styles.TableWrapper}>
                <LeagueTable  teams={teams}/>
            </div>
        </div>
    );
}
