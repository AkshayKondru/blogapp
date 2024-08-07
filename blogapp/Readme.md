
# Blog API with MongoDB

This project is a simple blog application where posts are stored in a MongoDB database. The application consists of an API server built with Node.js and Express, which interacts with the database. Another server file uses the API via Axios to handle the frontend, which is built using EJS, HTML, and CSS.

## Features

- Create, read, update, and delete blog posts.
- RESTful API for interacting with blog posts.
- Frontend built using EJS templates, HTML, and CSS.
- Backend API built with Node.js and Express.
- MongoDB as the database.



## Tech Stack

**Client:** EJS, HTML, CSS

**Server:** Node, Express, Mongodb, Axios


## Prerequisites

- Node.js installed on your machine.
- MongoDB instance running.

## Installation

1. Clone the repository

```bash
  git clone https://github.com/your-username/blogapp.git

```

2. Navigate to the project directory
```bash
  cd blogapp
```

3. Install the dependencies
npm install
```bash
  npm install
```

## Configuration

1. Create a ".env" file in the root directory and add your MongoDB connection string

```bash
MONGODB_URI=your-mongodb-connection-string
API_URL = "http://localhost:9000"

```
- Make 2 databases one for the login, registrations and another for the Posts (API)


## Running the application

1. Start the API server

```bash
  node API.js

```

2. Start the main server:
```bash
  node server.js
```

3. Open your browser and navigate to `http://localhost:4000` to view the application.
