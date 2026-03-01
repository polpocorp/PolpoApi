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
exports.SupplierEvaluationController = void 0;
const common_1 = require("@nestjs/common");
const roles_decorator_1 = require("../auth/roles/roles.decorator");
const roles_guard_1 = require("../auth/roles/roles.guard");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const create_dto_1 = require("./dto/create.dto");
const update_dto_1 = require("./dto/update.dto");
const supplierEvaluation_service_1 = require("./supplierEvaluation.service");
let SupplierEvaluationController = class SupplierEvaluationController {
    supplierEvaluationService;
    constructor(supplierEvaluationService) {
        this.supplierEvaluationService = supplierEvaluationService;
    }
    create(createSupplierEvaluationDto) {
        console.log('Creating supplier evaluation with data:', createSupplierEvaluationDto);
        return this.supplierEvaluationService.create(createSupplierEvaluationDto);
    }
    findAll() {
        return this.supplierEvaluationService.findAll();
    }
    findOne(id) {
        return this.supplierEvaluationService.findOne(id);
    }
    update(id, updateSupplierEvaluationDto) {
        return this.supplierEvaluationService.update(id, updateSupplierEvaluationDto);
    }
    remove(id) {
        return this.supplierEvaluationService.remove(id);
    }
};
exports.SupplierEvaluationController = SupplierEvaluationController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_dto_1.CreateSupplierEvaluationDto]),
    __metadata("design:returntype", void 0)
], SupplierEvaluationController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], SupplierEvaluationController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], SupplierEvaluationController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('ADMIN'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_dto_1.UpdateSupplierEvaluationDto]),
    __metadata("design:returntype", void 0)
], SupplierEvaluationController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('ADMIN'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], SupplierEvaluationController.prototype, "remove", null);
exports.SupplierEvaluationController = SupplierEvaluationController = __decorate([
    (0, common_1.Controller)('supplier-evaluations'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [supplierEvaluation_service_1.SupplierEvaluationService])
], SupplierEvaluationController);
//# sourceMappingURL=supplierEvaluation.controller.js.map