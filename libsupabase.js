import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://xtnujhbxyubjqvphchla.supabase.co/rest/v1/'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh0bnVqaGJ4eXVianF2cGhjaGxhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg2MzQyNDgsImV4cCI6MjA5NDIxMDI0OH0.Tfs_gd45CUtjQmeavGECkwtxduWzBN7HWgqZXXbJw6w'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)