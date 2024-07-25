import { ChangeEvent } from "react";
import { useAppDispatch } from "../../../../hooks/redux-hooks";
import { setSearchQuery } from "../../../../store/slices/filterSlice";


export function SearchFilter(): JSX.Element {
    const dispatch = useAppDispatch();
    
    const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
        const query = event.target.value;
        dispatch(setSearchQuery(query));
    };
    return (
        <input
            type="text"
            placeholder="Search players..."
            onChange={handleSearchChange}
            className="form-control mb-2 focus-ring focus-ring-dark"
        />
    );
}
