import { Merchant } from '..';
import { MerchantBasicInfo } from '../basic-info';
import { Menu } from '../menu';
import { Category } from '../menu/category';
import { Item, ItemOffer } from '../menu/item';
import { Option, OptionGroup } from '../menu/option';
import { Service } from '../service';
import { Status } from '../status';

export type MerchantUpdateEntityType =
  | 'MERCHANT'
  | 'BASIC_INFO'
  | 'SERVICE'
  | 'MENU'
  | 'CATEGORY'
  | 'ITEM'
  | 'ITEM_OFFER'
  | 'OPTION_GROUP'
  | 'OPTION'
  | 'AVAILABILITY';

export type MerchantUpdatedObjects =
  | Merchant[]
  | MerchantBasicInfo[]
  | Option[]
  | OptionGroup[]
  | ItemOffer[]
  | Item[]
  | Category[] // Data ?
  | Menu[]
  | Service[];

/**
 * Webhook is sent to notify the Ordering Application that an new update has happened on the merchant information.
 * The Ordering Application that implements this webhook, should return an HTTP 200 response code with an empty response body to acknowledge receipt of the webhook event. If the merchant Software Service does not receive a 200 acknowledgement response, than the webhook event will be resent based on the Software Service policies.
 * POST /v1/merchantUpdate
 * This endpoint can be used in the following ways:
 *  1 - Sent with an empty body:
 * This will force Ordering Application to make a new request to the GET /v1/merchant endpoint to update all the merchant information.
 * 2 - Sent with only the merchantStatus field:
 * This will force the opening or closing of the merchant within the Ordering Application, without forcing a new GET /v1/merchant call.
 * 3 - Sent only with the entityType and updatedObjects fields:
 * This will force the Ordering Application to update only the sent objects, without forcing a new GET /v1/merchant call.
 * When the entityType field is populated, the updatedObjects field cannot be empty.
 * 4 - Sent the merchantStatus, entityType and updatedObjects fields:
 * This will force scenarios 2 and 3 to happen simultaneously.
 */
export type MerchantUpdateRequest = {
  /**
   * Indicates if the Merchant is Avaliable or Unavaliable. Only use this type when you must close (disable) the merchant due to an unexpected event and you don't know when the service will be re-established (e.g. do not use for holidays).
   */
  merchantStatus?: Status;
  /**
   * The entity type of the updated object.
   */
  entityType?: MerchantUpdateEntityType;
  /**
   * Updated Option entity objects
   */
  updatedObjects?: MerchantUpdatedObjects;
};
