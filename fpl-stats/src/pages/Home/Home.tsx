import styles from "./Home.module.scss";
import heroImage from "../../assets/images/hero-image.jpg";
import { useNavigate } from "react-router-dom";

export function Home():JSX.Element {
    const navigate = useNavigate();
    const handleNavigate = (path:string) => {
        navigate(path);
    };
    return (
        <div className={styles.HomeWrapper}>
            <div className={styles.HeaderSection}>
                <h1 className={styles.Header}>FPLStats</h1>
                <p className={styles.Description}>
                    The ultimate resource for Fantasy Premier League statistics and insights.
                </p>
                <div className={styles.ButtonContainer}>
                    <button className="btn btn-outline-dark btn-lg w-50" onClick={() => handleNavigate('/teams')}>Teams</button>
                    <button className="btn btn-outline-dark btn-lg w-50" onClick={() => handleNavigate('/fixtures')}>Fixtures</button>
                </div>
            </div>
            <div className={styles.HeroSection}>
                <img className={styles.HeroImage} src={heroImage}/>   
            </div>
        </div>
    )
}