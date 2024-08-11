import { Route, Routes } from "react-router-dom";
import { Home } from "../pages/Home/Home";
import { Teams } from "../pages/Teams/Teams";
import { Players } from "../pages/Players/Players";
import { Compare } from "../pages/Compare/Compare";
export function Routing():JSX.Element {
    return(
        <>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/teams" element={<Teams />} />
                <Route path="/players" element={<Players/>} />
                <Route path="/compare" element={<Compare />}/>
            </Routes>
        </>
    )
}