CREATE POLICY "Anyone can upload volunteer photos"
ON storage.objects FOR INSERT TO anon, authenticated
WITH CHECK (bucket_id = 'volunteer-photos');