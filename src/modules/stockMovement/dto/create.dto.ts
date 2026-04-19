export class CreateStockMovementDto {
  stockId: string;
  warehouseId: string;
  type: string; // Assuming MovementType is an enum, represented as string
  quantity: number;
  reason?: string | null;
}
