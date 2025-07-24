# Intro& Setup
- Init a node project: 
`npm init -y`
- Install a package: 
`npm install express`
- As a dev dependency:
`npm install -D nodemon`

## Scripts
- start > for production
- start:dev > for development

## Routes
- Paths to different web pages inside our website
- We can ask for a specific data based on a key
- Query parameters 
    - key value pairs to send additional data to the request

## HTTP REQUEST (req)

This is the incoming data sent from the client.

Important parts of req:

| Part            | Description                                         | Access in Express                                    |
| --------------- | --------------------------------------------------- | ---------------------------------------------------- |
| **req.method**  | HTTP method: `GET`, `POST`, `PUT`, `DELETE`, etc.   | `req.method`                                         |
| **req.url**     | Full URL of the request                             | `req.url`                                            |
| **req.headers** | Metadata like `Content-Type`, `Authorization`, etc. | `req.headers`                                        |
| **req.params**  | Route parameters like `/users/:id` → `id`           | `req.params.id`                                      |
| **req.query**   | Query string parameters like `?page=2`              | `req.query.page`                                     |
| **req.body**    | Data sent in POST/PUT requests (JSON, form, etc.)   | `req.body` (needs `express.json()` or `body-parser`) |


## HTTP RESPONSE (res)

This is what your server sends back to the client.

Important parts of res:

| Method / Property  | Purpose                                        |
| ------------------ | ---------------------------------------------- |
| **res.send()**     | Sends back a response (text, object, etc.)     |
| **res.json()**     | Sends a JSON response                          |
| **res.status()**   | Sets the HTTP status code                      |
| **res.set()**      | Sets headers                                   |
| **res.redirect()** | Redirects the client to another URL            |
| **res.end()**      | Ends the response (used for low-level control) |


## Post Requests
- Browser is limited to get requests.
- When a http client makes a request, the server knows if it's a POST or get.
- 201 (created) status code, a new resource was created as a result of POST request. 
