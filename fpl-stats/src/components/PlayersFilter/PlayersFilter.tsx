import { useState } from "react";
import { ButtonGroup, ToggleButton } from "react-bootstrap";

interface PlayersFilterProps {
    onFilterChange: (selectedType: number) => void;
}

interface ElementType {
    id: number;
    plural_name: string;
    plural_name_short: string;
}

const elementTypes: ElementType[] = [
    {
        id: 1,
        plural_name: "Goalkeepers",
        plural_name_short: "GKP",
    },
    {
        id: 2,
        plural_name: "Defenders",
        plural_name_short: "DEF",
    },
    {
        id: 3,
        plural_name: "Midfielders",
        plural_name_short: "MID",
    },
    {
        id: 4,
        plural_name: "Forwards",
        plural_name_short: "FWD",
    },
];
export function PlayersFilter({ onFilterChange }: PlayersFilterProps): JSX.Element {
    const [selectedType, setSelectedType] = useState<number>(0);

    const handleFilterChange = (typeId: number) => {
        setSelectedType(typeId);
        onFilterChange(typeId);
    };

    return (
        <ButtonGroup className="mb-2">
            <ToggleButton
                key="all"
                type="radio"
                variant="outline-dark"
                name="radio"
                value={0}
                checked={selectedType === 0}
                onChange={() => handleFilterChange(0)}
                id="all-toggle"
            >
                All
            </ToggleButton>
            {elementTypes.map((type) => (
                <ToggleButton
                    key={type.id}
                    type="radio"
                    variant="outline-dark"
                    name="radio"
                    value={type.id}
                    checked={selectedType === type.id}
                    onChange={() => handleFilterChange(type.id)}
                    id={`${type.plural_name}`}
                >
                    {type.plural_name}
                </ToggleButton>
            ))}
        </ButtonGroup>
    );
}
