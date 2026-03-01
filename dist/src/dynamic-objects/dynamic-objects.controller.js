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
exports.DynamicObjectsController = void 0;
const common_1 = require("@nestjs/common");
const dynamic_objects_service_1 = require("./dynamic-objects.service");
const create_dynamic_object_dto_1 = require("./dto/create-dynamic-object.dto");
const update_dynamic_object_dto_1 = require("./dto/update-dynamic-object.dto");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
let DynamicObjectsController = class DynamicObjectsController {
    dynamicObjectsService;
    constructor(dynamicObjectsService) {
        this.dynamicObjectsService = dynamicObjectsService;
    }
    create(createDto, req) {
        return this.dynamicObjectsService.create(createDto, req.user.sub);
    }
    findAll() {
        return this.dynamicObjectsService.findAll();
    }
    findOne(id) {
        return this.dynamicObjectsService.findOne(id);
    }
    update(id, updateDto, req) {
        return this.dynamicObjectsService.update(id, updateDto, req.user.sub);
    }
    remove(id) {
        return this.dynamicObjectsService.remove(id);
    }
    getFields(id) {
        return this.dynamicObjectsService.getFields(id);
    }
};
exports.DynamicObjectsController = DynamicObjectsController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_dynamic_object_dto_1.CreateDynamicObjectDto, Object]),
    __metadata("design:returntype", void 0)
], DynamicObjectsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], DynamicObjectsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], DynamicObjectsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_dynamic_object_dto_1.UpdateDynamicObjectDto, Object]),
    __metadata("design:returntype", void 0)
], DynamicObjectsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], DynamicObjectsController.prototype, "remove", null);
__decorate([
    (0, common_1.Get)(':id/fields'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], DynamicObjectsController.prototype, "getFields", null);
exports.DynamicObjectsController = DynamicObjectsController = __decorate([
    (0, common_1.Controller)('dynamic-objects'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [dynamic_objects_service_1.DynamicObjectsService])
], DynamicObjectsController);
//# sourceMappingURL=dynamic-objects.controller.js.map