const AWS = require('aws-sdk');
const uuid = require('uuid/v1');
const key = require('../config/key');

const s3 = new AWS.S3({
  accessKeyId: key.awsAccessKeyID,
  secretAccessKey: key.awsSecretAccessKey,
  region: 'us-east-2'
});

module.exports = app => {
  app.get('/api/v1/upload', (req, res) => {
    const key = `topic/${uuid()}.jpeg`;

    s3.getSignedUrl(
      'putObject',
      {
        Bucket: 'portfoilo',
        ContentType: 'image/jpeg',
        Key: key
      },
      (err, url) => res.send({ key, url })
    );
  });
};