

import { v4 as uuidv4 } from 'uuid';

// Import the helper from your vendored schema file



import {
    CellType,
    createCellBetween,
    CellReference,
    CellOperationResult,

    events
} from '../third_party/runt-schema/mod';

import {
    MediaRepresentationSchema
} from '../third_party/runt-schema/types';



type NbCell = {

    cell_type: 'markdown' | 'code' | string;

    source?: string | string[];

    metadata?: Record<string, any>;

};

type Notebook = {

    cells: NbCell[];

    metadata?: Record<string, any>;

    nbformat?: number;

    nbformat_minor?: number;

};



export async function parseNotebook(content: string, existingCells: CellReference[] = []): Promise<CellOperationResult[]> {

// Parse the JSON safely

    let notebook: Notebook;

    try {

        notebook = JSON.parse(content);
        console.log(notebook.cells)

    } catch {

        throw new Error('Invalid JSON: unable to parse .ipynb');

    }

    if (!notebook?.cells || !Array.isArray(notebook.cells)) {

        throw new Error('Invalid notebook: missing cells[]');

    }

    return [...numberGenerator(existingCells, notebook)];





    }

export function* numberGenerator(all_cells: CellReference[] = [], notebook: Notebook): Generator<any> {
    const userId = `uuid-${uuidv4()}`;
    const allCells: CellReference[] = [...all_cells];

    for (const cell of notebook.cells) {
        const eve = createCellBetween(
            {
                id: userId,
                cellType: cell.cell_type as CellType,
                createdBy: userId,
            },
            null,
            null,
            allCells
        );
        yield eve;

        if (cell.cell_type === 'markdown') {
            const createEvent = events.markdownOutputAdded({
                id:userId,
                cellId: eve.newCellId,
                position: 0,
                content: MediaRepresentationSchema.T = {
                    type: "inline",
                    data: cell.source ?? "",
                },
            });
            yield createEvent;
        }
        if (cell.cell_type === 'code') {
            const createEvent = events.cellSourceChanged({
                id:userId,
                source: String(cell.source ?? ""),
                modifiedBy: userId,
            });
            yield createEvent;
        }
    }
}