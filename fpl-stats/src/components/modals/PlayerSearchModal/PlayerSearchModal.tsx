import { Button, Modal } from "react-bootstrap";
import { PlayersTableSelectable } from "../../tables/PlayersTableSelectable/PlayersTableSelectable";

interface PlayerSearchModalProps {
    show: boolean;
    onHide: () => void;
}

export function PlayerSearchModal({ show, onHide}: PlayerSearchModalProps) {
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
                    Select Player To Compare
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <PlayersTableSelectable onHide={onHide}/>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
}
