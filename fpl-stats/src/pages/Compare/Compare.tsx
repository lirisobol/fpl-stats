import { useEffect, useState } from 'react';
import styles from './Compare.module.scss';
import { Button} from 'react-bootstrap'; // Import Alert for messaging
import { PlayerSearchModal } from '../../components/modals/PlayerSearchModal/PlayerSearchModal';
import { useAppSelector } from '../../hooks/redux-hooks';
import { PlayerCompareTable } from '../../components/tables/PlayerCompareTable/PlayerCompareTable';
import { PlayerData } from '../../models/Player';
import { WarningAlert } from '../../components/shared/alerts/WarningAlert';
import { LoadingSpinner } from '../../components/shared/LoadingSpinner/LoadingSpinner';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

export function Compare(): JSX.Element {
    const status = useAppSelector((state) => state.generalInformation.status);
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
            {status === 'loading' && <LoadingSpinner />}
            <div className={styles.ButtonWrapper}>
                <Button
                    className='btn'
                    variant={isButtonDisabled ? 'secondary' : 'outline-dark'}
                    onClick={handleModalOpen}
                    disabled={isButtonDisabled}

                >
                    Add Players
                    <FontAwesomeIcon icon={faPlus} style={{marginLeft:'12px'}}/>
                </Button>

                {isButtonDisabled && (
                    <WarningAlert size="sm" message="Cannot Compare More Than 3 Players"/>
                )}
            </div>

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
