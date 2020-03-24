import adminFirebase from './firebase';
import authChecker from "./authChecker"
import marvelApiConfig from '#root/../marvelApiConfig.json';
import md5 from "md5";
import fetch from "node-fetch";

const BASE_API_URL = "https://gateway.marvel.com:443/v1/public/characters";
const MAX_OFFSET = 1480;
const NUM_HAR_SELECTED = 3;

const VOTE_SESSION = 'marvel/vote-session';
const VOTE = 'marvel/vote';

const setupRoutes = app => {

    app.get("/sessions", async (req, res, next) => {
        const ref = adminFirebase.database().ref(VOTE_SESSION);

        let data = {};

        await ref.on("value", async (snapshot) => {
            data = snapshot.val();
        });

        return res.json(data);
    });

    app.get("/session/:id", async (req, res, next) => {
        const ref = adminFirebase.database().ref(VOTE_SESSION +`/${req.params.id}`);
        let data = {};

        await ref.once("value", async (snapshot) => {
            data = snapshot.val();
        });

        return res.json(data);
    });

    app.post("/session", async (req, res, next) => {
        const randomChars = {};
        const ref = adminFirebase.database().ref(VOTE_SESSION);

        for (let i = 0; i < NUM_HAR_SELECTED; i++) {
            await fetch(createMarvelFetch())
                .then(response => response.json())
                .then(response => {
                    const {results} = response.data;
                    const randomKey = Math.ceil(Math.random() * results.length);
                    const randomChar = results[randomKey];

                    randomChars[randomChar.id] = randomChar.name;
                });
        }
        const saveObj = {characters: randomChars};
        const reference =  ref.push(saveObj);

        const responseObj = {};
        responseObj[reference.key] = saveObj;

        return res.json(responseObj);
    });

    app.post("/vote/:sessionId/:charId", async (req, res, next) => {
        const {charId, sessionId} = req.params;

        const ref = adminFirebase.database().ref(VOTE + `/${sessionId}/${charId}`);

        const saveObj = {character: charId, voteSession: sessionId};
        ref.push(saveObj);

        return res.json(saveObj)
    });
};

const createMarvelFetch = () => {
    const {public_key, private_key} = marvelApiConfig;
    const timestamp = new Date().getTime();
    const hash = md5(timestamp+private_key+public_key);
    let randomOffset = Math.ceil(Math.random() * MAX_OFFSET);

    return BASE_API_URL + `?offset=${randomOffset}&ts=${timestamp}&apikey=${public_key}&hash=${hash}`;
};

export default setupRoutes;