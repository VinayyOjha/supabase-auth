import { useEffect, useState } from "react";
import { supabase } from "../config/supabaseConfig";
import { useNavigate } from "react-router-dom";
import type { Session } from "@supabase/supabase-js";

export default function Dashboard() {
  const [session, setSession] = useState<Session | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data }) => {
      if (!data.session) navigate("/");
      setSession(data.session);
    });

    // Listen for auth state changes
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, newSession) => {
        setSession(newSession);
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [navigate]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  if (!session) return <p>Loading...</p>;

  return (
    <div>
      <h1>Welcome!</h1>
      <p>You are logged in as: {session.user.email}</p>

      <button onClick={handleLogout}>Sign Out</button>
      
    </div>
  );
}


// import { useEffect, useState } from "react";
// import { supabase } from "../config/supabaseConfig";

// export default function Verify() {
//   const params = new URLSearchParams(window.location.search);
//   const token_hash = params.get("token_hash");
//   const type = (params.get("type") as "email" | "magiclink" | null) ?? "email";

//   const [verifying, setVerifying] = useState<boolean>(!!token_hash);
//   const [authError, setAuthError] = useState<string | null>(null);
//   const [authSuccess, setAuthSuccess] = useState<boolean>(false);

//   useEffect(() => {
//     if (!token_hash) return;

//     supabase.auth
//       .verifyOtp({
//         token_hash,
//         type,
//       })
//       .then(({ error }) => {
//         if (error) {
//           setAuthError(error.message);
//         } else {
//           setAuthSuccess(true);

//           window.history.replaceState({}, document.title, "/dashboard");
//         }

//         setVerifying(false);
//       });
//   }, []);

//   if (verifying) {
//     return (
//       <div>
//         <h1>Authentication</h1>
//         <p>Verifying magic link…</p>
//       </div>
//     );
//   }

//   if (authError) {
//     return (
//       <div>
//         <h1>Authentication Failed</h1>
//         <p>{authError}</p>

//         <button onClick={() => (window.location.href = "/")}>
//           Back to Login
//         </button>
//       </div>
//     );
//   }

//   return (
//     <div>
//       <h1>Authentication Successful!</h1>
//       <p>Logging you in…</p>
//     </div>
//   );
// }
