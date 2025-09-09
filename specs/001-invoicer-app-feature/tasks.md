# Tasks: Invoicer App Feature

**Input**: Design documents from `/specs/001-invoicer-app-feature/`  
**Prerequisites**: plan.md, research.md, data-model.md, contracts/, quickstart.md

## Execution Flow (main)
```
1. Load plan.md from feature directory
   → Extract: Better-T-Stack, Next.js, Hono, tRPC, Drizzle ORM
2. Load design documents:
   → data-model.md: Extract 7 entities → model tasks
   → contracts/api.yaml: Extract 15 endpoints → contract test tasks
   → research.md: Extract external services → setup tasks
   → quickstart.md: Extract test scenarios → integration tasks
3. Generate tasks by category:
   → Setup: dependencies, environment, external services
   → Tests: contract tests, integration tests
   → Core: models, services, API endpoints
   → Frontend: components, pages, forms
   → Integration: external services, middleware
   → Polish: tests, performance, docs
4. Apply task rules:
   → Different files = mark [P] for parallel
   → Same file = sequential (no [P])
   → Tests before implementation (TDD)
5. Number tasks sequentially (T001, T002...)
6. Generate dependency graph
7. Create parallel execution examples
8. Validate task completeness:
   → All contracts have tests?
   → All entities have models?
   → All endpoints implemented?
9. Return: SUCCESS (tasks ready for execution)
```

## Format: `[ID] [P?] Description`
- **[P]**: Can run in parallel (different files, no dependencies)
- Include exact file paths in descriptions

## Path Conventions
- **Backend**: `apps/server/src/`, `apps/server/tests/`
- **Frontend**: `apps/web/src/`, `apps/web/tests/`
- **Shared**: `packages/shared/src/` (if needed)

## Phase 3.1: Infrastructure Setup
- [ ] T001 Install additional dependencies for invoicing feature
- [ ] T002 Configure environment variables for external services
- [ ] T003 [P] Set up external service integrations (Stripe, Resend, AWS S3)
- [ ] T004 Configure database schema for invoicing entities

## Phase 3.2: Tests First (TDD) ⚠️ MUST COMPLETE BEFORE 3.3
**CRITICAL: These tests MUST be written and MUST FAIL before ANY implementation**

### Contract Tests
- [ ] T005 [P] Contract test GET /clients in apps/server/tests/contract/test_clients_get.ts
- [ ] T006 [P] Contract test POST /clients in apps/server/tests/contract/test_clients_post.ts
- [ ] T007 [P] Contract test PUT /clients/{id} in apps/server/tests/contract/test_clients_put.ts
- [ ] T008 [P] Contract test DELETE /clients/{id} in apps/server/tests/contract/test_clients_delete.ts
- [ ] T009 [P] Contract test GET /invoices in apps/server/tests/contract/test_invoices_get.ts
- [ ] T010 [P] Contract test POST /invoices in apps/server/tests/contract/test_invoices_post.ts
- [ ] T011 [P] Contract test GET /invoices/{id} in apps/server/tests/contract/test_invoices_id_get.ts
- [ ] T012 [P] Contract test POST /invoices/{id}/send in apps/server/tests/contract/test_invoices_send_post.ts
- [ ] T013 [P] Contract test GET /invoices/{id}/pdf in apps/server/tests/contract/test_invoices_pdf_get.ts
- [ ] T014 [P] Contract test POST /invoices/{invoiceId}/items in apps/server/tests/contract/test_items_post.ts
- [ ] T015 [P] Contract test POST /invoices/{invoiceId}/payments in apps/server/tests/contract/test_payments_post.ts
- [ ] T016 [P] Contract test GET /recurring-invoices in apps/server/tests/contract/test_recurring_get.ts
- [ ] T017 [P] Contract test POST /recurring-invoices in apps/server/tests/contract/test_recurring_post.ts
- [ ] T018 [P] Contract test GET /analytics in apps/server/tests/contract/test_analytics_get.ts

### Integration Tests
- [ ] T019 [P] Integration test: Create and send invoice workflow in apps/server/tests/integration/test_invoice_workflow.ts
- [ ] T020 [P] Integration test: Payment processing with Stripe in apps/server/tests/integration/test_payment_processing.ts
- [ ] T021 [P] Integration test: Recurring invoice generation in apps/server/tests/integration/test_recurring_invoices.ts
- [ ] T022 [P] Integration test: PDF generation and email delivery in apps/server/tests/integration/test_pdf_email_delivery.ts

## Phase 3.3: Core Implementation (ONLY after tests are failing)

### Database Models
- [ ] T023 [P] User model extension in apps/server/src/db/schema/users.ts
- [ ] T024 [P] Client model in apps/server/src/db/schema/clients.ts
- [ ] T025 [P] Invoice model in apps/server/src/db/schema/invoices.ts
- [ ] T026 [P] LineItem model in apps/server/src/db/schema/line-items.ts
- [ ] T027 [P] Payment model in apps/server/src/db/schema/payments.ts
- [ ] T028 [P] Document model in apps/server/src/db/schema/documents.ts
- [ ] T029 [P] RecurringInvoice model in apps/server/src/db/schema/recurring-invoices.ts

### Service Layer
- [ ] T030 [P] ClientService in apps/server/src/services/clients.ts
- [ ] T031 [P] InvoiceService in apps/server/src/services/invoices.ts
- [ ] T032 [P] PaymentService in apps/server/src/services/payments.ts
- [ ] T033 [P] DocumentService in apps/server/src/services/documents.ts
- [ ] T034 [P] RecurringInvoiceService in apps/server/src/services/recurring-invoices.ts
- [ ] T035 [P] AnalyticsService in apps/server/src/services/analytics.ts

### API Endpoints (tRPC)
- [ ] T036 [P] Client router in apps/server/src/routers/clients.ts
- [ ] T037 [P] Invoice router in apps/server/src/routers/invoices.ts
- [ ] T038 [P] Payment router in apps/server/src/routers/payments.ts
- [ ] T039 [P] Recurring invoice router in apps/server/src/routers/recurring-invoices.ts
- [ ] T040 [P] Analytics router in apps/server/src/routers/analytics.ts

### External Service Integrations
- [ ] T041 Stripe integration service in apps/server/src/services/stripe.ts
- [ ] T042 Resend email service in apps/server/src/services/resend.ts
- [ ] T043 PDF generation service in apps/server/src/services/pdf.ts
- [ ] T044 AWS S3 document storage service in apps/server/src/services/storage.ts
- [ ] T045 Exchange rate API service in apps/server/src/services/exchange-rates.ts

## Phase 3.4: Frontend Implementation

### Components
- [ ] T046 [P] ClientList component in apps/web/src/components/clients/ClientList.tsx
- [ ] T047 [P] ClientForm component in apps/web/src/components/clients/ClientForm.tsx
- [ ] T048 [P] InvoiceList component in apps/web/src/components/invoices/InvoiceList.tsx
- [ ] T049 [P] InvoiceForm component in apps/web/src/components/invoices/InvoiceForm.tsx
- [ ] T050 [P] InvoiceViewer component in apps/web/src/components/invoices/InvoiceViewer.tsx
- [ ] T051 [P] LineItemEditor component in apps/web/src/components/invoices/LineItemEditor.tsx
- [ ] T052 [P] PaymentForm component in apps/web/src/components/payments/PaymentForm.tsx
- [ ] T053 [P] RecurringInvoiceForm component in apps/web/src/components/recurring/RecurringInvoiceForm.tsx
- [ ] T054 [P] AnalyticsDashboard component in apps/web/src/components/analytics/AnalyticsDashboard.tsx

### Pages
- [ ] T055 Dashboard page in apps/web/src/app/dashboard/page.tsx
- [ ] T056 Clients page in apps/web/src/app/clients/page.tsx
- [ ] T057 Invoices page in apps/web/src/app/invoices/page.tsx
- [ ] T058 Invoice detail page in apps/web/src/app/invoices/[id]/page.tsx
- [ ] T059 Analytics page in apps/web/src/app/analytics/page.tsx
- [ ] T060 Settings page in apps/web/src/app/settings/page.tsx

### Forms and Validation
- [ ] T061 [P] Client form validation with Zod in apps/web/src/validations/clients.ts
- [ ] T062 [P] Invoice form validation with Zod in apps/web/src/validations/invoices.ts
- [ ] T063 [P] Payment form validation with Zod in apps/web/src/validations/payments.ts

### State Management
- [ ] T064 Client state management in apps/web/src/hooks/useClients.ts
- [ ] T065 Invoice state management in apps/web/src/hooks/useInvoices.ts
- [ ] T066 Payment state management in apps/web/src/hooks/usePayments.ts
- [ ] T067 Analytics state management in apps/web/src/hooks/useAnalytics.ts

## Phase 3.5: Integration and Advanced Features

### Background Jobs
- [ ] T068 Recurring invoice scheduler in apps/server/src/jobs/recurring-invoices.ts
- [ ] T069 Overdue invoice checker in apps/server/src/jobs/overdue-checker.ts
- [ ] T070 Email reminder service in apps/server/src/services/email-reminders.ts

### Webhook Handlers
- [ ] T071 Stripe webhook handler in apps/server/src/webhooks/stripe.ts
- [ ] T072 Webhook security middleware in apps/server/src/middleware/webhook-security.ts

### File Upload
- [ ] T073 Document upload API endpoint in apps/server/src/routers/documents.ts
- [ ] T074 File upload component in apps/web/src/components/documents/FileUpload.tsx

### CSV Import/Export
- [ ] T075 Client CSV import service in apps/server/src/services/client-import.ts
- [ ] T076 CSV export utilities in apps/server/src/services/csv-export.ts

## Phase 3.6: Polish and Testing

### Unit Tests
- [ ] T077 [P] Unit tests for ClientService in apps/server/tests/unit/test-clients.ts
- [ ] T078 [P] Unit tests for InvoiceService in apps/server/tests/unit/test-invoices.ts
- [ ] T079 [P] Unit tests for PaymentService in apps/server/tests/unit/test-payments.ts
- [ ] T080 [P] Unit tests for utilities in apps/server/tests/unit/test-utils.ts

### Frontend Tests
- [ ] T081 [P] Component tests for ClientForm in apps/web/tests/components/ClientForm.test.tsx
- [ ] T082 [P] Component tests for InvoiceForm in apps/web/tests/components/InvoiceForm.test.tsx
- [ ] T083 [P] Integration tests for pages in apps/web/tests/integration/test-pages.tsx

### Performance and Optimization
- [ ] T084 Database query optimization
- [ ] T085 API response caching strategy
- [ ] T086 Frontend performance optimization

### Documentation
- [ ] T087 [P] Update API documentation
- [ ] T088 [P] Create user guide for invoicing features
- [ ] T089 [P] Update development setup instructions

## Dependencies

### Critical Dependencies
- Tests (T005-T022) before implementation (T023-T089)
- Models (T023-T029) before services (T030-T035)
- Services (T030-T035) before API endpoints (T036-T040)
- Backend (T023-T045) before frontend (T046-T067)
- Core features before polish (T077-T089)

### Parallel Execution Groups
```
# Group 1: Contract tests (can run together)
T005-T018: All contract tests

# Group 2: Integration tests (can run together)
T019-T022: All integration tests

# Group 3: Database models (can run together)
T023-T029: All model definitions

# Group 4: Service layer (can run together)
T030-T035: All service implementations

# Group 5: API routers (can run together)
T036-T040: All tRPC routers

# Group 6: External services (can run together)
T041-T045: All external service integrations

# Group 7: Frontend components (can run together)
T046-T054: All React components

# Group 8: Frontend pages (can run together)
T055-T060: All page components

# Group 9: Form validations (can run together)
T061-T063: All validation schemas

# Group 10: State management hooks (can run together)
T064-T067: All custom hooks

# Group 11: Unit tests (can run together)
T077-T080: All unit tests

# Group 12: Frontend tests (can run together)
T081-T083: All frontend tests

# Group 13: Documentation (can run together)
T087-T089: All documentation updates
```

## Parallel Execution Examples

### Example 1: Contract Test Batch
```bash
# Launch all contract tests in parallel
Task: "Contract test GET /clients in apps/server/tests/contract/test_clients_get.ts"
Task: "Contract test POST /clients in apps/server/tests/contract/test_clients_post.ts"
Task: "Contract test PUT /clients/{id} in apps/server/tests/contract/test_clients_put.ts"
Task: "Contract test DELETE /clients/{id} in apps/server/tests/contract/test_clients_delete.ts"
Task: "Contract test GET /invoices in apps/server/tests/contract/test_invoices_get.ts"
Task: "Contract test POST /invoices in apps/server/tests/contract/test_invoices_post.ts"
# ... all contract tests T005-T018
```

### Example 2: Model Creation Batch
```bash
# Launch all model definitions in parallel
Task: "User model extension in apps/server/src/db/schema/users.ts"
Task: "Client model in apps/server/src/db/schema/clients.ts"
Task: "Invoice model in apps/server/src/db/schema/invoices.ts"
Task: "LineItem model in apps/server/src/db/schema/line-items.ts"
Task: "Payment model in apps/server/src/db/schema/payments.ts"
Task: "Document model in apps/server/src/db/schema/documents.ts"
Task: "RecurringInvoice model in apps/server/src/db/schema/recurring-invoices.ts"
```

### Example 3: Frontend Component Batch
```bash
# Launch all frontend components in parallel
Task: "ClientList component in apps/web/src/components/clients/ClientList.tsx"
Task: "ClientForm component in apps/web/src/components/clients/ClientForm.tsx"
Task: "InvoiceList component in apps/web/src/components/invoices/InvoiceList.tsx"
Task: "InvoiceForm component in apps/web/src/components/invoices/InvoiceForm.tsx"
Task: "InvoiceViewer component in apps/web/src/components/invoices/InvoiceViewer.tsx"
# ... all components T046-T054
```

## Notes

### Critical TDD Requirements
- **DO NOT** start implementation until ALL tests (T005-T022) are written and failing
- **DO NOT** skip the RED phase - tests must fail before implementation
- **DO NOT** modify tests to make them pass - change implementation only

### Task Execution Guidelines
- [P] tasks = different files, no dependencies, can run in parallel
- Verify tests fail before implementing corresponding functionality
- Commit after each task with descriptive commit messages
- Follow Better-T-Stack conventions and existing code patterns
- All external services must have proper error handling
- Implement proper authentication and authorization checks

### File Organization
- Backend follows existing `apps/server/src/` structure
- Frontend follows existing `apps/web/src/` structure
- Tests follow existing testing patterns
- Use TypeScript for all new code
- Follow existing naming conventions

## Validation Checklist

### Contract Coverage
- [ ] All 15 API endpoints have contract tests
- [ ] All CRUD operations covered
- [ ] All error scenarios tested
- [ ] Authentication/authorization tested

### Data Model Coverage
- [ ] All 7 entities have model definitions
- [ ] All relationships properly defined
- [ ] All validation rules implemented
- [ ] All indexes configured

### Feature Coverage
- [ ] Client management fully implemented
- [ ] Invoice lifecycle complete
- [ ] Payment processing working
- [ ] Recurring invoices functional
- [ ] Analytics and reporting available
- [ ] Document handling complete

### Quality Gates
- [ ] All tests pass before implementation
- [ ] Code follows project standards
- [ ] No security vulnerabilities
- [ ] Performance requirements met
- [ ] Documentation complete and accurate

## Estimated Timeline
- **Phase 3.1 (Setup)**: 2-3 hours
- **Phase 3.2 (Tests)**: 4-6 hours
- **Phase 3.3 (Core)**: 8-12 hours
- **Phase 3.4 (Frontend)**: 12-16 hours
- **Phase 3.5 (Integration)**: 6-8 hours
- **Phase 3.6 (Polish)**: 4-6 hours

**Total Estimated Time**: 36-51 hours