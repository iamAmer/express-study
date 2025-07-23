import express from "express";

const app = express();
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
// sedond argument: request handler
app.get('/', (request, responce) => {
    responce.status(201).send('Hello Wrold');
    
    // you can send also a json object
    // responce.status(201).send({msg: 'Hello!'});
})

app.get('/api/users', (request, responce) => {
    console.log(request.query);

    // the same as 
    // const filter = request.query.filter;
    // const value = request.query.value;
    const { query: {filter, value} } = request;

    // when filter and value are not defined
    if(filter && value)
        return responce.send(
            mockUsers.filter((user) => user[filter].includes(value))
        )
    return responce.send(mockUsers);
});

// route parameter
// gives me only one user record based on the id
app.get('/api/users/:id', (request, responce) => {
    console.log(request.params);
    const parsedId = parseInt(request.params.id);
    if(isNaN(parsedId))
        // bas request, due to the client error responce
        // malformed request syntax
        return responce.status(400).send({msg: "Bad Request. Invalid ID!"});

    const findUser = mockUsers.find((user) => user.id === parsedId )
    if(!findUser) 
        return responce.status(404).send({msg: "User not Found!"});

    return responce.send(findUser);
});

app.get('/api/products', (request, responce) => {
    responce.send([
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