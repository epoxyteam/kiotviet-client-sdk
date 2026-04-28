import { KiotVietClient } from '../client';
import { KiotVietListResponse, Product, ProductCreateParams, ProductUpdateParams } from '../types';

export class ProductHandler {
  constructor(private client: KiotVietClient) {}

  /**
   * List products with optional filtering
   * @param params Filter parameters (pageSize, currentItem, code, name, categoryId, etc.)
   */
  async list(params: Record<string, any> = {}): Promise<KiotVietListResponse<Product>> {
    const response = await this.client.apiClient.get<KiotVietListResponse<Product>>('/products', { params });
    return response.data;
  }

  /**
   * Get a product by its ID
   * @param productId The ID of the product to retrieve
   */
  async getById(productId: number): Promise<Product> {
    const response = await this.client.apiClient.get<Product>(`/products/${productId}`);
    return response.data;
  }

  /**
   * Create a new product
   * @param productData The product data to create
   */
  async create(productData: ProductCreateParams): Promise<Product> {
    const response = await this.client.apiClient.post<Product>('/products', productData);
    return response.data;
  }

  /**
   * Update an existing product
   * @param productId The ID of the product to update
   * @param productData The product data to update
   */
  async update(productId: number, productData: Partial<ProductUpdateParams>): Promise<Product> {
    const response = await this.client.apiClient.put<Product>(`/products/${productId}`, productData);
    return response.data;
  }

  /**
   * Delete a product
   * @param productId The ID of the product to delete
   */
  async delete(productId: number): Promise<void> {
    await this.client.apiClient.delete(`/products/${productId}`);
  }

  /**
   * Get products by category ID
   * @param categoryId The ID of the category
   * @param params Additional filter parameters
   */
  async getByCategory(categoryId: number, params: Record<string, any> = {}): Promise<KiotVietListResponse<Product>> {
    const response = await this.client.apiClient.get<KiotVietListResponse<Product>>('/products', {
      params: {
        ...params,
        categoryId,
      },
    });
    return response.data;
  }

  /**
   * Search products by name or code
   * @param query Search query (name or code)
   * @param params Additional filter parameters
   */
  async search(query: string, params: Record<string, any> = {}): Promise<KiotVietListResponse<Product>> {
    const response = await this.client.apiClient.get<KiotVietListResponse<Product>>('/products', {
      params: {
        ...params,
        name: query,
      },
    });
    return response.data;
  }

  /**
   * Get a product by its code
   * @param code The product code
   */
  async getByCode(code: string): Promise<Product> {
    const response = await this.client.apiClient.get<Product>(`/products/code/${code}`);
    return response.data;
  }

  /**
   * Get all product attributes with their distinct values
   */
  async getAttributes(): Promise<any> {
    const response = await this.client.apiClient.get('/attributes/allwithdistinctvalue');
    return response.data;
  }

  /**
   * Add multiple products at once
   * @param products Array of product data to create
   */
  async bulkCreate(products: ProductCreateParams[]): Promise<void> {
    await this.client.apiClient.post('/listaddproducts', {
      listProducts: products,
    });
  }

  /**
   * Update multiple products at once
   * @param products Array of product data to update
   */
  async bulkUpdate(products: ProductUpdateParams[]): Promise<void> {
    await this.client.apiClient.put('/listupdatedproducts', {
      listProducts: products,
    });
  }

  /**
   * Get product inventory levels across branches
   * @param params Query parameters (branchIds, lastModifiedFrom, etc)
   */
  async getInventoryLevels(params: Record<string, any> = {}): Promise<any> {
    const response = await this.client.apiClient.get('/productOnHands', { params });
    return response.data;
  }

  async getByBarcode(barcode: string): Promise<Product> {
    const response = await this.client.apiClient.get<KiotVietListResponse<Product>>('/products', {
      params: {
        barcode,
        pageSize: 1,
      },
    });

    if (!response.data.data.length) {
      throw new Error(`Product with barcode ${barcode} not found`);
    }

    return response.data.data[0];
  }
}
