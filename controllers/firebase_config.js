
var admin = require("firebase-admin");

var serviceAccount = require("../config/melontar-f9a5d-firebase-adminsdk-zbbgy-19dedc2459.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});


module.exports.admin = admin