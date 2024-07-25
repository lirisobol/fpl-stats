import { Route, Routes } from "react-router-dom";
import { Home } from "../pages/Home/Home";
import { Teams } from "../pages/Teams/Teams";
import { Fixtures } from "../pages/Fixtures/Fixtures";
import { Players } from "../pages/Players/Players";
export function Routing():JSX.Element {
    return(
        <>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/teams" element={<Teams />} />
                <Route path="/fixtures" element={<Fixtures />} />
                <Route path="/players" element={<Players/>} />
            </Routes>
        </>
    )
}