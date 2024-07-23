import { AgGridReact } from "ag-grid-react";
import 'ag-grid-community/styles/ag-grid.css'; 
import 'ag-grid-community/styles/ag-theme-quartz.css';
import { useEffect, useState } from "react";
import { useAppSelector } from "../../../hooks/redux-hooks";
import { playersTableConfig } from "../../../utils/playerStatsTableConfig";

interface PlayersTableProps {
    players: []
}

export function PlayersTable({players}:PlayersTableProps): JSX.Element {
    console.log(players);
    
    const elements = useAppSelector((state) => state.generalInformation.data?.element_stats);
    // default column properties (optional)
    const defaultColDef = {
        sortable: true,
        resizable: true,
    };
    const initialColumnDefs = playersTableConfig.getColumnDefs();
    const [columnDefs, setColumnDefs] = useState(initialColumnDefs);
    useEffect(() => {
        if (elements) {
            setColumnDefs(playersTableConfig.getColumnDefs());
        }
    }, [elements]);
    const autoSizeStrategy = {
        type: 'fitGridWidth',
        defaultMinWidth: 100,
    };

    return (
        <div className="ag-theme-quartz" style={{height:600,width:'100%',fontSize:"1.2rem"}}>
        <AgGridReact 
            columnDefs={columnDefs}
            rowData={players}
            defaultColDef={defaultColDef}
            domLayout="autoHeight"
            rowHeight={80}
            autoSizeStrategy={autoSizeStrategy}
        />
        </div>
    )
}