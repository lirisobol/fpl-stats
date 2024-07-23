import { ButtonGroup, ToggleButton } from "react-bootstrap";

export function ColumnsFilter():JSX.Element {
    
    return (
        <ButtonGroup className="mb-2 w-25">
        <ToggleButton
            key="all"
            type="radio"
            variant="outline-dark"
            name="radio"
            value={0}
            id="all-toggle"
        >
            All
        </ToggleButton>
        <ToggleButton
            key="Key"
            type="radio"
            variant="outline-dark"
            name="radio"
            value={1}
            id="key-stats-toggle"
        >
            Key
        </ToggleButton>
        <ToggleButton
            key="Expected"
            type="radio"
            variant="outline-dark"
            name="radio"
            value={2}
            id="expected-stats-toggle"
        >
            Expected
        </ToggleButton>
        <ToggleButton
            key="Performance"
            type="radio"
            variant="outline-dark"
            name="radio"
            value={3}
            id="performance-stats-toggle"
        >
            Performance
        </ToggleButton>
    </ButtonGroup>
    )
}