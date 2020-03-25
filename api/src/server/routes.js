import adminFirebase from './firebase';
import marvelApiConfig from '#root/marvelApiConfig.json';
import md5 from "md5";
import fetch from "node-fetch";

const BASE_API_URL = "https://gateway.marvel.com:443/v1/public/characters";
const MAX_OFFSET = 1480;
const NUM_HAR_SELECTED = 3;
const SESSIONS = 'marvel/vote-sessions';
const VOTES = 'marvel/votes';

const setupRoutes = app => {
    app.get("/sessions", async (req, res, next) => {
        const ref = adminFirebase.database().ref(SESSIONS);

        await ref.once("value", async (snapshot) => {
            return res.json(snapshot.val());
        });
    });

    app.get("/sessions/:id", async (req, res, next) => {
        const ref = adminFirebase.database().ref(SESSIONS +`/${req.params.id}`);

        await ref.once("value", async (snapshot) => {
            return res.json(snapshot.val());
        });
    });

    app.post("/sessions", async (req, res, next) => {
        const randomChars = fetchMarvelCharacters();
        const ref = adminFirebase.database().ref(SESSIONS);

        ref.push({characters: randomChars});

        await ref.once("value", async (snapshot) => {
            return res.json(snapshot.val());
        });


    });

    app.post("/votes", async (req, res, next) => {
        const {cookie, characterId, sessionId} = req.body;
        const ref = adminFirebase.database().ref(VOTES + `/${sessionId}/${cookie}`);
        await ref.set({cookie, characterId});

        return fetchAllSessions(sessionId, res);
    });

    app.get("/votes/:sessionId", async (req, res, next) => {
        const {sessionId} = req.params;

        return fetchAllSessions(sessionId, res);
    });
};

const fetchAllSessions = async (sessionId, res) => {
    const ref = adminFirebase.database().ref(VOTES + `/${sessionId}`);

    await ref.once("value", async (snapshot) => {
        return res.json(snapshot.val());
    });
};

const createMarvelFetch = () => {
    const {public_key, private_key} = marvelApiConfig;
    const timestamp = new Date().getTime();
    const hash = md5(timestamp+private_key+public_key);
    const randomOffset = Math.ceil(Math.random() * MAX_OFFSET);

    return BASE_API_URL + `?offset=${randomOffset}&ts=${timestamp}&apikey=${public_key}&hash=${hash}`;
};

const fetchMarvelCharacters = async () => {
    const randomChars = {};

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

    return randomChars;
};

export default setupRoutes;