import { useAppDispatch, useAppSelector } from "../../../../hooks/redux-hooks";
import { setColumnGroup } from "../../../../store/slices/filterSlice";

export function ColumnsFilter(): JSX.Element {
    const dispatch = useAppDispatch();
    const columnGroup = useAppSelector((state) => state.filters.columnGroup);

    const handleColumnGroupChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedGroup = event.target.value;
        dispatch(setColumnGroup(selectedGroup));
    }

    return (
        <select value={columnGroup} onChange={handleColumnGroupChange} className="form-control">
            <option
                key='all'
                value='all'
                id='all-columns-toggle'
            >
                All
            </option>
            <option
                key='key'
                value='key'
                id='key-columns-toggle'
            >
                Key Stats
            </option>
            <option
                key='expected'
                value='expected'
                id='expected-columns-toggle'
            >
                Expected Stats
            </option>
            <option
                key='performance'
                value='performance'
                id='performance-columns-toggle'
            >
                Performance
            </option>
        </select>
    );
}
