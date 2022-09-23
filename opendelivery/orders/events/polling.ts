/**
 * "Polls events for any orders from merchants associated with the authenticated user. Each event received from this endpoint must be properly acknowledged, otherwise it will continue to be returned on further requests. In the body of the request, send an array containing only the event ids. Each request accepts a list of at most 2000 event ids."
 * GET /v1/events:polling?eventType=
 * Query parameters
 * eventType
 * Desired event types. All other events not selected by group will be automatically acknowledged and omitted from the response. Must either be omitted or non-empty.
 * Event Types definitions:
 * CREATED : Order created.
 * CONFIRMED : Order confirmed.
 * DISPATCHED : Order went out for delivery.
 * READY_FOR_PICKUP: Order ready for pickup.
 * PICKUP_AREA_ASSIGNED : Designated area to pick up the order.
 * CONCLUDED : Order completed.
 * CANCELLATION_REQUESTED : Sent by the Software Service to the Ordering Application.
 * CANCELLATION_REQUEST_DENIED : It must be sent from the Ordering Application to the Software Service.
 * CANCELLED : When the order is actually cancelled.
 * ORDER_CANCELLATION_REQUEST: It must be sent from the Ordering Application to the Software Service.
 *  */

import { EventType } from '.';

export interface GetEventsPoolingResponse {
  /**
   * A unique identifier of the event.
   */
  eventId: string;

  /**
   * The event type
   */
  eventType: EventType;

  /**
   * 	The unique identifier of the order. The order ID is generated by the Ordering Application.
   */
  orderId: string;

  /**
   * The URL to get the order details
   */
  orderURL: string;

  /**
   * Order creation date and time.
   * (UTC date-time in ISO timestamp format).
   */
  createdAt: string;

  /**
   * This field must be filled in with the AppId of the Ordering Application that originated the order. This field is to help the applications that will work as a Hub, intermediating the requests from the Ordering Application with the Software Service.
   */
  sourceAppId?: string;
}
