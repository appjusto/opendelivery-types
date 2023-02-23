import { GetEventsPoolingResponse } from './polling';

/**
 * Order Event Notification
 * Webhook is sent to notify the merchant Software Service that an new order event has happened on the Ordering Application.
 * The merchant Software Service that implements this webhook, should return an HTTP 200 response code with an empty response body to acknowledge receipt of the webhook event. If the Ordering Application does not receive a 200 acknowledgement response, than the webhook event will be resent based on the Ordering Application policies.
 * POST /v1/orderUpdate (or /v1/newEvent?)
 */
export type OrderUpdateRequest = GetEventsPoolingResponse;

export interface OrderUpdateStatusRequest {
  orderId: string;
}

export interface OrderUpdateStatusConfirmRequest
  extends OrderUpdateStatusRequest {
  reason?: string;
  createdAt: string;
  orderExternalCode: string;
  /*
   * Indicates an estimate of the preparation time (in minutes) for the order being confirmed.
   */
  preparationTime: number;
}
