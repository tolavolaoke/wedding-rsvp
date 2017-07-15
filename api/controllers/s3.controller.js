const aws = require('aws-sdk');
const S3_BUCKET = process.env.S3_BUCKET;

function getSignedRequests(req, res) {
  const s3 = new aws.S3();
  const fileName = req.query['file-name'].replace(/\s+/g, '');
  const fileType = req.query['file-type'];
  const s3Params = {
    Bucket: S3_BUCKET,
    Key: fileName,
    Expires: 60,
    ContentType: fileType,
    ACL: 'public-read'
  };

  s3.getSignedUrl('putObject', s3Params, (err, data) => {
    if(err){
      console.log(err);
      return res.end();
    }
    const returnData = {
      signedRequest: data,
      url: `https://${S3_BUCKET}.s3.amazonaws.com/${fileName}`
    };
    res.status(200).json(returnData);
  });

}

module.exports = {
  getSignedRequests: getSignedRequests
};
