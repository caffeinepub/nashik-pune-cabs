import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/sonner";
import { Car, Loader2, LogOut } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useInternetIdentity } from "../hooks/useInternetIdentity";
import {
  useGetAllBookings,
  useHasAdmin,
  useInitializeAdmin,
  useIsAdmin,
} from "../hooks/useQueries";

export default function AdminPage() {
  const { login, clear, loginStatus, identity } = useInternetIdentity();
  const isLoggedIn = !!identity;
  const isLoggingIn = loginStatus === "logging-in";

  const { data: isAdmin, isLoading: checkingAdmin } = useIsAdmin();
  const { data: hasAdmin, isLoading: checkingHasAdmin } = useHasAdmin();
  const { mutateAsync: initAdmin, isPending: claimingAdmin } =
    useInitializeAdmin();
  const {
    data: bookings,
    isLoading: loadingBookings,
    refetch,
  } = useGetAllBookings();

  const handleClaimAdmin = async () => {
    try {
      await initAdmin();
      toast.success("Admin access claimed!");
      refetch();
    } catch {
      toast.error("Failed to claim admin access.");
    }
  };

  const loading = checkingAdmin || checkingHasAdmin;

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#fffbeb" }}>
      {/* Header */}
      <header
        className="bg-white shadow-md border-b"
        style={{ borderColor: "#fde68a" }}
      >
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className="w-9 h-9 rounded-full flex items-center justify-center"
              style={{ backgroundColor: "#d97706" }}
            >
              <Car className="h-5 w-5 text-white" />
            </div>
            <div>
              <div className="font-bold" style={{ color: "#78350f" }}>
                Admin Panel
              </div>
              <div className="text-xs" style={{ color: "#b45309" }}>
                Nashik Pune Cabs
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {isLoggedIn && (
              <span className="text-xs" style={{ color: "#78350f" }}>
                {identity?.getPrincipal().toString().slice(0, 20)}...
              </span>
            )}
            {isLoggedIn ? (
              <Button
                variant="outline"
                size="sm"
                data-ocid="admin.logout.button"
                onClick={() => clear()}
              >
                <LogOut className="h-4 w-4 mr-2" /> Log Out
              </Button>
            ) : (
              <Button
                size="sm"
                data-ocid="admin.login.button"
                onClick={() => login()}
                disabled={isLoggingIn}
                className="text-white"
                style={{ backgroundColor: "#d97706" }}
              >
                {isLoggingIn ? (
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                ) : null}
                Login with Internet Identity
              </Button>
            )}
            <a href="/" className="text-sm" style={{ color: "#78350f" }}>
              ← Back to Site
            </a>
          </div>
        </div>
      </header>

      <main className="container py-10">
        {!isLoggedIn && (
          <div
            data-ocid="admin.login.panel"
            className="max-w-md mx-auto text-center py-20"
          >
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6"
              style={{ backgroundColor: "#fef3c7" }}
            >
              <Car className="h-8 w-8" style={{ color: "#d97706" }} />
            </div>
            <h2
              className="text-2xl font-bold mb-3"
              style={{ color: "#78350f" }}
            >
              Admin Access
            </h2>
            <p className="text-gray-600 mb-6">
              Please login with Internet Identity to access the admin panel.
            </p>
            <Button
              data-ocid="admin.login_main.button"
              onClick={() => login()}
              disabled={isLoggingIn}
              className="text-white px-8"
              style={{ backgroundColor: "#d97706" }}
            >
              {isLoggingIn ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  Logging in...
                </>
              ) : (
                "Login with Internet Identity"
              )}
            </Button>
          </div>
        )}

        {isLoggedIn && loading && (
          <div className="flex justify-center py-20">
            <Loader2
              className="h-8 w-8 animate-spin"
              style={{ color: "#d97706" }}
            />
          </div>
        )}

        {isLoggedIn && !loading && hasAdmin === false && (
          <div
            data-ocid="admin.claim.panel"
            className="max-w-md mx-auto text-center py-20"
          >
            <h2
              className="text-2xl font-bold mb-3"
              style={{ color: "#78350f" }}
            >
              No Admin Set
            </h2>
            <p className="text-gray-600 mb-6">
              No admin has been configured. Claim admin access now.
            </p>
            <Button
              data-ocid="admin.claim.button"
              onClick={handleClaimAdmin}
              disabled={claimingAdmin}
              className="text-white px-8"
              style={{ backgroundColor: "#d97706" }}
            >
              {claimingAdmin ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  Claiming...
                </>
              ) : (
                "Claim Admin Access"
              )}
            </Button>
          </div>
        )}

        {isLoggedIn && !loading && hasAdmin && !isAdmin && (
          <div
            data-ocid="admin.denied.panel"
            className="max-w-md mx-auto text-center py-20"
          >
            <div className="text-5xl mb-4">🚫</div>
            <h2 className="text-2xl font-bold mb-3 text-red-700">
              Access Denied
            </h2>
            <p className="text-gray-600">
              Your account does not have admin privileges.
            </p>
          </div>
        )}

        {isLoggedIn && !loading && isAdmin && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold" style={{ color: "#78350f" }}>
                All Bookings
              </h2>
              <Button
                variant="outline"
                size="sm"
                onClick={() => refetch()}
                data-ocid="admin.refresh.button"
              >
                Refresh
              </Button>
            </div>

            {loadingBookings ? (
              <div className="flex justify-center py-10">
                <Loader2
                  className="h-6 w-6 animate-spin"
                  style={{ color: "#d97706" }}
                />
              </div>
            ) : !bookings || bookings.length === 0 ? (
              <div
                data-ocid="admin.bookings.empty_state"
                className="text-center py-20 text-gray-500"
              >
                No bookings found.
              </div>
            ) : (
              <div
                className="rounded-xl overflow-hidden border"
                style={{ borderColor: "#fde68a" }}
              >
                <div className="overflow-x-auto">
                  <table
                    className="w-full text-sm"
                    data-ocid="admin.bookings.table"
                  >
                    <thead>
                      <tr style={{ backgroundColor: "#d97706" }}>
                        <th className="text-left px-4 py-3 text-white font-semibold">
                          ID
                        </th>
                        <th className="text-left px-4 py-3 text-white font-semibold">
                          Name
                        </th>
                        <th className="text-left px-4 py-3 text-white font-semibold">
                          Phone
                        </th>
                        <th className="text-left px-4 py-3 text-white font-semibold">
                          Car
                        </th>
                        <th className="text-left px-4 py-3 text-white font-semibold">
                          Seats
                        </th>
                        <th className="text-left px-4 py-3 text-white font-semibold">
                          Fare
                        </th>
                        <th className="text-left px-4 py-3 text-white font-semibold">
                          Route Info
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {bookings.map(([id, b], i) => (
                        <tr
                          key={id}
                          data-ocid={`admin.booking.row.${i + 1}`}
                          className={i % 2 === 0 ? "bg-white" : "bg-amber-50"}
                        >
                          <td
                            className="px-4 py-3 font-mono text-xs"
                            style={{ color: "#78350f" }}
                          >
                            {id.slice(0, 12)}...
                          </td>
                          <td className="px-4 py-3 font-semibold">{b.name}</td>
                          <td className="px-4 py-3">{b.phone}</td>
                          <td className="px-4 py-3">
                            <Badge variant="outline" className="text-xs">
                              {b.carModel}
                            </Badge>
                          </td>
                          <td className="px-4 py-3">{String(b.seats)}</td>
                          <td
                            className="px-4 py-3 font-semibold"
                            style={{ color: "#d97706" }}
                          >
                            ₹{String(b.price)}
                          </td>
                          <td className="px-4 py-3 text-xs text-gray-500 max-w-xs truncate">
                            {b.stops?.slice(0, 3).join(" | ") ?? ""}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}
      </main>
      <Toaster />
    </div>
  );
}
