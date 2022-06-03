import { encode, TAlgorithm } from "jwt-simple";
import { Session, EncodeResult, PartialSession } from "../model";

export function encodeSession(secretKey: string, partialSession: PartialSession): EncodeResult {

    const algorithm: TAlgorithm = "HS512";
    const issued = Date.now();
    const fifteenMinutesInMs = 15 * 60 * 1000;
    const expires = issued + fifteenMinutesInMs;
    const session: Session = {
        ...partialSession,
        issued: issued,
        expires: expires
    };

    return {
        token: encode(session, secretKey, algorithm),
        issued: issued,
        expires: expires
    };
}