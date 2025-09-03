import express from 'express';

import notebookRouter from './routes/notebook';

const app = express();

const PORT = 3001;

app.use(express.json());

app.use('/api', notebookRouter);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));