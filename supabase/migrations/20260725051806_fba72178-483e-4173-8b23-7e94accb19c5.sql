
-- 1. Add columns
ALTER TABLE public.volunteer_signups
  ADD COLUMN IF NOT EXISTS category text NOT NULL DEFAULT 'volunteer',
  ADD COLUMN IF NOT EXISTS date_of_birth date;

ALTER TABLE public.volunteer_signups
  DROP CONSTRAINT IF EXISTS volunteer_signups_category_check;
ALTER TABLE public.volunteer_signups
  ADD CONSTRAINT volunteer_signups_category_check
  CHECK (category IN ('core_team','volunteer','blood_donor'));

-- 2. Public members directory view (only safe fields)
CREATE OR REPLACE VIEW public.public_members
WITH (security_invoker = true) AS
SELECT
  id,
  name,
  category,
  blood_group,
  city,
  date_of_birth,
  profile_picture_url,
  created_at
FROM public.volunteer_signups
WHERE category IN ('core_team','volunteer','blood_donor');

-- Allow anon to read the view. It's a view of a table with no SELECT policy,
-- so use security_invoker=false effectively via a wrapper policy: grant a
-- narrow SELECT policy on the underlying table restricted to safe columns
-- by using a SECURITY DEFINER function-backed view instead.
-- Simpler: make the view SECURITY DEFINER owned by postgres bypassing RLS.
ALTER VIEW public.public_members SET (security_invoker = false);

GRANT SELECT ON public.public_members TO anon, authenticated;

-- 3. Storage: allow public read of volunteer-photos bucket (profile pictures only)
DROP POLICY IF EXISTS "Public read volunteer photos" ON storage.objects;
CREATE POLICY "Public read volunteer photos"
  ON storage.objects FOR SELECT
  TO anon, authenticated
  USING (bucket_id = 'volunteer-photos');
