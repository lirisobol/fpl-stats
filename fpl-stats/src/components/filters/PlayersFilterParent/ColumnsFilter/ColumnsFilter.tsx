import { ButtonGroup, ToggleButton } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../../../../hooks/redux-hooks";
import { setColumnGroup } from "../../../../store/slices/filterSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faKey,faPowerOff,faLightbulb,faGears } from "@fortawesome/free-solid-svg-icons";

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
                className="p-2"
            >
                <FontAwesomeIcon icon={faPowerOff} className="me-2"/>
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
                className="p-2"
            >
                <FontAwesomeIcon icon={faKey} className="me-2"/>
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
                className="p-2"
            >
                <FontAwesomeIcon icon={faLightbulb} className="me-2" />
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
                className="p-2"
            >
                <FontAwesomeIcon icon={faGears} className="me-3"/>
                Performance
            </ToggleButton>
        </ButtonGroup>
    )
}