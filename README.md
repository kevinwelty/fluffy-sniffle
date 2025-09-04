# fluffy-sniffle
notebook parsing


## Quick Start

**Requirements**: Node.js >=23.0.0 install here  https://nodejs.org/en/download

Need to add a Jupyter notebook file to test with to base  directory

```bash
npm install express multer uuid && npm install --save-dev typescript ts-node @types/node   @types/express@types/multer eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin jest ts-jest @types/jest

npm run dev

curl -X  POST http://localhost:3001/api/import-notebook/ -F "file={jupyter notebook}"
```

