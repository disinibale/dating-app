# Dating App Backend

This Simple Dating App backend is built using TypeScript-Express service using PostgreSQL. It provides server-side functionalities for the Dating App, allowing users to create profiles, browse potential matches, and purchase premium subscriptions.

## Useful Links

-   [API Documentation](https://www.postman.com/disinibale11/workspace/usedealls-dating-apps-technical-test/overview)
-   [Personal Website](https://disinibale.com)

## Table of Contents

- [Dating App Backend](#dating-app-backend)
  - [Useful Links](#useful-links)
  - [Table of Contents](#table-of-contents)
  - [Folder Structure](#folder-structure)
  - [API Endpoint Structure](#api-endpoint-structure)
  - [How to Run the Service on a Local Machine](#how-to-run-the-service-on-a-local-machine)
  - [Run the application using Docker](#run-the-application-using-docker)
  - [Testing](#testing)

## Folder Structure

The project follows a well-organized folder structure to maintain code readability and scalability:

```
├── src
│ ├── __test__
│ ├── app
│ │ ├── controllers
│ │ ├── middlewares
│ │ ├── routes
│ │ ├── services
│ | ├── exceptions
│ | ├── services
│ │ └── utils
│ ├── config
│ ├── database
│ ├── models
│ ├── types
│ ├── logger.ts
│ ├── server.ts
│ └── main.ts
├── .env.example
├── .eslintrc.js
├── .gitignore
├── jest.config.js
├── package.json
├── README.md
├── tsconfig.json
├── package.json
└── package-lock.json
```

## API Endpoint Structure

The backend exposes the following API endpoints:

-   `POST api/v1/auth/register`: Register a new user.
-   `POST api/v1/auth/login`: Authenticate the user and generate a JWT token.
-   `GET api/v1/profile`: Get the user's profile information.
-   `PUT api/v1/profile`: Update the user's profile.
-   `GET api/v1/matching`: Browse potential matches.
-   `GET api/v1/matching/swipe`: Swipe for potential matches.
-   `POST api/v1/subscription/purchase`: Get the list of premium feature subscription
-   `POST api/v1/subscription/purchase`: Purchase a premium subscription.

## How to Run the Service on a Local Machine

To run the Dating App backend on your local machine, follow these steps:

1. Clone the repository to your local machine:

```bash
git clone https://github.com/disinibale/usedealls-tech-test.git
```

2. Install the required dependencies

```bash
npm install
```

3. Set up your PostgreSQL database and update the .env file with your database credentials.

```bash
NODE_ENV    ="development"
PORT        ="5000"
JWT_SECRET  ="supersecretkey"

DB_HOST     ="YOUR_DATABASE_HOST"
DB_PORT     ="YOUR_DATABASE_PORT"
DB_SCHEMA   ="YOUR_DATABASE_SCHEMA"
DB_NAME     ="YOUR_DATABASE_NAME"
DB_USERNAME ="YOUR_DATABASE_USER"
DB_PASSWORD ="YOUR_DATABASE_PASS"
```

1. I programmed this code to generate all needed data for testing, so you can run immediately using this command:

```
npm run dev
```

The backend will be up and running at `http://localhost:5000` as the default port

## Run the application using Docker

To run the Dating App backend on your local machine, follow these steps:

1. Create the docker image from the existing Dockerfile from cmd by copy this command
    ```bash
    docker build -t dating-app .
    ```
2. Run the docker container using `docker-compose` command by copy this command
    ```
    docker-compose up -d
    ```

## Testing

This is a List of the test cases that can be used to test the correctness of the systems :

```
Authentication API
√ Should register a new user (215 ms)
√ Should check if the email is already registered (35 ms)
√ Should authenticate the created user (61 ms)

Subscription API
√ Can view all premium packages (11 ms)
√ Prevent invalid price (24 ms)
√ Can purchase an unlimited swipe (67 ms)
√ Prevent purchasing the same package (20 ms)
√ Can purchase verified badge (58 ms)
√ Prevent picking a package is not exist if a user sends an invalid package id (13 ms)

Profile Matching API
√ Can browse potential matches and show profiles of users of the opposite gender (23 ms)
√ Can swipe right the potential match (67 ms)
√ Cannot swipe the same profile within the same day (28 ms)
√ Can swipe left the potential match (60 ms)
√ Can only swipe for a maximum of 10 profiles per day (513 ms)

Profile API
√ should get the user's own profile (27 ms)
√ should update the user's profile (67 ms)
```

To run the test you could simply copying this command to your CLI :

```bash
npm run test
```

Note: Before you can run the test, make sure you have run the migration first so the data would be populated.
