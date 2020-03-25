const admin = require("firebase-admin");

const adminServiceAccount = require("#root/serviceAccountKey.json");

export const adminFirebase = admin.initializeApp({
    credential: admin.credential.cert(adminServiceAccount),
    databaseURL: 'https://marvel-4d316.firebaseio.com',
});

export default adminFirebase;