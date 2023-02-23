export type OrderCancellationCode =
  | 'SYSTEMIC_ISSUES'
  | 'DUPLICATE_APPLICATION'
  | 'UNAVAILABLE_ITEM'
  | 'RESTAURANT_WITHOUT_DELIVERY_MAN'
  | 'OUTDATED_MENU'
  | 'ORDER_OUTSIDE_THE_DELIVERY_AREA'
  | 'BLOCKED_CUSTOMER'
  | 'OUTSIDE_DELIVERY_HOURS'
  | 'INTERNAL_DIFFICULTIES_OF_THE_RESTAURANT'
  | 'RISK_AREA';

export interface OrderCancellationRequest {
  reason: string;
  code: OrderCancellationCode;
  /**
   * The request was manual or automatic
   */
  mode: 'AUTO' | 'MANUAL';
  outOfStockItems?: string[];
  invalidItems?: string[];
}
