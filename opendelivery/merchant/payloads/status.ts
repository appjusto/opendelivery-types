/**
 * Get specific merchant info reading status provided by the Ordering Application.
 * GET /v1/merchantStatus?merchantId=
 * Query parameters
 * merchantId
 * Unique Identifier. Identifies the merchant in the different systems that the merchant will communicate.
 * This id must be generated by the merchant's Software Service.
 * To avoid duplicates between different merchants it is recommended that the software creates the merchantId using:
 * Merchant Document + UUID
 * If this is not possible, it is recommended to at least use a UUID.
 */
export interface GetMerchantStatusResponse {
  /**
   * Date of last attempt to read merchant information.
   */
  lastRead: string;

  /**
   * Reading attempt status
   */
  status: 'SUCCESS' | 'PROCESSING' | 'FAIL';

  /**
   * Open field to provide any relevant information to the caller. Eg: Error messages or causes.
   */
  moreInfo?: string;
}
