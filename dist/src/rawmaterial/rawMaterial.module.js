"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RawMaterialModule = void 0;
const common_1 = require("@nestjs/common");
const rawMaterial_service_1 = require("./rawMaterial.service");
const rawMaterial_controller_1 = require("./rawMaterial.controller");
const prisma_service_1 = require("../prisma/prisma.service");
const auth_module_1 = require("../auth/auth.module");
const users_module_1 = require("../users/users.module");
let RawMaterialModule = class RawMaterialModule {
};
exports.RawMaterialModule = RawMaterialModule;
exports.RawMaterialModule = RawMaterialModule = __decorate([
    (0, common_1.Module)({
        imports: [auth_module_1.AuthModule, users_module_1.UsersModule],
        controllers: [rawMaterial_controller_1.RawMaterialController],
        providers: [rawMaterial_service_1.RawMaterialService, prisma_service_1.PrismaService],
    })
], RawMaterialModule);
//# sourceMappingURL=rawMaterial.module.js.map