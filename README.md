# Github Profiler

Installing dependencies

```sh
npm install
```

## Prerequisites:

- Node V >= 12.x

## Run the FRONT application:

```sh
npm run start
```

## Run the API application:

Before run, please insert your personal token from Github in the config.ts file, on GITHUB*TOKEN property, inside folder \_src-api*.

```sh
npm run start:api
```

# Main Tech used

- Create React App
- Axios, for http communications
- Material-UI (fastest reusable components)
- Typescript (I love strongly typed frameworks)
- Express.JS for API

# Architecture (Frontend)

- Based on MVVM and structure to be Domain Driven, when the model acts as domain for business logics.
- Pooling strategy to get user profile.

# Architecture (Backend)

- Saga strategy to get user profile with async calls.
- The backend's data was did with manual recording of all data in one JSON file due to study development. In a business development, this scheme is replaced by Database real connection.
