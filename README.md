## Hockey Pipeline Service
This simple API exposes two endpoints to allow users to receive specific data about NHL teams and players. 
Both endpoints output a CSV both in the response and also to the project's `/output` directory.

### Endpoint documentation:
`/teamPipeline?teamId=30&season=20182019`

both **TeamId** and **Season** are required query parameters.

`/playerPipeline?playerId=8476923&season=20192020`

both **PlayerId** and **Season** are required query parameters.

### Running the Service Locally
1. Ensure that your machine as a version of Node & NPM installed. This project was developed in Node version 16.17.0 and npm version 8.15.0.
2. Clone this repository or download the .zip files.
3. If you'd like to specify a port to run this service on, add a .env file to the root directory of the project and, in it, the line `PORT=8080` (or whichever port you'd like). **The default port this service will run on is** `82`.
4. In a new terminal window, navigate to the root directory of the project and run the following commands:
- `npm install`
- `npm run build`
- `npm run start`

You should see a success log indicating that the service is listening on the correct port, and are now free to make HTTP requests to the service.

## Future Work
- Develop a more user-friendly way to provide team and player IDs and season
    - Make request to `https://statsapi.web.nhl.com/api/v1/teams` and cache team Ids and Names
    - Have a user select a team by name, without needing an ID (either via a CLI or a UI).
    - Have a user select a season from options without needing to adhere to the `YYYYYYYY` format.
    - After selecting a team, make a request to `https://statsapi.web.nhl.com/api/v1/teams/ID/roster` and cache that team's players and their respective IDs.
    - A user can then decide whether or not they'd like to see stats at the team or the player level.
    - If they'd like to see stats at a player level, the user can then select a player by name, without needing an ID.
- Service Infrastructure
    - This lightweight service could be deployed via AWS serverless lambdas, just would need to refactor controller functions as main handler functions.
    - Implement HATEOAS for a more discoverable, RESTful experience if new endpoints are added
    - Build out accompanying CLI or UI
