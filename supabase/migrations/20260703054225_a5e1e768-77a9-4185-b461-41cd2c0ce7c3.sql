CREATE TABLE public.media_posts (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  image_url text NOT NULL,
  section text NOT NULL DEFAULT 'field',
  caption_en text,
  caption_te text,
  width integer NOT NULL DEFAULT 1200,
  height integer NOT NULL DEFAULT 900,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

GRANT SELECT ON public.media_posts TO anon, authenticated;
GRANT ALL ON public.media_posts TO service_role;

ALTER TABLE public.media_posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view media posts"
ON public.media_posts FOR SELECT
TO anon, authenticated
USING (true);