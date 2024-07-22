import { AgGridReact } from "ag-grid-react";
import 'ag-grid-community/styles/ag-grid.css'; 
import 'ag-grid-community/styles/ag-theme-quartz.css';
import { useEffect, useState } from "react";
import { useAppSelector } from "../../../hooks/redux-hooks";
import { getColumnDefs } from "../../../models/PlayersTableHeadersModel";

export function PlayersTable(): JSX.Element {
    const elements = useAppSelector((state) => state.generalInformation.data?.element_stats);
    // default column properties (optional)
    const defaultColDef = {
        sortable: true,
        resizable: true,
        flex: 1
    };
    const initialColumnDefs = getColumnDefs();
    const [columnDefs, setColumnDefs] = useState(initialColumnDefs);
    useEffect(() => {
        if (elements) {
            setColumnDefs(getColumnDefs());
        }
    }, [elements]);

    return (
        <div className="ag-theme-quartz" style={{height:600,width:'100%',fontSize:"0.9rem"}}>
        <AgGridReact 
            columnDefs={columnDefs}
            rowData={'teams'}
            defaultColDef={defaultColDef}
            domLayout="autoHeight"
            rowHeight={50}
        />
        </div>
    )
}