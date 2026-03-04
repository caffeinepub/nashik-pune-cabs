export function renderLanding(): string {
  return `
    <!-- Header -->
    <header class="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div class="container flex h-16 items-center justify-between">
        <div class="flex items-center gap-2">
          <div class="flex h-10 w-10 items-center justify-center rounded-lg bg-saffron text-charcoal">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-6 w-6">
              <path d="M5 17H3a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h2" />
              <path d="M17 17h2a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-2" />
              <path d="M6 17a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2" />
              <circle cx="9" cy="17" r="2" />
              <circle cx="15" cy="17" r="2" />
            </svg>
          </div>
          <div>
            <h1 class="text-lg font-bold text-foreground">Nashik Pune Cabs</h1>
            <p class="text-xs text-muted-foreground">Reliable & Comfortable</p>
          </div>
        </div>
        <div class="flex items-center gap-2">
          <a href="tel:+919876543210" class="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-saffron text-charcoal hover:bg-saffron/90 h-9 px-4 py-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-2 h-4 w-4"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
            Call Now
          </a>
        </div>
      </div>
    </header>

    <!-- Hero Section -->
    <section class="relative overflow-hidden bg-gradient-to-br from-charcoal via-charcoal-light to-charcoal">
      <div class="absolute inset-0 bg-[url('/assets/generated/cab-hero.dim_1600x700.png')] bg-cover bg-center opacity-20"></div>
      <div class="container relative py-16 md:py-24">
        <div class="grid gap-8 lg:grid-cols-2 lg:gap-12">
          <div class="flex flex-col justify-center space-y-6">
            <div class="space-y-4">
              <h2 class="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
                Nashik to Pune
                <span class="block text-saffron">Taxi Service</span>
              </h2>
              <p class="text-lg text-gray-200 md:text-xl">
                Experience comfortable and reliable cab service from Nashik to Pune. Professional drivers, transparent pricing, and door-to-door convenience.
              </p>
            </div>
            <div class="flex flex-wrap gap-4">
              <a href="#booking" class="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-saffron text-charcoal hover:bg-saffron/90 h-11 px-8">Book Now</a>
              <a href="tel:+919876543210" class="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-white text-white hover:bg-white/10 h-11 px-8">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-2 h-5 w-5"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                +91 98765 43210
              </a>
            </div>
          </div>
          <div class="hidden lg:block">
            <img src="/assets/generated/cab-hero.dim_1600x700.png" alt="Comfortable taxi on highway from Nashik to Pune" class="rounded-2xl shadow-2xl" />
          </div>
        </div>
      </div>
    </section>

    <!-- Trust Strip -->
    <section class="border-b border-border bg-muted/30 py-8">
      <div class="container">
        <div class="grid grid-cols-2 gap-6 md:grid-cols-4">
          <div class="flex items-center gap-3">
            <div class="flex h-12 w-12 items-center justify-center rounded-full bg-saffron/10">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-6 w-6 text-saffron"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
            </div>
            <div>
              <p class="text-sm font-semibold">Verified Drivers</p>
              <p class="text-xs text-muted-foreground">Licensed & Trained</p>
            </div>
          </div>
          <div class="flex items-center gap-3">
            <div class="flex h-12 w-12 items-center justify-center rounded-full bg-saffron/10">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-6 w-6 text-saffron"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
            </div>
            <div>
              <p class="text-sm font-semibold">24/7 Support</p>
              <p class="text-xs text-muted-foreground">Always Available</p>
            </div>
          </div>
          <div class="flex items-center gap-3">
            <div class="flex h-12 w-12 items-center justify-center rounded-full bg-saffron/10">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-6 w-6 text-saffron"><line x1="12" x2="12" y1="2" y2="22"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
            </div>
            <div>
              <p class="text-sm font-semibold">Transparent Pricing</p>
              <p class="text-xs text-muted-foreground">No Hidden Charges</p>
            </div>
          </div>
          <div class="flex items-center gap-3">
            <div class="flex h-12 w-12 items-center justify-center rounded-full bg-saffron/10">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-6 w-6 text-saffron"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="19" x2="19" y1="8" y2="14"/><line x1="22" x2="16" y1="11" y2="11"/></svg>
            </div>
            <div>
              <p class="text-sm font-semibold">Happy Customers</p>
              <p class="text-xs text-muted-foreground">5000+ Rides</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Booking Section -->
    <section id="booking" class="py-12 md:py-16">
      <div class="container">
        <div id="booking-container"></div>
      </div>
    </section>

    <!-- Route Info -->
    <section class="bg-charcoal py-12 text-white md:py-16">
      <div class="container">
        <div class="mb-8 text-center">
          <h2 class="mb-2 text-3xl font-bold md:text-4xl">Nashik to Pune Route</h2>
          <p class="text-gray-300">Fast and comfortable journey on well-maintained highways</p>
        </div>
        <div class="mb-12 grid gap-6 md:grid-cols-3">
          <div class="rounded-lg bg-charcoal-light p-6 text-center">
            <div class="mb-2 text-4xl font-bold text-saffron">165 km</div>
            <p class="text-gray-300">Total Distance</p>
          </div>
          <div class="rounded-lg bg-charcoal-light p-6 text-center">
            <div class="mb-2 text-4xl font-bold text-saffron">3-4 hrs</div>
            <p class="text-gray-300">Journey Time</p>
          </div>
          <div class="rounded-lg bg-charcoal-light p-6 text-center">
            <div class="mb-2 text-4xl font-bold text-saffron">NH 60</div>
            <p class="text-gray-300">Via Highway</p>
          </div>
        </div>
        <div class="grid gap-8 md:grid-cols-2">
          <div>
            <h3 class="mb-4 text-xl font-semibold text-saffron">Popular Pickup Points in Nashik</h3>
            <ul class="space-y-2 text-gray-300">
              <li class="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-saffron"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                Nashik Road Railway Station
              </li>
              <li class="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-saffron"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                CBS (Central Bus Stand)
              </li>
              <li class="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-saffron"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                College Road
              </li>
              <li class="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-saffron"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                Panchavati Area
              </li>
            </ul>
          </div>
          <div>
            <h3 class="mb-4 text-xl font-semibold text-saffron">Popular Drop Points in Pune</h3>
            <ul class="space-y-2 text-gray-300">
              <li class="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-saffron"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                Pune Railway Station
              </li>
              <li class="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-saffron"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                Hinjewadi IT Park
              </li>
              <li class="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-saffron"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                Kothrud
              </li>
              <li class="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-saffron"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                Viman Nagar
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- Vehicle Pricing -->
    <section class="py-12 md:py-16">
      <div class="container">
        <div class="mb-12 text-center">
          <h2 class="mb-2 text-3xl font-bold md:text-4xl">Choose Your Vehicle</h2>
          <p class="text-muted-foreground">Comfortable options for every group size</p>
        </div>
        <div class="grid gap-6 md:grid-cols-2">
          <div class="rounded-lg border-2 border-border bg-card p-6 shadow-lg transition-all hover:border-saffron hover:shadow-xl">
            <div class="mb-4 flex items-center justify-between">
              <h3 class="text-2xl font-bold">Sedan</h3>
              <div class="rounded-full bg-saffron/10 px-3 py-1 text-sm font-semibold text-saffron">Popular</div>
            </div>
            <div class="mb-4 text-3xl font-bold text-saffron">₹2,500 - ₹3,000</div>
            <p class="mb-4 text-sm text-muted-foreground">Approximate fare for one-way trip</p>
            <ul class="mb-6 space-y-2">
              <li class="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-saffron"><polyline points="20 6 9 17 4 12"/></svg>
                4 Seater Capacity
              </li>
              <li class="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-saffron"><polyline points="20 6 9 17 4 12"/></svg>
                AC & Music System
              </li>
              <li class="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-saffron"><polyline points="20 6 9 17 4 12"/></svg>
                Spacious Boot Space
              </li>
              <li class="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-saffron"><polyline points="20 6 9 17 4 12"/></svg>
                Ideal for Small Families
              </li>
            </ul>
          </div>
          <div class="rounded-lg border-2 border-border bg-card p-6 shadow-lg transition-all hover:border-saffron hover:shadow-xl">
            <div class="mb-4 flex items-center justify-between">
              <h3 class="text-2xl font-bold">SUV</h3>
              <div class="rounded-full bg-saffron/10 px-3 py-1 text-sm font-semibold text-saffron">Spacious</div>
            </div>
            <div class="mb-4 text-3xl font-bold text-saffron">₹3,500 - ₹4,500</div>
            <p class="mb-4 text-sm text-muted-foreground">Approximate fare for one-way trip</p>
            <ul class="mb-6 space-y-2">
              <li class="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-saffron"><polyline points="20 6 9 17 4 12"/></svg>
                6-7 Seater Capacity
              </li>
              <li class="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-saffron"><polyline points="20 6 9 17 4 12"/></svg>
                Premium Comfort
              </li>
              <li class="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-saffron"><polyline points="20 6 9 17 4 12"/></svg>
                Extra Luggage Space
              </li>
              <li class="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-saffron"><polyline points="20 6 9 17 4 12"/></svg>
                Perfect for Groups
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- Highlights -->
    <section class="bg-muted/30 py-12 md:py-16">
      <div class="container">
        <div class="mb-12 text-center">
          <h2 class="mb-2 text-3xl font-bold md:text-4xl">Why Choose Us</h2>
          <p class="text-muted-foreground">Experience the best cab service from Nashik to Pune</p>
        </div>
        <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div class="rounded-lg bg-card p-6 shadow-sm">
            <div class="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-saffron/10">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-6 w-6 text-saffron"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
            </div>
            <h3 class="mb-2 text-xl font-semibold">24/7 Availability</h3>
            <p class="text-muted-foreground">Book anytime, day or night. We're always ready to serve you.</p>
          </div>
          <div class="rounded-lg bg-card p-6 shadow-sm">
            <div class="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-saffron/10">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-6 w-6 text-saffron"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
            </div>
            <h3 class="mb-2 text-xl font-semibold">Verified Drivers</h3>
            <p class="text-muted-foreground">All our drivers are licensed, trained, and background-verified.</p>
          </div>
          <div class="rounded-lg bg-card p-6 shadow-sm">
            <div class="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-saffron/10">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-6 w-6 text-saffron"><line x1="12" x2="12" y1="2" y2="22"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
            </div>
            <h3 class="mb-2 text-xl font-semibold">Transparent Pricing</h3>
            <p class="text-muted-foreground">No hidden charges. What you see is what you pay.</p>
          </div>
          <div class="rounded-lg bg-card p-6 shadow-sm">
            <div class="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-saffron/10">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-6 w-6 text-saffron"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
            </div>
            <h3 class="mb-2 text-xl font-semibold">Door-to-Door Service</h3>
            <p class="text-muted-foreground">Pickup and drop at your preferred location.</p>
          </div>
          <div class="rounded-lg bg-card p-6 shadow-sm">
            <div class="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-saffron/10">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-6 w-6 text-saffron"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
            </div>
            <h3 class="mb-2 text-xl font-semibold">Easy Booking</h3>
            <p class="text-muted-foreground">Book online or call us. Simple and hassle-free process.</p>
          </div>
          <div class="rounded-lg bg-card p-6 shadow-sm">
            <div class="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-saffron/10">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-6 w-6 text-saffron"><path d="M12 2v20M2 12h20"/></svg>
            </div>
            <h3 class="mb-2 text-xl font-semibold">Premium Comfort</h3>
            <p class="text-muted-foreground">Well-maintained vehicles with AC and comfortable seating.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- About Us Section -->
    <section class="bg-charcoal py-12 text-white md:py-16">
      <div class="container">
        <div class="mx-auto max-w-4xl">
          <div class="mb-8 text-center">
            <h2 class="mb-2 text-3xl font-bold md:text-4xl">About Us</h2>
            <div class="mx-auto mt-4 h-1 w-24 bg-saffron"></div>
          </div>
          <div class="space-y-6 text-gray-200">
            <p class="text-lg leading-relaxed">
              Nashik Pune Cabs is your trusted partner for comfortable and reliable transportation between Nashik and Pune. With years of experience in the cab service industry, we have built a reputation for punctuality, safety, and customer satisfaction. Our mission is to make your journey smooth, comfortable, and stress-free, whether you're traveling for business, leisure, or any other purpose.
            </p>
            <p class="text-lg leading-relaxed">
              We pride ourselves on our fleet of well-maintained vehicles and our team of professional, courteous drivers who know the Nashik-Pune route inside out. Operating 24/7 with transparent pricing and no hidden charges, we serve thousands of satisfied customers who trust us for their intercity travel needs. From airport transfers to corporate travel, family trips to emergency rides, Nashik Pune Cabs is committed to delivering exceptional service every single time.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- FAQ Section -->
    <section class="py-12 md:py-16">
      <div class="container">
        <div class="mb-12 text-center">
          <h2 class="mb-2 text-3xl font-bold md:text-4xl">Frequently Asked Questions</h2>
          <p class="text-muted-foreground">Everything you need to know about our service</p>
        </div>
        <div class="mx-auto max-w-3xl space-y-4">
          <details class="group rounded-lg border border-border bg-card p-6">
            <summary class="flex cursor-pointer items-center justify-between font-semibold">
              <span>How much does a cab from Nashik to Pune cost?</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="transition-transform group-open:rotate-180"><polyline points="6 9 12 15 18 9"/></svg>
            </summary>
            <p class="mt-4 text-muted-foreground">The fare depends on the vehicle type. Sedans cost approximately ₹2,500-₹3,000, while SUVs range from ₹3,500-₹4,500 for a one-way trip. Prices may vary based on specific pickup/drop locations and time of booking.</p>
          </details>
          <details class="group rounded-lg border border-border bg-card p-6">
            <summary class="flex cursor-pointer items-center justify-between font-semibold">
              <span>How long does the journey take?</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="transition-transform group-open:rotate-180"><polyline points="6 9 12 15 18 9"/></svg>
            </summary>
            <p class="mt-4 text-muted-foreground">The journey from Nashik to Pune typically takes 3-4 hours, covering approximately 165 km via NH 60. Travel time may vary depending on traffic conditions and specific pickup/drop locations.</p>
          </details>
          <details class="group rounded-lg border border-border bg-card p-6">
            <summary class="flex cursor-pointer items-center justify-between font-semibold">
              <span>Can I book a cab for a round trip?</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="transition-transform group-open:rotate-180"><polyline points="6 9 12 15 18 9"/></svg>
            </summary>
            <p class="mt-4 text-muted-foreground">Yes, we offer both one-way and round-trip services. Round trips often come with better rates. Please mention your requirement while booking.</p>
          </details>
          <details class="group rounded-lg border border-border bg-card p-6">
            <summary class="flex cursor-pointer items-center justify-between font-semibold">
              <span>Are your drivers verified and experienced?</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="transition-transform group-open:rotate-180"><polyline points="6 9 12 15 18 9"/></svg>
            </summary>
            <p class="mt-4 text-muted-foreground">Absolutely! All our drivers are licensed, trained, and background-verified. They have extensive experience on the Nashik-Pune route and prioritize your safety and comfort.</p>
          </details>
          <details class="group rounded-lg border border-border bg-card p-6">
            <summary class="flex cursor-pointer items-center justify-between font-semibold">
              <span>What is your cancellation policy?</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="transition-transform group-open:rotate-180"><polyline points="6 9 12 15 18 9"/></svg>
            </summary>
            <p class="mt-4 text-muted-foreground">You can cancel your booking up to 2 hours before the scheduled pickup time for a full refund. Cancellations within 2 hours may incur a small cancellation fee.</p>
          </details>
          <details class="group rounded-lg border border-border bg-card p-6">
            <summary class="flex cursor-pointer items-center justify-between font-semibold">
              <span>Do you provide 24/7 service?</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="transition-transform group-open:rotate-180"><polyline points="6 9 12 15 18 9"/></svg>
            </summary>
            <p class="mt-4 text-muted-foreground">Yes, we operate 24/7. You can book a cab at any time, day or night. Our customer support is also available round the clock to assist you.</p>
          </details>
          <details class="group rounded-lg border border-border bg-card p-6">
            <summary class="flex cursor-pointer items-center justify-between font-semibold">
              <span>Are there any hidden charges?</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="transition-transform group-open:rotate-180"><polyline points="6 9 12 15 18 9"/></svg>
            </summary>
            <p class="mt-4 text-muted-foreground">No, we believe in transparent pricing. The fare you see at the time of booking is the final amount you pay. Tolls and parking charges, if any, are mentioned separately.</p>
          </details>
          <details class="group rounded-lg border border-border bg-card p-6">
            <summary class="flex cursor-pointer items-center justify-between font-semibold">
              <span>How do I make a booking?</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="transition-transform group-open:rotate-180"><polyline points="6 9 12 15 18 9"/></svg>
            </summary>
            <p class="mt-4 text-muted-foreground">You can book through our website by filling out the booking form, or call us directly at +91 98765 43210. Our team will confirm your booking and provide all necessary details.</p>
          </details>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="border-t border-border bg-muted/30 py-12">
      <div class="container">
        <div class="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <div class="mb-4 flex items-center gap-2">
              <div class="flex h-10 w-10 items-center justify-center rounded-lg bg-saffron text-charcoal">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-6 w-6">
                  <path d="M5 17H3a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h2" />
                  <path d="M17 17h2a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-2" />
                  <path d="M6 17a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2" />
                  <circle cx="9" cy="17" r="2" />
                  <circle cx="15" cy="17" r="2" />
                </svg>
              </div>
              <div>
                <h3 class="font-bold">Nashik Pune Cabs</h3>
                <p class="text-xs text-muted-foreground">Reliable & Comfortable</p>
              </div>
            </div>
            <p class="text-sm text-muted-foreground">Your trusted partner for comfortable travel between Nashik and Pune.</p>
          </div>
          <div>
            <h4 class="mb-4 font-semibold">Quick Links</h4>
            <ul class="space-y-2 text-sm text-muted-foreground">
              <li><a href="#booking" class="hover:text-saffron">Book Now</a></li>
              <li><a href="#" class="hover:text-saffron">About Us</a></li>
              <li><a href="#" class="hover:text-saffron">Services</a></li>
              <li><a href="#" class="hover:text-saffron">Contact</a></li>
            </ul>
          </div>
          <div>
            <h4 class="mb-4 font-semibold">Contact Info</h4>
            <ul class="space-y-2 text-sm text-muted-foreground">
              <li class="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                +91 98765 43210
              </li>
              <li class="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                info@nashikpunecabs.com
              </li>
              <li class="flex items-start gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mt-0.5"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                Nashik, Maharashtra
              </li>
            </ul>
          </div>
          <div>
            <h4 class="mb-4 font-semibold">Service Hours</h4>
            <p class="text-sm text-muted-foreground">24/7 Available</p>
            <p class="mt-2 text-sm text-muted-foreground">All days of the week</p>
            <div class="mt-4 flex gap-3">
              <a href="#" class="text-muted-foreground hover:text-saffron">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </a>
              <a href="#" class="text-muted-foreground hover:text-saffron">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
              </a>
              <a href="#" class="text-muted-foreground hover:text-saffron">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z"/></svg>
              </a>
            </div>
          </div>
        </div>
        <div class="mt-8 border-t border-border pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; ${new Date().getFullYear()} Nashik Pune Cabs. All rights reserved.</p>
          <p class="mt-2">
            Built with 
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" class="inline text-red-500"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
            using <a href="https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "nashikpunecabs")}" target="_blank" rel="noopener noreferrer" class="text-saffron hover:underline">caffeine.ai</a>
          </p>
        </div>
      </div>
    </footer>
  `;
}
