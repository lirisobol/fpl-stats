import { DraftPlayer } from "../../components/draft/DraftPlayer/DraftPlayer";
import styles from "./Draft.module.scss";

export default function Draft():JSX.Element {
    return (
        <div className={styles.DraftWrapper}>
            <div className={styles.Goalkeeper}>
                Goalkeeper
                <DraftPlayer position={1}/>
            </div>
            <div className={styles.Defenders}>
                Defenders
                <DraftPlayer position={2}/>
                <DraftPlayer position={2}/>
                <DraftPlayer position={2}/>
                <DraftPlayer position={2}/>
            </div>
            <div className={styles.Midfielders}>
                Midfielders
                <DraftPlayer position={3}/>
                <DraftPlayer position={3}/>
                <DraftPlayer position={3}/>
            </div>
            <div className={styles.Attackers}>
                Attackers
                <DraftPlayer position={4}/>
                <DraftPlayer position={4}/>
                <DraftPlayer position={4}/>
            </div>
            <hr />
            <div className={styles.Substitutes}>
                Substitutes
                <DraftPlayer position={0}/>
                <DraftPlayer position={0}/>
                <DraftPlayer position={0}/>
                <DraftPlayer position={0}/>
            </div>
        </div>
    )
}