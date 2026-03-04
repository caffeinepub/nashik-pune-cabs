import { useQueryClient } from "@tanstack/react-query";
import {
  CheckCircle2,
  Copy,
  Loader2,
  Lock,
  LogOut,
  ShieldAlert,
  ShieldCheck,
} from "lucide-react";
import { useState } from "react";
import { useCurrentPrincipalText } from "../hooks/useCurrentPrincipalText";
import { useHasAdmin } from "../hooks/useHasAdmin";
import { useInitializeAdmin } from "../hooks/useInitializeAdmin";
import { useInternetIdentity } from "../hooks/useInternetIdentity";
import { useIsCallerAdmin } from "../hooks/useIsCallerAdmin";
import NotificationsAdminView from "./NotificationsAdminView";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";

export default function AdminBookingsPage() {
  const { login, clear, loginStatus, identity } = useInternetIdentity();
  const { isAdmin, isLoading: isCheckingAdmin } = useIsCallerAdmin();
  const { hasAdmin, isLoading: isCheckingHasAdmin } = useHasAdmin();
  const { principalText, isLoading: isLoadingPrincipal } =
    useCurrentPrincipalText();
  const initializeAdminMutation = useInitializeAdmin();
  const queryClient = useQueryClient();
  const [copied, setCopied] = useState(false);

  const isAuthenticated = !!identity && !identity.getPrincipal().isAnonymous();
  const isLoggingIn = loginStatus === "logging-in";

  const handleLogin = async () => {
    try {
      await login();
    } catch (error: any) {
      console.error("Login error:", error);
      if (error.message === "User is already authenticated") {
        await clear();
        setTimeout(() => login(), 300);
      }
    }
  };

  const handleLogout = async () => {
    await clear();
    queryClient.clear();
  };

  const handleClaimAdmin = async () => {
    try {
      await initializeAdminMutation.mutateAsync();
    } catch (error: any) {
      console.error("Failed to claim admin:", error);
    }
  };

  const handleCopyPrincipal = () => {
    navigator.clipboard.writeText(principalText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // State 1: Not logged in
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background">
        <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container flex h-16 items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-saffron text-charcoal">
                <Lock className="h-6 w-6" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-foreground">
                  Admin Panel
                </h1>
                <p className="text-xs text-muted-foreground">
                  Bookings Management
                </p>
              </div>
            </div>
          </div>
        </header>

        <main className="container py-16">
          <Card className="mx-auto max-w-md">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-saffron/10">
                <Lock className="h-8 w-8 text-saffron" />
              </div>
              <CardTitle>Admin Access Required</CardTitle>
              <CardDescription>
                Please log in with Internet Identity to access the admin panel
              </CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center">
              <Button
                onClick={handleLogin}
                disabled={isLoggingIn}
                size="lg"
                className="bg-saffron text-charcoal hover:bg-saffron/90"
              >
                {isLoggingIn ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Logging in...
                  </>
                ) : (
                  "Log in with Internet Identity"
                )}
              </Button>
            </CardContent>
          </Card>
        </main>
      </div>
    );
  }

  // State 2: Logged in but checking admin/hasAdmin status
  if (isCheckingAdmin || isCheckingHasAdmin) {
    return (
      <div className="min-h-screen bg-background">
        <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container flex h-16 items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-saffron text-charcoal">
                <Lock className="h-6 w-6" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-foreground">
                  Admin Panel
                </h1>
                <p className="text-xs text-muted-foreground">
                  Bookings Management
                </p>
              </div>
            </div>
            <Button variant="outline" size="sm" onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>
        </header>

        <main className="container py-16">
          <div className="flex items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-saffron" />
          </div>
        </main>
      </div>
    );
  }

  // State 3: Logged in, no admin configured - show claim admin UI
  if (!hasAdmin) {
    return (
      <div className="min-h-screen bg-background">
        <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container flex h-16 items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-saffron text-charcoal">
                <Lock className="h-6 w-6" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-foreground">
                  Admin Panel
                </h1>
                <p className="text-xs text-muted-foreground">
                  Bookings Management
                </p>
              </div>
            </div>
            <Button variant="outline" size="sm" onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>
        </header>

        <main className="container py-16">
          <Card className="mx-auto max-w-2xl">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-saffron/10">
                <ShieldCheck className="h-8 w-8 text-saffron" />
              </div>
              <CardTitle>Claim Admin Access</CardTitle>
              <CardDescription>
                No administrator has been configured for this system yet
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <Alert>
                <ShieldAlert className="h-4 w-4" />
                <AlertTitle>Important</AlertTitle>
                <AlertDescription>
                  By claiming admin access, your Internet Identity principal
                  will become the system administrator. This action can only be
                  performed once and cannot be undone without backend
                  intervention.
                </AlertDescription>
              </Alert>

              <div className="space-y-2">
                <label
                  htmlFor="principal-id"
                  className="text-sm font-medium text-foreground"
                >
                  Your Principal ID
                </label>
                <div className="flex items-center gap-2">
                  <div
                    id="principal-id"
                    className="flex-1 rounded-md border border-border bg-muted px-3 py-2"
                  >
                    {isLoadingPrincipal ? (
                      <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                    ) : (
                      <code className="text-xs break-all text-foreground">
                        {principalText}
                      </code>
                    )}
                  </div>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={handleCopyPrincipal}
                    disabled={isLoadingPrincipal || !principalText}
                  >
                    {copied ? (
                      <CheckCircle2 className="h-4 w-4 text-green-600" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">
                  This principal will have full administrative access to view
                  all bookings
                </p>
              </div>

              {initializeAdminMutation.isError && (
                <Alert variant="destructive">
                  <ShieldAlert className="h-4 w-4" />
                  <AlertDescription>
                    Failed to claim admin access:{" "}
                    {initializeAdminMutation.error?.message || "Unknown error"}
                  </AlertDescription>
                </Alert>
              )}

              <div className="flex justify-center">
                <Button
                  onClick={handleClaimAdmin}
                  disabled={
                    initializeAdminMutation.isPending || isLoadingPrincipal
                  }
                  size="lg"
                  className="bg-saffron text-charcoal hover:bg-saffron/90"
                >
                  {initializeAdminMutation.isPending ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Claiming Admin Access...
                    </>
                  ) : (
                    <>
                      <ShieldCheck className="mr-2 h-5 w-5" />
                      Claim Admin Access
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    );
  }

  // State 4: Logged in, admin exists but not authorized
  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-background">
        <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container flex h-16 items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-saffron text-charcoal">
                <Lock className="h-6 w-6" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-foreground">
                  Admin Panel
                </h1>
                <p className="text-xs text-muted-foreground">
                  Bookings Management
                </p>
              </div>
            </div>
            <Button variant="outline" size="sm" onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>
        </header>

        <main className="container py-16">
          <Alert variant="destructive" className="mx-auto max-w-md">
            <ShieldAlert className="h-5 w-5" />
            <AlertTitle>Access Denied</AlertTitle>
            <AlertDescription>
              You do not have permission to access this page. Only authorized
              administrators can view bookings.
            </AlertDescription>
          </Alert>
        </main>
      </div>
    );
  }

  // State 5: Authorized admin - show bookings
  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-saffron text-charcoal">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-6 w-6"
                aria-hidden="true"
              >
                <path d="M5 17H3a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h2" />
                <path d="M17 17h2a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-2" />
                <path d="M6 17a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2" />
                <circle cx="9" cy="17" r="2" />
                <circle cx="15" cy="17" r="2" />
              </svg>
            </div>
            <div>
              <h1 className="text-lg font-bold text-foreground">Admin Panel</h1>
              <p className="text-xs text-muted-foreground">
                Bookings Management
              </p>
            </div>
          </div>
          <Button variant="outline" size="sm" onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>
      </header>

      <main className="container py-8">
        <NotificationsAdminView />
      </main>
    </div>
  );
}
