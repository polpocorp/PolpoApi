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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RawMaterialController = void 0;
const common_1 = require("@nestjs/common");
const rawMaterial_service_1 = require("./rawMaterial.service");
const create_rawmaterial_dto_1 = require("./dto/create-rawmaterial.dto");
const update_rawmaterial_dto_1 = require("./dto/update-rawmaterial.dto");
const roles_decorator_1 = require("../auth/roles/roles.decorator");
const roles_guard_1 = require("../auth/roles/roles.guard");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
let RawMaterialController = class RawMaterialController {
    rawMaterialService;
    constructor(rawMaterialService) {
        this.rawMaterialService = rawMaterialService;
    }
    create(createRawMaterialDto) {
        return this.rawMaterialService.create(createRawMaterialDto);
    }
    findAll() {
        return this.rawMaterialService.findAll();
    }
    findOne(id) {
        return this.rawMaterialService.findOne(id);
    }
    update(id, updateRawMaterialDto) {
        return this.rawMaterialService.update(id, updateRawMaterialDto);
    }
    remove(id) {
        return this.rawMaterialService.remove(id);
    }
};
exports.RawMaterialController = RawMaterialController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_rawmaterial_dto_1.CreateRawMaterialDto]),
    __metadata("design:returntype", void 0)
], RawMaterialController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], RawMaterialController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], RawMaterialController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('ADMIN'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_rawmaterial_dto_1.UpdateRawMaterialDto]),
    __metadata("design:returntype", void 0)
], RawMaterialController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('ADMIN'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], RawMaterialController.prototype, "remove", null);
exports.RawMaterialController = RawMaterialController = __decorate([
    (0, common_1.Controller)('raw-materials'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [rawMaterial_service_1.RawMaterialService])
], RawMaterialController);
//# sourceMappingURL=rawMaterial.controller.js.map