export interface StripeProduct {
  id: string;
  priceId: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  currencySymbol: string;
  mode: 'subscription' | 'payment';
}

export const STRIPE_PRODUCTS: StripeProduct[] = [
  {
    id: 'prod_TIu91yyhw9BGul',
    priceId: 'price_1SMIKxR4TDpULlRqZZ1Y1fPA',
    name: 'Forfait Premium',
    description: 'Forfait accès illimité',
    price: 42.00,
    currency: 'cad',
    currencySymbol: 'C$',
    mode: 'subscription'
  }
];

export const getProductByPriceId = (priceId: string): StripeProduct | undefined => {
  return STRIPE_PRODUCTS.find(product => product.priceId === priceId);
};

export const getProductById = (id: string): StripeProduct | undefined => {
  return STRIPE_PRODUCTS.find(product => product.id === id);
};