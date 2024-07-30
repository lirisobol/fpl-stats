import { useEffect, useState } from 'react';
import styles from './Compare.module.scss';
import { Button } from 'react-bootstrap';
import { PlayerSearchModal } from '../../components/modals/PlayerSearchModal/PlayerSearchModal';
import { useAppSelector } from '../../hooks/redux-hooks';
import { PlayerCompareTable } from '../../components/tables/PlayerCompareTable/PlayerCompareTable';
import { RootState } from '../../store/store';
import { PlayerData } from '../../models/Player';

export function Compare(): JSX.Element {
    const [modalShow, setModalShow] = useState<boolean>(false);
    const selectedPlayersFromRedux = useAppSelector((state: RootState) => state.compare.selectedPlayers ?? []);
    const [selectedPlayers, setSelectedPlayers] = useState<PlayerData[]>(selectedPlayersFromRedux);

    useEffect(() => {
        setSelectedPlayers(selectedPlayersFromRedux);
    }, [selectedPlayersFromRedux]);

    const handleModalOpen = () => {
        console.log('inside handleModalOpen before:',typeof modalShow);
        setModalShow(true);
        console.log('inside handleModalOpen after:',typeof modalShow);
        
    };

    const handleModalClose = () => {
        console.log('inside handleModalClose, before:',typeof modalShow);
        setModalShow(false);
        console.log('inside handleModalClose, after:',typeof modalShow);

    };
    console.log(typeof modalShow);
    
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
