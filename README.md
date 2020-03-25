# Marvel Voting Application

## Setup
Two config files are needed. Before you begin you'll need a marvel developer account and firebase account

In addition to the configs you'll need docker and docker compose installed and configured. 

#### marvelApiConfig.json
- https://developer.marvel.com/account should display your keys once you've created an account
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
$ docker-compose up
```