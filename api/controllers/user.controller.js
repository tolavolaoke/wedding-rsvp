function verifyToken(req, res) {
  var tokenId = req.body;
  if(tokenId) {
    res.status(200).json({message: 'received token Id', token: tokenId});
  } else {
    res.json({message: 'did not receive token Id'});
  }
}

module.exports = {
  verifyToken: verifyToken
};
