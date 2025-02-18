// main.ts

// Import the HTTP server from Deno standard library
import * as http from "jsr:@std/http";


// Import the Supabase client (using Skypack CDN for ESM compatibility with Deno)
import { createClient } from "https://cdn.skypack.dev/@supabase/supabase-js";

Deno.env.set("SUPABASE_ANON_KEY", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNpeWZsampqc3dvaHN4amV0a2dlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzk1NjM2MjIsImV4cCI6MjA1NTEzOTYyMn0.kK_ptI4uZzx1hzO89dKvy6qL02WUGGPrb9u2eQZp1ok");
Deno.env.set("SUPABASE_URL", "https://siyfljjjswohsxjetkge.supabase.co");

// Load Supabase credentials from environment variables
const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SUPABASE_ANON_KEY = Deno.env.get("SUPABASE_ANON_KEY")!;

// Create the Supabase client
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Start the HTTP server on port 8000
console.log("Server is running on http://localhost:8000");
serve(async (req) => {
  const { pathname } = new URL(req.url);

  // Example endpoint: GET /topics to fetch forum topics from Supabase
  if (req.method === "GET" && pathname === "/topics") {
    const { data, error } = await supabase
      .from("topics") // Ensure your Supabase project has a "topics" table
      .select("*");

    if (error) {
      return new Response(JSON.stringify({ error }), { status: 500 });
    }
    return new Response(JSON.stringify(data), {
      headers: { "Content-Type": "application/json" },
    });
  }

  // Fallback route for other requests
  return new Response("Hello from your Deno forum API!");
});
