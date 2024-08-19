import { ChangeEvent } from "react";
import { useAppDispatch } from "../../../../hooks/redux-hooks";
import { setDraftSearchQuery } from "../../../../store/slices/draftSlice";


export function DraftSearchFilter(): JSX.Element {
    const dispatch = useAppDispatch();
    
    const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
        const query = event.target.value;
        dispatch(setDraftSearchQuery(query));
    };
    return (
        <input
            type="text"
            placeholder="Search players..."
            onChange={handleSearchChange}
            className="form-control focus-ring focus-ring-dark"
        />
    );
}
