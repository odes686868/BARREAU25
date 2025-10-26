export interface StripeProduct {
  id: string;
  priceId: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  currencySymbol: string;
  mode: 'payment' | 'subscription';
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

export const getPremiumProduct = () => STRIPE_PRODUCTS[0];

export const getProductByPriceId = (priceId: string): StripeProduct | undefined => {
  return STRIPE_PRODUCTS.find(product => product.priceId === priceId);
};

export const formatPrice = (product: StripeProduct): string => {
  return `${product.currencySymbol}${product.price.toFixed(2)}`;
};