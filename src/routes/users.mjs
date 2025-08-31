import { Router } from 'express'
import { validationResult, checkSchema, matchedData } from "express-validator"
import { createUserValidationSchema } from "../utils/validationSchemas.mjs"
import { resolveIndexByUserId } from "../utils/middlewares.mjs"
import { mockUsers } from "../utils/constants.mjs"

const router = Router();

router.get('/api/users',
    checkSchema(createUserValidationSchema),    
    (request, response) => {
    const result = validationResult(request);
    console.log(result);

    const { query: {filter, value} } = request;

    if(filter && value)
        return response.send(
            mockUsers.filter((user) => user[filter].includes(value))
        )
    return response.send(mockUsers);
});

router.get('/api/users/:id', (request, response) => {
    console.log(request.params);
    const parsedId = parseInt(request.params.id);
    if(isNaN(parsedId))
        return response.status(400).send({msg: "Bad Request. Invalid ID!"});

    const findUser = mockUsers.find((user) => user.id === parsedId )
    if(!findUser) 
        return response.status(404).send({msg: "User not Found!"});

    return response.send(findUser);
});

router.post('/api/users', 
    checkSchema(createUserValidationSchema),
    (request, response) => {

    const result = validationResult(request);
    console.log(result);

    if (!result.isEmpty())
        return response.status(400).send({errors: result["errors"]});

    const data = matchedData(request);
    console.log(data);

    let { body } = request;
    let newUser = { 
        id: mockUsers[mockUsers.length - 1].id + 1,
        ...data
    };
    mockUsers.push(newUser);
    return response.status(201).send(newUser);
});

router.patch('/api/users/:id',resolveIndexByUserId, (request, response) => {
    const body = request.body;
    const userIndex = request.findUserIndex;

    mockUsers[userIndex] = { 
        ...mockUsers[userIndex], 
        ...body
    };

    return response.status(200).send(mockUsers[userIndex]);
});

router.put('/api/users/:id', resolveIndexByUserId, (request, response) => {
    console.log(request.params);

    const body = request.body;
    const userIndex = request.findUserIndex;

    mockUsers[userIndex] = {
        id: request.parsedId,
        ...body
    }

    return response.status(200).send(mockUsers[userIndex]);
});

router.delete('/api/users/:id', resolveIndexByUserId,(request, response) => {
    const userIndex = request.findUserIndex;

    mockUsers.splice(userIndex, 1);

    return response.status(200).send({ msg: `User deleted successfully!`});
});


export default router;