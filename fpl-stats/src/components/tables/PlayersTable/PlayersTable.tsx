import { AgGridReact } from "ag-grid-react";
import 'ag-grid-community/styles/ag-grid.css'; 
import 'ag-grid-community/styles/ag-theme-quartz.css';
import { useEffect, useState } from "react";
import { useAppSelector } from "../../../hooks/redux-hooks";
import useFilteredColumns from "../../../hooks/useFilteredColumns";
import { playersTableConfig } from "../../../utils/playerStatsTableConfig";

interface PlayersTableProps {
    players: []
}
export function PlayersTable({players}:PlayersTableProps): JSX.Element {
    const filteredColumns = useFilteredColumns();
    const [columnDefs, setColumnDefs] = useState([]);

    const elements = useAppSelector((state) => state.generalInformation.data?.element_stats);

    useEffect(() => {
        if (elements) {
            setColumnDefs(playersTableConfig.getColumnDefs(filteredColumns));
        }
    }, [elements, filteredColumns]);
    return (
        <div className="ag-theme-quartz" style={{height:600,width:'100%',fontSize:"1.2rem"}}>
        <AgGridReact 
            columnDefs={columnDefs}
            rowData={players}
            defaultColDef={playersTableConfig.defaultColDef}
            domLayout="autoHeight"
            rowHeight={80}
            autoSizeStrategy={playersTableConfig.autoSizeStrategy}
        />
        </div>
    )
}