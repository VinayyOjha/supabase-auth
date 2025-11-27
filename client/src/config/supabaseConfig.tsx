import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// quick connection check (calls auth endpoint to verify API is reachable)
(async () => {
    if (!supabaseUrl || !supabaseAnonKey) {
        console.error("Supabase URL or anon key is missing");
        return;
    }

    try {
        const { error } = await supabase.auth.getSession();
        if (error) {
            console.error("Supabase connection check failed:", error);
        } else {
            console.log("Supabase connection successful");
        }
    } catch (err) {
        console.error("Supabase connection check error:", err);
    }
})();
