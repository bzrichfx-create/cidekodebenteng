-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Site content (photos, videos, partners)
CREATE TABLE site_content (
  key TEXT PRIMARY KEY,
  data JSONB NOT NULL DEFAULT '{}',
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Contact messages from website form
CREATE TABLE contact_messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  subject TEXT,
  message TEXT NOT NULL,
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Announcements for member dashboard
CREATE TABLE announcements (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  body TEXT NOT NULL,
  category TEXT NOT NULL DEFAULT 'Umum',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Member profiles
CREATE TABLE member_profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  full_name TEXT NOT NULL,
  angkatan TEXT,
  department TEXT,
  phone TEXT,
  bio TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE site_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE announcements ENABLE ROW LEVEL SECURITY;
ALTER TABLE member_profiles ENABLE ROW LEVEL SECURITY;

-- RLS Policies for site_content (public read, authenticated write)
CREATE POLICY "site_content_public_read" ON site_content FOR SELECT
  TO anon, authenticated USING (true);

CREATE POLICY "site_content_authenticated_write" ON site_content FOR ALL
  TO authenticated USING (true) WITH CHECK (true);

-- RLS Policies for contact_messages (anyone can insert, authenticated can read)
CREATE POLICY "contact_messages_insert" ON contact_messages FOR INSERT
  TO anon, authenticated WITH CHECK (true);

CREATE POLICY "contact_messages_read" ON contact_messages FOR SELECT
  TO authenticated USING (true);

-- RLS Policies for announcements (authenticated can read)
CREATE POLICY "announcements_read" ON announcements FOR SELECT
  TO authenticated USING (true);

-- RLS Policies for member_profiles (users own their profile)
CREATE POLICY "member_profiles_read_own" ON member_profiles FOR SELECT
  TO authenticated USING (auth.uid() = id);

CREATE POLICY "member_profiles_update_own" ON member_profiles FOR UPDATE
  TO authenticated USING (auth.uid() = id) WITH CHECK (auth.uid() = id);

CREATE POLICY "member_profiles_insert_own" ON member_profiles FOR INSERT
  TO authenticated WITH CHECK (auth.uid() = id);

-- Create index for performance
CREATE INDEX idx_contact_messages_created_at ON contact_messages(created_at DESC);
CREATE INDEX idx_announcements_created_at ON announcements(created_at DESC);