import { AgGridReact } from "ag-grid-react";
import 'ag-grid-community/styles/ag-grid.css'; 
import 'ag-grid-community/styles/ag-theme-quartz.css';
import { useEffect, useState, useMemo, useCallback } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux-hooks";
import useFilteredColumns from "../../../hooks/useFilteredColumns";
import { useDynamicRowHeight } from "../../../hooks/useDynamicRowHeight";
import { PlayersFilter } from "../../filters/PlayersFilterParent/PlayersFilter";
import useFilteredPlayers from "../../../hooks/useFilteredPlayers";
import { playersTableConfig } from "../../../utils/playersTableConfig";
import { addPlayerToCompare } from "../../../store/slices/compareSlice";
import { ColDef, SelectionChangedEvent } from "ag-grid-community";

interface PlayersTableSelectableProps {
    onHide: () => void;
}
export function PlayersTableSelectable({ onHide }: PlayersTableSelectableProps): JSX.Element {
    const dispatch = useAppDispatch();
    const positionType = useAppSelector((state) => state.filters.positionType);
    const teamCode = useAppSelector((state) => state.filters.teamCode);
    const searchQuery = useAppSelector((state) => state.filters.searchQuery);

    const players = useFilteredPlayers(teamCode, positionType, searchQuery);
    const filteredColumns = useFilteredColumns();
    const elements_stats = useAppSelector((state) => state.generalInformation.data?.element_stats);

    const [columnDefs, setColumnDefs] = useState<ColDef[]>([]);

    
    
    useEffect(() => {
        if (elements_stats) {
            setColumnDefs(playersTableConfig.getColumnDefs(filteredColumns));
        }
    }, [elements_stats, filteredColumns]);
    
    const { getRowHeight, onGridReady, onFirstDataRendered, onGridSizeChanged } = useDynamicRowHeight();
    
    const memoizedPlayers = useMemo(() => players, [players]);
    const memoizedColumnDefs = useMemo(() => columnDefs, [columnDefs]);

    const onSelectionChanged = useCallback((event:SelectionChangedEvent) => {
        const selectedNode = event.api.getSelectedNodes()[0];
        const selectedData = selectedNode ? selectedNode.data : null;
        if (selectedData) {
            dispatch(addPlayerToCompare(selectedData));
            onHide(); // Close the modal
        }
    }, [dispatch, onHide]);
    
    return (
        <div>
            <PlayersFilter />
            <div className="ag-theme-quartz" style={{height: 600, width: '100%', fontSize: "0.8rem"}}>
                <AgGridReact 
                    columnDefs={memoizedColumnDefs}
                    rowData={memoizedPlayers}
                    defaultColDef={playersTableConfig.defaultColDef}
                    domLayout="autoHeight"
                    autoSizeStrategy={playersTableConfig.autoSizeStrategy}
                    getRowHeight={getRowHeight}
                    onGridReady={onGridReady}
                    onFirstDataRendered={onFirstDataRendered}
                    onGridSizeChanged={onGridSizeChanged}
                    rowSelection={"single"}
                    onSelectionChanged={onSelectionChanged}
                />
            </div>
        </div>
    );
}
