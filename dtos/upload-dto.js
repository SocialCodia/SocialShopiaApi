
class UploadDto {

    id;
    name;
    path;

    constructor(data) {
        this.id = data._id;
        this.name = data.name;
        this.path = process.env.APP_URL_IMAGES + data.path;
    }

}

module.exports = UploadDto;