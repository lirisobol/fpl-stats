import { useAppDispatch } from '../../../../hooks/redux-hooks';
import { removePlayerFromCompare } from '../../../../store/slices/compareSlice';

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
            <span>{playerName}</span>
            <button onClick={handleRemove} className='btn btn-outline-dark btn-sm ms-3' style={{fontSize:'0.6rem'}}>X</button>
        </div>
    );
}
