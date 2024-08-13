import { AgGridReact } from "ag-grid-react";
import { useEffect, useState } from "react";
import { ColDef } from "ag-grid-community";
import { tableConfig } from "../TableConfig";
import { PlayerData } from "../../../models/general-info/Player";

interface PlayerDetailsTableProps {
    player: PlayerData | null;
}

export function PlayerDetailsTable({ player }: PlayerDetailsTableProps): JSX.Element {
    const [columnDefs, setColumnDefs] = useState<ColDef[]>([]);
    const [rowData, setRowData] = useState<any[]>([]);
    console.log(player);
    
    useEffect(() => {
        if (player) {
            const columns = tableConfig.generatePlayerDetailsColumnsDef(player);
            const rows = tableConfig.generatePlayerDetailsRowsDef(player);
            setColumnDefs(columns);
            setRowData(rows);
        }
    }, [player]);

    return (
        <div className="ag-theme-quartz" style={{ height: 600, width: '100%', fontSize: "0.8rem" }}>
            <AgGridReact 
                autoSizeStrategy={tableConfig.autoSizeStrategy}
                domLayout="autoHeight"
                columnDefs={columnDefs}
                rowData={rowData}
            />
        </div>
    );
}
