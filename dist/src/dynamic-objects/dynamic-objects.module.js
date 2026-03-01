"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DynamicObjectsModule = void 0;
const common_1 = require("@nestjs/common");
const dynamic_objects_service_1 = require("./dynamic-objects.service");
const dynamic_objects_controller_1 = require("./dynamic-objects.controller");
const prisma_service_1 = require("../prisma/prisma.service");
const auth_module_1 = require("../auth/auth.module");
let DynamicObjectsModule = class DynamicObjectsModule {
};
exports.DynamicObjectsModule = DynamicObjectsModule;
exports.DynamicObjectsModule = DynamicObjectsModule = __decorate([
    (0, common_1.Module)({
        imports: [auth_module_1.AuthModule],
        controllers: [dynamic_objects_controller_1.DynamicObjectsController],
        providers: [dynamic_objects_service_1.DynamicObjectsService, prisma_service_1.PrismaService],
        exports: [dynamic_objects_service_1.DynamicObjectsService],
    })
], DynamicObjectsModule);
//# sourceMappingURL=dynamic-objects.module.js.map