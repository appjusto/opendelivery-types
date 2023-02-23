import { Image } from './image';
import { Status } from './status';

export type MerchantCategory =
  | 'BURGERS'
  | 'PIZZA'
  | 'FAST_FOOD'
  | 'HOT_DOG'
  | 'JAPANESE'
  | 'DESSERTS'
  | 'AMERICAN'
  | 'ICE_CREAM'
  | 'BBQ'
  | 'SANDWICH'
  | 'MEXICAN'
  | 'BRAZILIAN'
  | 'PASTRY'
  | 'ARABIAN'
  | 'COMFORT_FOOD'
  | 'VEGETARIAN'
  | 'VEGAN'
  | 'BAKERY'
  | 'HEALTHY'
  | 'ITALIAN'
  | 'CHINESE'
  | 'JUICE_SMOOTHIES'
  | 'SEAFOOD'
  | 'CAFE'
  | 'SALADS'
  | 'COFFEE_TEA'
  | 'PASTA'
  | 'BREAKFAST_BRUNCH'
  | 'LATIN_AMERICAN'
  | 'CONVENIENCE'
  | 'PUB'
  | 'HAWAIIAN'
  | 'EUROPEAN'
  | 'FAMILY_MEALS'
  | 'FRENCH'
  | 'INDIAN'
  | 'PORTUGUESE'
  | 'SPANISH'
  | 'GOURMET'
  | 'KIDS_FRIENDLY'
  | 'SOUTH_AMERICAN'
  | 'SPECIALTY_FOODS'
  | 'ARGENTINIAN'
  | 'PREMIUM'
  | 'AFFORDABLE_MEALS';

export interface MerchantCategoryData {
  id: string;
  index: number;
  name: string;
  description?: string;
  image: Image;
  externalCode: string;
  status: Status;
  availabilityId: string;
  itemOfferId: string[];
}
