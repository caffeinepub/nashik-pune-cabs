import { login, logout, isAuthenticated, getIdentity } from './authClient';
import { getActor, clearActor } from './actorClient';

type AdminState = 'logged-out' | 'loading' | 'claim-admin' | 'access-denied' | 'authorized';

let currentState: AdminState = 'logged-out';
let bookings: Array<[string, any]> = [];

export function renderAdmin(): string {
  return `
    <div class="min-h-screen bg-background">
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
              <p class="text-xs text-muted-foreground">Admin Panel</p>
            </div>
          </div>
          <div class="flex items-center gap-2">
            <a href="#/" class="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2">
              Back to Home
            </a>
            <button id="auth-btn" class="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-saffron text-charcoal hover:bg-saffron/90 h-9 px-4 py-2">
              Login
            </button>
          </div>
        </div>
      </header>
      <main class="container py-8">
        <div id="admin-content"></div>
      </main>
    </div>
  `;
}

export async function initAdmin() {
  await checkAuthAndRender();
  attachAuthListener();
}

async function checkAuthAndRender() {
  const isAuth = await isAuthenticated();
  
  if (!isAuth) {
    currentState = 'logged-out';
    renderContent();
    return;
  }

  currentState = 'loading';
  renderContent();

  try {
    const actor = await getActor(true);
    
    // Check if admin exists
    const hasAdmin = await actor.hasAdmin();
    
    if (!hasAdmin) {
      currentState = 'claim-admin';
      renderContent();
      return;
    }

    // Check if current user is admin
    const isAdmin = await actor.isCallerAdmin();
    
    if (!isAdmin) {
      currentState = 'access-denied';
      renderContent();
      return;
    }

    // Load bookings
    currentState = 'authorized';
    await loadBookings();
    renderContent();
  } catch (error: any) {
    console.error('Admin check error:', error);
    if (error.message?.includes('Unauthorized') || error.message?.includes('admin')) {
      currentState = 'access-denied';
    } else {
      currentState = 'access-denied';
    }
    renderContent();
  }
}

async function loadBookings() {
  try {
    const actor = await getActor();
    bookings = await actor.getAllBookingsWithIdsSorted();
  } catch (error: any) {
    console.error('Load bookings error:', error);
    if (error.message?.includes('Unauthorized') || error.message?.includes('admin')) {
      currentState = 'access-denied';
      bookings = [];
    }
    throw error;
  }
}

function renderContent() {
  const content = document.getElementById('admin-content');
  const authBtn = document.getElementById('auth-btn');
  
  if (!content) return;

  if (authBtn) {
    if (currentState === 'logged-out') {
      authBtn.textContent = 'Login';
      authBtn.classList.remove('bg-gray-200', 'hover:bg-gray-300', 'text-gray-800');
      authBtn.classList.add('bg-saffron', 'hover:bg-saffron/90', 'text-charcoal');
    } else {
      authBtn.textContent = 'Logout';
      authBtn.classList.remove('bg-saffron', 'hover:bg-saffron/90', 'text-charcoal');
      authBtn.classList.add('bg-gray-200', 'hover:bg-gray-300', 'text-gray-800');
    }
  }

  switch (currentState) {
    case 'logged-out':
      content.innerHTML = renderLoggedOut();
      break;
    case 'loading':
      content.innerHTML = renderLoading();
      break;
    case 'claim-admin':
      content.innerHTML = renderClaimAdmin();
      attachClaimAdminListener();
      break;
    case 'access-denied':
      content.innerHTML = renderAccessDenied();
      break;
    case 'authorized':
      content.innerHTML = renderBookings();
      attachRefreshListener();
      break;
  }
}

function renderLoggedOut(): string {
  return `
    <div class="flex min-h-[60vh] items-center justify-center">
      <div class="text-center space-y-4">
        <div class="flex h-20 w-20 items-center justify-center rounded-full bg-saffron/10 mx-auto">
          <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-saffron"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
        </div>
        <h2 class="text-2xl font-bold">Admin Login Required</h2>
        <p class="text-muted-foreground max-w-md">Please log in with Internet Identity to access the admin panel.</p>
      </div>
    </div>
  `;
}

function renderLoading(): string {
  return `
    <div class="flex min-h-[60vh] items-center justify-center">
      <div class="text-center space-y-4">
        <svg class="animate-spin h-12 w-12 mx-auto text-saffron" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <p class="text-muted-foreground">Loading...</p>
      </div>
    </div>
  `;
}

function renderClaimAdmin(): string {
  return `
    <div class="flex min-h-[60vh] items-center justify-center">
      <div class="max-w-md rounded-lg border-2 border-saffron bg-card p-8 text-center space-y-4">
        <div class="flex h-16 w-16 items-center justify-center rounded-full bg-saffron/10 mx-auto">
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-saffron"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
        </div>
        <h2 class="text-2xl font-bold">Claim Admin Access</h2>
        <p class="text-muted-foreground">No admin has been configured yet. You can claim admin access for this application.</p>
        <div class="rounded-lg bg-muted/50 p-3 text-left">
          <p class="text-xs text-muted-foreground mb-1">Your Principal ID:</p>
          <p id="principal-id" class="text-xs font-mono break-all">Loading...</p>
        </div>
        <button id="claim-admin-btn" class="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-saffron text-charcoal hover:bg-saffron/90 h-11 px-8 w-full">
          Claim Admin Access
        </button>
      </div>
    </div>
  `;
}

function renderAccessDenied(): string {
  return `
    <div class="flex min-h-[60vh] items-center justify-center">
      <div class="text-center space-y-4">
        <div class="flex h-20 w-20 items-center justify-center rounded-full bg-destructive/10 mx-auto">
          <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-destructive"><circle cx="12" cy="12" r="10"/><path d="m15 9-6 6"/><path d="m9 9 6 6"/></svg>
        </div>
        <h2 class="text-2xl font-bold">Access Denied</h2>
        <p class="text-muted-foreground max-w-md">You do not have permission to access the admin panel.</p>
      </div>
    </div>
  `;
}

function renderBookings(): string {
  const formatDate = (timestamp: bigint) => {
    const date = new Date(Number(timestamp) / 1000000);
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const bookingRows = bookings.map(([id, booking]) => `
    <tr class="border-b border-border">
      <td class="px-4 py-3 font-mono text-sm">${id}</td>
      <td class="px-4 py-3">${booking.name}</td>
      <td class="px-4 py-3">${booking.phone}</td>
      <td class="px-4 py-3 text-sm text-muted-foreground">${formatDate(booking.timestamp)}</td>
    </tr>
  `).join('');

  return `
    <div class="space-y-6">
      <div class="flex items-center justify-between">
        <div>
          <h2 class="text-3xl font-bold">All Bookings</h2>
          <p class="text-muted-foreground">Manage and view all customer bookings</p>
        </div>
        <button id="refresh-btn" class="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-2"><path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/><path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16"/><path d="M16 16h5v5"/></svg>
          Refresh
        </button>
      </div>
      ${bookings.length === 0 ? `
        <div class="rounded-lg border border-border bg-card p-12 text-center">
          <p class="text-muted-foreground">No bookings found</p>
        </div>
      ` : `
        <div class="rounded-lg border border-border bg-card overflow-hidden">
          <div class="overflow-x-auto">
            <table class="w-full">
              <thead class="bg-muted/50">
                <tr class="border-b border-border">
                  <th class="px-4 py-3 text-left text-sm font-semibold">Booking ID</th>
                  <th class="px-4 py-3 text-left text-sm font-semibold">Customer Name</th>
                  <th class="px-4 py-3 text-left text-sm font-semibold">Phone</th>
                  <th class="px-4 py-3 text-left text-sm font-semibold">Booking Time</th>
                </tr>
              </thead>
              <tbody>
                ${bookingRows}
              </tbody>
            </table>
          </div>
        </div>
      `}
    </div>
  `;
}

function attachAuthListener() {
  const authBtn = document.getElementById('auth-btn');
  if (!authBtn) return;

  authBtn.addEventListener('click', async () => {
    const isAuth = await isAuthenticated();
    
    if (isAuth) {
      await logout();
      clearActor();
      await checkAuthAndRender();
    } else {
      try {
        await login();
        await checkAuthAndRender();
      } catch (error) {
        console.error('Login error:', error);
      }
    }
  });
}

async function attachClaimAdminListener() {
  const claimBtn = document.getElementById('claim-admin-btn');
  const principalEl = document.getElementById('principal-id');
  
  if (principalEl) {
    try {
      const identity = await getIdentity();
      if (identity) {
        principalEl.textContent = identity.getPrincipal().toString();
      }
    } catch (error) {
      console.error('Get principal error:', error);
    }
  }
  
  if (!claimBtn) return;

  claimBtn.addEventListener('click', async () => {
    const originalText = claimBtn.innerHTML;
    claimBtn.setAttribute('disabled', 'true');
    claimBtn.innerHTML = `
      <svg class="animate-spin -ml-1 mr-2 h-5 w-5 inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
      Claiming...
    `;

    try {
      const actor = await getActor();
      await actor.initializeAdmin();
      await checkAuthAndRender();
    } catch (error) {
      console.error('Claim admin error:', error);
      alert('Failed to claim admin access. Please try again.');
      claimBtn.removeAttribute('disabled');
      claimBtn.innerHTML = originalText;
    }
  });
}

function attachRefreshListener() {
  const refreshBtn = document.getElementById('refresh-btn');
  if (!refreshBtn) return;

  refreshBtn.addEventListener('click', async () => {
    const originalText = refreshBtn.innerHTML;
    refreshBtn.setAttribute('disabled', 'true');
    refreshBtn.innerHTML = `
      <svg class="animate-spin h-4 w-4 inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
    `;

    try {
      await loadBookings();
      renderContent();
    } catch (error) {
      console.error('Refresh error:', error);
    } finally {
      refreshBtn.removeAttribute('disabled');
      refreshBtn.innerHTML = originalText;
    }
  });
}
