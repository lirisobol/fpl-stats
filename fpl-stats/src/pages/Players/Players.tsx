import { useParams } from "react-router-dom";
import styles from "./Players.module.scss";
import { useAppSelector } from "../../hooks/redux-hooks";

export function Players():JSX.Element {
    const teamName = useParams().teamCode
    const teams = useAppSelector((state) => state.generalInformation.data?.teams)
    const selectedTeam = teams?.find(t => t.short_name === teamName?.toUpperCase());

    return (
        <div className={styles.Players}>
            {selectedTeam?.name}
        </div>
    )
}