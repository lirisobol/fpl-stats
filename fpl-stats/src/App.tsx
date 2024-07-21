import styles from "./App.module.scss";
import "./assets/styles/main.scss";
import { Navigation } from "./components/Navigation/Navigation";
import { useEffect, useState } from "react";
import { dataFetcher } from "./services/DataFetcher";
import { Routing } from "./routes/Routing";
import { GeneralInformation } from "./models/DataModel";

function App() {
    const [generalInformation, setGeneralInformation] = useState<GeneralInformation | null>(null);

    useEffect(() => {
        const fetchGeneralInformation = async () => {
            try {
                const data = await dataFetcher.getGeneralInformation();
                setGeneralInformation(data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchGeneralInformation();
    }, []);

    return (
        <div className={styles.App}>
            <Navigation />
            {generalInformation && <Routing generalInformation={generalInformation} />}
        </div>
    );
}

export default App;
