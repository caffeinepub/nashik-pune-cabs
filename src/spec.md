# Specification

## Summary
**Goal:** Add a manual in-app Notifications/Admin page to review incoming cab bookings, and remove the Tempo Traveller option across the site.

**Planned changes:**
- Add a new header (or clearly visible) entry point that opens a Notifications/Admin view within the app.
- Implement the Notifications/Admin view to fetch and display bookings (newest first) with reference ID, customer name, phone, and formatted timestamp, including loading state, empty state, and a manual refresh action.
- Update the backend canister API with a query method that returns bookings along with their reference IDs, ordered by timestamp (newest first), for use by the Notifications/Admin view.
- Remove the Tempo Traveller option from the vehicle/pricing section and from the booking form car type selection, and update any related UI text.
- Update the vehicle set illustration asset to exclude the Tempo Traveller and update the vehicle/pricing section to reference the new filename.

**User-visible outcome:** Site owners can open an in-app Notifications/Admin page to manually review recent booking requests (with IDs and customer details) and refresh the list; users can only select Sedan or SUV (no Tempo Traveller) and the vehicle illustration reflects this.
