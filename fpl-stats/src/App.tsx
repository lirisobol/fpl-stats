import "./assets/styles/main.scss";
import styles from "./App.module.scss";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./hooks/redux-hooks";
import { Routing } from "./routes/Routing";
import { fetchGeneralInformation } from "./store/slices/dataSlice";
import { Navigation } from "./components/shared/Navigation/Navigation";
import { LoadingSpinner } from "./components/shared/LoadingSpinner/LoadingSpinner";

function App() {
    const dispatch = useAppDispatch();
    const { status, error } = useAppSelector(state => state.generalInformation);

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
