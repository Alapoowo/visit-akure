import { supabase } from './supabase'

export type SiteSettings = {
  mobile_nav_enabled: boolean
  maintenance_mode: boolean
  listing_alerts_enabled: boolean
}

const DEFAULTS: SiteSettings = {
  mobile_nav_enabled: true,
  maintenance_mode: false,
  listing_alerts_enabled: true,
}

export async function getSiteSettings(): Promise<SiteSettings> {
  const { data } = await supabase.from('site_settings').select('key, value')
  if (!data || data.length === 0) return DEFAULTS
  const map: Record<string, string> = {}
  for (const row of data) map[row.key] = row.value
  return {
    mobile_nav_enabled: map.mobile_nav_enabled !== 'false',
    maintenance_mode: map.maintenance_mode === 'true',
    listing_alerts_enabled: map.listing_alerts_enabled !== 'false',
  }
}

export async function saveSiteSettings(settings: SiteSettings): Promise<{ error?: string }> {
  const rows = [
    { key: 'mobile_nav_enabled', value: String(settings.mobile_nav_enabled) },
    { key: 'maintenance_mode', value: String(settings.maintenance_mode) },
    { key: 'listing_alerts_enabled', value: String(settings.listing_alerts_enabled) },
  ]
  const { error } = await supabase.from('site_settings').upsert(rows, { onConflict: 'key' })
  return error ? { error: error.message } : {}
}
