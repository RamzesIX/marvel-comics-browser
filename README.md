# [Howework assignment][React] Marvel Comics Browser
The client application used to view the list of Marvel comics and manage them.

### Prerequisites

In order to install project dependencies and run/build the app, please ensure that you have the following software installed:
- Node.js v16.14.2 or later
- NPM v8.5.0 or later

You will find more details regarding the Node.js and NPM installation [here](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)

### Project dependencies
Run the following command to install the project dependencies:
```
npm ci 
```
#### Automated code formatting and linting

ESLint and Prettier are used for code formatting and linting for better readability and maintainability. The tools are run on every Git commit, so it's required to enable Git hooks before development.

Run the following command to enable Git Hooks:
```
npm run prepare
```

### Development
To run the app using dev server, use the following command:
```
npm run start
```
Hot reloading is enabled automatically. The app should be available in browser at http://localhost:8080.

### Testing
To run the automated tests use the following command:
```
npm run test
```

### Build
To build the project use the following command:
```
npm run build
```
The resulted build includes the production environment configuration.

### App environment
- Default dev environment configuration can be found in `.env.development` file. Note that you can use `env.local` file during development in order to override the configuration locally.
- Production environment configuration can be found in `.env.production` file.

#### Configuration

The following environment variables are used for project configuration:

- `VITE_API_BASE_URL` - URI to the server API
- `VITE_API_KEY` - API Public Key