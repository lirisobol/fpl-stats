import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Button } from "react-bootstrap";
import { PlayerDraftModal } from "../../modals/PlayerDraftModal/PlayerDraftModal";
import styles from "./DraftPlayer.module.scss";

interface DraftPlayerProps {
    position: number
}
export function DraftPlayer({position}:DraftPlayerProps): JSX.Element {
    const [modalShow, setModalShow] = useState(false);

    const handleModalOpen = () => {
        setModalShow(true);
    };

    const handleModalClose = () => {
        setModalShow(false);
    };

    return (
        <div className={styles.DraftPlayerWrapper}>
            {position}
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
