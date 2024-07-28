import { AgGridReact } from "ag-grid-react";
import { TeamsModel } from "../../../models/DataModel"
import 'ag-grid-community/styles/ag-grid.css'; 
import 'ag-grid-community/styles/ag-theme-quartz.css';
import { PlayersButtonRenderer } from "../../buttons/PlayersButton/PlayersButtonRenderer";
import { useState } from "react";
import { useDynamicRowHeight } from "../../../hooks/useDynamicRowHeight";


interface LeagueTableProps {
    teams: TeamsModel[];
}

export function LeagueTable({teams}:LeagueTableProps): JSX.Element {
    console.log(teams);
    
    const {getRowHeight, onGridReady, onFirstDataRendered, onGridSizeChanged} = useDynamicRowHeight();
    // default column properties (optional)
    const defaultColDef = {
        sortable: true,
        filter: true,
        resizable: true,
        flex: 1,
    };
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
    const [columnDefs, setColumnDefs] = useState(initialColumnDefs);

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