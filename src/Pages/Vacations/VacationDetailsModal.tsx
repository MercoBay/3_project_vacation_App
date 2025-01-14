interface PriceDetails {
  basePrice: number;
  taxes: number;
  fees: number;
  insurance: number;
  total: number;
  pricePerPerson: number;
  discounts?: {
    type: string;
    amount: number;
  }[];
}

interface VacationDetails extends VacationPreview {
  priceDetails: PriceDetails;
  paymentOptions: {
    installments: boolean;
    maxInstallments: number;
    installmentPrice: number;
  };
} 