const admin = require("firebase-admin");
const serviceAccount = require("./e-commercewebsite-645fb-firebase-adminsdk-72cpx-6e4f3f0837.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

module.exports = admin;

