import { createHmac } from 'crypto';
import { KiotVietClient } from '../client';
import {
  Webhook,
  WebhookCreateParams,
  WebhookUpdateParams,
  WebhookListParams,
  WebhookListResponse,
  WebhookPayload,
  WebhookEvent,
  TypedWebhookPayload,
  WebhookEventDataMap,
} from '../types/webhook';
import {
  CustomerUpdateWebhookPayload,
  ProductUpdateWebhookPayload,
  ProductDeleteWebhookPayload,
  StockUpdateWebhookPayload,
  OrderUpdateWebhookPayload,
  InvoiceUpdateWebhookPayload,
  CategoryUpdateWebhookPayload,
  CategoryDeleteWebhookPayload,
  BranchUpdateWebhookPayload,
  BranchDeleteWebhookPayload,
  PriceBookUpdateWebhookPayload,
  PriceBookDeleteWebhookPayload,
  PriceBookDetailUpdateWebhookPayload,
  PriceBookDetailDeleteWebhookPayload,
} from '../types/webhook-payloads';

export class WebhookHandler {
  constructor(private client: KiotVietClient) {}

  /**
   * List webhooks with optional filtering
   * @param params Filter parameters
   */
  async list(params: WebhookListParams = {}): Promise<WebhookListResponse> {
    const response = await this.client.apiClient.get<WebhookListResponse>('/webhooks', { params });
    return response.data;
  }

  /**
   * Get a webhook by its ID
   * @param webhookId The ID of the webhook to retrieve
   */
  async getById(webhookId: number): Promise<Webhook> {
    const response = await this.client.apiClient.get<Webhook>(`/webhooks/${webhookId}`);
    return response.data;
  }

  /**
   * Create a new webhook
   * @param webhookData The webhook configuration data
   */
  async create(webhookData: WebhookCreateParams): Promise<Webhook> {
    const response = await this.client.apiClient.post<Webhook>('/webhooks', webhookData);
    return response.data;
  }

  /**
   * Update an existing webhook
   * @param webhookId The ID of the webhook to update
   * @param webhookData The webhook data to update
   */
  async update(webhookId: number, webhookData: Partial<WebhookUpdateParams>): Promise<Webhook> {
    const response = await this.client.apiClient.put<Webhook>(`/webhooks/${webhookId}`, {
      id: webhookId,
      ...webhookData,
    });
    return response.data;
  }

  /**
   * Delete a webhook
   * @param webhookId The ID of the webhook to delete
   */
  async delete(webhookId: number): Promise<void> {
    await this.client.apiClient.delete(`/webhooks/${webhookId}`);
  }

  /**
   * Enable a webhook
   * @param webhookId The ID of the webhook to enable
   */
  async enable(webhookId: number): Promise<Webhook> {
    return this.update(webhookId, { isActive: true });
  }

  /**
   * Disable a webhook
   * @param webhookId The ID of the webhook to disable
   */
  async disable(webhookId: number): Promise<Webhook> {
    return this.update(webhookId, { isActive: false });
  }

  /**
   * Verify webhook signature
   * @param payload The raw webhook payload
   * @param signature The signature from X-Hub-Signature header
   * @param secret The webhook secret
   */
  verifySignature(payload: string, signature: string, secret: string): boolean {
    const expectedSignature = createHmac('sha256', secret).update(payload).digest('hex');

    return signature === expectedSignature;
  }

  /**
   * Parse and verify webhook payload
   * @param payload The raw webhook payload string
   * @param signature The signature from X-Hub-Signature header
   * @param secret The webhook secret
   */
  parseWebhookPayload<T = any>(payload: string, signature: string, secret: string): WebhookPayload<T> {
    if (!this.verifySignature(payload, signature, secret)) {
      throw new Error('Invalid webhook signature');
    }

    return JSON.parse(payload) as WebhookPayload<T>;
  }

  /**
   * Parse and verify a webhook payload with automatic type casting based on the event type
   * @param payload The raw webhook payload string
   * @param signature The signature from X-Hub-Signature header
   * @param secret The webhook secret
   */
  parseTypedWebhookPayload<E extends WebhookEvent>(
    payload: string,
    signature: string,
    secret: string,
    expectedEvent: E,
  ): TypedWebhookPayload<E> {
    if (!this.verifySignature(payload, signature, secret)) {
      throw new Error('Invalid webhook signature');
    }

    const data = JSON.parse(payload);
    if (data.event !== expectedEvent) {
      throw new Error(`Expected ${expectedEvent} event but got ${data.event}`);
    }

    return data as TypedWebhookPayload<E>;
  }

  /**
   * Parse and verify customer update webhook payload
   * @param payload The raw webhook payload string
   * @param signature The signature from X-Hub-Signature header
   * @param secret The webhook secret
   */
  parseCustomerUpdateWebhook(
    payload: string,
    signature: string,
    secret: string,
  ): TypedWebhookPayload<WebhookEvent.CustomerUpdated> {
    return this.parseTypedWebhookPayload(payload, signature, secret, WebhookEvent.CustomerUpdated);
  }

  /**
   * Parse and verify product update webhook payload
   * @param payload The raw webhook payload string
   * @param signature The signature from X-Hub-Signature header
   * @param secret The webhook secret
   */
  parseProductUpdateWebhook(
    payload: string,
    signature: string,
    secret: string,
  ): TypedWebhookPayload<WebhookEvent.ProductUpdated> {
    return this.parseTypedWebhookPayload(payload, signature, secret, WebhookEvent.ProductUpdated);
  }

  /**
   * Parse and verify order update webhook payload
   * @param payload The raw webhook payload string
   * @param signature The signature from X-Hub-Signature header
   * @param secret The webhook secret
   */
  parseOrderUpdateWebhook(
    payload: string,
    signature: string,
    secret: string,
  ): TypedWebhookPayload<WebhookEvent.OrderUpdated> {
    return this.parseTypedWebhookPayload(payload, signature, secret, WebhookEvent.OrderUpdated);
  }

  /**
   * Parse and verify invoice update webhook payload
   * @param payload The raw webhook payload string
   * @param signature The signature from X-Hub-Signature header
   * @param secret The webhook secret
   */
  parseInvoiceUpdateWebhook(
    payload: string,
    signature: string,
    secret: string,
  ): TypedWebhookPayload<WebhookEvent.InvoiceUpdated> {
    return this.parseTypedWebhookPayload(payload, signature, secret, WebhookEvent.InvoiceUpdated);
  }

  /**
   * Parse and verify stock update webhook payload
   * @param payload The raw webhook payload string
   * @param signature The signature from X-Hub-Signature header
   * @param secret The webhook secret
   */
  parseStockUpdateWebhook(
    payload: string,
    signature: string,
    secret: string,
  ): TypedWebhookPayload<WebhookEvent.StockUpdated> {
    return this.parseTypedWebhookPayload(payload, signature, secret, WebhookEvent.StockUpdated);
  }

  /**
   * Kiểm tra cấu trúc chung của webhook payload (trường hợp update)
   * @param payload Webhook payload dạng object (đã parse từ JSON)
   */
  validateGenericUpdatePayload(payload: any): boolean {
    if (!payload || typeof payload !== 'object') return false;
    if (typeof payload.Id !== 'string') return false;
    if (typeof payload.Attempt !== 'number') return false;
    if (!Array.isArray(payload.Notifications)) return false;

    return payload.Notifications.every((notification: any) => {
      if (!notification || typeof notification !== 'object') return false;
      if (typeof notification.Action !== 'string') return false;
      if (!Array.isArray(notification.Data)) return false;
      return true;
    });
  }

  /**
   * Kiểm tra cấu trúc của payload xóa (RemoveId)
   * @param payload Webhook payload dạng object (đã parse từ JSON)
   */
  validateDeletePayload(payload: any): boolean {
    if (!payload || typeof payload !== 'object') return false;
    if (!Array.isArray(payload.RemoveId)) return false;
    return true;
  }

  /**
   * Kiểm tra xem webhook payload có hợp lệ không và có đúng cấu trúc cho customer.update không
   * @param payload Webhook payload dạng object (đã parse từ JSON)
   */
  validateCustomerUpdatePayload(payload: any): payload is CustomerUpdateWebhookPayload {
    if (!this.validateGenericUpdatePayload(payload)) return false;

    // Kiểm tra cấu trúc riêng của customer
    return payload.Notifications.every((notification: any) => {
      return notification.Data.every((item: any) => {
        return typeof item.Id === 'number' && typeof item.Code === 'string' && typeof item.Name === 'string';
      });
    });
  }

  /**
   * Kiểm tra xem webhook payload có hợp lệ không và có đúng cấu trúc cho product.update không
   * @param payload Webhook payload dạng object (đã parse từ JSON)
   */
  validateProductUpdatePayload(payload: any): payload is ProductUpdateWebhookPayload {
    if (!this.validateGenericUpdatePayload(payload)) return false;

    // Kiểm tra cấu trúc riêng của product
    return payload.Notifications.every((notification: any) => {
      return notification.Data.every((item: any) => {
        return (
          typeof item.Id === 'number' &&
          typeof item.Code === 'string' &&
          typeof item.Name === 'string' &&
          typeof item.CategoryId === 'number'
        );
      });
    });
  }

  /**
   * Kiểm tra xem webhook payload có hợp lệ không và có đúng cấu trúc cho order.update không
   * @param payload Webhook payload dạng object (đã parse từ JSON)
   */
  validateOrderUpdatePayload(payload: any): payload is OrderUpdateWebhookPayload {
    if (!this.validateGenericUpdatePayload(payload)) return false;

    // Kiểm tra cấu trúc riêng của order
    return payload.Notifications.every((notification: any) => {
      return notification.Data.every((item: any) => {
        return (
          typeof item.Id === 'number' &&
          typeof item.Code === 'string' &&
          typeof item.PurchaseDate === 'string' &&
          typeof item.BranchId === 'number' &&
          Array.isArray(item.OrderDetails)
        );
      });
    });
  }
}
