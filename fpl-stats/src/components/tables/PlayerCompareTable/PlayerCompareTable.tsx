import { useEffect, useRef, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import 'ag-grid-community/styles/ag-grid.css'; 
import 'ag-grid-community/styles/ag-theme-quartz.css';
import { PlayerData, playerStatsModel } from "../../../models/Player";
import { getCellClassRules } from "../../../utils/compareCellRules";
import { PlayerRemoverHeader } from "./PlayerRemoverHeader/PlayerRemoverHeader";
import { playersTableConfig } from "../../../utils/playersTableConfig";
import { ColDef } from "ag-grid-community";

interface PlayerCompareTableProps {
    selectedPlayers: PlayerData[];
}
interface RowData {
    stat: string;
    [key: string]: unknown; // This allows for dynamic keys and values
}
export function PlayerCompareTable({ selectedPlayers }: PlayerCompareTableProps): JSX.Element {
    const [columnDefs, setColumnDefs] = useState<ColDef[]>([]);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [rowData, setRowData] = useState<any[]>([]);
    const gridApiRef = useRef<AgGridReact>(null); 

    useEffect(() => {
        console.log(selectedPlayers);

        if (selectedPlayers.length > 0) {
            const columns: ColDef[] = [
                { headerName: "Stat", field: "stat", pinned: 'left', width: 110 },
                ...selectedPlayers.map((player, index) => ({
                    headerName: `${player.first_name} ${player.second_name}`,
                    field: `player${index}`,
                    flex: 1,
                    cellClassRules: getCellClassRules(selectedPlayers.length),
                    suppressHeaderFilterButton: true,
                    sortable: false,
                    headerComponent: PlayerRemoverHeader,
                    headerComponentParams: {
                        playerId: player.id,
                        playerName: `${player.first_name} ${player.second_name}`
                    }
                } as ColDef)),
            ];
            setColumnDefs(columns);

            const rows = playerStatsModel
                .filter(stat => stat.name !== "player_name")
                .map(stat => {
                    const row: RowData = { stat: stat.label };
                    selectedPlayers.forEach((player, index) => {
                        const value = player[stat.name];
                        row[`player${index}`] = isNaN(Number(value)) ? value : Number(value);
                    });
                    return row;
                });

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
