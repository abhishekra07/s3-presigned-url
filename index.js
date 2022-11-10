const express = require('express')
const app = express()
const bodyParser = require('body-parser');

var AWS = require("aws-sdk");

let credentials = {
    accessKeyId: process.env.AWS_S3_ACCESS_KEY,
    secretAccessKey: process.env.AWS_S3_SECRET_KEY,
};

AWS.config.update({ credentials: credentials, region: "ap-southeast-1" });
const s3 = new AWS.S3();

const port = 3000

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/_presigned_post_url', (req, res) => {
    let { body } = req;
    let { filename  } = body;

    let filepath = `1/${new Date().getTime()}/prefix_type`;
    let presignedPostURL = s3.getSignedUrl("putObject", {
        Bucket: process.env.AWS_S3_BUCKET_NAME,
        Key: `${filepath}/${filename}`,
        Expires: 100000, //time to expire in seconds
    });
    res.status(200).send({
        presignedPostURL,
        filePath: `${filepath}/${filename}`,
    });
})

app.post('/_presigned_get_url', (req, res) => {
    let { body } = req;
    let { filepath } = body;
    let presignedGETURL = s3.getSignedUrl("getObject", {
        Bucket: process.env.AWS_S3_BUCKET_NAME,
        Key: `${filepath}`, //filename
        Expires: 100000, //time to expire in seconds
    });
    res.status(200).send({
        presignedGETURL
    });
})

app.listen(port, () => {
    console.log(`S3 Example app listening on port ${port}`)
  });