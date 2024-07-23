import { ChangeEvent } from "react";

interface SearchFilterProps {
    onSearchChange: (query: string) => void;
}
export function SearchFilter({ onSearchChange }: SearchFilterProps): JSX.Element {
    const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
        const query = event.target.value;
        onSearchChange(query);
    };
    return (
        <input
            type="text"
            placeholder="Search players..."
            onChange={handleSearchChange}
            className="form-control mb-2 w-25 focus-ring focus-ring-dark"
        />
    );
}
