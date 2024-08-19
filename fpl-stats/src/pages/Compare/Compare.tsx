import { useEffect, useState } from 'react';
import styles from './Compare.module.scss';
import { Button} from 'react-bootstrap'; // Import Alert for messaging
import { PlayerCompareModal } from '../../components/modals/PlayerCompareModal/PlayerCompareModal';
import { useAppSelector } from '../../hooks/redux-hooks';
import { PlayerCompareTable } from '../../components/tables/PlayerCompareTable/PlayerCompareTable';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { PlayerData } from '../../models/general-info/Player';

export function Compare(): JSX.Element {
    const [modalShow, setModalShow] = useState<boolean>(false);
    const selectedPlayersFromRedux = useAppSelector((state) => state.compare.selectedPlayers ?? []);
    const [selectedPlayers, setSelectedPlayers] = useState<PlayerData[]>(selectedPlayersFromRedux);
    
    // Determine if the "Add Players" button should be disabled
    const isButtonDisabled = selectedPlayers.length >= 2;

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
            <div className={styles.ButtonWrapper}>
                <Button
                    className='btn w-25'
                    variant={isButtonDisabled ? 'secondary' : 'outline-light'}
                    onClick={handleModalOpen}
                    disabled={isButtonDisabled}

                >
                    Add Players
                    <FontAwesomeIcon icon={faPlus} style={{marginLeft:'12px'}}/>
                </Button>

            </div>

            <div className={styles.ComparedPlayersWrapper}>
                <PlayerCompareTable selectedPlayers={selectedPlayers} />
            </div>

            
            <PlayerCompareModal 
                onHide={handleModalClose}
                show={modalShow}
            />
        </div>
    );
}
