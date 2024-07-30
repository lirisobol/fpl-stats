import { Toast, ToastBody, ToastContainer, ToastHeader } from "react-bootstrap";

interface ErrorToastProps {
    show: boolean;
    onClose: () => void;
    errorHeader: string;
    errorMessage: string;
}

export function ErrorToast({ show, onClose,errorHeader,errorMessage}: ErrorToastProps): JSX.Element {
    return (
        <ToastContainer position="top-center" className="p-4">
            <Toast onClose={onClose} show={show} delay={3000} autohide bg="danger">
                <ToastHeader>{errorHeader}</ToastHeader>
                <ToastBody>{errorMessage}</ToastBody>
            </Toast>
        </ToastContainer>
    );
}
