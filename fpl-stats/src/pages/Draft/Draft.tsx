import { DraftBoard } from "../../components/draft/DraftBoard/DraftBoard";
import { DraftControls } from "../../components/draft/DraftControls/DraftControls";
import styles from "./Draft.module.scss";

export default function Draft():JSX.Element {
    return (
        <div className={styles.DraftWrapper}>
            <DraftControls />
            <DraftBoard />
        </div>
    )
}