const uploadValidtion = require('../validations/upload-validation');
const uploadService = require('../services/upload-service');
const ErrorHandler = require('../utils/error-handler');
const UploadDto = require('../dtos/upload-dto');

class UploadController {

    createUpload = async (req, res, next) => {
        const files = req.files;
        if (!files || files.length < 1)
            return next(ErrorHandler.badRequest('File is Required'));
        const body = await uploadValidtion.createUplaod.validateAsync(req.body);
        const images = files.map((x) => {
            return {
                name: x.originalname,
                path: x.filename,
                type: body.type,
                userId: req.user.id,
                mimeType: x.mimetype
            };
        });
        const uploads = await uploadService.createManyUpload(images);
        if (!uploads || uploads.length < 1)
            return next(ErrorHandler.badRequest('Failed To Upload Files'));
        res.json({ success: true, message: 'Files Uploaded' })
    }

    findUploads = async (req, res, next) => {
        const files = await uploadService.findUploads({ userId: req.user.id });
        if (!files || files.length < 1)
            return next(ErrorHandler.notFound('No Image Found'));
        const data = files.map((x) => {
            return new UploadDto(x);
        });
        res.json({ success: true, message: 'Image Found', data });
    }

}

module.exports = new UploadController();