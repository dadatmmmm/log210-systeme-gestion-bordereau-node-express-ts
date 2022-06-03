import { decode, TAlgorithm } from "jwt-simple";
import { Session, DecodeResult } from "../model";

export function decodeSession(secretKey: string, tokenString: string): DecodeResult {
    // Always use HS512 to decode the token
    const algorithm: TAlgorithm = "HS512";

    let result: Session;

    try {
        result = decode(tokenString, secretKey, false, algorithm);
    } catch (_e) {
        const error: Error = _e;
        let errorParam = {
            session: null,
            id: null
        }

        if (error.message === "No token supplied" || error.message === "Not enough or too many segments") {
            return {
                type: "Token invalide",
                ...errorParam
            };
        }

        if (error.message === "Signature verification failed" || error.message === "Algorithm not supported") {
            return {
                type: "Erreur d'intégrité",
                ...errorParam
            };
        }

        if (error.message.indexOf("Unexpected token") === 0) {
            return {
                type: "Token invalide",
                ...errorParam
            };
        }

        throw error;
    }

    return {
        type: "Valide",
        session: result,
        id: result.id
    }
}