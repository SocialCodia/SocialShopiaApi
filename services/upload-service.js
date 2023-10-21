const UploadModel = require('../models/upload-model');

class UploadService {

    createUpload = async data => await UploadModel.create();

    createManyUpload = async data => await UploadModel.insertMany(data);

    findUploads = async filter => await UploadModel.find(filter);

}

module.exports = new UploadService();