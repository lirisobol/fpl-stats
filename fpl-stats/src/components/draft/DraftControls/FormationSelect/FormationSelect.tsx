import { useEffect } from "react";
import { useAppDispatch} from "../../../../hooks/redux-hooks";
import { setDraftFormation } from "../../../../store/slices/draftSlice";
export function FormationSelect(): JSX.Element {
    const formations = generateFormations();
    const dispatch = useAppDispatch();

    useEffect(() => {
        // Set the default formation on initial render
        dispatch(setDraftFormation('4-3-3'));
    }, [dispatch]);

    const handleFormationChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        dispatch(setDraftFormation(event.target.value));
    };
    
    return (
        <div>
            <select onChange={handleFormationChange} className="form-select">
                {formations.map((formation, index) => (
                    <option key={index} value={formation}>
                        {formation}
                    </option>
                ))}
            </select>
        </div>
    );
}
// Helper function to generate formations
function generateFormations() {
    const formations = ['4-3-3']; // Start with the default formation
    for (let defenders = 3; defenders <= 5; defenders++) {
        for (let attackers = 1; attackers <= 3; attackers++) {
            const midfielders = 10 - defenders - attackers;
            if (midfielders >= 0) {
                const formation = `${defenders}-${midfielders}-${attackers}`;
                if (formation !== "4-3-3") { // Avoid duplicating the default formation
                    formations.push(formation);
                }
            }
        }
    }
    return formations;
}
