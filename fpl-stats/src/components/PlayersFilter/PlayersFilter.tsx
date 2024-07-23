import { PositionFilter } from "../filters/PositionFilter/PositionFilter";
import { SearchFilter } from "../filters/SearchFilter/SearchFilter";

interface PlayersFilterProps {
    onFilterChange: (selectedType: number) => void;
    onSearchChange: (query: string) => void;
}
export function PlayersFilter({ onFilterChange, onSearchChange }: PlayersFilterProps): JSX.Element {
    return (
        <div>
            <PositionFilter onFilterChange={onFilterChange}/>
            <SearchFilter onSearchChange={onSearchChange} />
        </div>
    );
}
