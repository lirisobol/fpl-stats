import { AgGridReact } from "ag-grid-react";
import 'ag-grid-community/styles/ag-grid.css'; 
import 'ag-grid-community/styles/ag-theme-quartz.css';
import { PlayersButtonRenderer } from "../../buttons/PlayersButton/PlayersButtonRenderer";
import { useState } from "react";
import { useDynamicRowHeight } from "../../../hooks/useDynamicRowHeight";
import { Team } from "../../../models/Team";
import { ColDef } from "ag-grid-community";


interface LeagueTableProps {
    teams: Team[];
}

export function LeagueTable({teams}:LeagueTableProps): JSX.Element {
    
    const {getRowHeight, onGridReady, onFirstDataRendered, onGridSizeChanged} = useDynamicRowHeight();
    const [columnDefs, setColumnDefs] = useState<ColDef[]>([]);
    // initial column definitions
    const initialColumnDefs = [
        { headerName: 'ID', field: 'id' },
        { headerName: 'Name', field: 'name' },
        { 
            headerName: 'Players', 
            field: 'code', 
            cellRenderer: PlayersButtonRenderer,
        }
    ];
    setColumnDefs(initialColumnDefs);

    // default column properties (optional)
    const defaultColDef = {
        sortable: true,
        filter: true,
        resizable: true,
        flex: 1,
    };
    return (
        <div className="ag-theme-quartz" style={{height:600,width:'100%',fontSize:"1rem"}}>
        <AgGridReact 
            columnDefs={columnDefs}
            rowData={teams}
            defaultColDef={defaultColDef}
            frameworkComponents={{
                PlayersButtonRenderer: PlayersButtonRenderer
            }}
            domLayout="autoHeight"
            getRowHeight={getRowHeight}
            onGridReady={onGridReady}
            onFirstDataRendered={onFirstDataRendered}
            onGridSizeChanged={onGridSizeChanged}
        />
        </div>
    )
}