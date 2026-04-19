import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { EmailModule } from './modules/email/email.module';
import { ConfigModule } from '@nestjs/config';
import { CategoryModule } from './modules/category/category.module';
import { ProductMaterialModule } from './modules/material/material.module';
import { SupplierModule } from './modules/supplier/supplier.module';
import { RawMaterialModule } from './modules/rawmaterial/rawMaterial.module';
import { WarehouseModule } from './modules/warehouse/warehouse.module';
import { StockModule } from './modules/stock/stock.module';
import { SubCategoryModule } from './modules/subCategory/subCategory.module';
import { SaleModule } from './modules/sale/sale.module';
import { VariantModule } from './modules/variant/variant.module';
import { StockMovementModule } from './modules/stockMovement/stockMovement.module';
import { PriceModule } from './modules/price/price.module';
import { PurchaseOrderModule } from './modules/purchaseOrder/purchaseOrder.module';
import { PurchaseOrderProductModule } from './modules/purchaseOrderProduct/purchaseOrderProduct.module';
import { SupplierEvaluationModule } from './modules/supplierEvaluation/supplierEvaluation.module';
import { SaleItemModule } from './modules/saleItem/saleItem.module';
import { InvoiceModule } from './modules/invoice/invoice.module';
import { CustomerModule } from './modules/customer/customer.module';
import { CustomFieldModule } from './modules/customField/customField.module';
import { DynamicObjectsModule } from './modules/dynamic-objects/dynamic-objects.module';
import { AiModule } from './modules/ai/ai.module';
import { ProductModule } from './modules/product/product.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    PrismaModule,
    AuthModule,
    UsersModule,
    EmailModule,
    CategoryModule,
    ProductModule,
    ProductMaterialModule,
    SupplierModule,
    RawMaterialModule,
    WarehouseModule,
    StockModule,
    SubCategoryModule,
    SaleModule,
    VariantModule,
    StockMovementModule,
    PriceModule,
    PurchaseOrderModule,
    PurchaseOrderProductModule,
    SupplierEvaluationModule,
    SaleItemModule,
    InvoiceModule,
    CustomerModule,
    CustomFieldModule,
    DynamicObjectsModule,
    AiModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
