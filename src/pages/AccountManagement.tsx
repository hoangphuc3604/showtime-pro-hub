import { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "@/hooks/use-toast";
import { movies } from "@/data/movies";
import { User, Ticket, History, XCircle } from "lucide-react";

// Mock member data
const memberInfo = {
  account: "tientv5",
  fullName: "Tran Van Tien",
  dob: "1996-11-21",
  gender: "male",
  identityCard: "123456789",
  email: "tientran@gmail.com",
  phone: "0775335515",
  address: "Da Nang",
  score: 36500,
};

const bookedTickets = [
  { id: 1, movieName: "Stellar Odyssey", bookingDate: "2026-02-18 13:10", totalAmount: 135000, status: "Waiting for ticket" },
  { id: 2, movieName: "The Darkening", bookingDate: "2026-02-14 18:00", totalAmount: 90000, status: "Get ticket" },
  { id: 3, movieName: "Shadow Protocol", bookingDate: "2026-02-10 20:00", totalAmount: 45000, status: "Successful booking" },
];

const cancelledTickets = [
  { id: 1, movieName: "Midnight in Paris", bookingDate: "2026-02-12 14:00", totalAmount: 45000, status: "Cancelled" },
];

const scoreHistory = [
  { id: 1, dateCreated: "2026-02-18 13:10", movieName: "Stellar Odyssey", addedScore: 13500, usedScore: 0 },
  { id: 2, dateCreated: "2026-02-14 18:00", movieName: "The Darkening", addedScore: 9000, usedScore: 0 },
  { id: 3, dateCreated: "2026-02-10 20:00", movieName: "Shadow Protocol", addedScore: 0, usedScore: 4500 },
];

const AccountManagement = () => {
  const [info, setInfo] = useState(memberInfo);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [scoreFilter, setScoreFilter] = useState("adding");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const handleSave = () => {
    if (password && password !== confirmPassword) {
      toast({ title: "Passwords do not match!", variant: "destructive" });
      return;
    }
    toast({ title: "Update information successfully" });
  };

  const filteredScores = scoreHistory.filter((s) => {
    if (scoreFilter === "adding") return s.addedScore > 0;
    return s.usedScore > 0;
  });

  return (
    <div className="min-h-screen bg-gradient-cinema">
      <Navbar />
      <div className="container mx-auto px-4 pt-24 pb-16">
        <h1 className="font-bebas text-4xl tracking-wide text-foreground">
          Welcome, <span className="text-primary">{info.account}</span>
        </h1>

        <div className="mt-6 flex flex-col gap-6 lg:flex-row">
          {/* Sidebar Tabs */}
          <Tabs defaultValue="info" orientation="vertical" className="w-full">
            <div className="flex flex-col gap-6 lg:flex-row">
              <TabsList className="flex h-auto w-full flex-col gap-1 bg-card border border-border rounded-lg p-3 lg:w-56">
                <TabsTrigger value="info" className="w-full justify-start gap-2">
                  <User className="h-4 w-4" /> Account Information
                </TabsTrigger>
                <TabsTrigger value="history" className="w-full justify-start gap-2">
                  <History className="h-4 w-4" /> History
                </TabsTrigger>
                <TabsTrigger value="booked" className="w-full justify-start gap-2">
                  <Ticket className="h-4 w-4" /> Booked Ticket
                </TabsTrigger>
                <TabsTrigger value="cancelled" className="w-full justify-start gap-2">
                  <XCircle className="h-4 w-4" /> Cancelled Ticket
                </TabsTrigger>
              </TabsList>

              <div className="flex-1">
                {/* Account Information */}
                <TabsContent value="info">
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="rounded-lg border border-border bg-card p-6">
                    <h2 className="font-bebas text-2xl tracking-wide text-foreground">Account Information</h2>
                    <div className="mt-4 space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label>Account</Label>
                          <Input value={info.account} disabled className="mt-1 bg-muted" />
                        </div>
                        <div>
                          <Label>Score: <span className="text-primary font-semibold">{info.score.toLocaleString()}</span></Label>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label>Password</Label>
                          <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Leave blank to keep" className="mt-1" />
                        </div>
                        <div>
                          <Label>Confirm Password</Label>
                          <Input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="mt-1" />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label>Full Name</Label>
                          <Input value={info.fullName} onChange={(e) => setInfo({ ...info, fullName: e.target.value })} className="mt-1" />
                        </div>
                        <div>
                          <Label>Date of Birth</Label>
                          <Input type="date" value={info.dob} onChange={(e) => setInfo({ ...info, dob: e.target.value })} className="mt-1" />
                        </div>
                      </div>
                      <div>
                        <Label>Gender</Label>
                        <RadioGroup value={info.gender} onValueChange={(v) => setInfo({ ...info, gender: v })} className="mt-1 flex gap-4">
                          <div className="flex items-center gap-2">
                            <RadioGroupItem value="male" id="g-male" />
                            <Label htmlFor="g-male" className="font-normal">Male</Label>
                          </div>
                          <div className="flex items-center gap-2">
                            <RadioGroupItem value="female" id="g-female" />
                            <Label htmlFor="g-female" className="font-normal">Female</Label>
                          </div>
                        </RadioGroup>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label>Identity Card</Label>
                          <Input value={info.identityCard} onChange={(e) => setInfo({ ...info, identityCard: e.target.value })} className="mt-1" />
                        </div>
                        <div>
                          <Label>Email</Label>
                          <Input type="email" value={info.email} onChange={(e) => setInfo({ ...info, email: e.target.value })} className="mt-1" />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label>Phone Number</Label>
                          <Input value={info.phone} onChange={(e) => setInfo({ ...info, phone: e.target.value })} className="mt-1" />
                        </div>
                        <div>
                          <Label>Address</Label>
                          <Input value={info.address} onChange={(e) => setInfo({ ...info, address: e.target.value })} className="mt-1" />
                        </div>
                      </div>
                      <Button onClick={handleSave} className="font-semibold">Save</Button>
                    </div>
                  </motion.div>
                </TabsContent>

                {/* Score History */}
                <TabsContent value="history">
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="rounded-lg border border-border bg-card p-6">
                    <h2 className="font-bebas text-2xl tracking-wide text-foreground">History of Score Adding / Using</h2>
                    <div className="mt-4 flex flex-wrap items-end gap-4">
                      <div>
                        <Label>From date</Label>
                        <Input type="date" value={fromDate} onChange={(e) => setFromDate(e.target.value)} className="mt-1 w-40" />
                      </div>
                      <div>
                        <Label>To date</Label>
                        <Input type="date" value={toDate} onChange={(e) => setToDate(e.target.value)} className="mt-1 w-40" />
                      </div>
                      <RadioGroup value={scoreFilter} onValueChange={setScoreFilter} className="flex gap-4">
                        <div className="flex items-center gap-2">
                          <RadioGroupItem value="adding" id="s-adding" />
                          <Label htmlFor="s-adding" className="font-normal">History of score adding</Label>
                        </div>
                        <div className="flex items-center gap-2">
                          <RadioGroupItem value="using" id="s-using" />
                          <Label htmlFor="s-using" className="font-normal">History of score using</Label>
                        </div>
                      </RadioGroup>
                      <Button size="sm">View Score</Button>
                    </div>
                    <div className="mt-4 overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b border-border text-left text-muted-foreground">
                            <th className="pb-2 pr-4">#</th>
                            <th className="pb-2 pr-4">Date Created</th>
                            <th className="pb-2 pr-4">Movie Name</th>
                            <th className="pb-2 pr-4">Added Score</th>
                            <th className="pb-2">Used Score</th>
                          </tr>
                        </thead>
                        <tbody>
                          {filteredScores.map((s) => (
                            <tr key={s.id} className="border-b border-border/50">
                              <td className="py-3 pr-4 text-foreground">{s.id}</td>
                              <td className="py-3 pr-4 text-muted-foreground">{s.dateCreated}</td>
                              <td className="py-3 pr-4 text-foreground">{s.movieName}</td>
                              <td className="py-3 pr-4 text-primary font-semibold">{s.addedScore > 0 ? s.addedScore.toLocaleString() : ""}</td>
                              <td className="py-3 text-accent font-semibold">{s.usedScore > 0 ? s.usedScore.toLocaleString() : ""}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </motion.div>
                </TabsContent>

                {/* Booked Tickets */}
                <TabsContent value="booked">
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="rounded-lg border border-border bg-card p-6">
                    <h2 className="font-bebas text-2xl tracking-wide text-foreground">Booked Ticket</h2>
                    <div className="mt-4 overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b border-border text-left text-muted-foreground">
                            <th className="pb-2 pr-4">#</th>
                            <th className="pb-2 pr-4">Movie Name</th>
                            <th className="pb-2 pr-4">Booking Date</th>
                            <th className="pb-2 pr-4">Total Amount</th>
                            <th className="pb-2">Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {bookedTickets.map((t) => (
                            <tr key={t.id} className="border-b border-border/50">
                              <td className="py-3 pr-4 text-foreground">{t.id}</td>
                              <td className="py-3 pr-4 text-foreground">{t.movieName}</td>
                              <td className="py-3 pr-4 text-muted-foreground">{t.bookingDate}</td>
                              <td className="py-3 pr-4 text-primary font-semibold">{t.totalAmount.toLocaleString()}đ</td>
                              <td className="py-3">
                                <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${
                                  t.status === "Waiting for ticket" ? "bg-primary/20 text-primary" :
                                  t.status === "Get ticket" ? "bg-accent/20 text-accent" :
                                  "bg-muted text-muted-foreground"
                                }`}>{t.status}</span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </motion.div>
                </TabsContent>

                {/* Cancelled Tickets */}
                <TabsContent value="cancelled">
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="rounded-lg border border-border bg-card p-6">
                    <h2 className="font-bebas text-2xl tracking-wide text-foreground">Cancelled Ticket</h2>
                    <div className="mt-4 overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b border-border text-left text-muted-foreground">
                            <th className="pb-2 pr-4">#</th>
                            <th className="pb-2 pr-4">Movie Name</th>
                            <th className="pb-2 pr-4">Booking Date</th>
                            <th className="pb-2 pr-4">Total Amount</th>
                            <th className="pb-2">Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {cancelledTickets.map((t) => (
                            <tr key={t.id} className="border-b border-border/50">
                              <td className="py-3 pr-4 text-foreground">{t.id}</td>
                              <td className="py-3 pr-4 text-foreground">{t.movieName}</td>
                              <td className="py-3 pr-4 text-muted-foreground">{t.bookingDate}</td>
                              <td className="py-3 pr-4 text-primary font-semibold">{t.totalAmount.toLocaleString()}đ</td>
                              <td className="py-3">
                                <span className="rounded-full px-2 py-0.5 text-xs font-semibold bg-destructive/20 text-destructive">
                                  {t.status}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </motion.div>
                </TabsContent>
              </div>
            </div>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default AccountManagement;
