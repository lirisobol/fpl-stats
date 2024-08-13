import { faPlus} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { PlayerDraftModal } from "../../modals/PlayerDraftModal/PlayerDraftModal";
import styles from "./DraftPlayer.module.scss";
import { PlayerData } from "../../../models/general-info/Player";
import { useAppDispatch } from "../../../hooks/redux-hooks";
import { removeDraftPlayer } from "../../../store/slices/draftSlice";
// import LIV from "../../../assets/images/kits/14.png";

interface DraftPlayerProps {
    arrayIndex: number;
    player: PlayerData | null;
    positionType: number; 
}

export function DraftPlayer({ arrayIndex, player, positionType }: DraftPlayerProps): JSX.Element {
    const [modalShow, setModalShow] = useState(false);
    const dispatch = useAppDispatch();
    
    const handleModalOpen = () => {
        setModalShow(true);
    };

    const handleModalClose = () => {
        setModalShow(false);
    };

    const handleRemovePlayer = () => {
        dispatch(removeDraftPlayer(arrayIndex));
    };
    const jerseyImagePath = player ? `/assets/images/kits/${player.team_code}.png` : '/assets/images/kits/default.png';
    
    return (
        <div className={styles.DraftPlayerWrapper}>
            {player ? (
                <div className={styles.PlayerInfo}>
                    <button className={styles.PlayerButton} onClick={handleRemovePlayer}>
                        <img src={jerseyImagePath} alt={`${player.team_code} Jersey`}/>
                        <div className={styles.PlayerName}>{player.first_name} {player.second_name}</div>
                    </button>
                </div>
            ) : (
                <button className={styles.EmptyPlayer} onClick={handleModalOpen}>
                    <FontAwesomeIcon icon={faPlus} style={{ padding: 12 ,width:30, height:30}}/>
                </button>
            )}
            
            <PlayerDraftModal
                onHide={handleModalClose}
                show={modalShow}
                positionType={positionType}
                arrayIndex={arrayIndex}
            />
        </div>
    );
}
