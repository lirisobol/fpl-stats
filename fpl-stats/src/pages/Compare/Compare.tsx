import { useEffect, useState } from 'react';
import styles from './Compare.module.scss';
import { Button } from 'react-bootstrap';
import { PlayerSearchModal } from '../../components/modals/PlayerSearchModal/PlayerSearchModal';
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks';
import { PlayerCompareTable } from '../../components/tables/PlayerCompareTable/PlayerCompareTable';
import { PlayerData } from '../../models/Player';
import { addPlayerToCompare } from '../../store/slices/compareSlice';

export function Compare(): JSX.Element {
    const dispatch = useAppDispatch();
    const [modalShow, setModalShow] = useState<boolean>(false);
    const selectedPlayersFromRedux = useAppSelector((state) => state.compare.selectedPlayers ?? []);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [selectedPlayers, setSelectedPlayers] = useState<PlayerData[]>(selectedPlayersFromRedux);

    useEffect(() => {
        setSelectedPlayers(selectedPlayersFromRedux);
        setErrorMessage(null)
    }, [selectedPlayersFromRedux]);

    const handleModalOpen = () => {
        setModalShow(true);
    };

    const handleModalClose = () => {
        setModalShow(false);
    };

    const handlePlayerSelection = (player:PlayerData) => {
        if(selectedPlayers.length < 3) {
            dispatch(addPlayerToCompare(player));
        }
        else {
            setErrorMessage("You can only compare up to 3 players")
        }
    }
    return (
        <div className={styles.CompareWrapper}>
            <Button
                className='w-25'
                variant="outline-dark"
                onClick={handleModalOpen}
            >
                Add Players
            </Button>
            {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
            <div className={styles.ComparedPlayersWrapper}>
                <PlayerCompareTable selectedPlayers={selectedPlayers} />
            </div>
            <PlayerSearchModal 
                onHide={handleModalClose}
                show={modalShow}
                onPlayerSelect={handlePlayerSelection}
            />
        </div>
    );
}
