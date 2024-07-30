
class PlayersTableConfig {
    public autoSizeStrategy = {
        type: 'fitGridWidth' as const,
        defaultMinWidth: 75,
        columnLimits: [
            {
                colId: 'playerName',
                minWidth: 150
            }
        ]
    };
    public defaultColDef = {
        sortable: true,
        resizable: true,
    };
}

export const playersTableConfig = new PlayersTableConfig();
