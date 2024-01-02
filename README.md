# Todo App

## Introduction

This is a simple Todo App with a client-server architecture built using Node.js, Express, and React. It allows users to create, edit, and delete Todo lists and items.

## Setup Local Environment

### Prerequisites

Before you begin, make sure you have the following installed on your machine:

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/)

### Instructions

1. **Clone the Repository:**

   ```bash
   git clone <repository-url>
   ```

2. **Navigate to the Server Directory:**

   ```bash
   cd server
   ```

3. **Install Server Dependencies:**

   ```bash
   npm install
   ```

5. **Navigate to the Client Directory:**

   ```bash
   cd ../client
   ```

6. **Install Client Dependencies:**

   ```bash
   npm install
   ```


## Usage

1. **Start the Server:**

   ```bash
   cd ../server
   npm start
   ```

   The server will run on `http://localhost:8000`.

2. **Start the Client:**

   ```bash
   cd ../client
   npm start
   ```

   The client will be accessible at `http://localhost:3000`.

3. **Access the Todo App:**

   Open your web browser and navigate to `http://localhost:3000` to use the Todo App.

## Folder Structure

```
/todo-app
  ├── server
  │   ├── config
  │   ├── controllers
  │   ├── models
  │   ├── routers
  │   ├── utils
  │   └── ...
  ├── client
  │   ├── public
  │   ├── src
  │   │   ├── components
  │   │   ├── pages
  │   │   ├── assets
  │   │   └── ...
  │   └── ...
  ├── README.md
  └── ...
```

**Note:** Ensure you follow the specified folder structure, as changing it might lead to unexpected issues.

Feel free to explore and contribute to this Todo App!
