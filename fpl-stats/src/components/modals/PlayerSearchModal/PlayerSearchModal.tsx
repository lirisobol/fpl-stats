import { Button, Modal } from "react-bootstrap";
import { PlayersTableSelectable } from "../../tables/PlayersTableSelectable/PlayersTableSelectable";
import { PlayerData } from "../../../models/Player";

interface PlayerSearchModalProps {
    show: boolean;
    onHide: () => void;
    onPlayerSelect: (player: PlayerData) => void; // Add this prop
}

export function PlayerSearchModal({ show, onHide, onPlayerSelect}: PlayerSearchModalProps) {
    return (
        <Modal
            onHide={onHide}
            show={show}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            scrollable={true}
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Select Player To Compare
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <PlayersTableSelectable onHide={onHide} onPlayerSelect={onPlayerSelect}/>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
}
