import { useEffect, useRef, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import 'ag-grid-community/styles/ag-grid.css'; 
import 'ag-grid-community/styles/ag-theme-quartz.css';
import { PlayerData} from "../../../models/Player";
import { ColDef } from "ag-grid-community";
import { tableConfig } from "../TableConfig";
import { LoadingSpinner } from "../../shared/LoadingSpinner/LoadingSpinner";


/* 
    KEY BUG !
    ---------
    * text overflow on headers will make remove button invisible ->
    solution -> 
        * custom header should only be the remove button
        * player name should be displayed as the first column in the table instead of as the header
*/
interface PlayerCompareTableProps {
    selectedPlayers: PlayerData[];
}
export function PlayerCompareTable({ selectedPlayers }: PlayerCompareTableProps): JSX.Element {
    const [columnDefs, setColumnDefs] = useState<ColDef[]>([]);
    const [loading, setLoading] = useState(false);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [rowData, setRowData] = useState<any[]>([]);
    const gridApiRef = useRef<AgGridReact>(null); 

    useEffect(() => {
        if (selectedPlayers.length <= 3) {
            if (selectedPlayers.length > 0) {
                setLoading(true)
                const columns = tableConfig.generateCompareColDef(selectedPlayers);
                setColumnDefs(columns);
                const rows = tableConfig.generateCompareRowDef(selectedPlayers)
                setRowData(rows);
                // Force grid update
                if (gridApiRef.current) {
                    gridApiRef.current.api.refreshCells();
                }
                setLoading(false)
            } 
            else {
                setColumnDefs([]);
                setRowData([]);
            }
        }
        else {
            throw new Error('Cannot compare more than 3 players at once')
        }

    }, [selectedPlayers]);
    return (
        <div className="ag-theme-quartz" style={{ height: 600, width: '100%', fontSize: "0.8rem" }}>
            <AgGridReact
                loading={loading}
                loadingOverlayComponent={LoadingSpinner}
                autoSizeStrategy={tableConfig.autoSizeStrategy}
                columnDefs={columnDefs}
                rowData={rowData}
                domLayout="autoHeight"
            />
        </div>
    );
}
