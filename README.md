# 🚀 Task Management REST API

## 📖 Project Overview

This Node.js and Express-based REST API provides a complete CRUD (Create, Read, Update, Delete) interface for managing tasks in a MERN stack application. It enables frontend clients to perform operations on a persistent MongoDB database, supporting scalable, stateless RESTful interactions for apps like to-do lists or project trackers.

### 📁 Complete Folder Structure
```
back/
├── 📁 config/
│   └── db.js              # Database connection setup
├── 📁 controllers/
│   └── taskController.js  # Request handling logic
├── 📁 models/
│   └── taskModel.js       # Database operations
├── 📁 routes/
│   └── taskRoutes.js      # API route definitions
├── 📄 config.env          # Environment variables
├── 📄 package.json        # Project dependencies
├── 📄 server.js           # Application entry point
└── 📄 README.md           # This documentation
```

## 📊 Data Model

**Task Entity** (MongoDB Collection: `tasks`)

| Field       | Type    | Required | Description              |
|-------------|---------|----------|--------------------------|
| `_id`       | ObjectId| Auto    | Unique identifier       |
| `title`     | String  | Yes     | Task name               |
| `description`| String | Yes     | Task details            |
| `completed` | Boolean | No      | Completion status       |

## 🏃 How to Run the Project

### Prerequisites
- Node.js (v18.x or higher)
- MongoDB Atlas account
- Git

### Step-by-Step Instructions

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/LautaroNSantillan/mern-practice/tree/mhai
   cd back
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Set Up Environment Variables**:
   Create a `config.env` file in the `back` directory:
   ```env
   ATLAS_URI=mongodb+srv://username:password@cluster.mongodb.net/dbname
   ```
   Replace with your MongoDB Atlas connection string.

4. **Run the Server**:
   ```bash
   npm start
   # or
   node server.js
   ```
   The server will start on `http://localhost:3000`.

> **Note**: Ensure your MongoDB Atlas IP whitelist includes your IP for connection.

## 🛠 Technologies Used

| Technology  | Version | Purpose                  |
|-------------|---------|--------------------------|
| Node.js     | 18.x   | Server runtime          |
| Express.js  | 4.x    | Web framework           |
| MongoDB     | 6.x    | NoSQL database          |
| dotenv      | 16.x   | Environment management  |
| cors        | 2.x    | Cross-origin handling   |

## 🔗 Endpoints Overview

| Method | Route          | Description              |
|--------|----------------|--------------------------|
| GET    | `/tasks`      | Retrieve all tasks      |
| GET    | `/tasks/:id`  | Retrieve a task by ID   |
| POST   | `/tasks`      | Create a new task       |
| PUT    | `/tasks/:id`  | Update a task by ID     |
| DELETE | `/tasks/:id`  | Delete a task by ID     |

## 💡 Example Requests & Responses

### Create a Task
**Request**:
```bash
curl -X POST http://localhost:3000/tasks \
  -H "Content-Type: application/json" \
  -d '{"title": "Buy groceries", "description": "Milk and bread"}'
```

**Response** (200 OK):
```json
{
  "message": "New task created!",
  "data": {
    "insertedId": "64a..."
  }
}
```

### Get All Tasks
**Request**:
```bash
curl http://localhost:3000/tasks
```

**Response** (200 OK):
```json
[
  {
    "_id": "64a...",
    "title": "Buy groceries",
    "description": "Milk and bread",
    "completed": false
  }
]
```

### Update a Task
**Request**:
```bash
curl -X PUT http://localhost:3000/tasks/64a... \
  -H "Content-Type: application/json" \
  -d '{"completed": true}'
```

**Response** (200 OK):
```json
{
  "message": "Task updated!",
  "data": {
    "matchedCount": 1
  }
}
```

### Delete a Task
**Request**:
```bash
curl -X DELETE http://localhost:3000/tasks/64a...
```

**Response** (200 OK):
```json
{
  "message": "Task deleted!",
  "data": {
    "deletedCount": 1
  }
}
```


## Interacting with the AI 

- **Used tools / AIs+**: Github copilot with *student benefits* + Grok code fast 1, GPT-5 mini, GPT-5.1

- **Some Prompts**

![Refactoring prompt example](back/misc/images/refactor-prompt.png)
![Prompt revision example](back/misc/images/revise-prompt.png)
![README rewrite prompt example](back/misc/images/rewrite-readme-prompt.png)
![README generation prompt example](back/misc/images/write-readme-prompt.png)
> The prompts were effective because they clearly defined the task, provided the necessary context, assigned a proper role to the AI, and specified the format of the expected output. When I followed this structure, the responses were accurate and useful. The few ineffective prompts lacked clarity or context, which led to vague answers—something I corrected by rewriting them using the Task–Context–Role–Format approach.


### ⚡AI can even help me write descriptive commits!
![AI-assisted commit example](back/misc/images/commits-using-ai.png)

```

🔸**Where the AI Was Most Helpful**: The AI was most helpful during the refactoring phase of the project. It assisted me in restructuring the API into a cleaner, modular architecture following best practices, helping me break down a single-file implementation into organized controllers, routes, and models. Additionally, it proved valuable for identifying potential logic issues and suggesting more efficient or standardized patterns.

🔸**Handling “Hallucinations”**: I did encounter a few instances where the AI produced incorrect or unreliable output. At times, the model lost context, requiring me to restart the conversation to ensure accurate responses. In other cases, it generated logic that didn’t fully align with the intended behavior of the API, which I had to manually review and correct.

🔸**Conclusions**: Working with AI as a development assistant was both productive and instructive. The experience taught me the importance of writing clear, structured prompts to achieve precise and useful results—highlighting how crucial task, context, role, and format are in prompt engineering. I learned that while AI can greatly enhance efficiency, its output still requires careful oversight, critical thinking, and manual refinement.
