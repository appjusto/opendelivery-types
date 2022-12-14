import { Address } from '../address';
import { LatLng } from '../location';
import { ServiceTiming } from '../merchant/service/timing';
import { Price } from '../price';
import { Customer } from './customer';
import { OrderItem } from './item';
import { OrderPaymentMethod } from './payment';

export type FeeType = 'DELIVERY_FEE' | 'SERVICE_FEE' | 'TIP';
export type FeeReceivedBy = 'MARKETPLACE' | 'MERCHANT' | 'LOGISTIC_SERVICES';

/**
 * Before confirming or canceling an order, it is necessary to get the order details so that the merchant Software Service user can check if he will be able to prepare and deliver this order, such as checking if he has all the necessary items and if he is available to make the delivery to the informed address.
 * Through the GET /orders/{id} endpoint the merchant Software Service can get all the details of an order.
 * This endpoint returns the code 200 and the content of the request. If an invalid request id or the id of an expired order is entered (depending on the Ordering Application policy) the endpoint returns 404.
 */
export interface GetBaseOrderDetailsResponse {
  /**
   * The unique identifier of the order. The order ID is generated by the Ordering Application.
   */
  id: string;

  /**
   * Order Id shown in the Ordering Application interface for the customer.
   */
  displayId: string;

  /**
   * This field must be filled in with the AppId of the Ordering Application that originated the order. This field is to help the applications that will work as a Hub, intermediating the requests from the Ordering Application with the Software Service.
   */
  sourceAppId?: string;

  /**
   * Order creation date and time.
   * (UTC date-time in ISO timestamp format).
   */
  createdAt: string;

  /**
   * Order Timing. Indicates whether the ORDER will have immediate or scheduled delivery.
   */
  orderTiming: ServiceTiming;

  /**
   * Suggestion for the preparation start time after Order creation. This can be used by the Ordering Application to inform the merchant to delay the start of the preparation for any reason. Default is the same time as the order creation time.
   * (UTC date-time in ISO timestamp format).
   */
  preparationStartDateTime: string;

  /**
   * Merchant information.
   */
  merchant: {
    /**
     * [ 36 .. 100 ] characters
     * Unique Identifier. Identifies the merchant in the different systems that the merchant will communicate.
     * This id must be generated by the merchant's Software Service.
     * To avoid duplicates between different merchants it is recommended that the software creates the merchantId using:
     * Merchant Document + UUID
     * If this is not possible, it is recommended to at least use a UUID.
     */
    id: string;
    /**
     * <= 500 characters
     * Merchant Public Name
     */
    name: string;
  };

  /**
   * Order items.
   */
  items: OrderItem[];

  /**
   * Other fees that may apply.
   */
  otherFees?: [
    {
      /**
       * Name related to the other fees.
       */
      name: string;

      type: FeeType;
      receivedBy: FeeReceivedBy;

      /**
       * Mandatory for marketplace.
       */
      receiverDocument?: string;

      /**
       * The fee price
       */
      price: Price;

      /**
       * Any extra comments.
       */
      observation?: string;
    }
  ];

  /**
   * Any discounts that may apply.
   */
  discounts?: [
    {
      /**
       * Amount value of the discount.
       */
      amount?: number;

      target: 'CART' | 'DELIVERY_FEE' | 'ITEM';

      /**
       * Only mandatory for target = ITEM.
       */
      targetId?: string;

      /**
       * Values sponsored by either party. The sum of the amounts listed in this atribute must match the value informed in the amount atribute above.
       */
      sponsorshipValues: [
        {
          name: 'MARKETPLACE' | 'MERCHANT';

          /**
           * Discount amount given by the sponsor.
           */
          amount?: number;
        }
      ];
    }
  ];

  /**
   * Set of fields with the sum of the values previously described in the order.
   */
  total: {
    /**
     * 	Sum of the total price of the items listed in the items attribute.
     */
    itemsPrice?: Price;

    /**
     * Sum of the total value of other fees listed in the otherFees attribute. If there isn't one, use 0.
     */
    otherFees: Price;

    /**
     * Sum of any discounts that may be listed in the discounts attribute. If there isn't one, use 0.
     */
    discount: Price;

    /**
     * The final value of the order (itemsPrice + otherFees - discounts).
     */
    orderAmount: Price;
  };

  /**
   * All the description of the payment, such as methods, pre-payments, change, etc.
   */
  payments: {
    /**
     * Amount paid in advance.
     */
    prepaid: number;

    /**
     * Amount that is still to be paid.
     */
    pending: number;

    /**
     * The payment method used. Whether it was online, on delivery, credit card, voucher, cash, etc.
     */
    methods: OrderPaymentMethod[];
  };

  /**
   * Customer related information.
   */
  customer: Customer;

  /**
   * Information for scheduled orders. Required if orderTiming is SCHEDULED.
   */
  schedule?: {
    /**
     * Date and time for when the order is ready. It can be calculated by the Ordering Application using the average preparation time of the dishes. Default is the same time as order creation time.
     * (UTC date-time in ISO timestamp format).
     */
    scheduledDateTimeStart: string;

    /**
     * Date and time for when the order is ready. It can be calculated by the Ordering Application using the average preparation time of the dishes. Default is the same time as order creation time.
     * (UTC date-time in ISO timestamp format).
     */
    scheduledDateTimeEnd: string;
  };

  /**
   * Extra information, if necessary.
   */
  extraInfo?: string;
}

export interface GetDeliveryOrderDetailsResponse
  extends GetBaseOrderDetailsResponse {
  type: 'DELIVERY';
  delivery: {
    deliveredBy: 'MERCHANT' | 'MARKETPLACE';
    /**
     * The address to which the order will be delivered.
     */
    deliveryAddress: OrderAddress;

    /**
     * Estimated delivery date and time. The same date showed to the customer, in the Ordering Application interface.
     * (UTC date-time in ISO timestamp format).
     */
    estimatedDeliveryDateTime: string;

    /**
     * Delivery date. The date time that the delivery actually took place.
     * (UTC date-time in ISO timestamp format).
     */
    deliveryDateTime?: string;
  };
}

export interface GetTakeOutOrderDetailsResponse
  extends GetBaseOrderDetailsResponse {
  type: 'TAKEOUT';
  takeout: {
    mode: 'DEFAULT' | 'PICKUP_AREA';

    /**
     * Takeout date and time. It can be calculated by the Ordering Application using the average preparation time of the dishes. Default is the same time as order creation time.
     * (UTC date-time in ISO timestamp format).
     */
    takeoutDateTime: string;
  };
}

export interface GetIndoorOrderDetailsResponse
  extends GetBaseOrderDetailsResponse {
  type: 'INDOOR';
  takeout: {
    /**
     * Indoor mode identifier:
     * DEFAULT: Used for orders placed in the Ordering Application to be consumed inside the merchant without a specific location.
     * PLACE: Used for orders placed in the Ordering Application to be consumed inside the merchant at a specific location already specified, such as a table or a counter.
     */
    mode: 'DEFAULT' | 'PLACE';

    /**
     * Date and time for when the order is ready. It can be calculated by the Ordering Application using the average preparation time of the dishes. Default is the same time as order creation time.
     * (UTC date-time in ISO timestamp format).
     */
    indoorDateTime: string;

    /**
     * Place identifier (Required if mode is PLACE)
     */
    place?: string;
  };
}

export type GetOrderDetailsResponse =
  | GetDeliveryOrderDetailsResponse
  | GetTakeOutOrderDetailsResponse
  | GetIndoorOrderDetailsResponse;

export interface OrderAddress extends Address {
  /**
   * Full Formated Address Text
   */
  formattedAddress: string;

  coordinates: LatLng;
}
