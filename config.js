const APP_HOST = Deno.env.get("APP_HOST") || "127.0.0.1";
const APP_PORT = Deno.env.get("APP_PORT") || 8000;

export { APP_HOST, APP_PORT };