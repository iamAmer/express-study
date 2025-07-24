import express from "express";

const app = express();

// express is not parsing those requests body
// we need to use middleware
// middlewares is a function that invoked before a certain API request is handled
app.use(express.json());

const PORT = process.env.PORT || 3000;

const mockUsers = [
    {id: 1, name: "amer"},
    {id: 2, name: "ahmed"},
    {id: 3, name: "muhammed"},
    {id: 4, name: "khalid"},
    {id: 5, name: "ali"},
    {id: 6, name: "mahmoud"},
    {id: 7, name: "khafaga"}
];

// get is to read only data, not manipulating any data at all on the server side
// second argument: request handler
app.get('/', (request, response) => {
    response.status(201).send('Hello World');
    
    // you can send also a json object
    // response.status(201).send({msg: 'Hello!'});
})

app.get('/api/users', (request, response) => {
    console.log(request.query);

    // the same as 
    // const filter = request.query.filter;
    // const value = request.query.value;
    const { query: {filter, value} } = request;

    // when filter and value are not defined
    if(filter && value)
        return response.send(
            mockUsers.filter((user) => user[filter].includes(value))
        )
    return response.send(mockUsers);
});

// route parameter
// gives me only one user record based on the id
app.get('/api/users/:id', (request, response) => {
    console.log(request.params);
    const parsedId = parseInt(request.params.id);
    if(isNaN(parsedId))
        // bas request, due to the client error response
        // malformed request syntax
        return response.status(400).send({msg: "Bad Request. Invalid ID!"});

    const findUser = mockUsers.find((user) => user.id === parsedId )
    if(!findUser) 
        return response.status(404).send({msg: "User not Found!"});

    return response.send(findUser);
});

// post request
app.post('/api/users', (request, response) => {
    // console.log(request.body);

    // destructure the request body
    // ...body is to unpack all the body object into newUser object *
    let { body } = request;
    let newUser = { 
        id: mockUsers.length + 1,
        ...body
    };
    mockUsers.push(newUser);
    return response.status(201).send(newUser); // 201 created 
})

app.get('/api/products', (request, response) => {
    response.send([
        {id: 345, name: "phone"},
        {id: 346, name: "ipad"},
    ]);
})

app.listen(PORT, () => {
    console.log(`Running on port ${PORT}`);
})


// Routes
// localhost:3000
// localhost:3000/users

// query params
// localhost:3000/products?key=value&key2=value2


// query params