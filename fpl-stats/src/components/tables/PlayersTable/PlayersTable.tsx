import 'ag-grid-community/styles/ag-grid.css'; 
import 'ag-grid-community/styles/ag-theme-quartz.css';
import { AgGridReact } from "ag-grid-react";
import { ColDef } from "ag-grid-community";
import { useEffect, useState, useMemo } from "react";
import { useAppSelector } from "../../../hooks/redux-hooks";
import { PlayersFilter } from "../../filters/PlayersFilterParent/PlayersFilter";
import useFilteredPlayers from "../../../hooks/useFilteredPlayers";
import useFilteredColumns from "../../../hooks/useFilteredColumns";
import { PlayersTableConfig } from './PlayersTableConfig';
// import FiltersCollapse from '../../filters/FiltersCollapse/FiltersCollapse';

export function PlayersTable(): JSX.Element {
    const [columnDefs, setColumnDefs] = useState<ColDef[]>([]);

    const positionType = useAppSelector((state) => state.filters.positionType);
    const teamCode = useAppSelector((state) => state.filters.teamCode);
    const searchQuery = useAppSelector((state) => state.filters.searchQuery);

    const players = useFilteredPlayers(teamCode, positionType, searchQuery);
    const filteredColumns = useFilteredColumns();
    const elements_stats = useAppSelector((state) => state.generalInformation.data?.element_stats);

    useEffect(() => {
        if (elements_stats) {
            const columns = PlayersTableConfig.generatePlayersColumnDefs(filteredColumns)
            setColumnDefs(columns);
        }
    }, [elements_stats, filteredColumns]);
    
    
    const memoizedPlayers = useMemo(() => players, [players]);
    const memoizedColumnDefs = useMemo(() => columnDefs, [columnDefs]);

    return (
        <>
            {/* <FiltersCollapse /> */}
            <PlayersFilter />
            <div className="ag-theme-quartz-dark" style={{height:"100%",width: '100%', fontSize: "0.8rem"}}>
                
                <AgGridReact 
                    columnDefs={memoizedColumnDefs}
                    rowData={memoizedPlayers}
                />
            </div>
        </>
    );
}
