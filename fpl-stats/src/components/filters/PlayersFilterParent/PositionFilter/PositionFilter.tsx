import { useAppDispatch, useAppSelector } from "../../../../hooks/redux-hooks";
import { setPositionType } from "../../../../store/slices/filterSlice";

export function PositionFilter(): JSX.Element {
    const dispatch = useAppDispatch();
    const positionType = useAppSelector((state) => state.filters.positionType);

    const handlePositionTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const positionType = Number(event.target.value);
        console.log(positionType);
        
        dispatch(setPositionType(positionType));
    };
    return (
        <select value={positionType} onChange={handlePositionTypeChange}>
            <option
                key='all-positions'
                value='0'
                id='all-positions'
            >
                All
            </option>
            <option
                key='goalkeepers'
                value='1'
                id='goalkeepers'
            >
                Goalkeepers
            </option>
            <option
                key='defenders'
                value='2'
                id='defenders'
            >
                Defenders
            </option>
            <option
                key='midfielders'
                value='3'
                id='midfielders'
            >
                Midfielders
            </option>
            <option
                key='attackers'
                value='4'
                id='attackers'
            >
                Attackers
            </option>
        </select>
    )
}