import { ButtonGroup, ToggleButton } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../../../../hooks/redux-hooks";
import { setColumnGroup } from "../../../../store/slices/filterSlice";

export function ColumnsFilter(): JSX.Element {
    const dispatch = useAppDispatch();
    const columnGroup = useAppSelector((state) => state.filters.columnGroup);

    const handleColumnGroupChange = (group: string) => {
        dispatch(setColumnGroup(group));
    }

    return (
        <ButtonGroup className="mb-2">
            <ToggleButton
                key="all-columns"
                type="radio"
                variant="outline-dark"
                name="column-radio"
                value="all-columns"
                checked={columnGroup === "all"}
                onChange={() => handleColumnGroupChange("all")}
                id="all-columns-toggle"
            >
                All
            </ToggleButton>
            <ToggleButton
                key="key-stats"
                type="radio"
                variant="outline-dark"
                name="column-radio"
                value="key"
                checked={columnGroup === "key"}
                onChange={() => handleColumnGroupChange("key")}
                id="key-toggle"
            >
                Key
            </ToggleButton>
            <ToggleButton
                key="expected-stats"
                type="radio"
                variant="outline-dark"
                name="column-radio"
                value="expected"
                checked={columnGroup === "expected"}
                onChange={() => handleColumnGroupChange("expected")}
                id="expected-toggle"
            >
                Expected
            </ToggleButton>
            <ToggleButton
                key="performance-stats"
                type="radio"
                variant="outline-dark"
                name="column-radio"
                value="performance"
                checked={columnGroup === "performance"}
                onChange={() => handleColumnGroupChange("performance")}
                id="performance-toggle"
            >
                Performance
            </ToggleButton>
        </ButtonGroup>
    )
}