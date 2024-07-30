import { Spinner } from "react-bootstrap"
import styles from "./LoadingSpinner.module.scss";
export function LoadingSpinner():JSX.Element {
    return (
        <div className={styles.LoadingSpinnerContainer}>
            <Spinner 
                animation="border" 
                variant="primary" 
                style={{
                    height:"5rem",
                    width:"5rem"
                }}
                />            
        </div>
    )
}