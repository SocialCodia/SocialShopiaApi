const Constants = require("../utils/constants");

class UserDto {

    id;
    name;
    email;
    image;
    type;

    constructor(user) {
        this.id = user._id;
        this.name = user.name;
        this.email = user.email;
        this.image = user.image == null ? Constants.PLACEHOLDER_USER_IMAGE : user.image;
        this.type = user.type;
    }

}

module.exports = UserDto;