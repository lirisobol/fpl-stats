import { useEffect, useRef, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import 'ag-grid-community/styles/ag-grid.css'; 
import 'ag-grid-community/styles/ag-theme-quartz.css';
import { PlayerData} from "../../../models/Player";
import { playersTableConfig } from "../../../utils/playersTableConfig";
import { ColDef } from "ag-grid-community";
import { generateCompareColDef, generateCompareRowDef } from "./TableDefs";

interface PlayerCompareTableProps {
    selectedPlayers: PlayerData[];
}
export function PlayerCompareTable({ selectedPlayers }: PlayerCompareTableProps): JSX.Element {
    const [columnDefs, setColumnDefs] = useState<ColDef[]>([]);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [rowData, setRowData] = useState<any[]>([]);
    const gridApiRef = useRef<AgGridReact>(null); 

    useEffect(() => {
        if (selectedPlayers.length <= 3) {
            if (selectedPlayers.length > 0) {
                const columns = generateCompareColDef(selectedPlayers);
                setColumnDefs(columns);
                const rows = generateCompareRowDef(selectedPlayers)
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
            throw new Error('Cannot compare more than 3 players at once')
        }

    }, [selectedPlayers]);

    return (
        <div className="ag-theme-quartz" style={{ height: 600, width: '100%', fontSize: "0.8rem" }}>
            <AgGridReact
                columnDefs={columnDefs}
                rowData={rowData}
                domLayout="autoHeight"
                autoSizeStrategy={playersTableConfig.autoSizeStrategy}
            />
        </div>
    );
}
