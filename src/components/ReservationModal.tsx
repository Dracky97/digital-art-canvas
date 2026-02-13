import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { format, addDays } from "date-fns";
import { Calendar, Users, Home, User, X, ChevronRight, ChevronLeft, Check, Bed, Maximize, Plus, Minus } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { Elements } from "@stripe/react-stripe-js";
import { stripePromise } from "@/lib/stripe";
import PaymentStep from "@/components/PaymentStep";
import { saveReservation } from "@/lib/reservations";
import { getRoomPrices } from "@/lib/roomPricing";
import { validatePromoCode } from "@/lib/promoCodes";
import { Tag } from "lucide-react";

import indiaWilderness from "@/assets/india-wilderness.jpg";
import skiMountains from "@/assets/ski-mountains.jpg";
import beachCasita from "@/assets/beach-casita.jpg";
import tokyoInterior from "@/assets/tokyo-interior.jpg";
import coastalPool from "@/assets/coastal-pool.jpg";

interface ReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
  preSelectedRoom?: string;
  autoPromo?: { code: string; discountPercent: number; description: string } | null;
}

const roomImages: Record<string, string> = {
  "mud-house": indiaWilderness,
  "tree-house": skiMountains,
  "glamping": beachCasita,
  "luxury-suite": tokyoInterior,
  "family-suite": coastalPool,
};

const roomDetails: Record<string, { size: string; maxGuests: number; features: string[] }> = {
  "mud-house": { size: "85 sqm", maxGuests: 4, features: ["Paddyfield View", "King Bed", "Bathtub"] },
  "tree-house": { size: "120 sqm", maxGuests: 4, features: ["Forest View", "Jacuzzi", "2 King Beds"] },
  "glamping": { size: "60 sqm", maxGuests: 4, features: ["Safari View", "King Bed", "Outdoor Bath"] },
  "luxury-suite": { size: "250 sqm", maxGuests: 4, features: ["Private Pool", "2 Beds", "Butler Service"] },
  "family-suite": { size: "300 sqm", maxGuests: 7, features: ["3 King Beds", "3 Baths", "Living Room"] },
};

const getRooms = () => {
  const prices = getRoomPrices();
  return prices.map(r => ({
    ...r,
    image: roomImages[r.id] || indiaWilderness,
    ...(roomDetails[r.id] || { size: "—", maxGuests: 2, features: [] }),
  }));
};

const guestFormSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  specialRequests: z.string().optional(),
});

type GuestFormData = z.infer<typeof guestFormSchema>;

const ReservationModal = ({ isOpen, onClose, preSelectedRoom, autoPromo }: ReservationModalProps) => {
  const rooms = getRooms();
  const [step, setStep] = useState(1);
  const [checkIn, setCheckIn] = useState<Date>();
  const [checkOut, setCheckOut] = useState<Date>();
  const [guests, setGuests] = useState({ adults: 2, children: 0 });
  const [selectedRooms, setSelectedRooms] = useState<Record<string, number>>(
    preSelectedRoom ? { [preSelectedRoom]: 1 } : {}
  );
  const [isProcessing, setIsProcessing] = useState(false);
  const [checkInOpen, setCheckInOpen] = useState(false);
  const [checkOutOpen, setCheckOutOpen] = useState(false);
  const [promoCode, setPromoCode] = useState("");
  const [appliedPromo, setAppliedPromo] = useState<{ code: string; discountPercent: number; description: string } | null>(null);
  const [promoError, setPromoError] = useState("");
  const { toast } = useToast();

  const handleClose = () => {
    setStep(1);
    setCheckIn(undefined);
    setCheckOut(undefined);
    setSelectedRooms({});
    setGuests({ adults: 2, children: 0 });
    setPromoCode("");
    setAppliedPromo(null);
    setPromoError("");
    form.reset();
    onClose();
  };

  useEffect(() => {
    if (isOpen && preSelectedRoom) {
      setSelectedRooms(prev => ({ ...prev, [preSelectedRoom]: Math.max(prev[preSelectedRoom] || 0, 1) }));
    }
    if (isOpen && autoPromo) {
      setAppliedPromo(autoPromo);
      setPromoCode(autoPromo.code);
    }
  }, [isOpen, preSelectedRoom, autoPromo]);

  const toggleRoom = (roomId: string) => {
    setSelectedRooms(prev => {
      const current = prev[roomId] || 0;
      if (current > 0) {
        const next = { ...prev };
        delete next[roomId];
        return next;
      }
      return { ...prev, [roomId]: 1 };
    });
  };

  const updateRoomQuantity = (roomId: string, delta: number) => {
    setSelectedRooms(prev => {
      const current = prev[roomId] || 0;
      const next = Math.max(0, Math.min(5, current + delta));
      if (next === 0) {
        const updated = { ...prev };
        delete updated[roomId];
        return updated;
      }
      return { ...prev, [roomId]: next };
    });
  };

  const hasSelectedRooms = Object.keys(selectedRooms).length > 0;

  const form = useForm<GuestFormData>({
    resolver: zodResolver(guestFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      specialRequests: "",
    },
  });

  const handleNext = () => {
    if (step === 1 && (!checkIn || !checkOut)) {
      toast({ title: "Please select check-in and check-out dates", variant: "destructive" });
      return;
    }
    if (step === 2 && !hasSelectedRooms) {
      toast({ title: "Please select at least one room", variant: "destructive" });
      return;
    }
    if (step === 3) {
      form.trigger().then((isValid) => {
        if (isValid) {
          setStep(step + 1);
        }
      });
      return;
    }
    setStep(step + 1);
  };

  const handleBack = () => setStep(step - 1);

  const handlePaymentSuccess = () => {
    const nights = checkIn && checkOut ? Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24)) : 0;
    const formData = form.getValues();

    const roomSelections = Object.entries(selectedRooms).map(([roomId, quantity]) => {
      const room = rooms.find(r => r.id === roomId);
      return {
        roomId,
        roomName: room?.name || '',
        quantity,
        pricePerNight: room?.price || 0,
      };
    });

    if (checkIn && checkOut && roomSelections.length > 0) {
      saveReservation({
        rooms: roomSelections,
        checkIn: checkIn.toISOString(),
        checkOut: checkOut.toISOString(),
        guests,
        guestInfo: {
          firstName: formData.firstName || '',
          lastName: formData.lastName || '',
          email: formData.email || '',
          phone: formData.phone || '',
          specialRequests: formData.specialRequests,
        },
        totalPrice,
        nights,
      });
    }

    const roomSummary = roomSelections.map(r => `${r.quantity}x ${r.roomName}`).join(', ');
    toast({
      title: "Payment Successful!",
      description: `Thank you ${formData.firstName}! Booked ${roomSummary} for ${nights} nights.`,
    });

    handleClose();
  };

  const nights = checkIn && checkOut ? Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24)) : 0;
  const subtotal = Object.entries(selectedRooms).reduce((sum, [roomId, qty]) => {
    const room = rooms.find(r => r.id === roomId);
    return sum + (room?.price || 0) * qty * nights;
  }, 0);
  const discountAmount = appliedPromo ? Math.round(subtotal * appliedPromo.discountPercent / 100) : 0;
  const totalPrice = subtotal - discountAmount;

  const handleApplyPromo = () => {
    setPromoError("");
    const result = validatePromoCode(promoCode);
    if (result) {
      setAppliedPromo(result);
      toast({ title: `Promo code applied! ${result.description}` });
    } else {
      setPromoError("Invalid promo code");
      setAppliedPromo(null);
    }
  };

  const handleRemovePromo = () => {
    setAppliedPromo(null);
    setPromoCode("");
    setPromoError("");
  };

  const stepVariants = {
    enter: { opacity: 0, x: 20 },
    center: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 },
  };

  const getStepTitle = () => {
    switch (step) {
      case 1: return "Select Dates";
      case 2: return "Choose Your Room";
      case 3: return "Guest Information";
      case 4: return "Review Booking";
      case 5: return "Payment";
      default: return "";
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl p-0 gap-0 overflow-hidden bg-background border-none">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div>
            <p className="text-xs tracking-[0.2em] text-muted-foreground mb-1">STEP {step} OF 5</p>
            <h2 className="text-xl font-serif tracking-luxury">{getStepTitle()}</h2>
          </div>
          <button onClick={handleClose} className="p-2 hover:bg-muted rounded-full transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="flex gap-1 px-6 pt-4">
          {[1, 2, 3, 4, 5].map((s) => (
            <div
              key={s}
              className={cn(
                "h-1 flex-1 rounded-full transition-colors",
                s <= step ? "bg-foreground" : "bg-muted"
              )}
            />
          ))}
        </div>

        {/* Content */}
        <div className="p-6 min-h-[400px]">
          <AnimatePresence mode="wait">
            {/* Step 1: Date & Guest Selection */}
            {step === 1 && (
              <motion.div
                key="step1"
                variants={stepVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Check-in Date */}
                  <div className="space-y-2">
                    <Label className="text-xs tracking-[0.15em] text-muted-foreground">CHECK-IN</Label>
                    <Popover open={checkInOpen} onOpenChange={setCheckInOpen}>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal h-12",
                            !checkIn && "text-muted-foreground"
                          )}
                        >
                          <Calendar className="mr-2 h-4 w-4" />
                          {checkIn ? format(checkIn, "PPP") : "Select date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <CalendarComponent
                          mode="single"
                          selected={checkIn}
                          onSelect={(date) => { setCheckIn(date); setCheckInOpen(false); }}
                          disabled={(date) => date < new Date()}
                          initialFocus
                          className="p-3 pointer-events-auto"
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  {/* Check-out Date */}
                  <div className="space-y-2">
                    <Label className="text-xs tracking-[0.15em] text-muted-foreground">CHECK-OUT</Label>
                    <Popover open={checkOutOpen} onOpenChange={setCheckOutOpen}>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal h-12",
                            !checkOut && "text-muted-foreground"
                          )}
                        >
                          <Calendar className="mr-2 h-4 w-4" />
                          {checkOut ? format(checkOut, "PPP") : "Select date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <CalendarComponent
                          mode="single"
                          selected={checkOut}
                          onSelect={(date) => { setCheckOut(date); setCheckOutOpen(false); }}
                          disabled={(date) => date < (checkIn ? addDays(checkIn, 1) : new Date())}
                          initialFocus
                          className="p-3 pointer-events-auto"
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>

                {/* Guest Selection */}
                <div className="space-y-4">
                  <Label className="text-xs tracking-[0.15em] text-muted-foreground">GUESTS</Label>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                      <div className="flex items-center gap-3">
                        <Users className="w-5 h-5 text-muted-foreground" />
                        <span className="text-sm">Adults</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => setGuests({ ...guests, adults: Math.max(1, guests.adults - 1) })}
                          className="w-8 h-8 border border-border rounded-full flex items-center justify-center hover:bg-muted transition-colors"
                        >
                          -
                        </button>
                        <span className="w-6 text-center">{guests.adults}</span>
                        <button
                          onClick={() => setGuests({ ...guests, adults: Math.min(6, guests.adults + 1) })}
                          className="w-8 h-8 border border-border rounded-full flex items-center justify-center hover:bg-muted transition-colors"
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                      <div className="flex items-center gap-3">
                        <User className="w-5 h-5 text-muted-foreground" />
                        <span className="text-sm">Children</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => setGuests({ ...guests, children: Math.max(0, guests.children - 1) })}
                          className="w-8 h-8 border border-border rounded-full flex items-center justify-center hover:bg-muted transition-colors"
                        >
                          -
                        </button>
                        <span className="w-6 text-center">{guests.children}</span>
                        <button
                          onClick={() => setGuests({ ...guests, children: Math.min(4, guests.children + 1) })}
                          className="w-8 h-8 border border-border rounded-full flex items-center justify-center hover:bg-muted transition-colors"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 2: Room Selection */}
            {step === 2 && (
              <motion.div
                key="step2"
                variants={stepVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.3 }}
                className="space-y-4"
              >
                <p className="text-sm text-muted-foreground mb-4">Use the + button to add rooms to your reservation.</p>
                <div className="space-y-3 max-h-[360px] overflow-y-auto pr-1">
                  {rooms.map((room) => {
                    const isSelected = (selectedRooms[room.id] || 0) > 0;
                    const qty = selectedRooms[room.id] || 0;
                    return (
                      <div
                        key={room.id}
                        className={cn(
                          "flex gap-4 rounded-lg border-2 p-3 transition-all",
                          isSelected
                            ? "border-foreground bg-muted/40"
                            : "border-border"
                        )}
                      >
                        {/* Thumbnail */}
                        <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-md overflow-hidden flex-shrink-0">
                          <img src={room.image} alt={room.name} className="w-full h-full object-cover" />
                        </div>

                        {/* Info */}
                        <div className="flex-1 min-w-0 flex flex-col justify-between">
                          <div>
                            <div className="flex items-center justify-between">
                              <h3 className="font-serif text-base sm:text-lg leading-tight">{room.name}</h3>
                              {isSelected && (
                                <div className="w-5 h-5 bg-foreground rounded-full flex items-center justify-center flex-shrink-0">
                                  <Check className="w-3 h-3 text-background" />
                                </div>
                              )}
                            </div>
                            <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                              <span className="flex items-center gap-1"><Maximize className="w-3 h-3" />{room.size}</span>
                              <span className="flex items-center gap-1"><Users className="w-3 h-3" />Up to {room.maxGuests}</span>
                            </div>
                            <div className="flex flex-wrap gap-1.5 mt-2">
                              {room.features.map((f) => (
                                <span key={f} className="text-[10px] tracking-wider uppercase px-2 py-0.5 bg-muted rounded-full text-muted-foreground">
                                  {f}
                                </span>
                              ))}
                            </div>
                          </div>
                          <div className="flex items-center justify-between mt-2">
                            <span className="font-serif text-sm font-medium">${room.price}<span className="text-muted-foreground text-xs font-sans">/night</span></span>
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => updateRoomQuantity(room.id, -1)}
                                disabled={qty === 0}
                                className="w-7 h-7 border border-border rounded-full flex items-center justify-center hover:bg-muted transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                              >
                                <Minus className="w-3 h-3" />
                              </button>
                              <span className="w-5 text-center text-sm font-medium">{qty}</span>
                              <button
                                onClick={() => updateRoomQuantity(room.id, 1)}
                                className="w-7 h-7 border border-border rounded-full flex items-center justify-center hover:bg-muted transition-colors"
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
                {hasSelectedRooms && (
                  <div className="pt-3 border-t border-border flex justify-between items-center text-sm">
                    <span className="text-muted-foreground">
                      {Object.values(selectedRooms).reduce((a, b) => a + b, 0)} room(s) selected
                    </span>
                    <span className="font-medium">
                      ${Object.entries(selectedRooms).reduce((sum, [id, qty]) => sum + (rooms.find(r => r.id === id)?.price || 0) * qty, 0).toLocaleString()}/night
                    </span>
                  </div>
                )}
              </motion.div>
            )}

            {/* Step 3: Guest Information */}
            {step === 3 && (
              <motion.div
                key="step3"
                variants={stepVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.3 }}
              >
                <Form {...form}>
                  <form className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="firstName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-xs tracking-[0.15em] text-muted-foreground">FIRST NAME</FormLabel>
                            <FormControl>
                              <Input placeholder="John" className="h-12" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="lastName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-xs tracking-[0.15em] text-muted-foreground">LAST NAME</FormLabel>
                            <FormControl>
                              <Input placeholder="Doe" className="h-12" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-xs tracking-[0.15em] text-muted-foreground">EMAIL</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="john@example.com" className="h-12" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-xs tracking-[0.15em] text-muted-foreground">PHONE</FormLabel>
                          <FormControl>
                            <Input type="tel" placeholder="+1 234 567 8900" className="h-12" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="specialRequests"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-xs tracking-[0.15em] text-muted-foreground">SPECIAL REQUESTS (OPTIONAL)</FormLabel>
                          <FormControl>
                            <Input placeholder="Any special requirements..." className="h-12" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </form>
                </Form>
              </motion.div>
            )}

            {/* Step 4: Review */}
            {step === 4 && (
              <motion.div
                key="step4"
                variants={stepVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div className="bg-muted/30 rounded-lg p-6 space-y-4">
                  <h3 className="font-serif text-lg">Booking Summary</h3>
                  
                  <div className="space-y-3 text-sm">
                    <div>
                      <span className="text-muted-foreground block mb-2">Rooms</span>
                      {Object.entries(selectedRooms).map(([roomId, qty]) => {
                        const room = rooms.find(r => r.id === roomId);
                        return (
                          <div key={roomId} className="flex justify-between py-1">
                            <span>{qty}x {room?.name}</span>
                            <span>${((room?.price || 0) * qty).toLocaleString()}/night</span>
                          </div>
                        );
                      })}
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Check-in</span>
                      <span>{checkIn ? format(checkIn, "PPP") : "-"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Check-out</span>
                      <span>{checkOut ? format(checkOut, "PPP") : "-"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Guests</span>
                      <span>{guests.adults} Adults, {guests.children} Children</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Nights</span>
                      <span>{nights}</span>
                    </div>
                    <div className="border-t border-border pt-3 space-y-2">
                      {appliedPromo && (
                        <>
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Subtotal</span>
                            <span>${subtotal.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between text-sm text-primary">
                            <span>Discount ({appliedPromo.discountPercent}% — {appliedPromo.code})</span>
                            <span>-${discountAmount.toLocaleString()}</span>
                          </div>
                        </>
                      )}
                      <div className="flex justify-between font-medium">
                        <span>Total</span>
                        <span>${totalPrice.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Promo Code */}
                <div className="bg-muted/30 rounded-lg p-6 space-y-3">
                  <h3 className="font-serif text-lg flex items-center gap-2">
                    <Tag className="w-4 h-4" />
                    Promo Code
                  </h3>
                  {appliedPromo ? (
                    <div className="flex items-center justify-between p-3 border border-primary/30 bg-primary/5 rounded-lg">
                      <div>
                        <span className="font-medium text-sm">{appliedPromo.code}</span>
                        <span className="text-sm text-muted-foreground ml-2">— {appliedPromo.description}</span>
                      </div>
                      <button
                        onClick={handleRemovePromo}
                        className="text-xs text-muted-foreground hover:text-foreground underline"
                      >
                        Remove
                      </button>
                    </div>
                  ) : (
                    <div className="flex gap-2">
                      <Input
                        placeholder="Enter promo code"
                        value={promoCode}
                        onChange={(e) => { setPromoCode(e.target.value); setPromoError(""); }}
                        className="h-10 uppercase"
                      />
                      <Button
                        onClick={handleApplyPromo}
                        variant="outline"
                        className="shrink-0"
                        disabled={!promoCode.trim()}
                      >
                        Apply
                      </Button>
                    </div>
                  )}
                  {promoError && <p className="text-sm text-destructive">{promoError}</p>}
                </div>

                <div className="bg-muted/30 rounded-lg p-6 space-y-3">
                  <h3 className="font-serif text-lg">Guest Details</h3>
                  <div className="text-sm space-y-2">
                    <p>{form.getValues("firstName")} {form.getValues("lastName")}</p>
                    <p className="text-muted-foreground">{form.getValues("email")}</p>
                    <p className="text-muted-foreground">{form.getValues("phone")}</p>
                    {form.getValues("specialRequests") && (
                      <p className="text-muted-foreground italic">"{form.getValues("specialRequests")}"</p>
                    )}
                  </div>
                </div>

                <p className="text-sm text-muted-foreground">
                  By proceeding to payment, you agree to our booking terms and cancellation policy.
                </p>
              </motion.div>
            )}

            {/* Step 5: Payment */}
            {step === 5 && (
              <motion.div
                key="step5"
                variants={stepVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.3 }}
              >
                <Elements stripe={stripePromise}>
                  <PaymentStep
                    totalPrice={totalPrice}
                    onSuccess={handlePaymentSuccess}
                    onBack={handleBack}
                    isProcessing={isProcessing}
                    setIsProcessing={setIsProcessing}
                  />
                </Elements>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer - hide on payment step as it has its own buttons */}
        {step !== 5 && (
          <div className="flex items-center justify-between p-6 border-t border-border">
            {step > 1 ? (
              <Button variant="ghost" onClick={handleBack} className="gap-2">
                <ChevronLeft className="w-4 h-4" />
                Back
              </Button>
            ) : (
              <div />
            )}
            
            {step < 4 ? (
              <Button onClick={handleNext} className="gap-2 bg-foreground text-background hover:bg-foreground/90">
                Continue
                <ChevronRight className="w-4 h-4" />
              </Button>
            ) : (
              <Button
                onClick={handleNext}
                className="gap-2 bg-foreground text-background hover:bg-foreground/90"
              >
                Proceed to Payment
                <ChevronRight className="w-4 h-4" />
              </Button>
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ReservationModal;
