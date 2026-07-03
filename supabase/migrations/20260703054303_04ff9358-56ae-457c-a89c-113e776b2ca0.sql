CREATE POLICY "Public can view media-posts images"
ON storage.objects FOR SELECT
TO anon, authenticated
USING (bucket_id = 'media-posts');