-- ══════════════════════════════════════════════════
--  Visit Akure — Supabase Database Schema
--  Run this in: Supabase Dashboard → SQL Editor
-- ══════════════════════════════════════════════════

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ── VENDORS ──────────────────────────────────────
CREATE TABLE vendors (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  business_name TEXT NOT NULL,
  plan TEXT NOT NULL DEFAULT 'basic' CHECK (plan IN ('basic', 'verified', 'featured')),
  is_verified BOOLEAN NOT NULL DEFAULT FALSE,
  whatsapp_number TEXT,
  response_rate INTEGER DEFAULT 100,
  response_time TEXT DEFAULT '1 hour',
  total_wa_clicks INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ── LISTINGS ─────────────────────────────────────
CREATE TABLE listings (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('stays', 'cars', 'activities', 'events', 'services', 'products')),
  description TEXT,
  price NUMERIC NOT NULL DEFAULT 0,
  price_unit TEXT NOT NULL DEFAULT '/day',
  location TEXT NOT NULL,
  whatsapp_number TEXT NOT NULL,
  images TEXT[] DEFAULT '{}',
  amenities TEXT[] DEFAULT '{}',
  specs JSONB DEFAULT '{}',
  is_featured BOOLEAN DEFAULT FALSE,
  is_approved BOOLEAN DEFAULT FALSE,
  is_available BOOLEAN DEFAULT TRUE,
  rating NUMERIC(3,2) DEFAULT 0,
  review_count INTEGER DEFAULT 0,
  view_count INTEGER DEFAULT 0,
  vendor_id UUID NOT NULL REFERENCES vendors(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ── REVIEWS ──────────────────────────────────────
CREATE TABLE reviews (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  listing_id UUID NOT NULL REFERENCES listings(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  user_name TEXT NOT NULL,
  rating INTEGER NOT NULL CHECK (rating BETWEEN 1 AND 5),
  comment TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE (listing_id, user_id)
);

-- ── WHATSAPP CLICKS ──────────────────────────────
CREATE TABLE whatsapp_clicks (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  listing_id UUID REFERENCES listings(id) ON DELETE CASCADE,
  vendor_id UUID REFERENCES vendors(id) ON DELETE CASCADE,
  ip_hash TEXT,
  user_agent TEXT,
  clicked_at TIMESTAMPTZ DEFAULT NOW()
);

-- ── WISHLIST ─────────────────────────────────────
CREATE TABLE wishlist (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  listing_id UUID NOT NULL REFERENCES listings(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE (user_id, listing_id)
);

-- ── USER ROLES ───────────────────────────────────
CREATE TABLE user_roles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  role TEXT NOT NULL DEFAULT 'user' CHECK (role IN ('user', 'vendor', 'admin')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ══════════════════════════════════════════════════
--  ROW LEVEL SECURITY
-- ══════════════════════════════════════════════════

-- Enable RLS on all tables
ALTER TABLE listings ENABLE ROW LEVEL SECURITY;
ALTER TABLE vendors ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE whatsapp_clicks ENABLE ROW LEVEL SECURITY;
ALTER TABLE wishlist ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_roles ENABLE ROW LEVEL SECURITY;

-- LISTINGS: public read approved, vendors manage own
CREATE POLICY "Public read approved listings"
  ON listings FOR SELECT
  USING (is_approved = TRUE AND is_available = TRUE);

CREATE POLICY "Vendors read own listings"
  ON listings FOR SELECT
  USING (vendor_id = auth.uid());

CREATE POLICY "Vendors insert own listings"
  ON listings FOR INSERT
  WITH CHECK (vendor_id = auth.uid());

CREATE POLICY "Vendors update own listings"
  ON listings FOR UPDATE
  USING (vendor_id = auth.uid())
  WITH CHECK (vendor_id = auth.uid());

CREATE POLICY "Vendors delete own listings"
  ON listings FOR DELETE
  USING (vendor_id = auth.uid());

-- REVIEWS: public read, authenticated users insert
CREATE POLICY "Public read reviews"
  ON reviews FOR SELECT USING (TRUE);

CREATE POLICY "Users insert reviews"
  ON reviews FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- WISHLIST: users manage own
CREATE POLICY "Users manage own wishlist"
  ON wishlist FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- WHATSAPP CLICKS: anyone can insert (tracking)
CREATE POLICY "Anyone can track WA clicks"
  ON whatsapp_clicks FOR INSERT WITH CHECK (TRUE);

CREATE POLICY "Vendors read own WA clicks"
  ON whatsapp_clicks FOR SELECT
  USING (vendor_id = auth.uid());

-- ══════════════════════════════════════════════════
--  STORAGE
-- ══════════════════════════════════════════════════

-- Create public bucket for listing images
INSERT INTO storage.buckets (id, name, public)
VALUES ('listing-images', 'listing-images', TRUE);

-- Vendors can upload to their own folder
CREATE POLICY "Vendors upload listing images"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'listing-images'
    AND auth.uid()::text = (storage.foldername(name))[1]
  );

-- Anyone can read listing images (public bucket)
CREATE POLICY "Public read listing images"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'listing-images');

-- ══════════════════════════════════════════════════
--  FUNCTIONS & TRIGGERS
-- ══════════════════════════════════════════════════

-- Auto-update rating when a review is added
CREATE OR REPLACE FUNCTION update_listing_rating()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE listings SET
    rating = (SELECT AVG(rating) FROM reviews WHERE listing_id = NEW.listing_id),
    review_count = (SELECT COUNT(*) FROM reviews WHERE listing_id = NEW.listing_id),
    updated_at = NOW()
  WHERE id = NEW.listing_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER after_review_insert
AFTER INSERT OR UPDATE ON reviews
FOR EACH ROW EXECUTE FUNCTION update_listing_rating();

-- Auto-create vendor record + user role on signup
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO user_roles (id, role) VALUES (NEW.id, 'user');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
AFTER INSERT ON auth.users
FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- ══════════════════════════════════════════════════
--  SEED DATA (optional — for testing)
-- ══════════════════════════════════════════════════

-- Insert a test vendor (replace with real auth.users UUID after signup)
-- INSERT INTO vendors (id, business_name, plan, is_verified, whatsapp_number)
-- VALUES ('your-user-uuid-here', 'Test Business', 'verified', TRUE, '2348012345678');
