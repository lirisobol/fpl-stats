import { useState } from "react";
import styles from "./Compare.module.scss";
import { Button } from "react-bootstrap";
import { PlayerSearchModal } from "../../components/modals/PlayerSearchModal/PlayerSearchModal";
export function Compare(): JSX.Element {
    const [modalShow, setModalShow] = useState(false);
    const [selectedPlayers, setSelectedPlayers] = useState([]);
    
    const handlePlayerSelect = (player) => {
        setSelectedPlayers(prevPlayers => [...prevPlayers, player]);
        console.log(selectedPlayers);        
        setModalShow(false);
    }
    
    const handleModalOpen = () => {
        setModalShow(true);
    }
    const handleModalClose = () => {
        setModalShow(false)
    }

    return (
        <div className={styles.CompareWrapper}>
            <Button
                variant="primary"
                onClick={handleModalOpen}
            >
                Add Players
            </Button>

            <PlayerSearchModal 
                show={modalShow}
                onHide={handleModalClose}
                onPlayerSelect={handlePlayerSelect}
            />
        </div>
    )
}