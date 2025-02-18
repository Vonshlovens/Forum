import { serveDir } from "https://deno.land/std@0.218.0/http/file_server.ts"; // Updated!

import { serve } from "https://deno.land/std@0.218.0/http/server.ts"; // Updated!

console.log("Frontend server running on http://localhost:3000");

await serve((req) => {  // Use await here
  return serveDir(req, {
    fsRoot: "./frontend",
    index: "index.html",
  });
}, { port: 3000 });