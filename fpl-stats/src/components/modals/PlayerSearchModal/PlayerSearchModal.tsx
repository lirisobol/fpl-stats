import { Button, Modal } from "react-bootstrap";
import { PlayersTableSelectable } from "../../tables/PlayersTableSelectable/PlayersTableSelectable";

interface PlayerSearchModalProps {
    show: boolean;
    onHide: () => void;
}

export function PlayerSearchModal({ show, onHide}: PlayerSearchModalProps) {
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
                <PlayersTableSelectable onHide={onHide}/>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
}
