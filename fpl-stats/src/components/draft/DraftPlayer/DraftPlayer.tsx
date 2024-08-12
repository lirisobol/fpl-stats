import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Button } from "react-bootstrap";
import { PlayerDraftModal } from "../../modals/PlayerDraftModal/PlayerDraftModal";
import styles from "./DraftPlayer.module.scss";
import { useAppSelector } from "../../../hooks/redux-hooks";

interface DraftPlayerProps {
    position: number
}
export function DraftPlayer({position}:DraftPlayerProps): JSX.Element {
    const [modalShow, setModalShow] = useState(false);
    const draftPlayers = useAppSelector((state) => state.draft.players)
    const handleModalOpen = () => {
        setModalShow(true);
    };

    const handleModalClose = () => {
        setModalShow(false);
        console.log(draftPlayers);
        
    };

    return (
        <div className={styles.DraftPlayerWrapper}>
            <Button className='btn' variant={'outline-dark'} onClick={handleModalOpen}>
                <FontAwesomeIcon icon={faPlus} style={{padding: 12}}/>
            </Button>
            
            <PlayerDraftModal
                onHide={handleModalClose}
                show={modalShow}
                position={position}
            />
        </div>
    );
}
