# Phase 5: NGO Module Checklist

- [x] **NGO Donations View**: Implemented available donations listing with role-based rendering.
- [x] **Role-based Rendering**: Clean switching between "Available Donations" (NGO) and "My Donations" (Restaurant) on the `/donations` page.
- [x] **Claim Donation**: Added modal integration and API request triggering to `POST /api/claims`.
- [x] **Confirmation Modal**: Created reusable popup dialog for claiming confirmations.
- [x] **Donation Details Updated**: Dynamic `/donations/[id]` showing restaurant information, expiry timelines, and status action updates.
- [x] **My Claims Page**: Created `/profile/claims` displaying NGO claim history fetched from database.
- [x] **Search**: Client-side query search by food name, description, and pickup address.
- [x] **Filters**: Selectors for "Available Today", "Available Tomorrow", quantity limits, and sorting (Newest, Oldest, Quantity high/low).
- [x] **Empty States**: Created reusable illustration placeholders for no results, loading, error, and empty lists.
- [x] **Error Handling**: Implemented network try-catches and error UI indicators across forms and details screens.
- [x] **Documentation**: Generated `NGO_MODULE.md` detailing flow diagrams, architecture, and route layout.
- [x] **Compilation**: Verified build succeeds with zero errors (`npm run build` and `npx tsc --noEmit` passed).
