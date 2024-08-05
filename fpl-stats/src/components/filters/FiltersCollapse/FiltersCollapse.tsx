import { useState } from "react";
import { Button, Collapse } from "react-bootstrap";
import { PlayersFilter } from "../PlayersFilterParent/PlayersFilter";
import styles from "./FiltersCollapse.module.scss";
export default function FiltersCollapse():JSX.Element {
    const [open, setOpen] = useState(false)
    return (
        <>
            <Button 
                onClick={() => setOpen(!open)}
                aria-controls="example-collapse-text"
                aria-expanded={open}
                >
                Filters
            </Button>
            <Collapse in={open} className={styles.FiltersCollapse}>
                <div className={styles.FiltersCollapseWrapper}>
                    <PlayersFilter />
                </div>
            </Collapse>
        </>
    )
}