import { ColDef } from "ag-grid-community";
import { getCellClassRules } from "../../../utils/compareCellRules";
import { PlayerData, playerStatsModel } from "../../../models/Player";
import { PlayerRemoverHeader } from "./PlayerRemoverHeader/PlayerRemoverHeader";
interface RowData {
    stat: string;
    [key: string]: unknown; // This allows for dynamic keys and values
}
export const generateCompareColDef = (selectedPlayers:PlayerData[]) => {
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
    return columns
}
export const generateCompareRowDef = (selectedPlayers:PlayerData[]) => {
    return playerStatsModel
        .filter(stat => stat.name !== "player_name")
        .map(stat => {
            const row: RowData = { stat: stat.label };
            selectedPlayers.forEach((player, index) => {
                const value = player[stat.name];
                row[`player${index}`] = isNaN(Number(value)) ? value : Number(value);
            });
            return row;
        });
}