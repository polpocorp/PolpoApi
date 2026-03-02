"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
let app;
async function getApp() {
    if (!app) {
        app = await core_1.NestFactory.create(app_module_1.AppModule);
        await app.init();
    }
    return app;
}
exports.default = async (req, res) => {
    const server = await getApp();
    const httpAdapter = server.getHttpAdapter().getInstance();
    httpAdapter(req, res);
};
async function bootstrap() {
    const localApp = await core_1.NestFactory.create(app_module_1.AppModule);
    await localApp.listen(process.env.PORT ?? 3000);
}
bootstrap();
//# sourceMappingURL=main.js.map