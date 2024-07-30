import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";

interface WarningAlertProps {
    size: string;
    message: string;
}

export function WarningAlert({ size, message }: WarningAlertProps): JSX.Element {
    return (
        <div className={`warning-alert warning-alert-${size}`}>
            <FontAwesomeIcon icon={faTriangleExclamation} />
            <p>{message}</p>
        </div>
    );
}
