import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (res.ok) {
        toast({ title: "Signup successful 🎉", description: "You can now login!" });
        navigate("/login");
      } else {
        toast({ title: "Error", description: data.message, variant: "destructive" });
      }
    } catch (err) {
      toast({ title: "Error", description: "Signup failed. Try again later.", variant: "destructive" });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <Card className="w-[400px] shadow-lg border-2 border-border">
        <CardHeader>
          <CardTitle className="text-center text-2xl">Create Account 🚀</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSignup} className="space-y-4">
            <Input name="name" placeholder="Full Name" value={form.name} onChange={handleChange} required />
            <Input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} required />
            <Input name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} required />
            <Button className="w-full" type="submit">Sign Up</Button>
            <p className="text-sm text-center text-muted-foreground">
              Already have an account?{" "}
              <span onClick={() => navigate("/login")} className="text-primary cursor-pointer">Login</span>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Signup;
