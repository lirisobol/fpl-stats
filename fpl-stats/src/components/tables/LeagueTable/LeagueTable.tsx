import { AgGridReact } from "ag-grid-react";
import 'ag-grid-community/styles/ag-grid.css'; 
import 'ag-grid-community/styles/ag-theme-quartz.css';
import { useState, useEffect } from "react";
import { useDynamicRowHeight } from "../../../hooks/useDynamicRowHeight";
import { Team } from "../../../models/Team";
import { ColDef } from "ag-grid-community";
import { tableConfig } from "../TableConfig";

interface LeagueTableProps {
    teams: Team[];
}
export function LeagueTable({ teams }: LeagueTableProps): JSX.Element {
    const { getRowHeight, onGridReady, onFirstDataRendered, onGridSizeChanged } = useDynamicRowHeight();
    const [columnDefs, setColumnDefs] = useState<ColDef[]>([]);
    useEffect(() => {
        const initialColumnDefs = tableConfig.generateLeagueColDef();
        setColumnDefs(initialColumnDefs);
    }, []); 
    return (
        <div className="ag-theme-quartz" style={{ height: 600, width: '100%', fontSize: "1rem" }}>
            <AgGridReact 
                columnDefs={columnDefs}
                rowData={teams}
                defaultColDef={tableConfig.defaultColDef}
                domLayout="autoHeight"
                getRowHeight={getRowHeight}
                onGridReady={onGridReady}
                onFirstDataRendered={onFirstDataRendered}
                onGridSizeChanged={onGridSizeChanged}
            />
        </div>
    );
}
