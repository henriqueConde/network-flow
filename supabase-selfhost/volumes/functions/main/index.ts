// Main entry point for Supabase Edge Functions
// This file is required for the edge functions container to start properly
// If you don't use edge functions, this minimal file prevents the container from crashing

Deno.serve(async (req) => {
  return new Response('Edge Functions are not configured', { status: 501 });
});


