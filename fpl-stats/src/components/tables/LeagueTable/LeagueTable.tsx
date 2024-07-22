import { AgGridReact } from "ag-grid-react";
import { TeamsModel } from "../../../models/DataModel"
import 'ag-grid-community/styles/ag-grid.css'; 
import 'ag-grid-community/styles/ag-theme-quartz.css';
import { PlayersButtonRenderer } from "../../buttons/PlayersButton/PlayersButtonRenderer";
import { useState } from "react";


interface LeagueTableProps {
    teams: TeamsModel[];
}

export function LeagueTable({teams}:LeagueTableProps): JSX.Element {
    console.log(teams);
    
    // default column properties (optional)
    const defaultColDef = {
        sortable: true,
        filter: true,
        resizable: true,
        flex: 1
    };
    // initial column definitions
    const initialColumnDefs = [
        { headerName: 'ID', field: 'id' },
        { headerName: 'Name', field: 'name' },
        { headerName: 'Wins', field: 'wins' },
        { headerName: 'Draws', field: 'draws' },
        { headerName: 'Losses', field: 'losses' },
        { 
            headerName: 'Players', 
            field: 'short_name', 
            cellRenderer: PlayersButtonRenderer,
            autoHeight: true
        }
    ];
    const [columnDefs, setColumnDefs] = useState(initialColumnDefs);

    return (
        <div className="ag-theme-quartz" style={{height:600,width:'100%',fontSize:"1.2rem"}}>
        <AgGridReact 
            columnDefs={columnDefs}
            rowData={teams}
            defaultColDef={defaultColDef}
            frameworkComponents={{
                PlayersButtonRenderer: PlayersButtonRenderer
            }}
            domLayout="autoHeight"
            rowHeight={50}
        />
        </div>
    )
}