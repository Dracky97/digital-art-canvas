import { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { Button } from "@/components/ui/button";
import { CreditCard, Lock, Check, ChevronLeft } from "lucide-react";
import { cn } from "@/lib/utils";

interface PaymentStepProps {
  totalPrice: number;
  onSuccess: () => void;
  onBack: () => void;
  isProcessing: boolean;
  setIsProcessing: (value: boolean) => void;
}

const PaymentStep = ({ 
  totalPrice, 
  onSuccess, 
  onBack,
  isProcessing,
  setIsProcessing 
}: PaymentStepProps) => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState<string | null>(null);

  const handlePayment = async () => {
    if (!stripe || !elements) {
      setError("Stripe hasn't loaded yet. Please try again.");
      return;
    }

    setIsProcessing(true);
    setError(null);

    const cardElement = elements.getElement(CardElement);
    
    if (!cardElement) {
      setError("Card element not found");
      setIsProcessing(false);
      return;
    }

    // Create a payment method (in production, you'd send this to your backend)
    const { error: stripeError, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });

    if (stripeError) {
      setError(stripeError.message || "Payment failed");
      setIsProcessing(false);
      return;
    }

    // Simulate successful payment (in production, confirm with backend)
    console.log("Payment method created:", paymentMethod.id);
    
    // Simulate a delay for processing
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsProcessing(false);
    onSuccess();
  };

  return (
    <div className="space-y-6">
      <div className="bg-muted/30 rounded-lg p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-full bg-foreground/10 flex items-center justify-center">
            <CreditCard className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-serif text-lg">Payment Details</h3>
            <p className="text-sm text-muted-foreground">Secure payment powered by Stripe</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="p-4 border border-border rounded-lg bg-background">
            <CardElement
              options={{
                style: {
                  base: {
                    fontSize: '16px',
                    color: 'hsl(var(--foreground))',
                    '::placeholder': {
                      color: 'hsl(var(--muted-foreground))',
                    },
                    iconColor: 'hsl(var(--foreground))',
                  },
                  invalid: {
                    color: 'hsl(var(--destructive))',
                    iconColor: 'hsl(var(--destructive))',
                  },
                },
                hidePostalCode: true,
              }}
            />
          </div>

          {error && (
            <p className="text-sm text-destructive">{error}</p>
          )}

          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Lock className="w-3 h-3" />
            <span>Your payment information is encrypted and secure</span>
          </div>
        </div>
      </div>

      <div className="bg-muted/30 rounded-lg p-4">
        <div className="flex justify-between items-center">
          <span className="text-muted-foreground">Total to pay</span>
          <span className="text-xl font-serif">${totalPrice.toLocaleString()}</span>
        </div>
      </div>

      <div className="flex items-center justify-between pt-2">
        <Button variant="ghost" onClick={onBack} className="gap-2" disabled={isProcessing}>
          <ChevronLeft className="w-4 h-4" />
          Back
        </Button>
        
        <Button
          onClick={handlePayment}
          disabled={!stripe || isProcessing}
          className={cn(
            "gap-2 bg-foreground text-background hover:bg-foreground/90 min-w-[180px]",
            isProcessing && "opacity-70"
          )}
        >
          {isProcessing ? (
            <>
              <div className="w-4 h-4 border-2 border-background/30 border-t-background rounded-full animate-spin" />
              Processing...
            </>
          ) : (
            <>
              Pay ${totalPrice.toLocaleString()}
              <Check className="w-4 h-4" />
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

export default PaymentStep;
