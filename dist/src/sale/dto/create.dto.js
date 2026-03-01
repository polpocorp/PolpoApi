"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateSaleDto = exports.CreateSaleItemDto = void 0;
class CreateSaleItemDto {
    productId;
    quantity;
    unitPrice;
}
exports.CreateSaleItemDto = CreateSaleItemDto;
class CreateSaleDto {
    userId;
    customerId;
    saleDate;
    totalAmount;
    paymentMethod;
    status;
    items;
}
exports.CreateSaleDto = CreateSaleDto;
//# sourceMappingURL=create.dto.js.map