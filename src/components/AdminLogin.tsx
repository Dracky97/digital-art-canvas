import { useState } from "react";
import { Lock, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

const ADMIN_PASSWORD_KEY = "aarawild_admin_password";
const ADMIN_SESSION_KEY = "aarawild_admin_session";
const DEFAULT_PASSWORD = "admin123";

export const initAdminPassword = () => {
  if (!localStorage.getItem(ADMIN_PASSWORD_KEY)) {
    localStorage.setItem(ADMIN_PASSWORD_KEY, DEFAULT_PASSWORD);
  }
};

export const isAdminAuthenticated = () => {
  return sessionStorage.getItem(ADMIN_SESSION_KEY) === "true";
};

export const adminLogout = () => {
  sessionStorage.removeItem(ADMIN_SESSION_KEY);
};

export const changeAdminPassword = (current: string, newPass: string): boolean => {
  const stored = localStorage.getItem(ADMIN_PASSWORD_KEY) || DEFAULT_PASSWORD;
  if (current !== stored) return false;
  localStorage.setItem(ADMIN_PASSWORD_KEY, newPass);
  return true;
};

interface AdminLoginProps {
  onAuthenticated: () => void;
}

const AdminLogin = ({ onAuthenticated }: AdminLoginProps) => {
  const [password, setPassword] = useState("");
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    initAdminPassword();
    const stored = localStorage.getItem(ADMIN_PASSWORD_KEY) || DEFAULT_PASSWORD;
    if (password === stored) {
      sessionStorage.setItem(ADMIN_SESSION_KEY, "true");
      onAuthenticated();
    } else {
      toast({ title: "Incorrect password", variant: "destructive" });
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="w-full max-w-sm mx-auto p-8">
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
            <Lock className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-2xl font-serif tracking-luxury mb-2">Admin Access</h1>
          <p className="text-sm text-muted-foreground">Enter password to continue</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter admin password"
              autoFocus
            />
          </div>
          <Button type="submit" className="w-full gap-2">
            <LogIn className="w-4 h-4" /> Sign In
          </Button>
        </form>
        <p className="text-xs text-muted-foreground text-center mt-6">
          Default password: admin123
        </p>
      </div>
    </div>
  );
};

export default AdminLogin;
