import { useEffect, useState } from 'react';
import styles from './Compare.module.scss';
import { Button } from 'react-bootstrap';
import { PlayerSearchModal } from '../../components/modals/PlayerSearchModal/PlayerSearchModal';
import { useAppSelector } from '../../hooks/redux-hooks';
import { PlayerCompareTable } from '../../components/tables/PlayerCompareTable/PlayerCompareTable';
import { PlayerData } from '../../models/Player';

export function Compare(): JSX.Element {
    const [modalShow, setModalShow] = useState<boolean>(false);
    const selectedPlayersFromRedux = useAppSelector((state) => state.compare.selectedPlayers ?? []);
    const [selectedPlayers, setSelectedPlayers] = useState<PlayerData[]>(selectedPlayersFromRedux);

    useEffect(() => {
        setSelectedPlayers(selectedPlayersFromRedux);
    }, [selectedPlayersFromRedux]);

    const handleModalOpen = () => {
        setModalShow(true);
    };

    const handleModalClose = () => {
        setModalShow(false);
    };
    return (
        <div className={styles.CompareWrapper}>
            <Button
                className='w-25'
                variant="outline-dark"
                onClick={handleModalOpen}
            >
                Add Players
            </Button>
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
