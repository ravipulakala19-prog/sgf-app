
-- Rebuild view in security_invoker mode
DROP VIEW IF EXISTS public.public_members;
CREATE VIEW public.public_members
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

GRANT SELECT ON public.public_members TO anon, authenticated;

-- Column-level SELECT grants on the base table (limits what anon/authenticated can read)
GRANT SELECT (id, name, category, blood_group, city, date_of_birth, profile_picture_url, created_at)
  ON public.volunteer_signups TO anon, authenticated;

-- Row-level policy so SELECT is allowed at all (columns still restricted by GRANT above)
DROP POLICY IF EXISTS "Public can view directory rows" ON public.volunteer_signups;
CREATE POLICY "Public can view directory rows"
  ON public.volunteer_signups FOR SELECT
  TO anon, authenticated
  USING (category IN ('core_team','volunteer','blood_donor'));
