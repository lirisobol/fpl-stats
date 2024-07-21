import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPeopleGroup } from "@fortawesome/free-solid-svg-icons";
import styles from "./PlayersButtonRenderer.module.scss";
import { useNavigate } from "react-router-dom";
interface PlayersButtonRendererProps {
    value:number
}
  
export const PlayersButtonRenderer: React.FC<PlayersButtonRendererProps> = ({value}:PlayersButtonRendererProps) => {
    const navigate = useNavigate();
    
    const handleNavigate = () => {
        navigate(`/teams/${value}`);
    };
    return (
        <button onClick={handleNavigate} className="btn btn-sm btn-outline-dark table-button">
            View Players
            <FontAwesomeIcon icon={faPeopleGroup} className={styles.buttonIcon}/>
        </button>
    );
};