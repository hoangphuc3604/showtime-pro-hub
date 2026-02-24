import { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { Users, Film, DoorOpen, Tag, Search, Plus, Pencil, Trash2, BarChart3, Eye } from "lucide-react";

// ──── Mock Data ────

interface Employee {
  id: string;
  username: string;
  fullName: string;
  dob: string;
  gender: string;
  email: string;
  identityCard: string;
  phone: string;
  address: string;
  registerDate: string;
  status: "active" | "disabled";
}

interface CinemaRoom {
  id: string;
  name: string;
  seatQuantity: number;
}

interface MovieItem {
  id: string;
  title: string;
  genre: string;
  duration: string;
  status: "showing" | "coming" | "ended";
}

interface Promotion {
  id: string;
  code: string;
  description: string;
  discount: number;
  startDate: string;
  endDate: string;
  status: "active" | "expired";
}

const initialEmployees: Employee[] = [
  { id: "EMP001", username: "nhanvien01", fullName: "Tran Van Tien", dob: "1996-11-21", gender: "male", email: "tientran@gmail.com", identityCard: "123456789", phone: "0775335515", address: "Hue", registerDate: "2026-01-07", status: "active" },
  { id: "EMP002", username: "nhanvien02", fullName: "Nguyen Minh", dob: "1995-03-15", gender: "male", email: "minh@gmail.com", identityCard: "987654321", phone: "0901234567", address: "Da Nang", registerDate: "2026-01-10", status: "active" },
];

const initialRooms: CinemaRoom[] = [
  { id: "1", name: "Cinema Room 1", seatQuantity: 60 },
  { id: "2", name: "Cinema Room 2", seatQuantity: 60 },
  { id: "3", name: "Cinema Room 3", seatQuantity: 60 },
  { id: "4", name: "Cinema Room 4", seatQuantity: 60 },
];

const initialMovies: MovieItem[] = [
  { id: "1", title: "Stellar Odyssey", genre: "Sci-Fi / Action", duration: "148 min", status: "showing" },
  { id: "2", title: "Midnight in Paris", genre: "Romance / Drama", duration: "126 min", status: "showing" },
  { id: "3", title: "The Darkening", genre: "Horror / Thriller", duration: "112 min", status: "showing" },
  { id: "4", title: "Dragon Kingdom", genre: "Animation / Family", duration: "98 min", status: "coming" },
  { id: "5", title: "Shadow Protocol", genre: "Action / Thriller", duration: "134 min", status: "showing" },
];

const initialPromotions: Promotion[] = [
  { id: "1", code: "MEMBER30", description: "30% off for members", discount: 30, startDate: "2026-01-01", endDate: "2026-06-30", status: "active" },
  { id: "2", code: "STUDENT20", description: "20% off for students", discount: 20, startDate: "2026-01-01", endDate: "2026-12-31", status: "active" },
  { id: "3", code: "WELCOME10", description: "10% off for new users", discount: 10, startDate: "2026-02-01", endDate: "2026-03-31", status: "active" },
];

const AdminDashboard = () => {
  // Employee state
  const [employees, setEmployees] = useState(initialEmployees);
  const [empSearch, setEmpSearch] = useState("");
  const [empDialog, setEmpDialog] = useState<{ open: boolean; mode: "add" | "edit"; data?: Employee }>({ open: false, mode: "add" });
  const [empForm, setEmpForm] = useState<Partial<Employee>>({});
  const [empPassword, setEmpPassword] = useState("");
  const [empConfirmPassword, setEmpConfirmPassword] = useState("");
  const [deleteDialog, setDeleteDialog] = useState<{ open: boolean; type: string; id: string }>({ open: false, type: "", id: "" });

  // Movie state
  const [movieItems, setMovieItems] = useState(initialMovies);
  const [movieSearch, setMovieSearch] = useState("");
  const [movieDialog, setMovieDialog] = useState<{ open: boolean; mode: "add" | "edit"; data?: MovieItem }>({ open: false, mode: "add" });
  const [movieForm, setMovieForm] = useState<Partial<MovieItem>>({});

  // Promotion state
  const [promotions, setPromotions] = useState(initialPromotions);
  const [promoSearch, setPromoSearch] = useState("");
  const [promoDialog, setPromoDialog] = useState<{ open: boolean; mode: "add" | "edit"; data?: Promotion }>({ open: false, mode: "add" });
  const [promoForm, setPromoForm] = useState<Partial<Promotion>>({});

  // Room state
  const [roomSearch, setRoomSearch] = useState("");

  // ── Handlers ──
  const handleSaveEmployee = () => {
    if (!empForm.username || !empForm.fullName) {
      toast({ title: "Please fill in required fields", variant: "destructive" });
      return;
    }
    if (empDialog.mode === "add") {
      if (!empPassword) { toast({ title: "Password is required", variant: "destructive" }); return; }
      if (empPassword !== empConfirmPassword) { toast({ title: "Passwords do not match", variant: "destructive" }); return; }
      if (employees.find((e) => e.username === empForm.username)) {
        toast({ title: "The inputted account is already existed, please choose another account name", variant: "destructive" });
        return;
      }
      setEmployees([...employees, { ...empForm, id: `EMP${String(employees.length + 1).padStart(3, "0")}`, registerDate: new Date().toISOString().split("T")[0], status: "active" } as Employee]);
      toast({ title: "Employee added successfully" });
    } else {
      setEmployees(employees.map((e) => (e.id === empDialog.data?.id ? { ...e, ...empForm } : e)));
      toast({ title: "Employee updated successfully" });
    }
    setEmpDialog({ open: false, mode: "add" });
    setEmpForm({});
    setEmpPassword("");
    setEmpConfirmPassword("");
  };

  const handleDeleteConfirm = () => {
    if (deleteDialog.type === "employee") {
      setEmployees(employees.map((e) => (e.id === deleteDialog.id ? { ...e, status: "disabled" as const } : e)));
      toast({ title: "Employee deleted (disabled)" });
    } else if (deleteDialog.type === "movie") {
      setMovieItems(movieItems.filter((m) => m.id !== deleteDialog.id));
      toast({ title: "Movie deleted" });
    } else if (deleteDialog.type === "promotion") {
      setPromotions(promotions.filter((p) => p.id !== deleteDialog.id));
      toast({ title: "Promotion deleted" });
    }
    setDeleteDialog({ open: false, type: "", id: "" });
  };

  const handleSaveMovie = () => {
    if (!movieForm.title) { toast({ title: "Please fill in required fields", variant: "destructive" }); return; }
    if (movieDialog.mode === "add") {
      setMovieItems([...movieItems, { ...movieForm, id: String(movieItems.length + 1), status: "coming" } as MovieItem]);
      toast({ title: "Movie added successfully" });
    } else {
      setMovieItems(movieItems.map((m) => (m.id === movieDialog.data?.id ? { ...m, ...movieForm } : m)));
      toast({ title: "Movie updated successfully" });
    }
    setMovieDialog({ open: false, mode: "add" });
    setMovieForm({});
  };

  const handleSavePromo = () => {
    if (!promoForm.code) { toast({ title: "Please fill in required fields", variant: "destructive" }); return; }
    if (promoDialog.mode === "add") {
      setPromotions([...promotions, { ...promoForm, id: String(promotions.length + 1), status: "active" } as Promotion]);
      toast({ title: "Promotion added successfully" });
    } else {
      setPromotions(promotions.map((p) => (p.id === promoDialog.data?.id ? { ...p, ...promoForm } : p)));
      toast({ title: "Promotion updated successfully" });
    }
    setPromoDialog({ open: false, mode: "add" });
    setPromoForm({});
  };

  const filteredEmp = employees.filter((e) => {
    const q = empSearch.toLowerCase();
    return e.status === "active" && (e.fullName.toLowerCase().includes(q) || e.username.toLowerCase().includes(q) || e.phone.includes(q));
  });

  const filteredMovies = movieItems.filter((m) => m.title.toLowerCase().includes(movieSearch.toLowerCase()));
  const filteredPromos = promotions.filter((p) => p.code.toLowerCase().includes(promoSearch.toLowerCase()) || p.description.toLowerCase().includes(promoSearch.toLowerCase()));
  const filteredRooms = initialRooms.filter((r) => r.name.toLowerCase().includes(roomSearch.toLowerCase()));

  return (
    <div className="min-h-screen bg-gradient-cinema">
      <Navbar />
      <div className="container mx-auto px-4 pt-24 pb-16">
        <h1 className="font-bebas text-4xl tracking-wide text-foreground">
          Admin <span className="text-primary">Dashboard</span>
        </h1>
        <p className="mt-1 text-muted-foreground">Manage employees, movies, cinema rooms, and promotions</p>

        <Tabs defaultValue="employees" className="mt-6">
          <TabsList className="bg-secondary flex-wrap">
            <TabsTrigger value="employees" className="gap-2"><Users className="h-4 w-4" /> Employees</TabsTrigger>
            <TabsTrigger value="movies" className="gap-2"><Film className="h-4 w-4" /> Movies</TabsTrigger>
            <TabsTrigger value="rooms" className="gap-2"><DoorOpen className="h-4 w-4" /> Cinema Rooms</TabsTrigger>
            <TabsTrigger value="promotions" className="gap-2"><Tag className="h-4 w-4" /> Promotions</TabsTrigger>
            <TabsTrigger value="statistics" className="gap-2"><BarChart3 className="h-4 w-4" /> Statistics</TabsTrigger>
          </TabsList>

          {/* ═══ EMPLOYEE MANAGEMENT ═══ */}
          <TabsContent value="employees">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-4 rounded-lg border border-border bg-card p-6">
              <div className="flex items-center justify-between flex-wrap gap-3">
                <h2 className="font-bebas text-xl tracking-wide text-foreground">Employee List</h2>
                <div className="flex gap-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input placeholder="Search…" value={empSearch} onChange={(e) => setEmpSearch(e.target.value)} className="pl-10 w-56" />
                  </div>
                  <Button size="sm" className="gap-1" onClick={() => { setEmpForm({}); setEmpPassword(""); setEmpConfirmPassword(""); setEmpDialog({ open: true, mode: "add" }); }}>
                    <Plus className="h-4 w-4" /> Add New
                  </Button>
                </div>
              </div>
              <div className="mt-4 overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border text-left text-muted-foreground">
                      <th className="pb-2 pr-3">Username</th>
                      <th className="pb-2 pr-3">Full Name</th>
                      <th className="pb-2 pr-3">DOB</th>
                      <th className="pb-2 pr-3">Gender</th>
                      <th className="pb-2 pr-3">Email</th>
                      <th className="pb-2 pr-3">Identity Card</th>
                      <th className="pb-2 pr-3">Phone</th>
                      <th className="pb-2 pr-3">Address</th>
                      <th className="pb-2 pr-3">Register Date</th>
                      <th className="pb-2">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredEmp.map((emp) => (
                      <tr key={emp.id} className="border-b border-border/50">
                        <td className="py-3 pr-3 text-foreground">{emp.username}</td>
                        <td className="py-3 pr-3 text-foreground">{emp.fullName}</td>
                        <td className="py-3 pr-3 text-muted-foreground">{emp.dob}</td>
                        <td className="py-3 pr-3 text-muted-foreground capitalize">{emp.gender}</td>
                        <td className="py-3 pr-3 text-muted-foreground">{emp.email}</td>
                        <td className="py-3 pr-3 text-muted-foreground">{emp.identityCard}</td>
                        <td className="py-3 pr-3 text-muted-foreground">{emp.phone}</td>
                        <td className="py-3 pr-3 text-muted-foreground">{emp.address}</td>
                        <td className="py-3 pr-3 text-muted-foreground">{emp.registerDate}</td>
                        <td className="py-3 flex gap-1">
                          <Button size="icon" variant="ghost" className="h-7 w-7" onClick={() => { setEmpForm(emp); setEmpDialog({ open: true, mode: "edit", data: emp }); }}>
                            <Pencil className="h-3.5 w-3.5" />
                          </Button>
                          <Button size="icon" variant="ghost" className="h-7 w-7 text-destructive" onClick={() => setDeleteDialog({ open: true, type: "employee", id: emp.id })}>
                            <Trash2 className="h-3.5 w-3.5" />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          </TabsContent>

          {/* ═══ MOVIE MANAGEMENT ═══ */}
          <TabsContent value="movies">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-4 rounded-lg border border-border bg-card p-6">
              <div className="flex items-center justify-between flex-wrap gap-3">
                <h2 className="font-bebas text-xl tracking-wide text-foreground">Movie List</h2>
                <div className="flex gap-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input placeholder="Search…" value={movieSearch} onChange={(e) => setMovieSearch(e.target.value)} className="pl-10 w-56" />
                  </div>
                  <Button size="sm" className="gap-1" onClick={() => { setMovieForm({}); setMovieDialog({ open: true, mode: "add" }); }}>
                    <Plus className="h-4 w-4" /> Add New
                  </Button>
                </div>
              </div>
              <div className="mt-4 overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border text-left text-muted-foreground">
                      <th className="pb-2 pr-3">ID</th>
                      <th className="pb-2 pr-3">Title</th>
                      <th className="pb-2 pr-3">Genre</th>
                      <th className="pb-2 pr-3">Duration</th>
                      <th className="pb-2 pr-3">Status</th>
                      <th className="pb-2">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredMovies.map((m) => (
                      <tr key={m.id} className="border-b border-border/50">
                        <td className="py-3 pr-3 text-foreground">{m.id}</td>
                        <td className="py-3 pr-3 text-foreground">{m.title}</td>
                        <td className="py-3 pr-3 text-muted-foreground">{m.genre}</td>
                        <td className="py-3 pr-3 text-muted-foreground">{m.duration}</td>
                        <td className="py-3 pr-3">
                          <span className={`rounded-full px-2 py-0.5 text-xs font-semibold uppercase ${
                            m.status === "showing" ? "bg-primary/20 text-primary" : m.status === "coming" ? "bg-accent/20 text-accent" : "bg-muted text-muted-foreground"
                          }`}>{m.status}</span>
                        </td>
                        <td className="py-3 flex gap-1">
                          <Button size="icon" variant="ghost" className="h-7 w-7" onClick={() => { setMovieForm(m); setMovieDialog({ open: true, mode: "edit", data: m }); }}>
                            <Pencil className="h-3.5 w-3.5" />
                          </Button>
                          <Button size="icon" variant="ghost" className="h-7 w-7 text-destructive" onClick={() => setDeleteDialog({ open: true, type: "movie", id: m.id })}>
                            <Trash2 className="h-3.5 w-3.5" />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          </TabsContent>

          {/* ═══ CINEMA ROOM MANAGEMENT ═══ */}
          <TabsContent value="rooms">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-4 rounded-lg border border-border bg-card p-6">
              <div className="flex items-center justify-between flex-wrap gap-3">
                <h2 className="font-bebas text-xl tracking-wide text-foreground">Cinema Room List</h2>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input placeholder="Search…" value={roomSearch} onChange={(e) => setRoomSearch(e.target.value)} className="pl-10 w-56" />
                </div>
              </div>
              <div className="mt-4 overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border text-left text-muted-foreground">
                      <th className="pb-2 pr-3">#</th>
                      <th className="pb-2 pr-3">Cinema Room ID</th>
                      <th className="pb-2 pr-3">Cinema Room</th>
                      <th className="pb-2 pr-3">Seat Quantity</th>
                      <th className="pb-2">Seat Detail</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredRooms.map((r, i) => (
                      <tr key={r.id} className="border-b border-border/50">
                        <td className="py-3 pr-3 text-foreground">{i + 1}</td>
                        <td className="py-3 pr-3 text-foreground">{r.id}</td>
                        <td className="py-3 pr-3 text-foreground">{r.name}</td>
                        <td className="py-3 pr-3 text-muted-foreground">{r.seatQuantity}</td>
                        <td className="py-3">
                          <Button size="sm" variant="outline" className="gap-1 text-xs">
                            <Eye className="h-3 w-3" /> Seat Detail
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          </TabsContent>

          {/* ═══ PROMOTION MANAGEMENT ═══ */}
          <TabsContent value="promotions">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-4 rounded-lg border border-border bg-card p-6">
              <div className="flex items-center justify-between flex-wrap gap-3">
                <h2 className="font-bebas text-xl tracking-wide text-foreground">Promotion List</h2>
                <div className="flex gap-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input placeholder="Search…" value={promoSearch} onChange={(e) => setPromoSearch(e.target.value)} className="pl-10 w-56" />
                  </div>
                  <Button size="sm" className="gap-1" onClick={() => { setPromoForm({}); setPromoDialog({ open: true, mode: "add" }); }}>
                    <Plus className="h-4 w-4" /> Add New
                  </Button>
                </div>
              </div>
              <div className="mt-4 overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border text-left text-muted-foreground">
                      <th className="pb-2 pr-3">Code</th>
                      <th className="pb-2 pr-3">Description</th>
                      <th className="pb-2 pr-3">Discount</th>
                      <th className="pb-2 pr-3">Start</th>
                      <th className="pb-2 pr-3">End</th>
                      <th className="pb-2 pr-3">Status</th>
                      <th className="pb-2">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredPromos.map((p) => (
                      <tr key={p.id} className="border-b border-border/50">
                        <td className="py-3 pr-3 text-primary font-semibold">{p.code}</td>
                        <td className="py-3 pr-3 text-foreground">{p.description}</td>
                        <td className="py-3 pr-3 text-foreground">{p.discount}%</td>
                        <td className="py-3 pr-3 text-muted-foreground">{p.startDate}</td>
                        <td className="py-3 pr-3 text-muted-foreground">{p.endDate}</td>
                        <td className="py-3 pr-3">
                          <span className={`rounded-full px-2 py-0.5 text-xs font-semibold uppercase ${
                            p.status === "active" ? "bg-primary/20 text-primary" : "bg-muted text-muted-foreground"
                          }`}>{p.status}</span>
                        </td>
                        <td className="py-3 flex gap-1">
                          <Button size="icon" variant="ghost" className="h-7 w-7" onClick={() => { setPromoForm(p); setPromoDialog({ open: true, mode: "edit", data: p }); }}>
                            <Pencil className="h-3.5 w-3.5" />
                          </Button>
                          <Button size="icon" variant="ghost" className="h-7 w-7 text-destructive" onClick={() => setDeleteDialog({ open: true, type: "promotion", id: p.id })}>
                            <Trash2 className="h-3.5 w-3.5" />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          </TabsContent>

          {/* ═══ STATISTICS ═══ */}
          <TabsContent value="statistics">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-4 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {[
                { label: "Total Revenue", value: "12,450,000đ", sub: "This month" },
                { label: "Tickets Sold", value: "276", sub: "This month" },
                { label: "Active Members", value: "156", sub: "Total" },
                { label: "Active Employees", value: String(employees.filter((e) => e.status === "active").length), sub: "Total" },
              ].map((stat) => (
                <div key={stat.label} className="rounded-lg border border-border bg-card p-6">
                  <p className="text-xs text-muted-foreground uppercase tracking-wide">{stat.label}</p>
                  <p className="mt-2 font-bebas text-3xl text-primary">{stat.value}</p>
                  <p className="text-xs text-muted-foreground">{stat.sub}</p>
                </div>
              ))}
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>

      {/* ═══ EMPLOYEE DIALOG ═══ */}
      <Dialog open={empDialog.open} onOpenChange={(o) => setEmpDialog({ ...empDialog, open: o })}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="font-bebas text-2xl">{empDialog.mode === "add" ? "Add Employee" : "Edit Employee"}</DialogTitle>
            <DialogDescription>{empDialog.mode === "add" ? "Fill in employee information" : "Update employee information"}</DialogDescription>
          </DialogHeader>
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div><Label>Account *</Label><Input value={empForm.username || ""} onChange={(e) => setEmpForm({ ...empForm, username: e.target.value })} className="mt-1" disabled={empDialog.mode === "edit"} /></div>
              <div><Label>Full Name *</Label><Input value={empForm.fullName || ""} onChange={(e) => setEmpForm({ ...empForm, fullName: e.target.value })} className="mt-1" /></div>
            </div>
            {empDialog.mode === "add" && (
              <div className="grid grid-cols-2 gap-3">
                <div><Label>Password *</Label><Input type="password" value={empPassword} onChange={(e) => setEmpPassword(e.target.value)} className="mt-1" /></div>
                <div><Label>Confirm Password *</Label><Input type="password" value={empConfirmPassword} onChange={(e) => setEmpConfirmPassword(e.target.value)} className="mt-1" /></div>
              </div>
            )}
            <div className="grid grid-cols-2 gap-3">
              <div><Label>Date of Birth</Label><Input type="date" value={empForm.dob || ""} onChange={(e) => setEmpForm({ ...empForm, dob: e.target.value })} className="mt-1" /></div>
              <div>
                <Label>Gender</Label>
                <RadioGroup value={empForm.gender || "male"} onValueChange={(v) => setEmpForm({ ...empForm, gender: v })} className="mt-2 flex gap-4">
                  <div className="flex items-center gap-1"><RadioGroupItem value="male" id="emp-m" /><Label htmlFor="emp-m" className="font-normal">Male</Label></div>
                  <div className="flex items-center gap-1"><RadioGroupItem value="female" id="emp-f" /><Label htmlFor="emp-f" className="font-normal">Female</Label></div>
                </RadioGroup>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div><Label>Identity Card</Label><Input value={empForm.identityCard || ""} onChange={(e) => setEmpForm({ ...empForm, identityCard: e.target.value })} className="mt-1" /></div>
              <div><Label>Email</Label><Input type="email" value={empForm.email || ""} onChange={(e) => setEmpForm({ ...empForm, email: e.target.value })} className="mt-1" /></div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div><Label>Phone</Label><Input value={empForm.phone || ""} onChange={(e) => setEmpForm({ ...empForm, phone: e.target.value })} className="mt-1" /></div>
              <div><Label>Address</Label><Input value={empForm.address || ""} onChange={(e) => setEmpForm({ ...empForm, address: e.target.value })} className="mt-1" /></div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEmpDialog({ open: false, mode: "add" })}>Back</Button>
            <Button onClick={handleSaveEmployee}>{empDialog.mode === "add" ? "Add" : "Save"}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ═══ MOVIE DIALOG ═══ */}
      <Dialog open={movieDialog.open} onOpenChange={(o) => setMovieDialog({ ...movieDialog, open: o })}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="font-bebas text-2xl">{movieDialog.mode === "add" ? "Add Movie" : "Edit Movie"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            <div><Label>Title *</Label><Input value={movieForm.title || ""} onChange={(e) => setMovieForm({ ...movieForm, title: e.target.value })} className="mt-1" /></div>
            <div className="grid grid-cols-2 gap-3">
              <div><Label>Genre</Label><Input value={movieForm.genre || ""} onChange={(e) => setMovieForm({ ...movieForm, genre: e.target.value })} className="mt-1" /></div>
              <div><Label>Duration</Label><Input value={movieForm.duration || ""} onChange={(e) => setMovieForm({ ...movieForm, duration: e.target.value })} className="mt-1" placeholder="e.g. 120 min" /></div>
            </div>
            <div>
              <Label>Status</Label>
              <Select value={movieForm.status || "coming"} onValueChange={(v) => setMovieForm({ ...movieForm, status: v as MovieItem["status"] })}>
                <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="showing">Showing</SelectItem>
                  <SelectItem value="coming">Coming Soon</SelectItem>
                  <SelectItem value="ended">Ended</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setMovieDialog({ open: false, mode: "add" })}>Back</Button>
            <Button onClick={handleSaveMovie}>{movieDialog.mode === "add" ? "Add" : "Save"}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ═══ PROMOTION DIALOG ═══ */}
      <Dialog open={promoDialog.open} onOpenChange={(o) => setPromoDialog({ ...promoDialog, open: o })}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="font-bebas text-2xl">{promoDialog.mode === "add" ? "Add Promotion" : "Edit Promotion"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div><Label>Code *</Label><Input value={promoForm.code || ""} onChange={(e) => setPromoForm({ ...promoForm, code: e.target.value })} className="mt-1" /></div>
              <div><Label>Discount (%)</Label><Input type="number" value={promoForm.discount || ""} onChange={(e) => setPromoForm({ ...promoForm, discount: Number(e.target.value) })} className="mt-1" /></div>
            </div>
            <div><Label>Description</Label><Input value={promoForm.description || ""} onChange={(e) => setPromoForm({ ...promoForm, description: e.target.value })} className="mt-1" /></div>
            <div className="grid grid-cols-2 gap-3">
              <div><Label>Start Date</Label><Input type="date" value={promoForm.startDate || ""} onChange={(e) => setPromoForm({ ...promoForm, startDate: e.target.value })} className="mt-1" /></div>
              <div><Label>End Date</Label><Input type="date" value={promoForm.endDate || ""} onChange={(e) => setPromoForm({ ...promoForm, endDate: e.target.value })} className="mt-1" /></div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setPromoDialog({ open: false, mode: "add" })}>Back</Button>
            <Button onClick={handleSavePromo}>{promoDialog.mode === "add" ? "Add" : "Save"}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ═══ DELETE CONFIRMATION ═══ */}
      <Dialog open={deleteDialog.open} onOpenChange={(o) => setDeleteDialog({ ...deleteDialog, open: o })}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you sure you want to delete this record?</DialogTitle>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialog({ open: false, type: "", id: "" })}>No</Button>
            <Button variant="destructive" onClick={handleDeleteConfirm}>OK</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminDashboard;
