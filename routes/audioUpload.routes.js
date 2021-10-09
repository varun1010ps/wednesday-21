const AWS = require("aws-sdk");
const uuid = require("uuid/v1");
const key = require("../config/key");

const s3 = new AWS.S3({
  accessKeyId: key.awsAccessKeyID,
  secretAccessKey: key.awsSecretAccessKey,
  region: "us-east-2",
});

module.exports = (app) => {
  app.get("/api/v1/audio", (req, res) => {
    const key = `audio/${uuid()}.mp3`;

    s3.getSignedUrl(
      "putObject",
      {
        Bucket: "portfoilo",
        ContentType: "audio/*",
        Key: key,
      },
      (err, url) => res.send({ key, url })
    );
  });
};
