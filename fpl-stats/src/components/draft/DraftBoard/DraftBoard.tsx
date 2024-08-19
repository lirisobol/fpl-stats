import { useAppSelector } from "../../../hooks/redux-hooks";
import { DraftPlayer } from "../DraftPlayer/DraftPlayer";
import styles from "./DraftBoard.module.scss";

export function DraftBoard(): JSX.Element {
    const selectedFormation = useAppSelector(state => state.draft.formation);
    const selectedPlayers = useAppSelector(state => state.draft.players);
    const formationDetails = parseFormation(selectedFormation);

    // Calculate the base index for each group
    const baseIndexes = {
        Goalkeepers: 0,
        Defenders: 1,  // Starts after the goalkeeper
        Midfielders: 1 + formationDetails.defenders, // Starts after all defenders
        Attackers: 1 + formationDetails.defenders + formationDetails.midfielders, // Starts after all midfielders
    };

    return (
        <div className={styles.DraftBoardWrapper}>
            <div className={styles.Goalkeepers}>
                {selectedPlayers.slice(baseIndexes.Goalkeepers, baseIndexes.Defenders).map((player, idx) => (
                    <DraftPlayer key={idx} player={player} arrayIndex={baseIndexes.Goalkeepers + idx} positionType={1} />
                ))}
            </div>
            <div className={styles.Defenders}>
                {selectedPlayers.slice(baseIndexes.Defenders, baseIndexes.Midfielders).map((player, idx) => (
                    <DraftPlayer key={idx} player={player} arrayIndex={baseIndexes.Defenders + idx} positionType={2} />
                ))}
            </div>
            <div className={styles.Midfielders}>
                {selectedPlayers.slice(baseIndexes.Midfielders, baseIndexes.Attackers).map((player, idx) => (
                    <DraftPlayer key={idx} player={player} arrayIndex={baseIndexes.Midfielders + idx} positionType={3} />
                ))}
            </div>
            <div className={styles.Attackers}>
                {selectedPlayers.slice(baseIndexes.Attackers, selectedPlayers.length).map((player, idx) => (
                    <DraftPlayer key={idx} player={player} arrayIndex={baseIndexes.Attackers + idx} positionType={4} />
                ))}
            </div>
        </div>
    );
}

function parseFormation(formation: string) {
    const parts = formation.split('-').map(Number);  // Convert "4-3-3" into [4, 3, 3]
    return {
        defenders: parts[0],
        midfielders: parts[1],
        attackers: parts[2]
    };
}
