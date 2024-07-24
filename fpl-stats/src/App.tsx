// App.tsx
import { useEffect } from "react";
import styles from "./App.module.scss";
import "./assets/styles/main.scss";
import { Navigation } from "./components/Navigation/Navigation";
import { useAppDispatch, useAppSelector } from "./hooks/redux-hooks";
import { Routing } from "./routes/Routing";
import { fetchGeneralInformation } from "./store/slices/dataSlice";
import { LoadingSpinner } from "./components/LoadingSpinner/LoadingSpinner";

function App() {
    const dispatch = useAppDispatch();
    const status = useAppSelector(state => state.generalInformation.status);
    const error = useAppSelector(state => state.generalInformation.error);

    useEffect(() => {
        dispatch(fetchGeneralInformation())
    }, [dispatch]);

    if(status === 'error') {
        return <div>Error: {error}</div>
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
