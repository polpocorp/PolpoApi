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
exports.JwtAuthGuard = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("@nestjs/config");
let JwtAuthGuard = class JwtAuthGuard {
    reflector;
    jwtService;
    configService;
    constructor(reflector, jwtService, configService) {
        this.reflector = reflector;
        this.jwtService = jwtService;
        this.configService = configService;
    }
    async canActivate(context) {
        const request = context.switchToHttp().getRequest();
        const isPublic = this.reflector.get('isPublic', context.getHandler());
        if (isPublic) {
            console.log('Ruta pública, acceso permitido sin autenticación');
            return true;
        }
        const token = request.headers.authorization?.replace('Bearer ', '');
        if (!token) {
            throw new common_1.UnauthorizedException('No se proporcionó token');
        }
        const secret = this.configService.get('JWT_SECRET');
        if (!secret) {
            console.error('JWT_SECRET no está definido');
            throw new common_1.UnauthorizedException('Configuración del servidor incompleta: JWT_SECRET no definido');
        }
        try {
            const payload = await this.jwtService.verifyAsync(token);
            request.user = payload;
            return true;
        }
        catch (error) {
            console.error('Error al validar el token:', error.message);
            throw new common_1.UnauthorizedException(`Token inválido o expirado: ${error.message}`);
        }
    }
};
exports.JwtAuthGuard = JwtAuthGuard;
exports.JwtAuthGuard = JwtAuthGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [core_1.Reflector,
        jwt_1.JwtService,
        config_1.ConfigService])
], JwtAuthGuard);
//# sourceMappingURL=jwt-auth.guard.js.map