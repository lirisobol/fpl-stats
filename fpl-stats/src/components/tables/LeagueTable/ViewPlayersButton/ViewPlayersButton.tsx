import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPeopleGroup } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../../../hooks/redux-hooks";
import { setTeam } from "../../../../store/slices/filterSlice";
import styles from "./ViewPlayersButton.module.scss";
interface ViewPlayersButtonsProps {
    value:number
}
export const ViewPlayersButtons: React.FC<ViewPlayersButtonsProps> = ({value}:ViewPlayersButtonsProps) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const handleTeamClick = () => {
        dispatch(setTeam(value));
        navigate("/players");
    }
    
    return (
        <button onClick={handleTeamClick} className="btn btn-outline-dark btn-sm" >
            Players
            <FontAwesomeIcon icon={faPeopleGroup} className={styles.buttonIcon}/>
        </button>
    );
};