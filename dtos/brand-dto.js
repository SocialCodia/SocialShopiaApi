const UploadDto = require('./upload-dto');

class BrandDto {

    id;
    name;
    logo;
    featured;
    slug;
    metaTitle;
    metaDescription;

    constructor(data) {
        this.id = data.id;
        this.name = data.name;
        this.logo = data.logo && new UploadDto(data.logo).path;
        this.featured = data.featured;
        this.slug = data.slug;
        this.metaTitle = data.metaTitle;
        this.metaDescription = data.metaDescription;
    }

}

module.exports = BrandDto;