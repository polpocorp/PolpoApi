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
exports.UpdateMaterialDto = void 0;
const class_validator_1 = require("class-validator");
class UpdateMaterialDto {
    productId;
    rawMaterialId;
    quantity;
    unitOfMeasure;
}
exports.UpdateMaterialDto = UpdateMaterialDto;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsMongoId)({ message: 'productId must be a valid MongoDB ObjectId' }),
    __metadata("design:type", String)
], UpdateMaterialDto.prototype, "productId", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsMongoId)({ message: 'rawMaterialId must be a valid MongoDB ObjectId' }),
    __metadata("design:type", String)
], UpdateMaterialDto.prototype, "rawMaterialId", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)({}, { message: 'quantity must be a number' }),
    (0, class_validator_1.Min)(0, { message: 'quantity must be a positive number' }),
    __metadata("design:type", Number)
], UpdateMaterialDto.prototype, "quantity", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: 'unitOfMeasure must be a string' }),
    __metadata("design:type", String)
], UpdateMaterialDto.prototype, "unitOfMeasure", void 0);
//# sourceMappingURL=update-productMaterial.dto.js.map