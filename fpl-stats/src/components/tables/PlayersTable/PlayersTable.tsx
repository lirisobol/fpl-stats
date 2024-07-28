import { AgGridReact } from "ag-grid-react";
import 'ag-grid-community/styles/ag-grid.css'; 
import 'ag-grid-community/styles/ag-theme-quartz.css';
import { useEffect, useState } from "react";
import { useAppSelector } from "../../../hooks/redux-hooks";
import useFilteredColumns from "../../../hooks/useFilteredColumns";
import { playersTableConfig } from "../../../utils/playerStatsTableConfig";
import { useDynamicRowHeight } from "../../../hooks/useDynamicRowHeight";

interface PlayersTableProps {
    players: []
}
export function PlayersTable({players}:PlayersTableProps): JSX.Element {
    const filteredColumns = useFilteredColumns();
    const [columnDefs, setColumnDefs] = useState([]);
    const elements = useAppSelector((state) => state.generalInformation.data?.element_stats);

    const {getRowHeight, onGridReady, onFirstDataRendered, onGridSizeChanged} = useDynamicRowHeight();
    useEffect(() => {
        if (elements) {
            setColumnDefs(playersTableConfig.getColumnDefs(filteredColumns));
        }
    }, [elements, filteredColumns]);
    return (
        <div className="ag-theme-quartz" style={{height:600,width:'100%',fontSize:"1rem"}}>
        <AgGridReact 
            columnDefs={columnDefs}
            rowData={players}
            defaultColDef={playersTableConfig.defaultColDef}
            domLayout="autoHeight"
            autoSizeStrategy={playersTableConfig.autoSizeStrategy}
            getRowHeight={getRowHeight}
            onGridReady={onGridReady}
            onFirstDataRendered={onFirstDataRendered}
            onGridSizeChanged={onGridSizeChanged}
        />
        </div>
    )
}