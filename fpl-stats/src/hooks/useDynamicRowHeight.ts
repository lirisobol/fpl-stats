import { FirstDataRenderedEvent, GridApi, GridReadyEvent, GridSizeChangedEvent } from 'ag-grid-community';
import { useCallback } from 'react';


let minRowHeight = 25;
let currentRowHeight: number;

const updateRowHeight = (params: { api: GridApi }) => {
    const bodyViewport = document.querySelector(".ag-body-viewport");
    if (!bodyViewport) {
        return;
    }
    const gridHeight = bodyViewport.clientHeight;
    const renderedRowCount = params.api.getDisplayedRowCount();
    if (renderedRowCount * minRowHeight >= gridHeight) {
        if (currentRowHeight !== minRowHeight) {
            currentRowHeight = minRowHeight;
            params.api.resetRowHeights();
        }
    } 
    else {
        currentRowHeight = Math.floor(gridHeight / renderedRowCount);
        params.api.resetRowHeights();
    }
};

export const useDynamicRowHeight = () => {
    const getRowHeight = useCallback(() => {
        return currentRowHeight;
    }, []);

    const onGridReady = useCallback((params: GridReadyEvent) => {
        minRowHeight = params.api.getSizesForCurrentTheme().rowHeight;
        currentRowHeight = minRowHeight;
    }, []);

    const onFirstDataRendered = useCallback((params: FirstDataRenderedEvent) => {
        updateRowHeight(params);
    }, []);

    const onGridSizeChanged = useCallback((params: GridSizeChangedEvent) => {
        updateRowHeight(params);
    }, []);

    return { getRowHeight, onGridReady, onFirstDataRendered, onGridSizeChanged };
};
