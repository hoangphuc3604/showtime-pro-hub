import { useState } from "react";
import { Link } from "react-router-dom";
import { Film } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";

const Login = () => {
  const [isRegister, setIsRegister] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({ title: isRegister ? "Account created!" : "Welcome back!", description: "Authentication will be available once backend is connected." });
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

        <h2 className="text-center font-bebas text-2xl tracking-wide text-foreground">
          {isRegister ? "Create Account" : "Sign In"}
        </h2>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          {isRegister && (
            <div>
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" placeholder="John Doe" className="mt-1" />
            </div>
          )}
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="you@example.com" className="mt-1" />
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" placeholder="••••••••" className="mt-1" />
          </div>
          <Button type="submit" className="w-full font-semibold">
            {isRegister ? "Register" : "Sign In"}
          </Button>
        </form>

        <p className="mt-4 text-center text-sm text-muted-foreground">
          {isRegister ? "Already have an account?" : "Don't have an account?"}{" "}
          <button
            onClick={() => setIsRegister(!isRegister)}
            className="font-medium text-primary hover:underline"
          >
            {isRegister ? "Sign In" : "Register"}
          </button>
        </p>
      </motion.div>
    </div>
  );
};

export default Login;
