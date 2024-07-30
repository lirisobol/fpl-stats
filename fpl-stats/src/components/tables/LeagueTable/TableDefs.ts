import { ColDef } from "ag-grid-community";
import { ViewPlayersButtons } from "./ViewPlayersButton/ViewPlayersButton";

export const generateLeagueColDef = () => {
    const columns: ColDef[] = [
        { headerName: 'ID', field: 'id' },
        { headerName: 'Name', field: 'name' },
        { 
            headerName: 'Players', 
            field: 'code', 
            cellRenderer: ViewPlayersButtons // Use the string name of the component
        }
    ];
    return columns
}
export const defaultColDef:ColDef = {
    sortable: true,
    filter: true,
    resizable: true,
    flex: 1,
}