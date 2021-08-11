import { Maybe } from "../../models/monads";
import { Track, LikesBatch } from "../../models/SCloudr/types";
const fetch = require("node-fetch");

/**
 * A function that takes a response (of liked tracks) object and returns
 * a list of all liked tracks for the user.
 *
 * The response object contains an href to the next response which the function
 * uses to loop until completion.
 *
 */

const combineLikes =
    (params: URLSearchParams, likes: Track[]) =>
    async (batch: Promise<LikesBatch>): Promise<Track[]> => {
        const currentBatch: LikesBatch = await batch;
        const accumulatedTracks: Track[] = [...likes, ...currentBatch.collection];

        if (currentBatch.next_href) {
            const nextBatch = Maybe.fromValue(await fetch(`${currentBatch.next_href}&` + params))
                .map(async (res) => (await res.json()) as LikesBatch)
                .getOrElse(new Error("Could not retrieve new batch response"));
            return combineLikes(params, accumulatedTracks)(nextBatch as Promise<LikesBatch>);
        } else {
            return accumulatedTracks;
        }
    };

export default combineLikes;
