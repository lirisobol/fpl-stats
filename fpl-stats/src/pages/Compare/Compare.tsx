import { useEffect, useState } from 'react';
import styles from './Compare.module.scss';
import { Button, Alert } from 'react-bootstrap'; // Import Alert for messaging
import { PlayerSearchModal } from '../../components/modals/PlayerSearchModal/PlayerSearchModal';
import { useAppSelector } from '../../hooks/redux-hooks';
import { PlayerCompareTable } from '../../components/tables/PlayerCompareTable/PlayerCompareTable';
import { PlayerData } from '../../models/Player';

export function Compare(): JSX.Element {
    const [modalShow, setModalShow] = useState<boolean>(false);
    const selectedPlayersFromRedux = useAppSelector((state) => state.compare.selectedPlayers ?? []);
    const [selectedPlayers, setSelectedPlayers] = useState<PlayerData[]>(selectedPlayersFromRedux);
    
    // Determine if the "Add Players" button should be disabled
    const isButtonDisabled = selectedPlayers.length >= 3;

    useEffect(() => {
        setSelectedPlayers(selectedPlayersFromRedux);
    }, [selectedPlayersFromRedux]);

    const handleModalOpen = () => {
        if (!isButtonDisabled) {
            setModalShow(true);
        }
    };

    const handleModalClose = () => {
        setModalShow(false);
    };

    return (
        <div className={styles.CompareWrapper}>
            <Button
                className='w-25'
                variant={isButtonDisabled ? 'secondary' : 'outline-dark'}
                onClick={handleModalOpen}
                disabled={isButtonDisabled}
            >
                Add Players
            </Button>
            {isButtonDisabled && (
                <Alert variant="warning" className="mt-2">
                    You can only compare up to 3 players.
                </Alert>
            )}
            <div className={styles.ComparedPlayersWrapper}>
                <PlayerCompareTable selectedPlayers={selectedPlayers} />
            </div>
            <PlayerSearchModal 
                onHide={handleModalClose}
                show={modalShow}
            />
        </div>
    );
}
