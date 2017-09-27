//depends
const AWS = require(`aws-sdk`),
    env = require('dotenv').config({ path: './server/config/.env' });

//S3 setup
AWS.config.update({
    accessKeyId: process.env.AWS_ACCESSKEY,
    secretAccessKey: process.env.AWS_SECRETKEY,
    region: process.env.AWS_REGION
});

const S3 = new AWS.S3();

const bucketName = process.env.AWS_BUCKETNAME;
exports.sendPics = (pic, cb) => {
    let buf = new Buffer(pic.imageBody.replace(/^data:image\/\w+;base64,/, ""), 'base64');

    let params = {
        Bucket: bucketName,
        Body: buf,
        Key: pic.imageName,
        ContentType: pic.imageExtension,
        ACL: `public-read`
    };
    return S3.upload(params, (err, data) => {
        if (err) return err;
        console.log(data);
        cb(data);
    })
}