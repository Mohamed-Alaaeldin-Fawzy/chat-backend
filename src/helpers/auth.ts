import crypto from "crypto"
import dotenv from "dotenv"

dotenv.config()

const secret = process.env.SECRET as string

export const random = () => crypto.randomBytes(128).toString("base64")

export const auth = (salt: string, password: string): string => {
    const hash = crypto.createHmac("sha256", [salt, password].join("/")).update(secret).digest("hex");
    return hash;
}
