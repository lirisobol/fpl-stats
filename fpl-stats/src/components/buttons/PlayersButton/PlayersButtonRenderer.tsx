import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPeopleGroup } from "@fortawesome/free-solid-svg-icons";
import styles from "./PlayersButtonRenderer.module.scss";
interface PlayersButtonRendererProps {
    value: unknown; // Adjust based on the data you want to pass
    data: unknown; // Row data
}
  
export const PlayersButtonRenderer: React.FC<PlayersButtonRendererProps> = ({ value, data }) => {
    const handleClick = () => {
        console.log('data',data);
        console.log('value',value);        
    };
  
    return (
        <button onClick={handleClick} className="btn btn-sm btn-outline-dark table-button">
            View Players
            <FontAwesomeIcon icon={faPeopleGroup} className={styles.buttonIcon}/>
        </button>
    );
};