import {
  Inbox,
  Loader2,
  Navigation,
  RefreshCw,
  ShieldAlert,
} from "lucide-react";
import { CarCategory, CarModel } from "../backend";
import { useBookingsWithIds } from "../hooks/useBookingsWithIds";
import { Alert, AlertDescription } from "./ui/alert";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";

const CAR_CATEGORY_LABELS: Record<CarCategory, string> = {
  [CarCategory.sedan]: "Sedan",
  [CarCategory.suv]: "SUV",
  [CarCategory.hatchback]: "Hatchback",
  [CarCategory.luxury]: "Luxury",
};

const CAR_MODEL_LABELS: Record<CarModel, string> = {
  [CarModel.swiftDzire]: "Swift Dzire",
  [CarModel.hondaAmaze]: "Honda Amaze",
  [CarModel.hyundaiXcent]: "Hyundai Xcent",
  [CarModel.marutiCiaz]: "Maruti Ciaz",
  [CarModel.innovaCrysta]: "Innova Crysta",
  [CarModel.ertiga]: "Ertiga",
  [CarModel.scorpio]: "Scorpio",
  [CarModel.swift]: "Swift",
  [CarModel.wagonR]: "WagonR",
  [CarModel.alto]: "Alto",
  [CarModel.mercedesEClass]: "Mercedes E-Class",
  [CarModel.bmw5Series]: "BMW 5 Series",
  [CarModel.audiA6]: "Audi A6",
  [CarModel.xl6]: "Maruti XL6",
  [CarModel.kiaCarens]: "Kia Carens",
  [CarModel.innova]: "Toyota Innova",
  [CarModel.tavera]: "Chevrolet Tavera",
};

export default function NotificationsAdminView() {
  const {
    data: bookings,
    isLoading,
    error,
    refetch,
    isRefetching,
  } = useBookingsWithIds();

  const formatTimestamp = (timestamp: bigint) => {
    const date = new Date(Number(timestamp) / 1_000_000);
    return date.toLocaleString("en-IN", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  };

  const isAuthError =
    error &&
    (error.message?.includes("Unauthorized") ||
      error.message?.includes("Only admins") ||
      error.message?.includes("trap"));

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          {bookings && bookings.length > 0
            ? `${bookings.length} booking${bookings.length === 1 ? "" : "s"} found`
            : "No bookings yet"}
        </p>
        <Button
          variant="outline"
          size="sm"
          onClick={() => refetch()}
          disabled={isLoading || isRefetching}
        >
          <RefreshCw
            className={`mr-2 h-4 w-4 ${isRefetching ? "animate-spin" : ""}`}
          />
          Refresh
        </Button>
      </div>

      {error && (
        <Alert variant="destructive">
          <ShieldAlert className="h-4 w-4" />
          <AlertDescription>
            {isAuthError
              ? "Access denied. You do not have permission to view bookings."
              : "Failed to load bookings. Please try again."}
          </AlertDescription>
        </Alert>
      )}

      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-saffron" />
        </div>
      ) : isAuthError ? null : bookings && bookings.length > 0 ? (
        <Card>
          <CardHeader>
            <CardTitle>All Bookings</CardTitle>
            <CardDescription>
              View all customer bookings, newest first
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Reference ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Car Model</TableHead>
                    <TableHead>Seats</TableHead>
                    <TableHead>Luggage</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Stops</TableHead>
                    <TableHead>Date & Time</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {bookings.map(([referenceId, booking]) => (
                    <TableRow key={referenceId}>
                      <TableCell className="font-mono text-sm font-semibold">
                        {referenceId}
                      </TableCell>
                      <TableCell>{booking.name}</TableCell>
                      <TableCell>{booking.phone}</TableCell>
                      <TableCell>
                        <span className="rounded-full bg-saffron/10 px-2 py-0.5 text-xs font-semibold text-saffron">
                          {CAR_CATEGORY_LABELS[booking.carCategory] ??
                            booking.carCategory}
                        </span>
                      </TableCell>
                      <TableCell className="font-medium">
                        {CAR_MODEL_LABELS[booking.carModel] ?? booking.carModel}
                      </TableCell>
                      <TableCell className="text-center">
                        {Number(booking.seats) > 0 ? (
                          <span className="font-semibold">
                            {Number(booking.seats)}
                          </span>
                        ) : (
                          <span className="text-muted-foreground">—</span>
                        )}
                      </TableCell>
                      <TableCell>
                        {Number(booking.luggage.count) > 0 ? (
                          <span className="text-sm">
                            {Number(booking.luggage.count)} bag
                            {Number(booking.luggage.count) !== 1 ? "s" : ""}
                            {booking.luggage.details ? (
                              <span className="block text-xs text-muted-foreground">
                                {booking.luggage.details}
                              </span>
                            ) : null}
                          </span>
                        ) : (
                          <span className="text-muted-foreground">—</span>
                        )}
                      </TableCell>
                      <TableCell>
                        {Number(booking.price) > 0 ? (
                          <span className="font-semibold text-saffron">
                            ₹{Number(booking.price).toLocaleString("en-IN")}
                          </span>
                        ) : (
                          <span className="text-muted-foreground">—</span>
                        )}
                      </TableCell>
                      <TableCell>
                        {booking.stops && booking.stops.length > 0 ? (
                          <div className="flex items-start gap-1">
                            <Navigation className="mt-0.5 h-3.5 w-3.5 shrink-0 text-saffron" />
                            <ol className="space-y-0.5">
                              {booking.stops.map((stop, i) => (
                                <li key={stop} className="text-xs">
                                  {i + 1}. {stop}
                                </li>
                              ))}
                            </ol>
                          </div>
                        ) : (
                          <span className="text-muted-foreground">—</span>
                        )}
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {formatTimestamp(booking.timestamp)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      ) : !error ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Inbox className="mb-4 h-12 w-12 text-muted-foreground" />
            <p className="text-lg font-semibold">No bookings yet</p>
            <p className="text-sm text-muted-foreground">
              Bookings will appear here once customers start booking
            </p>
          </CardContent>
        </Card>
      ) : null}
    </div>
  );
}
