import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPeopleGroup } from "@fortawesome/free-solid-svg-icons";
import styles from "./PlayersButtonRenderer.module.scss";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../../hooks/redux-hooks";
import { setTeam } from "../../../store/slices/filterSlice";
interface PlayersButtonRendererProps {
    value:number
}
export const PlayersButtonRenderer: React.FC<PlayersButtonRendererProps> = ({value}:PlayersButtonRendererProps) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const handleTeamClick = () => {
        dispatch(setTeam(value));
        navigate("/players");
    }
    
    return (
        <button onClick={handleTeamClick} className="btn btn-outline-dark btn-sm" >
            View Players
            <FontAwesomeIcon icon={faPeopleGroup} className={styles.buttonIcon}/>
        </button>
    );
};