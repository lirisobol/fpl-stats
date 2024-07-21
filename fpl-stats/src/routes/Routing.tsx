import { Route, Routes } from "react-router-dom";
import { Home } from "../pages/Home/Home";
import { Teams } from "../pages/Teams/Teams";
import { Fixtures } from "../pages/Fixtures/Fixtures";
import { GeneralInformation } from "../models/DataModel";
import { Players } from "../pages/Players/Players";

interface RoutingProps {
    generalInformation: GeneralInformation
}
export function Routing({generalInformation}:RoutingProps):JSX.Element {
    return(
        <>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/teams" element={<Teams teams={generalInformation?.teams} />} />
                <Route path="/fixtures" element={<Fixtures />} />
                <Route path="/teams/:teamCode" element={<Players />} />
            </Routes>
        </>
    )
}