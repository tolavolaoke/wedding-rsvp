const admin = require('firebase-admin');
const serviceAccount = require('../../../serviceAccountKey.json');
const ADMIN_UID = process.env.ADMIN_UID;
const FB_DB_URL = process.env.FB_DB_URL;

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: FB_DB_URL
});

function verifyToken(req, res) {
  var idToken =  req && req.params && req.params.idToken;
  if(!idToken) return res.status(400).json({ message: 'missing token ID' });

  admin.auth().verifyIdToken(idToken)
  .then(function(decodedToken) {
    var uid = decodedToken.uid;
    var permissions = {};

    if(uid === ADMIN_UID) {
      permissions = { admin: true };
      return res.status(200).json({ message: 'Access granted', permissions });
    } else {
      permissions = { admin: false };
      return res.status(401).json({ message: 'Access denied', permissions });
    }
  }).catch(function(error) {
    res.status(400).json(error);
  });
}

module.exports = {
  verifyToken: verifyToken
};
