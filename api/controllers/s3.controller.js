function getSignedRequests(req, res) {
  var images = req.body;
  return res.status(200).json(images);

}

module.exports = {
  getSignedRequests: getSignedRequests
};
