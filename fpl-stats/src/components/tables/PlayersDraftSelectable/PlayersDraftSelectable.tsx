import 'ag-grid-community/styles/ag-theme-quartz.css';
import 'ag-grid-community/styles/ag-grid.css'; 
import { AgGridReact } from "ag-grid-react";
import { useEffect, useState, useMemo, useCallback } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux-hooks";
import { useDynamicRowHeight } from "../../../hooks/useDynamicRowHeight";
import { PlayersFilter } from "../../filters/PlayersFilterParent/PlayersFilter";
import { ColDef, SelectionChangedEvent } from "ag-grid-community";
import { tableConfig } from "../TableConfig";
import useFilteredPlayers from "../../../hooks/useFilteredPlayers";
import useFilteredColumns from "../../../hooks/useFilteredColumns";
import { LoadingSpinner } from '../../shared/LoadingSpinner/LoadingSpinner';
import {addDraftPlayer} from "../../../store/slices/draftSlice";

interface PlayersDraftSelectableProps {
    onHide: () => void;
    position:number
}
export function PlayersDraftSelectable({ onHide,position}: PlayersDraftSelectableProps): JSX.Element {
    const dispatch = useAppDispatch();
    const [loading, setLoading] = useState(false);
    const teamCode = useAppSelector((state) => state.filters.teamCode);
    const searchQuery = useAppSelector((state) => state.filters.searchQuery);

    const players = useFilteredPlayers(teamCode, position, searchQuery);
    const filteredColumns = useFilteredColumns();

    const [columnDefs, setColumnDefs] = useState<ColDef[]>([]);

    useEffect(() => {
        setLoading(true)
            setColumnDefs(tableConfig.generatePlayersColumnDefs(filteredColumns));
        setLoading(false)
    }, [filteredColumns]);
    
    const { getRowHeight, onGridReady, onFirstDataRendered, onGridSizeChanged } = useDynamicRowHeight();
    
    const memoizedPlayers = useMemo(() => players, [players]);
    const memoizedColumnDefs = useMemo(() => columnDefs, [columnDefs]);

    const onSelectionChanged = useCallback((event:SelectionChangedEvent) => {
        const selectedNode = event.api.getSelectedNodes()[0];
        const selectedData = selectedNode ? selectedNode.data : null;
        if (selectedData) {
            dispatch(addDraftPlayer(selectedData));
            onHide();
        }
    }, [dispatch, onHide]);
    
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
                    rowSelection={"single"}
                    domLayout='autoHeight'
                    getRowHeight={getRowHeight}
                    onGridReady={onGridReady}
                    onFirstDataRendered={onFirstDataRendered}
                    onGridSizeChanged={onGridSizeChanged}
                    onSelectionChanged={onSelectionChanged}
                />
            </div>
        </div>
    );
}
