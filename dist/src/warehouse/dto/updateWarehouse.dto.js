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
exports.UpdateWarehouseDto = void 0;
const class_validator_1 = require("class-validator");
class UpdateWarehouseDto {
    name;
    location;
}
exports.UpdateWarehouseDto = UpdateWarehouseDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'El nombre del almacén es requerido' }),
    (0, class_validator_1.IsString)({ message: 'El nombre debe ser una cadena' }),
    __metadata("design:type", String)
], UpdateWarehouseDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'La ubicación del almacén es requerida' }),
    (0, class_validator_1.IsString)({ message: 'La ubicación debe ser una cadena' }),
    __metadata("design:type", String)
], UpdateWarehouseDto.prototype, "location", void 0);
//# sourceMappingURL=updateWarehouse.dto.js.map