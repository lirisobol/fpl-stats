/* Future -> 
    1. conditional coloring ->
        a. price - lower value is better
        b. goals conceded - lower value is better

    2. price should be displayed as float, 60 -> 6.0
*/
export const getCellClassRules = (numPlayers: number) => {
    if(numPlayers === 2) return {
        // For two-player comparison
        'compare-high': (params: any) => {
            if (numPlayers === 2) {
                const val1 = params.data[`player0`];
                const val2 = params.data[`player1`];
                return (val1 > val2 && params.colDef.field === 'player0') || (val2 > val1 && params.colDef.field === 'player1');
            }
            return false;
        },
        'compare-low': (params: any) => {
            if (numPlayers === 2) {
                const val1 = params.data[`player0`];
                const val2 = params.data[`player1`];
                return (val1 < val2 && params.colDef.field === 'player0') || (val2 < val1 && params.colDef.field === 'player1');
            }
            return false;
        },
        'compare-equal': (params: any) => {
            if (numPlayers === 2) {
                const val1 = params.data[`player0`];
                const val2 = params.data[`player1`];
                return val1 === val2;
            }
            return false;
        }
    }
    if(numPlayers === 3) return {
        // For three-player comparison
        'compare-high': (params: any) => {
            if (numPlayers === 3) {
                const val1 = params.data[`player0`];
                const val2 = params.data[`player1`];
                const val3 = params.data[`player2`];
                const values = [val1, val2, val3];
                const max = Math.max(...values);
                return values.filter(v => v === max).length === 1 && params.value === max;
            }
            return false;
        },
        'compare-low': (params: any) => {
            if (numPlayers === 3) {
                const val1 = params.data[`player0`];
                const val2 = params.data[`player1`];
                const val3 = params.data[`player2`];
                const values = [val1, val2, val3];
                const min = Math.min(...values);
                return values.filter(v => v === min).length === 1 && params.value === min;
            }
            return false;
        },
        'compare-mid': (params: any) => {
            if (numPlayers === 3) {
                const val1 = params.data[`player0`];
                const val2 = params.data[`player1`];
                const val3 = params.data[`player2`];
                const values = [val1, val2, val3];
                const max = Math.max(...values);
                const min = Math.min(...values);
                return values.filter(v => v !== max && v !== min).length === 1 && params.value !== max && params.value !== min;
            }
            return false;
        }
    }
};
