import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("/about", "routes/about.tsx"),
  route("/auth", "routes/auth.tsx"),
  route("/check", "routes/trust.tsx"),
  route("/fir", "routes/fir.tsx"),
  route("/dashboard", "routes/dashboard.tsx"),
  route("/terms", "routes/terms.tsx"),
  route("/privacy", "routes/privacy.tsx"),
  route("*", "routes/not-found.tsx"),
] satisfies RouteConfig;
