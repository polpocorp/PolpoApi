"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateDynamicObjectDto = void 0;
const class_validator_1 = require("class-validator");
let IsFieldTypeConstraint = class IsFieldTypeConstraint {
    validate(value) {
        return ['TEXT', 'NUMBER', 'DATE', 'BOOLEAN'].includes(value);
    }
    defaultMessage(args) {
        return `El tipo de campo debe ser uno de: TEXT, NUMBER, DATE, BOOLEAN`;
    }
};
IsFieldTypeConstraint = __decorate([
    (0, class_validator_1.ValidatorConstraint)({ name: 'isFieldType', async: false })
], IsFieldTypeConstraint);
function IsFieldType() {
    return function (object, propertyName) {
        (0, class_validator_1.registerDecorator)({
            target: object.constructor,
            propertyName: propertyName,
            options: {},
            constraints: [],
            validator: IsFieldTypeConstraint,
        });
    };
}
class FieldDefinitionDto {
    name;
    type;
    required;
    defaultValue;
}
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], FieldDefinitionDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    IsFieldType(),
    __metadata("design:type", String)
], FieldDefinitionDto.prototype, "type", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], FieldDefinitionDto.prototype, "required", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], FieldDefinitionDto.prototype, "defaultValue", void 0);
class CreateDynamicObjectDto {
    name;
    slug;
    description;
    icon;
    color;
    fields;
}
exports.CreateDynamicObjectDto = CreateDynamicObjectDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'El nombre es obligatorio' }),
    __metadata("design:type", String)
], CreateDynamicObjectDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'El slug es obligatorio' }),
    __metadata("design:type", String)
], CreateDynamicObjectDto.prototype, "slug", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateDynamicObjectDto.prototype, "description", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateDynamicObjectDto.prototype, "icon", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateDynamicObjectDto.prototype, "color", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_validator_1.IsDefined)(),
    __metadata("design:type", Array)
], CreateDynamicObjectDto.prototype, "fields", void 0);
//# sourceMappingURL=create-dynamic-object.dto.js.map