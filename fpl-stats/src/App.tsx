// App.tsx
import { useEffect } from "react";
import styles from "./App.module.scss";
import "./assets/styles/main.scss";
import { Navigation } from "./components/Navigation/Navigation";
import { useAppDispatch, useAppSelector } from "./hooks/redux-hooks";
import { fetchGeneralInformation } from "./store/slice";
import { Routing } from "./routes/Routing";

function App() {
    const dispatch = useAppDispatch();
    const status = useAppSelector(state => state.generalInformation.status);
    const error = useAppSelector(state => state.generalInformation.error);

    useEffect(() => {
        dispatch(fetchGeneralInformation())
    }, [dispatch]);

    if(status === 'loading') {
        return <div>Loading...</div>
    }
    if(status === 'error') {
        return <div>Error: {error}</div>
    }

    return (
        <div className={styles.App}>
            <Navigation />
            <Routing />
        </div>
    );
}

export default App;
