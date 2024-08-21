import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://bcaqgxksodzvtxwdqzwr.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJjYXFneGtzb2R6dnR4d2RxendyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjQyNTU3NzUsImV4cCI6MjAzOTgzMTc3NX0.UwLGkp93bNPUwhcrjw8uhZfJmfmdZJreg17_RnTXIiE';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
