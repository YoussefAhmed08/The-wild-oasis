import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://akwpdzgjnmawhfxnvwur.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFrd3Bkemdqbm1hd2hmeG52d3VyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDE3MTI0OTYsImV4cCI6MjAxNzI4ODQ5Nn0.GYWAVSvv6z4xgSCffqETprWhUhK-u9_sMxBWSaQ8FzI";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
