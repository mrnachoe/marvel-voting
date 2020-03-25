import adminFirebase from './firebase';
/**
 * Comment
 * I can understand why you may have used JSON being a strong PHP developer
 * It's a little odd to see in a Node application
 * Leverage Node environment variables
 * https://www.npmjs.com/package/dotenv
 */
import marvelApiConfig from '#root/marvelApiConfig.json';
import md5 from "md5";
import fetch from "node-fetch";

/**
 * Comment
 * Could be better in .env
 */
const BASE_API_URL = "https://gateway.marvel.com:443/v1/public/characters";
/**
 * Comment
 * Could be better in .env
 */
const MAX_OFFSET = 1480;
/**
 * Comment
 * NUM_HAR_SELECTED could've been a dynamic value
 * For the sake of argument, if I wanted a voting session with 2,4,5 characters
 */
const NUM_HAR_SELECTED = 3;
/**
 * Comment
 * SESSIONS and VOTES database paths should be in an .env file
 * .env allows for flexibility, clarity and the ability to change should someone want to strucutre their DB differently
 */
const SESSIONS = 'marvel/vote-sessions';
const VOTES = 'marvel/votes';

/**********************/
/**
 * Comment
 * In each express route you have an unused "next" callback param
 */
/**********************/

const setupRoutes = app => {
    app.get("/sessions", async (req, res, next) => {
        const ref = adminFirebase.database().ref(SESSIONS);

        await ref.once("value", async (snapshot) => {
            return res.json(snapshot.val());
        });
    });

    app.get("/sessions/:id", async (req, res, next) => {
        /**
         * Comment
         * SESSIONS +`/${req.params.id}` could be better as `${SESSIONS}/${req.params.id}`
         */
        // const ref = adminFirebase.database().ref(`${SESSIONS}/${req.params.id}`);
        const ref = adminFirebase.database().ref(SESSIONS +`/${req.params.id}`);

        await ref.once("value", async (snapshot) => {
            return res.json(snapshot.val());
        });
    });

    app.post("/sessions", async (req, res, next) => {
        /**
         * Comment
         * There was a missing await before this function call
         * I'm sure if that was intended or not
         * Upon clicking the "Create New Session" button the return value of fetchMarvelCharacters() was <Promise:pending>
         * You may or may not have populated the DB during development and then did not run the application from scratch with an empty DB
         */

         // How it was submitted
        // const randomChars = fetchMarvelCharacters();

        // How we got it to work
        const randomChars = await fetchMarvelCharacters();

        // See value
        console.log(randomChars);

        /*********************************/
        const ref = adminFirebase.database().ref(SESSIONS);
        ref.push({characters: randomChars});

        await ref.once("value", async (snapshot) => {
            return res.json(snapshot.val());
        });


    });

    app.post("/votes", async (req, res, next) => {
        const {cookie, characterId, sessionId} = req.body;
        /**
         * Comment
         * VOTES + `/${sessionId}/${cookie}` better as `${VOTES}/${sessionId}/${cookie}`
         */
        // const ref = adminFirebase.database().ref(`${VOTES}/${sessionId}/${cookie}`);
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
    /**
     * Comment
     * VOTES + `/${sessionId}` => `${VOTES}/${sessionId}`
     */
    // const ref = adminFirebase.database().ref(`${VOTES}/${sessionId}`);
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

    // return `${BASE_API_URL}?offset=${randomOffset}&ts=${timestamp}&apikey=${public_key}&hash=${hash}`;
    return BASE_API_URL + `?offset=${randomOffset}&ts=${timestamp}&apikey=${public_key}&hash=${hash}`;
};

const fetchMarvelCharacters = async () => {
    const randomChars = {};

    for (let i = 0; i < NUM_HAR_SELECTED; i++) {
        /**
         * Comment
         * Failed to have a ".catch" to catch errors should there be any
         */
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

/**
 * Comment

// Pass number chars param
const fetchMarvelCharacters = async (NUM_HAR_SELECTED) => {
    const randomChars = {};

    for (let i = 0; i < NUM_HAR_SELECTED; i++) {
        // code
    }

    return randomChars;
}

*/

export default setupRoutes;