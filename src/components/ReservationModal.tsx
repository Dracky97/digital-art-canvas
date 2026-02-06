import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { format, addDays } from "date-fns";
import { Calendar, Users, Home, User, X, ChevronRight, ChevronLeft, Check } from "lucide-react";
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
import PaymentStep from "@/components/PaymentStep";

import indiaWilderness from "@/assets/india-wilderness.jpg";
import skiMountains from "@/assets/ski-mountains.jpg";
import beachCasita from "@/assets/beach-casita.jpg";
import tokyoInterior from "@/assets/tokyo-interior.jpg";
import coastalPool from "@/assets/coastal-pool.jpg";

interface ReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const rooms = [
  { id: "mud-house", name: "Mud House", price: 450, image: indiaWilderness },
  { id: "tree-house", name: "Tree House", price: 550, image: skiMountains },
  { id: "glamping", name: "Luxury Glamping", price: 350, image: beachCasita },
  { id: "luxury-suite", name: "Luxury Suite", price: 750, image: tokyoInterior },
  { id: "family-suite", name: "Family Suite", price: 650, image: coastalPool },
];

const guestFormSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  specialRequests: z.string().optional(),
});

type GuestFormData = z.infer<typeof guestFormSchema>;

const ReservationModal = ({ isOpen, onClose }: ReservationModalProps) => {
  const [step, setStep] = useState(1);
  const [checkIn, setCheckIn] = useState<Date>();
  const [checkOut, setCheckOut] = useState<Date>();
  const [guests, setGuests] = useState({ adults: 2, children: 0 });
  const [selectedRoom, setSelectedRoom] = useState<string>();
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

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
    if (step === 2 && !selectedRoom) {
      toast({ title: "Please select a room", variant: "destructive" });
      return;
    }
    if (step === 3) {
      // Validate form before moving to step 4
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
    const selectedRoomData = rooms.find(r => r.id === selectedRoom);
    const nights = checkIn && checkOut ? Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24)) : 0;
    const formData = form.getValues();
    
    toast({
      title: "Payment Successful!",
      description: `Thank you ${formData.firstName}! Your ${selectedRoomData?.name} is booked for ${nights} nights.`,
    });
    
    // Reset and close
    setStep(1);
    setCheckIn(undefined);
    setCheckOut(undefined);
    setSelectedRoom(undefined);
    form.reset();
    onClose();
  };

  const selectedRoomData = rooms.find(r => r.id === selectedRoom);
  const nights = checkIn && checkOut ? Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24)) : 0;
  const totalPrice = selectedRoomData ? selectedRoomData.price * nights : 0;

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
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl p-0 gap-0 overflow-hidden bg-background border-none">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div>
            <p className="text-xs tracking-[0.2em] text-muted-foreground mb-1">STEP {step} OF 5</p>
            <h2 className="text-xl font-serif tracking-luxury">{getStepTitle()}</h2>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-muted rounded-full transition-colors">
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
                    <Popover>
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
                          onSelect={setCheckIn}
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
                    <Popover>
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
                          onSelect={setCheckOut}
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
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {rooms.map((room) => (
                    <button
                      key={room.id}
                      onClick={() => setSelectedRoom(room.id)}
                      className={cn(
                        "relative overflow-hidden rounded-lg border-2 transition-all text-left",
                        selectedRoom === room.id
                          ? "border-foreground"
                          : "border-transparent hover:border-muted-foreground/30"
                      )}
                    >
                      <div className="aspect-[4/3] relative">
                        <img
                          src={room.image}
                          alt={room.name}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 to-transparent" />
                        {selectedRoom === room.id && (
                          <div className="absolute top-3 right-3 w-6 h-6 bg-background rounded-full flex items-center justify-center">
                            <Check className="w-4 h-4" />
                          </div>
                        )}
                        <div className="absolute bottom-0 left-0 right-0 p-4">
                          <h3 className="text-background font-serif text-lg">{room.name}</h3>
                          <p className="text-background/80 text-sm">From ${room.price}/night</p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
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
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Room</span>
                      <span>{selectedRoomData?.name}</span>
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
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Rate per night</span>
                      <span>${selectedRoomData?.price}/night</span>
                    </div>
                    <div className="border-t border-border pt-3 flex justify-between font-medium">
                      <span>Total</span>
                      <span>${totalPrice.toLocaleString()}</span>
                    </div>
                  </div>
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
                <PaymentStep
                  totalPrice={totalPrice}
                  onSuccess={handlePaymentSuccess}
                  onBack={handleBack}
                  isProcessing={isProcessing}
                  setIsProcessing={setIsProcessing}
                />
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
