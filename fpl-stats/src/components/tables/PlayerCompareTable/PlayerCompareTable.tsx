import { AgGridReact } from "ag-grid-react";
import 'ag-grid-community/styles/ag-grid.css'; 
import 'ag-grid-community/styles/ag-theme-quartz.css';
import { useEffect, useState } from "react";
import { playersTableConfig } from "../../../utils/playerStatsTableConfig"; // Adjust this import based on your project structure

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
                { headerName: "Stat", field: "stat", pinned: 'left' },
                ...selectedPlayers.map((player, index) => ({
                    headerName: player.name,
                    field: `player${index}`,
                })),
            ];
            setColumnDefs(columns);

            const stats = ['bps']; // Add all relevant stats here
            const rows = stats.map(stat => {
                const row = { stat };
                selectedPlayers.forEach((player, index) => {
                    row[`player${index}`] = player[stat];
                    console.log(row[`player${index}`] = player[stat]);
                    
                });
                return row;
            });

            setRowData(rows);
        }
    }, [selectedPlayers]);

    return (
        <div className="ag-theme-quartz" style={{height: 600, width: '100%', fontSize: "0.8rem"}}>
            <AgGridReact 
                columnDefs={columnDefs}
                rowData={rowData}
                domLayout="autoHeight"
                autoSizeStrategy={playersTableConfig.autoSizeStrategy}
            />
        </div>
    );
}
