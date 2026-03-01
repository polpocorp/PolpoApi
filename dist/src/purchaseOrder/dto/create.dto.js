"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreatePurchaseOrderDto = exports.CreatePurchaseOrderProductDto = void 0;
class CreatePurchaseOrderProductDto {
    productId;
    quantity;
    unitPrice;
}
exports.CreatePurchaseOrderProductDto = CreatePurchaseOrderProductDto;
class CreatePurchaseOrderDto {
    supplierId;
    createdById;
    orderDate;
    status;
    totalAmount;
    products;
}
exports.CreatePurchaseOrderDto = CreatePurchaseOrderDto;
//# sourceMappingURL=create.dto.js.map