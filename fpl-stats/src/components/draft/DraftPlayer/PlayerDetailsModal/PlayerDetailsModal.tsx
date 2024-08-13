import { Button, Modal } from "react-bootstrap";
import { PlayerData } from "../../../../models/general-info/Player";
import { useAppDispatch } from "../../../../hooks/redux-hooks";
import { removeDraftPlayer } from "../../../../store/slices/draftSlice";
import { faTrash, faRepeat } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface PlayerDetailsModalProps {
    onHide: () => void;
    show: boolean;
    onChangePlayer: () => void;
    player: PlayerData | null;
    arrayIndex:number;
}
export function PlayerDetailsModal({onHide, show, onChangePlayer, player, arrayIndex}:PlayerDetailsModalProps):JSX.Element{
    const dispatch = useAppDispatch();
    const handleRemovePlayer = () => {
        onHide();
        dispatch(removeDraftPlayer(arrayIndex));
    };
    return (
        <Modal
            className="p-1"
            onHide={onHide}
            show={show}
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title>
                    {player?.first_name} {player?.second_name}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
            </Modal.Body>
            <Modal.Footer className="justify-content-center">
                <Button 
                    variant="danger" 
                    onClick={handleRemovePlayer}
                    > Remove Player
                    <FontAwesomeIcon icon={faTrash} style={{marginLeft:12}}/>
                    </Button>
                <Button 
                    variant="primary" 
                    onClick={onChangePlayer}
                    > Change Player
                    <FontAwesomeIcon icon={faRepeat} style={{marginLeft:12}}/>
                    </Button>
            </Modal.Footer>


        </Modal>
    )
}