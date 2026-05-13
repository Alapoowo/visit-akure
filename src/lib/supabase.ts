import { createClient as createSupabaseClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createSupabaseClient(supabaseUrl, supabaseAnonKey)

export function createClient() {
  return createSupabaseClient(supabaseUrl, supabaseAnonKey)
}

export async function getListingsFromDB(category?: string) {
  const query = supabase
    .from('listings')
    .select('*')
    .eq('status', 'approved')
    .order('plan', { ascending: false })
    .order('created_at', { ascending: false })

  if (category) {
    query.eq('category', category)
  }

  const { data, error } = await query
  if (error) throw error
  return data
}

export async function trackWhatsAppClick(listingId: string) {
  await supabase.from('whatsapp_clicks').insert({ listing_id: listingId })
}
