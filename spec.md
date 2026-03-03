# Specification

## Summary
**Goal:** Enhance the Nashik Pune Cabs booking flow with stops, custom pricing, Pune location parity, luggage/seat fields, luxury category removal, and a booking lookup feature.

**Planned changes:**
- Add a dynamic "Stops" feature to the booking form with "Add Stop" / remove buttons; store stops in the booking record and display them in the admin view
- Add a price/fare field to the booking flow so customers see the price before submitting; allow admins to set or override the price per booking
- Remove the "Luxury" car category from the UI and backend variant types; only Sedan and SUV (and other non-luxury options) remain
- Apply the same searchable pickup/drop location list and quick-link options used for Nashik to the Pune location dropdowns
- Add "Number of Seats" and "Luggage" fields to the customer details section of the booking form; store both values in the booking record and show them in the admin view
- Add a "Track / View Booking" section on the landing page where customers can enter a booking reference ID or phone number to retrieve and display their full booking summary (route, stops, date/time, car type, passenger details, luggage, seats, price)

**User-visible outcome:** Customers can book with intermediate stops, see and understand the fare upfront, choose from Sedan/SUV only, specify seats and luggage, and look up their booking details from the landing page. Admins see all new fields in the bookings view.
