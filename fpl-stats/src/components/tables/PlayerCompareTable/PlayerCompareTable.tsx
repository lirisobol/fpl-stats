import { AgGridReact } from "ag-grid-react";
import 'ag-grid-community/styles/ag-grid.css'; 
import 'ag-grid-community/styles/ag-theme-quartz.css';
import { useEffect, useState } from "react";
import { playersTableConfig } from "../../../utils/playerStatsTableConfig"; // Adjust this import based on your project structure
import { playerStatsModel } from "../../../models/PlayerStatsModel";
import { getCellClassRules } from "../../../utils/compareCellRules";

interface PlayerCompareTableProps {
    selectedPlayers: any[];
}

export function PlayerCompareTable({ selectedPlayers }: PlayerCompareTableProps): JSX.Element {
    const [columnDefs, setColumnDefs] = useState([]);
    const [rowData, setRowData] = useState([]);

    useEffect(() => {
        console.log(selectedPlayers);

        if (selectedPlayers.length > 0) {
            const columns = [
                { headerName: "Stat", field: "stat", pinned: 'left', width: 110 },
                ...selectedPlayers.map((player, index) => ({
                    headerName: `${player.first_name} ${player.second_name}`,
                    field: `player${index}`,
                    flex: 1,
                    cellClassRules: getCellClassRules(selectedPlayers.length)
                })),
            ];
            setColumnDefs(columns);

            // Filter out the player_name field
            const rows = playerStatsModel
                .filter(stat => stat.name !== "player_name")
                .map(stat => {
                    const row = { stat: stat.label };
                    selectedPlayers.forEach((player, index) => {
                        const value = player[stat.name];
                        // Convert value to number if possible
                        row[`player${index}`] = isNaN(Number(value)) ? value : Number(value);
                    });
                    return row;
                });

            setRowData(rows);
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
