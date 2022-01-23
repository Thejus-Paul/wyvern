import {
  create,
  getNumericDate,
  Header,
  Request,
  Response,
  verify,
} from "../../deps.ts";

const key = await crypto.subtle.generateKey(
  { name: "HMAC", hash: "SHA-512" },
  true,
  ["sign", "verify"],
);

const header: Header = {
  alg: "HS512",
  typ: "JWT",
};

const register = async (
  { request, response }: { request: Request; response: Response },
): Promise<void> => {
  try {
    const _data = await request.body().value;
    const jwt = await create(header, { exp: getNumericDate(10) }, key);
    response.body = { success: true, jwt };
  } catch (error) {
    response.body = { success: false, error };
  }
};

const login = async (
  { request, response }: { request: Request; response: Response },
): Promise<void> => {
  try {
    const data = await request.body().value;
    const authStatus = await verify(data.jwt, key);
    response.body = { success: true, authStatus };
  } catch (error) {
    response.body = { success: false, error };
  }
};

export { login, register };
