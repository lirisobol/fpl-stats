import { ButtonGroup, ToggleButton } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../../../../hooks/redux-hooks";
import { setPositionType } from "../../../../store/slices/filterSlice";


interface PositionType {
    id:number,
    plural_name: string,
    plural_name_short:string
}
const PositionTypes: PositionType[] = [
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
]
export function PositionFilter(): JSX.Element {
    const dispatch = useAppDispatch();
    const positionType = useAppSelector((state) => state.filters.positionType);
    const handlePositionTypeChange = (positionType: number) => {
        dispatch(setPositionType(positionType));
    };
    return (
        <ButtonGroup className="mb-2">
        <ToggleButton
            key="all-positions"
            type="radio"
            variant="outline-dark"
            name="radio"
            value={0}
            checked={positionType === 0}
            onChange={() => handlePositionTypeChange(0)}
            id="all-positions-toggle"
        >
            All
        </ToggleButton>
        {PositionTypes.map((type) => (
            <ToggleButton
                key={type.id}
                type="radio"
                variant="outline-dark"
                name="radio"
                value={type.id}
                checked={positionType === type.id}
                onChange={() => handlePositionTypeChange(type.id)}
                id={`${type.plural_name}`}
            >
                {type.plural_name}
            </ToggleButton>
        ))}
    </ButtonGroup>
    )
}