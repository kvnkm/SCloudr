import { Request, Response, NextFunction } from "express";
const fetch = require("node-fetch");
import log from "../config/logging";
import { Maybe } from "../models/monads";
import { getAPIKey, getUserID, combineLikes } from "../utils/SCloudr";

const NAMESPACE = "Sample Controller";

async function getLikesByArtist(req: Request, res: Response, next: NextFunction) {
    log("INFO", NAMESPACE, `Retrieving API keys`);
    // const userID: string = await getUserID("kenny-dope");
    const userID: string = await getUserID("sallycberlin");
    const clientID: string = await getAPIKey();
    console.log(clientID);
    const params = new URLSearchParams({
        client_id: clientID,
        limit: "200"
    });

    const likedTracks = Maybe.fromValue(
        await fetch(`https://api-v2.soundcloud.com/users/${userID}/likes?` + params)
    )
        .map(async (res) => await res.json())
        .map(combineLikes(params, []))
        .getOrElse(new Error("Could not retrieve API keys"));

    return res.status(200).json({ ...(await likedTracks) });
}

export default { getLikesByArtist };
