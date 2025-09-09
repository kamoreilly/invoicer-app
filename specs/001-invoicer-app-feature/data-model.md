# Data Model: Invoicer App Feature

**Branch**: 001-invoicer-app-feature | **Date**: 2025-09-09

## Entity Relationship Diagram

```
User (1) ──┬── (N) Client
            │
            ├── (N) Invoice
            │       │
            │       ├── (N) LineItem
            │       │
            │       ├── (N) Payment
            │       │
            │       └── (N) InvoiceAttachment
            │
            └── (1) Settings
                    │
                    └── (N) CurrencyRate
```

## Core Entities

### 1. User
Represents system users with permissions for creating and managing invoices and clients.

```typescript
interface User {
  id: string;                    // UUID
  email: string;                 // Unique email address
  name: string;                  // Display name
  role: 'admin' | 'user';        // User role
  createdAt: Date;               // Account creation date
  updatedAt: Date;               // Last update date
  settings?: UserSettings;       // User preferences
}
```

**Validation Rules**:
- `email`: Must be valid email format, unique
- `name`: Required, min 2 characters, max 100 characters
- `role`: Required, enum validation

**State Transitions**:
- `pending` → `active` → `suspended` → `deleted`

### 2. Client
Represents business or individual entities that receive invoices with contact and billing information.

```typescript
interface Client {
  id: string;                    // UUID
  userId: string;                // Foreign key to User
  name: string;                  // Business or individual name
  email: string;                 // Primary contact email
  phone?: string;                // Optional phone number
  currency: string;              // ISO 4217 currency code (e.g., 'USD')
  status: 'active' | 'inactive'; // Client status
  billingAddress?: Address;      // Optional billing address
  shippingAddress?: Address;     // Optional shipping address
  taxId?: string;                // Tax identification number
  notes?: string;                // Additional notes
  createdAt: Date;               // Client creation date
  updatedAt: Date;               // Last update date
}
```

**Address Type**:
```typescript
interface Address {
  street?: string;               // Street address
  city?: string;                 // City
  state?: string;                // State/Province
  postalCode?: string;           // Postal/ZIP code
  country?: string;              // Country code (ISO 3166-1 alpha-2)
}
```

**Validation Rules**:
- `name`: Required, min 2 characters, max 200 characters
- `email`: Required, valid email format
- `phone`: Optional, E.164 format if provided
- `currency`: Required, valid ISO 4217 code
- `taxId`: Optional, alphanumeric with spaces/dashes allowed

### 3. Invoice
Represents billing documents containing client information, line items, totals, and payment status.

```typescript
interface Invoice {
  id: string;                    // UUID
  userId: string;                // Foreign key to User
  clientId: string;              // Foreign key to Client
  invoiceNumber: string;         // Unique invoice number
  issueDate: Date;               // Invoice issue date
  dueDate: Date;                 // Payment due date
  status: InvoiceStatus;         // Current status
  currency: string;              // ISO 4217 currency code
  subtotal: number;              // Subtotal before tax
  taxRate: number;               // Tax rate percentage
  taxAmount: number;             // Tax amount
  total: number;                 // Total amount including tax
  notes?: string;                // Additional notes
  createdAt: Date;               // Invoice creation date
  updatedAt: Date;               // Last update date
  paidAt?: Date;                 // Payment date (if paid)
  
  // Relationships
  client: Client;                // Associated client
  lineItems: LineItem[];          // Invoice line items
  payments: Payment[];           // Associated payments
  attachments: InvoiceAttachment[]; // File attachments
}
```

**Invoice Status**:
```typescript
type InvoiceStatus = 
  | 'draft'      // Invoice is being created
  | 'sent'       // Invoice sent to client
  | 'viewed'     // Client viewed invoice
  | 'paid'       // Invoice paid in full
  | 'overdue'    // Invoice past due date
  | 'cancelled'  // Invoice cancelled
  | 'refunded';  // Invoice refunded
```

**Validation Rules**:
- `invoiceNumber`: Required, unique per user, format: INV-YYYY-XXXX
- `issueDate`: Required, must be <= dueDate
- `dueDate`: Required, must be >= issueDate
- `currency`: Required, valid ISO 4217 code
- `subtotal`: Required, >= 0
- `taxRate`: Required, >= 0, <= 100
- `taxAmount`: Required, >= 0
- `total`: Required, >= 0, must equal subtotal + taxAmount

**State Transitions**:
```
draft → sent → viewed → paid
              ↓        ↓
            overdue  refunded
              ↓
          cancelled
```

### 4. LineItem
Represents individual products or services within an invoice.

```typescript
interface LineItem {
  id: string;                    // UUID
  invoiceId: string;            // Foreign key to Invoice
  description: string;           // Item description
  quantity: number;              // Item quantity
  unitPrice: number;             // Price per unit
  amount: number;                // Total amount (quantity × unitPrice)
  taxRate: number;               // Tax rate percentage
  taxAmount: number;             // Tax amount
  sortOrder: number;             // Display order
  createdAt: Date;               // Line item creation date
  updatedAt: Date;               // Last update date
}
```

**Validation Rules**:
- `description`: Required, min 1 character, max 500 characters
- `quantity`: Required, > 0, max 6 decimal places
- `unitPrice`: Required, >= 0, max 2 decimal places
- `amount`: Required, >= 0, max 2 decimal places
- `taxRate`: Required, >= 0, <= 100
- `taxAmount`: Required, >= 0, max 2 decimal places

### 5. Payment
Represents payment transactions linked to invoices.

```typescript
interface Payment {
  id: string;                    // UUID
  invoiceId: string;             // Foreign key to Invoice
  amount: number;                // Payment amount
  currency: string;              // Payment currency
  paymentMethod: PaymentMethod;  // Payment method used
  providerTransactionId?: string; // External provider transaction ID
  status: PaymentStatus;         // Payment status
  failureReason?: string;        // Failure reason if applicable
  metadata?: Record<string, any>; // Additional payment data
  createdAt: Date;               // Payment creation date
  updatedAt: Date;               // Last update date
  processedAt?: Date;            // Payment processing date
}
```

**Payment Method**:
```typescript
type PaymentMethod = 
  | 'stripe_card'
  | 'stripe_bank_transfer'
  | 'paypal'
  | 'bank_transfer'
  | 'cash'
  | 'check'
  | 'other';
```

**Payment Status**:
```typescript
type PaymentStatus = 
  | 'pending'    // Payment initiated, awaiting confirmation
  | 'processing'  // Payment being processed
  | 'succeeded'  // Payment completed successfully
  | 'failed'     // Payment failed
  | 'refunded'   // Payment refunded
  | 'cancelled'; // Payment cancelled
```

**Validation Rules**:
- `amount`: Required, > 0, max 2 decimal places
- `currency`: Required, valid ISO 4217 code
- `paymentMethod`: Required, valid enum value
- `status`: Required, valid enum value

### 6. InvoiceAttachment
Represents file attachments linked to invoices.

```typescript
interface InvoiceAttachment {
  id: string;                    // UUID
  invoiceId: string;             // Foreign key to Invoice
  fileKey: string;               // Storage key (e.g., S3/R2 key)
  originalFilename: string;      // Original filename
  fileSize: number;              // File size in bytes
  contentType: string;           // MIME type
  uploadedAt: Date;              // Upload timestamp
}
```

**Validation Rules**:
- `fileKey`: Required, valid storage key format
- `originalFilename`: Required, min 1 character, max 255 characters
- `fileSize`: Required, > 0, max 100MB (104857600 bytes)
- `contentType`: Required, valid MIME type

### 7. CurrencyRate
Stores exchange rate data for currency conversions.

```typescript
interface CurrencyRate {
  id: string;                    // UUID
  baseCurrency: string;          // Base currency code
  targetCurrency: string;        // Target currency code
  rate: number;                  // Exchange rate
  date: Date;                    // Rate date
  createdAt: Date;               // Record creation date
}
```

**Validation Rules**:
- `baseCurrency`: Required, valid ISO 4217 code
- `targetCurrency`: Required, valid ISO 4217 code, != baseCurrency
- `rate`: Required, > 0, max 10 decimal places
- `date`: Required, must be <= current date

### 8. UserSettings
Stores user preferences and configuration.

```typescript
interface UserSettings {
  id: string;                    // UUID
  userId: string;                // Foreign key to User
  defaultCurrency: string;       // Default currency for new invoices
  invoicePrefix: string;         // Invoice number prefix
  nextInvoiceNumber: number;     // Next invoice number
  taxRate: number;               // Default tax rate percentage
  emailNotifications: boolean;   // Enable email notifications
  createdAt: Date;               // Settings creation date
  updatedAt: Date;               // Last update date
}
```

**Validation Rules**:
- `defaultCurrency`: Required, valid ISO 4217 code
- `invoicePrefix`: Required, max 10 characters
- `nextInvoiceNumber`: Required, > 0
- `taxRate`: Required, >= 0, <= 100

## Database Schema (Drizzle ORM)

```typescript
// apps/server/src/db/schema/index.ts
import { 
  pgTable, 
  uuid, 
  text, 
  decimal, 
  timestamp, 
  integer, 
  boolean, 
  primaryKey,
  index
} from 'drizzle-orm/pg-core';
import { createId } from '@paralleldrive/cuid2';

// Users table
export const users = pgTable('users', {
  id: uuid('id').$defaultFn(() => createId()).primaryKey(),
  email: text('email').notNull().unique(),
  name: text('name').notNull(),
  role: text('role').notNull().default('user'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

// User settings
export const userSettings = pgTable('user_settings', {
  id: uuid('id').$defaultFn(() => createId()).primaryKey(),
  userId: uuid('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  defaultCurrency: text('default_currency').notNull().default('USD'),
  invoicePrefix: text('invoice_prefix').notNull().default('INV-'),
  nextInvoiceNumber: integer('next_invoice_number').notNull().default(1),
  taxRate: decimal('tax_rate', { precision: 5, scale: 2 }).notNull().default('0'),
  emailNotifications: boolean('email_notifications').notNull().default(true),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

// Clients table
export const clients = pgTable('clients', {
  id: uuid('id').$defaultFn(() => createId()).primaryKey(),
  userId: uuid('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  name: text('name').notNull(),
  email: text('email').notNull(),
  phone: text('phone'),
  currency: text('currency').notNull().default('USD'),
  status: text('status').notNull().default('active'),
  billingAddressStreet: text('billing_address_street'),
  billingAddressCity: text('billing_address_city'),
  billingAddressState: text('billing_address_state'),
  billingAddressPostalCode: text('billing_address_postal_code'),
  billingAddressCountry: text('billing_address_country'),
  shippingAddressStreet: text('shipping_address_street'),
  shippingAddressCity: text('shipping_address_city'),
  shippingAddressState: text('shipping_address_state'),
  shippingAddressPostalCode: text('shipping_address_postal_code'),
  shippingAddressCountry: text('shipping_address_country'),
  taxId: text('tax_id'),
  notes: text('notes'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

// Invoices table
export const invoices = pgTable('invoices', {
  id: uuid('id').$defaultFn(() => createId()).primaryKey(),
  userId: uuid('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  clientId: uuid('client_id').notNull().references(() => clients.id, { onDelete: 'cascade' }),
  invoiceNumber: text('invoice_number').notNull(),
  issueDate: timestamp('issue_date').notNull().defaultNow(),
  dueDate: timestamp('due_date').notNull(),
  status: text('status').notNull().default('draft'),
  currency: text('currency').notNull().default('USD'),
  subtotal: decimal('subtotal', { precision: 10, scale: 2 }).notNull().default('0'),
  taxRate: decimal('tax_rate', { precision: 5, scale: 2 }).notNull().default('0'),
  taxAmount: decimal('tax_amount', { precision: 10, scale: 2 }).notNull().default('0'),
  total: decimal('total', { precision: 10, scale: 2 }).notNull().default('0'),
  notes: text('notes'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
  paidAt: timestamp('paid_at'),
});

// Line items table
export const lineItems = pgTable('line_items', {
  id: uuid('id').$defaultFn(() => createId()).primaryKey(),
  invoiceId: uuid('invoice_id').notNull().references(() => invoices.id, { onDelete: 'cascade' }),
  description: text('description').notNull(),
  quantity: decimal('quantity', { precision: 10, scale: 6 }).notNull(),
  unitPrice: decimal('unit_price', { precision: 10, scale: 2 }).notNull(),
  amount: decimal('amount', { precision: 10, scale: 2 }).notNull(),
  taxRate: decimal('tax_rate', { precision: 5, scale: 2 }).notNull().default('0'),
  taxAmount: decimal('tax_amount', { precision: 10, scale: 2 }).notNull().default('0'),
  sortOrder: integer('sort_order').notNull().default(0),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

// Payments table
export const payments = pgTable('payments', {
  id: uuid('id').$defaultFn(() => createId()).primaryKey(),
  invoiceId: uuid('invoice_id').notNull().references(() => invoices.id, { onDelete: 'cascade' }),
  amount: decimal('amount', { precision: 10, scale: 2 }).notNull(),
  currency: text('currency').notNull(),
  paymentMethod: text('payment_method').notNull(),
  providerTransactionId: text('provider_transaction_id'),
  status: text('status').notNull().default('pending'),
  failureReason: text('failure_reason'),
  metadata: text('metadata'), // JSON string
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
  processedAt: timestamp('processed_at'),
});

// Invoice attachments table
export const invoiceAttachments = pgTable('invoice_attachments', {
  id: uuid('id').$defaultFn(() => createId()).primaryKey(),
  invoiceId: uuid('invoice_id').notNull().references(() => invoices.id, { onDelete: 'cascade' }),
  fileKey: text('file_key').notNull(),
  originalFilename: text('original_filename').notNull(),
  fileSize: integer('file_size').notNull(),
  contentType: text('content_type').notNull(),
  uploadedAt: timestamp('uploaded_at').notNull().defaultNow(),
});

// Currency rates table
export const currencyRates = pgTable('currency_rates', {
  id: uuid('id').$defaultFn(() => createId()).primaryKey(),
  baseCurrency: text('base_currency').notNull(),
  targetCurrency: text('target_currency').notNull(),
  rate: decimal('rate', { precision: 20, scale: 10 }).notNull(),
  date: timestamp('date').notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
});

// Indexes for performance
export const usersEmailIndex = index('users_email_idx').on(users.email);
export const clientsUserIdIndex = index('clients_user_id_idx').on(clients.userId);
export const invoicesUserIdIndex = index('invoices_user_id_idx').on(invoices.userId);
export const invoicesClientIdIndex = index('invoices_client_id_idx').on(invoices.clientId);
export const invoicesInvoiceNumberIndex = index('invoices_invoice_number_idx').on(invoices.invoiceNumber);
export const lineItemsInvoiceIdIndex = index('line_items_invoice_id_idx').on(lineItems.invoiceId);
export const paymentsInvoiceIdIndex = index('payments_invoice_id_idx').on(payments.invoiceId);
export const invoiceAttachmentsInvoiceIdIndex = index('invoice_attachments_invoice_id_idx').on(invoiceAttachments.invoiceId);
export const currencyRatesDateIndex = index('currency_rates_date_idx').on(currencyRates.date);
export const currencyRatesPairIndex = index('currency_rates_pair_idx').on(currencyRates.baseCurrency, currencyRates.targetCurrency);

// Unique constraints
export const currencyRatesUnique = primaryKey({
  columns: [currencyRates.baseCurrency, currencyRates.targetCurrency, currencyRates.date],
  name: 'currency_rates_unique',
});
```

## Data Access Patterns

### Common Queries

1. **User Dashboard**:
   ```sql
   SELECT i.*, c.name as client_name, 
          COALESCE(SUM(p.amount), 0) as paid_amount
   FROM invoices i
   JOIN clients c ON i.client_id = c.id
   LEFT JOIN payments p ON i.id = p.invoice_id AND p.status = 'succeeded'
   WHERE i.user_id = :userId
   GROUP BY i.id
   ORDER BY i.created_at DESC
   LIMIT 10
   ```

2. **Invoice Details**:
   ```sql
   SELECT i.*, c.*, 
          JSON_AGG(
            JSON_BUILD_OBJECT(
              'id', li.id,
              'description', li.description,
              'quantity', li.quantity,
              'unitPrice', li.unit_price,
              'amount', li.amount
            ) ORDER BY li.sort_order
          ) as line_items
   FROM invoices i
   JOIN clients c ON i.client_id = c.id
   LEFT JOIN line_items li ON i.id = li.invoice_id
   WHERE i.id = :invoiceId AND i.user_id = :userId
   GROUP BY i.id, c.id
   ```

3. **Client Statistics**:
   ```sql
   SELECT 
     c.id,
     c.name,
     COUNT(i.id) as total_invoices,
     COALESCE(SUM(i.total), 0) as total_amount,
     COALESCE(SUM(CASE WHEN i.status = 'paid' THEN i.total ELSE 0 END), 0) as paid_amount,
     COALESCE(SUM(CASE WHEN i.status != 'paid' THEN i.total ELSE 0 END), 0) as outstanding_amount
   FROM clients c
   LEFT JOIN invoices i ON c.id = i.client_id
   WHERE c.user_id = :userId
   GROUP BY c.id, c.name
   ```

## Validation Rules Summary

### Business Rules

1. **Invoice Numbering**:
   - Each user has unique invoice numbers
   - Format: `{prefix}{year}-{sequence}`
   - Auto-increment sequence per user

2. **Payment Validation**:
   - Payment amount cannot exceed invoice total
   - Total payments cannot exceed invoice total
   - Payment currency must match invoice currency

3. **Status Transitions**:
   - Invoice status follows defined state machine
   - Automatic status updates based on payments
   - Manual status changes with validation

4. **Data Consistency**:
   - Foreign key constraints ensure referential integrity
   - Cascade deletes maintain data consistency
   - Unique constraints prevent duplicates

## Security Considerations

1. **Data Isolation**:
   - All queries scoped by user ID
   - Row-level security for sensitive data
   - Proper authorization checks

2. **Input Validation**:
   - Server-side validation for all inputs
   - Type checking with TypeScript interfaces
   - Sanitization of user inputs

3. **Audit Trail**:
   - Timestamps for all records
   - Update tracking for critical fields
   - Payment transaction logging

## Performance Optimizations

1. **Indexing Strategy**:
   - Composite indexes for common query patterns
   - Foreign key indexes for join performance
   - Unique indexes for constraint validation

2. **Query Optimization**:
   - Efficient joins with proper indexing
   - Pagination for large result sets
   - Aggregation queries for dashboard data

3. **Caching Strategy**:
   - Application-level caching for user data
   - Database query caching for frequent requests
   - CDN caching for static assets

## Migration Strategy

1. **Schema Evolution**:
   - Additive changes only (no destructive migrations)
   - Default values for new columns
   - Backward compatibility maintained

2. **Data Migration**:
   - Batch processing for large datasets
   - Rollback scripts for each migration
   - Testing in staging environment

3. **Validation**:
   - Data integrity checks post-migration
   - Performance benchmarking
   - User acceptance testing

This data model provides a comprehensive foundation for the invoicer application with proper validation, security, and performance considerations. The schema supports all functional requirements from the feature specification and allows for future enhancements.