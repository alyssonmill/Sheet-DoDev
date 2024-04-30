import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);

const { GoogleSpreadsheet } = require('google-spreadsheet');
const credentials = require('./credentials.json');
const arquivo = require('./arquivo.json');
const { JWT } = require('google-auth-library');
const file = require('node-fetch');

const SCOPES = [
    'https://www.googleapis.com/auth/spreadsheets',
    'https://www.googleapis.com/auth/drive.file'
];

const jwt = new JWT({
    email: credentials.client_email,
    key: credentials.private_key,
    scopes: SCOPES,
});







