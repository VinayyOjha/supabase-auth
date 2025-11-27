import { useState } from "react";
import { supabase } from "../config/supabaseConfig";

export default function Login() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");

  const validateEmail = (email: string) => {
    const regex = /^(20\d{2})pgcsca(0(?:0[1-9]|[1-9]\d)|1[0-6]\d|170)@nitjsr\.ac\.in$/;
    return regex.test(email);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Inside the supabase client");

    if (!validateEmail(email)){
      alert("Invalid email format. Use: 2024pgcsca011@nitjsr.ac.in");
      return;
    }

    setLoading(true);
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `https://supabase-auth-six-tawny.vercel.app/dashboard`,
      },
    });

    if (error) {
      alert(error.message);
    } else {
      alert("Check your email for the login link!");
    }

    setLoading(false);
  };

  return (
    <div>
      <h1>Supabase + React</h1>
      <p>Sign in via magic link:</p>

      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Your email"
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
        />

        <button disabled={loading}>
          {loading ? <span>Loading...</span> : <span>Send magic link</span>}
        </button>
      </form>
    </div>
  );
}
