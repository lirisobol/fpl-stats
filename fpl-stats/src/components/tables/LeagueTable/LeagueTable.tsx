import { AgGridReact } from "ag-grid-react";
import { TeamsModel } from "../../../models/DataModel"
import 'ag-grid-community/styles/ag-grid.css'; 
import 'ag-grid-community/styles/ag-theme-quartz.css';
import { PlayersButtonRenderer } from "../../buttons/PlayersButton/PlayersButtonRenderer";


interface LeagueTableProps {
    teams: TeamsModel[];
}

export function LeagueTable({teams}:LeagueTableProps): JSX.Element {
    // default column properties (optional)
    const defaultColDef = {
        sortable: true,
        filter: true,
        resizable: true,
    };
    // column definitions
    const columns = [
        { headerName: 'ID', field: 'id',},
        { headerName: 'Name', field: 'name' },
        { headerName: 'Wins', field: 'wins' },
        { headerName: 'Draws', field: 'draws' },
        { headerName: 'Losses', field: 'losses' },
        { 
            headerName: 'Players', 
            field: 'players', 
            cellRenderer: PlayersButtonRenderer,
            autoHeight: true
        }
    ];
    return (
        <div className="ag-theme-quartz" style={{height:600,width:'100%',fontSize:"0.7rem"}}>
        <AgGridReact 
            columnDefs={columns}
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