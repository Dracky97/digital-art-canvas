import { useState, useEffect } from "react";
import { format } from "date-fns";
import { Calendar, Users, Home, Mail, Phone, Trash2, ArrowLeft, DollarSign, Save, Tag } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { getReservations, deleteReservation, updateReservationStatus, Reservation } from "@/lib/reservations";
import { getRoomPrices, updateRoomPrice, RoomPricing } from "@/lib/roomPricing";
import { getOffers, Offer } from "@/lib/offers";
import AdminOffersTab from "@/components/AdminOffersTab";
import { useToast } from "@/hooks/use-toast";

const Admin = () => {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [roomPrices, setRoomPrices] = useState<RoomPricing[]>([]);
  const [editedPrices, setEditedPrices] = useState<Record<string, string>>({});
  const [offers, setOffers] = useState<Offer[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    setReservations(getReservations());
    const prices = getRoomPrices();
    setRoomPrices(prices);
    const initial: Record<string, string> = {};
    prices.forEach(r => { initial[r.id] = r.price.toString(); });
    setEditedPrices(initial);
    setOffers(getOffers());
  }, []);

  const refreshOffers = () => setOffers(getOffers());

  const handleDelete = (id: string) => {
    deleteReservation(id);
    setReservations(getReservations());
    toast({ title: "Reservation deleted" });
  };

  const handleStatusChange = (id: string, status: Reservation['status']) => {
    updateReservationStatus(id, status);
    setReservations(getReservations());
    toast({ title: `Reservation ${status}` });
  };

  const handlePriceChange = (id: string, value: string) => {
    setEditedPrices(prev => ({ ...prev, [id]: value }));
  };

  const handleSavePrice = (id: string) => {
    const price = parseFloat(editedPrices[id]);
    if (isNaN(price) || price <= 0) {
      toast({ title: "Please enter a valid price", variant: "destructive" });
      return;
    }
    updateRoomPrice(id, price);
    setRoomPrices(getRoomPrices());
    toast({ title: "Room price updated" });
  };

  const handleSaveAllPrices = () => {
    for (const room of roomPrices) {
      const price = parseFloat(editedPrices[room.id]);
      if (isNaN(price) || price <= 0) {
        toast({ title: `Invalid price for ${room.name}`, variant: "destructive" });
        return;
      }
    }
    for (const room of roomPrices) {
      updateRoomPrice(room.id, parseFloat(editedPrices[room.id]));
    }
    setRoomPrices(getRoomPrices());
    toast({ title: "All room prices updated" });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-500/10 text-green-600 border-green-500/20';
      case 'pending': return 'bg-yellow-500/10 text-yellow-600 border-yellow-500/20';
      case 'cancelled': return 'bg-red-500/10 text-red-600 border-red-500/20';
      default: return '';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl font-serif tracking-luxury">Admin Dashboard</h1>
              <p className="text-sm text-muted-foreground">Manage reservations & pricing</p>
            </div>
          </div>
          <Badge variant="outline" className="text-xs">
            {reservations.length} Total Reservations
          </Badge>
        </div>
      </header>

      {/* Content */}
      <main className="container mx-auto px-6 py-8">
        <Tabs defaultValue="reservations" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="reservations" className="gap-2">
              <Calendar className="w-4 h-4" /> Reservations
            </TabsTrigger>
            <TabsTrigger value="pricing" className="gap-2">
              <DollarSign className="w-4 h-4" /> Room Pricing
            </TabsTrigger>
            <TabsTrigger value="offers" className="gap-2">
              <Tag className="w-4 h-4" /> Offers
            </TabsTrigger>
          </TabsList>

          <TabsContent value="reservations">
            {reservations.length === 0 ? (
              <div className="text-center py-16">
                <Home className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                <h2 className="text-xl font-serif mb-2">No Reservations Yet</h2>
                <p className="text-muted-foreground mb-6">
                  Reservations made through the booking system will appear here.
                </p>
                <Link to="/">
                  <Button>Go to Homepage</Button>
                </Link>
              </div>
            ) : (
              <div className="rounded-lg border border-border overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted/50">
                      <TableHead>Guest</TableHead>
                      <TableHead>Room</TableHead>
                      <TableHead>Dates</TableHead>
                      <TableHead>Guests</TableHead>
                      <TableHead>Total</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {reservations.map((reservation) => (
                      <TableRow key={reservation.id}>
                        <TableCell>
                          <div>
                            <p className="font-medium">
                              {reservation.guestInfo.firstName} {reservation.guestInfo.lastName}
                            </p>
                            <div className="flex items-center gap-1 text-sm text-muted-foreground">
                              <Mail className="w-3 h-3" />
                              {reservation.guestInfo.email}
                            </div>
                            <div className="flex items-center gap-1 text-sm text-muted-foreground">
                              <Phone className="w-3 h-3" />
                              {reservation.guestInfo.phone}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Home className="w-4 h-4 text-muted-foreground" />
                            {reservation.rooms?.map(r => `${r.quantity}x ${r.roomName}`).join(', ') || 'N/A'}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-muted-foreground" />
                            <div className="text-sm">
                              <p>{format(new Date(reservation.checkIn), "MMM d, yyyy")}</p>
                              <p className="text-muted-foreground">
                                to {format(new Date(reservation.checkOut), "MMM d, yyyy")}
                              </p>
                              <p className="text-xs text-muted-foreground">{reservation.nights} nights</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Users className="w-4 h-4 text-muted-foreground" />
                            <span className="text-sm">
                              {reservation.guests.adults}A, {reservation.guests.children}C
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <span className="font-medium">${reservation.totalPrice.toLocaleString()}</span>
                        </TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(reservation.status)}>
                            {reservation.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-2">
                            {reservation.status !== 'cancelled' && (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleStatusChange(reservation.id, 'cancelled')}
                              >
                                Cancel
                              </Button>
                            )}
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive">
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>Delete Reservation</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    This will permanently delete the reservation for{" "}
                                    {reservation.guestInfo.firstName} {reservation.guestInfo.lastName}.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                                  <AlertDialogAction onClick={() => handleDelete(reservation.id)}>
                                    Delete
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </TabsContent>

          <TabsContent value="pricing">
            <div className="rounded-lg border border-border overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/50">
                    <TableHead>Room Type</TableHead>
                    <TableHead>Current Price (per night)</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {roomPrices.map((room) => (
                    <TableRow key={room.id}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Home className="w-4 h-4 text-muted-foreground" />
                          <span className="font-medium">{room.name}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2 max-w-[200px]">
                          <DollarSign className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                          <Input
                            type="number"
                            min="1"
                            value={editedPrices[room.id] || ""}
                            onChange={(e) => handlePriceChange(room.id, e.target.value)}
                            className="h-9"
                          />
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleSavePrice(room.id)}
                          className="gap-1"
                        >
                          <Save className="w-3 h-3" /> Save
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            <div className="mt-4 flex justify-end">
              <Button onClick={handleSaveAllPrices} className="gap-2">
                <Save className="w-4 h-4" /> Save All Prices
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="offers">
            <AdminOffersTab offers={offers} onRefresh={refreshOffers} />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Admin;
