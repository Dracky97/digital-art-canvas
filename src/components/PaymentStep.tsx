import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Building2, Lock, Check, ChevronLeft, Copy } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

interface PaymentStepProps {
  totalPrice: number;
  onSuccess: () => void;
  onBack: () => void;
  isProcessing: boolean;
  setIsProcessing: (value: boolean) => void;
}

const bankDetails = {
  bankName: "First National Bank",
  accountName: "Luxury Retreats Ltd",
  accountNumber: "1234567890",
  routingNumber: "021000021",
  swiftCode: "FNBKUS33",
  reference: "BOOK-" + Math.random().toString(36).substring(2, 8).toUpperCase(),
};

const PaymentStep = ({ 
  totalPrice, 
  onSuccess, 
  onBack,
  isProcessing,
  setIsProcessing 
}: PaymentStepProps) => {
  const [confirmed, setConfirmed] = useState(false);
  const { toast } = useToast();

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied!",
      description: `${label} copied to clipboard`,
    });
  };

  const handleConfirmPayment = async () => {
    if (!confirmed) {
      toast({
        title: "Please confirm",
        description: "Please confirm that you have initiated the bank transfer",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);
    
    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsProcessing(false);
    onSuccess();
  };

  return (
    <div className="space-y-6">
      <div className="bg-muted/30 rounded-lg p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-full bg-foreground/10 flex items-center justify-center">
            <Building2 className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-serif text-lg">Bank Transfer Details</h3>
            <p className="text-sm text-muted-foreground">Complete your payment via bank transfer</p>
          </div>
        </div>

        <div className="space-y-4">
          {[
            { label: "Bank Name", value: bankDetails.bankName },
            { label: "Account Name", value: bankDetails.accountName },
            { label: "Account Number", value: bankDetails.accountNumber },
            { label: "Routing Number", value: bankDetails.routingNumber },
            { label: "SWIFT Code", value: bankDetails.swiftCode },
            { label: "Payment Reference", value: bankDetails.reference },
          ].map((item) => (
            <div
              key={item.label}
              className="flex items-center justify-between p-3 border border-border rounded-lg bg-background"
            >
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider">{item.label}</p>
                <p className="font-medium">{item.value}</p>
              </div>
              <button
                onClick={() => copyToClipboard(item.value, item.label)}
                className="p-2 hover:bg-muted rounded-md transition-colors"
                title={`Copy ${item.label}`}
              >
                <Copy className="w-4 h-4 text-muted-foreground" />
              </button>
            </div>
          ))}

          <div className="flex items-center gap-2 text-xs text-muted-foreground mt-4">
            <Lock className="w-3 h-3" />
            <span>Please use the payment reference when making your transfer</span>
          </div>
        </div>
      </div>

      <div className="bg-muted/30 rounded-lg p-4">
        <div className="flex justify-between items-center">
          <span className="text-muted-foreground">Amount to transfer</span>
          <span className="text-xl font-serif">${totalPrice.toLocaleString()}</span>
        </div>
      </div>

      <div className="flex items-start gap-3 p-4 border border-border rounded-lg">
        <button
          onClick={() => setConfirmed(!confirmed)}
          className={cn(
            "w-5 h-5 rounded border flex-shrink-0 flex items-center justify-center transition-colors",
            confirmed
              ? "bg-foreground border-foreground"
              : "border-muted-foreground hover:border-foreground"
          )}
        >
          {confirmed && <Check className="w-3 h-3 text-background" />}
        </button>
        <p className="text-sm text-muted-foreground">
          I confirm that I have initiated the bank transfer with the correct reference number. I understand that my booking will be confirmed once the payment is received (typically 1-3 business days).
        </p>
      </div>

      <div className="flex items-center justify-between pt-2">
        <Button variant="ghost" onClick={onBack} className="gap-2" disabled={isProcessing}>
          <ChevronLeft className="w-4 h-4" />
          Back
        </Button>
        
        <Button
          onClick={handleConfirmPayment}
          disabled={isProcessing}
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
              Confirm Booking
              <Check className="w-4 h-4" />
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

export default PaymentStep;
