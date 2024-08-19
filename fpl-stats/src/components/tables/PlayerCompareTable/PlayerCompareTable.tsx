import { useEffect, useRef, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import 'ag-grid-community/styles/ag-grid.css'; 
import 'ag-grid-community/styles/ag-theme-quartz.css';
import { ColDef } from "ag-grid-community";
import { tableConfig } from "../TableConfig";
import { NoRowsComponent } from "./NoRowsComponent/NoRowsComponent";
import { PlayerData } from "../../../models/general-info/Player";


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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [rowData, setRowData] = useState<any[]>([]);
    const gridApiRef = useRef<AgGridReact>(null); 

    useEffect(() => {
        if (selectedPlayers.length <= 2) {
            if (selectedPlayers.length > 0) {
                const columns = tableConfig.generateCompareColDef(selectedPlayers);
                setColumnDefs(columns);
                const rows = tableConfig.generateCompareRowDef(selectedPlayers)
                setRowData(rows);
                // Force grid update
                if (gridApiRef.current) {
                    gridApiRef.current.api.refreshCells();
                }
            } 
            else {
                setColumnDefs([]);
                setRowData([]);
            }
        }
        else {
            throw new Error('Cannot compare more than 2 players at once')
        }

    }, [selectedPlayers]);
    return (
        <div className="ag-theme-quartz-dark" style={{ height: "100%", width: '100%', fontSize: "0.8rem" }}>
            <AgGridReact
                columnDefs={columnDefs}
                rowData={rowData}
                noRowsOverlayComponent={NoRowsComponent}
            />
        </div>
    );
}
