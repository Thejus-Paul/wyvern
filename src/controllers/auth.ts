import {
  create,
  getNumericDate,
  Header,
  Request,
  Response,
} from "../../deps.ts";
import { create as createUser } from "./concerns/crud.ts";
import { users } from "../db.ts";

const HEADER: Header = {
  alg: "HS512",
  typ: "JWT",
};

const KEY_USAGES: KeyUsage[] = ["sign", "verify"];

const register = async (
  { request, response }: { request: Request; response: Response },
): Promise<void> => {
  try {
    const key = await crypto.subtle.generateKey(
      {
        name: "HMAC",
        hash: "SHA-512",
      },
      true,
      KEY_USAGES,
    );

    const jwt = await create(HEADER, { exp: getNumericDate(7200) }, key);
    const jwk = await crypto.subtle.exportKey("jwk", key);
    await createUser({ request, response }, users, "User", {
      key: JSON.stringify(jwk, null, " "),
    });
    response.body = { success: true, jwt };
  } catch (error) {
    response.body = { success: false, error };
  }
};

const login = async (
  { request, response }: { request: Request; response: Response },
): Promise<void> => {
  const data = await request.body().value;
  const user = await users.findOne({ username: data.username }, {
    noCursorTimeout: false,
  });
  if (user) {
    const key = await crypto.subtle.importKey(
      "jwk",
      user.jwk,
      { name: "HMAC", hash: "SHA-512" },
      true,
      KEY_USAGES,
    );
    const jwt = await create(HEADER, { exp: getNumericDate(7200) }, key);
    response.body = {
      success: true,
      jwt,
    };
  }
};

export { login, register };
