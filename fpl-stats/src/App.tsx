import "./assets/styles/main.scss";
import styles from "./App.module.scss";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./hooks/redux-hooks";
import { Navigation } from "./components/Navigation/Navigation";
import { Routing } from "./routes/Routing";
import { fetchGeneralInformation } from "./store/slices/dataSlice";
import { LoadingSpinner } from "./components/LoadingSpinner/LoadingSpinner";

function App() {
    const dispatch = useAppDispatch();
    const status = useAppSelector(state => state.generalInformation.status);
    const error = useAppSelector(state => state.generalInformation.error);

    useEffect(() => {
        dispatch(fetchGeneralInformation());
    }, [dispatch]);

    if (status === 'failed') {
        return <div>Error: {error}</div>;
    }

    return (
        <div className={styles.App}>
            {status === 'loading' && <LoadingSpinner />}
            <Navigation />
            <Routing />
        </div>
    );
}

export default App;
