import "./assets/styles/main.scss";
import styles from "./App.module.scss";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "./hooks/redux-hooks";
import { Routing } from "./routes/Routing";
import { fetchGeneralInformation } from "./store/slices/dataSlice";
import { Navigation } from "./components/shared/Navigation/Navigation";
import { LoadingSpinner } from "./components/shared/LoadingSpinner/LoadingSpinner";
import { ErrorToast } from "./components/shared/Toasts/ErrorToast/ErrorToast";

function App() {
    const dispatch = useAppDispatch();
    const { status, error } = useAppSelector(state => state.generalInformation);
    const [showToast, setShowToast] = useState(false);

    useEffect(() => {
        dispatch(fetchGeneralInformation());
    }, [dispatch]);

    useEffect(() => {
        if (status === 'failed') {
            setShowToast(true);
        }
    }, [status]);

    return (
        <div className={styles.App}>
            {status === 'loading' && <LoadingSpinner />}
            <ErrorToast 
                show={showToast} 
                onClose={() => setShowToast(false)} 
                errorHeader="Error !" 
                errorMessage={error as string} 
            />
            <Navigation />
            <Routing />
        </div>
    );
}

export default App;
