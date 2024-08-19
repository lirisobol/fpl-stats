import { AgGridReact } from "ag-grid-react";
import 'ag-grid-community/styles/ag-grid.css'; 
import 'ag-grid-community/styles/ag-theme-quartz.css';
import { useState, useEffect } from "react";
import { ColDef } from "ag-grid-community";
import { Team } from "../../../models/general-info/Team";
import { LeagueTableConfig } from "./LeagueTableConfig";

interface LeagueTableProps {
    teams: Team[];
}
export function LeagueTable({ teams }: LeagueTableProps): JSX.Element {
    const [columnDefs, setColumnDefs] = useState<ColDef[]>([]);

    useEffect(() => {
        console.log(teams);
        const initialColumnDefs = LeagueTableConfig.generateLeagueColDef(teams);
        setColumnDefs(initialColumnDefs);
    }, []); 
    return (
        <div className="ag-theme-quartz-dark" style={{ height: "100%", width: '100%', fontSize: "1rem" }}>
            <AgGridReact 
                columnDefs={columnDefs}
                rowData={teams}
                domLayout="autoHeight"
            />
        </div>
    );
}
