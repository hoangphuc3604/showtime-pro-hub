import { useState } from "react";
import { Link } from "react-router-dom";
import { Film } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const Login = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("male");
  const [identityCard, setIdentityCard] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!username || !password) {
      toast({ title: "User / password is invalid. Please try again!", variant: "destructive" });
      return;
    }

    if (isRegister) {
      if (password !== confirmPassword) {
        toast({ title: "Passwords do not match!", variant: "destructive" });
        return;
      }
      if (!fullName || !email || !phone || !identityCard) {
        toast({ title: "Please fill in all required fields", variant: "destructive" });
        return;
      }
      toast({ title: "Account created!", description: "Please login with your new account." });
      setIsRegister(false);
    } else {
      toast({ title: "Welcome back!", description: "Login successful." });
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-cinema px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`w-full rounded-lg border border-border bg-card p-8 ${isRegister ? "max-w-lg" : "max-w-sm"}`}
      >
        <Link to="/" className="mb-6 flex items-center justify-center gap-2">
          <Film className="h-7 w-7 text-primary" />
          <span className="font-bebas text-2xl tracking-wider text-foreground">
            CINE<span className="text-primary">GOLD</span>
          </span>
        </Link>

        <h2 className="text-center font-bebas text-2xl tracking-wide text-foreground">
          {isRegister ? "Register Account" : "Login"}
        </h2>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <Label htmlFor="username">Account *</Label>
            <Input id="username" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Enter username" className="mt-1" />
          </div>
          <div>
            <Label htmlFor="password">Password *</Label>
            <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" className="mt-1" />
          </div>

          {isRegister && (
            <>
              <div>
                <Label htmlFor="confirmPassword">Confirm Password *</Label>
                <Input id="confirmPassword" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="••••••••" className="mt-1" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="fullName">Full Name *</Label>
                  <Input id="fullName" value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="Tran Van Tien" className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="dob">Date of Birth</Label>
                  <Input id="dob" type="date" value={dob} onChange={(e) => setDob(e.target.value)} className="mt-1" />
                </div>
              </div>
              <div>
                <Label>Gender</Label>
                <RadioGroup value={gender} onValueChange={setGender} className="mt-1 flex gap-4">
                  <div className="flex items-center gap-2">
                    <RadioGroupItem value="male" id="male" />
                    <Label htmlFor="male" className="font-normal">Male</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <RadioGroupItem value="female" id="female" />
                    <Label htmlFor="female" className="font-normal">Female</Label>
                  </div>
                </RadioGroup>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="identityCard">Identity Card *</Label>
                  <Input id="identityCard" value={identityCard} onChange={(e) => setIdentityCard(e.target.value)} placeholder="123456789" className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="email">Email *</Label>
                  <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@email.com" className="mt-1" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="0775335515" className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="address">Address</Label>
                  <Input id="address" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Da Nang" className="mt-1" />
                </div>
              </div>
            </>
          )}

          <Button type="submit" className="w-full font-semibold">
            {isRegister ? "Register" : "Login"}
          </Button>
        </form>

        <p className="mt-4 text-center text-sm text-muted-foreground">
          {isRegister ? "Have an account already?" : "Don't have an account yet?"}{" "}
          <button
            onClick={() => setIsRegister(!isRegister)}
            className="font-medium text-primary hover:underline"
          >
            {isRegister ? "Login" : "Register now!"}
          </button>
        </p>
      </motion.div>
    </div>
  );
};

export default Login;
