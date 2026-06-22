# FoodBridge — Project Structure

1. Project Overview

- FoodBridge connects restaurants (providers) with NGOs (receivers) to redistribute surplus food.

2. Problem Statement

- Daily surplus food exists across restaurants, hotels and events; the challenge is coordination.

3. Tech Stack

- Next.js 15 App Router
- TypeScript
- Tailwind CSS
- AWS DynamoDB (AWS SDK v3)
- NextAuth (Google provider)

4. Folder Structure (key folders)

- src/
  - app/ (App Router pages & API route handlers)
  - components/ (UI building blocks)
  - lib/ (dynamodb client, auth, services)
  - types/ (TypeScript interfaces)

5. Database Schema

- User: `id`, `name`, `email`, `role`, `createdAt`
- Donation: `donationId`, `restaurantId`, `foodName`, `quantity`, `description`, `pickupAddress`, `availableUntil`, `status`, `createdAt`
- Claim: `claimId`, `donationId`, `ngoId`, `claimedAt`

6. API Routes

- `GET /api/donations` — list donations
- `POST /api/donations` — create donation
- `GET /api/donations/[id]` — get one donation
- `PATCH /api/donations/[id]` — update donation status
- `GET /api/claims` — list claims
- `POST /api/claims` — create claim
- `GET /api/dashboard` — simple statistics

7. Authentication Flow

- NextAuth configuration is prepared in `src/lib/auth.ts` using Google provider.
- Set `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` in environment before deploying.

8. AWS Integration

- DynamoDB client in `src/lib/dynamodb.ts` uses AWS SDK v3 and reads region/credentials from environment variables.
- Configure table names via `DYNAMODB_TABLE_DONATIONS`, `DYNAMODB_TABLE_CLAIMS`, `DYNAMODB_TABLE_USERS`.

9. Deployment Instructions

- Deploy frontend to Vercel. Ensure environment variables for AWS and Google are set in the deployment.

10. Future Improvements

- Maps integration, SMS, route optimization, expiry prediction, QR verification, reputation system.
