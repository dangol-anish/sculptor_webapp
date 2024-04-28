import crypto from "crypto";
export const randomString = (length) => {
  return crypto.randomBytes(20).toString("hex");
};
