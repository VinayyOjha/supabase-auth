import { useEffect, useState } from "react";
import { supabase } from "../config/supabaseConfig";
import { useNavigate } from "react-router-dom";
import type { Session } from "@supabase/supabase-js";
  
export default function Dashboard() {
  const [session, setSession] = useState<Session | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) navigate("/");
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

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
// import type { User } from "@supabase/supabase-js";
// import { supabase } from "../config/supabaseConfig";
// import { useNavigate } from "react-router-dom";

// export default function Dashboard() {
//   const [user, setUser] = useState<User | null>(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     async function getUser() {
//       const { data } = await supabase.auth.getUser();
//       if (!data.user) navigate("/login");
//       else setUser(data.user);
//     }
//     getUser();
//   }, []);

//   const handleLogout = async () => {
//     await supabase.auth.signOut();
//     navigate("/login");
//   };

//   return (
//     <div>
//       <h1>Welcome! You are logged in.</h1>
//       <p>{user?.email}</p>
//       <button onClick={handleLogout}>Logout</button>
//     </div>
//   );
// }
