# Marvel Voting Application

## Setup
Two config files are needed. Before you begin you'll need a marvel developer account and firebase account

In addition to the configs you'll need docker and docker compose installed and configured.

#### marvelApiConfig.json
- https://developer.marvel.com/account should display your keys once you've created an account
- The API config needs to be saved as marvelApiConfig.json in api/src/.
- Example contents:
```json
{
  "private_key": "",
  "public_key": ""
}
```

#### serviceAccountKey.json
 from firebase-admin (https://firebase.google.com/docs/admin/setup)
- The application uses firebase admin to create and fetch data from firebase. A service account is needed to access this data.
- The firebase database needs to be setup as a Realtime Database that is publicly accessible (Test mode) -- https://firebase.google.com/docs/database/web/start
- To generate a service account key follow the instructions here -- https://firebase.google.com/docs/admin/setup?authuser=0#initialize-sdk
- The service account JSON needs to be saved as serviceAccountKey.json in api/src/.
- Example contents:
```json
{
  "type": "",
  "project_id": "",
  "private_key_id": "",
  "private_key": "",
  "client_email": "",
  "client_id": "",
  "auth_uri": "",
  "token_uri": "",
  "auth_provider_x509_cert_url": "",
  "client_x509_cert_url": ""
}
```

## Run
```bash
$ yarn --cwd client/
$ yarn --cwd api/
$ docker-compose up
```

-------------------------------------------------------------------------

# Feedback
First off thank for completing our code test. Unfortunately we had some issues with what you delivered.

- Application did not work as delivered
- Required that we spin up a Firebase DB (not wrong but when submitted a project we like to have ease of access)
- Assumes that the developer using it has `yarn` cli tools installed globally
- Assumes that the developer using it has `docker` cli tools installed
- When navigating to http://localhost:7001/ we recieved the error: hmr-runtime.js:29 WebSocket connection to 'ws://localhost:35201/' failed: Error in connection establishment: net::ERR_CONNECTION_REFUSED
- It was not clear how to run the server and client independently(once the docker command failed we wanted to just look at your server)
- Hardcoded database URI reference that would not allow the application to work correctly
- A critical request that would not work correctly unless `await` was used
- Failed to use proper environment variables
- Log messages were not useful (basic network request information was the only thing logged)
- Zero code documentation

### Code comments
We have made various comments throughout your code base. You can view them in this branch or quickly search them via a text editor:
```
// Search for
* Comment
```

### Updated execution
We have made additional changes of how to run the project. There is now a `package.json` in the root directory.
```
// Root dir
npm install

// client dir
npm install

// api dir
npm install

// Root dir
npm run start
```

