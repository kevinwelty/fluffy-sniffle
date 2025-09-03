/* eslint-disable @typescript-eslint/no-explicit-any */

import { v4 as uuidv4 } from 'uuid';

// Import the helper from your vendored schema file

import {
    CellType,
    createCellBetween,
    CellReference,
    CellOperationResult
} from '../third_party/runt-schema/mod';

type Event = { name: string; args: Record<string, any> };

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
        console.log(notebook)
        console.log(notebook['cells'])

    } catch {

        throw new Error('Invalid JSON: unable to parse .ipynb');

    }

    if (!notebook?.cells || !Array.isArray(notebook.cells)) {

        throw new Error('Invalid notebook: missing cells[]');

    }

    const userId = `uuid-${uuidv4()}`;

    const events: CellOperationResult[] = [];


    const allCells: CellReference[] = [...existingCells];




    notebook.cells.forEach((cell: NbCell, index: number) => {
        const eve = createCellBetween(
            {   id: userId,
                cellType: cell.cell_type as CellType,
                createdBy: userId,},
            null,
            null,
            allCells


        );




        events.push(eve);


    });

    return events;

}