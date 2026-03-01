import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { EmailModule } from './email/email.module';
import { ConfigModule } from '@nestjs/config';
import { CategoryModule } from './category/category.module';
import { ProductModule } from './product/product.module';
import { ProductMaterialModule } from './material/material.module';
import { SupplierModule } from './supplier/supplier.module';
import { RawMaterialModule } from './rawmaterial/rawMaterial.module';
import { WarehouseModule } from './warehouse/warehouse.module';
import { StockModule } from './stock/stock.module';
import { SubCategoryModule } from './subCategory/subCategory.module';
import { SaleModule } from './sale/sale.module';
import { VariantModule } from './variant/variant.module';
import { StockMovementModule } from './stockMovement/stockMovement.module';
import { PriceModule } from './price/price.module';
import { PurchaseOrderModule } from './purchaseOrder/purchaseOrder.module';
import { PurchaseOrderProductModule } from './purchaseOrderProduct/purchaseOrderProduct.module';
import { SupplierEvaluationModule } from './supplierEvaluation/supplierEvaluation.module';
import { SaleItemModule } from './saleItem/saleItem.module';
import { InvoiceModule } from './invoice/invoice.module';
import { CustomerModule } from './customer/customer.module';
import { CustomFieldModule } from './customField/customField.module';
import { DynamicObjectsModule } from './dynamic-objects/dynamic-objects.module';
import { AiModule } from './ai/ai.module';

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
