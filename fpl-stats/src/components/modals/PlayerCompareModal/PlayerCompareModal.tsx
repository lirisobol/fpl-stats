import { Button, Modal } from "react-bootstrap";
import { PlayersTableSelectable } from "../../tables/PlayersTableSelectable/PlayersTableSelectable";

interface PlayerCompareModalProps {
    show: boolean;
    onHide: () => void;
}

export function PlayerCompareModal({ show, onHide}: PlayerCompareModalProps) {
    return (
        <Modal
            className="p-1"
            onHide={onHide}
            show={show}
            aria-labelledby="contained-modal-title-vcenter"
            centered
            scrollable={true}
            fullscreen={true}
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Select Player
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <PlayersTableSelectable onHide={onHide}/>
            </Modal.Body>
            <Modal.Footer className="justify-content-center">
                <Button onClick={onHide} variant="light" style={{width:"15%"}}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
}
