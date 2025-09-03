import { Router } from 'express';

import multer from 'multer';

import { parseNotebook } from '../utils/parseNotebook';

const upload = multer({ storage: multer.memoryStorage() });

const router = Router();

router.post('/import-notebook', upload.single('file'), async (req, res) => {

    try {

        if (!req.file) return res.status(400).json({ error: 'No file uploaded' });

        const events = await parseNotebook(req.file.buffer.toString());

        res.json(events);

    } catch (error  :any) {

        res.status(500).json({ error: error.message });

    }

});

export default router;