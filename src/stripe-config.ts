export interface StripeProduct {
  id: string;
  priceId: string;
  name: string;
  description?: string;
  price: number;
  currency: string;
  mode: 'subscription' | 'payment';
}

export const STRIPE_PRODUCTS: StripeProduct[] = [
  {
    id: 'prod_TIvYrXwmLzhPd8',
    priceId: 'price_1SMJhrR4TDpULlRq9ILSWiJm',
    name: 'PREMIUM TEST',
    price: 0.00,
    currency: 'cad',
    mode: 'subscription'
  },
  {
    id: 'prod_TIu91yyhw9BGul',
    priceId: 'price_1SMIKxR4TDpULlRqZZ1Y1fPA',
    name: 'Forfait Premium',
    description: 'Forfait accès illimité',
    price: 42.00,
    currency: 'cad',
    mode: 'subscription'
  }
];

export const formatPrice = (price: number, currency: string): string => {
  const symbol = currency === 'cad' ? 'C$' : '$';
  return `${symbol}${price.toFixed(2)}`;
};

export const getProductByPriceId = (priceId: string): StripeProduct | undefined => {
  return STRIPE_PRODUCTS.find(product => product.priceId === priceId);
};