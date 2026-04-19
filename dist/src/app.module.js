"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const prisma_module_1 = require("./prisma/prisma.module");
const auth_module_1 = require("./modules/auth/auth.module");
const users_module_1 = require("./modules/users/users.module");
const email_module_1 = require("./modules/email/email.module");
const config_1 = require("@nestjs/config");
const category_module_1 = require("./modules/category/category.module");
const material_module_1 = require("./modules/material/material.module");
const supplier_module_1 = require("./modules/supplier/supplier.module");
const rawMaterial_module_1 = require("./modules/rawmaterial/rawMaterial.module");
const warehouse_module_1 = require("./modules/warehouse/warehouse.module");
const stock_module_1 = require("./modules/stock/stock.module");
const subCategory_module_1 = require("./modules/subCategory/subCategory.module");
const sale_module_1 = require("./modules/sale/sale.module");
const variant_module_1 = require("./modules/variant/variant.module");
const stockMovement_module_1 = require("./modules/stockMovement/stockMovement.module");
const price_module_1 = require("./modules/price/price.module");
const purchaseOrder_module_1 = require("./modules/purchaseOrder/purchaseOrder.module");
const purchaseOrderProduct_module_1 = require("./modules/purchaseOrderProduct/purchaseOrderProduct.module");
const supplierEvaluation_module_1 = require("./modules/supplierEvaluation/supplierEvaluation.module");
const saleItem_module_1 = require("./modules/saleItem/saleItem.module");
const invoice_module_1 = require("./modules/invoice/invoice.module");
const customer_module_1 = require("./modules/customer/customer.module");
const customField_module_1 = require("./modules/customField/customField.module");
const dynamic_objects_module_1 = require("./modules/dynamic-objects/dynamic-objects.module");
const ai_module_1 = require("./modules/ai/ai.module");
const product_module_1 = require("./modules/product/product.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                envFilePath: '.env',
            }),
            prisma_module_1.PrismaModule,
            auth_module_1.AuthModule,
            users_module_1.UsersModule,
            email_module_1.EmailModule,
            category_module_1.CategoryModule,
            product_module_1.ProductModule,
            material_module_1.ProductMaterialModule,
            supplier_module_1.SupplierModule,
            rawMaterial_module_1.RawMaterialModule,
            warehouse_module_1.WarehouseModule,
            stock_module_1.StockModule,
            subCategory_module_1.SubCategoryModule,
            sale_module_1.SaleModule,
            variant_module_1.VariantModule,
            stockMovement_module_1.StockMovementModule,
            price_module_1.PriceModule,
            purchaseOrder_module_1.PurchaseOrderModule,
            purchaseOrderProduct_module_1.PurchaseOrderProductModule,
            supplierEvaluation_module_1.SupplierEvaluationModule,
            saleItem_module_1.SaleItemModule,
            invoice_module_1.InvoiceModule,
            customer_module_1.CustomerModule,
            customField_module_1.CustomFieldModule,
            dynamic_objects_module_1.DynamicObjectsModule,
            ai_module_1.AiModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map