import { createRouteHandler } from "uploadthing/next";
import { ourFileRouter } from "./core";

// Export the whole handler — no GET/POST destructuring required
export const runtime = "edge"; // optional but recommended

export const { GET, POST } = createRouteHandler({
  router: ourFileRouter,
});
