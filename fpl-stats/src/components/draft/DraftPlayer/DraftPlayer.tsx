import { faPlus} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { PlayerDraftModal } from "../../modals/PlayerDraftModal/PlayerDraftModal";
import styles from "./DraftPlayer.module.scss";
import { PlayerData } from "../../../models/general-info/Player";
import { PlayerDetailsModal } from "./PlayerDetailsModal/PlayerDetailsModal";
// import LIV from "../../../assets/images/kits/14.png";

interface DraftPlayerProps {
    arrayIndex: number;
    player: PlayerData | null;
    positionType: number; 
}

export function DraftPlayer({ arrayIndex, player, positionType }: DraftPlayerProps): JSX.Element {
    // Player details Modal
    const [playerDetailsModal, setPlayerDetailsModal] = useState(false);
    const handlePlayerDetailsModalOpen = () => {
        setPlayerDetailsModal(true);
    }
    const handlePlayerDetailsModalClose = () => {
        setPlayerDetailsModal(false);
    }
    // Player Selection Modal
    const [playerDraftModalShow, setPlayerDraftModalShow] = useState(false);
    const handlePlayerDraftModalOpen = () => {
        setPlayerDraftModalShow(true);
    };
    const handlePlayerDraftModalClose = () => {
        setPlayerDraftModalShow(false);
        setPlayerDetailsModal(false);
    };

    const jerseyImagePath = player ? `/assets/images/kits/${player.team_code}.png` : '/assets/images/kits/default.png';
    const formattedPrice = player ? (player.now_cost / 10).toFixed(1) : 'N/A';  // Format price to show as decimal

    return (
        <div className={styles.DraftPlayerWrapper}>
            {player ? (
                <button className={styles.PlayerButton} onClick={handlePlayerDetailsModalOpen}>
                    <img src={jerseyImagePath} alt={`${player.team_code} Jersey`}/>
                    <div className={styles.PlayerDetails}>
                        <div className={styles.PlayerName}>{player.first_name} {player.second_name}</div>
                        <div className={styles.PlayerStats}>
                            <div className={styles.PlayerPrice}>
                                <span>Price</span>
                                <span>
                                    {formattedPrice}
                                </span>
                            </div>
                            <div className={styles.PlayerSelected}>
                                <span>Selected</span>
                                <span>
                                    {player.selected_by_percent}
                                </span>
                            </div>
                        </div>
                    
                    </div>
                    
                </button>
            ) : (
                <button className={styles.EmptyPlayer} onClick={handlePlayerDraftModalOpen}>
                    <FontAwesomeIcon icon={faPlus} style={{ padding: 12 ,width:30, height:30}}/>
                </button>
            )}
            
        <PlayerDraftModal
            onHide={handlePlayerDraftModalClose}
            show={playerDraftModalShow}
            positionType={positionType}
            arrayIndex={arrayIndex}
        />
        <PlayerDetailsModal
            onHide={handlePlayerDetailsModalClose}
            show={playerDetailsModal}
            onChangePlayer={handlePlayerDraftModalOpen} 
            player={player}
            arrayIndex={arrayIndex}
        />
        </div>
        
    );
}
