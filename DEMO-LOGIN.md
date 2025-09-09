# Demo Login Credentials

Your invoicer app now has demo user accounts created. Use these credentials to login and test the application:

## Available Demo Accounts

### 1. Demo User
- **Email:** `demo@example.com`
- **Password:** `demo12345`
- **Role:** Regular user account for testing general functionality

### 2. Admin User  
- **Email:** `admin@example.com`
- **Password:** `admin12345`
- **Role:** Admin account for testing administrative features

### 3. Test User
- **Email:** `test@example.com` 
- **Password:** `test12345`
- **Role:** Additional test account for multi-user scenarios

## Quick Start

1. Start the development servers:
   ```bash
   bun dev
   ```

2. Open your browser and navigate to: http://localhost:3001

3. Use any of the demo credentials above to login

4. Start exploring your invoicer app features!

## Managing Demo Users

- **Add more demo users:** Run `bun db:seed` (script will skip existing users)
- **View database:** Run `bun db:studio` to open Drizzle Studio
- **Reset demo data:** Delete users from the database and run `bun db:seed` again

---

*Demo users were created using Better Auth with proper password hashing and validation.*