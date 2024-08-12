import { useAppSelector } from "../../../hooks/redux-hooks";
import { DraftPlayer } from "../DraftPlayer/DraftPlayer";
import styles from "./DraftBoard.module.scss";

export function DraftBoard(): JSX.Element {
    const selectedFormation = useAppSelector((state) => state.draft.formation);
    const selectedPlayers = useAppSelector((state) => state.draft.players);
    const formationDetails = parseFormation(selectedFormation);
    
    // Example logic to calculate positionType
    const getPositionType = (index:number) => {
        if (index === 0) return 1;  // Goalkeeper
        if (index <= formationDetails.defenders) return 2;  // Defenders
        if (index <= formationDetails.defenders + formationDetails.midfielders) return 3;  // Midfielders
        return 4;  // Attackers
    };

    return (
        <div className={styles.DraftBoardWrapper}>
            {selectedPlayers.map((player, index) => (
                <DraftPlayer
                    key={index}
                    player={player}
                    arrayIndex={index}
                    positionType={getPositionType(index)}
                />
            ))}
        </div>
    );
}

function parseFormation(formation:string) {
    const parts = formation.split('-').map(Number);  // Convert "4-3-3" into [4, 3, 3]
    return {
        defenders: parts[0],
        midfielders: parts[1],
        attackers: parts[2]
    };
}
