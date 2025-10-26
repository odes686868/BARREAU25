export interface StripeProduct {
  priceId: string;
  name: string;
  description: string;
  mode: 'payment' | 'subscription';
  price: number;
  currency: string;
  currencySymbol: string;
}

export const stripeProducts: StripeProduct[] = [
  {
    priceId: 'price_1SMIKxR4TDpULlRqZZ1Y1fPA',
    name: 'Forfait Premium',
    description: 'Forfait accès illimité',
    mode: 'subscription',
    price: 42.00,
    currency: 'cad',
    currencySymbol: 'C$'
  }
];

export function getProductByPriceId(priceId: string): StripeProduct | undefined {
  return stripeProducts.find(product => product.priceId === priceId);
}