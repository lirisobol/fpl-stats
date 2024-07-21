import { Route, Routes } from "react-router-dom";
import styles from "./App.module.scss";
import "./assets/styles/main.scss";
import { Navigation } from "./components/Navigation/Navigation";
import { Home } from "./pages/Home/Home";
import { Teams } from "./pages/Teams/Teams";
import { Fixtures } from "./pages/Fixtures/Fixtures";
import { useEffect, useState } from "react";
import { dataFetcher } from "./services/DataFetcher";
import { GeneralInformation, TeamsModel } from "./models/DataModel";

function App() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [generalInformation, setGeneralInformation] = useState<GeneralInformation | null>(null);
  const [teamsData, setTeamsData] = useState<TeamsModel[]>([]);

  useEffect(() => {
    const fetchGeneralInformation = async () => {
      try {
        const data = await dataFetcher.getGeneralInformation();
        setGeneralInformation(data);
        setTeamsData(data.teams); // Set teamsData from fetched data
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchGeneralInformation();
  }, []);

  return (
    <div className={styles.App}>
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/teams"
            element={<Teams teams={teamsData} />}
          />
          <Route path="/fixtures" element={<Fixtures />} />
        </Routes>
    </div>
  );
}

export default App;
