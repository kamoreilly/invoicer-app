# Quickstart Guide: Invoicer App Feature

**Branch**: 001-invoicer-app-feature | **Date**: 2025-09-09

## Prerequisites

Before starting, ensure you have:

- Node.js 18+ or Bun runtime
- Git installed
- Access to the development repository
- Required API keys and credentials (see Environment Setup)

## Environment Setup

### 1. Clone and Setup Repository

```bash
# Clone the repository
git clone <repository-url>
cd invoicer-app

# Install dependencies
bun install

# Switch to feature branch
git checkout 001-invoicer-app-feature
```

### 2. Configure Environment Variables

Create environment files for both applications:

**Backend (.env)**:
```env
# Database
DATABASE_URL="file:./dev.db"
DATABASE_AUTH_TOKEN=""
CORS_ORIGIN="http://localhost:3001"

# Authentication
BETTER_AUTH_SECRET="your-secret-key-here"
BETTER_AUTH_URL="http://localhost:3000"

# Payment Processing
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."
PAYPAL_CLIENT_ID="your-paypal-client-id"
PAYPAL_CLIENT_SECRET="your-paypal-client-secret"

# Email Service
POSTMARK_API_KEY="your-postmark-api-key"
POSTMARK_FROM_EMAIL="invoices@yourapp.com"

# File Storage
CLOUDFLARE_ACCOUNT_ID="your-cloudflare-account-id"
CLOUDFLARE_R2_ACCESS_KEY_ID="your-r2-access-key"
CLOUDFLARE_R2_SECRET_ACCESS_KEY="your-r2-secret-key"
CLOUDFLARE_R2_BUCKET_NAME="your-bucket-name"
```

**Frontend (.env)**:
```env
# API Configuration
NEXT_PUBLIC_SERVER_URL="http://localhost:3000"

# Authentication
NEXT_PUBLIC_BETTER_AUTH_URL="http://localhost:3000"

# Payment Processing
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_..."
```

### 3. Database Setup
```bash
# Push database schema
bun db:push

# Open database studio (optional)
bun db:studio
```

## Development Workflow

### 1. Start Development Servers

```bash
# Start both applications
bun dev

# Or start individually
bun dev:web     # Frontend on port 3001
bun dev:server  # Backend on port 3000
```

### 2. Verify Setup

Check that both applications are running:

- Frontend: http://localhost:3001
- Backend: http://localhost:3000
- Database Studio: http://localhost:4983

## Testing the Implementation

### Test Scenario 1: Client Management

1. **Create a Client**
   ```bash
   curl -X POST http://localhost:3000/api/clients \
     -H "Authorization: Bearer YOUR_JWT_TOKEN" \
     -H "Content-Type: application/json" \
     -d '{
       "name": "Test Client Inc",
       "email": "test@example.com",
       "currency": "USD",
       "billingAddress": {
         "street": "123 Main St",
         "city": "New York",
         "state": "NY",
         "postalCode": "10001",
         "country": "US"
       }
     }'
   ```

2. **List Clients**
   ```bash
   curl -X GET http://localhost:3000/api/clients \
     -H "Authorization: Bearer YOUR_JWT_TOKEN"
   ```

3. **Update Client**
   ```bash
   curl -X PUT http://localhost:3000/api/clients/{client-id} \
     -H "Authorization: Bearer YOUR_JWT_TOKEN" \
     -H "Content-Type: application/json" \
     -d '{
       "name": "Test Client Inc (Updated)",
       "phone": "+1-555-0123"
     }'
   ```

### Test Scenario 2: Invoice Creation and Management

1. **Create an Invoice**
   ```bash
   curl -X POST http://localhost:3000/api/invoices \
     -H "Authorization: Bearer YOUR_JWT_TOKEN" \
     -H "Content-Type: application/json" \
     -d '{
       "clientId": "CLIENT_ID",
       "issueDate": "2025-09-09",
       "dueDate": "2025-09-23",
       "currency": "USD",
       "notes": "Test invoice",
       "lineItems": [
         {
           "description": "Development Services",
           "quantity": 40,
           "unitPrice": 100.00,
           "taxRate": 8.5
         },
         {
           "description": "Design Services",
           "quantity": 10,
           "unitPrice": 75.00,
           "taxRate": 8.5
         }
       ]
     }'
   ```

2. **Get Invoice Details**
   ```bash
   curl -X GET http://localhost:3000/api/invoices/{invoice-id} \
     -H "Authorization: Bearer YOUR_JWT_TOKEN"
   ```

3. **Send Invoice**
   ```bash
   curl -X POST http://localhost:3000/api/invoices/{invoice-id}/send \
     -H "Authorization: Bearer YOUR_JWT_TOKEN" \
     -H "Content-Type: application/json" \
     -d '{
       "message": "Thank you for your business!"
     }'
   ```

### Test Scenario 3: Payment Processing

1. **Create Payment Intent**
   ```bash
   curl -X POST http://localhost:3000/api/payments \
     -H "Authorization: Bearer YOUR_JWT_TOKEN" \
     -H "Content-Type: application/json" \
     -d '{
       "invoiceId": "INVOICE_ID",
       "paymentMethod": "stripe_card"
     }'
   ```

2. **List Invoice Payments**
   ```bash
   curl -X GET http://localhost:3000/api/invoices/{invoice-id}/payments \
     -H "Authorization: Bearer YOUR_JWT_TOKEN"
   ```

### Test Scenario 4: File Attachments

1. **Upload Attachment**
   ```bash
   curl -X POST http://localhost:3000/api/invoices/{invoice-id}/attachments \
     -H "Authorization: Bearer YOUR_JWT_TOKEN" \
     -F "file=@/path/to/document.pdf"
   ```

2. **List Attachments**
   ```bash
   curl -X GET http://localhost:3000/api/invoices/{invoice-id}/attachments \
     -H "Authorization: Bearer YOUR_JWT_TOKEN"
   ```

### Test Scenario 5: Currency Conversion

1. **Get Exchange Rates**
   ```bash
   curl -X GET "http://localhost:3000/api/currency/rates?base=USD&targets=EUR,GBP,JPY" \
     -H "Authorization: Bearer YOUR_JWT_TOKEN"
   ```

2. **Convert Currency**
   ```bash
   curl -X POST http://localhost:3000/api/currency/convert \
     -H "Authorization: Bearer YOUR_JWT_TOKEN" \
     -H "Content-Type: application/json" \
     -d '{
       "amount": 1000,
       "from": "USD",
       "to": "EUR"
     }'
   ```

### Test Scenario 6: Dashboard and Reports

1. **Get Dashboard Data**
   ```bash
   curl -X GET http://localhost:3000/api/dashboard \
     -H "Authorization: Bearer YOUR_JWT_TOKEN"
   ```

2. **Get Revenue Report**
   ```bash
   curl -X GET "http://localhost:3000/api/reports/revenue?startDate=2025-01-01&endDate=2025-12-31&groupBy=month" \
     -H "Authorization: Bearer YOUR_JWT_TOKEN"
   ```

## Key Features Validation

### 1. Invoice Management
- [ ] Create draft invoices
- [ ] Add line items with automatic total calculation
- [ ] Send invoices via email
- [ ] Generate PDF invoices
- [ ] Track invoice status (draft, sent, paid, overdue)

### 2. Client Management
- [ ] Create and manage clients
- [ ] Store client contact and billing information
- [ ] Support multiple currencies per client
- [ ] Import/export clients via CSV

### 3. Payment Processing
- [ ] Record manual payments
- [ ] Process Stripe payments
- [ ] Handle payment webhooks
- [ ] Track payment status

### 4. Recurring Invoices
- [ ] Create recurring invoice templates
- [ ] Support various frequencies (daily, weekly, monthly, etc.)
- [ ] Automatic invoice generation
- [ ] Manage recurring invoice schedules

### 5. Analytics & Reporting
- [ ] View financial analytics
- [ ] Generate revenue reports
- [ ] Track outstanding and overdue invoices
- [ ] Export reports to CSV/PDF

## Testing

### Run Tests
```bash
# Run all tests
bun test

# Run specific test files
bun test tests/contract/
bun test tests/integration/
bun test tests/unit/
```

### Test Coverage
```bash
# Generate coverage report
bun test --coverage
```

## Deployment

### Build for Production
```bash
# Build all applications
bun build

# Build individual applications
bun build:web
bun build:server
```

### Database Migrations
```bash
# Generate migration
bun db:generate

# Apply migration
bun db:migrate

# Push schema changes
bun db:push
```

## Troubleshooting

### Common Issues

1. **Database Connection Issues**
   - Ensure DATABASE_URL is correct
   - Check if database file exists
   - Verify database permissions

2. **Authentication Issues**
   - Verify BETTER_AUTH_SECRET is set
   - Check JWT token validity
   - Ensure user exists in database

3. **Email Sending Issues**
   - Verify RESEND_API_KEY is valid
   - Check email templates
   - Ensure sender email is verified

4. **Payment Processing Issues**
   - Verify Stripe keys are correct
   - Check webhook configuration
   - Ensure webhook endpoint is accessible

### Debug Commands
```bash
# Check database schema
bun db:studio

# View server logs
bun dev:server

# Check network requests
# Use browser dev tools or curl commands above
```

## Next Steps

1. **Customization**: Modify invoice templates in `apps/server/src/templates/`
2. **Additional Features**: Add more payment methods, currencies, or reporting
3. **Integration**: Connect with accounting software or other business tools
4. **Scaling**: Optimize for larger volumes and add caching layers

## Support

For issues and questions:
- Check the documentation in `/docs/`
- Review existing issues in the repository
- Create a new issue with detailed reproduction steps