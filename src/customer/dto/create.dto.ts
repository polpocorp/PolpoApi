export class CreateCustomerDto {
  name: string;
  email?: string | null;
  phone?: string | null;
  loyaltyPoints?: number;
}
