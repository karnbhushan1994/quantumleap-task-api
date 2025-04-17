#  Task Management API

A simple RESTful API built with Node.js, Express, and MongoDB Atlas to manage tasks with support for:

- Creating tasks
- Fetching tasks (with filtering and sorting)
- Task statistics
- Input validation
- Auto timestamps



 Live API (If hosted)

Base URL: http://localhost:5000/api/tasks




  Tech Stack

- Node.js
- Express.js
- MongoDB Atlas (Mongoose ODM)
- Joi (input validation)
- Dotenv

 Installation


git clone https://github.com/karnbhushan1994/quantumleap-task-api
cd task-api
npm install


  Environment Setup

Create a .env file and add:


PORT=5000
MONGO_URI=your_mongodb_connection_string




# Start the Server


npm start

 Server will run at: http://localhost:5000

 # API Endpoints

# 1.  Create a Task  
POST /api/tasks

 Request Body:
json
{
  "title": "Finish docs",
  "status": "pending",
  "dueDate": "2025-04-30"
}


 Responses:
- 201: Task created
- 400: Validation error (missing or invalid fields)


# 2.  Get Tasks  
GET /api/tasks

 Optional Query Params:
- status=pending or status=done
- sort=dueDate (asc)
- sort=-dueDate (desc)

 Example:
http
GET /api/tasks?status=pending&sort=-dueDate

# 3. Task Statistics  
GET /api/tasks/stats

 Response:
json
{
  "pending": 6,
  "done": 4
}

 Validation Rules

- title: required, non-empty string
- status: must be either pending or done
- dueDate: must be a future date



  Example MongoDB Task Document

json
{
  "_id": "1234567890",
  "title": "Review PR",
  "status": "done",
  "dueDate": "2025-04-25T00:00:00.000Z",
  "createdAt": "2025-04-17T07:01:18.553Z",
  "updatedAt": "2025-04-17T07:01:18.553Z"
}



Absolutely! Here's a well-organized Sample Requests and Responses section you can paste into your README.md or documentation file.



 Sample Requests & Responses



#  1. Create a Task

POST /api/tasks

 Request
json
{
  "title": "Write unit tests",
  "status": "pending",
  "dueDate": "2025-04-29"
}


 Response (201 Created)
json
{
  "success": true,
  "data": {
    "_id": "6800a73eb3cc5c5e85f1d7d4",
    "title": "Write unit tests",
    "status": "pending",
    "dueDate": "2025-04-29T00:00:00.000Z",
    "createdAt": "2025-04-17T07:01:18.553Z",
    "updatedAt": "2025-04-17T07:01:18.553Z",
    "__v": 0
  },
  "message": "Task created successfully"
}


 Error Example – Missing Fields
Request
json
{
  "title": "",
  "status": "",
  "dueDate": ""
}


Response
json
{
  "success": false,
  "data": null,
  "message": "\"title\" is not allowed to be empty"
}


 Error Example – Past Date
json
{
  "success": false,
  "data": null,
  "message": "\"dueDate\" must be greater than or equal to \"now\""
}


 Error Example – Invalid Status
json
{
  "success": false,
  "data": null,
  "message": "\"status\" must be one of [\"pending\", \"done\"]"
}


#  2. Get All Tasks

GET /api/tasks

 Response
json
{
  "success": true,
  "data": [
    {
      "_id": "6800a701b3cc5c5e85f1d7c8",
      "title": "Review pull requests",
      "status": "done",
      "dueDate": "2025-04-18T00:00:00.000Z",
      "createdAt": "2025-04-17T07:00:17.379Z",
      "updatedAt": "2025-04-17T07:00:17.379Z",
      "__v": 0
    }
    // ... more tasks
  ],
  "message": "Retrieved 9 task(s)"
}


#  3. Filter by Status

GET /api/tasks?status=pending

 Response
json
{
  "success": true,
  "data": [ /* only pending tasks */ ],
  "message": "Retrieved 8 task(s) with status \"pending\""
}




# ↕ 4. Sort Tasks by Due Date

Ascending:  
GET /api/tasks?sort=dueDate

Descending:  
GET /api/tasks?sort=-dueDate

 Response (Ascending Example)
json
{
  "success": true,
  "data": [ /* tasks sorted from earliest to latest */ ],
  "message": "Retrieved 9 task(s), sorted by dueDate (ascending)"
}


#  5. Get Task Statistics

GET /api/tasks/stats

 Response
json
{
  "success": true,
  "data": {
    "pending": 8,
    "done": 1
  },
  "message": "Task statistics retrieved successfully"
}

=======================
https://prnt.sc/ZXXDxbr0Gtq6





