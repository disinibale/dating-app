# Dating App Backend

The Dating App backend is a TypeScript-based API service built with Express.js and PostgreSQL. It provides the server-side functionalities for the Dating App, allowing users to create profiles, browse potential matches, and purchase premium subscriptions.

## Table of Contents

- [Folder Structure](#folder-structure)
- [API Endpoint Structure](#api-endpoint-structure)
- [How to Run the Service on Local Machine](#how-to-run-the-service-on-local-machine)

## Folder Structure

The project follows a well-organized folder structure to maintain code readability and scalability:

```
├── src
│ ├── app
│ │ ├── controllers
│ │ ├── middlewares
│ │ ├── models
│ │ ├── routes
│ │ ├── services
│ │ └── utils
│ ├── config
│ ├── database
│ ├── exceptions
│ ├── logger
│ ├── types
│ ├── app.ts
│ └── main.ts
├── tests
│ ├── auth.spec.ts
│ ├── profile.spec.ts
│ ├── subscription.spec.ts
│ └── swipe.spec.ts
├── .env.example
├── .eslintrc.js
├── .gitignore
├── jest.config.js
├── package.json
├── README.md
├── tsconfig.json
└── package.lock
```