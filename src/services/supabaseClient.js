import { createClient } from '@supabase/supabase-js';

// Reemplaza con tu URL y API key de Supabase
const SUPABASE_URL = 'https://bcaqgxksodzvtxwdqzwr.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJjYXFneGtzb2R6dnR4d2RxendyIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcyNDI1NTc3NSwiZXhwIjoyMDM5ODMxNzc1fQ.v5gogLLapv8scl8vq9qODUHbcWQxbYOw24BEBb7L5Tc';

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);


