const UploadDto = require('./upload-dto');

class CategoryDto {
    id;
    name;
    icon;
    banner;
    featured;
    slug;
    metaTitle;
    metaDescription;

    constructor(data) {
        this.id = data._id;
        this.name = data.name;
        this.icon = data.icon && new UploadDto(data.icon).path;
        this.banner = data.banner;
        this.featured = data.featured;
        this.slug = data.slug;
        this.metaTitle = data.metaTitle;
        this.metaDescription = data.metaDescription;
    }

}
module.exports = CategoryDto;