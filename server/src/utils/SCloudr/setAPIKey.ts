import { Maybe } from "../../models/monads";
const fetch = require("node-fetch");
const { JSDOM } = require("jsdom");

/**
 * A function that retrieves a current key for SoundCloud-API(v2) usage.
 *
 * The key is a string that's scraped with regex from a .js file that's provided over CDN.
 * It's stored as an environment variable and refreshed each day through a cron job.
 *
 */
export default async function getAPIKey(): Promise<any | Error> {
    const res: Maybe<Response> = Maybe.fromValue(await fetch(`https://soundcloud.com/discover`));

    return res
        .map((res) => res.text())
        .map(async (text) => new JSDOM(await text).window.document)
        .map(async (doc) => (await doc).querySelectorAll("script"))
        .map(async (nodeList) =>
            [...(await nodeList)].map((node) => node.src).filter((srcString) => srcString)
        )
        .map(async (srcList) => (await srcList).map(async (src) => (await fetch(src)).text()))
        .map(async (resList) => await Promise.all([...(await resList)]))
        .map(async (jsList) =>
            (await jsList).reduce((prevString, currentString) => prevString + currentString)
        )
        .map(async (jsString) => (await jsString).match(/query:{client_id:"(.*?)"/)[1])
        .getOrElse(new Error("Could not retrieve API keys"));
}

(async () => {
    process.env.SC_APIv2_KEY = await getAPIKey();
})();
