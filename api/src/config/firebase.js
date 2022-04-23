import admin from "firebase-admin";

// import serviceAccount from "./serviceAccount.json" assert {type: "json"};
// var serviceAccount = require("path/to/serviceAccountKey.json");

import * as serviceAccount from "./serviceAccount.json";

const app = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});


export {admin}
