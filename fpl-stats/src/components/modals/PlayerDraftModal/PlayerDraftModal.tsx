import { Button, Modal } from "react-bootstrap";
import { PlayersDraftSelectable } from "../../tables/PlayersDraftSelectable/PlayersDraftSelectable";

interface PlayerDraftModalProps {
    show: boolean;
    onHide: () => void;
    positionType:number;
    arrayIndex:number;
}

export function PlayerDraftModal({ show, onHide, positionType, arrayIndex}: PlayerDraftModalProps) {
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
                <PlayersDraftSelectable onHide={onHide} positionType={positionType} arrayIndex={arrayIndex}/>
            </Modal.Body>
            <Modal.Footer className="justify-content-center">
                <Button onClick={onHide} variant="dark" style={{width:"15%"}}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
}
