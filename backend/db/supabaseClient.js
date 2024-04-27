import dotenv from "dotenv";
dotenv.config();
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnon = process.env.SUPABASE_ANON;

export const supabase = createClient(supabaseUrl, supabaseAnon);
