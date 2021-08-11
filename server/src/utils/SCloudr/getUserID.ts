import { Maybe } from "../../models/monads";
const fetch = require("node-fetch");
const { JSDOM } = require("jsdom");

/**
 * This function scrapes the unique user ID a script from within the user's homepage.
 *
 */
export default async function getUserID(userID: string): Promise<any | Error> {
    const res: Maybe<Response> = Maybe.fromValue(await fetch(`https://soundcloud.com/${userID}`));

    return res
        .map((res) => res.text())
        .map(async (text) => new JSDOM(await text).window.document)
        .map(async (doc) => (await doc).querySelectorAll("script"))
        .map(async (nodeList) => [...(await nodeList)].map((node) => node.text))
        .map(async (jsList) =>
            (await jsList).reduce((prevString, currentString) => prevString + currentString)
        )
        .map(async (jsString) => (await jsString).match(/https:\/\/api\.soundcloud\.com\/users\/(.*?)"/)[1])
        .getOrElse(new Error("Could not retrieve API keys"));
}
