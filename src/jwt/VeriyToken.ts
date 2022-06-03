import { Session, DecodeResult, ExpirationStatus } from "../model";
import { Request, Response, NextFunction } from "express";
import { decodeSession } from "./Decode";
import { checkExpirationStatus } from "./CheckExpiration";
import { encodeSession } from "./Encode";

export const SECRET = "rggvnecenDE3308";

export function requireJwtMiddleware(request: Request, response: Response, next: NextFunction) {

    const unauthorized = (message: string) => response.status(401).json({
        ok: false,
        status: 401,
        message: message
    });

    // const requestHeader = "X-Be-Token";
    // const responseHeader = "X-Renewed-JWT-Token";
    //const header = request.header(requestHeader); 

    const token = request.query.token;
    
    if (!token) {
        unauthorized(`Required token not found.`);
        return;
    }

    const decodedSession: DecodeResult = decodeSession(SECRET, token);
    
    if (decodedSession.type === "Erreur d'intégrité" || decodedSession.type === "Token invalide") {
        unauthorized(`Failed to decode or validate authorization token. Reason: ${decodedSession.type}.`);
        return;
    }

    const expiration: ExpirationStatus = checkExpirationStatus(decodedSession.session);

    if (expiration === "expired") {
        unauthorized(`Authorization token has expired. Please create a new authorization token.`);
        return;
    }

    let session: Session;

    if (expiration === "grace") {
        // Automatically renew the session and send it back with the response
        const { token, expires, issued } = encodeSession(SECRET, decodedSession.session);
        session = {
            ...decodedSession.session,
            expires: expires,
            issued: issued
        };

        response.session = session;
    } else {
        session = decodedSession.session;
    }

    // Set the session on response.locals object for routes to access
    response.locals = {
        ...response.locals,
        session: session
    };

    // Request has a valid or renewed session. Call next to continue to the authenticated route handler
    next();
}