import 'ag-grid-community/styles/ag-grid.css'; 
import 'ag-grid-community/styles/ag-theme-quartz.css';
import { AgGridReact } from "ag-grid-react";
import { ColDef } from "ag-grid-community";
import { useEffect, useState, useMemo } from "react";
import { useAppSelector } from "../../../hooks/redux-hooks";
import { useDynamicRowHeight } from "../../../hooks/useDynamicRowHeight";
import { PlayersFilter } from "../../filters/PlayersFilterParent/PlayersFilter";
import useFilteredPlayers from "../../../hooks/useFilteredPlayers";
import useFilteredColumns from "../../../hooks/useFilteredColumns";
import { tableConfig } from '../TableConfig';
import { LoadingSpinner } from '../../shared/LoadingSpinner/LoadingSpinner';

export function PlayersTable(): JSX.Element {
    const [loading, setLoading] = useState(false);
    const [columnDefs, setColumnDefs] = useState<ColDef[]>([]);

    const positionType = useAppSelector((state) => state.filters.positionType);
    const teamCode = useAppSelector((state) => state.filters.teamCode);
    const searchQuery = useAppSelector((state) => state.filters.searchQuery);

    const players = useFilteredPlayers(teamCode, positionType, searchQuery);
    const filteredColumns = useFilteredColumns();
    const elements_stats = useAppSelector((state) => state.generalInformation.data?.element_stats);

    useEffect(() => {
        if (elements_stats) {
            setLoading(true)
            const columns = tableConfig.generatePlayersColumnDefs(filteredColumns)
            setColumnDefs(columns);
            setLoading(false)
        }
    }, [elements_stats, filteredColumns]);
    
    const { getRowHeight, onGridReady, onFirstDataRendered, onGridSizeChanged } = useDynamicRowHeight();
    
    const memoizedPlayers = useMemo(() => players, [players]);
    const memoizedColumnDefs = useMemo(() => columnDefs, [columnDefs]);

    return (
        <div>
            <PlayersFilter />
            <div className="ag-theme-quartz" style={{height: 600, width: '100%', fontSize: "0.8rem"}}>
                
                <AgGridReact 
                    loading={loading}
                    loadingOverlayComponent={LoadingSpinner}
                    columnDefs={memoizedColumnDefs}
                    rowData={memoizedPlayers}
                    defaultColDef={tableConfig.defaultColDef}
                    autoSizeStrategy={tableConfig.autoSizeStrategy}
                    domLayout="autoHeight"
                    getRowHeight={getRowHeight}
                    onGridReady={onGridReady}
                    onFirstDataRendered={onFirstDataRendered}
                    onGridSizeChanged={onGridSizeChanged}
                />
            </div>
        </div>
    );
}
