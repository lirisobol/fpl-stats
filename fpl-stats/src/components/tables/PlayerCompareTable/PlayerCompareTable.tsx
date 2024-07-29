import { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import 'ag-grid-community/styles/ag-grid.css'; 
import 'ag-grid-community/styles/ag-theme-quartz.css';
import { playersTableConfig } from "../../../utils/playersTableConfig";
import { playerStatsModel } from "../../../models/Player";
import { getCellClassRules } from "../../../utils/compareCellRules";
import { PlayerRemoverHeader } from "./PlayerRemoverHeader/PlayerRemoverHeader";

interface PlayerCompareTableProps {
    selectedPlayers: any[];
}

export function PlayerCompareTable({ selectedPlayers }: PlayerCompareTableProps): JSX.Element {
    const [columnDefs, setColumnDefs] = useState([]);
    const [rowData, setRowData] = useState([]);
    const gridApiRef = useState<any>(null); // Ref to store the grid API

    useEffect(() => {
        console.log(selectedPlayers);

        if (selectedPlayers.length > 0) {
            const columns = [
                { headerName: "Stat", field: "stat", pinned: 'left', width: 110 },
                ...selectedPlayers.map((player, index) => ({
                    headerName: `${player.first_name} ${player.second_name}`,
                    field: `player${index}`,
                    flex: 1,
                    cellClassRules: getCellClassRules(selectedPlayers.length),
                    suppressHeaderFilterButton: true,
                    sortable:false,
                    headerComponent: PlayerRemoverHeader,
                    headerComponentParams: {
                        playerId: player.id,
                        playerName: `${player.first_name} ${player.second_name}`
                    }
                })),
            ];
            setColumnDefs(columns);

            const rows = playerStatsModel
                .filter(stat => stat.name !== "player_name")
                .map(stat => {
                    const row = { stat: stat.label };
                    selectedPlayers.forEach((player, index) => {
                        const value = player[stat.name];
                        row[`player${index}`] = isNaN(Number(value)) ? value : Number(value);
                    });
                    return row;
                });

            setRowData(rows);

            // Force grid update
            if (gridApiRef.current) {
                gridApiRef.current.api.setColumnDefs(columns);
                gridApiRef.current.api.setRowData(rows);
            }
        } else {
            // Clear columns and rows if no players are selected
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
                onGridReady={(params) => gridApiRef.current = params} // Store grid API
            />
        </div>
    );
}
