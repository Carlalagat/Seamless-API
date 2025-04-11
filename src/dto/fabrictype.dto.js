class CreateFabricTypeDto {
    constructor({ name }) {
        this.name = name;
    }
}
class UpdateFabricTypeDto {
    constructor({ name }) {
        this.name = name;
    }
}

module.exports = { CreateFabricTypeDto, UpdateFabricTypeDto };
