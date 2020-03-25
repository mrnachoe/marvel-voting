const admin = require("firebase-admin");

const adminServiceAccount = require("#root/serviceAccountKey.json");

export const adminFirebase = admin.initializeApp({
    credential: admin.credential.cert(adminServiceAccount),
    databaseURL: "https://marvel-voting-f4d37.firebaseio.com"
});

export default adminFirebase;