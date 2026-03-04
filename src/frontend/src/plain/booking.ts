import { CarCategory, CarModel } from "../backend";
import { getActor } from "./actorClient";

interface BookingFormData {
  name: string;
  phone: string;
  pickup: string;
  drop: string;
  date: string;
  time: string;
  tripType: "one-way" | "round-trip";
  carType: string;
}

// Map the simple carType string to CarCategory + default CarModel
function getCarCategoryAndModel(carType: string): {
  carCategory: CarCategory;
  carModel: CarModel;
} {
  switch (carType) {
    case "suv":
      return { carCategory: CarCategory.suv, carModel: CarModel.innovaCrysta };
    case "hatchback":
      return { carCategory: CarCategory.hatchback, carModel: CarModel.swift };
    default:
      return { carCategory: CarCategory.sedan, carModel: CarModel.swiftDzire };
  }
}

// Default price per category (INR)
function getDefaultPrice(carType: string): bigint {
  switch (carType) {
    case "suv":
      return BigInt(4000);
    case "hatchback":
      return BigInt(2200);
    default:
      return BigInt(2800);
  }
}

let _currentBookingData: BookingFormData | null = null;

export function initBookingForm() {
  const container = document.getElementById("booking-container");
  if (!container) return;

  container.innerHTML = renderBookingForm();
  attachFormListeners();
}

function renderBookingForm(): string {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split("T")[0];

  return `
    <div class="mx-auto max-w-4xl rounded-lg border-2 border-border bg-card shadow-xl">
      <div class="space-y-1 rounded-t-lg bg-gradient-to-r from-saffron/10 to-saffron/5 p-6">
        <h2 class="text-2xl font-bold">Book Your Cab</h2>
        <p class="text-sm text-muted-foreground">Fill in the details below to reserve your ride from Nashik to Pune</p>
      </div>
      <div class="p-6">
        <form id="booking-form" class="space-y-6">
          <div class="space-y-4">
            <h3 class="text-lg font-semibold">Trip Details</h3>
            <div class="grid gap-4 sm:grid-cols-2">
              <div class="space-y-2">
                <label for="pickup" class="text-sm font-medium">Pickup Location</label>
                <input id="pickup" type="text" value="Nashik" placeholder="Enter pickup location" class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" />
                <p id="pickup-error" class="text-sm text-destructive hidden"></p>
              </div>
              <div class="space-y-2">
                <label for="drop" class="text-sm font-medium">Drop Location</label>
                <input id="drop" type="text" value="Pune" placeholder="Enter drop location" class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" />
                <p id="drop-error" class="text-sm text-destructive hidden"></p>
              </div>
            </div>
            <div class="grid gap-4 sm:grid-cols-2">
              <div class="space-y-2">
                <label for="date" class="text-sm font-medium">Journey Date</label>
                <input id="date" type="date" min="${minDate}" class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" />
                <p id="date-error" class="text-sm text-destructive hidden"></p>
              </div>
              <div class="space-y-2">
                <label for="time" class="text-sm font-medium">Pickup Time</label>
                <input id="time" type="time" class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" />
                <p id="time-error" class="text-sm text-destructive hidden"></p>
              </div>
            </div>
            <div class="grid gap-4 sm:grid-cols-2">
              <div class="space-y-2">
                <label for="tripType" class="text-sm font-medium">Trip Type</label>
                <select id="tripType" class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                  <option value="one-way">One Way</option>
                  <option value="round-trip">Round Trip</option>
                </select>
              </div>
              <div class="space-y-2">
                <label for="carType" class="text-sm font-medium">Car Type</label>
                <select id="carType" class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                  <option value="sedan">Sedan (4 seater)</option>
                  <option value="suv">SUV (6-7 seater)</option>
                  <option value="hatchback">Hatchback (4 seater)</option>
                </select>
              </div>
            </div>
          </div>
          <div class="space-y-4">
            <h3 class="text-lg font-semibold">Passenger Details</h3>
            <div class="grid gap-4 sm:grid-cols-2">
              <div class="space-y-2">
                <label for="name" class="text-sm font-medium">Full Name</label>
                <input id="name" type="text" placeholder="Enter your full name" class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" />
                <p id="name-error" class="text-sm text-destructive hidden"></p>
              </div>
              <div class="space-y-2">
                <label for="phone" class="text-sm font-medium">Phone Number</label>
                <input id="phone" type="tel" placeholder="+91 98765 43210" class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" />
                <p id="phone-error" class="text-sm text-destructive hidden"></p>
              </div>
            </div>
          </div>
          <div id="form-error" class="hidden rounded-lg border border-destructive bg-destructive/10 p-4">
            <p class="text-sm text-destructive"></p>
          </div>
          <button type="submit" id="submit-btn" class="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-saffron text-charcoal hover:bg-saffron/90 h-11 px-8 w-full">
            Confirm Booking
          </button>
        </form>
      </div>
    </div>
  `;
}

function renderConfirmation(
  referenceId: string,
  bookingData: BookingFormData,
): string {
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatTime = (timeStr: string) => {
    const [hours, minutes] = timeStr.split(":");
    const hour = Number.parseInt(hours);
    const ampm = hour >= 12 ? "PM" : "AM";
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
  };

  const carTypeLabels: Record<string, string> = {
    sedan: "Sedan (4 seater)",
    suv: "SUV (6-7 seater)",
    hatchback: "Hatchback (4 seater)",
  };

  return `
    <div class="mx-auto max-w-4xl rounded-lg border-2 border-saffron bg-card shadow-xl">
      <div class="space-y-1 rounded-t-lg bg-gradient-to-r from-saffron/20 to-saffron/10 p-6">
        <div class="flex items-center gap-3">
          <div class="flex h-12 w-12 items-center justify-center rounded-full bg-saffron">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="text-charcoal"><polyline points="20 6 9 17 4 12"/></svg>
          </div>
          <div>
            <h2 class="text-2xl font-bold">Booking Confirmed!</h2>
            <p class="text-sm text-muted-foreground">Your cab has been successfully booked</p>
          </div>
        </div>
      </div>
      <div class="p-6 space-y-6">
        <div class="rounded-lg bg-muted/50 p-4">
          <p class="text-sm text-muted-foreground mb-1">Booking Reference ID</p>
          <p class="text-2xl font-bold text-saffron">${referenceId}</p>
        </div>
        <div class="space-y-4">
          <h3 class="text-lg font-semibold">Trip Details</h3>
          <div class="grid gap-4 sm:grid-cols-2">
            <div>
              <p class="text-sm text-muted-foreground">Pickup Location</p>
              <p class="font-semibold">${bookingData.pickup}</p>
            </div>
            <div>
              <p class="text-sm text-muted-foreground">Drop Location</p>
              <p class="font-semibold">${bookingData.drop}</p>
            </div>
            <div>
              <p class="text-sm text-muted-foreground">Journey Date</p>
              <p class="font-semibold">${formatDate(bookingData.date)}</p>
            </div>
            <div>
              <p class="text-sm text-muted-foreground">Pickup Time</p>
              <p class="font-semibold">${formatTime(bookingData.time)}</p>
            </div>
            <div>
              <p class="text-sm text-muted-foreground">Trip Type</p>
              <p class="font-semibold">${bookingData.tripType === "one-way" ? "One Way" : "Round Trip"}</p>
            </div>
            <div>
              <p class="text-sm text-muted-foreground">Vehicle Type</p>
              <p class="font-semibold">${carTypeLabels[bookingData.carType] ?? bookingData.carType}</p>
            </div>
          </div>
        </div>
        <div class="space-y-4">
          <h3 class="text-lg font-semibold">Passenger Details</h3>
          <div class="grid gap-4 sm:grid-cols-2">
            <div>
              <p class="text-sm text-muted-foreground">Name</p>
              <p class="font-semibold">${bookingData.name}</p>
            </div>
            <div>
              <p class="text-sm text-muted-foreground">Phone Number</p>
              <p class="font-semibold">${bookingData.phone}</p>
            </div>
          </div>
        </div>
        <div class="rounded-lg border border-border bg-muted/30 p-4">
          <h4 class="font-semibold mb-2">Next Steps:</h4>
          <ul class="space-y-2 text-sm text-muted-foreground">
            <li class="flex items-start gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mt-0.5 flex-shrink-0 text-saffron"><polyline points="20 6 9 17 4 12"/></svg>
              Our team will contact you shortly to confirm the booking details
            </li>
            <li class="flex items-start gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mt-0.5 flex-shrink-0 text-saffron"><polyline points="20 6 9 17 4 12"/></svg>
              Driver details will be shared 1 hour before pickup time
            </li>
            <li class="flex items-start gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mt-0.5 flex-shrink-0 text-saffron"><polyline points="20 6 9 17 4 12"/></svg>
              For any queries, call us at <a href="tel:+919876543210" class="text-saffron hover:underline">+91 98765 43210</a>
            </li>
          </ul>
        </div>
        <button id="new-booking-btn" class="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-11 px-8 w-full">
          Book Another Cab
        </button>
      </div>
    </div>
  `;
}

function attachFormListeners() {
  const form = document.getElementById("booking-form") as HTMLFormElement;
  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = collectFormData();
    if (!validateForm(formData)) {
      return;
    }

    const submitBtn = document.getElementById(
      "submit-btn",
    ) as HTMLButtonElement;
    const originalText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = `
      <svg class="animate-spin -ml-1 mr-2 h-5 w-5 inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
      Processing...
    `;

    try {
      const actor = await getActor();
      const { carCategory, carModel } = getCarCategoryAndModel(
        formData.carType,
      );
      const price = getDefaultPrice(formData.carType);

      const response = await actor.createBooking(
        formData.name,
        formData.phone,
        carCategory,
        carModel,
        price,
        [],
        { count: BigInt(1), details: "" },
        BigInt(1),
      );

      const referenceId = response;

      _currentBookingData = formData;
      showConfirmation(referenceId, formData);
    } catch (error: any) {
      console.error("Booking error:", error);
      showFormError(
        "Failed to create booking. Please check your details and try again.",
      );
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalText;
    }
  });

  // Clear errors on input
  const inputs = ["name", "phone", "pickup", "drop", "date", "time"];
  for (const id of inputs) {
    const input = document.getElementById(id);
    if (input) {
      input.addEventListener("input", () => clearError(id));
    }
  }
}

function collectFormData(): BookingFormData {
  return {
    name: (document.getElementById("name") as HTMLInputElement).value,
    phone: (document.getElementById("phone") as HTMLInputElement).value,
    pickup: (document.getElementById("pickup") as HTMLInputElement).value,
    drop: (document.getElementById("drop") as HTMLInputElement).value,
    date: (document.getElementById("date") as HTMLInputElement).value,
    time: (document.getElementById("time") as HTMLInputElement).value,
    tripType: (document.getElementById("tripType") as HTMLSelectElement)
      .value as "one-way" | "round-trip",
    carType: (document.getElementById("carType") as HTMLSelectElement).value,
  };
}

function validateForm(data: BookingFormData): boolean {
  let isValid = true;

  if (!data.name.trim() || data.name.length < 2) {
    showError("name", "Name must be at least 2 characters");
    isValid = false;
  }

  if (!data.phone.trim() || data.phone.length < 10) {
    showError("phone", "Please enter a valid phone number");
    isValid = false;
  }

  if (!data.pickup.trim()) {
    showError("pickup", "Pickup location is required");
    isValid = false;
  }

  if (!data.drop.trim()) {
    showError("drop", "Drop location is required");
    isValid = false;
  }

  if (!data.date) {
    showError("date", "Please select a date");
    isValid = false;
  }

  if (!data.time) {
    showError("time", "Please select a time");
    isValid = false;
  }

  return isValid;
}

function showError(fieldId: string, message: string) {
  const input = document.getElementById(fieldId);
  const error = document.getElementById(`${fieldId}-error`);

  if (input) {
    input.classList.add("border-destructive");
  }

  if (error) {
    error.textContent = message;
    error.classList.remove("hidden");
  }
}

function clearError(fieldId: string) {
  const input = document.getElementById(fieldId);
  const error = document.getElementById(`${fieldId}-error`);

  if (input) {
    input.classList.remove("border-destructive");
  }

  if (error) {
    error.classList.add("hidden");
  }
}

function showFormError(message: string) {
  const errorDiv = document.getElementById("form-error");
  if (errorDiv) {
    errorDiv.querySelector("p")!.textContent = message;
    errorDiv.classList.remove("hidden");
  }
}

function showConfirmation(referenceId: string, bookingData: BookingFormData) {
  const container = document.getElementById("booking-container");
  if (!container) return;

  container.innerHTML = renderConfirmation(referenceId, bookingData);

  const newBookingBtn = document.getElementById("new-booking-btn");
  if (newBookingBtn) {
    newBookingBtn.addEventListener("click", () => {
      initBookingForm();
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }
}
