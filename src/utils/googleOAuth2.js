import { OAuth2Client } from "google-auth-library";
import path from "node:path";
import { env } from "./env.js";
import createHttpError from "http-errors";

const googleOAuthClient = new OAuth2Client({
  clientId: env("GOOGLE_OAUTH_CLIENT_ID"),
  clientSecret: env("GOOGLE_OAUTH_CLIENT_SECRET"),
  redirectUri: env("GOOGLE_OAUTH_REDIRECT_URI"),
});

export function generateOAuthUrl() {
  return googleOAuthClient.generateAuthUrl({
    scope: [
      "https://www.googleapis.com/auth/userinfo.email",
      "https://www.googleapis.com/auth/userinfo.profile",
      "openid",
    ],
  });
}

export async function validateCode(code) {
  const response = await googleOAuthClient.getToken(code);
  if (!response.tokens.id_token) throw createHttpError(401, "Unauthorized");

  const ticket = await googleOAuthClient.verifyIdToken({
    idToken: response.tokens.id_token,
  });
  return ticket;
}
