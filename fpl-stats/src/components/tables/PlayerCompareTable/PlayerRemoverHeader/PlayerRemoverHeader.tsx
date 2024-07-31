import { Button } from 'react-bootstrap';
import { useAppDispatch } from '../../../../hooks/redux-hooks';
import { removePlayerFromCompare } from '../../../../store/slices/compareSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

interface PlayerRemoverHeaderProps {
    playerId: number;
    playerName: string;
}

export function PlayerRemoverHeader({playerId, playerName}:PlayerRemoverHeaderProps):JSX.Element {
    
    const dispatch = useAppDispatch();

    const handleRemove = () => {
        dispatch(removePlayerFromCompare(playerId));
    };

    return (
        <div className="custom-header">
            <Button
                className='btn-sm border border-0'
                onClick={handleRemove}
                variant='outline-dark'
                >
                {playerName}
                <FontAwesomeIcon icon={faTrash} style={{marginLeft:'12px'}}/>
            </Button>
            {/* <span>{playerName}</span> */}
            {/* <button onClick={handleRemove} className='btn btn-outline-dark btn-sm ms-3' style={{fontSize:'0.6rem'}}>X</button> */}
        </div>
    );
}
