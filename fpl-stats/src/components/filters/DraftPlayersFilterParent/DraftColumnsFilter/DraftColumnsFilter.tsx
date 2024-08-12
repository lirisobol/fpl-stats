import { useAppDispatch, useAppSelector } from "../../../../hooks/redux-hooks";
import { setDraftColumnGroup } from "../../../../store/slices/draftSlice";

export function DraftColumnsFilter(): JSX.Element {
    const dispatch = useAppDispatch();
    const columnGroup = useAppSelector((state) => state.draft.filters.columnGroup);
    console.log(columnGroup);
    

    const handleColumnGroupChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedGroup = event.target.value;
        dispatch(setDraftColumnGroup(selectedGroup));
    }

    return (
        <select value={columnGroup} onChange={handleColumnGroupChange} className="form-select">
            <option
                key='all'
                value='all'
                id='all-columns-toggle'
            >
                Stats
            </option>
            <option
                key='key'
                value='key'
                id='key-columns-toggle'
            >
                Key
            </option>
            <option
                key='expected'
                value='expected'
                id='expected-columns-toggle'
            >
                Expected
            </option>
            <option
                key='performance'
                value='performance'
                id='performance-columns-toggle'
            >
                Performance
            </option>
        </select>
    )
}