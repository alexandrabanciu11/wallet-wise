
const SUPABASE_URL = "https://xcumnsniiwjkjautlukt.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_waX_qpOiMVakeo7lWT7c3g_YXndDgXu";

window.supabaseClient = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_PUBLISHABLE_KEY
);
