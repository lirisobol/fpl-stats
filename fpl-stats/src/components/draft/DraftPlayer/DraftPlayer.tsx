import { faPlus, faUser, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Button } from "react-bootstrap";
import { PlayerDraftModal } from "../../modals/PlayerDraftModal/PlayerDraftModal";
import styles from "./DraftPlayer.module.scss";
import { PlayerData } from "../../../models/general-info/Player";
import { useAppDispatch } from "../../../hooks/redux-hooks";
import { removeDraftPlayer } from "../../../store/slices/draftSlice";

interface DraftPlayerProps {
    arrayIndex: number;
    player: PlayerData | null;
    positionType: number; // Make sure to pass and use this if needed for specific behavior
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

    return (
        <div className={styles.DraftPlayerWrapper}>
            {player ? (
                <div className={styles.PlayerInfo}>
                    <Button variant="success" onClick={handleModalOpen}>
                        {`${player.first_name} ${player.second_name}`} <FontAwesomeIcon icon={faUser} />
                    </Button>
                    <Button variant="danger" onClick={handleRemovePlayer}>
                        <FontAwesomeIcon icon={faTrash} />
                    </Button>
                </div>
            ) : (
                <Button variant={'outline-dark'} onClick={handleModalOpen}>
                    <FontAwesomeIcon icon={faPlus} style={{ padding: 12 }}/>
                </Button>
            )}
            
            <PlayerDraftModal
                onHide={handleModalClose}
                show={modalShow}
                positionType={positionType} // Make sure this prop is correctly used in the modal
                arrayIndex={arrayIndex}
            />
        </div>
    );
}
