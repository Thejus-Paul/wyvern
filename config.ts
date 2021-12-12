const APP_HOST: string = Deno.env.get("APP_HOST") || "127.0.0.1";
const APP_PORT: number = Number(Deno.env.get("APP_PORT")) || 8000;

export { APP_HOST, APP_PORT };