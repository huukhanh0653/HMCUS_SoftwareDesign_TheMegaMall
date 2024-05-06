const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: 'dupsdtrvy',
    api_key: '943628789833962',
    api_secret: 'xsn2ONslaeDRYZS3ojFuxG74fA0'
});

module.exports = cloudinary;