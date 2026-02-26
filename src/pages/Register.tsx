import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Film } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const Register = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("male");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) {
      toast({ title: "User / password is invalid. Please try again!", variant: "destructive" });
      return;
    }
    if (password !== confirmPassword) {
      toast({ title: "Passwords do not match!", variant: "destructive" });
      return;
    }
    if (!fullName || !email || !phone) {
      toast({ title: "Please fill in all required fields", variant: "destructive" });
      return;
    }
    toast({ title: "Account created!", description: "Please login with your new account." });
    navigate("/login");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-cinema px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-lg rounded-lg border border-border bg-card p-8"
      >
        <Link to="/" className="mb-6 flex items-center justify-center gap-2">
          <Film className="h-7 w-7 text-primary" />
          <span className="font-bebas text-2xl tracking-wider text-foreground">
            CINE<span className="text-primary">GOLD</span>
          </span>
        </Link>

        <h2 className="text-center font-bebas text-2xl tracking-wide text-foreground">Register Account</h2>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <Label htmlFor="username">Account *</Label>
            <Input id="username" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Enter username" className="mt-1" />
          </div>
          <div>
            <Label htmlFor="password">Password *</Label>
            <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" className="mt-1" />
          </div>
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
              <Label htmlFor="email">Email *</Label>
              <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@email.com" className="mt-1" />
            </div>
            <div>
              <Label htmlFor="phone">Phone Number *</Label>
              <Input id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="0775335515" className="mt-1" />
            </div>
          </div>

          <Button type="submit" className="w-full font-semibold">Register</Button>
        </form>

        <p className="mt-4 text-center text-sm text-muted-foreground">
          Have an account already?{" "}
          <Link to="/login" className="font-medium text-primary hover:underline">
            Login
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Register;
