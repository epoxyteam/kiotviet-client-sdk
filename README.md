# **KiotViet Retail SDK**

Một SDK được viết bằng TypeScript/JavaScript dùng để tương tác với nền tảng Public API của KiotViet. SDK này cung cấp giao diện dễ sử dụng để quản lý khách hàng, sản phẩm, đơn hàng và các tài nguyên khác trong cửa hàng bán lẻ của bạn trên hệ thống KiotViet.

![npm version](https://img.shields.io/npm/v/kiotviet-client-sdk)  
![license](https://img.shields.io/npm/l/kiotviet-client-sdk)

---

## **Tính năng nổi bật**

- 🔐 Quản lý token tự động với cơ chế xác thực bằng thông tin khách hàng (client credentials)  
- 📦 Hỗ trợ đầy đủ TypeScript với định nghĩa kiểu dữ liệu chi tiết  
- 🚀 API bất đồng bộ dựa trên Promise  
- 🛡️ Xử lý lỗi tích hợp với các loại lỗi cụ thể  
- 📝 Tài liệu đầy đủ và có ví dụ minh họa   

---

# Tài liệu API KiotViet SDK

Tài liệu này cung cấp hướng dẫn chi tiết về cách sử dụng các API có sẵn trong KiotViet Client SDK.

## Mục lục

- [Sản phẩm (Products)](#sản-phẩm-products)
- [Khách hàng (Customers)](#khách-hàng-customers)
- [Đơn hàng (Orders)](#đơn-hàng-orders)
- [Đơn đặt hàng (Purchase Orders)](#đơn-đặt-hàng-purchase-orders)
- [Danh mục (Categories)](#danh-mục-categories)
- [Hóa đơn (Invoices)](#hóa-đơn-invoices)
- [Chi nhánh (Branches)](#chi-nhánh-branches)
- [Nhà cung cấp (Suppliers)](#nhà-cung-cấp-suppliers)
- [Vouchers](#vouchers)
- [Người dùng (Users)](#người-dùng-users)
- [Báo cáo dòng tiền (Cash Flow)](#báo-cáo-dòng-tiền-cash-flow)
- [Phụ thu (Surcharges)](#phụ-thu-surcharges)
- [Webhooks](#webhooks)
- [Cài đặt (Settings)](#cài-đặt-settings)
- [Vị trí/Địa bàn (Locations)](#vị-tríđịa-bàn-locations)
- [Coupon](#coupon)
- [Thuế (Taxes)](#thuế-taxes)
- [Hóa đơn điện tử (E-Invoices)](#hóa-đơn-điện-tử-e-invoices)

Mỗi tài liệu API sẽ bao gồm:
- Danh sách đầy đủ các phương thức có sẵn
- Ví dụ chi tiết về cách sử dụng
- Cấu trúc dữ liệu và các tham số
- Ghi chú và lưu ý quan trọng

## Cách sử dụng

Để bắt đầu sử dụng SDK, trước tiên bạn cần khởi tạo client:

```typescript
import { KiotVietClient } from "kiotviet-client-sdk";

const client = new KiotVietClient({
  clientId: "your_client_id",
  clientSecret: "your_client_secret",
  retailerName: "your_retailer_name"
});
```

Sau đó bạn có thể truy cập các API tương ứng thông qua client này. Xem chi tiết trong từng tài liệu API cụ thể.

## **Xác thực**

SDK này sử dụng chuẩn OAuth 2.0 để xác thực. Bạn cần cung cấp `clientId`, `clientSecret` và `retailerName` khi khởi tạo đối tượng client.  

- `retailerName` là tên cửa hàng của bạn trên hệ thống KiotViet.  
- `clientId` và `clientSecret` được lấy từ cổng dành cho nhà phát triển (developer portal) của KiotViet.  

SDK sẽ tự động xử lý việc lấy và lưu trữ access token cho bạn.  
Access token được lưu trong bộ nhớ và sẽ được sử dụng cho tất cả các yêu cầu API.  

- Token có hiệu lực trong vòng **1 giờ** và SDK sẽ **tự động làm mới** khi token hết hạn.  
- Nếu không thể làm mới token, SDK sẽ phát sinh lỗi và bạn cần xử lý tình huống này trong ứng dụng của mình.

---

# Sản phẩm (Products)

# API Sản phẩm (Products)

## Danh sách các phương thức

1. `list(params)` - Lấy danh sách sản phẩm
2. `getById(productId)` - Lấy thông tin sản phẩm theo ID
3. `create(productData)` - Tạo sản phẩm mới
4. `update(productId, productData)` - Cập nhật sản phẩm
5. `delete(productId)` - Xóa sản phẩm
6. `getByCategory(categoryId, params)` - Lấy sản phẩm theo danh mục
7. `search(query, params)` - Tìm kiếm sản phẩm
8. `getByCode(code)` - Lấy sản phẩm theo mã
9. `getByBarcode(barcode)` - Lấy sản phẩm theo mã vạch
10. `getAttributes()` - Lấy tất cả thuộc tính sản phẩm
11. `bulkCreate(products)` - Tạo nhiều sản phẩm cùng lúc
12. `bulkUpdate(products)` - Cập nhật nhiều sản phẩm cùng lúc
13. `getInventoryLevels(params)` - Lấy thông tin tồn kho

## Chi tiết sử dụng

### 1. Lấy danh sách sản phẩm

```typescript
// Lấy danh sách với phân trang
const products = await client.products.list({
  pageSize: 20,
  currentItem: 0,
  includeInventory: true
});

// Lấy sản phẩm có lọc theo danh mục
const products = await client.products.list({
  categoryId: 123,
  pageSize: 20
});

// Lọc theo trạng thái
const products = await client.products.list({
  status: "Active",
  pageSize: 20
});
```

### 2. Tạo sản phẩm mới

```typescript
const newProduct = await client.products.create({
  code: "SP001",
  name: "Tên sản phẩm",
  categoryId: 1,
  basePrice: 100000,
  retailPrice: 150000,
  weight: 1.5,
  unit: "Cái",
  allowsSale: true,
  description: "Mô tả sản phẩm",
  attributes: [
    {
      attributeName: "Màu sắc",
      attributeValue: "Đỏ"
    }
  ]
});
```

### 3. Cập nhật sản phẩm

```typescript
const updatedProduct = await client.products.update(123, {
  name: "Tên sản phẩm mới",
  retailPrice: 200000,
  description: "Mô tả mới"
});
```

### 4. Tìm kiếm sản phẩm

```typescript
// Tìm theo tên hoặc mã
const searchResults = await client.products.search("keyword", {
  pageSize: 20
});

// Tìm theo mã vạch
const product = await client.products.getByBarcode("8938505040059");

// Tìm theo mã sản phẩm
const product = await client.products.getByCode("SP001");
```

### 5. Quản lý hàng loạt

```typescript
// Tạo nhiều sản phẩm
await client.products.bulkCreate([
  {
    code: "SP001",
    name: "Sản phẩm 1",
    retailPrice: 100000
  },
  {
    code: "SP002",
    name: "Sản phẩm 2",
    retailPrice: 200000
  }
]);

// Cập nhật nhiều sản phẩm
await client.products.bulkUpdate([
  {
    id: 1,
    retailPrice: 150000
  },
  {
    id: 2,
    retailPrice: 250000
  }
]);
```

## Cấu trúc dữ liệu

### Product (Sản phẩm)

```typescript
interface Product {
  id: number;                  // ID sản phẩm
  code: string;               // Mã sản phẩm
  name: string;               // Tên sản phẩm
  categoryId: number;         // ID danh mục
  basePrice: number;          // Giá gốc
  retailPrice: number;        // Giá bán lẻ
  weight?: number;            // Khối lượng
  unit?: string;             // Đơn vị tính
  allowsSale: boolean;        // Cho phép bán
  status: "Active" | "Inactive"; // Trạng thái
  description?: string;       // Mô tả
  attributes?: ProductAttribute[]; // Thuộc tính
  inventories?: ProductInventory[]; // Thông tin tồn kho
  modifiedDate: string;       // Ngày cập nhật
  createdDate: string;        // Ngày tạo
}

interface ProductAttribute {
  attributeName: string;      // Tên thuộc tính
  attributeValue: string;     // Giá trị thuộc tính
}

interface ProductInventory {
  branchId: number;          // ID chi nhánh
  branchName: string;        // Tên chi nhánh
  onHand: number;           // Tồn kho thực tế
  reserved: number;         // Số lượng đã đặt
  available: number;        // Số lượng có thể bán
}
```

### ProductCreateParams (Tham số tạo sản phẩm)

```typescript
interface ProductCreateParams {
  code: string;              // Mã sản phẩm (bắt buộc)
  name: string;              // Tên sản phẩm (bắt buộc)
  categoryId: number;        // ID danh mục (bắt buộc)
  basePrice?: number;        // Giá gốc
  retailPrice: number;       // Giá bán lẻ (bắt buộc)
  weight?: number;           // Khối lượng
  unit?: string;            // Đơn vị tính
  allowsSale?: boolean;      // Cho phép bán
  description?: string;      // Mô tả
  attributes?: ProductAttribute[]; // Thuộc tính
}
```

### ProductUpdateParams (Tham số cập nhật sản phẩm)

```typescript
interface ProductUpdateParams extends Partial<ProductCreateParams> {
  id: number;               // ID sản phẩm cần cập nhật
}
```

## Ghi chú

1. Khi sử dụng phương thức `list()`:
   - Mặc định `pageSize` là 20
   - `currentItem` bắt đầu từ 0
   - Có thể bổ sung các tham số lọc khác như `categoryId`, `status`, `modifiedFrom`, v.v.

2. Khi tạo sản phẩm:
   - `code` phải là duy nhất trong hệ thống
   - `retailPrice` không được nhỏ hơn `basePrice`
   - `attributes` là tùy chọn nhưng nên tuân theo cấu trúc chuẩn

3. Quản lý tồn kho:
   - Sử dụng `getInventoryLevels()` để lấy thông tin tồn kho theo chi nhánh
   - Thông tin tồn kho tự động cập nhật khi có giao dịch
   - Có thể lọc theo `branchIds` để lấy tồn kho của một số chi nhánh cụ thể

---

# Khách hàng (Customers)

# API Khách hàng (Customers)

## Danh sách các phương thức

1. `list(params)` - Lấy danh sách khách hàng
2. `getById(customerId)` - Lấy thông tin khách hàng theo ID
3. `getByCode(code)` - Lấy thông tin khách hàng theo mã
4. `create(customerData)` - Tạo khách hàng mới
5. `search(query, params)` - Tìm kiếm khách hàng
6. `getByGroup(groupId, params)` - Lấy khách hàng theo nhóm
7. `getByContactNumber(contactNumber)` - Tìm khách hàng theo số điện thoại
8. `bulkCreate(customers)` - Tạo nhiều khách hàng cùng lúc
9. `bulkUpdate(customers)` - Cập nhật nhiều khách hàng cùng lúc
10. `listGroups(params)` - Lấy danh sách nhóm khách hàng

## Chi tiết sử dụng

### 1. Lấy danh sách khách hàng

```typescript
// Lấy danh sách với phân trang
const customers = await client.customers.list({
  pageSize: 20,
  currentItem: 0,
  includeCustomerGroup: true
});

// Lọc theo thời gian cập nhật
const customers = await client.customers.list({
  lastModifiedFrom: "2024-01-01",
  pageSize: 20
});

// Sắp xếp kết quả
const customers = await client.customers.list({
  orderBy: "name",
  orderDirection: "ASC",
  pageSize: 20
});
```

### 2. Tạo khách hàng mới

```typescript
const newCustomer = await client.customers.create({
  name: "Nguyễn Văn A",           // Bắt buộc
  contactNumber: "0901234567",
  email: "nguyenvana@email.com",
  gender: true,                    // true: Nam, false: Nữ
  birthDate: "1990-01-01",
  address: "123 Đường ABC",
  locationName: "Phường XYZ",
  wardName: "Quận 1",
  organization: "Công ty ABC",
  taxCode: "0123456789",
  groupIds: [1, 2]                // ID các nhóm khách hàng
});
```

### 3. Tìm kiếm khách hàng

```typescript
// Tìm theo từ khóa (tên, số điện thoại, mã)
const searchResults = await client.customers.search("0901234567", {
  pageSize: 20
});

// Tìm theo số điện thoại chính xác
const customer = await client.customers.getByContactNumber("0901234567");

// Tìm theo nhóm khách hàng
const groupCustomers = await client.customers.getByGroup(1, {
  pageSize: 20
});
```

### 4. Lấy khách hàng theo mã

```typescript
// Tài liệu: 2.6.2. GET /customers/code/{code}
const customer = await client.customers.getByCode("KH0001");
```

### 5. Tạo/cập nhật nhiều khách hàng cùng lúc

```typescript
// Tạo nhiều khách hàng
// Tài liệu: 2.6.6. POST /listaddcutomers
await client.customers.bulkCreate([
  { name: "Nguyễn Văn A", contactNumber: "0901111111" },
  { name: "Trần Thị B", contactNumber: "0902222222" }
]);

// Cập nhật nhiều khách hàng
// Tài liệu: 2.6.7. PUT /listupdatecustomers
await client.customers.bulkUpdate([
  { id: 1, contactNumber: "0903333333" },
  { id: 2, email: "tranthib@email.com" }
]);
```

### 6. Lấy danh sách nhóm khách hàng

```typescript
// Tài liệu: 2.13.1. GET /customers/group
const groups = await client.customers.listGroups();
// groups => { total: number, data: CustomerGroup[] }

interface CustomerGroup {
  id: number;              // Id nhóm khách hàng
  name: string;            // Tên nhóm khách hàng
  description?: string;    // Ghi chú
  createdDate: string;     // Ngày tạo
  createdBy: number;       // Id người tạo
  retailerId: number;      // Id gian hàng
  discount?: number;       // Giảm giá
  customerGroupDetails?: Array<{
    id: number;
    customerId: number;
    groupId: number;
  }>;
}
```

## Cấu trúc dữ liệu

### Customer (Khách hàng)

```typescript
interface Customer {
  id: number;                // ID khách hàng
  code: string;             // Mã khách hàng
  name: string;             // Tên khách hàng
  type?: number;            // Loại khách hàng (0: Cá nhân, 1: Doanh nghiệp)
  gender?: boolean;         // Giới tính (true: Nam, false: Nữ)
  birthDate?: string;       // Ngày sinh
  contactNumber?: string;   // Số điện thoại
  address?: string;         // Địa chỉ
  locationName?: string;    // Tên địa điểm (phường/xã)
  wardName?: string;        // Tên quận/huyện
  email?: string;           // Email
  organization?: string;    // Tên tổ chức/công ty
  comments?: string;        // Ghi chú
  taxCode?: string;         // Mã số thuế
  debt: number;             // Công nợ
  totalInvoiced?: number;   // Tổng số hóa đơn
  totalPoint?: number;      // Tổng điểm tích lũy
  totalRevenue?: number;    // Tổng doanh thu
  retailerId: number;       // ID nhà bán lẻ
  modifiedDate?: string;    // Ngày cập nhật
  createdDate: string;      // Ngày tạo
  rewardPoint?: number;     // Điểm thưởng
  psidFacebook?: number;    // ID Facebook
  groups?: string;          // Chuỗi nhóm khách hàng
  branchId?: number;        // ID chi nhánh
  createdBy?: string;       // Người tạo
  isActive?: boolean;       // Trạng thái hoạt động
  customerGroupDetails?: CustomerGroupDetails[]; // Chi tiết nhóm khách hàng
}

interface CustomerGroupDetails {
  id: number;              // ID chi tiết nhóm
  customerId: number;      // ID khách hàng
  groupId: number;         // ID nhóm
}
```

### CustomerCreateParams (Tham số tạo khách hàng)

```typescript
interface CustomerCreateParams {
  code?: string;           // Mã khách hàng (tự động nếu không nhập)
  name: string;            // Tên khách hàng (bắt buộc)
  gender?: boolean;        // Giới tính
  birthDate?: string;      // Ngày sinh
  contactNumber?: string;  // Số điện thoại
  address?: string;        // Địa chỉ
  locationName?: string;   // Tên địa điểm
  wardName?: string;       // Tên quận/huyện
  email?: string;          // Email
  comments?: string;       // Ghi chú
  organization?: string;   // Tên tổ chức
  taxCode?: string;        // Mã số thuế
  groupIds?: number[];     // Danh sách ID nhóm
  branchId?: number;       // ID chi nhánh
}
```

### CustomerListParams (Tham số lấy danh sách)

```typescript
interface CustomerListParams {
  code?: string;           // Lọc theo mã
  name?: string;           // Lọc theo tên
  contactNumber?: string;  // Lọc theo SĐT
  lastModifiedFrom?: string; // Từ ngày cập nhật
  pageSize?: number;       // Số lượng trên trang
  currentItem?: number;    // Vị trí bắt đầu
  orderBy?: string;        // Sắp xếp theo trường
  orderDirection?: 'ASC' | 'DESC'; // Hướng sắp xếp
  includeRemoveIds?: boolean; // Bao gồm đã xóa
  includeTotal?: boolean;  // Bao gồm tổng số
  includeCustomerGroup?: boolean; // Bao gồm nhóm
  birthDate?: string;      // Lọc theo ngày sinh
  groupId?: number;        // Lọc theo nhóm
  includeCustomerSocial?: boolean; // Bao gồm MXH
}
```

## Ghi chú

1. Khi tạo khách hàng:
   - Trường `name` là bắt buộc
   - `code` sẽ được tự động tạo nếu không cung cấp
   - Nên cung cấp `contactNumber` hoặc `email` để dễ dàng tìm kiếm sau này

2. Khi tìm kiếm:
   - Có thể tìm theo tên, số điện thoại, mã khách hàng
   - Tìm kiếm không phân biệt chữ hoa/thường
   - Hỗ trợ tìm kiếm một phần của từ khóa

3. Nhóm khách hàng:
   - Một khách hàng có thể thuộc nhiều nhóm
   - Sử dụng `groupIds` khi tạo/cập nhật để quản lý nhóm
   - Có thể lấy danh sách theo nhóm với `getByGroup()`

4. Phân trang và sắp xếp:
   - Mặc định `pageSize` là 20
   - `currentItem` bắt đầu từ 0
   - Có thể sắp xếp theo nhiều trường khác nhau
   - Hướng sắp xếp: 'ASC' (tăng dần) hoặc 'DESC' (giảm dần)

---

# Đơn hàng (Orders)

# API Đơn hàng (Orders)

## Danh sách các phương thức

1. `list(params)` - Lấy danh sách đơn hàng
2. `getById(orderId)` - Lấy thông tin đơn hàng theo ID
3. `create(orderData)` - Tạo đơn hàng mới
4. `update(orderId, orderData)` - Cập nhật đơn hàng
5. `cancel(orderId, reason)` - Hủy đơn hàng
6. `getByCode(code)` - Lấy đơn hàng theo mã
7. `delete(orderId, isVoidPayment)` - Xóa đơn hàng
8. `getByDateRange(fromDate, toDate, params)` - Lấy đơn hàng theo khoảng thời gian
9. `getByCustomer(customerIdentifier, params)` - Lấy đơn hàng theo khách hàng

## Chi tiết sử dụng

### 1. Tạo đơn hàng mới

```typescript
const newOrder = await client.orders.create({
  branchId: 1,                    // ID chi nhánh (bắt buộc)
  customerId: 123,                // ID khách hàng (tùy chọn)
  purchaseDate: "2024-04-05",    // Ngày mua hàng
  discount: 10000,                // Giảm giá
  makeInvoice: true,             // Tạo hóa đơn
  description: "Ghi chú đơn hàng",
  orderDetails: [                 // Chi tiết đơn hàng (bắt buộc)
    {
      productId: 1,
      productCode: "SP001",
      productName: "Sản phẩm 1",
      quantity: 2,
      price: 100000,
      discount: 5000,
      isMaster: true
    }
  ],
  orderDelivery: {               // Thông tin giao hàng (tùy chọn)
    receiver: "Nguyễn Văn A",
    contactNumber: "0901234567",
    address: "123 Đường ABC",
    locationName: "Phường XYZ",
    wardName: "Quận 1"
  }
});
```

### 2. Cập nhật đơn hàng

```typescript
const updatedOrder = await client.orders.update(123, {
  discount: 20000,
  description: "Ghi chú mới",
  orderDetails: [
    {
      productId: 1,
      quantity: 3,
      price: 100000
    }
  ]
});
```

### 3. Lấy danh sách đơn hàng

```typescript
// Lấy danh sách với phân trang
const orders = await client.orders.list({
  pageSize: 20,
  currentItem: 0,
  includePayment: true,
  includeOrderDelivery: true
});

// Lọc theo trạng thái
const orders = await client.orders.list({
  status: [OrderStatus.Processing, OrderStatus.Completed],
  pageSize: 20
});

// Lọc theo chi nhánh
const orders = await client.orders.list({
  branchIds: [1, 2],
  pageSize: 20
});
```

### 4. Tìm kiếm đơn hàng

```typescript
// Theo khoảng thời gian
const orders = await client.orders.getByDateRange(
  "2024-01-01",
  "2024-01-31",
  { pageSize: 20 }
);

// Theo khách hàng
const orders = await client.orders.getByCustomer(
  "0901234567",  // Có thể là số điện thoại hoặc mã khách hàng
  { pageSize: 20 }
);

// Theo mã đơn hàng
const order = await client.orders.getByCode("DH001");
```

### 5. Hủy và xóa đơn hàng

```typescript
// Hủy đơn hàng
await client.orders.cancel(123, "Lý do hủy đơn");

// Xóa đơn hàng
await client.orders.delete(123, true); // true: hủy thanh toán liên quan
```

## Cấu trúc dữ liệu

### Order (Đơn hàng)

```typescript
interface Order {
  id: number;                 // ID đơn hàng
  code: string;               // Mã đơn hàng
  purchaseDate: string;       // Ngày mua hàng
  branchId: number;           // ID chi nhánh
  branchName: string;         // Tên chi nhánh
  customerId?: number;        // ID khách hàng
  customerCode?: string;      // Mã khách hàng
  customerName?: string;      // Tên khách hàng
  total: number;             // Tổng tiền
  totalPayment: number;      // Tổng thanh toán
  discount?: number;         // Giảm giá
  discountRatio?: number;    // Tỷ lệ giảm giá
  description?: string;      // Ghi chú
  status: number;            // Mã trạng thái
  statusValue: string;       // Tên trạng thái
  usingCod: boolean;         // Sử dụng COD
  orderDetails: OrderProduct[]; // Chi tiết đơn hàng
  orderDelivery?: OrderDelivery; // Thông tin giao hàng
  payments?: OrderPayment[]; // Thông tin thanh toán
  createdDate: string;      // Ngày tạo
  modifiedDate?: string;    // Ngày cập nhật
}
```

### OrderProduct (Chi tiết sản phẩm)

```typescript
interface OrderProduct {
  productId: number;         // ID sản phẩm
  productCode: string;       // Mã sản phẩm
  productName: string;       // Tên sản phẩm
  quantity: number;         // Số lượng
  price: number;           // Giá
  discount?: number;       // Giảm giá
  discountRatio?: number;  // Tỷ lệ giảm giá
  note?: string;          // Ghi chú
  isMaster: boolean;      // Là sản phẩm chính
}
```

### OrderListParams (Tham số lấy danh sách)

```typescript
interface OrderListParams {
  branchIds?: number[];    // Lọc theo chi nhánh
  customerIds?: number[];  // Lọc theo khách hàng
  customerCode?: string;   // Lọc theo mã khách hàng
  status?: number[];      // Lọc theo trạng thái
  includePayment?: boolean; // Bao gồm thông tin thanh toán
  includeOrderDelivery?: boolean; // Bao gồm thông tin giao hàng
  lastModifiedFrom?: string; // Từ ngày cập nhật
  pageSize?: number;      // Số lượng trên trang
  currentItem?: number;   // Vị trí bắt đầu
  orderBy?: string;      // Sắp xếp theo trường
  orderDirection?: 'ASC' | 'DESC'; // Hướng sắp xếp
  saleChannelId?: number; // ID kênh bán hàng
}
```

### Trạng thái đơn hàng

```typescript
enum OrderStatus {
  Draft = 1,        // Nháp
  Processing = 2,   // Đang xử lý
  Completed = 3,    // Hoàn thành
  Cancelled = 4,    // Đã hủy
}
```

## Ghi chú

1. Khi tạo đơn hàng:
   - `branchId` và `orderDetails` là bắt buộc
   - Nếu có `customerId`, hệ thống sẽ lấy thông tin khách hàng tự động
   - Có thể tạo khách hàng mới đồng thời với đơn hàng bằng cách cung cấp `customer`

2. Thanh toán và giao hàng:
   - Sử dụng `orderDelivery` để thêm thông tin giao hàng
   - Có thể kiểm tra thông tin thanh toán qua `payments`
   - Hỗ trợ thanh toán COD (`usingCod`)

3. Trạng thái đơn hàng:
   - Mặc định là `Draft` khi tạo mới
   - Chỉ có thể hủy đơn hàng ở trạng thái `Draft` hoặc `Processing`
   - Xem `OrderStatus` để biết các trạng thái có thể

4. Phân trang và sắp xếp:
   - Mặc định `pageSize` là 20
   - `currentItem` bắt đầu từ 0
   - Có thể sắp xếp theo nhiều trường khác nhau

---

# Đơn đặt hàng (Purchase Orders)

# API Đơn đặt hàng (Purchase Orders)

## Danh sách các phương thức

1. `list(params)` - Lấy danh sách đơn đặt hàng
2. `getById(purchaseOrderId)` - Lấy thông tin đơn đặt hàng theo ID
3. `create(purchaseOrderData)` - Tạo đơn đặt hàng mới
4. `update(purchaseOrderId, purchaseOrderData)` - Cập nhật đơn đặt hàng
5. `cancel(purchaseOrderId, reason)` - Hủy đơn đặt hàng
6. `delete(purchaseOrderId, isVoidPayment)` - Xóa phiếu nhập hàng
7. `getByDateRange(fromDate, toDate, params)` - Lấy đơn đặt hàng theo khoảng thời gian
8. `getBySupplier(supplierCode, params)` - Lấy đơn đặt hàng theo nhà cung cấp

## Chi tiết sử dụng

### 1. Tạo đơn đặt hàng mới

```typescript
const newPurchaseOrder = await client.purchaseOrders.create({
  branchId: 1,                    // ID chi nhánh (bắt buộc)
  supplierId: 123,                // ID nhà cung cấp
  purchaseDate: "2024-04-05",    // Ngày đặt hàng
  expectedDeliveryDate: "2024-04-10", // Ngày dự kiến nhận
  description: "Đơn hàng tháng 4",
  discount: 50000,                // Giảm giá
  purchaseOrderDetails: [         // Chi tiết đơn hàng (bắt buộc)
    {
      productId: 1,
      productCode: "SP001",
      quantity: 10,
      price: 100000,
      discount: 5000,
      note: "Hàng mới",
      batches: [                  // Thông tin lô hàng
        {
          batchName: "L001",
          quantity: 5,
          expiredDate: "2024-12-31"
        }
      ]
    }
  ],
  supplier: {                     // Thông tin nhà cung cấp mới (nếu chưa có)
    name: "Nhà cung cấp ABC",
    contactNumber: "0901234567",
    email: "abc@supplier.com"
  },
  payments: [                     // Thanh toán
    {
      amount: 950000,
      method: "Cash"
    }
  ]
});
```

### 2. Lấy danh sách đơn đặt hàng

```typescript
// Lấy danh sách với phân trang
const orders = await client.purchaseOrders.list({
  pageSize: 20,
  currentItem: 0,
  includePayment: true
});

// Lọc theo chi nhánh và trạng thái
const orders = await client.purchaseOrders.list({
  branchIds: [1, 2],
  status: [PurchaseOrderStatus.Processing],
  pageSize: 20
});

// Lọc theo khoảng thời gian
const orders = await client.purchaseOrders.getByDateRange(
  "2024-01-01",
  "2024-01-31",
  { pageSize: 20 }
);

// Lọc theo nhà cung cấp
const orders = await client.purchaseOrders.getBySupplier(
  "NCC001",
  { pageSize: 20 }
);
```

### 3. Cập nhật đơn đặt hàng

```typescript
const updatedOrder = await client.purchaseOrders.update(123, {
  expectedDeliveryDate: "2024-04-15",
  description: "Cập nhật ngày giao",
  purchaseOrderDetails: [
    {
      productId: 1,
      quantity: 15,
      price: 100000
    }
  ]
});
```

### 4. Hủy đơn đặt hàng

```typescript
await client.purchaseOrders.cancel(123, "Nhà cung cấp hết hàng");
```

### 5. Xóa phiếu nhập hàng

```typescript
// Tài liệu: 2.15.5. DELETE /purchaseorders?id={Id}&IsVoidPayment=true
// Xóa không hủy phiếu thanh toán (mặc định)
await client.purchaseOrders.delete(123);

// Xóa và hủy phiếu thanh toán gắn kèm
await client.purchaseOrders.delete(123, true);
```

## Cấu trúc dữ liệu

### PurchaseOrder (Đơn đặt hàng)

```typescript
interface PurchaseOrder {
  id: number;              // ID đơn hàng
  code: string;            // Mã đơn hàng
  documentCode?: string;   // Mã chứng từ
  purchaseDate: string;    // Ngày đặt hàng
  expectedDeliveryDate?: string; // Ngày dự kiến nhận
  deliveryDate?: string;   // Ngày nhận thực tế
  branchId: number;        // ID chi nhánh
  branchName: string;      // Tên chi nhánh
  supplierId?: number;     // ID nhà cung cấp
  supplierCode?: string;   // Mã nhà cung cấp
  supplierName?: string;   // Tên nhà cung cấp
  total: number;           // Tổng tiền
  totalPayment: number;    // Tổng thanh toán
  discount?: number;       // Giảm giá
  discountRatio?: number;  // Tỷ lệ giảm
  description?: string;    // Ghi chú
  status: number;          // Mã trạng thái
  statusValue: string;     // Tên trạng thái
  purchaseOrderDetails: PurchaseOrderProduct[]; // Chi tiết đơn hàng
  payments?: PaymentDetail[]; // Thanh toán
  createdDate: string;     // Ngày tạo
  modifiedDate?: string;   // Ngày cập nhật
}
```

### PurchaseOrderProduct (Chi tiết sản phẩm)

```typescript
interface PurchaseOrderProduct {
  productId: number;       // ID sản phẩm
  productCode: string;     // Mã sản phẩm
  productName: string;     // Tên sản phẩm
  quantity: number;        // Số lượng
  price: number;          // Giá
  discount?: number;      // Giảm giá
  discountRatio?: number; // Tỷ lệ giảm
  note?: string;         // Ghi chú
  receivedQuantity?: number; // Số lượng đã nhận
  serialNumbers?: string[]; // Số serial
  batches?: {             // Thông tin lô
    batchName: string;    // Tên lô
    quantity: number;     // Số lượng
    expiredDate: string;  // Ngày hết hạn
  }[];
}
```

### Trạng thái đơn hàng

```typescript
enum PurchaseOrderStatus {
  Draft = 1,        // Nháp
  Processing = 2,   // Đang xử lý
  Completed = 3,    // Hoàn thành
  Cancelled = 4     // Đã hủy
}
```

## Ghi chú

1. Khi tạo đơn hàng:
   - `branchId` và `purchaseOrderDetails` là bắt buộc
   - Có thể tạo nhà cung cấp mới đồng thời bằng cách cung cấp thông tin trong `supplier`
   - Hỗ trợ quản lý lô hàng và số serial cho sản phẩm

2. Quản lý lô hàng:
   - Mỗi sản phẩm có thể có nhiều lô khác nhau
   - Mỗi lô có thể có số lượng và ngày hết hạn riêng
   - Theo dõi số lượng đã nhận qua `receivedQuantity`

3. Thanh toán:
   - Hỗ trợ nhiều phương thức thanh toán
   - Có thể thanh toán một phần hoặc toàn bộ
   - Theo dõi lịch sử thanh toán qua `payments`

4. Tìm kiếm và lọc:
   - Hỗ trợ tìm kiếm theo nhiều tiêu chí
   - Lọc theo trạng thái, chi nhánh, nhà cung cấp
   - Tìm kiếm theo khoảng thời gian

---

# Danh mục (Categories)

# API Danh mục (Categories)

## Danh sách các phương thức

1. `list(params)` - Lấy danh sách danh mục
2. `getById(categoryId)` - Lấy thông tin danh mục theo ID
3. `create(categoryData)` - Tạo danh mục mới
4. `update(categoryId, categoryData)` - Cập nhật danh mục
5. `delete(categoryId)` - Xóa danh mục
6. `getHierarchical(params)` - Lấy cấu trúc danh mục dạng cây

## Chi tiết sử dụng

### 1. Lấy danh sách danh mục

```typescript
// Lấy danh sách với phân trang
const categories = await client.categories.list({
  pageSize: 20,
  currentItem: 0
});

// Sắp xếp kết quả
const categories = await client.categories.list({
  orderBy: "categoryName",
  orderDirection: "ASC"
});

// Lấy cấu trúc danh mục dạng cây
const hierarchicalCategories = await client.categories.getHierarchical({
  pageSize: 100
});
```

### 2. Tạo danh mục mới

```typescript
// Tạo danh mục gốc
const newCategory = await client.categories.create({
  categoryName: "Điện thoại di động",
  description: "Danh mục các loại điện thoại di động",
  rank: 1
});

// Tạo danh mục con
const newSubCategory = await client.categories.create({
  categoryName: "iPhone",
  parentId: 1, // ID của danh mục cha
  description: "Danh mục điện thoại iPhone",
  rank: 1
});
```

### 3. Cập nhật danh mục

```typescript
const updatedCategory = await client.categories.update(123, {
  categoryName: "Tên danh mục mới",
  description: "Mô tả mới",
  rank: 2
});
```

### 4. Xóa danh mục

```typescript
await client.categories.delete(123);
```

## Cấu trúc dữ liệu

### Category (Danh mục)

```typescript
interface Category {
  categoryId: number;        // ID danh mục
  categoryName: string;      // Tên danh mục
  parentId: number | null;   // ID danh mục cha (null nếu là danh mục gốc)
  hasChild?: boolean;        // Có danh mục con hay không
  description?: string;      // Mô tả
  retailerId: number;        // ID nhà bán lẻ
  rank?: number;            // Thứ tự sắp xếp
  isDeleted?: boolean;      // Đã xóa chưa
  modifiedDate: string;     // Ngày cập nhật
  createdDate: string;      // Ngày tạo
}
```

### CategoryCreateParams (Tham số tạo danh mục)

```typescript
interface CategoryCreateParams {
  categoryName: string;     // Tên danh mục (bắt buộc)
  parentId?: number;        // ID danh mục cha
  description?: string;     // Mô tả
  rank?: number;           // Thứ tự sắp xếp
}
```

### CategoryListParams (Tham số lấy danh sách)

```typescript
interface CategoryListParams {
  lastModifiedFrom?: string;   // Từ ngày cập nhật
  pageSize?: number;          // Số lượng trên trang
  currentItem?: number;       // Vị trí bắt đầu
  orderBy?: string;          // Sắp xếp theo trường
  orderDirection?: 'ASC' | 'DESC'; // Hướng sắp xếp
  hierarchicalData?: boolean;  // Lấy dạng cây
  includeRemoveIds?: boolean; // Bao gồm đã xóa
}
```

## Ghi chú

1. Cấu trúc phân cấp:
   - Danh mục có thể được tổ chức theo cấu trúc cha-con
   - Sử dụng `parentId` để xác định mối quan hệ
   - `getHierarchical()` trả về cấu trúc dạng cây đầy đủ

2. Thứ tự sắp xếp:
   - Sử dụng trường `rank` để sắp xếp danh mục
   - Giá trị càng nhỏ thì hiển thị càng cao
   - Có thể cập nhật `rank` để thay đổi thứ tự

3. Xóa danh mục:
   - Khi xóa danh mục, tất cả sản phẩm trong danh mục sẽ không hiển thị
   - Nên đảm bảo không có sản phẩm trong danh mục trước khi xóa
   - Có thể lấy danh mục đã xóa bằng `includeRemoveIds: true`

4. Phân trang và sắp xếp:
   - Mặc định `pageSize` là 20
   - `currentItem` bắt đầu từ 0
   - Có thể sắp xếp theo `categoryName`, `createdDate`, `modifiedDate`

---

# Hóa đơn (Invoices)

# API Hóa đơn (Invoices)

## Danh sách các phương thức

1. `list(params)` - Lấy danh sách hóa đơn
2. `getById(invoiceId)` - Lấy thông tin hóa đơn theo ID
3. `create(invoiceData)` - Tạo hóa đơn mới
4. `update(invoiceId, invoiceData)` - Cập nhật hóa đơn
5. `cancel(invoiceId, reason)` - Hủy hóa đơn
6. `delete(invoiceId, isVoidPayment)` - Xóa/hủy bỏ hóa đơn
7. `getByDateRange(fromDate, toDate, params)` - Lấy hóa đơn theo khoảng thời gian
8. `getByCustomer(customerIdentifier, params)` - Lấy hóa đơn theo khách hàng
9. `getByOrder(orderId, params)` - Lấy hóa đơn theo đơn hàng
10. `getByCode(code)` - Lấy hóa đơn theo mã

## Chi tiết sử dụng

### 1. Tạo hóa đơn mới

```typescript
const newInvoice = await client.invoices.create({
  branchId: 1,                    // ID chi nhánh (bắt buộc)
  purchaseDate: "2024-04-05",    // Ngày mua hàng
  customerId: 123,                // ID khách hàng
  discount: 10000,                // Giảm giá
  totalPayment: 990000,          // Tổng thanh toán (bắt buộc)
  method: "Cash",                 // Phương thức thanh toán
  usingCod: false,               // Sử dụng COD
  invoiceDetails: [              // Chi tiết hóa đơn (bắt buộc)
    {
      productId: 1,
      productCode: "SP001",
      productName: "Sản phẩm 1",
      quantity: 2,
      price: 500000,
      discount: 5000
    }
  ],
  deliveryDetail: {              // Thông tin giao hàng (tùy chọn)
    receiver: "Nguyễn Văn A",
    contactNumber: "0901234567",
    address: "123 Đường ABC",
    locationName: "Phường XYZ",
    wardName: "Quận 1"
  }
});
```

### 2. Lấy danh sách hóa đơn

```typescript
// Lấy danh sách với phân trang
const invoices = await client.invoices.list({
  pageSize: 20,
  currentItem: 0,
  includePayment: true,
  includeInvoiceDelivery: true
});

// Lọc theo chi nhánh và trạng thái
const invoices = await client.invoices.list({
  branchIds: [1, 2],
  status: [InvoiceStatus.Completed],
  pageSize: 20
});

// Lọc theo khoảng thời gian
const invoices = await client.invoices.getByDateRange(
  "2024-01-01",
  "2024-01-31",
  { pageSize: 20 }
);
```

### 3. Tìm kiếm hóa đơn

```typescript
// Theo khách hàng
const invoices = await client.invoices.getByCustomer(
  "0901234567",  // Số điện thoại hoặc mã khách hàng
  { pageSize: 20 }
);

// Theo đơn hàng
const invoices = await client.invoices.getByOrder(123);

// Theo mã hóa đơn
const invoice = await client.invoices.getByCode("HD001");
```

### 4. Hủy và xóa hóa đơn

```typescript
// Hủy hóa đơn
await client.invoices.cancel(123, "Lý do hủy hóa đơn");

// Xóa hóa đơn và hủy thanh toán liên quan
await client.invoices.delete(123, true);
```

## Cấu trúc dữ liệu

### Invoice (Hóa đơn)

```typescript
interface Invoice {
  id: number;               // ID hóa đơn
  code: string;             // Mã hóa đơn
  orderCode?: string;       // Mã đơn hàng
  purchaseDate: string;     // Ngày mua
  branchId: number;         // ID chi nhánh
  branchName: string;       // Tên chi nhánh
  customerId?: number;      // ID khách hàng
  customerCode?: string;    // Mã khách hàng
  customerName?: string;    // Tên khách hàng
  total: number;           // Tổng tiền
  totalPayment: number;    // Tổng thanh toán
  discount?: number;       // Giảm giá
  discountRatio?: number;  // Tỷ lệ giảm
  description?: string;    // Ghi chú
  status: number;          // Mã trạng thái
  statusValue: string;     // Tên trạng thái
  usingCod: boolean;       // Sử dụng COD
  invoiceDetails: InvoiceDetail[]; // Chi tiết hóa đơn
  payments: InvoicePayment[]; // Thanh toán
  invoiceDelivery?: InvoiceDelivery; // Thông tin giao hàng
  createdDate: string;    // Ngày tạo
  modifiedDate?: string;  // Ngày cập nhật
}
```

### Phương thức thanh toán

```typescript
enum PaymentMethod {
  Cash = 1,           // Tiền mặt
  Card = 2,           // Thẻ
  BankTransfer = 3,   // Chuyển khoản
  MobilePayment = 4,  // Thanh toán di động
  Mixed = 5           // Kết hợp
}
```

### Trạng thái hóa đơn

```typescript
enum InvoiceStatus {
  Draft = 1,        // Nháp
  Processing = 2,   // Đang xử lý
  Completed = 3,    // Hoàn thành
  Cancelled = 4     // Đã hủy
}
```

## Ghi chú

1. Khi tạo hóa đơn:
   - `branchId`, `totalPayment` và `invoiceDetails` là bắt buộc
   - Có thể tạo khách hàng mới đồng thời bằng cách cung cấp thông tin trong `customer`
   - Tổng tiền được tính tự động dựa trên chi tiết hóa đơn

2. Thanh toán:
   - Hỗ trợ nhiều phương thức thanh toán
   - Có thể thanh toán một phần hoặc toàn bộ
   - Thanh toán COD được quản lý riêng qua `usingCod`

3. Giao hàng:
   - Thông tin giao hàng là tùy chọn
   - Hỗ trợ tích hợp với đối tác giao hàng qua `partnerDelivery`
   - Có thể theo dõi trạng thái giao hàng

4. Phân trang và tìm kiếm:
   - Mặc định `pageSize` là 20
   - `currentItem` bắt đầu từ 0
   - Hỗ trợ nhiều tiêu chí tìm kiếm và lọc
   - Có thể sắp xếp theo nhiều trường khác nhau

---

# Chi nhánh (Branches)

# API Chi nhánh (Branches)

## Danh sách các phương thức

1. `list(params)` - Lấy danh sách chi nhánh
2. `getById(branchId)` - Lấy thông tin chi nhánh theo ID
3. `create(branchData)` - Tạo chi nhánh mới
4. `update(branchId, branchData)` - Cập nhật chi nhánh
5. `delete(branchId)` - Xóa chi nhánh

## Chi tiết sử dụng

### 1. Lấy danh sách chi nhánh

```typescript
// Lấy danh sách với phân trang
const branches = await client.branches.list({
  pageSize: 20,
  currentItem: 0
});

// Lọc theo trạng thái
const activeBranches = await client.branches.list({
  isActive: true,
  pageSize: 20
});

// Lọc chi nhánh chính
const mainBranches = await client.branches.list({
  isMain: true,
  pageSize: 20
});

// Tìm kiếm theo tên hoặc mã
const searchBranches = await client.branches.list({
  code: "CN001",
  name: "Chi nhánh"
});
```

### 2. Tạo chi nhánh mới

```typescript
const newBranch = await client.branches.create({
  name: "Chi nhánh ABC",           // Tên chi nhánh (bắt buộc)
  address: "123 Đường XYZ",        // Địa chỉ (bắt buộc)
  code: "CN001",                   // Mã chi nhánh
  wardName: "Phường 1",            // Phường/Xã
  districtName: "Quận 1",          // Quận/Huyện
  cityName: "TP.HCM",             // Tỉnh/Thành phố
  phoneNumber: "028.1234567",      // Số điện thoại cố định
  contactNumber: "0901234567",     // Số điện thoại di động
  email: "chinhanh@email.com",     // Email
  isActive: true,                  // Trạng thái hoạt động
  locationName: "Khu vực Nam",     // Tên khu vực
  latLng: "10.7756587,106.7004238", // Tọa độ
  parentId: 1,                     // ID chi nhánh cha
  level: 1                         // Cấp độ phân cấp
});
```

### 3. Cập nhật chi nhánh

```typescript
const updatedBranch = await client.branches.update(123, {
  name: "Chi nhánh ABC (Mới)",
  address: "456 Đường XYZ",
  phoneNumber: "028.9876543",
  isActive: false
});
```

### 4. Xóa chi nhánh

```typescript
await client.branches.delete(123);
```

## Cấu trúc dữ liệu

### Branch (Chi nhánh)

```typescript
interface Branch {
  id: number;              // ID chi nhánh
  branchId: string;        // Mã định danh
  name: string;            // Tên chi nhánh
  address: string;         // Địa chỉ
  wardName?: string;       // Phường/Xã
  districtName?: string;   // Quận/Huyện
  cityName?: string;       // Tỉnh/Thành phố
  phoneNumber?: string;    // Số điện thoại cố định
  email?: string;          // Email
  isActive: boolean;       // Trạng thái hoạt động
  isMain: boolean;         // Là chi nhánh chính
  retailerId: number;      // ID nhà bán lẻ
  locationId?: number;     // ID khu vực
  locationName?: string;   // Tên khu vực
  contactNumber?: string;  // Số điện thoại di động
  latLng?: string;        // Tọa độ địa lý
  code?: string;          // Mã chi nhánh
  parentId?: number;      // ID chi nhánh cha
  level?: number;         // Cấp độ phân cấp
  hasChild?: boolean;     // Có chi nhánh con
  createdBy?: string;     // Người tạo
  createdDate: string;    // Ngày tạo
  modifiedDate?: string;  // Ngày cập nhật
}
```

### BranchCreateParams (Tham số tạo chi nhánh)

```typescript
interface BranchCreateParams {
  name: string;           // Tên chi nhánh (bắt buộc)
  address: string;        // Địa chỉ (bắt buộc)
  code?: string;          // Mã chi nhánh
  branchId?: string;      // Mã định danh
  wardName?: string;      // Phường/Xã
  districtName?: string;  // Quận/Huyện
  cityName?: string;      // Tỉnh/Thành phố
  phoneNumber?: string;   // Số điện thoại cố định
  contactNumber?: string; // Số điện thoại di động
  email?: string;         // Email
  isActive?: boolean;     // Trạng thái hoạt động
  locationId?: number;    // ID khu vực
  locationName?: string;  // Tên khu vực
  latLng?: string;       // Tọa độ địa lý
  parentId?: number;     // ID chi nhánh cha
  level?: number;        // Cấp độ phân cấp
}
```

### BranchListParams (Tham số lấy danh sách)

```typescript
interface BranchListParams {
  pageSize?: number;      // Số lượng trên trang
  currentItem?: number;   // Vị trí bắt đầu
  lastModifiedFrom?: string; // Từ ngày cập nhật
  orderBy?: string;      // Sắp xếp theo trường
  orderDirection?: 'ASC' | 'DESC'; // Hướng sắp xếp
  isActive?: boolean;    // Lọc theo trạng thái
  isMain?: boolean;      // Lọc chi nhánh chính
  code?: string;         // Lọc theo mã
  name?: string;         // Lọc theo tên
  parentId?: number;     // Lọc theo chi nhánh cha
  level?: number;        // Lọc theo cấp độ
  includeRemoveIds?: boolean; // Bao gồm đã xóa
}
```

## Ghi chú

1. Phân cấp chi nhánh:
   - Chi nhánh có thể được tổ chức theo cấu trúc cha-con
   - Sử dụng `parentId` để xác định mối quan hệ
   - `level` chỉ định cấp độ trong hệ thống phân cấp

2. Chi nhánh chính:
   - Mỗi cửa hàng có một chi nhánh chính (`isMain: true`)
   - Chi nhánh chính thường được sử dụng làm mặc định cho các hoạt động

3. Vị trí địa lý:
   - Có thể lưu tọa độ trong `latLng` (định dạng "latitude,longitude")
   - Hỗ trợ phân chia theo khu vực địa lý qua `locationId` và `locationName`

4. Phân trang và tìm kiếm:
   - Mặc định `pageSize` là 20
   - `currentItem` bắt đầu từ 0
   - Hỗ trợ tìm kiếm theo tên và mã chi nhánh
   - Có thể lọc theo trạng thái hoạt động và loại chi nhánh

---

# Nhà cung cấp (Suppliers)

# API Nhà cung cấp (Suppliers)

## Danh sách các phương thức

1. `list(params)` - Lấy danh sách nhà cung cấp
2. `getById(id)` - Lấy thông tin nhà cung cấp theo ID
3. `getByCode(code)` - Lấy nhà cung cấp theo mã

## Chi tiết sử dụng

### 1. Lấy danh sách nhà cung cấp

```typescript
// Lấy danh sách với phân trang
const suppliers = await client.suppliers.list({
  pageSize: 20,
  currentItem: 0
});

// Lọc theo trạng thái và nhóm
const suppliers = await client.suppliers.list({
  isActive: true,
  supplierGroupId: 1,
  includeSupplierGroup: true
});

// Tìm kiếm theo tên hoặc mã
const suppliers = await client.suppliers.list({
  code: "NCC001",
  name: "Công ty",
  contactNumber: "0901234567"
});

// Sắp xếp kết quả
const suppliers = await client.suppliers.list({
  orderBy: "name",
  orderDirection: "ASC",
  pageSize: 20
});
```

### 2. Tìm kiếm nhà cung cấp

```typescript
// Theo ID
const supplier = await client.suppliers.getById(123);

// Theo mã
const supplier = await client.suppliers.getByCode("NCC001");
```

## Cấu trúc dữ liệu

### Supplier (Nhà cung cấp)

```typescript
interface Supplier {
  id: number;             // ID nhà cung cấp
  code: string;           // Mã nhà cung cấp
  name: string;           // Tên nhà cung cấp
  contactNumber?: string; // Số điện thoại
  email?: string;         // Email
  address?: string;       // Địa chỉ
  locationName?: string;  // Tên địa điểm
  wardName?: string;      // Phường/Xã
  organization?: string;  // Tên tổ chức
  taxCode?: string;       // Mã số thuế
  comments?: string;      // Ghi chú
  description?: string;   // Mô tả
  isActive: boolean;      // Trạng thái hoạt động
  retailerId: number;     // ID nhà bán lẻ
  branchId?: number;      // ID chi nhánh
  debt?: number;          // Công nợ
  totalInvoiced?: number; // Tổng hóa đơn
  totalInvoicedWithoutReturn?: number; // Tổng hóa đơn (không tính trả hàng)
  supplierGroupId?: number; // ID nhóm nhà cung cấp
  supplierGroupIds?: number[]; // Danh sách ID nhóm
  supplierGroup?: {        // Thông tin nhóm
    id: number;           // ID nhóm
    name: string;         // Tên nhóm
    description?: string; // Mô tả nhóm
    retailerId: number;   // ID nhà bán lẻ
    isActive: boolean;    // Trạng thái nhóm
  };
  createdBy?: string;     // Người tạo
  createdDate: string;    // Ngày tạo
  modifiedDate?: string;  // Ngày cập nhật
}
```

### SupplierListParams (Tham số lấy danh sách)

```typescript
interface SupplierListParams {
  pageSize?: number;       // Số lượng trên trang
  currentItem?: number;    // Vị trí bắt đầu
  orderBy?: string;        // Sắp xếp theo trường
  orderDirection?: 'ASC' | 'DESC'; // Hướng sắp xếp
  code?: string;           // Lọc theo mã
  name?: string;           // Lọc theo tên
  contactNumber?: string;  // Lọc theo SĐT
  lastModifiedFrom?: string; // Từ ngày cập nhật
  includeRemoveIds?: boolean; // Bao gồm đã xóa
  includeTotal?: boolean;   // Bao gồm tổng số
  includeSupplierGroup?: boolean; // Bao gồm thông tin nhóm
  isActive?: boolean;       // Lọc theo trạng thái
  supplierGroupId?: number; // Lọc theo nhóm
}
```

### SupplierCreateParams (Tham số tạo nhà cung cấp)

```typescript
interface SupplierCreateParams {
  code?: string;           // Mã nhà cung cấp
  name: string;            // Tên nhà cung cấp (bắt buộc)
  contactNumber?: string;  // Số điện thoại
  email?: string;          // Email
  address?: string;        // Địa chỉ
  locationName?: string;   // Tên địa điểm
  wardName?: string;       // Phường/Xã
  organization?: string;   // Tên tổ chức
  taxCode?: string;        // Mã số thuế
  comments?: string;       // Ghi chú
  description?: string;    // Mô tả
  isActive?: boolean;      // Trạng thái hoạt động
  branchId?: number;       // ID chi nhánh
  supplierGroupIds?: number[]; // Danh sách ID nhóm
}
```

## Ghi chú

1. Quản lý nhà cung cấp:
   - Có thể phân nhóm nhà cung cấp để dễ quản lý
   - Theo dõi công nợ và tổng giá trị hóa đơn
   - Hỗ trợ ghi chú và mô tả chi tiết

2. Tìm kiếm và lọc:
   - Hỗ trợ tìm kiếm theo mã, tên, số điện thoại
   - Lọc theo trạng thái hoạt động và nhóm
   - Có thể sắp xếp theo nhiều tiêu chí

3. Thông tin bổ sung:
   - Có thể bao gồm thông tin nhóm nhà cung cấp
   - Theo dõi người tạo và thời gian cập nhật
   - Lưu trữ thông tin địa chỉ và thuế

4. Phân trang và hiệu suất:
   - Mặc định `pageSize` là 20
   - `currentItem` bắt đầu từ 0
   - Hỗ trợ lấy tổng số bản ghi với `includeTotal`

---

# Vouchers

# API Voucher (Vouchers)

## Danh sách các phương thức

### Quản lý đợt phát hành voucher (Voucher Campaign)
1. `listCampaigns(params)` - Lấy danh sách đợt phát hành voucher
2. `getCampaign(id)` - Lấy thông tin đợt phát hành theo ID

### Quản lý voucher
1. `list(params)` - Lấy danh sách voucher trong đợt phát hành (bắt buộc `campaignId`)
2. `getByCampaign(campaignId, params)` - Lấy danh sách voucher theo campaign
3. `getByCode(code)` - Lấy voucher theo mã
4. `create(data)` - Tạo mới voucher theo đợt phát hành
5. `releaseGive(data)` - Phát hành voucher (hình thức tặng)
6. `cancel(data)` - Hủy voucher

## Chi tiết sử dụng

### 1. Quản lý đợt phát hành voucher

```typescript
// Lấy danh sách đợt phát hành voucher
// Tài liệu: 2.24.1. GET /vouchercampaign
const campaigns = await client.vouchers.listCampaigns({
  includeVoucherBranchs: true,  // Có lấy danh sách chi nhánh áp dụng
  includeVoucherUsers: true,    // Có lấy danh sách người tạo áp dụng
  isActive: true,               // Trạng thái đợt phát hành
  forAllCusGroup: false,        // Áp dụng cho toàn bộ khách hàng
  forAllUser: false             // Áp dụng cho toàn bộ người tạo
});

// Lấy thông tin đợt phát hành theo ID
const campaign = await client.vouchers.getCampaign(123);
```

### 2. Quản lý voucher

```typescript
// Lấy danh sách voucher trong đợt phát hành
// Tài liệu: 2.24.2. GET /voucher
const vouchers = await client.vouchers.list({
  campaignId: 123,              // ID đợt phát hành (bắt buộc)
  status: VoucherStatus.Released, // Trạng thái voucher
  lastModifiedFrom: "2024-01-01", // Ngày cập nhật cuối
  code: "SUMMER2024ABC"         // Mã voucher (optional)
});

// Tìm voucher theo mã
const voucher = await client.vouchers.getByCode("SUMMER2024ABC");
```

### 3. Tạo mới voucher

```typescript
// Tạo mới voucher theo đợt phát hành
// Tài liệu: 2.24.3. POST /voucher
const result = await client.vouchers.create({
  voucherCampaignId: 123,       // ID đợt phát hành đang kích hoạt
  data: [
    { code: "VOUCHER001" },
    { code: "VOUCHER002" }
  ]
});
```

### 4. Phát hành voucher (hình thức tặng)

```typescript
// Tài liệu: 2.24.4. POST /voucher/release/give
const result = await client.vouchers.releaseGive({
  CampaignId: 123,              // ID đợt phát hành đang kích hoạt
  Vouchers: [
    { Code: "VOUCHER001" }      // Chỉ áp dụng với voucher trạng thái 0: chưa sử dụng
  ],
  ReleaseDate: "2024-06-01T00:00:00" // Ngày phát hành
});
```

### 5. Hủy voucher

```typescript
// Tài liệu: 2.24.5. DELETE /voucher/cancel
const result = await client.vouchers.cancel({
  CampaignId: 123,              // ID đợt phát hành đang kích hoạt
  Vouchers: [
    { Code: "VOUCHER001" }      // Chỉ áp dụng với voucher trạng thái 0: chưa sử dụng
  ]
});
```

## Cấu trúc dữ liệu

### VoucherCampaign (Đợt phát hành voucher)

```typescript
interface VoucherCampaign {
  id: number;                    // ID đợt phát hành
  code: string;                 // Mã đợt phát hành
  name: string;                 // Tên đợt phát hành
  isActive: boolean;            // Trạng thái đợt phát hành
  startDate: string;            // Thời gian áp dụng bắt đầu
  endDate: string;              // Thời gian áp dụng kết thúc
  expireTime: number;           // Số ngày kể từ ngày phát hành sẽ hết hạn
  prereqCategoryIds?: number[]; // Danh sách id nhóm hàng
  prereqProductIds?: number[];  // Danh sách id hàng hóa
  prereqPrice?: number;         // Tổng tiền hàng
  quantity: number;             // Tổng số voucher
  price: number;                // Mệnh giá
  useVoucherCombineInvoice: boolean; // Gộp nhiều voucher trên 1 hóa đơn
  isGlobal: boolean;            // Áp dụng cho toàn hệ thống
  forAllCusGroup: boolean;      // Áp dụng cho toàn bộ khách hàng
  forAllUser: boolean;          // Áp dụng cho toàn bộ người tạo
  voucherBranchs?: Array<{ branchId: number; branchName: string }>;
  voucherUsers?: Array<{ userId: number; userName: string }>;
}
```

### Voucher

```typescript
interface Voucher {
  id: number;                   // ID voucher
  code: string;                // Mã voucher
  voucherCampaignId: number;   // ID đợt phát hành voucher
  releaseDate: string;         // Ngày phát hành
  expireDate: string;          // Ngày hết hạn
  usedDate?: string;           // Ngày sử dụng
  status: number;              // Trạng thái
  sellType: number;            // Hình thức (0: tặng, 1: bán)
  price: number;               // Giá trị voucher
  partnerType: string;         // Nhóm người mua nhận voucher
  partnerId?: number;          // ID người mua nhận voucher
  partnerName?: string;        // Tên người mua nhận voucher
  modifiedDate?: string;       // Ngày chỉnh sửa
  createdDate: string;         // Ngày tạo
}
```

### Trạng thái voucher

```typescript
enum VoucherStatus {
  Unused = 0,    // Chưa sử dụng
  Released = 1,  // Đã phát hành
  Used = 2,      // Đã sử dụng
  Cancelled = 3  // Đã hủy
}
```

### Hình thức voucher

```typescript
enum VoucherSellType {
  Gift = 0,  // Tặng
  Sold = 1   // Bán
}
```

## Ghi chú

1. Đợt phát hành voucher:
   - Có thể giới hạn theo chi nhánh (`voucherBranchs`) và người tạo (`voucherUsers`)
   - Hỗ trợ điều kiện áp dụng theo nhóm hàng/sản phẩm/giá trị đơn hàng
   - `isGlobal`, `forAllCusGroup`, `forAllUser` xác định phạm vi áp dụng

2. Trạng thái voucher theo tài liệu:
   - `0`: chưa sử dụng
   - `1`: đã phát hành
   - `2`: đã sử dụng
   - `3`: đã hủy

3. Phát hành/hủy voucher chỉ áp dụng với voucher đang ở trạng thái `0: chưa sử dụng`

---

# Người dùng (Users)

# API Người dùng (Users)

## Danh sách các phương thức

1. `list(params)` - Lấy danh sách người dùng
2. `getById(userId)` - Lấy thông tin người dùng theo ID
3. `getActive(params)` - Lấy danh sách người dùng đang hoạt động
4. `getByBranch(branchId, params)` - Lấy người dùng theo chi nhánh
5. `search(query, params)` - Tìm kiếm người dùng

## Chi tiết sử dụng

### 1. Lấy danh sách người dùng

```typescript
// Lấy danh sách với phân trang
const users = await client.users.list({
  pageSize: 20,
  currentItem: 0
});

// Sắp xếp kết quả
const users = await client.users.list({
  orderBy: "userName",
  orderDirection: "ASC"
});

// Lấy người dùng đang hoạt động
const activeUsers = await client.users.getActive({
  pageSize: 20
});
```

### 2. Tìm kiếm người dùng

```typescript
// Tìm theo tên hoặc mã
const searchResults = await client.users.search("John", {
  pageSize: 20
});

// Tìm theo chi nhánh
const branchUsers = await client.users.getByBranch(1, {
  pageSize: 20
});
```

### 3. Lấy thông tin chi tiết

```typescript
// Lấy theo ID
const user = await client.users.getById(123);
```

## Cấu trúc dữ liệu

### User (Người dùng)

```typescript
interface User {
  id: number;            // ID người dùng
  userName: string;      // Tên đăng nhập
  givenName: string;     // Tên hiển thị
  address?: string;      // Địa chỉ
  mobilePhone?: string;  // Số điện thoại
  email?: string;        // Email
  description?: string;  // Mô tả
  retailerId: number;    // ID nhà bán lẻ
  birthDate?: string;    // Ngày sinh
  createdDate: string;   // Ngày tạo
  modifiedDate?: string; // Ngày cập nhật
}
```

### UserListParams (Tham số lấy danh sách)

```typescript
interface UserListParams {
  lastModifiedFrom?: string;   // Từ ngày cập nhật
  pageSize?: number;          // Số lượng trên trang
  currentItem?: number;       // Vị trí bắt đầu
  orderBy?: string;          // Sắp xếp theo trường
  orderDirection?: 'ASC' | 'DESC'; // Hướng sắp xếp
  includeRemoveIds?: boolean; // Bao gồm đã xóa
}
```

## Ghi chú

1. Tìm kiếm người dùng:
   - Hỗ trợ tìm kiếm theo tên hoặc mã người dùng
   - Tìm kiếm không phân biệt chữ hoa/thường
   - API sẽ tự động tìm kiếm cả trong tên đăng nhập và tên hiển thị

2. Phân quyền:
   - Người dùng có thể được gán cho một hoặc nhiều chi nhánh
   - Sử dụng `getByBranch()` để lấy danh sách người dùng theo chi nhánh
   - Quản lý trạng thái hoạt động thông qua `getActive()`

3. Thông tin chi tiết:
   - Mỗi người dùng có một tên đăng nhập duy nhất
   - Có thể quản lý thông tin cá nhân như địa chỉ, số điện thoại, email
   - Theo dõi thời gian tạo và cập nhật thông tin

4. Phân trang và sắp xếp:
   - Mặc định `pageSize` là 20
   - `currentItem` bắt đầu từ 0
   - Có thể sắp xếp theo nhiều trường khác nhau
   - Hướng sắp xếp: 'ASC' (tăng dần) hoặc 'DESC' (giảm dần)

---

# Báo cáo dòng tiền (Cash Flow)

# API Dòng tiền (Cash Flow)

## Danh sách các phương thức

1. `list(params)` - Lấy danh sách dòng tiền
2. `processPayment(data)` - Xử lý thanh toán cho hóa đơn

## Chi tiết sử dụng

### 1. Lấy danh sách dòng tiền

```typescript
// Lấy danh sách với phân trang
const cashFlows = await client.cashFlow.list({
  pageSize: 20,
  currentItem: 0
});

// Lọc theo chi nhánh và thời gian
const cashFlows = await client.cashFlow.list({
  branchIds: [1, 2],
  startDate: "2024-01-01",
  endDate: "2024-01-31"
});

// Lọc theo phương thức thanh toán
const cashFlows = await client.cashFlow.list({
  method: ["Cash", "Card", "Transfer"],
  includeAccount: true
});

// Tìm kiếm theo đối tác
const cashFlows = await client.cashFlow.list({
  partnerName: "Công ty ABC",
  contactNumber: "0901234567"
});
```

### 2. Xử lý thanh toán

```typescript
// Thanh toán tiền mặt
const payment = await client.cashFlow.processPayment({
  invoiceId: 123,
  amount: 1000000,
  method: "Cash"
});

// Thanh toán qua thẻ/chuyển khoản
const payment = await client.cashFlow.processPayment({
  invoiceId: 123,
  amount: 1000000,
  method: "Card",
  accountId: 1  // ID tài khoản ngân hàng
});
```

## Cấu trúc dữ liệu

### CashFlow (Dòng tiền)

```typescript
interface CashFlow {
  id: number;           // ID dòng tiền
  code: string;        // Mã dòng tiền
  branchId: number;    // ID chi nhánh
  address?: string;    // Địa chỉ
  wardName?: string;   // Phường/Xã
  contactNumber?: string; // Số điện thoại
  createdBy: number;   // Người tạo
  usedForFinancialReporting: number; // Dùng cho báo cáo tài chính
  cashFlowGroupId?: number; // ID nhóm dòng tiền
  method: string;      // Phương thức thanh toán
  partnerType: string; // Loại đối tác
  partnerId?: number;  // ID đối tác
  status: number;      // Mã trạng thái
  statusValue: string; // Tên trạng thái
  transDate: string;   // Ngày giao dịch
  amount: number;      // Số tiền
  partnerName: string; // Tên đối tác
  user: string;        // Người dùng
  accountId?: number;  // ID tài khoản
  description?: string; // Ghi chú
}
```

### PaymentRequest (Yêu cầu thanh toán)

```typescript
interface PaymentRequest {
  amount: number;      // Số tiền thanh toán
  method: string;      // Phương thức (Cash, Card, Transfer)
  accountId?: number;  // ID tài khoản (bắt buộc với Card/Transfer)
  invoiceId: number;   // ID hóa đơn
}
```

### PaymentResponse (Kết quả thanh toán)

```typescript
interface PaymentResponse {
  paymentId: number;    // ID thanh toán
  paymentCode: string;  // Mã thanh toán
  amount: number;       // Số tiền
  method: string;       // Phương thức
  accountId?: number;   // ID tài khoản
  invoiceId: number;    // ID hóa đơn
  documentCode: number; // Mã chứng từ
}
```

### CashFlowListParams (Tham số lấy danh sách)

```typescript
interface CashFlowListParams {
  branchIds?: number[];     // Lọc theo chi nhánh
  code?: string[];          // Lọc theo mã
  userId?: number;          // Lọc theo người dùng
  accountId?: number;       // Lọc theo tài khoản
  partnerType?: string;     // Lọc theo loại đối tác
  method?: string[];        // Lọc theo phương thức
  cashFlowGroupId?: number[]; // Lọc theo nhóm
  usedForFinancialReporting?: number; // Dùng cho báo cáo
  partnerName?: string;     // Tìm theo tên đối tác
  contactNumber?: string;   // Tìm theo SĐT
  isReceipt?: boolean;      // Là phiếu thu
  includeAccount?: boolean; // Bao gồm thông tin tài khoản
  includeBranch?: boolean;  // Bao gồm thông tin chi nhánh
  includeUser?: boolean;    // Bao gồm thông tin người dùng
  startDate?: string;       // Từ ngày
  endDate?: string;         // Đến ngày
  status?: number;          // Lọc theo trạng thái
  pageSize?: number;        // Số lượng trên trang
  currentItem?: number;     // Vị trí bắt đầu
}
```

## Ghi chú

1. Phương thức thanh toán:
   - Hỗ trợ nhiều phương thức: Tiền mặt (Cash), Thẻ (Card), Chuyển khoản (Transfer)
   - Với thanh toán qua thẻ hoặc chuyển khoản, bắt buộc cung cấp `accountId`
   - Mỗi giao dịch được ghi nhận với mã duy nhất

2. Báo cáo tài chính:
   - Dùng trường `usedForFinancialReporting` để đánh dấu giao dịch cho báo cáo
   - Có thể nhóm các giao dịch theo `cashFlowGroupId`
   - Hỗ trợ xuất báo cáo theo nhiều tiêu chí

3. Tìm kiếm và lọc:
   - Có thể lọc theo nhiều tiêu chí: chi nhánh, thời gian, phương thức, đối tác
   - Hỗ trợ tìm kiếm theo tên đối tác và số điện thoại
   - Phân trang với `pageSize` và `currentItem`

4. Thông tin bổ sung:
   - Có thể bao gồm thông tin tài khoản, chi nhánh, người dùng
   - Mỗi giao dịch đều có thông tin đối tác và người thực hiện
   - Ghi chú có thể được thêm vào để theo dõi chi tiết

---

# Phụ thu (Surcharges)

# API Phụ thu (Surcharges)

## Danh sách các phương thức

1. `list(params)` - Lấy danh sách phụ thu
2. `getById(surchargeId)` - Lấy thông tin phụ thu theo ID
3. `create(surchargeData)` - Tạo phụ thu mới
4. `update(surchargeId, surchargeData)` - Cập nhật phụ thu
5. `setActive(surchargeId, isActive)` - Cho phép/ngừng hoạt động phụ thu
6. `activate(surchargeId)` - Cho phép hoạt động phụ thu
7. `deactivate(surchargeId)` - Ngừng hoạt động phụ thu
8. `delete(surchargeId)` - Xóa phụ thu

## Chi tiết sử dụng

### 1. Tạo phụ thu mới

```typescript
const newSurcharge = await client.surcharges.create({
  name: "Phí vận chuyển",       // Tên phụ thu (bắt buộc)
  code: "SHIP",                 // Mã phụ thu
  value: 30000,                // Giá trị phụ thu (bắt buộc)
  isPercent: false,            // Tính theo phần trăm (bắt buộc)
  isAutoAdd: true,             // Tự động thêm vào đơn hàng
  isRequired: false,           // Bắt buộc áp dụng
  description: "Phí giao hàng", // Mô tả
  branchIds: [1, 2],           // Áp dụng cho chi nhánh
  isActive: true               // Trạng thái hoạt động
});

// Tạo phụ thu theo phần trăm
const percentSurcharge = await client.surcharges.create({
  name: "Phí dịch vụ",
  code: "SERVICE",
  value: 10,                  // 10%
  isPercent: true,
  isAutoAdd: true,
  isRequired: true
});
```

### 2. Lấy danh sách phụ thu

```typescript
// Lấy danh sách với phân trang
const surcharges = await client.surcharges.list({
  pageSize: 20,
  currentItem: 0
});

// Lọc theo chi nhánh và trạng thái
const surcharges = await client.surcharges.list({
  branchId: 1,
  isActive: true
});

// Tìm kiếm theo tên hoặc mã
const surcharges = await client.surcharges.list({
  code: "SHIP",
  name: "vận chuyển"
});
```

### 3. Cập nhật phụ thu

```typescript
const updatedSurcharge = await client.surcharges.update(123, {
  value: 35000,
  description: "Phí vận chuyển mới",
  isActive: true
});
```

### 4. Cho phép/ngừng hoạt động phụ thu

```typescript
// Tài liệu: 2.10.4. POST /surcharges/{id}/activesurchage
// Cho phép hoạt động
await client.surcharges.activate(123);

// Ngừng hoạt động
await client.surcharges.deactivate(123);

// Hoặc truyền trạng thái trực tiếp
await client.surcharges.setActive(123, true);
```

### 5. Xóa phụ thu

```typescript
await client.surcharges.delete(123);
```

## Cấu trúc dữ liệu

### Surcharge (Phụ thu)

```typescript
interface Surcharge {
  id: number;            // ID phụ thu
  code: string;          // Mã phụ thu
  name: string;          // Tên phụ thu
  value: number;         // Giá trị phụ thu
  isPercent: boolean;    // Tính theo phần trăm
  isAutoAdd: boolean;    // Tự động thêm
  isRequired: boolean;   // Bắt buộc áp dụng
  description?: string;  // Mô tả
  isActive: boolean;     // Trạng thái hoạt động
  retailerId: number;    // ID nhà bán lẻ
  branchId?: number;     // ID chi nhánh
  branchIds?: number[];  // Danh sách chi nhánh
  createdBy?: string;    // Người tạo
  createdDate: string;   // Ngày tạo
  modifiedDate?: string; // Ngày cập nhật
}
```

### SurchargeCreateParams (Tham số tạo phụ thu)

```typescript
interface SurchargeCreateParams {
  code?: string;         // Mã phụ thu
  name: string;          // Tên phụ thu (bắt buộc)
  value: number;         // Giá trị phụ thu (bắt buộc)
  isPercent: boolean;    // Tính theo phần trăm (bắt buộc)
  isAutoAdd?: boolean;   // Tự động thêm
  isRequired?: boolean;  // Bắt buộc áp dụng
  description?: string;  // Mô tả
  branchIds?: number[];  // Danh sách chi nhánh
  isActive?: boolean;    // Trạng thái hoạt động
}
```

### SurchargeListParams (Tham số lấy danh sách)

```typescript
interface SurchargeListParams {
  pageSize?: number;        // Số lượng trên trang
  currentItem?: number;     // Vị trí bắt đầu
  lastModifiedFrom?: string; // Từ ngày cập nhật
  orderBy?: string;         // Sắp xếp theo trường
  orderDirection?: 'ASC' | 'DESC'; // Hướng sắp xếp
  isActive?: boolean;       // Lọc theo trạng thái
  branchId?: number;        // Lọc theo chi nhánh
  includeRemoveIds?: boolean; // Bao gồm đã xóa
  code?: string;            // Lọc theo mã
  name?: string;            // Lọc theo tên
}
```

## Ghi chú

1. Loại phụ thu:
   - Có thể tính theo số tiền cố định hoặc phần trăm
   - Phụ thu theo phần trăm sẽ được tính dựa trên tổng giá trị đơn hàng
   - Có thể thiết lập tự động thêm vào đơn hàng (`isAutoAdd`)

2. Áp dụng phụ thu:
   - Có thể áp dụng cho toàn bộ cửa hàng hoặc chỉ một số chi nhánh
   - Phụ thu bắt buộc (`isRequired`) không thể bỏ qua khi tạo đơn hàng
   - Có thể tắt/bật phụ thu thông qua trạng thái `isActive`

3. Tìm kiếm và lọc:
   - Hỗ trợ tìm kiếm theo mã và tên phụ thu
   - Có thể lọc theo chi nhánh và trạng thái
   - Theo dõi thời gian cập nhật qua `lastModifiedFrom`

4. Phân trang và hiệu suất:
   - Mặc định `pageSize` là 20
   - `currentItem` bắt đầu từ 0
   - Hỗ trợ sắp xếp theo nhiều tiêu chí

---

# Webhooks

# API Webhook (Webhooks)

## Danh sách các phương thức

1. `list(params)` - Lấy danh sách webhook
2. `getById(webhookId)` - Lấy thông tin webhook theo ID
3. `create(webhookData)` - Tạo webhook mới
4. `update(webhookId, webhookData)` - Cập nhật webhook
5. `delete(webhookId)` - Xóa webhook
6. `enable(webhookId)` - Kích hoạt webhook
7. `disable(webhookId)` - Vô hiệu hóa webhook
8. `verifySignature(payload, signature, secret)` - Xác thực chữ ký webhook
9. `parseWebhookPayload(payload, signature, secret)` - Phân tích và xác thực dữ liệu webhook

## Chi tiết sử dụng

### 1. Tạo webhook mới

```typescript
const newWebhook = await client.webhooks.create({
  url: "https://your-domain.com/webhook",  // URL nhận webhook (bắt buộc)
  secret: "your-secret-key",               // Khóa bí mật (bắt buộc)
  events: [                                // Danh sách sự kiện (bắt buộc)
    WebhookEvent.OrderCreated,
    WebhookEvent.OrderUpdated
  ],
  isActive: true                           // Trạng thái kích hoạt
});
```

### 2. Lấy danh sách webhook

```typescript
// Lấy tất cả webhook
const webhooks = await client.webhooks.list({
  pageSize: 20,
  currentItem: 0
});

// Lọc theo trạng thái
const activeWebhooks = await client.webhooks.list({
  isActive: true
});
```

### 3. Quản lý trạng thái

```typescript
// Kích hoạt webhook
await client.webhooks.enable(123);

// Vô hiệu hóa webhook
await client.webhooks.disable(123);
```

### 4. Xử lý webhook payload

```typescript
// Middleware để lấy raw body cho việc tạo chữ ký
app.use(bodyParser.json({
  verify: (req, res, buf) => {
    req.rawBody = buf;
  }
}));

// Xử lý webhook trong Express.js
app.post('/webhook', (req, res) => {
  const signature = req.headers['x-hub-signature'];
  const payload = req.rawBody.toString();
  const secret = 'your-webhook-secret';

  try {
    // Xác thực và phân tích payload
    const webhookData = client.webhooks.parseWebhookPayload(
      payload,
      signature,
      secret
    );

    // Xử lý dữ liệu dựa trên loại sự kiện
    switch (webhookData.event) {
      // ===== CUSTOMER EVENTS =====
      case WebhookEvent.CustomerUpdated:
        // Xử lý cập nhật khách hàng
        const customerData = webhookData.data as CustomerUpdateWebhookPayload;
        
        // Truy cập dữ liệu khách hàng đã cập nhật
        for (const notification of customerData.Notifications) {
          for (const customer of notification.Data) {
            console.log(`Khách hàng cập nhật: ${customer.Name} (${customer.Code})`);
            // Xử lý cập nhật khách hàng
          }
        }
        break;
      
      case WebhookEvent.CustomerDeleted:
        const customerDeleteData = webhookData.data as { RemoveId: number[] };
        console.log('ID khách hàng bị xóa:', customerDeleteData.RemoveId);
        break;

      // ===== PRODUCT EVENTS =====
      case WebhookEvent.ProductUpdated:
        const productData = webhookData.data as ProductUpdateWebhookPayload;
        // Xử lý cập nhật sản phẩm
        break;
      
      case WebhookEvent.ProductDeleted:
        const productDeleteData = webhookData.data as { RemoveId: number[] };
        console.log('ID sản phẩm bị xóa:', productDeleteData.RemoveId);
        break;
      
      // ===== ORDER EVENTS =====
      case WebhookEvent.OrderCreated:
      case WebhookEvent.OrderUpdated:
        const orderData = webhookData.data as OrderUpdateWebhookPayload;
        // Xử lý đơn hàng
        break;
        
      // ===== INVOICE EVENTS =====
      case WebhookEvent.InvoiceUpdated:
        const invoiceData = webhookData.data as InvoiceUpdateWebhookPayload;
        // Xử lý hóa đơn
        break;
        
      // ===== STOCK EVENTS =====
      case WebhookEvent.StockUpdated:
        const stockData = webhookData.data as StockUpdateWebhookPayload;
        // Xử lý cập nhật tồn kho
        break;
        
      // ===== PRICEBOOK EVENTS =====
      case WebhookEvent.PriceBookUpdated:
      case WebhookEvent.PriceBookDetailUpdated:
        // Xử lý cập nhật bảng giá
        break;
    }

    res.sendStatus(200);
  } catch (error) {
    console.error('Lỗi webhook:', error);
    res.sendStatus(400);
  }
});
```

## Cấu trúc dữ liệu

### Webhook

```typescript
interface Webhook {
  id: number;           // ID webhook
  url: string;          // URL nhận webhook
  secret: string;       // Khóa bí mật
  events: WebhookEvent[]; // Danh sách sự kiện
  isActive: boolean;    // Trạng thái kích hoạt
  createdDate: string;  // Ngày tạo
  modifiedDate: string; // Ngày cập nhật
  retailerId: number;   // ID nhà bán lẻ
}
```

### Sự kiện webhook

```typescript
enum WebhookEvent {
  // Sự kiện sản phẩm (Product)
  ProductCreated = 'product.created',
  ProductUpdated = 'product.updated',
  ProductDeleted = 'product.deleted',
  
  // Sự kiện danh mục (Category)
  CategoryCreated = 'category.created',
  CategoryUpdated = 'category.updated',
  CategoryDeleted = 'category.deleted',
  
  // Sự kiện khách hàng (Customer)
  CustomerCreated = 'customer.created',
  CustomerUpdated = 'customer.updated',
  CustomerDeleted = 'customer.deleted',
  
  // Sự kiện đơn hàng (Order)
  OrderCreated = 'order.created',
  OrderUpdated = 'order.updated',
  OrderDeleted = 'order.deleted',
  
  // Sự kiện hóa đơn (Invoice)
  InvoiceCreated = 'invoice.created',
  InvoiceUpdated = 'invoice.updated',
  InvoiceDeleted = 'invoice.deleted',
  
  // Sự kiện tồn kho (Stock)
  StockUpdated = 'stock.update',
  
  // Sự kiện bảng giá (PriceBook)
  PriceBookUpdated = 'pricebook.update',
  PriceBookDeleted = 'pricebook.delete',
  PriceBookDetailUpdated = 'pricebookdetail.update',
  PriceBookDetailDeleted = 'pricebookdetail.delete',
  
  // Sự kiện chi nhánh (Branch)
  BranchUpdated = 'branch.update',
  BranchDeleted = 'branch.delete'
}
```

## Cấu trúc dữ liệu webhook

SDK cung cấp các interface để giúp bạn xử lý dữ liệu webhook một cách dễ dàng với TypeScript. Dưới đây là các cấu trúc dữ liệu chính:

```typescript
export interface WebhookPayload<T = any> {
  event: WebhookEvent;  // Loại sự kiện
  data: T;             // Dữ liệu sự kiện
  timestamp: string;   // Thời gian xảy ra
  retailerId: number;  // ID nhà bán lẻ
  signature: string;   // Chữ ký
}

// Cấu trúc chung cho các webhook sự kiện update
export interface GenericUpdateWebhookPayload<T> {
  Id: string;           // ID của webhook
  Attempt: number;      // Số lần thử gửi
  Notifications: [{
    Action: string;     // Hành động (customer.update, product.update, ...)
    Data: T[];          // Mảng dữ liệu
  }]
}

// Cấu trúc chung cho các webhook sự kiện delete
export interface GenericDeleteWebhookPayload {
  RemoveId: number[];   // Mảng ID các mục bị xóa
}

// Kiểu dữ liệu cho webhook customer.update
export interface CustomerUpdateWebhookPayload extends GenericUpdateWebhookPayload<CustomerWebhookData> {}

export interface CustomerWebhookData {
  Id: number;           // ID khách hàng
  Code: string;         // Mã khách hàng
  Name: string;         // Tên khách hàng
  Gender?: boolean;     // Giới tính
  BirthDate?: string;   // Ngày sinh
  ContactNumber?: string; // Số điện thoại
  Address?: string;     // Địa chỉ
  LocationName?: string; // Tên địa điểm
  Email?: string;       // Email
  ModifiedDate: string; // Ngày cập nhật
  Type?: number;        // Loại khách hàng
  Organization?: string; // Tổ chức
  TaxCode?: string;     // Mã số thuế
  Comments?: string;    // Ghi chú
}
```

## Ghi chú

1. Bảo mật:
   - Mỗi webhook có một khóa bí mật riêng (`secret`)
   - Sử dụng chữ ký HMAC SHA-256 để xác thực payload
   - Luôn xác thực chữ ký trước khi xử lý dữ liệu

2. Xử lý sự kiện:
   - Webhook được gửi bất đồng bộ
   - Nên xử lý nhanh và trả về response ngay
   - Đưa xử lý phức tạp vào hàng đợi hoặc worker

3. Độ tin cậy:
   - KiotViet sẽ thử gửi lại webhook nếu không nhận được phản hồi 2xx
   - Xử lý webhook phải bảo đảm idempotent (có thể thực hiện nhiều lần)
   - Lưu ID sự kiện để tránh xử lý trùng lặp

4. Quản lý:
   - Có thể kích hoạt/vô hiệu hóa webhook bất kỳ lúc nào
   - Một webhook có thể đăng ký nhiều loại sự kiện
   - Nên giám sát webhook để đảm bảo hoạt động ổn định

---

# Cài đặt (Settings)

# API Cài đặt (Settings)

## Danh sách các phương thức

1. `get()` - Lấy thông tin cài đặt hiện tại

## Chi tiết sử dụng

### Lấy thông tin cài đặt

```typescript
// Lấy cài đặt hiện tại
const settings = await client.settings.get();

// Kiểm tra các cài đặt cụ thể
if (settings.allowSellWhenOutStock) {
  // Cho phép bán khi hết hàng
}

if (settings.managerCustomerByBranch) {
  // Quản lý khách hàng theo chi nhánh
}
```

## Cấu trúc dữ liệu

### Setting (Cài đặt)

```typescript
interface Setting {
  managerCustomerByBranch: boolean;      // Quản lý khách hàng theo chi nhánh
  allowOrderWhenOutStock: boolean;        // Cho phép đặt hàng khi hết hàng
  allowSellWhenOrderOutStock: boolean;    // Cho phép bán khi đơn đặt hàng hết hàng
  allowSellWhenOutStock: boolean;         // Cho phép bán khi hết hàng tồn kho
}
```

## Ghi chú

1. Cài đặt quản lý tồn kho:
   - `allowSellWhenOutStock`: Cho phép bán hàng khi sản phẩm hết tồn kho
   - `allowOrderWhenOutStock`: Cho phép đặt hàng khi sản phẩm hết tồn kho
   - `allowSellWhenOrderOutStock`: Cho phép bán khi đơn đặt hàng vượt quá số lượng tồn kho

2. Cài đặt quản lý khách hàng:
   - `managerCustomerByBranch`: Khi bật tính năng này, mỗi chi nhánh sẽ quản lý danh sách khách hàng riêng
   - Ảnh hưởng đến việc hiển thị và tìm kiếm khách hàng trong từng chi nhánh

3. Tính năng này chỉ hỗ trợ đọc cài đặt:
   - Không thể thay đổi cài đặt thông qua API
   - Các thay đổi cài đặt phải được thực hiện trên giao diện KiotViet

4. Ảnh hưởng đến quy trình bán hàng:
   - Các cài đặt này ảnh hưởng trực tiếp đến logic xử lý đơn hàng và tồn kho
   - Nên kiểm tra các cài đặt này trước khi thực hiện các thao tác liên quan đến bán hàng và đặt hàng
   - Điều chỉnh logic ứng dụng dựa trên các cài đặt này để đảm bảo tuân thủ quy tắc kinh doanh

---

# Vị trí/Địa bàn (Locations)

# API Vị trí/Địa bàn (Locations)

## Danh sách các phương thức

1. `list(params)` - Lấy danh sách location
2. `getById(id)` - Lấy location theo ID

## Chi tiết sử dụng

```typescript
// Lấy danh sách location
// Tài liệu: 2.21. GET /locations
const locations = await client.locations.list({
  pageSize: 100
});

// Lấy location theo ID
const location = await client.locations.getById(1001);
```

## Cấu trúc dữ liệu

```typescript
interface Location {
  id: number;            // Id location
  name: string;          // Tên location
  normalName: string;    // Tên không dấu
}
```

---

# Coupon

# API Coupon

## Danh sách các phương thức

1. `list(params)` - Lấy danh sách coupon
2. `setUsed(codes)` - Cập nhật trạng thái coupon về "Đã sử dụng"
3. `setUsedByParams(data)` - Cập nhật trạng thái coupon với payload tùy chỉnh

## Chi tiết sử dụng

```typescript
// Cập nhật trạng thái coupon về "Đã sử dụng"
// Tài liệu: 2.23. POST /coupons/setused
const result = await client.coupons.setUsed(["COUPON001", "COUPON002"]);
// result => { message: string, dataError?: [{ code: string }] }
```

## Cấu trúc dữ liệu

```typescript
interface CouponSetUsedParams {
  coupons: Array<{ code: string }>; // Mã coupon (bắt buộc)
}

interface CouponSetUsedResponse {
  message: string;
  dataError?: Array<{ code: string }>; // Thông báo lỗi tương ứng với mã coupon
}
```

---

# Thuế (Taxes)

# API Thuế (Taxes)

## Danh sách các phương thức

1. `list()` - Lấy danh sách thuế được hỗ trợ
2. `getAll()` - Lấy danh sách thuế dạng mảng phẳng

## Chi tiết sử dụng

```typescript
// Tài liệu: 2.27.1. GET /tax/detail
const taxDetail = await client.taxes.list();
// taxDetail => { data: Tax[], message: string, isSuccess: boolean }

const taxes = await client.taxes.getAll();
// taxes => Tax[] (chỉ lấy phần data)
```

## Cấu trúc dữ liệu

```typescript
interface Tax {
  taxId: number;          // ID của loại thuế
  taxName: string;        // Tên loại thuế
  value: number | null;   // Giá trị % thuế, null nếu không xác định
  type: "Khấu trừ" | "Trực tiếp"; // Phương pháp tính thuế
}
```

---

# Hóa đơn điện tử (E-Invoices)

# API Hóa đơn điện tử (E-Invoices)

## Danh sách các phương thức

1. `updateInfo(items)` - Cập nhật thông tin phát hành HĐĐT cho nhiều hóa đơn
2. `updateInfoByParams(data)` - Cập nhật thông tin HĐĐT với payload tùy chỉnh

## Chi tiết sử dụng

```typescript
// Cập nhật thông tin phát hành HĐĐT
// Tài liệu: 2.28.1. PUT /einvoices/info
const result = await client.einvoices.updateInfo([
  {
    invoiceId: 1234567,               // Mã hóa đơn (bắt buộc)
    invoiceRefId: "3fa85f64-5717-4562-b3fc-2c963f66afa6", // UUID HĐĐT (bắt buộc)
    partnerTransactionCode: "FPT-TXN-00123", // Mã tra cứu hóa đơn tại nhà cung cấp
    partner: EInvoicePartner.FPT,     // MISA=0, VNPT=1, VIETTEL=2, FPT=3, KIOTVIET=4
    status: EInvoiceStatus.PublishSuccess, // Trạng thái đẩy hóa đơn
    invoiceNumber: "00000010",        // Số hóa đơn điện tử
    type: EInvoiceType.NORMAL,        // 0: NORMAL, 1: POS
    publishDate: "2026-05-07T10:30:00", // Ngày phát hành
    serial: "C24TAA"                  // Ký hiệu hóa đơn
  }
]);
```

## Cấu trúc dữ liệu

```typescript
interface EInvoiceInfo {
  invoiceId: number;            // Mã hóa đơn (bắt buộc)
  invoiceRefId: string;         // UUID của hóa đơn điện tử (bắt buộc)
  partnerTransactionCode?: string; // Mã tra cứu hóa đơn tại nhà cung cấp
  partner: EInvoicePartner;     // Nhà cung cấp (bắt buộc)
  status: number;               // Trạng thái đẩy hóa đơn (bắt buộc)
  invoiceNumber?: string;       // Số hóa đơn điện tử
  type: EInvoiceType;           // Loại phát hành mẫu hóa đơn (bắt buộc)
  publishDate?: string;         // Ngày phát hành hóa đơn điện tử
  serial?: string;              // Ký hiệu hóa đơn
}

enum EInvoicePartner {
  MISA = 0, VNPT = 1, VIETTEL = 2, FPT = 3, KIOTVIET = 4
}

enum EInvoiceType {
  NORMAL = 0,  // Phát hành hóa đơn thông thường
  POS = 1      // Phát hành hóa đơn từ MTT
}
```

## Ghi chú

1. Lưu ý khi sử dụng API HĐĐT:
   - Hóa đơn đã được phát hành HĐĐT từ hệ thống KiotViet sẽ không thể cập nhật qua API này
   - Hóa đơn đã được cập nhật HĐĐT qua API này có thể được cập nhật lại với toàn bộ thông tin