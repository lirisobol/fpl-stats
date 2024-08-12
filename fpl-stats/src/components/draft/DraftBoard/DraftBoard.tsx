import { useAppSelector } from "../../../hooks/redux-hooks";
import { DraftPlayer } from "../DraftPlayer/DraftPlayer";
import styles from "./DraftBoard.module.scss";

export function DraftBoard(): JSX.Element {
    const selectedFormation = useAppSelector((state) => state.draft.formation);
    const formationDetails = parseFormation(selectedFormation);

    return (
        <div className={styles.DraftBoardWrapper}>
            <div className={styles.Goalkeeper}>
                <DraftPlayer position={1} />
            </div>
            <div className={styles.Defenders}>
                {Array.from({ length: formationDetails.defenders }, (_, i) => (
                    <DraftPlayer key={i} position={2} />
                ))}
            </div>
            <div className={styles.Midfielders}>
                {Array.from({ length: formationDetails.midfielders }, (_, i) => (
                    <DraftPlayer key={i} position={3} />
                ))}
            </div>
            <div className={styles.Attackers}>
                {Array.from({ length: formationDetails.attackers }, (_, i) => (
                    <DraftPlayer key={i} position={4} />
                ))}
            </div>
            <hr />
            <div className={styles.Substitutes}>
                {Array.from({ length: 4 }, (_, i) => ( // Assuming 4 substitutes
                    <DraftPlayer key={i} position={0} />
                ))}
            </div>
        </div>
    );
}

function parseFormation(formation:string) {
    const parts = formation.split('-').map(Number); // Convert "4-3-3" into [4, 3, 3]
    return {
        defenders: parts[0],
        midfielders: parts[1],
        attackers: parts[2]
    };
}