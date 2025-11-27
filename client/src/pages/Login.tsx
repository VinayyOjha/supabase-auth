import { useState } from "react";
import { supabase } from "../config/supabaseConfig";

export default function Login() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/dashboard`,
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
