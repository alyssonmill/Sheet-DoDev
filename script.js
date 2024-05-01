const { GoogleSpreadsheet }  = require('google-spreadsheet');
const credentials = require('./credentials.json');
const arquivo = require('./arquivo.json');
const { JWT } = require('google-auth-library');
const fetch = require('node-fetch');

const SCOPES = [
    'https://www.googleapis.com/auth/spreadsheets',
    'https://www.googleapis.com/auth/drive.file'
];

const jwt = new JWT({
    email: credentials.client_email,
    key: credentials.private_key,
    scopes: SCOPES,
});

class MyGoogleSpreadsheet {
    constructor(id, jwt) {
        this.id = id;
        this.jwt = jwt;
    }

    async LoadInfo() {
        let doc = new GoogleSpreadsheet(this.id);
        await doc.useServiceAccountAuth(this.jwt);
        await doc.loadInfo();
        return doc;
    }
}

async function GetDoc() {
    let spreadsheet = new MyGoogleSpreadsheet('107707834756152551014', jwt);
    let doc = await spreadsheet.LoadInfo();
    return doc;
}

async function ReadWorkSheet() {

    let sheet = (await GetDoc()).sheetsByIndex[0];
    let sheetData = await sheet.getRows();

    let userList = sheetData.map(row => row.toObject());

    return userList;
}

var apiUrl = 'https://apigenerator.dronahq.com/api/YZXkJHWk/Usuarios';

async function AddUser(data = {}) {

    const response = await fetch(apiUrl, {

        method: 'POST',

        headers: {

            'Content-Type': 'application/json'

        },

        body: JSON.stringify(data)

    });

    return response.json();

}


async function trackData() {
    let data = await ReadWorkSheet ();
    data.map(async (userList) => {
        let response = await AddUser(userList)
        console.log(response)
    })
    return console.log("Dados copiados com sucesso")
}



















