import jwt from "jsonwebtoken";

function signToken(id: string) {
  return jwt.sign({ id }, process.env.JWT_SECRET as string, {
    expiresIn: Number(process.env.JWT_EXPIRES_IN) * 24 * 60 * 60 * 1000,
  });
}

export function createToken(user: { _id: string }) {
  const token = signToken(user._id);

  return token;
}
