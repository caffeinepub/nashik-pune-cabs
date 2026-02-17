import { useBookingsWithIds } from '../hooks/useBookingsWithIds';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Alert, AlertDescription } from './ui/alert';
import { Loader2, RefreshCw, Inbox } from 'lucide-react';

export default function NotificationsAdminView() {
  const { data: bookings, isLoading, error, refetch, isRefetching } = useBookingsWithIds();

  const formatTimestamp = (timestamp: bigint) => {
    const date = new Date(Number(timestamp) / 1_000_000); // Convert nanoseconds to milliseconds
    return date.toLocaleString('en-IN', {
      dateStyle: 'medium',
      timeStyle: 'short',
    });
  };

  return (
    <div className="mt-6 space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          {bookings && bookings.length > 0 ? `${bookings.length} booking${bookings.length === 1 ? '' : 's'}` : 'No bookings yet'}
        </p>
        <Button
          variant="outline"
          size="sm"
          onClick={() => refetch()}
          disabled={isLoading || isRefetching}
        >
          <RefreshCw className={`mr-2 h-4 w-4 ${isRefetching ? 'animate-spin' : ''}`} />
          Refresh
        </Button>
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertDescription>
            Failed to load bookings. Please try again.
          </AlertDescription>
        </Alert>
      )}

      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-saffron" />
        </div>
      ) : bookings && bookings.length > 0 ? (
        <Card>
          <CardHeader>
            <CardTitle>Recent Bookings</CardTitle>
            <CardDescription>All bookings are listed below, newest first</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Reference ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Phone</TableHead>
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
      ) : (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Inbox className="mb-4 h-12 w-12 text-muted-foreground" />
            <p className="text-lg font-semibold">No bookings yet</p>
            <p className="text-sm text-muted-foreground">
              New bookings will appear here
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
