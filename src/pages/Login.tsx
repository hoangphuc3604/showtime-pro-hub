import { useState } from "react";
import { Link } from "react-router-dom";
import { Film } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { Checkbox } from "@/components/ui/checkbox";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) {
      toast({ title: "User / password is invalid. Please try again!", variant: "destructive" });
      return;
    }
    toast({ title: "Welcome back!", description: "Login successful." });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-cinema px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-sm rounded-lg border border-border bg-card p-8"
      >
        <Link to="/" className="mb-6 flex items-center justify-center gap-2">
          <Film className="h-7 w-7 text-primary" />
          <span className="font-bebas text-2xl tracking-wider text-foreground">
            CINE<span className="text-primary">GOLD</span>
          </span>
        </Link>

        <h2 className="text-center font-bebas text-2xl tracking-wide text-foreground">Login</h2>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <Label htmlFor="username">Account *</Label>
            <Input id="username" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Enter username" className="mt-1" />
          </div>
          <div>
            <Label htmlFor="password">Password *</Label>
            <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" className="mt-1" />
          </div>

          <div className="flex items-center gap-2">
            <Checkbox
              id="rememberMe"
              checked={rememberMe}
              onCheckedChange={(checked) => setRememberMe(checked === true)}
            />
            <Label htmlFor="rememberMe" className="font-normal cursor-pointer">Remember me</Label>
          </div>

          <Button type="submit" className="w-full font-semibold">Login</Button>
        </form>

        <p className="mt-4 text-center text-sm text-muted-foreground">
          Don't have an account yet?{" "}
          <Link to="/register" className="font-medium text-primary hover:underline">
            Register now!
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Login;
